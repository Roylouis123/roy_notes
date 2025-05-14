/**
 * Mock Database Helper
 * 
 * This file provides mock data and functions for testing
 * database-related functionality without connecting to a real database.
 */

// Sample users for testing
const users = [
  {
    _id: '5f7d327b967c3b2e8c21d8a1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: '$2a$10$CwTycUXWue0Thq9StjUM0uQxTmTRibP9E9iGztalKzHPuVLpLfEFm', // password123
    role: 'admin',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01')
  },
  {
    _id: '5f7d32cc967c3b2e8c21d8a2',
    name: 'Regular User',
    email: 'user@example.com',
    password: '$2a$10$CwTycUXWue0Thq9StjUM0uQxTmTRibP9E9iGztalKzHPuVLpLfEFm', // password123
    role: 'user',
    createdAt: new Date('2023-01-02'),
    updatedAt: new Date('2023-01-02')
  }
];

// Sample products for testing
const products = [
  {
    _id: '5f7d3349967c3b2e8c21d8a3',
    name: 'Sample Product 1',
    description: 'This is a sample product for testing',
    price: 99.99,
    category: 'electronics',
    inStock: true,
    quantity: 100,
    imageUrl: 'sample1.jpg',
    createdBy: '5f7d327b967c3b2e8c21d8a1',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01')
  },
  {
    _id: '5f7d3372967c3b2e8c21d8a4',
    name: 'Sample Product 2',
    description: 'Another sample product for testing',
    price: 49.99,
    category: 'books',
    inStock: true,
    quantity: 50,
    imageUrl: 'sample2.jpg',
    createdBy: '5f7d327b967c3b2e8c21d8a1',
    createdAt: new Date('2023-01-02'),
    updatedAt: new Date('2023-01-02')
  },
  {
    _id: '5f7d3390967c3b2e8c21d8a5',
    name: 'Out of Stock Product',
    description: 'A product that is out of stock',
    price: 199.99,
    category: 'electronics',
    inStock: false,
    quantity: 0,
    imageUrl: 'sample3.jpg',
    createdBy: '5f7d327b967c3b2e8c21d8a1',
    createdAt: new Date('2023-01-03'),
    updatedAt: new Date('2023-01-03')
  }
];

// Function to get a copy of the mock data
const getUsers = () => users.map(user => ({ ...user }));
const getProducts = () => products.map(product => ({ ...product }));

// Function to get a single user by ID
const getUserById = (id) => {
  const user = users.find(user => user._id === id);
  return user ? { ...user } : null;
};

// Function to get a single product by ID
const getProductById = (id) => {
  const product = products.find(product => product._id === id);
  return product ? { ...product } : null;
};

module.exports = {
  getUsers,
  getProducts,
  getUserById,
  getProductById
};