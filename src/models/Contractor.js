import mongoose from 'mongoose';
import User from './User.js';

const contractorSchema = new mongoose.Schema(
  {
    specialty: {
      type: String,
      enum: ['photography', 'videography', 'both'],
      required: true
    },
    bio: String,
    portfolio: {
      url: String,
      images: [String],
      videos: [String]
    },
    experience: {
      type: Number,
      description: 'Years of professional experience'
    },
    certifications: [String],
    equipment: [String],
    hourlyRate: {
      type: Number,
      required: true
    },
    availability: [
      {
        startDate: Date,
        endDate: Date,
        isAvailable: Boolean
      }
    ],
    serviceCoverage: {
      cities: [String],
      states: [String],
      countries: [String],
      willingToTravel: {
        type: Boolean,
        default: true
      }
    },
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
      }
    ],
    completedJobs: {
      type: Number,
      default: 0
    },
    averageRating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    reviews: [
      {
        booking: mongoose.Schema.Types.ObjectId,
        customer: mongoose.Schema.Types.ObjectId,
        rating: Number,
        comment: String,
        createdAt: Date
      }
    ],
    bankAccount: {
      accountHolder: String,
      accountNumber: String,
      routingNumber: String,
      bankName: String
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    verificationDocuments: [String]
  },
  { timestamps: true }
);

export default User.discriminator('contractor', contractorSchema);
