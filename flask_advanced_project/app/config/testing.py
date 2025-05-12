# app/config/testing.py

"""Testing environment configuration.

This module defines the configuration settings specific to the testing
environment. It inherits from the BaseConfig.
"""

from app.config.base import BaseConfig


class TestingConfig(BaseConfig):
    """Testing-specific configuration.
    
    This class contains settings that are specific to the testing environment,
    optimized for running automated tests.
    """
    TESTING = True
    DEBUG = True
    
    # Use a separate database for testing
    MONGO_DBNAME = 'flask_advanced_db_test'
    
    # Disable CSRF protection in tests
    WTF_CSRF_ENABLED = False
    
    # More lenient rate limits for testing
    RATELIMIT_ENABLED = False
    
    # Shorter token expiration for faster testing
    JWT_ACCESS_TOKEN_EXPIRES = 300  # 5 minutes
    JWT_REFRESH_TOKEN_EXPIRES = 600  # 10 minutes
