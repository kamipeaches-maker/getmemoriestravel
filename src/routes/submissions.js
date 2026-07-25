import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import {
  createSubmission,
  getSubmissions,
  getSubmissionById,
  generateTravelPlan
} from '../controllers/submissionController.js';

const router = express.Router();

router.post('/', authenticate, authorize(['customer']), createSubmission);
router.get('/', authenticate, authorize(['customer']), getSubmissions);
router.get('/:id', authenticate, getSubmissionById);
router.post('/:submissionId/travel-plan', authenticate, authorize(['customer']), generateTravelPlan);

export default router;
