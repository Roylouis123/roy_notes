/**
 * Authentication Middleware
 * 
 * This file contains middleware functions to handle authentication
 * and authorization for protected routes.
 */

const jwt = require('jsonwebtoken');
const { ROLE_PERMISSIONS } = require('../config/roles');
const User = require('../models/userModel');
const { errorResponse } = require('../utils/apiResponse');
const logger = require('../utils/logger');

/**
 * Protect routes - Verifies JWT token and attaches user to request
 * 
 * This middleware checks if the user is authenticated by verifying
 * the JWT token in the Authorization header or cookie.
 */
const protect = async (req, res, next) => {
  let token;
  
  // Check for token in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // Get token from header
    token = req.headers.authorization.split(' ')[1];
  } 
  // Check for token in cookie
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Check if token exists
  if (!token) {
    return errorResponse(res, 'Not authorized to access this route', 401);
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from token id
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return errorResponse(res, 'User not found', 401);
    }
    
    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    logger.error(`Auth error: ${error.message}`);
    
    if (error.name === 'JsonWebTokenError') {
      return errorResponse(res, 'Invalid token', 401);
    } else if (error.name === 'TokenExpiredError') {
      return errorResponse(res, 'Token expired', 401);
    }
    
    return errorResponse(res, 'Not authorized to access this route', 401);
  }
};

/**
 * Authorize roles - Checks if user has the required role
 * 
 * @param  {...String} roles - Allowed roles for the route
 * @returns Middleware function
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return errorResponse(res, 'User not authenticated', 401);
    }

    if (!roles.includes(req.user.role)) {
      return errorResponse(
        res, 
        `User role ${req.user.role} is not authorized to access this route`, 
        403
      );
    }
    
    next();
  };
};

/**
 * Check permission - Verifies if user has the required permission
 * 
 * @param {String} permission - Required permission
 * @returns Middleware function
 */
const hasPermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return errorResponse(res, 'User not authenticated', 401);
    }

    const userRole = req.user.role;
    const userPermissions = ROLE_PERMISSIONS[userRole] || [];
    
    if (!userPermissions.includes(permission)) {
      return errorResponse(
        res, 
        `You don't have permission to perform this action`, 
        403
      );
    }
    
    next();
  };
};

module.exports = { protect, authorize, hasPermission };