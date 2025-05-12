# Flask Advanced Project

A comprehensive Flask backend application with industry-level features and best practices for user authentication, product management, and more. This application demonstrates professional coding patterns, security measures, database integration, and API design principles.

## Features

- User authentication (register, login, logout, token refresh)
- JWT-based authentication with access and refresh tokens
- User management (CRUD operations)
- Product management (CRUD operations)
- Role-based access control (admin, user roles)
- Secure password hashing with bcrypt
- API rate limiting
- MongoDB database integration
- Environment-based configuration (development, production, testing)
- Security middleware (CORS, security headers)
- Standardized error handling
- Comprehensive API documentation
- Paginated endpoints
- Search functionality
- Docker support

## Project Structure

```
flask_advanced_project/
├── app/                      # Application package
│   ├── __init__.py           # Application factory
│   ├── api/                  # API routes
│   │   ├── products/         # Product-related endpoints
│   │   └── users/            # User-related endpoints
│   ├── auth/                 # Authentication
│   ├── config/               # Configuration
│   ├── middlewares/          # Middleware components
│   ├── models/               # Database models
│   └── utils/                # Utility functions
├── migrations/               # Database migrations
├── logs/                     # Log files
├── tests/                    # Test suite
│   ├── unit/                 # Unit tests
│   └── integration/          # Integration tests
├── .env.example              # Example environment variables
├── run.py                    # Application entry point
├── Dockerfile                # Docker configuration
└── requirements.txt          # Python dependencies
```

## Installation and Setup

### Prerequisites

- Python 3.8+
- MongoDB
- (Optional) Docker for containerization

### Local Development Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd flask_advanced_project
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```

5. Edit the `.env` file with your configuration settings (especially MongoDB connection details and secret keys).

6. Run the application:
   ```bash
   python run.py
   ```

### Docker Setup

1. Build the Docker image:
   ```bash
   docker build -t flask-advanced-app .
   ```

2. Run the container:
   ```bash
   docker run -p 5000:5000 --env-file .env flask-advanced-app
   ```

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate and get tokens
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Log out (revoke token)
- `GET /api/auth/me` - Get current user's profile
- `PUT /api/auth/password` - Change password

### User Endpoints

- `GET /api/users` - Get all users (admin only)
- `GET /api/users/{user_id}` - Get user details
- `PUT /api/users/{user_id}` - Update user
- `DELETE /api/users/{user_id}` - Delete user (admin only)
- `PUT /api/users/{user_id}/activate` - Activate user (admin only)
- `PUT /api/users/{user_id}/deactivate` - Deactivate user (admin only)

### Product Endpoints

- `GET /api/products` - Get products (with optional filters)
- `GET /api/products/{product_id}` - Get product details
- `POST /api/products` - Create a product (admin only)
- `PUT /api/products/{product_id}` - Update a product (admin only)
- `DELETE /api/products/{product_id}` - Delete a product (admin only)
- `GET /api/products/search` - Search for products
- `GET /api/products/categories` - Get product categories

## Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Token refresh mechanism
- Token blocklist for logout
- Role-based access control
- Rate limiting
- Security headers (CSP, XSS protection, etc.)
- CORS configuration
- Environment variable secrets management

## Development and Production Environments

The application supports different configurations for development, testing, and production environments. The environment is determined by the `FLASK_ENV` environment variable:

- `development`: Enables debugging, detailed error messages, and development-specific settings
- `testing`: Uses a test database and disables certain features for testing
- `production`: Optimizes for security and performance with stricter settings

## License

This project is licensed under the MIT License - see the LICENSE file for details.
