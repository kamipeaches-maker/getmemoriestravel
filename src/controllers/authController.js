import User from '../models/User.js';
import Customer from '../models/Customer.js';
import Contractor from '../models/Contractor.js';
import { generateToken } from '../utils/auth.js';

const registerCustomer = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    const customer = new Customer({
      email,
      password,
      firstName,
      lastName,
      phone,
      userType: 'customer'
    });
    
    await customer.save();
    
    const token = generateToken(customer._id, 'customer');
    
    res.status(201).json({
      message: 'Customer registered successfully',
      token,
      user: {
        id: customer._id,
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        userType: 'customer'
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const registerContractor = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone, specialty, hourlyRate } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    const contractor = new Contractor({
      email,
      password,
      firstName,
      lastName,
      phone,
      specialty,
      hourlyRate,
      userType: 'contractor'
    });
    
    await contractor.save();
    
    const token = generateToken(contractor._id, 'contractor');
    
    res.status(201).json({
      message: 'Contractor registered successfully',
      token,
      user: {
        id: contractor._id,
        email: contractor.email,
        firstName: contractor.firstName,
        lastName: contractor.lastName,
        specialty: contractor.specialty,
        userType: 'contractor'
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    user.lastLogin = new Date();
    await user.save();
    
    const token = generateToken(user._id, user.userType);
    
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userType: user.userType
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { registerCustomer, registerContractor, login };
