/**
 * Validation Middleware
 * 
 * This file contains middleware functions for validating request data
 * using express-validator and Joi for different validation approaches.
 */

const { validationResult } = require('express-validator');
const { validationErrorResponse } = require('../utils/apiResponse');

/**
 * Validate request with express-validator rules
 * 
 * Use this middleware after defining validation rules with express-validator
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map(err => ({
      field: err.path,
      message: err.msg
    }));
    
    return validationErrorResponse(res, extractedErrors);
  }
  
  next();
};

/**
 * Validate request with Joi schema
 * 
 * @param {Object} schema - Joi validation schema
 * @param {String} property - Request property to validate (body, params, query)
 * @returns {Function} Middleware function
 */
const validateWithJoi = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], { 
      abortEarly: false,
      stripUnknown: true
    });
    
    if (!error) {
      return next();
    }
    
    const extractedErrors = error.details.map(err => ({
      field: err.path.join('.'),
      message: err.message
    }));
    
    return validationErrorResponse(res, extractedErrors);
  };
};

module.exports = {
  validate,
  validateWithJoi
};