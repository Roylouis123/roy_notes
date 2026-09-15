/**
 * Mock Request Utility
 * 
 * This file provides utility functions for creating mock
 * request and response objects for testing.
 */

/**
 * Create a mock Express request object
 * 
 * @param {Object} options - Request options
 * @returns {Object} Mock request object
 */
const mockRequest = (options = {}) => {
  const {
    body = {},
    params = {},
    query = {},
    headers = {},
    cookies = {},
    user = null,
    file = null,
    files = null,
    protocol = 'http',
    ip = '127.0.0.1',
    method = 'GET',
    originalUrl = '/test',
    path = '/test',
    hostname = 'localhost',
    get = jest.fn(header => {
      if (header === 'host') return hostname;
      return null;
    })
  } = options;

  return {
    body,
    params,
    query,
    headers,
    cookies,
    user,
    file,
    files,
    protocol,
    ip,
    method,
    originalUrl,
    path,
    hostname,
    get
  };
};

/**
 * Create a mock Express response object
 * 
 * @returns {Object} Mock response object
 */
const mockResponse = () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
    end: jest.fn().mockReturnThis(),
    cookie: jest.fn().mockReturnThis(),
    clearCookie: jest.fn().mockReturnThis(),
    redirect: jest.fn().mockReturnThis(),
    header: jest.fn().mockReturnThis(),
    locals: {},
    headersSent: false
  };
  
  // Track sent data for assertions
  res._getData = () => res.json.mock.calls[0]?.[0] || res.send.mock.calls[0]?.[0];
  
  // Track status code
  res._getStatusCode = () => res.status.mock.calls[0]?.[0];

  return res;
};

module.exports = {
  mockRequest,
  mockResponse
};