/**
 * Product Validation Schemas
 * 
 * This file defines validation schemas for product-related operations
 * using Joi for advanced validation.
 */

const Joi = require('joi');

// Create product validation schema
const createProductSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Product name is required',
      'string.min': 'Product name must be at least 2 characters',
      'string.max': 'Product name cannot exceed 100 characters',
      'any.required': 'Product name is required'
    }),
    
  description: Joi.string()
    .max(1000)
    .required()
    .messages({
      'string.empty': 'Product description is required',
      'string.max': 'Description cannot exceed 1000 characters',
      'any.required': 'Product description is required'
    }),
    
  price: Joi.number()
    .min(0)
    .required()
    .messages({
      'number.base': 'Price must be a number',
      'number.min': 'Price cannot be negative',
      'any.required': 'Price is required'
    }),
    
  category: Joi.string()
    .trim()
    .required()
    .messages({
      'string.empty': 'Category is required',
      'any.required': 'Category is required'
    }),
    
  inStock: Joi.boolean()
    .default(true),
    
  quantity: Joi.number()
    .integer()
    .min(0)
    .default(0)
    .messages({
      'number.base': 'Quantity must be a number',
      'number.integer': 'Quantity must be an integer',
      'number.min': 'Quantity cannot be negative'
    }),
    
  imageUrl: Joi.string()
    .uri()
    .allow('')
    .default('no-image.jpg')
    .messages({
      'string.uri': 'Image URL must be a valid URL'
    })
});

// Update product validation schema
const updateProductSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .optional()
    .messages({
      'string.min': 'Product name must be at least 2 characters',
      'string.max': 'Product name cannot exceed 100 characters'
    }),
    
  description: Joi.string()
    .max(1000)
    .optional()
    .messages({
      'string.max': 'Description cannot exceed 1000 characters'
    }),
    
  price: Joi.number()
    .min(0)
    .optional()
    .messages({
      'number.base': 'Price must be a number',
      'number.min': 'Price cannot be negative'
    }),
    
  category: Joi.string()
    .trim()
    .optional(),
    
  inStock: Joi.boolean()
    .optional(),
    
  quantity: Joi.number()
    .integer()
    .min(0)
    .optional()
    .messages({
      'number.base': 'Quantity must be a number',
      'number.integer': 'Quantity must be an integer',
      'number.min': 'Quantity cannot be negative'
    }),
    
  imageUrl: Joi.string()
    .uri()
    .allow('')
    .optional()
    .messages({
      'string.uri': 'Image URL must be a valid URL'
    })
});

// Query validation schema for product filtering
const productQuerySchema = Joi.object({
  page: Joi.number()
    .integer()
    .min(1)
    .default(1)
    .messages({
      'number.base': 'Page must be a number',
      'number.integer': 'Page must be an integer',
      'number.min': 'Page must be at least 1'
    }),
    
  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(10)
    .messages({
      'number.base': 'Limit must be a number',
      'number.integer': 'Limit must be an integer',
      'number.min': 'Limit must be at least 1',
      'number.max': 'Limit cannot exceed 100'
    }),
    
  sort: Joi.string()
    .valid('name', 'price', 'createdAt', '-name', '-price', '-createdAt')
    .default('createdAt')
    .messages({
      'any.only': 'Sort parameter is invalid'
    }),
    
  category: Joi.string()
    .trim()
    .optional(),
    
  minPrice: Joi.number()
    .min(0)
    .optional()
    .messages({
      'number.base': 'Minimum price must be a number',
      'number.min': 'Minimum price cannot be negative'
    }),
    
  maxPrice: Joi.number()
    .min(0)
    .greater(Joi.ref('minPrice'))
    .optional()
    .messages({
      'number.base': 'Maximum price must be a number',
      'number.min': 'Maximum price cannot be negative',
      'number.greater': 'Maximum price must be greater than minimum price'
    }),
    
  search: Joi.string()
    .trim()
    .optional(),
    
  inStock: Joi.boolean()
    .optional()
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  productQuerySchema
};