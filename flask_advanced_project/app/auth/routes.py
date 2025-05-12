# app/auth/routes.py

"""Authentication routes.

This module defines the API routes for user authentication, including
registration, login, token refresh, and logout.
"""

from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import (
    create_access_token, create_refresh_token,
    jwt_required, current_user, get_jwt_identity, get_jwt
)
from marshmallow import ValidationError
from datetime import datetime
from app.models.user import User, UserSchema
from app.utils.response import success_response, error_response
from app.auth.token_blocklist import add_token_to_blocklist

# Create blueprint
auth_bp = Blueprint('auth', __name__)

# Initialize schemas
user_schema = UserSchema()


@auth_bp.route('/register', methods=['POST'])
def register():
    """Register a new user.
    
    Creates a new user account with the provided information and returns
    authentication tokens if successful.
    
    Returns:
        tuple: A JSON response with the result and appropriate status code.
    """
    try:
        # Validate and deserialize input
        json_data = request.get_json()
        if not json_data:
            return error_response("No input data provided", status_code=400)
        
        # Validate input data against schema
        user_data = user_schema.load(json_data)
        
        # Check if email already exists
        if User.find_by_email(user_data['email']):
            return error_response(
                "Email already registered", 
                code="email_exists",
                status_code=409
            )
        
        # Check if username already exists
        if User.find_by_username(user_data['username']):
            return error_response(
                "Username already taken", 
                code="username_exists", 
                status_code=409
            )
        
        # Create new user
        new_user = User.create_user(user_data)
        
        # Generate tokens
        access_token = create_access_token(identity=new_user)
        refresh_token = create_refresh_token(identity=new_user)
        
        # Return tokens
        return success_response({
            'user': user_schema.dump(new_user),
            'access_token': access_token,
            'refresh_token': refresh_token
        }, "User registered successfully", status_code=201)
    
    except ValidationError as err:
        return error_response(
            "Validation error", 
            details=err.messages, 
            code="validation_error", 
            status_code=422
        )
    except Exception as e:
        current_app.logger.error(f"Registration error: {str(e)}")
        return error_response(
            "Could not register user", 
            code="registration_failed", 
            status_code=500
        )


@auth_bp.route('/login', methods=['POST'])
def login():
    """Authenticate a user and issue tokens.
    
    Validates user credentials and issues JWT access and refresh tokens
    if the authentication is successful.
    
    Returns:
        tuple: A JSON response with tokens and user data if successful,
            or an error message if authentication failed.
    """
    try:
        # Get login credentials
        json_data = request.get_json()
        if not json_data:
            return error_response("No input data provided", status_code=400)
        
        # Check if login by email or username
        login_field = json_data.get('email', json_data.get('username'))
        password = json_data.get('password')
        
        if not login_field or not password:
            return error_response(
                "Email/username and password are required", 
                code="invalid_credentials", 
                status_code=400
            )
        
        # Find user by email or username
        user = None
        if '@' in login_field:  # Email login
            user = User.find_by_email(login_field)
        else:  # Username login
            user = User.find_by_username(login_field)
        
        # Check if user exists and password is correct
        if not user or not User.verify_password(user['password'], password):
            return error_response(
                "Invalid credentials", 
                code="invalid_credentials", 
                status_code=401
            )
        
        # Check if user is active
        if not user.get('active', True):
            return error_response(
                "Account is disabled", 
                code="account_disabled", 
                status_code=403
            )
        
        # Update last login timestamp
        User.update_last_login(user['_id'])
        
        # Generate tokens
        access_token = create_access_token(identity=user)
        refresh_token = create_refresh_token(identity=user)
        
        # Remove sensitive data from user info
        user_data = user_schema.dump(user)
        
        return success_response({
            'user': user_data,
            'access_token': access_token,
            'refresh_token': refresh_token
        }, "Login successful")
    
    except Exception as e:
        current_app.logger.error(f"Login error: {str(e)}")
        return error_response(
            "An error occurred during login", 
            code="login_failed", 
            status_code=500
        )


@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh_token():
    """Refresh the access token.
    
    Uses a valid refresh token to issue a new access token.
    
    Returns:
        tuple: A JSON response with a new access token if successful,
            or an error message if the refresh failed.
    """
    try:
        # Get the identity from the refresh token
        identity = get_jwt_identity()
        
        # Issue a new access token
        access_token = create_access_token(identity=identity)
        
        return success_response({
            'access_token': access_token
        }, "Token refreshed successfully")
    
    except Exception as e:
        current_app.logger.error(f"Token refresh error: {str(e)}")
        return error_response(
            "An error occurred while refreshing token", 
            code="refresh_failed", 
            status_code=500
        )


@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    """Log out a user by revoking their tokens.
    
    Adds the current token to a blocklist, effectively logging the user out.
    
    Returns:
        tuple: A JSON response confirming the logout was successful.
    """
    try:
        # Get JWT token data
        token_data = get_jwt()
        jti = token_data['jti']
        exp = token_data['exp']
        
        # Add token to blocklist
        add_token_to_blocklist(jti, exp)
        
        return success_response(message="Successfully logged out")
    
    except Exception as e:
        current_app.logger.error(f"Logout error: {str(e)}")
        return error_response(
            "An error occurred during logout", 
            code="logout_failed", 
            status_code=500
        )


@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_user_info():
    """Get the current user's information.
    
    Returns information about the authenticated user.
    
    Returns:
        tuple: A JSON response with the user's information.
    """
    try:
        # current_user is loaded via the JWT user_lookup_loader callback
        if not current_user:
            return error_response(
                "User not found", 
                code="user_not_found", 
                status_code=404
            )
        
        user_data = user_schema.dump(current_user)
        return success_response({'user': user_data}, "User information retrieved successfully")
    
    except Exception as e:
        current_app.logger.error(f"Error getting user info: {str(e)}")
        return error_response(
            "An error occurred while retrieving user information", 
            code="user_info_failed", 
            status_code=500
        )


@auth_bp.route('/password', methods=['PUT'])
@jwt_required()
def change_password():
    """Change the current user's password.
    
    Verifies the current password and sets a new password if valid.
    
    Returns:
        tuple: A JSON response confirming the password was changed successfully,
            or an error message if the change failed.
    """
    try:
        # Get password data
        json_data = request.get_json()
        if not json_data:
            return error_response("No input data provided", status_code=400)
        
        current_password = json_data.get('current_password')
        new_password = json_data.get('new_password')
        
        if not current_password or not new_password:
            return error_response(
                "Current password and new password are required", 
                code="missing_fields", 
                status_code=400
            )
        
        # Verify current password
        if not User.verify_password(current_user['password'], current_password):
            return error_response(
                "Current password is incorrect", 
                code="invalid_password", 
                status_code=401
            )
        
        # Validate new password length
        if len(new_password) < 8:
            return error_response(
                "New password must be at least 8 characters long", 
                code="password_too_short", 
                status_code=422
            )
        
        # Change password
        User.change_password(current_user['_id'], new_password)
        
        return success_response(message="Password changed successfully")
    
    except Exception as e:
        current_app.logger.error(f"Password change error: {str(e)}")
        return error_response(
            "An error occurred while changing password", 
            code="password_change_failed", 
            status_code=500
        )
