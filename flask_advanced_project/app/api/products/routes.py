# app/api/products/routes.py

"""Product API routes.

This module defines the API routes for product management, including
creating, retrieving, updating, and deleting products.
"""

from flask import Blueprint, request, current_app
from flask_jwt_extended import jwt_required, current_user, get_jwt
from marshmallow import ValidationError
from bson import ObjectId

from app.models.product import Product, ProductSchema
from app.utils.response import success_response, error_response, pagination_response

# Create blueprint
products_bp = Blueprint('products', __name__)

# Initialize schemas
product_schema = ProductSchema()

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


@products_bp.route('', methods=['GET'])
def get_products():
    """Get a list of products.
    
    Retrieves a paginated list of products, with optional filtering by category.
    
    Returns:
        tuple: A JSON response with the list of products and pagination metadata.
    """
    try:
        # Get pagination parameters from query string
        page = int(request.args.get('page', 1))
        per_page = min(int(request.args.get('per_page', 20)), 100)  # Max 100 per page
        
        # Get filter parameters
        category = request.args.get('category')
        active_only = request.args.get('active', '').lower() == 'true'
        min_price = float(request.args.get('min_price', 0))
        max_price = float(request.args.get('max_price', 1000000)) if request.args.get('max_price') else None
        
        # Build filter
        filter_dict = {}
        if category:
            filter_dict['category'] = category
        if active_only:
            filter_dict['active'] = True
        if min_price > 0:
            filter_dict['price'] = {'$gte': min_price}
        if max_price:
            if 'price' in filter_dict:
                filter_dict['price']['$lte'] = max_price
            else:
                filter_dict['price'] = {'$lte': max_price}
        
        # Get products with pagination
        skip = (page - 1) * per_page
        products = Product.find(
            filter_dict=filter_dict, 
            sort=[('created_at', -1)],
            skip=skip,
            limit=per_page
        )
        
        # Count total products for pagination metadata
        total_products = Product.count(filter_dict)
        
        # Serialize the products
        serialized_products = [product_schema.dump(product) for product in products]
        
        return pagination_response(
            items=serialized_products,
            page=page,
            per_page=per_page,
            total=total_products
        )
    
    except Exception as e:
        current_app.logger.error(f"Error getting products: {str(e)}")
        return error_response(
            "An error occurred while retrieving products", 
            status_code=500
        )


@products_bp.route('/<product_id>', methods=['GET'])
def get_product(product_id):
    """Get a specific product.
    
    Retrieves detailed information about a specific product.
    
    Args:
        product_id (str): The ID of the product to retrieve.
    
    Returns:
        tuple: A JSON response with the product's information.
    """
    try:
        # Get the product
        product = Product.find_by_id(product_id)
        if not product:
            return error_response(
                "Product not found", 
                code="product_not_found", 
                status_code=404
            )
        
        # Serialize the product
        product_data = product_schema.dump(product)
        
        return success_response({'product': product_data})
    
    except Exception as e:
        current_app.logger.error(f"Error getting product {product_id}: {str(e)}")
        return error_response(
            "An error occurred while retrieving product information", 
            status_code=500
        )


@products_bp.route('', methods=['POST'])
@admin_required
def create_product():
    """Create a new product (admin only).
    
    Creates a new product with the provided information.
    
    Returns:
        tuple: A JSON response with the created product's information.
    """
    try:
        # Validate and deserialize input
        json_data = request.get_json()
        if not json_data:
            return error_response("No input data provided", status_code=400)
        
        # Validate input data against schema
        product_data = product_schema.load(json_data)
        
        # Create the product
        new_product = Product.create(product_data)
        
        # Serialize the created product
        product_data = product_schema.dump(new_product)
        
        return success_response(
            {'product': product_data}, 
            "Product created successfully", 
            status_code=201
        )
    
    except ValidationError as err:
        return error_response(
            "Validation error", 
            details=err.messages, 
            code="validation_error", 
            status_code=422
        )
    except Exception as e:
        current_app.logger.error(f"Error creating product: {str(e)}")
        return error_response(
            "An error occurred while creating product", 
            status_code=500
        )


