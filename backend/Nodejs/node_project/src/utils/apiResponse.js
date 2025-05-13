/**
 * API Response Utility
 * 
 * This file provides standardized response formats for API endpoints.
 * It ensures consistent response structures across the application.
 */

/**
 * Send a success response
 * 
 * @param {Object} res - Express response object
 * @param {String} message - Success message
 * @param {*} data - Data to be sent in response
 * @param {Number} statusCode - HTTP status code
 * @returns {Object} Formatted success response
 */
const successResponse = (res, message = 'Operation successful', data = null, statusCode = 200) => {
  const response = {
    success: true,
    message
  };

  if (data !== null) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};

/**
 * Send an error response
 * 
 * @param {Object} res - Express response object
 * @param {String} message - Error message
 * @param {Number} statusCode - HTTP status code
 * @param {Array} errors - Array of specific error details
 * @returns {Object} Formatted error response
 */
const errorResponse = (res, message = 'An error occurred', statusCode = 500, errors = null) => {
  const response = {
    success: false,
    message
  };

  if (errors !== null) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};

/**
 * Send a validation error response
 * 
 * @param {Object} res - Express response object
 * @param {Array} errors - Validation errors
 * @returns {Object} Formatted validation error response
 */
const validationErrorResponse = (res, errors) => {
  return errorResponse(
    res, 
    'Validation failed', 
    400, 
    errors
  );
};

module.exports = {
  successResponse,
  errorResponse,
  validationErrorResponse
};