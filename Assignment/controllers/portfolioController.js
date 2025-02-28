const Portfolio = require('../models/Portfolio');

const createPortfolio = async (req, res) => {
  const { title, description, img, codelink, livelink } = req.body;

  try {
    const newPortfolio = new Portfolio({
      title,
      description,
      img,
      codelink,
      livelink,
      user: req.user._id,
    });

    await newPortfolio.save();
    res.status(201).json(newPortfolio);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deletePortfolio = async (req, res) => {
  const { id } = req.params;

  try {
    const portfolio = await Portfolio.findById(id);
    if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });

    if (portfolio.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await portfolio.remove();
    res.json({ message: 'Portfolio deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updatePortfolio = async (req, res) => {
  const { id } = req.params;
  const { title, description, img, codelink, livelink } = req.body;

  try {
    const portfolio = await Portfolio.findById(id);
    if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });

    if (portfolio.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    portfolio.title = title || portfolio.title;
    portfolio.description = description || portfolio.description;
    portfolio.img = img || portfolio.img;
    portfolio.codelink = codelink || portfolio.codelink;
    portfolio.livelink = livelink || portfolio.livelink;

    await portfolio.save();
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find({ user: req.user._id });
    res.json(portfolios);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createPortfolio, deletePortfolio, updatePortfolio, getAllPortfolios };
