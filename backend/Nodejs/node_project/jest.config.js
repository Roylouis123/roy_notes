/**
 * Jest Configuration
 * 
 * This file configures Jest for testing the Node.js application.
 */

module.exports = {
  // The test environment that will be used for testing
  testEnvironment: 'node',
  
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  
  // Indicates whether the coverage information should be collected
  collectCoverage: true,
  
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  
  // An array of glob patterns indicating a set of files for which coverage should be collected
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/server.js',
    '!src/tests/**/*.js',
    '!**/node_modules/**'
  ],
  
  // The test match pattern
  testMatch: ['**/tests/**/*.test.js'],
  
  // Setup files after environment is setup
  setupFilesAfterEnv: ['./src/tests/setup.js'],
  
  // Timeouts for tests
  testTimeout: 10000
};