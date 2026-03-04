const router = require('express').Router();
const {
  getQuestions, getQuestion, createQuestion,
  addAnswer, acceptAnswer, deleteQuestion
} = require('../controllers/question.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/', getQuestions);
router.get('/:id', getQuestion);
router.post('/', protect, createQuestion);
router.delete('/:id', protect, deleteQuestion);
router.post('/:id/answers', protect, addAnswer);
router.put('/:id/answers/:answerId/accept', protect, acceptAnswer);

module.exports = router;
