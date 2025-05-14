/**
 * Authentication Middleware Tests
 * 
 * This file tests the authentication middleware to ensure
 * it correctly protects routes and verifies permissions.
 */

const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');
const { ROLE_PERMISSIONS } = require('../../config/roles');
const { protect, authorize, hasPermission } = require('../../middleware/authMiddleware');
const { errorResponse } = require('../../utils/apiResponse');

// Mock dependencies
jest.mock('jsonwebtoken');
jest.mock('../../models/userModel');
jest.mock('../../utils/apiResponse');
jest.mock('../../utils/logger', () => ({
  error: jest.fn()
}));

describe('Auth Middleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      headers: {},
      cookies: {}
    };
    res = {};
    next = jest.fn();
    
    // Reset mocks
    jwt.verify.mockReset();
    User.findById.mockReset();
    errorResponse.mockReset();
    errorResponse.mockImplementation(() => 'error-response');
  });

  describe('protect', () => {
    it('should call next when valid token in Authorization header', async () => {
      // Setup
      req.headers.authorization = 'Bearer valid-token';
      jwt.verify.mockReturnValue({ id: 'user-id' });
      User.findById.mockImplementation(() => ({
        select: jest.fn().mockResolvedValue({ id: 'user-id', name: 'Test User' })
      }));

      // Execute
      await protect(req, res, next);

      // Assert
      expect(jwt.verify).toHaveBeenCalledWith('valid-token', process.env.JWT_SECRET);
      expect(User.findById).toHaveBeenCalledWith('user-id');
      expect(req.user).toEqual({ id: 'user-id', name: 'Test User' });
      expect(next).toHaveBeenCalled();
      expect(errorResponse).not.toHaveBeenCalled();
    });

    it('should call next when valid token in cookie', async () => {
      // Setup
      req.cookies.token = 'valid-token';
      jwt.verify.mockReturnValue({ id: 'user-id' });
      User.findById.mockImplementation(() => ({
        select: jest.fn().mockResolvedValue({ id: 'user-id', name: 'Test User' })
      }));

      // Execute
      await protect(req, res, next);

      // Assert
      expect(jwt.verify).toHaveBeenCalledWith('valid-token', process.env.JWT_SECRET);
      expect(User.findById).toHaveBeenCalledWith('user-id');
      expect(req.user).toEqual({ id: 'user-id', name: 'Test User' });
      expect(next).toHaveBeenCalled();
      expect(errorResponse).not.toHaveBeenCalled();
    });

    it('should return error when no token is provided', async () => {
      // Execute
      await protect(req, res, next);

      // Assert
      expect(jwt.verify).not.toHaveBeenCalled();
      expect(User.findById).not.toHaveBeenCalled();
      expect(next).not.toHaveBeenCalled();
      expect(errorResponse).toHaveBeenCalledWith(res, 'Not authorized to access this route', 401);
    });

    it('should return error when token is invalid', async () => {
      // Setup
      req.headers.authorization = 'Bearer invalid-token';
      jwt.verify.mockImplementation(() => {
        const error = new Error('Invalid token');
        error.name = 'JsonWebTokenError';
        throw error;
      });

      // Execute
      await protect(req, res, next);

      // Assert
      expect(jwt.verify).toHaveBeenCalledWith('invalid-token', process.env.JWT_SECRET);
      expect(User.findById).not.toHaveBeenCalled();
      expect(next).not.toHaveBeenCalled();
      expect(errorResponse).toHaveBeenCalledWith(res, 'Invalid token', 401);
    });

    it('should return error when token is expired', async () => {
      // Setup
      req.headers.authorization = 'Bearer expired-token';
      jwt.verify.mockImplementation(() => {
        const error = new Error('Token expired');
        error.name = 'TokenExpiredError';
        throw error;
      });

      // Execute
      await protect(req, res, next);

      // Assert
      expect(jwt.verify).toHaveBeenCalledWith('expired-token', process.env.JWT_SECRET);
      expect(User.findById).not.toHaveBeenCalled();
      expect(next).not.toHaveBeenCalled();
      expect(errorResponse).toHaveBeenCalledWith(res, 'Token expired', 401);
    });

    it('should return error when user not found', async () => {
      // Setup
      req.headers.authorization = 'Bearer valid-token';
      jwt.verify.mockReturnValue({ id: 'user-id' });
      User.findById.mockImplementation(() => ({
        select: jest.fn().mockResolvedValue(null)
      }));

      // Execute
      await protect(req, res, next);

      // Assert
      expect(jwt.verify).toHaveBeenCalledWith('valid-token', process.env.JWT_SECRET);
      expect(User.findById).toHaveBeenCalledWith('user-id');
      expect(next).not.toHaveBeenCalled();
      expect(errorResponse).toHaveBeenCalledWith(res, 'User not found', 401);
    });
  });

  describe('authorize', () => {
    it('should call next when user has required role', () => {
      // Setup
      req.user = { role: 'admin' };
      const middleware = authorize('admin', 'superadmin');

      // Execute
      middleware(req, res, next);

      // Assert
      expect(next).toHaveBeenCalled();
      expect(errorResponse).not.toHaveBeenCalled();
    });

    it('should return error when user has incorrect role', () => {
      // Setup
      req.user = { role: 'user' };
      const middleware = authorize('admin');

      // Execute
      middleware(req, res, next);

      // Assert
      expect(next).not.toHaveBeenCalled();
      expect(errorResponse).toHaveBeenCalledWith(
        res, 
        'User role user is not authorized to access this route', 
        403
      );
    });

    it('should return error when user not authenticated', () => {
      // Setup
      req.user = null;
      const middleware = authorize('admin');

      // Execute
      middleware(req, res, next);

      // Assert
      expect(next).not.toHaveBeenCalled();
      expect(errorResponse).toHaveBeenCalledWith(res, 'User not authenticated', 401);
    });
  });

  describe('hasPermission', () => {
    beforeEach(() => {
      // Mock role permissions
      ROLE_PERMISSIONS.admin = ['read:user', 'write:user', 'read:product', 'write:product'];
      ROLE_PERMISSIONS.user = ['read:user', 'read:product'];
    });

    it('should call next when user has required permission', () => {
      // Setup
      req.user = { role: 'admin' };
      const middleware = hasPermission('read:user');

      // Execute
      middleware(req, res, next);

      // Assert
      expect(next).toHaveBeenCalled();
      expect(errorResponse).not.toHaveBeenCalled();
    });

    it('should return error when user lacks required permission', () => {
      // Setup
      req.user = { role: 'user' };
      const middleware = hasPermission('write:product');

      // Execute
      middleware(req, res, next);

      // Assert
      expect(next).not.toHaveBeenCalled();
      expect(errorResponse).toHaveBeenCalledWith(
        res, 
        'You don\'t have permission to perform this action', 
        403
      );
    });

    it('should return error when user not authenticated', () => {
      // Setup
      req.user = null;
      const middleware = hasPermission('read:user');

      // Execute
      middleware(req, res, next);

      // Assert
      expect(next).not.toHaveBeenCalled();
      expect(errorResponse).toHaveBeenCalledWith(res, 'User not authenticated', 401);
    });
  });
});