const express = require('express');
const authRoutes = require('./auth.routes');
const onboardingRoutes = require('./onboarding.routes');
const dashboardRoutes = require('./dashboard.routes');
const scoreRoutes = require('./score.routes');
const profileRoutes = require('./profile.routes');
const { sendSuccess } = require('../utils/response');

const router = express.Router();

router.get('/health', (req, res) => {
  return sendSuccess(res, {
    message: 'ModalIn backend is running',
  });
});

router.use('/auth', authRoutes);
router.use('/onboarding', onboardingRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/scores', scoreRoutes);
router.use('/profile', profileRoutes);

module.exports = router;
