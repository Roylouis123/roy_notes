/**
 * Product Routes Tests
 * 
 * This file tests the product routes to ensure they are
 * correctly configured and integrated with proper permissions.
 */

const request = require('supertest');
const express = require('express');
const productRoutes = require('../../routes/productRoutes');
const { validateWithJoi } = require('../../middleware/validationMiddleware');
const { protect, hasPermission } = require('../../middleware/authMiddleware');
const productController = require('../../controllers/productController');
const { PERMISSIONS } = require('../../config/roles');

// Mock middleware
jest.mock('../../middleware/validationMiddleware', () => ({
  validateWithJoi: jest.fn().mockImplementation(() => (req, res, next) => next())
}));

jest.mock('../../middleware/authMiddleware', () => ({
  protect: jest.fn().mockImplementation((req, res, next) => {
    req.user = { id: 'test-user-id', role: 'user' };
    next();
  }),
  hasPermission: jest.fn().mockImplementation((permission) => (req, res, next) => {
    // Only allow if user has required permission (simulate)
    const userPermissions = req.user.role === 'admin' 
      ? ['read:product', 'create:product', 'update:product', 'delete:product']
      : ['read:product'];
      
    if (userPermissions.includes(permission)) {
      next();
    } else {
      res.status(403).json({ message: 'Permission denied' });
    }
  })
}));

// Mock controller methods
jest.mock('../../controllers/productController', () => ({
  getProducts: jest.fn().mockImplementation((req, res) => res.json({ action: 'getProducts' })),
  getProductById: jest.fn().mockImplementation((req, res) => res.json({ action: 'getProductById' })),
  createProduct: jest.fn().mockImplementation((req, res) => res.json({ action: 'createProduct' })),
  updateProduct: jest.fn().mockImplementation((req, res) => res.json({ action: 'updateProduct' })),
  deleteProduct: jest.fn().mockImplementation((req, res) => res.json({ action: 'deleteProduct' })),
  updateProductStock: jest.fn().mockImplementation((req, res) => res.json({ action: 'updateProductStock' }))
}));

// Mock config
jest.mock('../../config/roles', () => ({
  PERMISSIONS: {
    READ_PRODUCT: 'read:product',
    CREATE_PRODUCT: 'create:product',
    UPDATE_PRODUCT: 'update:product',
    DELETE_PRODUCT: 'delete:product'
  }
}));

