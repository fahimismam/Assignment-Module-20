const express = require('express');
const { createPortfolio, deletePortfolio, updatePortfolio, getAllPortfolios } = require('../controllers/portfolioController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createPortfolio);
router.delete('/:id', authMiddleware, deletePortfolio);
router.put('/:id', authMiddleware, updatePortfolio);
router.get('/', authMiddleware, getAllPortfolios);

module.exports = router;
