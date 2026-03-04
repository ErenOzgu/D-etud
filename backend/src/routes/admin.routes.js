const router = require('express').Router();
const { getStats, getUsers, toggleUserStatus, featureQuestion, broadcastNotification } = require('../controllers/admin.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

router.use(protect, authorize('admin'));

router.get('/stats', getStats);
router.get('/users', getUsers);
router.put('/users/:id/toggle', toggleUserStatus);
router.put('/questions/:id/feature', featureQuestion);
router.post('/broadcast', broadcastNotification);

module.exports = router;
