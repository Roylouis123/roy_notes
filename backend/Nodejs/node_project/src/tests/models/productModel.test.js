/**
 * Product Model Tests
 * 
 * This file tests the Product model to ensure validation and methods
 * work correctly.
 */

const mongoose = require('mongoose');
const Product = require('../../models/productModel');

describe('Product Model', () => {
  describe('Schema Validation', () => {
    it('should validate a product with all required fields', () => {
      const validProduct = new Product({
        name: 'Test Product',
        description: 'Test description',
        price: 99.99,
        category: 'electronics',
        createdBy: new mongoose.Types.ObjectId()
      });

      const validationError = validProduct.validateSync();
      expect(validationError).toBeUndefined();
    });

    it('should fail validation when name is missing', () => {
      const invalidProduct = new Product({
        description: 'Test description',
        price: 99.99,
        category: 'electronics',
        createdBy: new mongoose.Types.ObjectId()
      });

      const validationError = invalidProduct.validateSync();
      expect(validationError.errors.name).toBeDefined();
    });

    it('should fail validation when description is missing', () => {
      const invalidProduct = new Product({
        name: 'Test Product',
        price: 99.99,
        category: 'electronics',
        createdBy: new mongoose.Types.ObjectId()
      });

      const validationError = invalidProduct.validateSync();
      expect(validationError.errors.description).toBeDefined();
    });

    it('should fail validation when price is missing', () => {
      const invalidProduct = new Product({
        name: 'Test Product',
        description: 'Test description',
        category: 'electronics',
        createdBy: new mongoose.Types.ObjectId()
      });

      const validationError = invalidProduct.validateSync();
      expect(validationError.errors.price).toBeDefined();
    });

    it('should fail validation when price is negative', () => {
      const invalidProduct = new Product({
        name: 'Test Product',
        description: 'Test description',
        price: -10,
        category: 'electronics',
        createdBy: new mongoose.Types.ObjectId()
      });

      const validationError = invalidProduct.validateSync();
      expect(validationError.errors.price).toBeDefined();
    });

    it('should fail validation when category is missing', () => {
      const invalidProduct = new Product({
        name: 'Test Product',
        description: 'Test description',
        price: 99.99,
        createdBy: new mongoose.Types.ObjectId()
      });

      const validationError = invalidProduct.validateSync();
      expect(validationError.errors.category).toBeDefined();
    });

    it('should fail validation when createdBy is missing', () => {
      const invalidProduct = new Product({
        name: 'Test Product',
        description: 'Test description',
        price: 99.99,
        category: 'electronics'
      });

      const validationError = invalidProduct.validateSync();
      expect(validationError.errors.createdBy).toBeDefined();
    });

    it('should set default values for optional fields', () => {
      const product = new Product({
        name: 'Test Product',
        description: 'Test description',
        price: 99.99,
        category: 'electronics',
        createdBy: new mongoose.Types.ObjectId()
      });

      expect(product.inStock).toBe(true);
      expect(product.quantity).toBe(0);
      expect(product.imageUrl).toBe('no-image.jpg');
    });
  });

  describe('Instance Methods', () => {
    let product;

    beforeEach(() => {
      product = new Product({
        name: 'Test Product',
        description: 'Test description',
        price: 99.99,
        category: 'electronics',
        inStock: true,
        quantity: 10,
        createdBy: new mongoose.Types.ObjectId()
      });

      // Mock the save method
      product.save = jest.fn().mockReturnValue(product);
    });

    describe('checkStock', () => {
      it('should return true when product is in stock and quantity > 0', () => {
        product.inStock = true;
        product.quantity = 5;
        
        expect(product.checkStock()).toBe(true);
      });

      it('should return false when product is not in stock', () => {
        product.inStock = false;
        product.quantity = 5;
        
        expect(product.checkStock()).toBe(false);
      });

      it('should return false when quantity is 0', () => {
        product.inStock = true;
        product.quantity = 0;
        
        expect(product.checkStock()).toBe(false);
      });
    });

    describe('updateQuantity', () => {
      it('should increase quantity when positive amount is provided', async () => {
        await product.updateQuantity(5);
        
        expect(product.quantity).toBe(15);
        expect(product.inStock).toBe(true);
        expect(product.save).toHaveBeenCalled();
      });

      it('should decrease quantity when negative amount is provided', async () => {
        await product.updateQuantity(-5);
        
        expect(product.quantity).toBe(5);
        expect(product.inStock).toBe(true);
        expect(product.save).toHaveBeenCalled();
      });

      it('should set inStock to false when quantity becomes 0', async () => {
        await product.updateQuantity(-10);
        
        expect(product.quantity).toBe(0);
        expect(product.inStock).toBe(false);
        expect(product.save).toHaveBeenCalled();
      });

      it('should throw error when trying to reduce below 0', async () => {
        await expect(product.updateQuantity(-15)).rejects.toThrow('Cannot reduce quantity below zero');
        expect(product.save).not.toHaveBeenCalled();
      });
    });
  });
});