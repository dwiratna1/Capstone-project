const express = require('express');
const onboardingController = require('../controllers/onboarding.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/business', authenticate, onboardingController.saveBusinessData);
router.post('/financial', authenticate, onboardingController.saveFinancialData);

module.exports = router;
