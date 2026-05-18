const express = require('express');
const profileController = require('../controllers/profile.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authenticate);

router.get('/', profileController.getProfile);
router.put('/', profileController.updateProfile);
router.put('/business', profileController.updateBusinessProfile);
router.put('/financial', profileController.updateFinancialProfile);

module.exports = router;
