const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '7d' });

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Bu e-posta zaten kayıtlı.' });
    }

    const user = await User.create({ name, email, password, role: role || 'student' });
    const token = generateToken(user._id);

    res.status(201).json({ success: true, token, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'E-posta veya şifre hatalı.' });
    }

    if (!user.isActive) {
      return res.status(403).json({ success: false, message: 'Hesabınız devre dışı bırakılmış.' });
    }

    const token = generateToken(user._id);
    user.password = undefined;

    res.json({ success: true, token, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getMe = async (req, res) => {
  res.json({ success: true, user: req.user });
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, notificationsEnabled } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, notificationsEnabled },
      { new: true, runValidators: true }
    );
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
