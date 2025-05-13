/**
 * Product Model
 * 
 * This file defines the Product schema and model for MongoDB.
 * It includes fields for product details, pricing, and inventory management.
 */

const mongoose = require('mongoose');

// Define the Product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true,
    maxlength: [100, 'Product name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a product description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a product price'],
    min: [0, 'Price must be positive']
  },
  category: {
    type: String,
    required: [true, 'Please provide a product category'],
    trim: true
  },
  inStock: {
    type: Boolean,
    default: true
  },
  quantity: {
    type: Number,
    default: 0,
    min: [0, 'Quantity cannot be negative']
  },
  imageUrl: {
    type: String,
    default: 'no-image.jpg'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Create an index for better search performance
productSchema.index({ name: 'text', description: 'text', category: 'text' });

/**
 * Check if product is in stock
 * 
 * @returns {Boolean} Whether product is in stock
 */
productSchema.methods.checkStock = function() {
  return this.inStock && this.quantity > 0;
};

/**
 * Update product quantity
 * 
 * @param {Number} amount - Amount to change (positive or negative)
 * @returns {Promise<Object>} Updated product
 */
productSchema.methods.updateQuantity = async function(amount) {
  const newQuantity = this.quantity + amount;
  
  if (newQuantity < 0) {
    throw new Error('Cannot reduce quantity below zero');
  }
  
  this.quantity = newQuantity;
  this.inStock = newQuantity > 0;
  
  return this.save();
};

// Create and export the Product model
module.exports = mongoose.model('Product', productSchema);