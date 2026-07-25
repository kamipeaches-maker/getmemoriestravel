import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Message from './models/Message.js';

import authRoutes from './routes/auth.js';
import submissionRoutes from './routes/submissions.js';
import bookingRoutes from './routes/bookings.js';
import contractorRoutes from './routes/contractors.js';
import messageRoutes from './routes/messages.js';
import reviewRoutes from './routes/reviews.js';
import paymentRoutes from './routes/payments.js';
import portfolioRoutes from './routes/portfolio.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/getmemoriestravel';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/contractors', contractorRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/admin', adminRoutes);

// Socket.IO Real-time Messaging
const userSockets = {};

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join', (userId) => {
    userSockets[userId] = socket.id;
    console.log(`User ${userId} joined`);
  });

  socket.on('send-message', async (data) => {
    try {
      const { senderId, recipientId, content, bookingId } = data;

      // Save message to DB
      const message = new Message({
        sender: senderId,
        recipient: recipientId,
        content,
        booking: bookingId
      });
      await message.save();

      // Send to recipient if online
      const recipientSocket = userSockets[recipientId];
      if (recipientSocket) {
        io.to(recipientSocket).emit('receive-message', {
          id: message._id,
          sender: senderId,
          content,
          timestamp: message.createdAt
        });
      }
    } catch (error) {
      console.error('Message error:', error);
    }
  });

  socket.on('disconnect', () => {
    // Remove user from active sockets
    Object.keys(userSockets).forEach(key => {
      if (userSockets[key] === socket.id) {
        delete userSockets[key];
      }
    });
    console.log('User disconnected:', socket.id);
  });
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export { app, io };
