/**
 * Test Setup File
 * 
 * This file sets up the testing environment for Jest.
 * It includes common test setup for all test files.
 */

// Set environment to test
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test_jwt_secret';
process.env.JWT_EXPIRE = '1h';
process.env.JWT_COOKIE_EXPIRE = '1';
process.env.MONGO_URI = 'mongodb://localhost:27017/node_project_test';

// Suppress console logs during tests unless explicitly enabled
if (!process.env.DEBUG_TESTS) {
  global.console = {
    ...console,
    log: jest.fn(),
    info: jest.fn(),
    debug: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
  };
}

// Global test utilities
global.testUtils = {
  // Generic function for testing middleware
  mockMiddleware: (middleware, req = {}, res = {}, next = jest.fn()) => {
    middleware(req, res, next);
    return { req, res, next };
  }
};

// Cleanup after tests
afterAll(async () => {
  // Add any cleanup code here
  // Note: we're using mocks for most tests, so actual database cleanup
  // would only be needed for integration tests
});