/**
 * Product Routes
 * 
 * This file defines all routes related to product management
 * with role-based access control.
 */

const express = require('express');
const router = express.Router();
const { validateWithJoi } = require('../middleware/validationMiddleware');
const { protect, hasPermission } = require('../middleware/authMiddleware');
const { PERMISSIONS } = require('../config/roles');
const {
  createProductSchema,
  updateProductSchema,
  productQuerySchema
} = require('../validations/productValidation');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductStock
} = require('../controllers/productController');

/**
 * @route   GET /api/products
 * @desc    Get all products with filtering and pagination
 * @access  Public
 */
router.get(
  '/',
  validateWithJoi(productQuerySchema, 'query'),
  getProducts
);

/**
 * @route   GET /api/products/:id
 * @desc    Get a single product by ID
 * @access  Public
 */
router.get('/:id', getProductById);

/**
 * @route   POST /api/products
 * @desc    Create a new product
 * @access  Admin only
 */
router.post(
  '/',
  protect,
  hasPermission(PERMISSIONS.CREATE_PRODUCT),
  validateWithJoi(createProductSchema),
  createProduct
);

/**
 * @route   PUT /api/products/:id
 * @desc    Update a product
 * @access  Admin only
 */
router.put(
  '/:id',
  protect,
  hasPermission(PERMISSIONS.UPDATE_PRODUCT),
  validateWithJoi(updateProductSchema),
  updateProduct
);

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product
 * @access  Admin only
 */
router.delete(
  '/:id',
  protect,
  hasPermission(PERMISSIONS.DELETE_PRODUCT),
  deleteProduct
);

/**
 * @route   PATCH /api/products/:id/stock
 * @desc    Update product stock quantity
 * @access  Admin only
 */
router.patch(
  '/:id/stock',
  protect,
  hasPermission(PERMISSIONS.UPDATE_PRODUCT),
  updateProductStock
);

module.exports = router;