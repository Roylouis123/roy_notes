/**
 * Error Handling Middleware
 * 
 * This file contains middleware for centralized error handling
 * to provide consistent error responses across the API.
 */

const logger = require('../utils/logger');
const mongoose = require('mongoose');
const { errorResponse } = require('../utils/apiResponse');

/**
 * Error handler middleware - Processes all errors and sends appropriate responses
 * 
 * @param {Object} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const errorHandler = (err, req, res, next) => {
  // Log the error for debugging
  logger.error(`${err.name}: ${err.message}`);
  logger.error(err.stack);

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Server Error';
  let errors = [];

  // Handle specific error types for better client responses
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
    
    // Extract validation errors
    Object.values(err.errors).forEach(error => {
      errors.push({
        field: error.path,
        message: error.message
      });
    });
  }
  
  // Mongoose duplicate key error
  else if (err.code === 11000) {
    statusCode = 400;
    message = 'Duplicate field value entered';
    
    // Extract the field that caused the error
    const field = Object.keys(err.keyValue)[0];
    errors.push({
      field,
      message: `${field} already exists`
    });
  }
  
  // Mongoose CastError (invalid ObjectId)
  else if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = `Invalid ${err.path}`;
    errors.push({
      field: err.path,
      message: `Invalid ${err.path}: ${err.value}`
    });
  }
  
  // JSON Web Token error
  else if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  }
  
  // Token expired error
  else if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  }

  // Send standardized error response
  return errorResponse(
    res,
    message,
    statusCode,
    errors.length > 0 ? errors : null
  );
};

module.exports = { errorHandler };