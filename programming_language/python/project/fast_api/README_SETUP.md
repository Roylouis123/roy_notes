# FastAPI Application Setup and Troubleshooting

This document provides instructions for setting up and running the FastAPI application.

## Prerequisites

- Python 3.8 or newer
- pip (Python package installer)

## Quick Start

For a quick and automated setup, you can use the provided script:

### On Windows:

1. Open Command Prompt or PowerShell
2. Navigate to the `fast_api` directory
3. Run the setup script:
   ```
   .\setup_and_run.sh
   ```
   
### On Linux/Mac:

1. Open Terminal
2. Navigate to the `fast_api` directory
3. Make the script executable (if needed):
   ```
   chmod +x setup_and_run.sh
   ```
4. Run the setup script:
   ```
   ./setup_and_run.sh
   ```

The script will:
- Check if Python is installed
- Create a virtual environment (if possible)
- Install required dependencies
- Start the FastAPI server

## Manual Setup

If the automated script doesn't work, follow these manual steps:

### Step 1: Create a virtual environment

```bash
# On Windows
python -m venv venv
venv\Scripts\activate

# On Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

### Step 2: Install dependencies

```bash
pip install -r requirements.txt
```

### Step 3: Run the application

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## Accessing the API

Once the server is running:
- The API will be available at http://localhost:8000
- Interactive API documentation is available at http://localhost:8000/docs
- Alternative API documentation is available at http://localhost:8000/redoc

## Troubleshooting

### "No module named 'fastapi'"
This means the FastAPI package isn't installed. Run:
```
pip install fastapi uvicorn pydantic
```

### "Cannot import name 'X' from 'pydantic'"
This might be due to an incompatible version. Try:
```
pip install pydantic==2.5.1 typing-extensions==4.8.0
```

### "venv is not recognized" or similar errors
If you can't create a virtual environment, you can install packages globally:
```
pip install -r requirements.txt
```

### Port already in use
If port 8000 is already in use, you can specify a different port:
```
uvicorn main:app --reload --host 0.0.0.0 --port 8001
```