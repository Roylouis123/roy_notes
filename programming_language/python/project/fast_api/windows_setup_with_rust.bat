@echo off
echo Setting up FastAPI for Windows (with Rust compilation)

REM Verify Rust is installed
echo Checking for Rust installation...
where cargo >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Rust/Cargo is not installed or not in PATH.
    echo Please install Rust first using the instructions in RUST_INSTALL_GUIDE.md
    echo or use the windows_setup.bat file which doesn't require Rust.
    exit /b 1
)

echo Rust is installed, proceeding with setup.

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

REM Install dependencies normally (will compile with Rust)
echo Installing dependencies...
pip install -r requirements.txt

echo Installation complete!
echo To run the API server, use: python -m uvicorn main:app --reload
echo Documentation will be available at: http://localhost:8000/docs

REM Ask user if they want to run the server now
set /p RUN_SERVER="Do you want to run the server now? (y/n): "
if /i "%RUN_SERVER%"=="y" (
    echo Starting server...
    python -m uvicorn main:app --reload
)