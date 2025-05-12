# app/utils/response.py

"""Response utility functions.

This module provides helper functions for creating consistent JSON responses
across the application.
"""

from flask import jsonify


def success_response(data=None, message="Success", status_code=200):
    """Create a standardized success response.
    
    Args:
        data (Any, optional): The data to include in the response. Defaults to None.
        message (str, optional): A success message. Defaults to "Success".
        status_code (int, optional): HTTP status code. Defaults to 200.
    
    Returns:
        tuple: A tuple containing the response JSON and status code.
    """
    response = {
        'status': 'success',
        'message': message
    }
    
    if data is not None:
        response['data'] = data
    
    return jsonify(response), status_code


def error_response(message="An error occurred", details=None, code=None, status_code=400):
    """Create a standardized error response.
    
    Args:
        message (str, optional): Error message. Defaults to "An error occurred".
        details (Any, optional): Additional error details. Defaults to None.
        code (str, optional): Error code for client identification. Defaults to None.
        status_code (int, optional): HTTP status code. Defaults to 400.
    
    Returns:
        tuple: A tuple containing the response JSON and status code.
    """
    response = {
        'status': 'error',
        'message': message
    }
    
    if details is not None:
        response['details'] = details
    
    if code is not None:
        response['code'] = code
    
    return jsonify(response), status_code


def pagination_response(items, page, per_page, total):
    """Create a response for paginated results.
    
    Args:
        items (list): The paginated items.
        page (int): Current page number.
        per_page (int): Number of items per page.
        total (int): Total number of items.
    
    Returns:
        tuple: A tuple containing the response JSON and status code.
    """
    # Calculate pagination metadata
    total_pages = (total // per_page) + (1 if total % per_page > 0 else 0)
    has_next = page < total_pages
    has_prev = page > 1
    
    # Build response
    response = {
        'status': 'success',
        'data': items,
        'pagination': {
            'page': page,
            'per_page': per_page,
            'total_items': total,
            'total_pages': total_pages,
            'has_next': has_next,
            'has_prev': has_prev
        }
    }
    
    return jsonify(response), 200
