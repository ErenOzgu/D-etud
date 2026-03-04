const User = require('../models/user.model');
const Question = require('../models/question.model');
const Notification = require('../models/notification.model');

exports.getStats = async (req, res) => {
  try {
    const [totalUsers, totalQuestions, openQuestions, totalNotifications] = await Promise.all([
      User.countDocuments(),
      Question.countDocuments(),
      Question.countDocuments({ status: 'open' }),
      Notification.countDocuments(),
    ]);

    const usersByRole = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } },
    ]);

    res.json({ success: true, stats: { totalUsers, totalQuestions, openQuestions, totalNotifications, usersByRole } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20, role } = req.query;
    const filter = role ? { role } : {};
    const users = await User.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await User.countDocuments(filter);
    res.json({ success: true, total, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'Kullanıcı bulunamadı.' });

    user.isActive = !user.isActive;
    await user.save();

    res.json({ success: true, message: `Kullanıcı ${user.isActive ? 'aktif' : 'devre dışı'} edildi.`, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.featureQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      { isFeatured: true },
      { new: true }
    );
    if (!question) return res.status(404).json({ success: false, message: 'Soru bulunamadı.' });

    await Notification.create({
      recipient: question.author,
      type: 'question_featured',
      message: `"${question.title}" sorunuz öne çıkarıldı! 🎉`,
      link: `/questions/${question._id}`,
    });

    res.json({ success: true, question });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.broadcastNotification = async (req, res) => {
  try {
    const { message } = req.body;
    const users = await User.find({ isActive: true, notificationsEnabled: true }).select('_id');

    const notifications = users.map((u) => ({
      recipient: u._id,
      type: 'system',
      message,
    }));

    await Notification.insertMany(notifications);

    // Socket.IO broadcast
    req.app.get('io')?.emit('broadcast', { message });

    res.json({ success: true, message: `${users.length} kullanıcıya bildirim gönderildi.` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
