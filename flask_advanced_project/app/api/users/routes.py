# app/api/users/routes.py

"""User API routes.

This module defines the API routes for user management, including
retrieving user information and user administration.
"""

from flask import Blueprint, request, current_app
from flask_jwt_extended import jwt_required, current_user, get_jwt
from marshmallow import ValidationError
from bson import ObjectId

from app.models.user import User, UserSchema, PublicUserSchema
from app.utils.response import success_response, error_response, pagination_response

# Create blueprint
users_bp = Blueprint('users', __name__)

# Initialize schemas
user_schema = UserSchema()
public_user_schema = PublicUserSchema()

# Define a decorator for admin-only routes
def admin_required(fn):
    """Decorator that checks if the current user has admin role.
    
    Args:
        fn (function): The function to wrap.
    
    Returns:
        function: The wrapped function that includes an admin check.
    """
    @jwt_required()
    def wrapper(*args, **kwargs):
        # Get current user's role from the JWT claims
        claims = get_jwt()
        identity = claims.get('sub', {})
        
        if isinstance(identity, dict) and identity.get('role') == 'admin':
            return fn(*args, **kwargs)
        else:
            return error_response(
                "Admin privileges required", 
                code="admin_required", 
                status_code=403
            )
    
    # Preserve the wrapped function's metadata
    wrapper.__name__ = fn.__name__
    wrapper.__doc__ = fn.__doc__
    
    return wrapper


@users_bp.route('', methods=['GET'])
@admin_required
def get_users():
    """Get all users (admin only).
    
    Retrieves a paginated list of all users.
    
    Returns:
        tuple: A JSON response with the list of users and pagination metadata.
    """
    try:
        # Get pagination parameters from query string
        page = int(request.args.get('page', 1))
        per_page = min(int(request.args.get('per_page', 20)), 100)  # Max 100 per page
        
        # Get filter parameter
        active_only = request.args.get('active', '').lower() == 'true'
        
        # Build filter
        filter_dict = {}
        if active_only:
            filter_dict['active'] = True
        
        # Get users with pagination
        skip = (page - 1) * per_page
        users = User.find(
            filter_dict=filter_dict, 
            sort=[('created_at', -1)],
            skip=skip,
            limit=per_page
        )
        
        # Count total users for pagination metadata
        total_users = User.count(filter_dict)
        
        # Serialize the users
        serialized_users = [user_schema.dump(user) for user in users]
        
        return pagination_response(
            items=serialized_users,
            page=page,
            per_page=per_page,
            total=total_users
        )
    
    except Exception as e:
        current_app.logger.error(f"Error getting users: {str(e)}")
        return error_response(
            "An error occurred while retrieving users", 
            status_code=500
        )


@users_bp.route('/<user_id>', methods=['GET'])
@jwt_required()
def get_user(user_id):
    """Get a specific user's information.
    
    Retrieves information about a specific user. Regular users can only access
    their own information, while admins can access any user's information.
    
    Args:
        user_id (str): The ID of the user to retrieve.
    
    Returns:
        tuple: A JSON response with the user's information.
    """
    try:
        # Check if the requested user is the current user or if current user is admin
        claims = get_jwt()
        identity = claims.get('sub', {})
        is_admin = isinstance(identity, dict) and identity.get('role') == 'admin'
        is_self = str(current_user.get('_id')) == user_id
        
        if not is_admin and not is_self:
            return error_response(
                "You can only access your own profile", 
                code="permission_denied", 
                status_code=403
            )
        
        # Get the user
        user = User.find_by_id(user_id)
        if not user:
            return error_response(
                "User not found", 
                code="user_not_found", 
                status_code=404
            )
        
        # Use appropriate schema based on access level
        if is_admin or is_self:
            user_data = user_schema.dump(user)
        else:
            user_data = public_user_schema.dump(user)
        
        return success_response({'user': user_data})
    
    except Exception as e:
        current_app.logger.error(f"Error getting user {user_id}: {str(e)}")
        return error_response(
            "An error occurred while retrieving user information", 
            status_code=500
        )


