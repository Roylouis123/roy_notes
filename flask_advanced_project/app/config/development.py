# app/config/development.py

"""Development environment configuration.

This module defines the configuration settings specific to the development
environment. It inherits from the BaseConfig.
"""

from app.config.base import BaseConfig


class DevelopmentConfig(BaseConfig):
    """Development-specific configuration.
    
    This class contains settings that are specific to the development environment.
    It overrides any necessary settings from the BaseConfig.
    """
    DEBUG = True
    
    # Enhanced logging for development
    LOG_LEVEL = 'DEBUG'
    
    # More lenient CORS in development
    CORS_ALLOWED_ORIGINS = '*'
    
    # Higher rate limits for development
    RATELIMIT_DEFAULT = '200 per minute'
    
    # Add development-specific settings here
    PROPAGATE_EXCEPTIONS = True  # Helps with debugging
