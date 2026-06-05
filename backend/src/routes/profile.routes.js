const express = require('express');
const multer = require('multer');
const path = require('path');
const profileController = require('../controllers/profile.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const uploadsPath = path.join(__dirname, '..', '..', 'uploads');
const storage = multer.diskStorage({
  destination: uploadsPath,
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, `${timestamp}-${safeName}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
      return cb(null, true);
    }
    cb(new Error('Only JPG and PNG images are allowed'));
  },
});

const router = express.Router();

router.use(authenticate);

router.get('/', profileController.getProfile);
router.put('/', profileController.updateProfile);
router.put('/business', profileController.updateBusinessProfile);
router.put('/financial', profileController.updateFinancialProfile);
router.post('/business/image', upload.single('image'), profileController.uploadBusinessImage);

module.exports = router;
