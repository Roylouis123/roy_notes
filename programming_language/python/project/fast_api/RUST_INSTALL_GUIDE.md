# Installing Rust for Python Package Compilation

Some Python packages like Pydantic 2.x require Rust for compilation. This guide will help you install Rust on Windows.

## Option 1: Install Rust using Rustup (Recommended)

1. Download the Rust installer from [https://rustup.rs/](https://rustup.rs/)
2. Run the downloaded file (`rustup-init.exe`)
3. Follow the on-screen instructions (usually the default options are fine)
4. **IMPORTANT**: After installation, restart your command prompt or PowerShell

To verify that Rust is installed correctly, open a new command prompt and run:
```
rustc --version
cargo --version
```

Both commands should display version information.

## Option 2: Use Pre-compiled Binaries

If you don't want to install Rust, you can use the `windows_setup.bat` script which will install pre-compiled binaries instead.

## Troubleshooting

### "Cargo not found" error
- Make sure you've restarted your command prompt after installing Rust
- Check if Rust's bin directory is in your PATH (typically `%USERPROFILE%\.cargo\bin`)

### "Permission denied" errors
- Try running your command prompt or PowerShell as Administrator

### Installation fails
- Temporarily disable antivirus software
- Try downloading the rustup-init.exe file manually from [https://win.rustup.rs/x86_64](https://win.rustup.rs/x86_64)

## After Installing Rust

Once Rust is installed, you can run:

```
pip install -r requirements.txt
```

Or the included `windows_setup_with_rust.bat` file, which assumes Rust is installed.