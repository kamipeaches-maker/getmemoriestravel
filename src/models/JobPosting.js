import mongoose from 'mongoose';

const jobPostingSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: true
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    jobType: {
      type: String,
      enum: ['photography', 'videography', 'both'],
      required: true
    },
    title: String,
    description: String,
    location: {
      city: String,
      state: String,
      country: String
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    rate: {
      type: Number,
      required: true
    },
    requirements: [String],
    equipment: [String],
    status: {
      type: String,
      enum: ['open', 'applied', 'filled', 'completed'],
      default: 'open'
    },
    applications: [
      {
        contractor: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        status: {
          type: String,
          enum: ['pending', 'accepted', 'rejected'],
          default: 'pending'
        },
        appliedAt: Date
      }
    ],
    selectedContractor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    }
  },
  { timestamps: true }
);

export default mongoose.model('JobPosting', jobPostingSchema);
