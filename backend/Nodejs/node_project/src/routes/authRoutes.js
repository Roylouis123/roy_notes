/**
 * Authentication Routes
 * 
 * This file defines all routes related to authentication including
 * login, registration, and password management.
 */

const express = require('express');
const router = express.Router();
const { validateWithJoi } = require('../middleware/validationMiddleware');
const { protect } = require('../middleware/authMiddleware');
const {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updatePasswordSchema
} = require('../validations/userValidation');
const {
  register,
  login,
  logout,
  getCurrentUser,
  forgotPassword,
  resetPassword,
  updatePassword
} = require('../controllers/authController');

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', validateWithJoi(registerSchema), register);

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user & get token
 * @access  Public
 */
router.post('/login', validateWithJoi(loginSchema), login);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user & clear cookie
 * @access  Private
 */
router.post('/logout', protect, logout);

/**
 * @route   GET /api/auth/me
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/me', protect, getCurrentUser);

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Send password reset email
 * @access  Public
 */
router.post(
  '/forgot-password',
  validateWithJoi(forgotPasswordSchema),
  forgotPassword
);

/**
 * @route   PUT /api/auth/reset-password/:resetToken
 * @desc    Reset password with token
 * @access  Public
 */
router.put(
  '/reset-password/:resetToken',
  validateWithJoi(resetPasswordSchema),
  resetPassword
);

/**
 * @route   PUT /api/auth/update-password
 * @desc    Update logged in user's password
 * @access  Private
 */
router.put(
  '/update-password',
  protect,
  validateWithJoi(updatePasswordSchema),
  updatePassword
);

module.exports = router;