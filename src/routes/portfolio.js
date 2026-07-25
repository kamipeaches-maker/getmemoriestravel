import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import {
  uploadPortfolioItem,
  getContractorPortfolio,
  deletePortfolioItem
} from '../controllers/portfolioController.js';

const router = express.Router();

router.post(
  '/upload',
  authenticate,
  authorize(['contractor']),
  upload.single('file'),
  uploadPortfolioItem
);

router.get('/:contractorId', authenticate, getContractorPortfolio);
router.delete('/:itemId', authenticate, authorize(['contractor']), deletePortfolioItem);

export default router;
