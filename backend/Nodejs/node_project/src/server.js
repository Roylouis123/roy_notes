/**
 * Main Server Entry Point
 * 
 * This file sets up the Express server, connects to MongoDB,
 * and handles uncaught exceptions and rejections.
 * 
 * The server configuration is designed for a production-ready
 * environment with proper error handling and security measures.
 */

// Load environment variables
require('dotenv').config();

// Import core modules
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

// Import custom middleware
const { errorHandler } = require('./middleware/errorMiddleware');
const { requestLogger } = require('./middleware/requestLoggerMiddleware');

// Import route files
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

// Import logger
const logger = require('./utils/logger');

// Create Express app
const app = express();

// Set security HTTP headers
app.use(helmet());

// Enable CORS
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api', limiter);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cookie parser middleware
app.use(cookieParser());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Custom request logger
app.use(requestLogger);

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is healthy' });
});

// Error handling middleware
app.use(errorHandler);

// Define port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    logger.info('MongoDB connected successfully');
    
    // Start server
    const server = app.listen(PORT, () => {
      logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err) => {
      logger.error(`Unhandled Rejection: ${err.message}`);
      logger.error(err.stack);
      
      // Close server & exit process
      server.close(() => process.exit(1));
    });
  })
  .catch((err) => {
    logger.error(`MongoDB connection error: ${err.message}`);
    process.exit(1);
  });

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error(`Uncaught Exception: ${err.message}`);
  logger.error(err.stack);
  process.exit(1);
});