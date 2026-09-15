/**
 * Product Controller
 * 
 * This file contains handler functions for product-related routes
 * for managing products in the system.
 */

const Product = require('../models/productModel');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const logger = require('../utils/logger');
const mongoose = require('mongoose');

/**
 * Get all products with filtering, sorting, and pagination
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} List of products with pagination
 */
const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = 'createdAt',
      category,
      minPrice,
      maxPrice,
      search,
      inStock
    } = req.query;
    
    // Build query
    const query = {};
    
    // Filter by category
    if (category) {
      query.category = category;
    }
    
    // Filter by price range
    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined) query.price.$gte = minPrice;
      if (maxPrice !== undefined) query.price.$lte = maxPrice;
    }
    
    // Filter by stock status
    if (inStock !== undefined) {
      query.inStock = inStock === 'true';
    }
    
    // Text search
    if (search) {
      // Using $text index if available, otherwise use regex for simple search
      if (search.length > 2) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }
    }
    
    // Calculate pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    
    // Determine sort order
    const sortField = sort.startsWith('-') ? sort.substring(1) : sort;
    const sortOrder = sort.startsWith('-') ? -1 : 1;
    const sortOptions = { [sortField]: sortOrder };
    
    // Execute query with pagination
    const products = await Product.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum)
      .populate('createdBy', 'name email');
    
    // Get total count for pagination
    const total = await Product.countDocuments(query);
    
    // Pagination metadata
    const pagination = {
      page: pageNum,
      limit: limitNum,
      total,
      pages: Math.ceil(total / limitNum)
    };
    
    return successResponse(
      res, 
      'Products retrieved successfully', 
      { products, pagination }
    );
  } catch (error) {
    logger.error(`Get products error: ${error.message}`);
    return errorResponse(res, 'Failed to retrieve products', 500);
  }
};

/**
 * Get a single product by ID
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Product data
 */
const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return errorResponse(res, 'Invalid product ID', 400);
    }
    
    // Find product
    const product = await Product.findById(productId)
      .populate('createdBy', 'name email');
    
    if (!product) {
      return errorResponse(res, 'Product not found', 404);
    }
    
    return successResponse(res, 'Product retrieved successfully', product);
  } catch (error) {
    logger.error(`Get product error: ${error.message}`);
    return errorResponse(res, 'Failed to retrieve product', 500);
  }
};

/**
 * Create a new product
 * Admin only
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Created product data
 */
const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      inStock,
      quantity,
      imageUrl
    } = req.body;
    
    // Create product
    const product = await Product.create({
      name,
      description,
      price,
      category,
      inStock: inStock !== undefined ? inStock : true,
      quantity: quantity || 0,
      imageUrl: imageUrl || 'no-image.jpg',
      createdBy: req.user.id
    });
    
    return successResponse(res, 'Product created successfully', product, 201);
  } catch (error) {
    logger.error(`Create product error: ${error.message}`);
    return errorResponse(res, 'Failed to create product', 500);
  }
};

/**
 * Update a product
 * Admin only
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Updated product data
 */
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return errorResponse(res, 'Invalid product ID', 400);
    }
    
    // Check if product exists
    let product = await Product.findById(productId);
    
    if (!product) {
      return errorResponse(res, 'Product not found', 404);
    }
    
    // Update product
    product = await Product.findByIdAndUpdate(
      productId,
      req.body,
      { new: true, runValidators: true }
    );
    
    return successResponse(res, 'Product updated successfully', product);
  } catch (error) {
    logger.error(`Update product error: ${error.message}`);
    return errorResponse(res, 'Failed to update product', 500);
  }
};

/**
 * Delete a product
 * Admin only
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Success response
 */
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return errorResponse(res, 'Invalid product ID', 400);
    }
    
    // Find product
    const product = await Product.findById(productId);
    
    if (!product) {
      return errorResponse(res, 'Product not found', 404);
    }
    
    // Delete product
    await product.deleteOne();
    
    return successResponse(res, 'Product deleted successfully');
  } catch (error) {
    logger.error(`Delete product error: ${error.message}`);
    return errorResponse(res, 'Failed to delete product', 500);
  }
};

/**
 * Update product stock quantity
 * Admin only
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Updated product data
 */
const updateProductStock = async (req, res) => {
  try {
    const { quantity } = req.body;
    const productId = req.params.id;
    
    // Validate quantity
    if (quantity === undefined || isNaN(quantity)) {
      return errorResponse(res, 'Quantity must be a number', 400);
    }
    
    // Find product
    const product = await Product.findById(productId);
    
    if (!product) {
      return errorResponse(res, 'Product not found', 404);
    }
    
    // Update quantity and in-stock status
    product.quantity = Math.max(0, parseInt(quantity));
    product.inStock = product.quantity > 0;
    
    // Save product
    await product.save();
    
    return successResponse(res, 'Product stock updated successfully', product);
  } catch (error) {
    logger.error(`Update product stock error: ${error.message}`);
    return errorResponse(res, 'Failed to update product stock', 500);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductStock
};