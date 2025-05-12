# app/__init__.py

"""Main application package initialization.

This module initializes the Flask application and configures all extensions,
routes, and middleware components.
"""

import os
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_pymongo import PyMongo

# Initialize extensions
mongo = PyMongo()
bcrypt = Bcrypt()
jwt = JWTManager()


def create_app(config_name=None):
    """Application factory function.
    
    Creates and configures the Flask application based on the configuration 
    name provided. This follows the application factory pattern.
    
    Args:
        config_name (str, optional): The name of the configuration to use.
            Defaults to None, which will use the FLASK_ENV environment variable.
    
    Returns:
        Flask: The configured Flask application instance.
    """
    app = Flask(__name__)
    
    # Load configuration based on environment
    if config_name is None:
        config_name = os.environ.get('FLASK_ENV', 'development')
        
    # Load config based on the environment
    if config_name == 'production':
        from app.config.production import ProductionConfig
        app.config.from_object(ProductionConfig)
    elif config_name == 'testing':
        from app.config.testing import TestingConfig
        app.config.from_object(TestingConfig)
    else:  # default to development
        from app.config.development import DevelopmentConfig
        app.config.from_object(DevelopmentConfig)
    
    # Initialize extensions with the app
    init_extensions(app)
    
    # Register middlewares
    register_middlewares(app)
    
    # Register error handlers
    register_error_handlers(app)
    
    # Register blueprints (routes)
    register_blueprints(app)
    
    return app


def init_extensions(app):
    """Initialize Flask extensions.
    
    Args:
        app (Flask): The Flask application instance.
    """
    # Initialize MongoDB
    mongo.init_app(app)
    
    # Initialize Bcrypt for password hashing
    bcrypt.init_app(app)
    
    # Initialize JWT for authentication
    jwt.init_app(app)
    
    # Import and register jwt callbacks from auth module
    from app.auth.jwt_callbacks import register_jwt_callbacks
    register_jwt_callbacks(jwt)


def register_middlewares(app):
    """Register middleware components.
    
    Args:
        app (Flask): The Flask application instance.
    """
    # Configure CORS
    cors_origins = app.config.get('CORS_ALLOWED_ORIGINS', '*').split(',')
    CORS(app, resources={r"/api/*": {"origins": cors_origins}})
    
    # Configure request logging
    from app.middlewares.request_logger import configure_request_logging
    configure_request_logging(app)
    
    # Add security headers middleware
    from app.middlewares.security_headers import add_security_headers
    app.after_request(add_security_headers)


def register_error_handlers(app):
    """Register error handlers for the application.
    
    Args:
        app (Flask): The Flask application instance.
    """
    from app.utils.error_handlers import (
        handle_bad_request,
        handle_not_found,
        handle_unauthorized,
        handle_forbidden,
        handle_method_not_allowed,
        handle_internal_server_error,
        handle_validation_error
    )
    
    app.register_error_handler(400, handle_bad_request)
    app.register_error_handler(401, handle_unauthorized)
    app.register_error_handler(403, handle_forbidden)
    app.register_error_handler(404, handle_not_found)
    app.register_error_handler(405, handle_method_not_allowed)
    app.register_error_handler(500, handle_internal_server_error)
    app.register_error_handler(422, handle_validation_error)


def register_blueprints(app):
    """Register blueprints (route handlers) with the application.
    
    Args:
        app (Flask): The Flask application instance.
    """
    # Import and register blueprints
    from app.auth.routes import auth_bp
    from app.api.users.routes import users_bp
    from app.api.products.routes import products_bp
    
    # Register blueprints with URL prefixes
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(users_bp, url_prefix='/api/users')
    app.register_blueprint(products_bp, url_prefix='/api/products')
