@echo off
echo.
echo ========================================
echo    ZUTO GeoTech Solutions Dashboard
echo           Preview Launcher
echo ========================================
echo.
echo Starting preview server...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

REM Check if the preview script exists
if not exist "preview_dashboard.js" (
    echo ERROR: preview_dashboard.js not found
    echo Please make sure you're in the correct directory
    echo.
    pause
    exit /b 1
)

echo Starting preview server on port 3000...
echo.
echo Open your browser and visit: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

node preview_dashboard.js

echo.
echo Preview server stopped.
pause
