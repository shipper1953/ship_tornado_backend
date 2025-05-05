const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const rateLimit = require('express-rate-limit');
const { body } = require('express-validator');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 10, // limit to 10 requests per IP
  message: { error: 'Too many requests, please try again later.' },
});

router.post(
    '/register',
    authLimiter,
    [
      body('email').isEmail().withMessage('Valid email required'),
      body('password').isLength({ min: 6 }).withMessage('Password must be 6+ chars'),
      body('company_id').isUUID().withMessage('Valid company_id required'),
    ],
    authController.register
  );
router.post(
    '/login',
    authLimiter,
    [
      body('email').isEmail(),
      body('password').notEmpty(),
    ],
    authController.login
  );

router.get('/me', authMiddleware, authController.getProfile);

module.exports = router;
