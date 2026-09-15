/**
 * User Controller Tests
 * 
 * This file tests the user controller functions to ensure
 * they properly handle user management operations.
 */

const User = require('../../models/userModel');
const { successResponse, errorResponse } = require('../../utils/apiResponse');
const logger = require('../../utils/logger');
const {
  getUsers,
  getUserById,
  updateProfile,
  deleteUser,
  changeUserRole
} = require('../../controllers/userController');
const { getUsers: getMockUsers } = require('../mocks/db');

// Mock dependencies
jest.mock('../../models/userModel');
jest.mock('../../utils/apiResponse', () => ({
  successResponse: jest.fn().mockReturnValue('success-response'),
  errorResponse: jest.fn().mockReturnValue('error-response')
}));
jest.mock('../../utils/logger', () => ({
  error: jest.fn()
}));

describe('User Controller', () => {
  let req;
  let res;
  let mockUsers;
  
  beforeEach(() => {
    req = {
      params: {},
      query: {},
      body: {},
      user: { id: 'current-user-id', role: 'user' }
    };
    
    res = {
      cookie: jest.fn()
    };
    
    mockUsers = [
      {
        _id: 'user-id-1',
        name: 'Regular User',
        email: 'user@example.com',
        role: 'user'
      },
      {
        _id: 'user-id-2',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin'
      }
    ];
    
    // Reset mocks
    jest.clearAllMocks();
  });

  describe('getUsers', () => {
    it('should get all users with pagination', async () => {
      // Setup
      req.query = { page: '1', limit: '10' };
      
      User.countDocuments.mockResolvedValue(25);
      User.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(mockUsers)
      });
      
      // Execute
      await getUsers(req, res);
      
      // Assert
      expect(User.countDocuments).toHaveBeenCalled();
      expect(User.find).toHaveBeenCalled();
      expect(successResponse).toHaveBeenCalledWith(
        res,
        'Users retrieved successfully',
        {
          users: mockUsers,
          pagination: {
            page: 1,
            limit: 10,
            total: 25,
            pages: 3
          }
        }
      );
    });

    it('should handle default pagination values', async () => {
      // Setup - no query params
      User.countDocuments.mockResolvedValue(25);
      User.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(mockUsers)
      });
      
      // Execute
      await getUsers(req, res);
      
      // Assert
      expect(successResponse).toHaveBeenCalledWith(
        res,
        'Users retrieved successfully',
        {
          users: mockUsers,
          pagination: {
            page: 1,
            limit: 10,
            total: 25,
            pages: 3
          }
        }
      );
    });

    it('should handle errors', async () => {
      // Setup
      User.countDocuments.mockRejectedValue(new Error('Database error'));
      
      // Execute
      await getUsers(req, res);
      
      // Assert
      expect(logger.error).toHaveBeenCalled();
      expect(errorResponse).toHaveBeenCalledWith(res, 'Failed to retrieve users', 500);
    });
  });

  describe('getUserById', () => {
    it('should get a user by ID for admin', async () => {
      // Setup
      req.params.id = 'user-id-1';
      req.user.role = 'admin';
      
      User.findById.mockResolvedValue(mockUsers[0]);
      
      // Execute
      await getUserById(req, res);
      
      // Assert
      expect(User.findById).toHaveBeenCalledWith('user-id-1');
      expect(successResponse).toHaveBeenCalledWith(
        res,
        'User retrieved successfully',
        mockUsers[0]
      );
    });

    it('should allow user to access their own profile', async () => {
      // Setup
      req.params.id = 'current-user-id';
      req.user.id = 'current-user-id';
      req.user.role = 'user';
      
      User.findById.mockResolvedValue({
        _id: 'current-user-id',
        name: 'Current User',
        email: 'current@example.com',
        role: 'user'
      });
      
      // Execute
      await getUserById(req, res);
      
      // Assert
      expect(User.findById).toHaveBeenCalledWith('current-user-id');
      expect(successResponse).toHaveBeenCalled();
    });

    it('should prevent users from accessing other user profiles', async () => {
      // Setup
      req.params.id = 'other-user-id';
      req.user.id = 'current-user-id';
      req.user.role = 'user';
      
      // Execute
      await getUserById(req, res);
      
      // Assert
      expect(errorResponse).toHaveBeenCalledWith(
        res,
        'Not authorized to access this user data',
        403
      );
    });

    it('should return 404 when user not found', async () => {
      // Setup
      req.params.id = 'nonexistent-id';
      req.user.role = 'admin';
      
      User.findById.mockResolvedValue(null);
      
      // Execute
      await getUserById(req, res);
      
      // Assert
      expect(errorResponse).toHaveBeenCalledWith(res, 'User not found', 404);
    });
  });

  describe('updateProfile', () => {
    it('should update user profile', async () => {
      // Setup
      req.user.id = 'user-id-1';
      req.body = {
        name: 'Updated Name'
      };
      
      const updatedUser = {
        _id: 'user-id-1',
        name: 'Updated Name',
        email: 'user@example.com'
      };
      
      User.findByIdAndUpdate.mockResolvedValue(updatedUser);
      
      // Execute
      await updateProfile(req, res);
      
      // Assert
      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        'user-id-1',
        { name: 'Updated Name' },
        { new: true, runValidators: true }
      );
      expect(successResponse).toHaveBeenCalledWith(
        res,
        'Profile updated successfully',
        updatedUser
      );
    });

    it('should check if email already exists when updating email', async () => {
      // Setup
      req.user = {
        id: 'user-id-1',
        email: 'current@example.com'
      };
      req.body = {
        email: 'new@example.com'
      };
      
      User.findOne.mockResolvedValue(null); // Email not in use
      
      const updatedUser = {
        _id: 'user-id-1',
        name: 'User',
        email: 'new@example.com'
      };
      
      User.findByIdAndUpdate.mockResolvedValue(updatedUser);
      
      // Execute
      await updateProfile(req, res);
      
      // Assert
      expect(User.findOne).toHaveBeenCalledWith({ email: 'new@example.com' });
      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        'user-id-1',
        { email: 'new@example.com' },
        { new: true, runValidators: true }
      );
      expect(successResponse).toHaveBeenCalled();
    });

    it('should prevent using an email that is already taken', async () => {
      // Setup
      req.user = {
        id: 'user-id-1',
        email: 'current@example.com'
      };
      req.body = {
        email: 'existing@example.com'
      };
      
      User.findOne.mockResolvedValue({ _id: 'other-user-id', email: 'existing@example.com' });
      
      // Execute
      await updateProfile(req, res);
      
      // Assert
      expect(User.findOne).toHaveBeenCalledWith({ email: 'existing@example.com' });
      expect(User.findByIdAndUpdate).not.toHaveBeenCalled();
      expect(errorResponse).toHaveBeenCalledWith(res, 'Email already in use', 400);
    });
  });

  describe('deleteUser', () => {
    it('should allow admin to delete any user', async () => {
      // Setup
      req.params.id = 'user-to-delete';
      req.user = {
        id: 'admin-id',
        role: 'admin'
      };
      
      const mockUserToDelete = {
        _id: 'user-to-delete',
        name: 'User to Delete',
        deleteOne: jest.fn().mockResolvedValue(true)
      };
      
      User.findById.mockResolvedValue(mockUserToDelete);
      
      // Execute
      await deleteUser(req, res);
      
      // Assert
      expect(User.findById).toHaveBeenCalledWith('user-to-delete');
      expect(mockUserToDelete.deleteOne).toHaveBeenCalled();
      expect(successResponse).toHaveBeenCalledWith(res, 'User deleted successfully');
    });

    it('should allow users to delete their own account', async () => {
      // Setup
      req.params.id = 'user-id-1';
      req.user = {
        id: 'user-id-1',
        role: 'user'
      };
      
      const mockUser = {
        _id: 'user-id-1',
        name: 'User',
        deleteOne: jest.fn().mockResolvedValue(true)
      };
      
      User.findById.mockResolvedValue(mockUser);
      
      // Execute
      await deleteUser(req, res);
      
      // Assert
      expect(mockUser.deleteOne).toHaveBeenCalled();
      expect(res.cookie).toHaveBeenCalledWith('token', '', expect.any(Object));
      expect(successResponse).toHaveBeenCalledWith(res, 'User deleted successfully');
    });

    it('should prevent users from deleting other user accounts', async () => {
      // Setup
      req.params.id = 'other-user-id';
      req.user = {
        id: 'user-id-1',
        role: 'user'
      };
      
      // Execute
      await deleteUser(req, res);
      
      // Assert
      expect(User.findById).not.toHaveBeenCalled();
      expect(errorResponse).toHaveBeenCalledWith(
        res,
        'Not authorized to delete this user',
        403
      );
    });

    it('should return 404 when user not found', async () => {
      // Setup
      req.params.id = 'nonexistent-id';
      req.user = {
        id: 'admin-id',
        role: 'admin'
      };
      
      User.findById.mockResolvedValue(null);
      
      // Execute
      await deleteUser(req, res);
      
      // Assert
      expect(errorResponse).toHaveBeenCalledWith(res, 'User not found', 404);
    });
  });

  describe('changeUserRole', () => {
    it('should allow admin to change user roles', async () => {
      // Setup
      req.params.id = 'user-id';
      req.body = { role: 'admin' };
      req.user = {
        id: 'admin-id',
        role: 'admin'
      };
      
      const updatedUser = {
        _id: 'user-id',
        name: 'User',
        role: 'admin'
      };
      
      User.findByIdAndUpdate.mockResolvedValue(updatedUser);
      
      // Execute
      await changeUserRole(req, res);
      
      // Assert
      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        'user-id',
        { role: 'admin' },
        { new: true, runValidators: true }
      );
      expect(successResponse).toHaveBeenCalledWith(
        res,
        'User role updated successfully',
        updatedUser
      );
    });

    it('should prevent admins from changing their own role', async () => {
      // Setup
      req.params.id = 'admin-id';
      req.body = { role: 'user' };
      req.user = {
        id: 'admin-id',
        role: 'admin'
      };
      
      // Execute
      await changeUserRole(req, res);
      
      // Assert
      expect(User.findByIdAndUpdate).not.toHaveBeenCalled();
      expect(errorResponse).toHaveBeenCalledWith(res, 'Cannot change your own role', 400);
    });

    it('should return 404 when user not found', async () => {
      // Setup
      req.params.id = 'nonexistent-id';
      req.body = { role: 'admin' };
      req.user = {
        id: 'admin-id',
        role: 'admin'
      };
      
      User.findByIdAndUpdate.mockResolvedValue(null);
      
      // Execute
      await changeUserRole(req, res);
      
      // Assert
      expect(errorResponse).toHaveBeenCalledWith(res, 'User not found', 404);
    });
  });
});