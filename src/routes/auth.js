import express from 'express';
import { registerCustomer, registerContractor, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/register/customer', registerCustomer);
router.post('/register/contractor', registerContractor);
router.post('/login', login);

export default router;
