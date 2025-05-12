# app/models/base_model.py

"""Base model for database models.

This module provides a base class for all models to inherit from, providing
common functionality for MongoDB operations.
"""

from bson import ObjectId
from datetime import datetime
from marshmallow import Schema, fields, ValidationError, validates
from flask import current_app
from app import mongo
from pymongo.collection import ReturnDocument


class BaseModel:
    """Base model class with common MongoDB operations.
    
    This class provides common functionality for MongoDB models including
    CRUD operations, serialization, and validation.
    """
    
    collection_name = None  # Child classes should override this
    
    @classmethod
    def get_collection(cls):
        """Get the MongoDB collection for this model.
        
        Returns:
            Collection: The MongoDB collection associated with this model.
        
        Raises:
            ValueError: If collection_name is not defined in the child class.
        """
        if not cls.collection_name:
            raise ValueError(f"{cls.__name__} must define a collection_name")
        return mongo.db[cls.collection_name]
    
    @classmethod
    def find_one(cls, filter_dict):
        """Find a single document matching the filter.
        
        Args:
            filter_dict (dict): MongoDB filter criteria.
        
        Returns:
            dict or None: The matching document, or None if not found.
        """
        return cls.get_collection().find_one(filter_dict)
    
    @classmethod
    def find_by_id(cls, id):
        """Find a document by its ID.
        
        Args:
            id (str): The document ID.
        
        Returns:
            dict or None: The document with the given ID, or None if not found.
        """
        if not isinstance(id, ObjectId):
            try:
                id = ObjectId(id)
            except:
                return None
        return cls.find_one({'_id': id})
    
    @classmethod
    def find(cls, filter_dict=None, sort=None, skip=0, limit=0):
        """Find documents matching the filter with pagination.
        
        Args:
            filter_dict (dict, optional): MongoDB filter criteria. Defaults to None.
            sort (list or tuple, optional): Sort criteria. Defaults to None.
            skip (int, optional): Number of documents to skip. Defaults to 0.
            limit (int, optional): Maximum number of documents to return. Defaults to 0.
        
        Returns:
            list: A list of matching documents.
        """
        filter_dict = filter_dict or {}
        cursor = cls.get_collection().find(filter_dict)
        
        if sort:
            cursor = cursor.sort(sort)
        
        if skip:
            cursor = cursor.skip(skip)
        
        if limit:
            cursor = cursor.limit(limit)
        
        return list(cursor)
    
    @classmethod
    def count(cls, filter_dict=None):
        """Count documents matching the filter.
        
        Args:
            filter_dict (dict, optional): MongoDB filter criteria. Defaults to None.
        
        Returns:
            int: The number of matching documents.
        """
        filter_dict = filter_dict or {}
        return cls.get_collection().count_documents(filter_dict)
    
    @classmethod
    def create(cls, data):
        """Create a new document in the collection.
        
        Args:
            data (dict): The document data to insert.
        
        Returns:
            dict: The inserted document with the generated ID.
        """
        # Set created_at and updated_at timestamps
        data['created_at'] = datetime.utcnow()
        data['updated_at'] = data['created_at']
        
        result = cls.get_collection().insert_one(data)
        data['_id'] = result.inserted_id
        
        return data
    
    @classmethod
    def update(cls, id, data):
        """Update a document by ID.
        
        Args:
            id (str): The document ID.
            data (dict): The update data.
        
        Returns:
            dict or None: The updated document, or None if not found.
        """
        if not isinstance(id, ObjectId):
            try:
                id = ObjectId(id)
            except:
                return None
        
        # Set updated_at timestamp
        data['updated_at'] = datetime.utcnow()
        
        # Use $set to avoid overwriting fields not included in data
        update_data = {'$set': data}
        
        # Return the updated document
        return cls.get_collection().find_one_and_update(
            {'_id': id},
            update_data,
            return_document=ReturnDocument.AFTER
        )
    
    @classmethod
    def delete(cls, id):
        """Delete a document by ID.
        
        Args:
            id (str): The document ID.
        
        Returns:
            bool: True if the document was deleted, False otherwise.
        """
        if not isinstance(id, ObjectId):
            try:
                id = ObjectId(id)
            except:
                return False
        
        result = cls.get_collection().delete_one({'_id': id})
        return result.deleted_count > 0
    
    @classmethod
    def delete_many(cls, filter_dict):
        """Delete multiple documents matching the filter.
        
        Args:
            filter_dict (dict): MongoDB filter criteria.
        
        Returns:
            int: The number of documents deleted.
        """
        result = cls.get_collection().delete_many(filter_dict)
        return result.deleted_count


# Base schema for MongoDB models
class BaseSchema(Schema):
    """Base Marshmallow schema for MongoDB documents.
    
    This class provides common fields and validation for MongoDB documents.
    """
    id = fields.Str(attribute='_id')
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    
    @validates('id')
    def validate_id(self, id):
        """Validate that the ID is a valid ObjectId.
        
        Args:
            id (str): The document ID to validate.
            
        Raises:
            ValidationError: If the ID is not a valid ObjectId.
        """
        try:
            ObjectId(id)
        except:
            raise ValidationError("Invalid ID format")
