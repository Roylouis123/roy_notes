# Production-Ready Node.js API Server

A highly scalable and secure REST API built with Node.js, Express, and MongoDB featuring JWT authentication, role-based access control, and comprehensive security measures.

## Features

- **User Authentication**: JWT-based authentication system
- **Role-Based Access Control**: Admin and User roles with granular permissions
- **RESTful API Design**: Clean and consistent API architecture
- **MongoDB Integration**: Robust and scalable database solution
- **Security**: Multiple layers of security including helmet, rate limiting, and proper error handling
- **Error Handling**: Centralized error handling with meaningful error messages
- **Logging**: Comprehensive logging with Winston
- **Validation**: Input validation using Joi and Express Validator
- **Password Management**: Secure password handling with reset functionality
- **API Documentation**: Clear route documentation in code comments

## Project Structure

```
├── src/
│   ├── config/          # Application configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # Express routes
│   ├── services/        # Business logic
│   ├── utils/           # Utility functions
│   ├── validations/     # Input validation schemas
│   └── server.js        # Entry point
├── logs/                # Application logs
├── .env                 # Environment variables
├── package.json         # Dependencies and scripts
└── README.md            # This file
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   cd node_project
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Start the server:
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate user & get token
- `POST /api/auth/logout` - Logout user & clear cookie
- `GET /api/auth/me` - Get current user profile
- `POST /api/auth/forgot-password` - Send password reset email
- `PUT /api/auth/reset-password/:resetToken` - Reset password with token
- `PUT /api/auth/update-password` - Update logged in user's password

### Users

- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID (Admin or own user)
- `PUT /api/users/profile` - Update user profile
- `DELETE /api/users/:id` - Delete user (Admin or own user)
- `PUT /api/users/:id/role` - Change user role (Admin only)

### Products

- `GET /api/products` - Get all products with filtering and pagination
- `GET /api/products/:id` - Get a single product by ID
- `POST /api/products` - Create a new product (Admin only)
- `PUT /api/products/:id` - Update a product (Admin only)
- `DELETE /api/products/:id` - Delete a product (Admin only)
- `PATCH /api/products/:id/stock` - Update product stock quantity (Admin only)

## Security Features

- JWT Authentication
- Password Hashing
- CORS Configuration
- Helmet Security Headers
- Rate Limiting
- Input Validation
- SQL Injection Protection
- Error Handling & Sanitization

## License

This project is licensed under the MIT License.