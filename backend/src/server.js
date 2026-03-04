const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const questionRoutes = require('./routes/question.routes');
const notificationRoutes = require('./routes/notification.routes');
const adminRoutes = require('./routes/admin.routes');
const { socketHandler } = require('./config/socket');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Dijital Etüt API çalışıyor 🚀' });
});

// Socket.IO
socketHandler(io);

// MongoDB bağlantısı
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB bağlantısı başarılı');
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => console.log(`🚀 Sunucu http://localhost:${PORT} adresinde çalışıyor`));
  })
  .catch((err) => {
    console.error('❌ MongoDB bağlantı hatası:', err.message);
    process.exit(1);
  });

module.exports = { app, io };
