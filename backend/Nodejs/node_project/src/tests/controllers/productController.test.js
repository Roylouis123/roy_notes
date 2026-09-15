/**
 * Product Controller Tests
 * 
 * This file tests the product controller functions to ensure
 * they handle product management operations correctly.
 */

const mongoose = require('mongoose');
const Product = require('../../models/productModel');
const { successResponse, errorResponse } = require('../../utils/apiResponse');
const logger = require('../../utils/logger');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductStock
} = require('../../controllers/productController');
const { getProducts: getMockProducts } = require('../mocks/db');

// Mock dependencies
jest.mock('mongoose');
jest.mock('../../models/productModel');
jest.mock('../../utils/apiResponse', () => ({
  successResponse: jest.fn().mockReturnValue('success-response'),
  errorResponse: jest.fn().mockReturnValue('error-response')
}));
jest.mock('../../utils/logger', () => ({
  error: jest.fn()
}));

describe('Product Controller', () => {
  let req;
  let res;
  let mockProducts;
  
  beforeEach(() => {
    req = {
      params: {},
      query: {},
      body: {},
      user: { id: 'admin-id', role: 'admin' }
    };
    
    res = {};
    
    mockProducts = [
      {
        _id: 'product-id-1',
        name: 'Test Product 1',
        description: 'Test description 1',
        price: 99.99,
        category: 'electronics',
        inStock: true,
        quantity: 10,
        imageUrl: 'test1.jpg',
        createdBy: 'admin-id'
      },
      {
        _id: 'product-id-2',
        name: 'Test Product 2',
        description: 'Test description 2',
        price: 49.99,
        category: 'books',
        inStock: true,
        quantity: 5,
        imageUrl: 'test2.jpg',
        createdBy: 'admin-id'
      }
    ];
    
    // Reset mocks
    jest.clearAllMocks();
    
    // Mock mongoose Types.ObjectId.isValid
    mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(true);
  });

  describe('getProducts', () => {
    it('should get products with default pagination', async () => {
      // Setup
      Product.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        populate: jest.fn().mockResolvedValue(mockProducts)
      });
      
      Product.countDocuments.mockResolvedValue(25);
      
      // Execute
      await getProducts(req, res);
      
      // Assert
      expect(Product.find).toHaveBeenCalledWith({});
      expect(Product.countDocuments).toHaveBeenCalledWith({});
      expect(successResponse).toHaveBeenCalledWith(
        res,
        'Products retrieved successfully',
        {
          products: mockProducts,
          pagination: {
            page: 1,
            limit: 10,
            total: 25,
            pages: 3
          }
        }
      );
    });

    it('should apply filters when provided', async () => {
      // Setup
      req.query = {
        page: '2',
        limit: '5',
        sort: '-price',
        category: 'electronics',
        minPrice: '10',
        maxPrice: '100',
        inStock: 'true',
        search: 'test'
      };
      
      Product.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        populate: jest.fn().mockResolvedValue([mockProducts[0]])
      });
      
      Product.countDocuments.mockResolvedValue(15);
      
      // Execute
      await getProducts(req, res);
      
      // Assert
      // Verify query includes filters
      expect(Product.find).toHaveBeenCalledWith(expect.objectContaining({
        category: 'electronics',
        price: { $gte: '10', $lte: '100' },
        inStock: true,
        $or: expect.any(Array)
      }));
      
      // Verify sort, skip, limit
      const findMock = Product.find();
      expect(findMock.sort).toHaveBeenCalledWith({ price: -1 });
      expect(findMock.skip).toHaveBeenCalledWith(5); // (page-1)*limit
      expect(findMock.limit).toHaveBeenCalledWith(5);
      
      // Verify response
      expect(successResponse).toHaveBeenCalledWith(
        res,
        'Products retrieved successfully',
        {
          products: [mockProducts[0]],
          pagination: {
            page: 2,
            limit: 5,
            total: 15,
            pages: 3
          }
        }
      );
    });

    it('should handle errors', async () => {
      // Setup
      Product.find.mockImplementation(() => {
        throw new Error('Database error');
      });
      
      // Execute
      await getProducts(req, res);
      
      // Assert
      expect(logger.error).toHaveBeenCalled();
      expect(errorResponse).toHaveBeenCalledWith(res, 'Failed to retrieve products', 500);
    });
  });

  describe('getProductById', () => {
    it('should get a product by ID', async () => {
      // Setup
      req.params.id = 'product-id-1';
      
      Product.findById.mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockProducts[0])
      });
      
      // Execute
      await getProductById(req, res);
      
      // Assert
      expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith('product-id-1');
      expect(Product.findById).toHaveBeenCalledWith('product-id-1');
      expect(successResponse).toHaveBeenCalledWith(
        res,
        'Product retrieved successfully',
        mockProducts[0]
      );
    });

    it('should return 400 for invalid product ID', async () => {
      // Setup
      req.params.id = 'invalid-id';
      
      mongoose.Types.ObjectId.isValid.mockReturnValueOnce(false);
      
      // Execute
      await getProductById(req, res);
      
      // Assert
      expect(Product.findById).not.toHaveBeenCalled();
      expect(errorResponse).toHaveBeenCalledWith(res, 'Invalid product ID', 400);
    });

    it('should return 404 when product not found', async () => {
      // Setup
      req.params.id = 'nonexistent-id';
      
      Product.findById.mockReturnValue({
        populate: jest.fn().mockResolvedValue(null)
      });
      
      // Execute
      await getProductById(req, res);
      
      // Assert
      expect(errorResponse).toHaveBeenCalledWith(res, 'Product not found', 404);
    });
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      // Setup
      req.body = {
        name: 'New Product',
        description: 'New description',
        price: 79.99,
        category: 'electronics',
        inStock: true,
        quantity: 15,
        imageUrl: 'new.jpg'
      };
      
      const createdProduct = {
        _id: 'new-product-id',
        ...req.body,
        createdBy: 'admin-id'
      };
      
      Product.create.mockResolvedValue(createdProduct);
      
      // Execute
      await createProduct(req, res);
      
      // Assert
      expect(Product.create).toHaveBeenCalledWith({
        ...req.body,
        createdBy: 'admin-id'
      });
      expect(successResponse).toHaveBeenCalledWith(
        res,
        'Product created successfully',
        createdProduct,
        201
      );
    });

    it('should handle missing fields by setting defaults', async () => {
      // Setup
      req.body = {
        name: 'New Product',
        description: 'New description',
        price: 79.99,
        category: 'electronics'
      };
      
      const createdProduct = {
        _id: 'new-product-id',
        ...req.body,
        inStock: true,
        quantity: 0,
        imageUrl: 'no-image.jpg',
        createdBy: 'admin-id'
      };
      
      Product.create.mockResolvedValue(createdProduct);
      
      // Execute
      await createProduct(req, res);
      
      // Assert
      expect(Product.create).toHaveBeenCalledWith(expect.objectContaining({
        inStock: true,
        quantity: 0,
        imageUrl: 'no-image.jpg'
      }));
      expect(successResponse).toHaveBeenCalled();
    });

    it('should handle errors during creation', async () => {
      // Setup
      req.body = {
        name: 'New Product',
        description: 'New description',
        price: 79.99,
        category: 'electronics'
      };
      
      Product.create.mockRejectedValue(new Error('Creation error'));
      
      // Execute
      await createProduct(req, res);
      
      // Assert
      expect(logger.error).toHaveBeenCalled();
      expect(errorResponse).toHaveBeenCalledWith(res, 'Failed to create product', 500);
    });
  });

  describe('updateProduct', () => {
    it('should update an existing product', async () => {
      // Setup
      req.params.id = 'product-id-1';
      req.body = {
        name: 'Updated Product',
        price: 129.99
      };
      
      const existingProduct = { ...mockProducts[0] };
      const updatedProduct = {
        ...mockProducts[0],
        name: 'Updated Product',
        price: 129.99
      };
      
      Product.findById.mockResolvedValue(existingProduct);
      Product.findByIdAndUpdate.mockResolvedValue(updatedProduct);
      
      // Execute
      await updateProduct(req, res);
      
      // Assert
      expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith('product-id-1');
      expect(Product.findById).toHaveBeenCalledWith('product-id-1');
      expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(
        'product-id-1',
        req.body,
        { new: true, runValidators: true }
      );
      expect(successResponse).toHaveBeenCalledWith(
        res,
        'Product updated successfully',
        updatedProduct
      );
    });

    it('should return 404 when product not found', async () => {
      // Setup
      req.params.id = 'nonexistent-id';
      req.body = { name: 'Updated Product' };
      
      Product.findById.mockResolvedValue(null);
      
      // Execute
      await updateProduct(req, res);
      
      // Assert
      expect(Product.findByIdAndUpdate).not.toHaveBeenCalled();
      expect(errorResponse).toHaveBeenCalledWith(res, 'Product not found', 404);
    });
  });

  describe('deleteProduct', () => {
    it('should delete an existing product', async () => {
      // Setup
      req.params.id = 'product-id-1';
      
      const productToDelete = {
        _id: 'product-id-1',
        name: 'Product to Delete',
        deleteOne: jest.fn().mockResolvedValue(true)
      };
      
      Product.findById.mockResolvedValue(productToDelete);
      
      // Execute
      await deleteProduct(req, res);
      
      // Assert
      expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith('product-id-1');
      expect(Product.findById).toHaveBeenCalledWith('product-id-1');
      expect(productToDelete.deleteOne).toHaveBeenCalled();
      expect(successResponse).toHaveBeenCalledWith(res, 'Product deleted successfully');
    });

    it('should return 404 when product not found', async () => {
      // Setup
      req.params.id = 'nonexistent-id';
      
      Product.findById.mockResolvedValue(null);
      
      // Execute
      await deleteProduct(req, res);
      
      // Assert
      expect(errorResponse).toHaveBeenCalledWith(res, 'Product not found', 404);
    });
  });

  describe('updateProductStock', () => {
    it('should update product stock quantity', async () => {
      // Setup
      req.params.id = 'product-id-1';
      req.body = { quantity: '20' };
      
      const existingProduct = {
        _id: 'product-id-1',
        name: 'Test Product',
        quantity: 10,
        inStock: true,
        save: jest.fn().mockResolvedValue(true)
      };
      
      Product.findById.mockResolvedValue(existingProduct);
      
      // Execute
      await updateProductStock(req, res);
      
      // Assert
      expect(Product.findById).toHaveBeenCalledWith('product-id-1');
      expect(existingProduct.quantity).toBe(20);
      expect(existingProduct.inStock).toBe(true);
      expect(existingProduct.save).toHaveBeenCalled();
      expect(successResponse).toHaveBeenCalledWith(
        res,
        'Product stock updated successfully',
        existingProduct
      );
    });

    it('should set inStock to false when quantity is 0', async () => {
      // Setup
      req.params.id = 'product-id-1';
      req.body = { quantity: '0' };
      
      const existingProduct = {
        _id: 'product-id-1',
        name: 'Test Product',
        quantity: 10,
        inStock: true,
        save: jest.fn().mockResolvedValue(true)
      };
      
      Product.findById.mockResolvedValue(existingProduct);
      
      // Execute
      await updateProductStock(req, res);
      
      // Assert
      expect(existingProduct.quantity).toBe(0);
      expect(existingProduct.inStock).toBe(false);
      expect(successResponse).toHaveBeenCalled();
    });

    it('should return 400 if quantity is not provided', async () => {
      // Setup
      req.params.id = 'product-id-1';
      req.body = {}; // No quantity
      
      // Execute
      await updateProductStock(req, res);
      
      // Assert
      expect(Product.findById).not.toHaveBeenCalled();
      expect(errorResponse).toHaveBeenCalledWith(res, 'Quantity must be a number', 400);
    });

    it('should return 404 when product not found', async () => {
      // Setup
      req.params.id = 'nonexistent-id';
      req.body = { quantity: '20' };
      
      Product.findById.mockResolvedValue(null);
      
      // Execute
      await updateProductStock(req, res);
      
      // Assert
      expect(errorResponse).toHaveBeenCalledWith(res, 'Product not found', 404);
    });
  });
});