@users_bp.route('/<user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):
    """Update a user's information.
    
    Updates a user's profile information. Regular users can only update
    their own information, while admins can update any user's information.
    
    Args:
        user_id (str): The ID of the user to update.
    
    Returns:
        tuple: A JSON response with the updated user information.
    """
    try:
        # Check if the requested user is the current user or if current user is admin
        claims = get_jwt()
        identity = claims.get('sub', {})
        is_admin = isinstance(identity, dict) and identity.get('role') == 'admin'
        is_self = str(current_user.get('_id')) == user_id
        
        if not is_admin and not is_self:
            return error_response(
                "You can only update your own profile", 
                code="permission_denied", 
                status_code=403
            )
        
        # Get the user
        user = User.find_by_id(user_id)
        if not user:
            return error_response(
                "User not found", 
                code="user_not_found", 
                status_code=404
            )
        
        # Get update data
        json_data = request.get_json()
        if not json_data:
            return error_response("No input data provided", status_code=400)
        
        # Regular users cannot update their role or active status
        if not is_admin:
            if 'role' in json_data:
                return error_response(
                    "You cannot change your role", 
                    code="permission_denied", 
                    status_code=403
                )
            if 'active' in json_data:
                return error_response(
                    "You cannot change your active status", 
                    code="permission_denied", 
                    status_code=403
                )
        
        # Do not allow changing username if it already exists
        if 'username' in json_data and json_data['username'].lower() != user['username']:
            existing_user = User.find_by_username(json_data['username'])
            if existing_user:
                return error_response(
                    "Username already taken", 
                    code="username_exists", 
                    status_code=409
                )
        
        # Do not allow changing email if it already exists
        if 'email' in json_data and json_data['email'].lower() != user['email']:
            existing_user = User.find_by_email(json_data['email'])
            if existing_user:
                return error_response(
                    "Email already registered", 
                    code="email_exists", 
                    status_code=409
                )
        
        # Remove sensitive fields
        if 'password' in json_data:
            del json_data['password']  # Password should be changed via /auth/password
        
        # Normalize email and username
        if 'email' in json_data and json_data['email']:
            json_data['email'] = json_data['email'].lower().strip()
        if 'username' in json_data and json_data['username']:
            json_data['username'] = json_data['username'].lower().strip()
        
        # Update the user
        updated_user = User.update(user['_id'], json_data)
        
        # Return the updated user info
        user_data = user_schema.dump(updated_user)
        return success_response({'user': user_data}, "User updated successfully")
    
    except ValidationError as err:
        return error_response(
            "Validation error", 
            details=err.messages, 
            code="validation_error", 
            status_code=422
        )
    except Exception as e:
        current_app.logger.error(f"Error updating user {user_id}: {str(e)}")
        return error_response(
            "An error occurred while updating user information", 
            status_code=500
        )


@users_bp.route('/<user_id>', methods=['DELETE'])
@admin_required
def delete_user(user_id):
    """Delete a user (admin only).
    
    Permanently deletes a user from the system.
    
    Args:
        user_id (str): The ID of the user to delete.
    
    Returns:
        tuple: A JSON response confirming the deletion.
    """
    try:
        # Check if trying to delete self
        if str(current_user.get('_id')) == user_id:
            return error_response(
                "You cannot delete your own account", 
                code="self_deletion_prevented", 
                status_code=400
            )
        
        # Get the user to check if it exists
        user = User.find_by_id(user_id)
        if not user:
            return error_response(
                "User not found", 
                code="user_not_found", 
                status_code=404
            )
        
        # Delete the user
        success = User.delete(user['_id'])
        
        if success:
            return success_response(message="User deleted successfully")
        else:
            return error_response(
                "Failed to delete user", 
                code="deletion_failed", 
                status_code=500
            )
    
    except Exception as e:
        current_app.logger.error(f"Error deleting user {user_id}: {str(e)}")
        return error_response(
            "An error occurred while deleting user", 
            status_code=500
        )


@users_bp.route('/<user_id>/activate', methods=['PUT'])
@admin_required
def activate_user(user_id):
    """Activate a user account (admin only).
    
    Changes a user's status to active, allowing them to log in.
    
    Args:
        user_id (str): The ID of the user to activate.
    
    Returns:
        tuple: A JSON response confirming the activation.
    """
    try:
        # Get the user
        user = User.find_by_id(user_id)
        if not user:
            return error_response(
                "User not found", 
                code="user_not_found", 
                status_code=404
            )
        
        # Check if already active
        if user.get('active', True):
            return success_response(message="User is already active")
        
        # Update user status
        updated_user = User.update(user['_id'], {'active': True})
        
        # Return success
        return success_response(message="User activated successfully")
    
    except Exception as e:
        current_app.logger.error(f"Error activating user {user_id}: {str(e)}")
        return error_response(
            "An error occurred while activating user", 
            status_code=500
        )


@users_bp.route('/<user_id>/deactivate', methods=['PUT'])
@admin_required
def deactivate_user(user_id):
    """Deactivate a user account (admin only).
    
    Changes a user's status to inactive, preventing them from logging in.
    
    Args:
        user_id (str): The ID of the user to deactivate.
    
    Returns:
        tuple: A JSON response confirming the deactivation.
    """
    try:
        # Check if trying to deactivate self
        if str(current_user.get('_id')) == user_id:
            return error_response(
                "You cannot deactivate your own account", 
                code="self_deactivation_prevented", 
                status_code=400
            )
        
        # Get the user
        user = User.find_by_id(user_id)
        if not user:
            return error_response(
                "User not found", 
                code="user_not_found", 
                status_code=404
            )
        
        # Check if already inactive
        if not user.get('active', True):
            return success_response(message="User is already inactive")
        
        # Update user status
        updated_user = User.update(user['_id'], {'active': False})
        
        # Return success
        return success_response(message="User deactivated successfully")
    
    except Exception as e:
        current_app.logger.error(f"Error deactivating user {user_id}: {str(e)}")
        return error_response(
            "An error occurred while deactivating user", 
            status_code=500
        )
