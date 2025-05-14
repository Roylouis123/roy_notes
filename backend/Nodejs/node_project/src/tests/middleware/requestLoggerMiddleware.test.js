/**
 * Request Logger Middleware Tests
 * 
 * This file tests the request logger middleware to ensure
 * it correctly logs HTTP requests.
 */

const { requestLogger } = require('../../middleware/requestLoggerMiddleware');
const logger = require('../../utils/logger');

// Mock dependencies
jest.mock('../../utils/logger', () => ({
  info: jest.fn(),
  debug: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
}));

describe('Request Logger Middleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    // Setup request object
    req = {
      method: 'GET',
      originalUrl: '/api/test',
      body: {}
    };
    
    // Setup response object with event emitters
    res = {
      statusCode: 200,
      statusMessage: 'OK',
      on: jest.fn((event, callback) => {
        // Store callbacks to call them later
        if (event === 'finish') {
          res.finishCallback = callback;
        } else if (event === 'error') {
          res.errorCallback = callback;
        }
      })
    };
    
    next = jest.fn();
    
    // Reset logger mocks
    logger.info.mockReset();
    logger.debug.mockReset();
    logger.warn.mockReset();
    logger.error.mockReset();
    
    // Mock Date.now to control timing
    jest.spyOn(Date, 'now')
      .mockReturnValueOnce(1000)  // Start time
      .mockReturnValueOnce(1500); // End time (500ms later)
  });

  afterEach(() => {
    // Restore Date.now
    Date.now.mockRestore();
  });

  it('should log basic request information', () => {
    // Execute
    requestLogger(req, res, next);
    
    // Assert - Initial log
    expect(logger.info).toHaveBeenCalledWith('GET /api/test [STARTED]');
    expect(next).toHaveBeenCalled();
  });

  it('should log request body if present', () => {
    // Setup
    req.body = {
      name: 'Test User',
      email: 'test@example.com'
    };
    
    // Execute
    requestLogger(req, res, next);
    
    // Assert
    expect(logger.debug).toHaveBeenCalledWith(
      'Request body: {"name":"Test User","email":"test@example.com"}'
    );
  });

  it('should filter sensitive information from request body', () => {
    // Setup
    req.body = {
      email: 'test@example.com',
      password: 'secret123',
      confirmPassword: 'secret123',
      currentPassword: 'oldsecret',
      token: 'jwt-token'
    };
    
    // Execute
    requestLogger(req, res, next);
    
    // Assert
    expect(logger.debug).toHaveBeenCalledWith(expect.stringContaining('[FILTERED]'));
    expect(logger.debug).not.toHaveBeenCalledWith(expect.stringContaining('secret123'));
    expect(logger.debug).not.toHaveBeenCalledWith(expect.stringContaining('oldsecret'));
    expect(logger.debug).not.toHaveBeenCalledWith(expect.stringContaining('jwt-token'));
  });

  it('should log successful response completion', () => {
    // Execute
    requestLogger(req, res, next);
    
    // Simulate response finish
    res.finishCallback();
    
    // Assert
    expect(logger.info).toHaveBeenCalledWith(
      'GET /api/test [FINISHED] 200 OK - 500ms'
    );
  });

  it('should log error responses with warn level', () => {
    // Setup
    res.statusCode = 404;
    res.statusMessage = 'Not Found';
    
    // Execute
    requestLogger(req, res, next);
    
    // Simulate response finish
    res.finishCallback();
    
    // Assert
    expect(logger.warn).toHaveBeenCalledWith(
      'GET /api/test [FINISHED] 404 Not Found - 500ms'
    );
  });

  it('should log response errors', () => {
    // Execute
    requestLogger(req, res, next);
    
    // Simulate error
    const error = new Error('Test error');
    res.errorCallback(error);
    
    // Assert
    expect(logger.error).toHaveBeenCalledWith(
      'GET /api/test [ERROR] Test error - 500ms'
    );
  });
});