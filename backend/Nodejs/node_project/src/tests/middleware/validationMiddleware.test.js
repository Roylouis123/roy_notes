/**
 * Validation Middleware Tests
 * 
 * This file tests the validation middleware to ensure
 * it correctly validates request data.
 */

const { validationResult } = require('express-validator');
const Joi = require('joi');
const { validate, validateWithJoi } = require('../../middleware/validationMiddleware');
const { validationErrorResponse } = require('../../utils/apiResponse');

// Mock dependencies
jest.mock('express-validator', () => ({
  validationResult: jest.fn()
}));

jest.mock('../../utils/apiResponse', () => ({
  validationErrorResponse: jest.fn().mockReturnValue('validation-error-response')
}));

describe('Validation Middleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      body: {}
    };
    res = {};
    next = jest.fn();
    
    // Reset mocks
    validationResult.mockReset();
    validationErrorResponse.mockReset();
    validationErrorResponse.mockReturnValue('validation-error-response');
  });

  describe('validate', () => {
    it('should call next when validation passes', () => {
      // Setup
      validationResult.mockReturnValue({
        isEmpty: jest.fn().mockReturnValue(true)
      });
      
      // Execute
      validate(req, res, next);
      
      // Assert
      expect(validationResult).toHaveBeenCalledWith(req);
      expect(next).toHaveBeenCalled();
      expect(validationErrorResponse).not.toHaveBeenCalled();
    });

    it('should return validation errors when validation fails', () => {
      // Setup
      const errors = [
        { path: 'name', msg: 'Name is required' },
        { path: 'email', msg: 'Email must be valid' }
      ];
      
      validationResult.mockReturnValue({
        isEmpty: jest.fn().mockReturnValue(false),
        array: jest.fn().mockReturnValue(errors)
      });
      
      // Execute
      validate(req, res, next);
      
      // Assert
      expect(validationResult).toHaveBeenCalledWith(req);
      expect(next).not.toHaveBeenCalled();
      expect(validationErrorResponse).toHaveBeenCalledWith(res, [
        { field: 'name', message: 'Name is required' },
        { field: 'email', message: 'Email must be valid' }
      ]);
    });
  });

  describe('validateWithJoi', () => {
    it('should call next when validation passes', () => {
      // Setup
      req.body = { name: 'Test User', email: 'test@example.com' };
      
      const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required()
      });
      
      const middleware = validateWithJoi(schema);
      
      // Execute
      middleware(req, res, next);
      
      // Assert
      expect(next).toHaveBeenCalled();
      expect(validationErrorResponse).not.toHaveBeenCalled();
    });

    it('should return validation errors when validation fails', () => {
      // Setup
      req.body = { name: '', email: 'not-an-email' };
      
      const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required()
      });
      
      const middleware = validateWithJoi(schema);
      
      // Execute
      middleware(req, res, next);
      
      // Assert
      expect(next).not.toHaveBeenCalled();
      expect(validationErrorResponse).toHaveBeenCalledWith(
        res,
        expect.arrayContaining([
          expect.objectContaining({ field: expect.any(String), message: expect.any(String) }),
          expect.objectContaining({ field: expect.any(String), message: expect.any(String) })
        ])
      );
    });

    it('should validate different request properties based on parameter', () => {
      // Setup
      req.body = { name: 'Test User' };
      req.params = { id: '123' };
      req.query = { page: '1', limit: '10' };
      
      // Create schemas for different properties
      const paramsSchema = Joi.object({
        id: Joi.string().required()
      });
      
      const querySchema = Joi.object({
        page: Joi.string().required(),
        limit: Joi.string().required()
      });
      
      // Create middlewares
      const validateParams = validateWithJoi(paramsSchema, 'params');
      const validateQuery = validateWithJoi(querySchema, 'query');
      
      // Execute
      validateParams(req, res, next);
      expect(next).toHaveBeenCalled();
      
      next.mockClear();
      
      validateQuery(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });
});