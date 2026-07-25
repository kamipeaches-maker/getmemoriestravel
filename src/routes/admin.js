import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import {
  getDashboardStats,
  getAllUsers,
  verifyContractor,
  suspendUser
} from '../controllers/adminController.js';

const router = express.Router();

// Admin routes (can add admin auth middleware)
router.get('/stats', getDashboardStats);
router.get('/users', getAllUsers);
router.patch('/contractors/:contractorId/verify', verifyContractor);
router.patch('/users/:userId/suspend', suspendUser);

export default router;
