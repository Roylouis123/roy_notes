@echo off
echo Setting up FastAPI for Windows

REM Create virtual environment if it doesn't exist
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
) else (
    echo Virtual environment already exists
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Upgrade pip to latest version
echo Upgrading pip...
python -m pip install --upgrade pip

REM Install packages with --only-binary option to avoid Rust compilation
echo Installing dependencies (using pre-built binaries)...
pip install --only-binary :all: pydantic==2.5.1
pip install --only-binary :all: typing-extensions==4.8.0
pip install --only-binary :all: starlette==0.27.0
pip install --only-binary :all: fastapi==0.105.0
pip install --only-binary :all: uvicorn==0.24.0

echo Installation complete!
echo To run the API server, use: python -m uvicorn main:app --reload
echo Documentation will be available at: http://localhost:8000/docs

REM Ask user if they want to run the server now
set /p RUN_SERVER="Do you want to run the server now? (y/n): "
if /i "%RUN_SERVER%"=="y" (
    echo Starting server...
    python -m uvicorn main:app --reload
)