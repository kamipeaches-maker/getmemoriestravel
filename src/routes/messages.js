import express from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  sendMessage,
  getMessages,
  getConversation,
  markAsRead
} from '../controllers/messageController.js';

const router = express.Router();

router.post('/', authenticate, sendMessage);
router.get('/', authenticate, getMessages);
router.get('/conversation/:userId', authenticate, getConversation);
router.patch('/:messageId/read', authenticate, markAsRead);

export default router;
