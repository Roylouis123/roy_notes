/**
 * API Response Utility Tests
 * 
 * This file tests the API response utility functions to ensure
 * they format responses correctly.
 */

const { successResponse, errorResponse, validationErrorResponse } = require('../../utils/apiResponse');

describe('API Response Utilities', () => {
  let mockRes;

  beforeEach(() => {
    // Create a mock response object with a status and json function
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
  });

  describe('successResponse', () => {
    it('should return a success response with default values', () => {
      successResponse(mockRes);
      
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message: 'Operation successful'
      });
    });

    it('should return a success response with provided data', () => {
      const data = { id: 1, name: 'Test' };
      successResponse(mockRes, 'Custom message', data, 201);
      
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message: 'Custom message',
        data
      });
    });

    it('should not include data when null', () => {
      successResponse(mockRes, 'No data message', null);
      
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message: 'No data message'
      });
    });
  });

  describe('errorResponse', () => {
    it('should return an error response with default values', () => {
      errorResponse(mockRes);
      
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'An error occurred'
      });
    });

    it('should return an error response with custom status code and message', () => {
      errorResponse(mockRes, 'Not found', 404);
      
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'Not found'
      });
    });

    it('should include errors when provided', () => {
      const errors = [
        { field: 'email', message: 'Email is required' }
      ];
      
      errorResponse(mockRes, 'Validation error', 400, errors);
      
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'Validation error',
        errors
      });
    });
  });

  describe('validationErrorResponse', () => {
    it('should return a validation error response', () => {
      const errors = [
        { field: 'name', message: 'Name is required' },
        { field: 'email', message: 'Email must be valid' }
      ];
      
      validationErrorResponse(mockRes, errors);
      
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'Validation failed',
        errors
      });
    });
  });
});