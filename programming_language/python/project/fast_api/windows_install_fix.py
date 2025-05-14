#!/usr/bin/env python3
"""
Windows Installation Fix Script

This script provides a GUI to help install FastAPI and its dependencies on Windows.
It tries multiple approaches to fix common installation issues.
"""

import os
import sys
import subprocess
import tempfile
import webbrowser
from tkinter import Tk, Label, Button, Frame, Text, Scrollbar, messagebox, StringVar, OptionMenu

# Check if running on Windows
if os.name != 'nt':
    print("This script is intended for Windows only. For other platforms, use setup_and_run.sh")
    sys.exit(1)

class InstallerApp:
    def __init__(self, master):
        self.master = master
        master.title("FastAPI Windows Installer")
        master.geometry("700x550")
        master.resizable(True, True)
        
        # Configure the main frame
        main_frame = Frame(master, padx=20, pady=20)
        main_frame.pack(fill="both", expand=True)
        
        # Header
        Label(main_frame, text="FastAPI Windows Installation Helper", font=("Arial", 16, "bold")).pack(pady=(0, 10))
        Label(main_frame, text="This tool helps fix Rust-related installation issues").pack(pady=(0, 20))
        
        # Installation method selection
        Label(main_frame, text="Select installation method:", font=("Arial", 10, "bold")).pack(anchor="w")
        
        self.method_var = StringVar(master)
        self.method_var.set("Use pre-built packages (No Rust needed)")  # default
        
        methods = [
            "Use pre-built packages (No Rust needed)",
            "Install with Rust (If already installed)",
            "Install older version (Pydantic v1)"
        ]
        
        method_menu = OptionMenu(main_frame, self.method_var, *methods)
        method_menu.pack(fill="x", pady=(0, 20))
        
        # Install button
        self.install_button = Button(main_frame, text="Install FastAPI", command=self.install, height=2, 
                                     bg="#4CAF50", fg="white", font=("Arial", 12, "bold"))
        self.install_button.pack(fill="x", pady=(0, 20))
        
        # Run server button (initially disabled)
        self.run_button = Button(main_frame, text="Run FastAPI Server", command=self.run_server, height=2,
                                state="disabled", bg="#2196F3", fg="white", font=("Arial", 12, "bold"))
        self.run_button.pack(fill="x", pady=(0, 20))
        
        # Open docs button (initially disabled)
        self.docs_button = Button(main_frame, text="Open API Documentation", command=self.open_docs,
                                state="disabled", bg="#FF9800", fg="white", font=("Arial", 10))
        self.docs_button.pack(fill="x", pady=(0, 10))
        
        # Log area
        Label(main_frame, text="Installation Log:", font=("Arial", 10, "bold")).pack(anchor="w")
        
        log_frame = Frame(main_frame)
        log_frame.pack(fill="both", expand=True)
        
        self.log_text = Text(log_frame, wrap="word", bg="#F0F0F0", height=10)
        self.log_text.pack(side="left", fill="both", expand=True)
        
        scrollbar = Scrollbar(log_frame, command=self.log_text.yview)
        scrollbar.pack(side="right", fill="y")
        self.log_text.config(yscrollcommand=scrollbar.set)
        
        self.log("Welcome to the FastAPI Windows Installer")
        self.log("This tool will help you install FastAPI without Rust compilation issues")
        self.log("1. Select your preferred installation method")
        self.log("2. Click 'Install FastAPI'")
        self.log("3. Once installation is complete, you can run the server")
        
        # Check if venv exists
        self.venv_exists = os.path.exists("venv")
        if self.venv_exists:
            self.log("Found existing virtual environment")
    
    def log(self, message):
        self.log_text.insert("end", message + "\n")
        self.log_text.see("end")
        self.master.update_idletasks()  # Force update to show new text
    
    def install(self):
        method = self.method_var.get()
        self.install_button.config(state="disabled", text="Installing...")
        
        try:
            # Create virtual environment if it doesn't exist
            if not self.venv_exists:
                self.log("Creating virtual environment...")
                result = subprocess.run(["python", "-m", "venv", "venv"], 
                                       capture_output=True, text=True)
                if result.returncode != 0:
                    self.log("ERROR: Failed to create virtual environment")
                    self.log(result.stderr)
                    messagebox.showerror("Error", "Failed to create virtual environment")
                    self.install_button.config(state="normal", text="Install FastAPI")
                    return
                self.venv_exists = True
            
            # Install based on selected method
            if "pre-built packages" in method:
                self.install_prebuilt()
            elif "with Rust" in method:
                self.install_with_rust()
            elif "older version" in method:
                self.install_older_version()
            
            # Check if installation was successful
            self.check_installation()
            
        except Exception as e:
            self.log(f"ERROR: {str(e)}")
            messagebox.showerror("Error", f"Installation failed: {str(e)}")
            self.install_button.config(state="normal", text="Retry Installation")
    
    def install_prebuilt(self):
        self.log("Installing pre-built packages (no Rust required)...")
        
        # Path to pip in virtual environment
        pip_path = os.path.join("venv", "Scripts", "pip.exe")
        
        # Upgrade pip
        self.log("Upgrading pip...")
        subprocess.run([pip_path, "install", "--upgrade", "pip"], 
                      capture_output=True, text=True)
        
        # Install each package individually with --only-binary option
        packages = [
            ("pydantic", "2.5.1"),
            ("typing-extensions", "4.8.0"),
            ("starlette", "0.27.0"),
            ("fastapi", "0.105.0"),
            ("uvicorn", "0.24.0")
        ]
        
        for pkg, version in packages:
            self.log(f"Installing {pkg}=={version} (pre-built)...")
            result = subprocess.run(
                [pip_path, "install", f"{pkg}=={version}", "--only-binary", ":all:"],
                capture_output=True, text=True
            )
            if result.returncode != 0:
                self.log(f"Warning: Failed to install {pkg} with --only-binary")
                # Fallback to regular install
                self.log(f"Trying regular install for {pkg}...")
                fallback = subprocess.run(
                    [pip_path, "install", f"{pkg}=={version}"],
                    capture_output=True, text=True
                )
                if fallback.returncode != 0:
                    self.log(f"ERROR installing {pkg}: {fallback.stderr}")
                    raise Exception(f"Failed to install {pkg}")
    
    def install_with_rust(self):
        self.log("Checking for Rust installation...")
        
        # Check if cargo is available
        result = subprocess.run(["where", "cargo"], capture_output=True, text=True)
        if result.returncode != 0:
            self.log("ERROR: Rust/Cargo not found!")
            self.log("Please install Rust from https://rustup.rs/ first")
            messagebox.showerror("Error", "Rust is not installed or not in PATH.\nPlease install Rust first.")
            self.install_button.config(state="normal", text="Install FastAPI")
            return
        
        self.log("Rust is installed, proceeding with installation...")
        pip_path = os.path.join("venv", "Scripts", "pip.exe")
        
        # Upgrade pip
        self.log("Upgrading pip...")
        subprocess.run([pip_path, "install", "--upgrade", "pip"], 
                      capture_output=True, text=True)
        
        # Install requirements
        self.log("Installing dependencies (using Rust for compilation)...")
        result = subprocess.run(
            [pip_path, "install", "-r", "requirements.txt"],
            capture_output=True, text=True
        )
        
        if result.returncode != 0:
            self.log("ERROR: Failed to install dependencies")
            self.log(result.stderr)
            raise Exception("Failed to install dependencies with Rust")
    
    def install_older_version(self):
        self.log("Installing older version of packages (Pydantic v1)...")
        
        # Path to pip in virtual environment
        pip_path = os.path.join("venv", "Scripts", "pip.exe")
        
        # Upgrade pip
        self.log("Upgrading pip...")
        subprocess.run([pip_path, "install", "--upgrade", "pip"], 
                      capture_output=True, text=True)
        
        # Use the requirements-no-rust.txt file if it exists
        if os.path.exists("requirements-no-rust.txt"):
            self.log("Installing from requirements-no-rust.txt...")
            result = subprocess.run(
                [pip_path, "install", "-r", "requirements-no-rust.txt"],
                capture_output=True, text=True
            )
            if result.returncode != 0:
                self.log("ERROR: Failed to install from requirements-no-rust.txt")
                self.log(result.stderr)
                raise Exception("Failed to install older packages")
        else:
            # Install each package individually
            packages = [
                ("pydantic", "1.10.13"),  # Older version that doesn't need Rust
                ("typing-extensions", "4.8.0"),
                ("starlette", "0.27.0"),
                ("fastapi", "0.100.1"),  # Compatible with Pydantic v1
                ("uvicorn", "0.23.0")
            ]
            
            for pkg, version in packages:
                self.log(f"Installing {pkg}=={version}...")
                result = subprocess.run(
                    [pip_path, "install", f"{pkg}=={version}"],
                    capture_output=True, text=True
                )
                if result.returncode != 0:
                    self.log(f"ERROR installing {pkg}: {result.stderr}")
                    raise Exception(f"Failed to install {pkg}")
    
    def check_installation(self):
        self.log("Verifying installation...")
        
        # Run a Python script to check imports
        python_path = os.path.join("venv", "Scripts", "python.exe")
        
        # Create a temporary script to test imports
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".py", mode="w")
        temp_file.write("""
try:
    import fastapi
    print(f"FastAPI version: {fastapi.__version__}")
    import uvicorn
    print(f"Uvicorn version: {uvicorn.__version__}")
    import pydantic
    print(f"Pydantic version: {pydantic.__version__}")
    print("SUCCESS: All packages imported successfully")
except ImportError as e:
    print(f"ERROR: {str(e)}")
    import sys
    sys.exit(1)
""")
        temp_file.close()
        
        # Run the test script
        result = subprocess.run(
            [python_path, temp_file.name],
            capture_output=True, text=True
        )
        
        # Clean up
        os.unlink(temp_file.name)
        
        # Check result
        if result.returncode == 0 and "SUCCESS" in result.stdout:
            self.log("Installation completed successfully!")
            self.log(result.stdout)
            self.install_button.config(state="normal", text="Installation Successful ✓", bg="#4CAF50")
            self.run_button.config(state="normal")
            self.docs_button.config(state="normal")
            messagebox.showinfo("Success", "FastAPI installed successfully!\nYou can now run the server.")
        else:
            self.log("ERROR: Installation verification failed")
            self.log(result.stdout)
            self.log(result.stderr)
            self.install_button.config(state="normal", text="Retry Installation")
            messagebox.showerror("Error", "Installation verification failed.\nSee log for details.")
    
    def run_server(self):
        self.log("Starting FastAPI server...")
        python_path = os.path.join("venv", "Scripts", "python.exe")
        
        try:
            # Run in a separate process so it doesn't block the GUI
            subprocess.Popen(
                [python_path, "-m", "uvicorn", "main:app", "--reload"],
                creationflags=subprocess.CREATE_NEW_CONSOLE  # Open in new window
            )
            self.log("Server started! API docs available at http://localhost:8000/docs")
            messagebox.showinfo("Server Started", 
                               "Server is running in a new window.\n\n"
                               "API is available at: http://localhost:8000\n"
                               "API docs at: http://localhost:8000/docs")
        except Exception as e:
            self.log(f"ERROR starting server: {str(e)}")
            messagebox.showerror("Error", f"Failed to start server: {str(e)}")
    
    def open_docs(self):
        webbrowser.open("http://localhost:8000/docs")

if __name__ == "__main__":
    root = Tk()
    app = InstallerApp(root)
    root.mainloop()