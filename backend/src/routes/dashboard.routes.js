const express = require('express');
const dashboardController = require('../controllers/dashboard.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authenticate);

router.get('/summary', dashboardController.getDashboardSummary);
router.get('/activities', dashboardController.getDashboardActivities);
router.get('/recommendations', dashboardController.getDashboardRecommendations);
router.get('/', dashboardController.getDashboard);

module.exports = router;
