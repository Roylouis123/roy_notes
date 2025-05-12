# app/models/product.py

"""Product model for the application.

This module defines the Product model which represents a product in the system
and provides methods for product-related operations.
"""

from marshmallow import Schema, fields, validate, pre_load, post_dump, ValidationError
from app.models.base_model import BaseModel, BaseSchema


class Product(BaseModel):
    """Product model for product management.
    
    Represents a product in the application and provides methods for product-related
    operations.
    """
    collection_name = 'products'
    
    CATEGORIES = [
        'electronics', 'clothing', 'home', 'books', 'sports', 
        'food', 'beauty', 'toys', 'health', 'automotive', 'other'
    ]
    
    @classmethod
    def find_by_category(cls, category, skip=0, limit=20):
        """Find products by category.
        
        Args:
            category (str): The category to filter by.
            skip (int, optional): Number of documents to skip. Defaults to 0.
            limit (int, optional): Maximum number of documents to return. Defaults to 20.
        
        Returns:
            list: A list of products in the specified category.
        """
        return cls.find(
            filter_dict={'category': category}, 
            sort=[('created_at', -1)],
            skip=skip,
            limit=limit
        )
    
    @classmethod
    def search_products(cls, query, category=None, skip=0, limit=20):
        """Search for products by name, description, or category.
        
        Args:
            query (str): The search query.
            category (str, optional): Category to filter by. Defaults to None.
            skip (int, optional): Number of documents to skip. Defaults to 0.
            limit (int, optional): Maximum number of documents to return. Defaults to 20.
        
        Returns:
            list: A list of matching products.
        """
        # Create a text search filter
        search_filter = {
            '$or': [
                {'name': {'$regex': query, '$options': 'i'}},
                {'description': {'$regex': query, '$options': 'i'}},
                {'tags': {'$regex': query, '$options': 'i'}}
            ]
        }
        
        # Add category filter if provided
        if category:
            search_filter['category'] = category
        
        return cls.find(
            filter_dict=search_filter,
            sort=[('created_at', -1)],
            skip=skip,
            limit=limit
        )
    
    @classmethod
    def get_products_by_ids(cls, product_ids):
        """Get multiple products by their IDs.
        
        Args:
            product_ids (list): List of product IDs.
        
        Returns:
            list: A list of products matching the given IDs.
        """
        from bson import ObjectId
        
        # Convert string IDs to ObjectId
        object_ids = []
        for id_str in product_ids:
            try:
                object_ids.append(ObjectId(id_str))
            except:
                pass  # Skip invalid IDs
        
        return cls.find(filter_dict={'_id': {'$in': object_ids}})


class ProductSchema(BaseSchema):
    """Marshmallow schema for Product model.
    
    This schema handles serialization and deserialization of Product objects,
    including validation of product data.
    """
    name = fields.Str(required=True, validate=validate.Length(min=1, max=100))
    description = fields.Str(required=True, validate=validate.Length(min=1))
    price = fields.Float(required=True, validate=validate.Range(min=0.01))
    category = fields.Str(required=True, validate=validate.OneOf(Product.CATEGORIES))
    sku = fields.Str(validate=validate.Length(max=50))
    image_url = fields.Str(allow_none=True)
    inventory = fields.Int(validate=validate.Range(min=0), default=0)
    tags = fields.List(fields.Str(), default=[])
    active = fields.Bool(default=True)
    
    @pre_load
    def process_input(self, data, **kwargs):
        """Pre-process input data before validation.
        
        This method normalizes fields and adds default values if needed.
        
        Args:
            data (dict): The data to be processed.
            **kwargs: Additional keyword arguments.
        
        Returns:
            dict: The processed data.
        """
        # Convert tags to list if it's a comma-separated string
        if 'tags' in data and isinstance(data['tags'], str):
            data['tags'] = [tag.strip() for tag in data['tags'].split(',') if tag.strip()]
        
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
