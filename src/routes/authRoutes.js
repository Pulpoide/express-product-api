const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authValidator = require('../middlewares/validators/authValidator');
const validatorMiddleware = require('../middlewares/validatorMiddleware');
const loginLimiter = require('../middlewares/rateLimiter');

router.post('/signup', authValidator.signup, validatorMiddleware, authController.postSignUp);

router.post(
  '/signin',
  loginLimiter,
  authValidator.signin,
  validatorMiddleware,
  authController.postSignIn
);

router.post(
  '/send-code',
  authValidator.sendCode,
  validatorMiddleware,
  authController.sendVerificationCode
);

router.post(
  '/forgot-password',
  authValidator.forgotPassword,
  validatorMiddleware,
  authController.forgotPassword
);

router.post(
  '/reset-password',
  authValidator.resetPassword,
  validatorMiddleware,
  authController.resetPassword
);

module.exports = router;
