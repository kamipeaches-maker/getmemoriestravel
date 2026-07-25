import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { createPaymentIntent, confirmPayment } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/create-intent', authenticate, authorize(['customer']), createPaymentIntent);
router.post('/confirm', authenticate, authorize(['customer']), confirmPayment);

export default router;
