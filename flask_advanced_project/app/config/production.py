# app/config/production.py

"""Production environment configuration.

This module defines the configuration settings specific to the production
environment. It inherits from the BaseConfig and overrides settings as needed.
"""

import os
from app.config.base import BaseConfig


class ProductionConfig(BaseConfig):
    """Production-specific configuration.
    
    This class contains settings that are specific to the production environment.
    It prioritizes security and performance.
    """
    DEBUG = False
    
    # Log level is less verbose in production
    LOG_LEVEL = os.environ.get('LOG_LEVEL', 'WARNING')
    
    # In production, ensure these are set in environment variables
    SECRET_KEY = os.environ.get('SECRET_KEY')
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
    
    # Fail if these critical secrets are not set
    if not SECRET_KEY or not JWT_SECRET_KEY:
        import sys
        print(
            "ERROR: SECRET_KEY and JWT_SECRET_KEY must be set in the environment "
            "for production. Exiting.", 
            file=sys.stderr
        )
        sys.exit(1)
    
    # Stricter rate limiting for production
    RATELIMIT_DEFAULT = '60 per minute'
    
    # Additional production-specific settings
    PROPAGATE_EXCEPTIONS = False
    PRESERVE_CONTEXT_ON_EXCEPTION = False
    
    # Production security settings
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    REMEMBER_COOKIE_SECURE = True
    REMEMBER_COOKIE_HTTPONLY = True
