import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    submission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Submission',
      required: true
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    travelPlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TravelPlan'
    },
    packageTier: {
      type: String,
      enum: ['basic', 'premium', 'luxury'],
      required: true
    },
    photographer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    videographer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    jobDetails: {
      startDate: Date,
      endDate: Date,
      location: String,
      description: String,
      requirements: [String]
    },
    pricing: {
      basePrice: Number,
      photographerCost: Number,
      videographerCost: Number,
      totalCost: Number
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'confirmed', 'completed', 'cancelled'],
      default: 'pending'
    },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'deposit_paid', 'paid', 'refunded'],
      default: 'unpaid'
    },
    depositAmount: Number,
    depositPaid: {
      type: Boolean,
      default: false
    },
    notes: String,
    rating: {
      photographer: {
        score: Number,
        comment: String
      },
      videographer: {
        score: Number,
        comment: String
      }
    }
  },
  { timestamps: true }
);

export default mongoose.model('Booking', bookingSchema);