@products_bp.route('/<product_id>', methods=['PUT'])
@admin_required
def update_product(product_id):
    """Update a product (admin only).
    
    Updates a product's information with the provided data.
    
    Args:
        product_id (str): The ID of the product to update.
    
    Returns:
        tuple: A JSON response with the updated product's information.
    """
    try:
        # Check if product exists
        product = Product.find_by_id(product_id)
        if not product:
            return error_response(
                "Product not found", 
                code="product_not_found", 
                status_code=404
            )
        
        # Get update data
        json_data = request.get_json()
        if not json_data:
            return error_response("No input data provided", status_code=400)
        
        # Validate and process input data
        update_data = {}
        for key, value in json_data.items():
            if key not in ['id', '_id', 'created_at']:
                update_data[key] = value
        
        # Update the product
        updated_product = Product.update(product['_id'], update_data)
        
        # Serialize the updated product
        product_data = product_schema.dump(updated_product)
        
        return success_response(
            {'product': product_data}, 
            "Product updated successfully"
        )
    
    except ValidationError as err:
        return error_response(
            "Validation error", 
            details=err.messages, 
            code="validation_error", 
            status_code=422
        )
    except Exception as e:
        current_app.logger.error(f"Error updating product {product_id}: {str(e)}")
        return error_response(
            "An error occurred while updating product", 
            status_code=500
        )


@products_bp.route('/<product_id>', methods=['DELETE'])
@admin_required
def delete_product(product_id):
    """Delete a product (admin only).
    
    Permanently deletes a product from the system.
    
    Args:
        product_id (str): The ID of the product to delete.
    
    Returns:
        tuple: A JSON response confirming the deletion.
    """
    try:
        # Check if product exists
        product = Product.find_by_id(product_id)
        if not product:
            return error_response(
                "Product not found", 
                code="product_not_found", 
                status_code=404
            )
        
        # Delete the product
        success = Product.delete(product['_id'])
        
        if success:
            return success_response(message="Product deleted successfully")
        else:
            return error_response(
                "Failed to delete product", 
                code="deletion_failed", 
                status_code=500
            )
    
    except Exception as e:
        current_app.logger.error(f"Error deleting product {product_id}: {str(e)}")
        return error_response(
            "An error occurred while deleting product", 
            status_code=500
        )


@products_bp.route('/search', methods=['GET'])
def search_products():
    """Search for products.
    
    Searches for products based on a query string, with optional filtering.
    
    Returns:
        tuple: A JSON response with the search results and pagination metadata.
    """
    try:
        # Get search parameters
        query = request.args.get('q', '')
        if not query or len(query.strip()) < 2:
            return error_response(
                "Search query must be at least 2 characters", 
                code="invalid_query", 
                status_code=400
            )
        
        # Get pagination parameters
        page = int(request.args.get('page', 1))
        per_page = min(int(request.args.get('per_page', 20)), 100)  # Max 100 per page
        
        # Get filter parameters
        category = request.args.get('category')
        min_price = float(request.args.get('min_price', 0))
        max_price = float(request.args.get('max_price', 1000000)) if request.args.get('max_price') else None
        
        # Calculate pagination offset
        skip = (page - 1) * per_page
        
        # Search for products
        results = Product.search_products(
            query=query,
            category=category,
            skip=skip,
            limit=per_page
        )
        
        # Apply additional filters that aren't handled by search_products
        filtered_results = []
        for product in results:
            price = product.get('price', 0)
            if price >= min_price and (max_price is None or price <= max_price):
                filtered_results.append(product)
        
        # We can't get an exact count without running the search again
        # For simplicity, we'll just use the number of filtered results
        # In a production app, you would want to get an accurate count
        
        # Serialize the products
        serialized_products = [product_schema.dump(product) for product in filtered_results]
        
        return success_response({
            'results': serialized_products,
            'query': query,
            'count': len(serialized_products)
        })
    
    except Exception as e:
        current_app.logger.error(f"Error searching products: {str(e)}")
        return error_response(
            "An error occurred while searching for products", 
            status_code=500
        )


@products_bp.route('/categories', methods=['GET'])
def get_categories():
    """Get all product categories.
    
    Returns a list of all available product categories.
    
    Returns:
        tuple: A JSON response with the list of categories.
    """
    try:
        return success_response({
            'categories': Product.CATEGORIES
        })
    
    except Exception as e:
        current_app.logger.error(f"Error getting categories: {str(e)}")
        return error_response(
            "An error occurred while retrieving categories", 
            status_code=500
        )
