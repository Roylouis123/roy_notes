# run.py

"""Main entry point for the Flask application.

This script creates and runs the Flask application.
"""

import os
import logging
from dotenv import load_dotenv
from app import create_app

# Load environment variables from .env file
load_dotenv()

# Configure logging
logging.basicConfig(
    level=getattr(logging, os.environ.get('LOG_LEVEL', 'INFO')),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)

# Create the Flask application
app = create_app()

if __name__ == '__main__':
    # Run the application
    app.run(
        host=os.environ.get('FLASK_HOST', '0.0.0.0'),
        port=int(os.environ.get('FLASK_PORT', 5000)),
        debug=os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
    )
