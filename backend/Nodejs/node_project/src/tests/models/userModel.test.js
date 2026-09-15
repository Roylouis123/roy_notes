/**
 * User Model Tests
 * 
 * This file tests the User model to ensure validation, methods,
 * and password hashing functionality work correctly.
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../../models/userModel');
const { ROLES, DEFAULT_ROLE } = require('../../config/roles');

// Mock dependencies
jest.mock('bcryptjs', () => ({
  genSalt: jest.fn().mockResolvedValue('mock-salt'),
  hash: jest.fn().mockResolvedValue('hashed-password'),
  compare: jest.fn().mockResolvedValue(true)
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('mock-token')
}));

jest.mock('crypto', () => ({
  randomBytes: jest.fn().mockReturnValue({
    toString: jest.fn().mockReturnValue('random-token')
  }),
  createHash: jest.fn().mockReturnValue({
    update: jest.fn().mockReturnThis(),
    digest: jest.fn().mockReturnValue('hashed-token')
  })
}));

describe('User Model', () => {
  describe('Schema Validation', () => {
    it('should validate a user with all required fields', () => {
      const validUser = new User({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

      const validationError = validUser.validateSync();
      expect(validationError).toBeUndefined();
    });

    it('should fail validation when name is missing', () => {
      const invalidUser = new User({
        email: 'test@example.com',
        password: 'password123'
      });

      const validationError = invalidUser.validateSync();
      expect(validationError.errors.name).toBeDefined();
    });

    it('should fail validation when email is missing', () => {
      const invalidUser = new User({
        name: 'Test User',
        password: 'password123'
      });

      const validationError = invalidUser.validateSync();
      expect(validationError.errors.email).toBeDefined();
    });

    it('should fail validation when email is invalid', () => {
      const invalidUser = new User({
        name: 'Test User',
        email: 'not-an-email',
        password: 'password123'
      });

      const validationError = invalidUser.validateSync();
      expect(validationError.errors.email).toBeDefined();
    });

    it('should fail validation when password is missing', () => {
      const invalidUser = new User({
        name: 'Test User',
        email: 'test@example.com'
      });

      const validationError = invalidUser.validateSync();
      expect(validationError.errors.password).toBeDefined();
    });

    it('should fail validation when password is too short', () => {
      const invalidUser = new User({
        name: 'Test User',
        email: 'test@example.com',
        password: '12345'
      });

      const validationError = invalidUser.validateSync();
      expect(validationError.errors.password).toBeDefined();
    });

    it('should set default role to USER if not specified', () => {
      const user = new User({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

      expect(user.role).toBe(DEFAULT_ROLE);
    });

    it('should allow setting role to ADMIN', () => {
      const user = new User({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: ROLES.ADMIN
      });

      const validationError = user.validateSync();
      expect(validationError).toBeUndefined();
      expect(user.role).toBe(ROLES.ADMIN);
    });
  });

  describe('Password Hashing', () => {
    it('should hash password before saving', async () => {
      const user = new User({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

      // Mock the save method to test pre-save hook
      user.save = jest.fn();
      
      // Manually call the pre-save hook
      const saveCallback = mongoose.Schema.prototype.pre.mock.calls[0][1];
      await saveCallback.call(user, () => {});

      expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 'mock-salt');
      expect(user.password).toBe('hashed-password');
    });

    it('should not hash password if not modified', async () => {
      const user = new User({
        name: 'Test User',
        email: 'test@example.com',
        password: 'already-hashed'
      });

      // Mock isModified to return false
      user.isModified = jest.fn().mockReturnValue(false);
      user.save = jest.fn();
      
      // Manually call the pre-save hook
      const saveCallback = mongoose.Schema.prototype.pre.mock.calls[0][1];
      await saveCallback.call(user, () => {});

      expect(bcrypt.hash).not.toHaveBeenCalled();
      expect(user.password).toBe('already-hashed');
    });
  });

  describe('Instance Methods', () => {
    let user;

    beforeEach(() => {
      user = new User({
        _id: '5f7d327b967c3b2e8c21d8a1',
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashed-password',
        role: 'user'
      });
    });

    describe('matchPassword', () => {
      it('should return true when passwords match', async () => {
        const isMatch = await user.matchPassword('password123');
        
        expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashed-password');
        expect(isMatch).toBe(true);
      });

      it('should return false when passwords do not match', async () => {
        bcrypt.compare.mockResolvedValueOnce(false);
        
        const isMatch = await user.matchPassword('wrong-password');
        
        expect(bcrypt.compare).toHaveBeenCalledWith('wrong-password', 'hashed-password');
        expect(isMatch).toBe(false);
      });
    });

    describe('getSignedJwtToken', () => {
      it('should generate a JWT token with correct payload', () => {
        process.env.JWT_SECRET = 'test-secret';
        process.env.JWT_EXPIRE = '1h';
        
        const token = user.getSignedJwtToken();
        
        expect(jwt.sign).toHaveBeenCalledWith(
          { id: '5f7d327b967c3b2e8c21d8a1', role: 'user' },
          'test-secret',
          { expiresIn: '1h' }
        );
        expect(token).toBe('mock-token');
      });
    });

    describe('getResetPasswordToken', () => {
      it('should generate and hash a reset token', () => {
        const resetToken = user.getResetPasswordToken();
        
        expect(crypto.randomBytes).toHaveBeenCalledWith(20);
        expect(crypto.createHash).toHaveBeenCalledWith('sha256');
        expect(user.resetPasswordToken).toBe('hashed-token');
        expect(resetToken).toBe('random-token');
      });

      it('should set token expiration to 10 minutes from now', () => {
        const now = Date.now();
        const tenMinutes = 10 * 60 * 1000;
        
        jest.spyOn(Date, 'now').mockReturnValue(now);
        
        user.getResetPasswordToken();
        
        expect(user.resetPasswordExpire).toBe(now + tenMinutes);
        
        // Restore Date.now
        Date.now.mockRestore();
      });
    });
  });

  describe('Static Methods', () => {
    beforeEach(() => {
      User.findOne = jest.fn();
    });

    describe('findByResetToken', () => {
      it('should hash token and find user with valid token', async () => {
        User.findOne.mockResolvedValue({ name: 'Test User' });
        
        const result = await User.findByResetToken('test-token');
        
        expect(crypto.createHash).toHaveBeenCalledWith('sha256');
        expect(User.findOne).toHaveBeenCalledWith({
          resetPasswordToken: 'hashed-token',
          resetPasswordExpire: { $gt: expect.any(Number) }
        });
        expect(result).toEqual({ name: 'Test User' });
      });
    });
  });
});