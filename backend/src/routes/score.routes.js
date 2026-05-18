const express = require('express');
const scoreController = require('../controllers/score.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authenticate);

router.get('/current', scoreController.getCurrentScore);
router.get('/history', scoreController.getScoreHistory);
router.get('/explainability', scoreController.getExplainability);
router.post('/calculate', scoreController.calculateScore);

module.exports = router;
