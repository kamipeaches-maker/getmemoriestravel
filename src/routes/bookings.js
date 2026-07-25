import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import {
  createBooking,
  getCustomerBookings,
  getContractorBookings,
  acceptBooking,
  updateBookingStatus
} from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', authenticate, authorize(['customer']), createBooking);
router.get('/customer/list', authenticate, authorize(['customer']), getCustomerBookings);
router.get('/contractor/list', authenticate, authorize(['contractor']), getContractorBookings);
router.patch('/:bookingId/accept', authenticate, authorize(['contractor']), acceptBooking);
router.patch('/:bookingId/status', authenticate, updateBookingStatus);

export default router;
