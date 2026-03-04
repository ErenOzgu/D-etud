const jwt = require('jsonwebtoken');

const socketHandler = (io) => {
  // Auth middleware for socket
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error('Kimlik doğrulama gerekli'));
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      next();
    } catch {
      next(new Error('Geçersiz token'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`🔌 Kullanıcı bağlandı: ${socket.userId}`);
    socket.join(socket.userId); // Kişisel oda

    socket.on('disconnect', () => {
      console.log(`🔌 Kullanıcı ayrıldı: ${socket.userId}`);
    });
  });
};

module.exports = { socketHandler };
