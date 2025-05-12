# app/models/user.py

"""User model for the application.

This module defines the User model which represents a user in the system
and provides methods for user-related operations.
"""

from datetime import datetime
from marshmallow import Schema, fields, validate, pre_load, post_dump, ValidationError
from app import bcrypt
from app.models.base_model import BaseModel, BaseSchema


class User(BaseModel):
    """User model for authentication and user management.
    
    Represents a user in the application and provides methods for user-related
    operations such as password hashing and verification.
    """
    collection_name = 'users'
    
    ROLES = ['user', 'admin', 'moderator']
    
    @staticmethod
    def hash_password(password):
        """Hash a password using bcrypt.
        
        Args:
            password (str): The plain text password to hash.
        
        Returns:
            str: The hashed password.
        """
        return bcrypt.generate_password_hash(password).decode('utf-8')
    
    @staticmethod
    def verify_password(hashed_password, password):
        """Verify a password against a hash.
        
        Args:
            hashed_password (str): The hashed password from the database.
            password (str): The plain text password to verify.
        
        Returns:
            bool: True if the password matches, False otherwise.
        """
        return bcrypt.check_password_hash(hashed_password, password)
    
    @classmethod
    def find_by_email(cls, email):
        """Find a user by their email address.
        
        Args:
            email (str): The email address to search for.
        
        Returns:
            dict or None: The user document, or None if not found.
        """
        return cls.find_one({'email': email.lower()})
    
    @classmethod
    def find_by_username(cls, username):
        """Find a user by their username.
        
        Args:
            username (str): The username to search for.
        
        Returns:
            dict or None: The user document, or None if not found.
        """
        return cls.find_one({'username': username.lower()})
    
    @classmethod
    def create_user(cls, data):
        """Create a new user with a hashed password.
        
        Args:
            data (dict): User data including plain text password.
        
        Returns:
            dict: The created user document (without password).
        """
        # Hash the password before storing
        if 'password' in data:
            data['password'] = cls.hash_password(data['password'])
        
        # Make email and username lowercase for case-insensitive lookup
        if 'email' in data:
            data['email'] = data['email'].lower()
        if 'username' in data:
            data['username'] = data['username'].lower()
        
        # Set default role if not specified
        if 'role' not in data:
            data['role'] = 'user'
        
        # Set additional fields
        data['last_login'] = None
        data['active'] = True
        
        # Create the user
        return cls.create(data)
    
    @classmethod
    def update_last_login(cls, user_id):
        """Update a user's last login timestamp.
        
        Args:
            user_id (str): The user ID.
        
        Returns:
            dict or None: The updated user document, or None if not found.
        """
        return cls.update(user_id, {'last_login': datetime.utcnow()})
    
    @classmethod
    def change_password(cls, user_id, new_password):
        """Change a user's password.
        
        Args:
            user_id (str): The user ID.
            new_password (str): The new password in plain text.
        
        Returns:
            dict or None: The updated user document, or None if not found.
        """
        hashed_password = cls.hash_password(new_password)
        return cls.update(user_id, {'password': hashed_password})


class UserSchema(BaseSchema):
    """Marshmallow schema for User model.
    
    This schema handles serialization and deserialization of User objects,
    including validation of user data.
    """
    username = fields.Str(required=True, validate=validate.Length(min=3, max=50))
    email = fields.Email(required=True)
    password = fields.Str(load_only=True, validate=validate.Length(min=8), required=True)
    full_name = fields.Str(allow_none=True)
    role = fields.Str(validate=validate.OneOf(User.ROLES), default='user')
    active = fields.Bool(default=True)
    last_login = fields.DateTime(allow_none=True)
    
    @pre_load
    def process_input(self, data, **kwargs):
        """Pre-process input data before validation.
        
        This method normalizes fields like email and username.
        
        Args:
            data (dict): The data to be processed.
            **kwargs: Additional keyword arguments.
        
        Returns:
            dict: The processed data.
        """
        # Normalize email and username to lowercase
        if 'email' in data and data['email']:
            data['email'] = data['email'].lower().strip()
        
        if 'username' in data and data['username']:
            data['username'] = data['username'].lower().strip()
        
        return data
    
    @post_dump
    def remove_none_values(self, data, **kwargs):
        """Remove None values from output data.
        
        Args:
            data (dict): The data after dumping.
            **kwargs: Additional keyword arguments.
        
        Returns:
            dict: The filtered data without None values.
        """
        return {key: value for key, value in data.items() if value is not None}


# Schema for public user data (less sensitive information)
class PublicUserSchema(BaseSchema):
    """Marshmallow schema for public user data.
    
    This schema includes only the user information that is safe to share publicly.
    """
    username = fields.Str()
    full_name = fields.Str(allow_none=True)
    role = fields.Str()
    # No sensitive fields like email or active status