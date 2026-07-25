import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import {
  getAllContractors,
  getContractorProfile,
  updateContractorProfile,
  updateAvailability
} from '../controllers/contractorController.js';

const router = express.Router();

router.get('/', authenticate, getAllContractors);
router.get('/:contractorId', authenticate, getContractorProfile);
router.patch('/profile', authenticate, authorize(['contractor']), updateContractorProfile);
router.post('/availability', authenticate, authorize(['contractor']), updateAvailability);

export default router;
