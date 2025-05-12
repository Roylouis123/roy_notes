# app/middlewares/request_logger.py

"""Request logging middleware.

This module provides middleware functionality to log incoming HTTP requests,
which is useful for debugging and monitoring purposes.
"""

import logging
import time
from flask import request, g

# Create a dedicated logger for request logging
request_logger = logging.getLogger('request')


def configure_request_logging(app):
    """Configure request logging for the application.
    
    Args:
        app (Flask): The Flask application instance.
    """
    # Set up logging handlers if not in testing mode
    if not app.config.get('TESTING', False):
        # Set log level from configuration
        log_level = app.config.get('LOG_LEVEL', 'INFO')
        numeric_level = getattr(logging, log_level.upper(), None)
        if not isinstance(numeric_level, int):
            numeric_level = logging.INFO
        
        request_logger.setLevel(numeric_level)
        
        # Create a handler for the request logger
        handler = logging.StreamHandler()
        formatter = logging.Formatter(
            app.config.get('LOG_FORMAT', '%(asctime)s - %(name)s - %(levelname)s - %(message)s'),
            app.config.get('LOG_DATE_FORMAT', '%Y-%m-%d %H:%M:%S')
        )
        handler.setFormatter(formatter)
        request_logger.addHandler(handler)
    
    # Register before_request handler to start timing
    @app.before_request
    def before_request():
        # Store request start time
        g.start_time = time.time()
    
    # Register after_request handler to log request details
    @app.after_request
    def after_request(response):
        # Skip logging for static files if we're serving them
        if request.path.startswith('/static'):
            return response
        
        # Calculate request duration
        if hasattr(g, 'start_time'):
            duration = time.time() - g.start_time
        else:
            duration = 0
        
        # Mask sensitive data in headers
        headers = dict(request.headers)
        if 'Authorization' in headers:
            headers['Authorization'] = '[FILTERED]'
        if 'Cookie' in headers:
            headers['Cookie'] = '[FILTERED]'
        
        # Log request details
        request_logger.info(
            f"{request.remote_addr} - {request.method} {request.full_path} "
            f"- {response.status_code} - {duration:.4f}s"
        )
        
        # Log more details at debug level
        request_logger.debug(f"Headers: {headers}")
        
        return response
