const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isAccepted: { type: Boolean, default: false },
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

const questionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    subject: {
      type: String,
      enum: ['matematik', 'fizik', 'kimya', 'biyoloji', 'türkçe', 'tarih', 'coğrafya', 'diğer'],
      required: true,
    },
    grade: { type: String, enum: ['9', '10', '11', '12', 'üniversite', 'diğer'], default: 'diğer' },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    answers: [answerSchema],
    tags: [{ type: String, trim: true }],
    status: { type: String, enum: ['open', 'answered', 'closed'], default: 'open' },
    views: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

questionSchema.index({ title: 'text', content: 'text', tags: 'text' });

module.exports = mongoose.model('Question', questionSchema);
