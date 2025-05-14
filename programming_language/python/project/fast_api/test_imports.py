# Test if the necessary modules are available
try:
    import fastapi
    print("FastAPI is installed, version:", fastapi.__version__)
except ImportError:
    print("FastAPI is not installed")

try:
    import uvicorn
    print("Uvicorn is installed, version:", uvicorn.__version__)
except ImportError:
    print("Uvicorn is not installed")

try:
    import pydantic
    print("Pydantic is installed, version:", pydantic.__version__)
except ImportError:
    print("Pydantic is not installed")