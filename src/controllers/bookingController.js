import Booking from '../models/Booking.js';
import Submission from '../models/Submission.js';
import TravelPlan from '../models/TravelPlan.js';

const createBooking = async (req, res) => {
  try {
    const {
      submissionId,
      travelPlanId,
      packageTier,
      photographerId,
      videographerId
    } = req.body;
    
    const submission = await Submission.findById(submissionId);
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    
    const travelPlan = await TravelPlan.findById(travelPlanId);
    if (!travelPlan) {
      return res.status(404).json({ error: 'Travel plan not found' });
    }
    
    const booking = new Booking({
      submission: submissionId,
      customer: req.user.id,
      travelPlan: travelPlanId,
      packageTier,
      photographer: photographerId,
      videographer: videographerId,
      jobDetails: {
        startDate: submission.startDate,
        endDate: submission.endDate,
        location: submission.destination
      },
      pricing: {
        totalCost: travelPlan.totalCost
      }
    });
    
    await booking.save();
    
    res.status(201).json({
      message: 'Booking created',
      booking
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCustomerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ customer: req.user.id })
      .populate('photographer', 'firstName lastName specialty hourlyRate')
      .populate('videographer', 'firstName lastName specialty hourlyRate')
      .sort({ createdAt: -1 });
    
    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getContractorBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      $or: [
        { photographer: req.user.id },
        { videographer: req.user.id }
      ]
    })
      .populate('customer', 'firstName lastName email phone')
      .sort({ createdAt: -1 });
    
    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const acceptBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    booking.status = 'accepted';
    await booking.save();
    
    res.json({
      message: 'Booking accepted',
      booking
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.bookingId,
      { status },
      { new: true }
    );
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    res.json({
      message: 'Booking status updated',
      booking
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createBooking,
  getCustomerBookings,
  getContractorBookings,
  acceptBooking,
  updateBookingStatus
};
