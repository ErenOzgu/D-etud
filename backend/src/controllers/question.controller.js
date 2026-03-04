const Question = require('../models/question.model');
const Notification = require('../models/notification.model');

exports.getQuestions = async (req, res) => {
  try {
    const { subject, grade, status, search, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (subject) filter.subject = subject;
    if (grade) filter.grade = grade;
    if (status) filter.status = status;
    if (search) filter.$text = { $search: search };

    const total = await Question.countDocuments(filter);
    const questions = await Question.find(filter)
      .populate('author', 'name role avatar')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ success: true, total, page: Number(page), questions });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    )
      .populate('author', 'name role avatar')
      .populate('answers.author', 'name role avatar');

    if (!question) return res.status(404).json({ success: false, message: 'Soru bulunamadı.' });
    res.json({ success: true, question });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createQuestion = async (req, res) => {
  try {
    const { title, content, subject, grade, tags } = req.body;
    const question = await Question.create({ title, content, subject, grade, tags, author: req.user._id });
    await question.populate('author', 'name role avatar');
    res.status(201).json({ success: true, question });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.addAnswer = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ success: false, message: 'Soru bulunamadı.' });

    question.answers.push({ content: req.body.content, author: req.user._id });
    if (question.status === 'open') question.status = 'answered';
    await question.save();
    await question.populate('answers.author', 'name role avatar');

    // Bildirim gönder
    if (question.author.toString() !== req.user._id.toString()) {
      const notification = await Notification.create({
        recipient: question.author,
        sender: req.user._id,
        type: 'new_answer',
        message: `"${question.title}" sorunuza yeni bir cevap geldi.`,
        link: `/questions/${question._id}`,
      });

      // Socket.IO ile gerçek zamanlı bildirim
      req.app.get('io')?.to(question.author.toString()).emit('notification', notification);
    }

    res.json({ success: true, question });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.acceptAnswer = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ success: false, message: 'Soru bulunamadı.' });
    if (question.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Sadece soru sahibi cevap kabul edebilir.' });
    }

    question.answers.forEach((a) => (a.isAccepted = false));
    const answer = question.answers.id(req.params.answerId);
    if (!answer) return res.status(404).json({ success: false, message: 'Cevap bulunamadı.' });

    answer.isAccepted = true;
    question.status = 'closed';
    await question.save();

    res.json({ success: true, question });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ success: false, message: 'Soru bulunamadı.' });

    const isOwner = question.author.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ success: false, message: 'Bu soruyu silme yetkiniz yok.' });
    }

    await question.deleteOne();
    res.json({ success: true, message: 'Soru silindi.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
