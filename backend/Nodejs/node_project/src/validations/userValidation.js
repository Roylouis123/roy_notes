/**
 * User Validation Schemas
 * 
 * This file defines validation schemas for user-related operations
 * using Joi for advanced validation.
 */

const Joi = require('joi');
const { ROLES } = require('../config/roles');

// Registration validation schema
const registerSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 2 characters',
      'string.max': 'Name cannot exceed 50 characters',
      'any.required': 'Name is required'
    }),
    
  email: Joi.string()
    .email()
    .lowercase()
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email',
      'any.required': 'Email is required'
    }),
    
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 6 characters',
      'any.required': 'Password is required'
    }),
    
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'string.empty': 'Please confirm your password',
      'any.only': 'Passwords do not match',
      'any.required': 'Please confirm your password'
    }),
    
  role: Joi.string()
    .valid(...Object.values(ROLES))
    .optional()
});

// Login validation schema
const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email',
      'any.required': 'Email is required'
    }),
    
  password: Joi.string()
    .required()
    .messages({
      'string.empty': 'Password is required',
      'any.required': 'Password is required'
    })
});

// Forgot password validation schema
const forgotPasswordSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email',
      'any.required': 'Email is required'
    })
});

// Reset password validation schema
const resetPasswordSchema = Joi.object({
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 6 characters',
      'any.required': 'Password is required'
    }),
    
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'string.empty': 'Please confirm your password',
      'any.only': 'Passwords do not match',
      'any.required': 'Please confirm your password'
    })
});

// Update profile validation schema
const updateProfileSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .optional()
    .messages({
      'string.min': 'Name must be at least 2 characters',
      'string.max': 'Name cannot exceed 50 characters'
    }),
    
  email: Joi.string()
    .email()
    .lowercase()
    .optional()
    .messages({
      'string.email': 'Please provide a valid email'
    })
});

// Update password validation schema
const updatePasswordSchema = Joi.object({
  currentPassword: Joi.string()
    .required()
    .messages({
      'string.empty': 'Current password is required',
      'any.required': 'Current password is required'
    }),
    
  newPassword: Joi.string()
    .min(6)
    .required()
    .disallow(Joi.ref('currentPassword'))
    .messages({
      'string.empty': 'New password is required',
      'string.min': 'New password must be at least 6 characters',
      'any.required': 'New password is required',
      'any.invalid': 'New password cannot be the same as current password'
    }),
    
  confirmPassword: Joi.string()
    .valid(Joi.ref('newPassword'))
    .required()
    .messages({
      'string.empty': 'Please confirm your new password',
      'any.only': 'Passwords do not match',
      'any.required': 'Please confirm your new password'
    })
});

module.exports = {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updateProfileSchema,
  updatePasswordSchema
};