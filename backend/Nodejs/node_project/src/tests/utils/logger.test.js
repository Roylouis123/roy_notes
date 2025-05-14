/**
 * Logger Utility Tests
 * 
 * This file tests the Winston logger utility to ensure
 * logging functionality is working correctly.
 */

const winston = require('winston');

// Spy on winston methods before importing logger
jest.mock('winston', () => {
  const mFormat = {
    combine: jest.fn().mockReturnThis(),
    timestamp: jest.fn().mockReturnThis(),
    colorize: jest.fn().mockReturnThis(),
    printf: jest.fn().mockReturnThis(),
    errors: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
  };
  
  const mockLogger = {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn()
  };
  
  return {
    format: mFormat,
    createLogger: jest.fn().mockReturnValue(mockLogger),
    transports: {
      Console: jest.fn(),
      File: jest.fn()
    },
    addColors: jest.fn()
  };
});

// Import logger after mocking
const logger = require('../../utils/logger');

describe('Logger Utility', () => {
  it('should create a Winston logger', () => {
    expect(winston.createLogger).toHaveBeenCalled();
  });
  
  it('should log info messages', () => {
    const message = 'Test info message';
    logger.info(message);
    
    expect(logger.info).toHaveBeenCalledWith(message);
  });
  
  it('should log error messages', () => {
    const message = 'Test error message';
    logger.error(message);
    
    expect(logger.error).toHaveBeenCalledWith(message);
  });
  
  it('should log warning messages', () => {
    const message = 'Test warning message';
    logger.warn(message);
    
    expect(logger.warn).toHaveBeenCalledWith(message);
  });
  
  it('should log debug messages', () => {
    const message = 'Test debug message';
    logger.debug(message);
    
    expect(logger.debug).toHaveBeenCalledWith(message);
  });
});