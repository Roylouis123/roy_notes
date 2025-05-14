/**
 * Authentication Routes Tests
 * 
 * This file tests the authentication routes to ensure
 * they are correctly configured and integrated.
 */

const request = require('supertest');
const express = require('express');
const authRoutes = require('../../routes/authRoutes');
const { validateWithJoi } = require('../../middleware/validationMiddleware');
const { protect } = require('../../middleware/authMiddleware');
const authController = require('../../controllers/authController');

// Mock middleware
jest.mock('../../middleware/validationMiddleware', () => ({
  validateWithJoi: jest.fn().mockImplementation(() => (req, res, next) => next())
}));

jest.mock('../../middleware/authMiddleware', () => ({
  protect: jest.fn().mockImplementation((req, res, next) => {
    req.user = { id: 'test-user-id' };
    next();
  })
}));

// Mock controller methods
jest.mock('../../controllers/authController', () => ({
  register: jest.fn().mockImplementation((req, res) => res.json({ action: 'register' })),
  login: jest.fn().mockImplementation((req, res) => res.json({ action: 'login' })),
  logout: jest.fn().mockImplementation((req, res) => res.json({ action: 'logout' })),
  getCurrentUser: jest.fn().mockImplementation((req, res) => res.json({ action: 'getCurrentUser' })),
  forgotPassword: jest.fn().mockImplementation((req, res) => res.json({ action: 'forgotPassword' })),
  resetPassword: jest.fn().mockImplementation((req, res) => res.json({ action: 'resetPassword' })),
  updatePassword: jest.fn().mockImplementation((req, res) => res.json({ action: 'updatePassword' }))
}));

describe('Auth Routes', () => {
  let app;
  
  beforeEach(() => {
    // Create a new express app for each test
    app = express();
    app.use(express.json());
    app.use('/api/auth', authRoutes);
    
    // Clear mock call history
    jest.clearAllMocks();
  });

  describe('POST /api/auth/register', () => {
    it('should route to register controller with validation', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
          confirmPassword: 'password123'
        });
      
      expect(res.status).toBe(200);
      expect(validateWithJoi).toHaveBeenCalled();
      expect(authController.register).toHaveBeenCalled();
      expect(res.body).toEqual({ action: 'register' });
    });
  });

  describe('POST /api/auth/login', () => {
    it('should route to login controller with validation', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });
      
      expect(res.status).toBe(200);
      expect(validateWithJoi).toHaveBeenCalled();
      expect(authController.login).toHaveBeenCalled();
      expect(res.body).toEqual({ action: 'login' });
    });
  });

  describe('POST /api/auth/logout', () => {
    it('should route to logout controller with auth protection', async () => {
      const res = await request(app)
        .post('/api/auth/logout');
      
      expect(res.status).toBe(200);
      expect(protect).toHaveBeenCalled();
      expect(authController.logout).toHaveBeenCalled();
      expect(res.body).toEqual({ action: 'logout' });
    });
  });

  describe('GET /api/auth/me', () => {
    it('should route to getCurrentUser controller with auth protection', async () => {
      const res = await request(app)
        .get('/api/auth/me');
      
      expect(res.status).toBe(200);
      expect(protect).toHaveBeenCalled();
      expect(authController.getCurrentUser).toHaveBeenCalled();
      expect(res.body).toEqual({ action: 'getCurrentUser' });
    });
  });

  describe('POST /api/auth/forgot-password', () => {
    it('should route to forgotPassword controller with validation', async () => {
      const res = await request(app)
        .post('/api/auth/forgot-password')
        .send({
          email: 'test@example.com'
        });
      
      expect(res.status).toBe(200);
      expect(validateWithJoi).toHaveBeenCalled();
      expect(authController.forgotPassword).toHaveBeenCalled();
      expect(res.body).toEqual({ action: 'forgotPassword' });
    });
  });

  describe('PUT /api/auth/reset-password/:resetToken', () => {
    it('should route to resetPassword controller with validation', async () => {
      const res = await request(app)
        .put('/api/auth/reset-password/test-token')
        .send({
          password: 'newpassword123',
          confirmPassword: 'newpassword123'
        });
      
      expect(res.status).toBe(200);
      expect(validateWithJoi).toHaveBeenCalled();
      expect(authController.resetPassword).toHaveBeenCalled();
      expect(res.body).toEqual({ action: 'resetPassword' });
    });
  });

  describe('PUT /api/auth/update-password', () => {
    it('should route to updatePassword controller with auth protection and validation', async () => {
      const res = await request(app)
        .put('/api/auth/update-password')
        .send({
          currentPassword: 'currentpassword',
          newPassword: 'newpassword123',
          confirmPassword: 'newpassword123'
        });
      
      expect(res.status).toBe(200);
      expect(protect).toHaveBeenCalled();
      expect(validateWithJoi).toHaveBeenCalled();
      expect(authController.updatePassword).toHaveBeenCalled();
      expect(res.body).toEqual({ action: 'updatePassword' });
    });
  });
});