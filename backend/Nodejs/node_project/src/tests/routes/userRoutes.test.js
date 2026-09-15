/**
 * User Routes Tests
 * 
 * This file tests the user routes to ensure they are
 * correctly configured and integrated.
 */

const request = require('supertest');
const express = require('express');
const userRoutes = require('../../routes/userRoutes');
const { validateWithJoi } = require('../../middleware/validationMiddleware');
const { protect, authorize } = require('../../middleware/authMiddleware');
const userController = require('../../controllers/userController');

// Mock middleware
jest.mock('../../middleware/validationMiddleware', () => ({
  validateWithJoi: jest.fn().mockImplementation(() => (req, res, next) => next())
}));

jest.mock('../../middleware/authMiddleware', () => ({
  protect: jest.fn().mockImplementation((req, res, next) => {
    req.user = { id: 'test-user-id', role: 'user' };
    next();
  }),
  authorize: jest.fn().mockImplementation((...roles) => (req, res, next) => {
    // Only allow if user role is in roles
    if (roles.includes(req.user.role)) {
      next();
    } else {
      res.status(403).json({ message: 'Not authorized' });
    }
  }),
  hasPermission: jest.fn().mockImplementation(() => (req, res, next) => next())
}));

// Mock controller methods
jest.mock('../../controllers/userController', () => ({
  getUsers: jest.fn().mockImplementation((req, res) => res.json({ action: 'getUsers' })),
  getUserById: jest.fn().mockImplementation((req, res) => res.json({ action: 'getUserById' })),
  updateProfile: jest.fn().mockImplementation((req, res) => res.json({ action: 'updateProfile' })),
  deleteUser: jest.fn().mockImplementation((req, res) => res.json({ action: 'deleteUser' })),
  changeUserRole: jest.fn().mockImplementation((req, res) => res.json({ action: 'changeUserRole' }))
}));

describe('User Routes', () => {
  let app;
  
  beforeEach(() => {
    // Create a new express app for each test
    app = express();
    app.use(express.json());
    app.use('/api/users', userRoutes);
    
    // Clear mock call history
    jest.clearAllMocks();
  });

  describe('GET /api/users', () => {
    it('should route to getUsers controller with admin authorization', async () => {
      // Make user an admin for this test
      protect.mockImplementationOnce((req, res, next) => {
        req.user = { id: 'admin-id', role: 'admin' };
        next();
      });
      
      const res = await request(app).get('/api/users');
      
      expect(res.status).toBe(200);
      expect(protect).toHaveBeenCalled();
      expect(authorize).toHaveBeenCalledWith('admin');
      expect(userController.getUsers).toHaveBeenCalled();
      expect(res.body).toEqual({ action: 'getUsers' });
    });

    it('should reject non-admin users', async () => {
      const res = await request(app).get('/api/users');
      
      expect(res.status).toBe(403);
      expect(protect).toHaveBeenCalled();
      expect(authorize).toHaveBeenCalledWith('admin');
      expect(userController.getUsers).not.toHaveBeenCalled();
    });
  });

  describe('GET /api/users/:id', () => {
    it('should route to getUserById controller with auth protection', async () => {
      const res = await request(app).get('/api/users/test-user-id');
      
      expect(res.status).toBe(200);
      expect(protect).toHaveBeenCalled();
      expect(userController.getUserById).toHaveBeenCalled();
      expect(res.body).toEqual({ action: 'getUserById' });
    });
  });

  describe('PUT /api/users/profile', () => {
    it('should route to updateProfile controller with auth protection and validation', async () => {
      const res = await request(app)
        .put('/api/users/profile')
        .send({ name: 'Updated Name' });
      
      expect(res.status).toBe(200);
      expect(protect).toHaveBeenCalled();
      expect(validateWithJoi).toHaveBeenCalled();
      expect(userController.updateProfile).toHaveBeenCalled();
      expect(res.body).toEqual({ action: 'updateProfile' });
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should route to deleteUser controller with auth protection', async () => {
      const res = await request(app).delete('/api/users/test-user-id');
      
      expect(res.status).toBe(200);
      expect(protect).toHaveBeenCalled();
      expect(userController.deleteUser).toHaveBeenCalled();
      expect(res.body).toEqual({ action: 'deleteUser' });
    });
  });

  describe('PUT /api/users/:id/role', () => {
    it('should route to changeUserRole controller with admin authorization', async () => {
      // Make user an admin for this test
      protect.mockImplementationOnce((req, res, next) => {
        req.user = { id: 'admin-id', role: 'admin' };
        next();
      });
      
      const res = await request(app)
        .put('/api/users/test-user-id/role')
        .send({ role: 'admin' });
      
      expect(res.status).toBe(200);
      expect(protect).toHaveBeenCalled();
      expect(authorize).toHaveBeenCalledWith('admin');
      expect(userController.changeUserRole).toHaveBeenCalled();
      expect(res.body).toEqual({ action: 'changeUserRole' });
    });

    it('should reject non-admin users', async () => {
      const res = await request(app)
        .put('/api/users/test-user-id/role')
        .send({ role: 'admin' });
      
      expect(res.status).toBe(403);
      expect(protect).toHaveBeenCalled();
      expect(authorize).toHaveBeenCalledWith('admin');
      expect(userController.changeUserRole).not.toHaveBeenCalled();
    });
  });
});