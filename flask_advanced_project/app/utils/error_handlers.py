# app/utils/error_handlers.py

"""Error handlers for Flask application.

This module provides error handler functions for various HTTP error codes
and custom exceptions, ensuring that errors are returned in a consistent format.
"""

from flask import jsonify


def handle_bad_request(e):
    """Handle 400 Bad Request errors.
    
    Args:
        e (Exception): The exception that was raised.
    
    Returns:
        tuple: A tuple containing the response JSON and status code.
    """
    return jsonify({
        'status': 'error',
        'message': 'Bad request',
        'details': str(e),
        'code': 'bad_request'
    }), 400


def handle_unauthorized(e):
    """Handle 401 Unauthorized errors.
    
    Args:
        e (Exception): The exception that was raised.
    
    Returns:
        tuple: A tuple containing the response JSON and status code.
    """
    return jsonify({
        'status': 'error',
        'message': 'Unauthorized access',
        'details': str(e),
        'code': 'unauthorized'
    }), 401


def handle_forbidden(e):
    """Handle 403 Forbidden errors.
    
    Args:
        e (Exception): The exception that was raised.
    
    Returns:
        tuple: A tuple containing the response JSON and status code.
    """
    return jsonify({
        'status': 'error',
        'message': 'Access forbidden',
        'details': str(e),
        'code': 'forbidden'
    }), 403


def handle_not_found(e):
    """Handle 404 Not Found errors.
    
    Args:
        e (Exception): The exception that was raised.
    
    Returns:
        tuple: A tuple containing the response JSON and status code.
    """
    return jsonify({
        'status': 'error',
        'message': 'Resource not found',
        'details': str(e),
        'code': 'not_found'
    }), 404


def handle_method_not_allowed(e):
    """Handle 405 Method Not Allowed errors.
    
    Args:
        e (Exception): The exception that was raised.
    
    Returns:
        tuple: A tuple containing the response JSON and status code.
    """
    return jsonify({
        'status': 'error',
        'message': 'Method not allowed',
        'details': str(e),
        'code': 'method_not_allowed'
    }), 405


def handle_validation_error(e):
    """Handle 422 Validation Error (from Marshmallow or other validation libraries).
    
    Args:
        e (Exception): The exception that was raised.
    
    Returns:
        tuple: A tuple containing the response JSON and status code.
    """
    # Marshmallow validation errors come as a dictionary with field names as keys
    if hasattr(e, 'messages') and isinstance(e.messages, dict):
        details = e.messages
    elif hasattr(e, 'errors') and isinstance(e.errors, dict):
        details = e.errors
    else:
        details = str(e) or 'Validation error'
    
    return jsonify({
        'status': 'error',
        'message': 'Validation error',
        'details': details,
        'code': 'validation_error'
    }), 422


def handle_internal_server_error(e):
    """Handle 500 Internal Server Error errors.
    
    Args:
        e (Exception): The exception that was raised.
    
    Returns:
        tuple: A tuple containing the response JSON and status code.
    """
    # In production, we wouldn't want to expose internal error details
    from flask import current_app
    
    # Log the error for debugging
    current_app.logger.error(f"Internal Server Error: {str(e)}")
    
    if current_app.config.get('DEBUG', False):
        # In debug mode, provide detailed error information
        error_details = str(e)
    else:
        # In production, provide a generic error message
        error_details = "An internal server error occurred"
    
    return jsonify({
        'status': 'error',
        'message': 'Internal server error',
        'details': error_details,
        'code': 'internal_server_error'
    }), 500
