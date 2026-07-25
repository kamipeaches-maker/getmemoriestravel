import Review from '../models/Review.js';
import Booking from '../models/Booking.js';
import User from '../models/User.js';

const createReview = async (req, res) => {
  try {
    const { bookingId, revieweeId, rating, comment, tags, wouldRecommend } = req.body;
    
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    let reviewType;
    if (booking.customer.toString() === req.user.id) {
      reviewType = 'customer_to_contractor';
    } else {
      reviewType = 'contractor_to_customer';
    }
    
    const review = new Review({
      booking: bookingId,
      reviewer: req.user.id,
      reviewee: revieweeId,
      reviewType,
      rating,
      comment,
      tags,
      wouldRecommend
    });
    
    await review.save();
    
    const reviews = await Review.find({ reviewee: revieweeId });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    
    await User.findByIdAndUpdate(revieweeId, { averageRating: avgRating });
    
    res.status(201).json({
      message: 'Review created',
      review
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ reviewee: req.params.userId })
      .populate('reviewer', 'firstName lastName profilePicture')
      .populate('booking')
      .sort({ createdAt: -1 });
    
    res.json({ reviews });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGivenReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ reviewer: req.user.id })
      .populate('reviewee', 'firstName lastName')
      .sort({ createdAt: -1 });
    
    res.json({ reviews });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createReview, getUserReviews, getGivenReviews };
