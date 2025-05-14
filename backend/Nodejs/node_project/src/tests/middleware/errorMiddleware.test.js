/**
 * Error Middleware Tests
 * 
 * This file tests the error handling middleware to ensure
 * it correctly formats and returns error responses.
 */

const mongoose = require('mongoose');
const { errorHandler } = require('../../middleware/errorMiddleware');
const { errorResponse } = require('../../utils/apiResponse');
const logger = require('../../utils/logger');

// Mock dependencies
jest.mock('../../utils/apiResponse', () => ({
  errorResponse: jest.fn().mockReturnValue('error-response')
}));

jest.mock('../../utils/logger', () => ({
  error: jest.fn()
}));

describe('Error Middleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {};
    res = {};
    next = jest.fn();
    
    // Reset mocks
    errorResponse.mockClear();
    logger.error.mockClear();
  });

  it('should handle generic errors with default status code', () => {
    // Setup
    const err = new Error('Generic error');
    
    // Execute
    errorHandler(err, req, res, next);
    
    // Assert
    expect(logger.error).toHaveBeenCalledTimes(2); // Error message and stack
    expect(errorResponse).toHaveBeenCalledWith(
      res,
      'Generic error',
      500,
      null
    );
  });

  it('should handle errors with custom status code', () => {
    // Setup
    const err = new Error('Custom error');
    err.statusCode = 400;
    
    // Execute
    errorHandler(err, req, res, next);
    
    // Assert
    expect(errorResponse).toHaveBeenCalledWith(
      res,
      'Custom error',
      400,
      null
    );
  });

  it('should handle Mongoose validation errors', () => {
    // Setup
    const err = new mongoose.Error.ValidationError();
    err.errors = {
      name: {
        path: 'name',
        message: 'Name is required'
      },
      email: {
        path: 'email',
        message: 'Email must be valid'
      }
    };
    
    // Execute
    errorHandler(err, req, res, next);
    
    // Assert
    expect(errorResponse).toHaveBeenCalledWith(
      res,
      'Validation Error',
      400,
      [
        { field: 'name', message: 'Name is required' },
        { field: 'email', message: 'Email must be valid' }
      ]
    );
  });

  it('should handle Mongoose duplicate key errors', () => {
    // Setup
    const err = new Error('Duplicate key error');
    err.code = 11000;
    err.keyValue = { email: 'test@example.com' };
    
    // Execute
    errorHandler(err, req, res, next);
    
    // Assert
    expect(errorResponse).toHaveBeenCalledWith(
      res,
      'Duplicate field value entered',
      400,
      [{ field: 'email', message: 'email already exists' }]
    );
  });

  it('should handle Mongoose CastError (invalid ObjectId)', () => {
    // Setup
    const err = new mongoose.Error.CastError('ObjectId', 'invalid-id', '_id');
    
    // Execute
    errorHandler(err, req, res, next);
    
    // Assert
    expect(errorResponse).toHaveBeenCalledWith(
      res,
      'Invalid _id',
      400,
      [{ field: '_id', message: 'Invalid _id: invalid-id' }]
    );
  });

  it('should handle JWT errors', () => {
    // Setup
    const err = new Error('Invalid token');
    err.name = 'JsonWebTokenError';
    
    // Execute
    errorHandler(err, req, res, next);
    
    // Assert
    expect(errorResponse).toHaveBeenCalledWith(
      res,
      'Invalid token',
      401,
      null
    );
  });

  it('should handle token expired errors', () => {
    // Setup
    const err = new Error('Token expired');
    err.name = 'TokenExpiredError';
    
    // Execute
    errorHandler(err, req, res, next);
    
    // Assert
    expect(errorResponse).toHaveBeenCalledWith(
      res,
      'Token expired',
      401,
      null
    );
  });
});