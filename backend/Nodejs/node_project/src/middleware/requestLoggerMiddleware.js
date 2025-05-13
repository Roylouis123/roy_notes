/**
 * Request Logger Middleware
 * 
 * This middleware logs all incoming HTTP requests for monitoring
 * and debugging purposes.
 */

const logger = require('../utils/logger');

/**
 * Log request details
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const requestLogger = (req, res, next) => {
  // Capture request start time
  const start = Date.now();
  
  // Log basic request info
  logger.info(`${req.method} ${req.originalUrl} [STARTED]`);
  
  // Log request body if present
  if (Object.keys(req.body).length > 0) {
    // Filter out sensitive data
    const filteredBody = { ...req.body };
    
    // Remove sensitive fields
    if (filteredBody.password) filteredBody.password = '[FILTERED]';
    if (filteredBody.confirmPassword) filteredBody.confirmPassword = '[FILTERED]';
    if (filteredBody.currentPassword) filteredBody.currentPassword = '[FILTERED]';
    if (filteredBody.token) filteredBody.token = '[FILTERED]';
    
    logger.debug(`Request body: ${JSON.stringify(filteredBody)}`);
  }
  
  // Capture and log response
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logLevel = res.statusCode >= 400 ? 'warn' : 'info';
    
    logger[logLevel](
      `${req.method} ${req.originalUrl} [FINISHED] ${res.statusCode} ${res.statusMessage} - ${duration}ms`
    );
  });
  
  // Capture and log request errors
  res.on('error', (err) => {
    const duration = Date.now() - start;
    logger.error(
      `${req.method} ${req.originalUrl} [ERROR] ${err.message} - ${duration}ms`
    );
  });
  
  next();
};

module.exports = { requestLogger };