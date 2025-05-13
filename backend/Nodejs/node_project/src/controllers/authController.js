/**
 * Authentication Controller
 * 
 * This file contains handler functions for authentication routes
 * including login, registration, and password management.
 */

const User = require('../models/userModel');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const { sendPasswordResetEmail } = require('../utils/emailService');
const logger = require('../utils/logger');
const crypto = require('crypto');

/**
 * Register a new user
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Response with JWT token
 */
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 'User with this email already exists', 400);
    }
    
    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role // Role will be set to default if not provided
    });
    
    // Send JWT token
    sendTokenResponse(user, 201, res, 'User registered successfully');
  } catch (error) {
    logger.error(`Registration error: ${error.message}`);
    return errorResponse(res, 'Failed to register user', 500);
  }
};

/**
 * Login user
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Response with JWT token
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email and include password for authentication
    const user = await User.findOne({ email }).select('+password');
    
    // Check if user exists
    if (!user) {
      return errorResponse(res, 'Invalid credentials', 401);
    }
    
    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return errorResponse(res, 'Invalid credentials', 401);
    }
    
    // Update last login time
    user.lastLogin = Date.now();
    await user.save({ validateBeforeSave: false });
    
    // Send JWT token
    sendTokenResponse(user, 200, res, 'Login successful');
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    return errorResponse(res, 'Failed to authenticate user', 500);
  }
};

/**
 * Logout user
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Success response
 */
const logout = (req, res) => {
  // Clear JWT cookie
  res.cookie('token', '', {
    expires: new Date(0),
    httpOnly: true
  });
  
  return successResponse(res, 'Logged out successfully');
};

/**
 * Get current logged in user
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} User data
 */
const getCurrentUser = async (req, res) => {
  try {
    // User is already available from auth middleware
    const user = req.user;
    
    return successResponse(res, 'User data retrieved successfully', user);
  } catch (error) {
    logger.error(`Get current user error: ${error.message}`);
    return errorResponse(res, 'Failed to get user data', 500);
  }
};

/**
 * Forgot password - send reset email
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Success response
 */
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    
    // Always return success even if email doesn't exist for security
    if (!user) {
      return successResponse(
        res, 
        'If this email exists in our system, a password reset link has been sent'
      );
    }
    
    // Generate and save reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    
    // Create reset URL
    const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${resetToken}`;
    
    try {
      // Send reset email
      await sendPasswordResetEmail(email, resetToken, resetUrl);
      
      return successResponse(
        res, 
        'Password reset email sent'
      );
    } catch (error) {
      // Reset token and expiry on email error
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      
      logger.error(`Password reset email error: ${error.message}`);
      return errorResponse(res, 'Failed to send password reset email', 500);
    }
  } catch (error) {
    logger.error(`Forgot password error: ${error.message}`);
    return errorResponse(res, 'Failed to process password reset request', 500);
  }
};

/**
 * Reset password with token
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Response with JWT token
 */
const resetPassword = async (req, res) => {
  try {
    // Get hashed token
    const resetToken = req.params.resetToken;
    
    // Find user by reset token
    const user = await User.findByResetToken(resetToken);
    
    if (!user) {
      return errorResponse(res, 'Invalid or expired reset token', 400);
    }
    
    // Set new password
    user.password = req.body.password;
    
    // Clear reset token fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    
    // Save user
    await user.save();
    
    // Send JWT token
    sendTokenResponse(user, 200, res, 'Password reset successful');
  } catch (error) {
    logger.error(`Reset password error: ${error.message}`);
    return errorResponse(res, 'Failed to reset password', 500);
  }
};

/**
 * Update user password
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Response with JWT token
 */
const updatePassword = async (req, res) => {
  try {
    // Get user with password
    const user = await User.findById(req.user.id).select('+password');
    
    // Check current password
    const isMatch = await user.matchPassword(req.body.currentPassword);
    if (!isMatch) {
      return errorResponse(res, 'Current password is incorrect', 401);
    }
    
    // Set new password
    user.password = req.body.newPassword;
    await user.save();
    
    // Send JWT token
    sendTokenResponse(user, 200, res, 'Password updated successfully');
  } catch (error) {
    logger.error(`Update password error: ${error.message}`);
    return errorResponse(res, 'Failed to update password', 500);
  }
};

/**
 * Send response with JWT token
 * 
 * @param {Object} user - User document
 * @param {Number} statusCode - HTTP status code
 * @param {Object} res - Express response object
 * @param {String} message - Success message
 */
const sendTokenResponse = (user, statusCode, res, message) => {
  // Create JWT token
  const token = user.getSignedJwtToken();
  
  // Token expiration
  const expiresIn = process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000; // days to ms
  
  // Set cookie options
  const options = {
    expires: new Date(Date.now() + expiresIn),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' // Only send secure cookies in production
  };
  
  // Set cookie
  res.cookie('token', token, options);
  
  // Return response
  return successResponse(
    res,
    message,
    {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    },
    statusCode
  );
};

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  forgotPassword,
  resetPassword,
  updatePassword
};