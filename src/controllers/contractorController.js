import User from '../models/User.js';
import Contractor from '../models/Contractor.js';

const getAllContractors = async (req, res) => {
  try {
    const { specialty, city, state, minRating } = req.query;
    
    let query = { userType: 'contractor', isActive: true };
    
    if (specialty) {
      query.specialty = specialty;
    }
    
    if (city || state) {
      query['serviceCoverage.cities'] = city || query['serviceCoverage.cities'];
      query['serviceCoverage.states'] = state || query['serviceCoverage.states'];
    }
    
    if (minRating) {
      query.averageRating = { $gte: minRating };
    }
    
    const contractors = await User.find(query)
      .select('firstName lastName specialty hourlyRate averageRating bio experience')
      .sort({ averageRating: -1 });
    
    res.json({ contractors });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getContractorProfile = async (req, res) => {
  try {
    const contractor = await User.findById(req.params.contractorId);
    
    if (!contractor || contractor.userType !== 'contractor') {
      return res.status(404).json({ error: 'Contractor not found' });
    }
    
    res.json({ contractor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateContractorProfile = async (req, res) => {
  try {
    const {
      bio,
      experience,
      hourlyRate,
      portfolio,
      certifications,
      serviceCoverage
    } = req.body;
    
    const contractor = await User.findByIdAndUpdate(
      req.user.id,
      {
        bio,
        experience,
        hourlyRate,
        portfolio,
        certifications,
        serviceCoverage
      },
      { new: true }
    );
    
    res.json({
      message: 'Profile updated',
      contractor
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAvailability = async (req, res) => {
  try {
    const { startDate, endDate, isAvailable } = req.body;
    
    const contractor = await User.findById(req.user.id);
    
    contractor.availability.push({
      startDate,
      endDate,
      isAvailable
    });
    
    await contractor.save();
    
    res.json({
      message: 'Availability updated',
      contractor
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getAllContractors,
  getContractorProfile,
  updateContractorProfile,
  updateAvailability
};
