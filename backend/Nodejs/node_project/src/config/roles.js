/**
 * Role-Based Access Control Configuration
 * 
 * This file defines the roles and permissions for the application.
 * Each role has specific permissions defining what actions they can perform.
 */

// Define all possible permissions in the system
const PERMISSIONS = {
  // User permissions
  READ_USER: 'read:user',
  UPDATE_USER: 'update:user',
  DELETE_USER: 'delete:user',
  
  // Product permissions
  READ_PRODUCT: 'read:product',
  CREATE_PRODUCT: 'create:product',
  UPDATE_PRODUCT: 'update:product',
  DELETE_PRODUCT: 'delete:product'
};

// Define roles with their respective permissions
const ROLES = {
  USER: 'user',
  ADMIN: 'admin'
};

// Define what permissions each role has
const ROLE_PERMISSIONS = {
  [ROLES.USER]: [
    PERMISSIONS.READ_USER,
    PERMISSIONS.UPDATE_USER,
    PERMISSIONS.READ_PRODUCT
  ],
  [ROLES.ADMIN]: [
    PERMISSIONS.READ_USER,
    PERMISSIONS.UPDATE_USER,
    PERMISSIONS.DELETE_USER,
    PERMISSIONS.READ_PRODUCT,
    PERMISSIONS.CREATE_PRODUCT,
    PERMISSIONS.UPDATE_PRODUCT,
    PERMISSIONS.DELETE_PRODUCT
  ]
};

// Default role for new users
const DEFAULT_ROLE = ROLES.USER;

module.exports = {
  PERMISSIONS,
  ROLES,
  ROLE_PERMISSIONS,
  DEFAULT_ROLE
};