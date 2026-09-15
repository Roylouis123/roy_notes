/**
 * Database Configuration
 * 
 * This file contains the configuration for MongoDB connection,
 * including options and connection error handling.
 */

const mongoose = require('mongoose');
const logger = require('../utils/logger');

// MongoDB connection options for optimal performance and reliability
const connectOptions = {
  // These are no longer needed in recent versions of Mongoose
  // as they are set to true by default
};

/**
 * Connect to MongoDB
 * 
 * This function establishes a connection to MongoDB using the URI
 * specified in the environment variables.
 * 
 * @returns {Promise} A promise that resolves when connected or rejects on error
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, connectOptions);
    
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
    
    // Event listeners for connection issues
    mongoose.connection.on('error', (err) => {
      logger.error(`MongoDB connection error: ${err}`);
    });
    
    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected. Attempting to reconnect...');
    });
    
    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB reconnected successfully');
    });
    
    return conn;
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error.message}`);
    throw error; // Re-throw to allow handling in server.js
  }
};

module.exports = connectDB;