describe('Product Routes', () => {
  let app;
  
  beforeEach(() => {
    // Create a new express app for each test
    app = express();
    app.use(express.json());
    app.use('/api/products', productRoutes);
    
    // Clear mock call history
    jest.clearAllMocks();
  });

  describe('GET /api/products', () => {
    it('should route to getProducts controller with validation', async () => {
      const res = await request(app).get('/api/products');
      
      expect(res.status).toBe(200);
      expect(validateWithJoi).toHaveBeenCalled();
      expect(productController.getProducts).toHaveBeenCalled();
      expect(res.body).toEqual({ action: 'getProducts' });
    });

    it('should apply query validation for filtering', async () => {
      const res = await request(app).get('/api/products?page=2&limit=10&sort=price');
      
      expect(res.status).toBe(200);
      expect(validateWithJoi).toHaveBeenCalled();
      expect(productController.getProducts).toHaveBeenCalled();
    });
  });

  describe('GET /api/products/:id', () => {
    it('should route to getProductById controller', async () => {
      const res = await request(app).get('/api/products/product-id');
      
      expect(res.status).toBe(200);
      expect(productController.getProductById).toHaveBeenCalled();
      expect(res.body).toEqual({ action: 'getProductById' });
    });
  });

  describe('POST /api/products', () => {
    it('should route to createProduct controller with permission check', async () => {
      // Make user an admin for this test to have create permission
      protect.mockImplementationOnce((req, res, next) => {
        req.user = { id: 'admin-id', role: 'admin' };
        next();
      });
      
      const res = await request(app)
        .post('/api/products')
        .send({
          name: 'New Product',
          description: 'Test description',
          price: 99.99,
          category: 'electronics'
        });
      
      expect(res.status).toBe(200);
      expect(protect).toHaveBeenCalled();
      expect(hasPermission).toHaveBeenCalledWith(PERMISSIONS.CREATE_PRODUCT);
      expect(validateWithJoi).toHaveBeenCalled();
      expect(productController.createProduct).toHaveBeenCalled();
      expect(res.body).toEqual({ action: 'createProduct' });
    });

    it('should block users without create permission', async () => {
      // Regular user lacks create permission
      const res = await request(app)
        .post('/api/products')
        .send({
          name: 'New Product',
          description: 'Test description',
          price: 99.99,
          category: 'electronics'
        });
      
      expect(res.status).toBe(403);
      expect(protect).toHaveBeenCalled();
      expect(hasPermission).toHaveBeenCalledWith(PERMISSIONS.CREATE_PRODUCT);
      expect(productController.createProduct).not.toHaveBeenCalled();
    });
  });

  describe('PUT /api/products/:id', () => {
    it('should route to updateProduct controller with permission check', async () => {
      // Make user an admin for this test to have update permission
      protect.mockImplementationOnce((req, res, next) => {
        req.user = { id: 'admin-id', role: 'admin' };
        next();
      });
      
      const res = await request(app)
        .put('/api/products/product-id')
        .send({ name: 'Updated Product' });
      
      expect(res.status).toBe(200);
      expect(protect).toHaveBeenCalled();
      expect(hasPermission).toHaveBeenCalledWith(PERMISSIONS.UPDATE_PRODUCT);
      expect(validateWithJoi).toHaveBeenCalled();
      expect(productController.updateProduct).toHaveBeenCalled();
      expect(res.body).toEqual({ action: 'updateProduct' });
    });

    it('should block users without update permission', async () => {
      // Regular user lacks update permission
      const res = await request(app)
        .put('/api/products/product-id')
        .send({ name: 'Updated Product' });
      
      expect(res.status).toBe(403);
      expect(protect).toHaveBeenCalled();
      expect(hasPermission).toHaveBeenCalledWith(PERMISSIONS.UPDATE_PRODUCT);
      expect(productController.updateProduct).not.toHaveBeenCalled();
    });
  });

  describe('DELETE /api/products/:id', () => {
    it('should route to deleteProduct controller with permission check', async () => {
      // Make user an admin for this test to have delete permission
      protect.mockImplementationOnce((req, res, next) => {
        req.user = { id: 'admin-id', role: 'admin' };
        next();
      });
      
      const res = await request(app).delete('/api/products/product-id');
      
      expect(res.status).toBe(200);
      expect(protect).toHaveBeenCalled();
      expect(hasPermission).toHaveBeenCalledWith(PERMISSIONS.DELETE_PRODUCT);
      expect(productController.deleteProduct).toHaveBeenCalled();
      expect(res.body).toEqual({ action: 'deleteProduct' });
    });

    it('should block users without delete permission', async () => {
      // Regular user lacks delete permission
      const res = await request(app).delete('/api/products/product-id');
      
      expect(res.status).toBe(403);
      expect(protect).toHaveBeenCalled();
      expect(hasPermission).toHaveBeenCalledWith(PERMISSIONS.DELETE_PRODUCT);
      expect(productController.deleteProduct).not.toHaveBeenCalled();
    });
  });

  describe('PATCH /api/products/:id/stock', () => {
    it('should route to updateProductStock controller with permission check', async () => {
      // Make user an admin for this test to have update permission
      protect.mockImplementationOnce((req, res, next) => {
        req.user = { id: 'admin-id', role: 'admin' };
        next();
      });
      
      const res = await request(app)
        .patch('/api/products/product-id/stock')
        .send({ quantity: 20 });
      
      expect(res.status).toBe(200);
      expect(protect).toHaveBeenCalled();
      expect(hasPermission).toHaveBeenCalledWith(PERMISSIONS.UPDATE_PRODUCT);
      expect(productController.updateProductStock).toHaveBeenCalled();
      expect(res.body).toEqual({ action: 'updateProductStock' });
    });

    it('should block users without update permission', async () => {
      // Regular user lacks update permission
      const res = await request(app)
        .patch('/api/products/product-id/stock')
        .send({ quantity: 20 });
      
      expect(res.status).toBe(403);
      expect(protect).toHaveBeenCalled();
      expect(hasPermission).toHaveBeenCalledWith(PERMISSIONS.UPDATE_PRODUCT);
      expect(productController.updateProductStock).not.toHaveBeenCalled();
    });
  });
});