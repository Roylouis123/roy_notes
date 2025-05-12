# app/auth/jwt_callbacks.py

"""JWT callbacks for authentication.

This module defines callback functions for JWT authentication events
like token creation, expiration, and validation.
"""

import json
from flask import jsonify
from datetime import datetime, timezone


def register_jwt_callbacks(jwt):
    """Register JWT callback functions.
    
    Args:
        jwt (JWTManager): The JWT manager instance.
    """
    
    @jwt.user_identity_loader
    def user_identity_lookup(user):
        """Convert a user object to a JSON serializable format for identity.
        
        Args:
            user (dict): The user object or dictionary.
            
        Returns:
            dict: A dictionary containing the user ID and role.
        """
        # If user is already a dict, extract needed fields
        if isinstance(user, dict):
            user_id = str(user.get('_id', user.get('id')))
            role = user.get('role', 'user')
        else:
            # Handle other user object types if needed
            user_id = str(user)
            role = 'user'
        
        return {'id': user_id, 'role': role}
    
    @jwt.user_lookup_loader
    def user_lookup_callback(_jwt_header, jwt_data):
        """Load a user from the database when a protected route is accessed.
        
        Args:
            _jwt_header (dict): JWT header information (not used).
            jwt_data (dict): JWT payload data.
            
        Returns:
            dict: The user object from the database, or None if not found.
        """
        from app.models.user import User
        
        identity = jwt_data["sub"]
        
        # If identity is a dict with an 'id' field (from our identity_lookup)
        if isinstance(identity, dict) and 'id' in identity:
            user_id = identity['id']
        else:
            user_id = identity
        
        # Find user in the database
        user = User.find_by_id(user_id)
        
        # Update last access time
        if user:
            # Only update last_login during actual user initiated logins, not token checks
            pass
            
        return user
    
    @jwt.expired_token_loader
    def expired_token_callback(_jwt_header, _jwt_data):
        """Handle expired tokens.
        
        Args:
            _jwt_header (dict): JWT header information (not used).
            _jwt_data (dict): JWT payload data (not used).
            
        Returns:
            tuple: A response with an error message and 401 status code.
        """
        return jsonify({
            'status': 'error',
            'message': 'Token has expired',
            'code': 'token_expired'
        }), 401
    
    @jwt.invalid_token_loader
    def invalid_token_callback(error_string):
        """Handle invalid tokens.
        
        Args:
            error_string (str): Description of the error.
            
        Returns:
            tuple: A response with an error message and 401 status code.
        """
        return jsonify({
            'status': 'error',
            'message': 'Signature verification failed',
            'details': error_string,
            'code': 'invalid_token'
        }), 401
    
    @jwt.unauthorized_loader
    def missing_token_callback(error_string):
        """Handle missing tokens.
        
        Args:
            error_string (str): Description of the error.
            
        Returns:
            tuple: A response with an error message and 401 status code.
        """
        return jsonify({
            'status': 'error',
            'message': 'Authorization token is missing',
            'details': error_string,
            'code': 'missing_token'
        }), 401
    
    @jwt.token_in_blocklist_loader
    def check_if_token_is_revoked(_jwt_header, jwt_payload):
        """Check if a token has been revoked.
        
        In a production app, this would check a token blocklist in Redis or another fast store.
        
        Args:
            _jwt_header (dict): JWT header information (not used).
            jwt_payload (dict): JWT payload data.
            
        Returns:
            bool: True if the token is revoked, False otherwise.
        """
        # For a simple implementation, we can check if the token was issued before a certain time
        # In a real app, you'd check a revocation list in Redis or a database
        jti = jwt_payload['jti']
        
        # Simplified example: Check if token is in an in-memory blocklist
        # In a real app, you would check a database or Redis cache
        from app.auth.token_blocklist import is_token_blocked
        return is_token_blocked(jti)
