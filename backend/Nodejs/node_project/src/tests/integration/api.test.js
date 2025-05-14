/**
 * API Integration Tests
 * 
 * This file contains integration tests that test the full
 * API request/response cycle with mocked database.
 */

const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');
const Product = require('../../models/productModel');
const logger = require('../../utils/logger');

// Mock logger to suppress output during tests
jest.mock('../../utils/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn()
}));

// Mock mongoose and other dependencies
jest.mock('mongoose', () => {
  const mongoose = jest.requireActual('mongoose');
  return {
    ...mongoose,
    connect: jest.fn().mockResolvedValue(true),
    Schema: mongoose.Schema,
    model: mongoose.model,
    Types: {
      ObjectId: {
        isValid: jest.fn().mockReturnValue(true)
      }
    }
  };
});

// Create test app
let app;
let server;

describe('API Integration Tests', () => {
  // Setup test server
  beforeAll(async () => {
    // Temporarily point environment variables to test values
    process.env.JWT_SECRET = 'test-jwt-secret';
    process.env.JWT_EXPIRE = '1d';
    process.env.JWT_COOKIE_EXPIRE = '1';
    process.env.NODE_ENV = 'test';
    
    // Dynamically import server modules
    const authRoutes = require('../../routes/authRoutes');
    const userRoutes = require('../../routes/userRoutes');
    const productRoutes = require('../../routes/productRoutes');
    const { errorHandler } = require('../../middleware/errorMiddleware');
    
    // Create app
    app = express();
    app.use(express.json());
    
    // Mount routes
    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/products', productRoutes);
    
    // Error handler
    app.use(errorHandler);
    
    // Start server
    server = app.listen(5001);
  });

  afterAll(async () => {
    if (server) {
      await new Promise(resolve => server.close(resolve));
    }
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Authentication Flow', () => {
    it('should register a new user, login, and access protected routes', async () => {
      // Mock User.findOne for registration check
      User.findOne = jest.fn().mockResolvedValue(null);
      
      // Mock User.create
      const mockUser = {
        _id: 'user-id-123',
        name: 'Test User',
        email: 'test@example.com',
        role: 'user',
        getSignedJwtToken: jest.fn().mockReturnValue('test-jwt-token'),
        save: jest.fn().mockResolvedValue(true)
      };
      User.create = jest.fn().mockResolvedValue(mockUser);
      
      // Mock JWT sign
      jwt.sign = jest.fn().mockReturnValue('test-jwt-token');
      
      // 1. Register a new user
      const registerRes = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
          confirmPassword: 'password123'
        });
      
      expect(registerRes.status).toBe(201);
      expect(registerRes.body.success).toBe(true);
      expect(registerRes.body.data.token).toBe('test-jwt-token');
      
      // Store token for next requests
      const token = registerRes.body.data.token;
      
      // 2. Use token to access protected route
      // Mock User.findById for auth middleware
      User.findById = jest.fn().mockImplementation(() => ({
        select: jest.fn().mockResolvedValue(mockUser)
      }));
      
      // Mock JWT verify
      jwt.verify = jest.fn().mockReturnValue({ id: 'user-id-123' });
      
      const meRes = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`);
      
      expect(meRes.status).toBe(200);
      expect(meRes.body.success).toBe(true);
      
      // 3. Logout
      const logoutRes = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`);
      
      expect(logoutRes.status).toBe(200);
      expect(logoutRes.body.success).toBe(true);
    });
  });

  describe('Products API with Role-Based Access', () => {
    let userToken;
    let adminToken;
    
    beforeEach(() => {
      // User token setup
      const mockUser = {
        _id: 'user-id-123',
        name: 'Regular User',
        email: 'user@example.com',
        role: 'user'
      };
      
      // Admin token setup
      const mockAdmin = {
        _id: 'admin-id-123',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin'
      };
      
      // Mock JWT verification for different tokens
      jwt.verify = jest.fn().mockImplementation((token) => {
        if (token === 'user-token') return { id: 'user-id-123', role: 'user' };
        if (token === 'admin-token') return { id: 'admin-id-123', role: 'admin' };
        return null;
      });
      
      // Mock User.findById
      User.findById = jest.fn().mockImplementation((id) => ({
        select: jest.fn().mockResolvedValue(
          id === 'user-id-123' ? mockUser : mockAdmin
        )
      }));
      
      userToken = 'user-token';
      adminToken = 'admin-token';
    });

    it('should allow both user and admin to get products', async () => {
      // Mock Product.find, sort, skip, limit, populate
      Product.find = jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        populate: jest.fn().mockResolvedValue([
          { _id: 'product-1', name: 'Test Product 1', price: 99.99 }
        ])
      });
      
      // Mock Product.countDocuments
      Product.countDocuments = jest.fn().mockResolvedValue(1);
      
      // Test user access
      const userRes = await request(app)
        .get('/api/products')
        .set('Authorization', `Bearer ${userToken}`);
      
      expect(userRes.status).toBe(200);
      expect(userRes.body.success).toBe(true);
      
      // Test admin access
      const adminRes = await request(app)
        .get('/api/products')
        .set('Authorization', `Bearer ${adminToken}`);
      
      expect(adminRes.status).toBe(200);
      expect(adminRes.body.success).toBe(true);
    });

    it('should only allow admin to create products', async () => {
      // Mock Product.create
      Product.create = jest.fn().mockResolvedValue({
        _id: 'new-product-id',
        name: 'New Product',
        price: 49.99
      });
      
      // Test user access (should be denied)
      const userRes = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'New Product',
          description: 'Test description',
          price: 49.99,
          category: 'electronics'
        });
      
      expect(userRes.status).toBe(403);
      
      // Test admin access (should be allowed)
      const adminRes = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'New Product',
          description: 'Test description',
          price: 49.99,
          category: 'electronics'
        });
      
      expect(adminRes.status).toBe(201);
      expect(adminRes.body.success).toBe(true);
    });

    it('should only allow admin to update products', async () => {
      // Mock Product.findById
      Product.findById = jest.fn().mockResolvedValue({
        _id: 'product-id',
        name: 'Existing Product',
        price: 99.99
      });
      
      // Mock Product.findByIdAndUpdate
      Product.findByIdAndUpdate = jest.fn().mockResolvedValue({
        _id: 'product-id',
        name: 'Updated Product',
        price: 79.99
      });
      
      // Test user access (should be denied)
      const userRes = await request(app)
        .put('/api/products/product-id')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'Updated Product',
          price: 79.99
        });
      
      expect(userRes.status).toBe(403);
      
      // Test admin access (should be allowed)
      const adminRes = await request(app)
        .put('/api/products/product-id')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Updated Product',
          price: 79.99
        });
      
      expect(adminRes.status).toBe(200);
      expect(adminRes.body.success).toBe(true);
    });

    it('should only allow admin to delete products', async () => {
      // Mock Product.findById
      const mockDeleteProduct = {
        _id: 'product-id',
        name: 'Product to Delete',
        deleteOne: jest.fn().mockResolvedValue(true)
      };
      
      Product.findById = jest.fn().mockResolvedValue(mockDeleteProduct);
      
      // Test user access (should be denied)
      const userRes = await request(app)
        .delete('/api/products/product-id')
        .set('Authorization', `Bearer ${userToken}`);
      
      expect(userRes.status).toBe(403);
      
      // Test admin access (should be allowed)
      const adminRes = await request(app)
        .delete('/api/products/product-id')
        .set('Authorization', `Bearer ${adminToken}`);
      
      expect(adminRes.status).toBe(200);
      expect(adminRes.body.success).toBe(true);
      expect(mockDeleteProduct.deleteOne).toHaveBeenCalled();
    });
  });
});