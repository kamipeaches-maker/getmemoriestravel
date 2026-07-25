import User from '../models/User.js';
import Admin from '../models/Admin.js';

const getDashboardStats = async (req, res) => {
  try {
    const totalCustomers = await User.countDocuments({ userType: 'customer' });
    const totalContractors = await User.countDocuments({ userType: 'contractor' });
    const verifiedContractors = await User.countDocuments({
      userType: 'contractor',
      isVerified: true
    });

    res.json({
      totalCustomers,
      totalContractors,
      verifiedContractors
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { userType, page = 1, limit = 20 } = req.query;
    let query = {};

    if (userType) {
      query.userType = userType;
    }

    const users = await User.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);

    res.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyContractor = async (req, res) => {
  try {
    const contractor = await User.findByIdAndUpdate(
      req.params.contractorId,
      { isVerified: true },
      { new: true }
    );

    res.json({
      message: 'Contractor verified',
      contractor
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const suspendUser = async (req, res) => {
  try {
    const { reason } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { isActive: false },
      { new: true }
    );

    res.json({
      message: 'User suspended',
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getDashboardStats, getAllUsers, verifyContractor, suspendUser };
