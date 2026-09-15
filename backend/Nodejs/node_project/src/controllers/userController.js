/**
 * User Controller
 * 
 * This file contains handler functions for user-related routes
 * for managing user profiles and accounts.
 */

const User = require('../models/userModel');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const logger = require('../utils/logger');

/**
 * Get all users
 * Admin only route
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} List of users with pagination
 */
const getUsers = async (req, res) => {
  try {
    // Get pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    
    // Get total count
    const total = await User.countDocuments();
    
    // Get users (exclude password)
    const users = await User.find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);
    
    // Pagination metadata
    const pagination = {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    };
    
    return successResponse(
      res, 
      'Users retrieved successfully', 
      { users, pagination }
    );
  } catch (error) {
    logger.error(`Get users error: ${error.message}`);
    return errorResponse(res, 'Failed to retrieve users', 500);
  }
};

/**
 * Get a single user by ID
 * Admin or own user only
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} User data
 */
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Check if this is the current user or an admin
    if (req.user.role !== 'admin' && req.user.id !== userId) {
      return errorResponse(res, 'Not authorized to access this user data', 403);
    }
    
    // Find user
    const user = await User.findById(userId);
    
    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }
    
    return successResponse(res, 'User retrieved successfully', user);
  } catch (error) {
    logger.error(`Get user error: ${error.message}`);
    return errorResponse(res, 'Failed to retrieve user', 500);
  }
};

/**
 * Update user profile
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Updated user data
 */
const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.user.id;
    
    // If email is being updated, check if it's already in use
    if (email && email !== req.user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return errorResponse(res, 'Email already in use', 400);
      }
    }
    
    // Update fields object
    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    
    // Update user
    const user = await User.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true, runValidators: true }
    );
    
    return successResponse(res, 'Profile updated successfully', user);
  } catch (error) {
    logger.error(`Update profile error: ${error.message}`);
    return errorResponse(res, 'Failed to update profile', 500);
  }
};

/**
 * Delete user account
 * Admin or own user only
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Success response
 */
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Check if this is the current user or an admin
    if (req.user.role !== 'admin' && req.user.id !== userId) {
      return errorResponse(res, 'Not authorized to delete this user', 403);
    }
    
    // Find and delete user
    const user = await User.findById(userId);
    
    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }
    
    await user.deleteOne();
    
    // If user deleted their own account, clear cookie
    if (req.user.id === userId) {
      res.cookie('token', '', {
        expires: new Date(0),
        httpOnly: true
      });
    }
    
    return successResponse(res, 'User deleted successfully');
  } catch (error) {
    logger.error(`Delete user error: ${error.message}`);
    return errorResponse(res, 'Failed to delete user', 500);
  }
};

/**
 * Change user role (admin only)
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Updated user data
 */
const changeUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const userId = req.params.id;
    
    // Check if changing own role
    if (req.user.id === userId) {
      return errorResponse(res, 'Cannot change your own role', 400);
    }
    
    // Find and update user
    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true, runValidators: true }
    );
    
    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }
    
    return successResponse(res, 'User role updated successfully', user);
  } catch (error) {
    logger.error(`Change user role error: ${error.message}`);
    return errorResponse(res, 'Failed to update user role', 500);
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateProfile,
  deleteUser,
  changeUserRole
};