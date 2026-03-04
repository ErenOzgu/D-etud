const router = require('express').Router();
const { getMyNotifications, markAsRead } = require('../controllers/notification.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/', protect, getMyNotifications);
router.put('/read-all', protect, markAsRead);

module.exports = router;
