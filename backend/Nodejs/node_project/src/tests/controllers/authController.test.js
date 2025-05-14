/**
 * Authentication Controller Tests
 * 
 * This file tests the authentication controller functions to ensure
 * they handle registration, login, and password management correctly.
 */

const User = require('../../models/userModel');
const { successResponse, errorResponse } = require('../../utils/apiResponse');
const { sendPasswordResetEmail } = require('../../utils/emailService');
const logger = require('../../utils/logger');
const {
  register,
  login,
  logout,
  getCurrentUser,
  forgotPassword,
  resetPassword,
  updatePassword
} = require('../../controllers/authController');
const { mockUsers } = require('../mocks/db');

// Mock dependencies
jest.mock('../../models/userModel');
jest.mock('../../utils/apiResponse', () => ({
  successResponse: jest.fn().mockReturnValue('success-response'),
  errorResponse: jest.fn().mockReturnValue('error-response')
}));
jest.mock('../../utils/emailService', () => ({
  sendPasswordResetEmail: jest.fn().mockResolvedValue(true)
}));
jest.mock('../../utils/logger', () => ({
  info: jest.fn(),
  error: jest.fn()
}));

describe('Auth Controller', () => {
  let req;
  let res;
  
  beforeEach(() => {
    req = {
      body: {},
      user: null,
      protocol: 'http',
      get: jest.fn().mockReturnValue('localhost')
    };
    res = {
      cookie: jest.fn()
    };
    
    // Reset mocks
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user and return token', async () => {
      // Setup
      req.body = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };
      
      User.findOne.mockResolvedValue(null);
      User.create.mockResolvedValue({
        _id: 'user-id',
        name: 'Test User',
        email: 'test@example.com',
        getSignedJwtToken: jest.fn().mockReturnValue('jwt-token')
      });
      
      // Execute
      await register(req, res);
      
      // Assert
      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(User.create).toHaveBeenCalledWith({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: undefined
      });
      
      expect(res.cookie).toHaveBeenCalled();
      expect(successResponse).toHaveBeenCalledWith(
        res,
        'User registered successfully',
        expect.objectContaining({
          token: 'jwt-token',
          user: expect.objectContaining({
            id: 'user-id',
            name: 'Test User',
            email: 'test@example.com'
          })
        }),
        201
      );
    });

    it('should return error if user already exists', async () => {
      // Setup
      req.body = {
        name: 'Test User',
        email: 'existing@example.com',
        password: 'password123'
      };
      
      User.findOne.mockResolvedValue({ email: 'existing@example.com' });
      
      // Execute
      await register(req, res);
      
      // Assert
      expect(User.create).not.toHaveBeenCalled();
      expect(errorResponse).toHaveBeenCalledWith(
        res,
        'User with this email already exists',
        400
      );
    });

    it('should handle registration errors', async () => {
      // Setup
      req.body = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };
      
      User.findOne.mockResolvedValue(null);
      User.create.mockRejectedValue(new Error('Database error'));
      
      // Execute
      await register(req, res);
      
      // Assert
      expect(logger.error).toHaveBeenCalled();
      expect(errorResponse).toHaveBeenCalledWith(
        res,
        'Failed to register user',
        500
      );
    });
  });

  describe('login', () => {
    it('should login a user and return token', async () => {
      // Setup
      req.body = {
        email: 'test@example.com',
        password: 'password123'
      };
      
      const mockUser = {
        _id: 'user-id',
        name: 'Test User',
        email: 'test@example.com',
        role: 'user',
        lastLogin: null,
        matchPassword: jest.fn().mockResolvedValue(true),
        getSignedJwtToken: jest.fn().mockReturnValue('jwt-token'),
        save: jest.fn().mockResolvedValue(true)
      };
      
      User.findOne.mockImplementation(() => ({
        select: jest.fn().mockResolvedValue(mockUser)
      }));
      
      // Execute
      await login(req, res);
      
      // Assert
      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(mockUser.matchPassword).toHaveBeenCalledWith('password123');
      expect(mockUser.save).toHaveBeenCalled();
      expect(res.cookie).toHaveBeenCalled();
      expect(successResponse).toHaveBeenCalledWith(
        res,
        'Login successful',
        expect.objectContaining({
          token: 'jwt-token',
          user: expect.objectContaining({
            id: 'user-id',
            name: 'Test User',
            email: 'test@example.com'
          })
        }),
        200
      );
    });

    it('should return error if user not found', async () => {
      // Setup
      req.body = {
        email: 'nonexistent@example.com',
        password: 'password123'
      };
      
      User.findOne.mockImplementation(() => ({
        select: jest.fn().mockResolvedValue(null)
      }));
      
      // Execute
      await login(req, res);
      
      // Assert
      expect(errorResponse).toHaveBeenCalledWith(res, 'Invalid credentials', 401);
    });

    it('should return error if password is incorrect', async () => {
      // Setup
      req.body = {
        email: 'test@example.com',
        password: 'wrongpassword'
      };
      
      const mockUser = {
        _id: 'user-id',
        email: 'test@example.com',
        matchPassword: jest.fn().mockResolvedValue(false)
      };
      
      User.findOne.mockImplementation(() => ({
        select: jest.fn().mockResolvedValue(mockUser)
      }));
      
      // Execute
      await login(req, res);
      
      // Assert
      expect(mockUser.matchPassword).toHaveBeenCalledWith('wrongpassword');
      expect(errorResponse).toHaveBeenCalledWith(res, 'Invalid credentials', 401);
    });
  });

  describe('logout', () => {
    it('should clear cookie and return success', () => {
      // Execute
      logout(req, res);
      
      // Assert
      expect(res.cookie).toHaveBeenCalledWith('token', '', {
        expires: expect.any(Date),
        httpOnly: true
      });
      expect(successResponse).toHaveBeenCalledWith(res, 'Logged out successfully');
    });
  });

  describe('getCurrentUser', () => {
    it('should return current user data', async () => {
      // Setup
      req.user = {
        id: 'user-id',
        name: 'Test User',
        email: 'test@example.com',
        role: 'user'
      };
      
      // Execute
      await getCurrentUser(req, res);
      
      // Assert
      expect(successResponse).toHaveBeenCalledWith(
        res,
        'User data retrieved successfully',
        req.user
      );
    });

    it('should handle errors', async () => {
      // Setup - simulate error by not setting req.user
      req.user = null;
      
      // Execute
      await getCurrentUser(req, res);
      
      // Assert
      expect(logger.error).toHaveBeenCalled();
      expect(errorResponse).toHaveBeenCalledWith(res, 'Failed to get user data', 500);
    });
  });

  describe('forgotPassword', () => {
    it('should send password reset email', async () => {
      // Setup
      req.body = {
        email: 'test@example.com'
      };
      
      const mockUser = {
        email: 'test@example.com',
        getResetPasswordToken: jest.fn().mockReturnValue('reset-token'),
        save: jest.fn().mockResolvedValue(true)
      };
      
      User.findOne.mockResolvedValue(mockUser);
      
      // Execute
      await forgotPassword(req, res);
      
      // Assert
      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(mockUser.getResetPasswordToken).toHaveBeenCalled();
      expect(mockUser.save).toHaveBeenCalled();
      expect(sendPasswordResetEmail).toHaveBeenCalledWith(
        'test@example.com',
        'reset-token',
        'http://localhost/api/auth/reset-password/reset-token'
      );
      expect(successResponse).toHaveBeenCalledWith(res, 'Password reset email sent');
    });

    it('should return success even if user does not exist (security)', async () => {
      // Setup
      req.body = {
        email: 'nonexistent@example.com'
      };
      
      User.findOne.mockResolvedValue(null);
      
      // Execute
      await forgotPassword(req, res);
      
      // Assert
      expect(sendPasswordResetEmail).not.toHaveBeenCalled();
      expect(successResponse).toHaveBeenCalledWith(
        res,
        'If this email exists in our system, a password reset link has been sent'
      );
    });

    it('should handle email sending errors', async () => {
      // Setup
      req.body = {
        email: 'test@example.com'
      };
      
      const mockUser = {
        email: 'test@example.com',
        getResetPasswordToken: jest.fn().mockReturnValue('reset-token'),
        save: jest.fn().mockResolvedValue(true),
        resetPasswordToken: 'token',
        resetPasswordExpire: Date.now()
      };
      
      User.findOne.mockResolvedValue(mockUser);
      sendPasswordResetEmail.mockRejectedValue(new Error('Email error'));
      
      // Execute
      await forgotPassword(req, res);
      
      // Assert
      expect(mockUser.resetPasswordToken).toBeUndefined();
      expect(mockUser.resetPasswordExpire).toBeUndefined();
      expect(mockUser.save).toHaveBeenCalledTimes(2); // Once before email, once after error
      expect(errorResponse).toHaveBeenCalledWith(
        res,
        'Failed to send password reset email',
        500
      );
    });
  });

  describe('resetPassword', () => {
    it('should reset password when token is valid', async () => {
      // Setup
      req.params = {
        resetToken: 'valid-token'
      };
      req.body = {
        password: 'newpassword123'
      };
      
      const mockUser = {
        password: 'old-password',
        resetPasswordToken: 'hashed-token',
        resetPasswordExpire: Date.now() + 3600000, // 1 hour from now
        getSignedJwtToken: jest.fn().mockReturnValue('jwt-token'),
        save: jest.fn().mockResolvedValue(true)
      };
      
      User.findByResetToken.mockResolvedValue(mockUser);
      
      // Execute
      await resetPassword(req, res);
      
      // Assert
      expect(User.findByResetToken).toHaveBeenCalledWith('valid-token');
      expect(mockUser.password).toBe('newpassword123');
      expect(mockUser.resetPasswordToken).toBeUndefined();
      expect(mockUser.resetPasswordExpire).toBeUndefined();
      expect(mockUser.save).toHaveBeenCalled();
      expect(res.cookie).toHaveBeenCalled();
      expect(successResponse).toHaveBeenCalledWith(
        res,
        'Password reset successful',
        expect.objectContaining({
          token: 'jwt-token'
        }),
        200
      );
    });

    it('should return error when token is invalid or expired', async () => {
      // Setup
      req.params = {
        resetToken: 'invalid-token'
      };
      req.body = {
        password: 'newpassword123'
      };
      
      User.findByResetToken.mockResolvedValue(null);
      
      // Execute
      await resetPassword(req, res);
      
      // Assert
      expect(errorResponse).toHaveBeenCalledWith(res, 'Invalid or expired reset token', 400);
    });
  });

  describe('updatePassword', () => {
    it('should update password when current password is correct', async () => {
      // Setup
      req.user = {
        id: 'user-id'
      };
      req.body = {
        currentPassword: 'currentpassword',
        newPassword: 'newpassword123'
      };
      
      const mockUser = {
        _id: 'user-id',
        password: 'hashed-current-password',
        matchPassword: jest.fn().mockResolvedValue(true),
        getSignedJwtToken: jest.fn().mockReturnValue('jwt-token'),
        save: jest.fn().mockResolvedValue(true)
      };
      
      User.findById.mockImplementation(() => ({
        select: jest.fn().mockResolvedValue(mockUser)
      }));
      
      // Execute
      await updatePassword(req, res);
      
      // Assert
      expect(User.findById).toHaveBeenCalledWith('user-id');
      expect(mockUser.matchPassword).toHaveBeenCalledWith('currentpassword');
      expect(mockUser.password).toBe('newpassword123');
      expect(mockUser.save).toHaveBeenCalled();
      expect(res.cookie).toHaveBeenCalled();
      expect(successResponse).toHaveBeenCalledWith(
        res,
        'Password updated successfully',
        expect.objectContaining({
          token: 'jwt-token'
        }),
        200
      );
    });

    it('should return error when current password is incorrect', async () => {
      // Setup
      req.user = {
        id: 'user-id'
      };
      req.body = {
        currentPassword: 'wrongpassword',
        newPassword: 'newpassword123'
      };
      
      const mockUser = {
        _id: 'user-id',
        password: 'hashed-current-password',
        matchPassword: jest.fn().mockResolvedValue(false)
      };
      
      User.findById.mockImplementation(() => ({
        select: jest.fn().mockResolvedValue(mockUser)
      }));
      
      // Execute
      await updatePassword(req, res);
      
      // Assert
      expect(mockUser.matchPassword).toHaveBeenCalledWith('wrongpassword');
      expect(errorResponse).toHaveBeenCalledWith(res, 'Current password is incorrect', 401);
    });
  });
});