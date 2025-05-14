# FastAPI Backend Server

A simple backend API server built using FastAPI framework with CRUD operations for users and products.

## 🚨 Windows Installation Issues

If you're seeing errors related to Rust or "metadata-generation-failed", you have two options:

### Option 1: Install Without Rust (Recommended)

1. Run the Windows setup script that uses pre-built binaries:
   ```
   windows_setup.bat
   ```

2. This will set up a virtual environment and install all dependencies without requiring Rust.

### Option 2: Install With Rust

1. Install Rust by following the instructions in `RUST_INSTALL_GUIDE.md`
2. Run the setup script that uses Rust for compilation:
   ```
   windows_setup_with_rust.bat
   ```

## Features

- Fast API endpoints with automatic validation
- Swagger documentation (OpenAPI)
- CRUD operations for users and products
- Search functionality
- Query parameter filtering

## Project Structure

```
fast_api/
├── main.py                  # Main FastAPI application
├── requirements.txt         # Python dependencies
├── requirements-no-rust.txt # Dependencies without Rust compilation
├── windows_setup.bat        # Windows setup without Rust
├── windows_setup_with_rust.bat # Windows setup with Rust
├── test_api.py              # API test script
└── README.md                # Documentation
```

## Standard Installation

If you're not on Windows or not experiencing issues:

1. Create a virtual environment (recommended):
   ```
   python -m venv venv
   ```

2. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

3. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

4. Run the application:
   ```
   python main.py
   ```
   or
   ```
   uvicorn main:app --reload
   ```

5. Open your browser and go to:
   - API: `http://127.0.0.1:8000/`
   - Interactive API docs: `http://127.0.0.1:8000/docs`
   - Alternative API docs: `http://127.0.0.1:8000/redoc`

## API Endpoints

### Root
- `GET /` - Welcome message and API status

### Users
- `GET /users` - Get all users
- `GET /users/{user_id}` - Get a specific user
- `POST /users` - Create a new user
- `PUT /users/{user_id}` - Update an existing user
- `DELETE /users/{user_id}` - Delete a user

### Products
- `GET /products` - Get all products (can filter by category)
- `GET /products/{product_id}` - Get a specific product
- `POST /products` - Create a new product
- `PUT /products/{product_id}` - Update an existing product
- `DELETE /products/{product_id}` - Delete a product

### Search
- `GET /search` - Search for products and users with optional filters
  - Query params: q, category, min_price, max_price

## Example API Requests

### Create a new user

```bash
curl -X 'POST' \
  'http://127.0.0.1:8000/users' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "username": "new_user",
  "email": "new@example.com",
  "active": true
}'
```

### Get all products in a category

```bash
curl -X 'GET' \
  'http://127.0.0.1:8000/products?category=electronics' \
  -H 'accept: application/json'
```

### Search for products

```bash
curl -X 'GET' \
  'http://127.0.0.1:8000/search?q=phone&min_price=500&max_price=1000' \
  -H 'accept: application/json'
```

## Testing the API

Once the server is running:
- API documentation: http://localhost:8000/docs
- Alternative API docs: http://localhost:8000/redoc

You can use the included test script to verify the API is working:
```
python test_api.py
```

## Troubleshooting

If you encounter any issues, check the following:

1. Python version - Python 3.8 or higher is required
2. Virtual environment is activated
3. All dependencies are installed
4. No other services are using port 8000

For Windows-specific issues, see the installation options at the top of this README.