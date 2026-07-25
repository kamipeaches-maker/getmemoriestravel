import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    destination: {
      type: String,
      required: [true, 'Travel destination is required']
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required']
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required']
    },
    budget: {
      type: Number,
      required: [true, 'Budget is required']
    },
    travelersCount: {
      type: Number,
      required: [true, 'Number of travelers is required']
    },
    packageTier: {
      type: String,
      enum: ['basic', 'premium', 'luxury'],
      default: 'premium'
    },
    includePhotography: {
      type: Boolean,
      default: true
    },
    includeVideography: {
      type: Boolean,
      default: true
    },
    preferences: {
      type: String,
      description: 'Additional preferences and requirements'
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'approved', 'rejected'],
      default: 'pending'
    },
    travelPlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TravelPlan',
      default: null
    }
  },
  { timestamps: true }
);

export default mongoose.model('Submission', submissionSchema);
