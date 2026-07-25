import PortfolioItem from '../models/PortfolioItem.js';
import User from '../models/User.js';

const uploadPortfolioItem = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const portfolioItem = new PortfolioItem({
      contractor: req.user.id,
      title,
      description,
      category,
      imageUrl: `/uploads/${req.file.filename}`
    });

    await portfolioItem.save();

    res.status(201).json({
      message: 'Portfolio item uploaded',
      portfolioItem
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getContractorPortfolio = async (req, res) => {
  try {
    const portfolio = await PortfolioItem.find({
      contractor: req.params.contractorId
    }).sort({ createdAt: -1 });

    res.json({ portfolio });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePortfolioItem = async (req, res) => {
  try {
    const item = await PortfolioItem.findById(req.params.itemId);

    if (!item) {
      return res.status(404).json({ error: 'Portfolio item not found' });
    }

    if (item.contractor.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await PortfolioItem.findByIdAndDelete(req.params.itemId);

    res.json({ message: 'Portfolio item deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { uploadPortfolioItem, getContractorPortfolio, deletePortfolioItem };
