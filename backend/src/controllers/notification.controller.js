const Notification = require('../models/notification.model');

exports.getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id })
      .populate('sender', 'name avatar')
      .sort({ createdAt: -1 })
      .limit(50);

    const unreadCount = await Notification.countDocuments({ recipient: req.user._id, isRead: false });

    res.json({ success: true, notifications, unreadCount });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { recipient: req.user._id, isRead: false },
      { isRead: true }
    );
    res.json({ success: true, message: 'Tüm bildirimler okundu olarak işaretlendi.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
