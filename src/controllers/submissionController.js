import Submission from '../models/Submission.js';
import TravelPlan from '../models/TravelPlan.js';

const createSubmission = async (req, res) => {
  try {
    const {
      destination,
      startDate,
      endDate,
      budget,
      travelersCount,
      packageTier,
      includePhotography,
      includeVideography,
      preferences
    } = req.body;
    
    const submission = new Submission({
      customer: req.user.id,
      destination,
      startDate,
      endDate,
      budget,
      travelersCount,
      packageTier,
      includePhotography,
      includeVideography,
      preferences
    });
    
    await submission.save();
    
    res.status(201).json({
      message: 'Travel submission created',
      submission
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ customer: req.user.id }).sort({ createdAt: -1 });
    res.json({ submissions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSubmissionById = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    res.json({ submission });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateTravelPlan = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.submissionId);
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    
    const travelPlan = new TravelPlan({
      submission: submission._id,
      customer: submission.customer,
      title: `${submission.destination} Adventure`,
      itinerary: [],
      totalCost: submission.budget,
      includesPhotographer: submission.includePhotography,
      includesVideographer: submission.includeVideography,
      status: 'draft'
    });
    
    await travelPlan.save();
    submission.travelPlan = travelPlan._id;
    await submission.save();
    
    res.status(201).json({
      message: 'Travel plan generated',
      travelPlan
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createSubmission,
  getSubmissions,
  getSubmissionById,
  generateTravelPlan
};
