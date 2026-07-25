import express from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  createReview,
  getUserReviews,
  getGivenReviews
} from '../controllers/reviewController.js';

const router = express.Router();

router.post('/', authenticate, createReview);
router.get('/user/:userId', authenticate, getUserReviews);
router.get('/given', authenticate, getGivenReviews);

export default router;
