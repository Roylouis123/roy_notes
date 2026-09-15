/**
 * User Routes
 * 
 * This file defines all routes related to user management
 * including profile updates, role changes, and account management.
 */

const express = require('express');
const router = express.Router();
const { validateWithJoi } = require('../middleware/validationMiddleware');
const { protect, authorize, hasPermission } = require('../middleware/authMiddleware');
const { ROLES, PERMISSIONS } = require('../config/roles');
const { updateProfileSchema } = require('../validations/userValidation');
const {
  getUsers,
  getUserById,
  updateProfile,
  deleteUser,
  changeUserRole
} = require('../controllers/userController');

/**
 * @route   GET /api/users
 * @desc    Get all users
 * @access  Admin only
 */
router.get(
  '/',
  protect,
  authorize(ROLES.ADMIN),
  getUsers
);

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID
 * @access  Admin or own user
 */
router.get(
  '/:id',
  protect,
  getUserById
);

/**
 * @route   PUT /api/users/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put(
  '/profile',
  protect,
  validateWithJoi(updateProfileSchema),
  updateProfile
);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete user
 * @access  Admin or own user
 */
router.delete(
  '/:id',
  protect,
  deleteUser
);

/**
 * @route   PUT /api/users/:id/role
 * @desc    Change user role
 * @access  Admin only
 */
router.put(
  '/:id/role',
  protect,
  authorize(ROLES.ADMIN),
  changeUserRole
);

module.exports = router;