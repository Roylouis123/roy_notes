# app/config/base.py

"""Base configuration for the Flask application.

This module defines the base configuration class that other environment-specific
configurations will inherit from. It contains settings common to all environments.
"""

import os
from datetime import timedelta


class BaseConfig:
    """Base configuration for all environments.
    
    This class defines configuration values common to all environments.
    Environment-specific configurations inherit from this class.
    """
    # Flask Settings
    SECRET_KEY = os.environ.get('SECRET_KEY', 'default-secret-key-for-dev')
    DEBUG = False
    TESTING = False
    JSON_SORT_KEYS = False
    
    # MongoDB Settings
    MONGO_URI = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/')
    MONGO_DBNAME = os.environ.get('MONGO_DBNAME', 'flask_advanced_db')
    
    # JWT Settings
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'default-jwt-secret-key')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(
        seconds=int(os.environ.get('JWT_ACCESS_TOKEN_EXPIRES', 3600))  # 1 hour
    )
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(
        seconds=int(os.environ.get('JWT_REFRESH_TOKEN_EXPIRES', 2592000))  # 30 days
    )
    JWT_TOKEN_LOCATION = ['headers']
    JWT_HEADER_NAME = 'Authorization'
    JWT_HEADER_TYPE = 'Bearer'
    
    # Security Settings
    BCRYPT_SALT_ROUNDS = int(os.environ.get('BCRYPT_SALT_ROUNDS', 12))
    
    # CORS Settings
    CORS_ALLOWED_ORIGINS = os.environ.get(
        'CORS_ALLOWED_ORIGINS', 'http://localhost:3000,http://localhost:8080'
    )
    
    # Logging Settings
    LOG_LEVEL = os.environ.get('LOG_LEVEL', 'INFO')
    LOG_FORMAT = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    LOG_DATE_FORMAT = '%Y-%m-%d %H:%M:%S'
    
    # Rate Limiting Settings
    RATELIMIT_DEFAULT = '100 per minute'
    RATELIMIT_STORAGE_URL = 'memory://'
    
    # File Upload Settings
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB max upload size
    UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
