#!/bin/bash

# This script helps set up and run the FastAPI application

echo "Setting up FastAPI application..."

# Detect platform
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" || "$OSTYPE" == "cygwin" ]]; then
    # Windows
    PYTHON_CMD="python"
    PIP_CMD="pip"
    VENV_ACTIVATE="venv\\Scripts\\activate"
    echo "Detected Windows platform"
else
    # Linux/Mac
    PYTHON_CMD="python3"
    PIP_CMD="pip3"
    VENV_ACTIVATE="source venv/bin/activate"
    echo "Detected Unix-like platform (Linux/Mac)"
fi

# Check if Python is installed
if ! command -v $PYTHON_CMD &> /dev/null; then
    echo "Error: Python is not installed or not in PATH"
    echo "Please install Python 3.8 or newer: https://www.python.org/downloads/"
    exit 1
fi

# Check Python version
PYTHON_VERSION=$($PYTHON_CMD --version | cut -d " " -f2)
PYTHON_MAJOR=$(echo $PYTHON_VERSION | cut -d. -f1)
PYTHON_MINOR=$(echo $PYTHON_VERSION | cut -d. -f2)

echo "Found Python version: $PYTHON_VERSION"

if [ $PYTHON_MAJOR -lt 3 ] || ([ $PYTHON_MAJOR -eq 3 ] && [ $PYTHON_MINOR -lt 8 ]); then
    echo "Error: Python 3.8+ is required, but you have $PYTHON_VERSION"
    echo "Please upgrade Python: https://www.python.org/downloads/"
    exit 1
fi

# Check if pip is installed
if ! command -v $PIP_CMD &> /dev/null; then
    echo "Error: pip is not installed or not in PATH"
    echo "Please install pip: https://pip.pypa.io/en/stable/installation/"
    exit 1
fi

# Check if venv module is available
$PYTHON_CMD -c "import venv" 2>/dev/null
if [ $? -ne 0 ]; then
    echo "Warning: Python venv module is not available"
    echo "Will install packages globally (not recommended)"
    
    # Install requirements globally
    echo "Installing dependencies..."
    $PIP_CMD install -r requirements.txt
else
    # Create and activate virtual environment
    echo "Creating virtual environment..."
    
    # Check if venv already exists
    if [ ! -d "venv" ]; then
        $PYTHON_CMD -m venv venv
    else
        echo "Virtual environment already exists"
    fi
    
    # Try to activate the virtual environment
    echo "Activating virtual environment..."
    eval $VENV_ACTIVATE
    
    # Install requirements in virtual environment
    echo "Installing dependencies..."
    pip install -r requirements.txt
fi

# Run the FastAPI application
echo "Starting FastAPI application..."
echo "The API will be available at http://localhost:8000"
echo "API documentation available at http://localhost:8000/docs"
echo "Press Ctrl+C to stop the server"

# Try to run with uvicorn directly
if command -v uvicorn &> /dev/null; then
    uvicorn main:app --reload --host 0.0.0.0 --port 8000
else
    # Fall back to python
    $PYTHON_CMD -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
fi