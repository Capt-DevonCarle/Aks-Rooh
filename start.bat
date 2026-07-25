@echo off
title Aks Rooh — Reflection Journal
echo ============================================
echo   Aks Rooh — Starting Your Soul Garden
echo ============================================
echo.

:: ── Check Node.js ────────────────────────────────────────
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in your PATH.
    echo Please download it from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)
echo [✓] Node.js found

:: ── Backend setup ────────────────────────────────────────
echo.
echo [1/4] Setting up backend...
cd /d "%~dp0backend"

if not exist ".env" (
    echo [i] Creating backend\.env from .env.example...
    copy .env.example .env >nul
)

:: ── Auto-generate JWT_SECRET if still placeholder ──
findstr /C:"JWT_SECRET=replace-with" .env >nul 2>nul
if %errorlevel% equ 0 (
    echo [i] Generating a random JWT_SECRET...
    powershell -Command "$s = -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 48 | %% {[char]$_}); (Get-Content .env) -replace 'JWT_SECRET=replace-with-a-long-random-secret', ('JWT_SECRET=' + $s) | Set-Content .env"
    echo [✓] JWT_SECRET generated
)

echo [2/4] Installing backend dependencies...
call npm install --silent 2>nul
echo [✓] Backend ready

:: ── Start backend ────────────────────────────────────────
echo [3/4] Starting API server on http://localhost:4000 ...
start "Aks Rooh API" cmd /c "cd /d "%~dp0backend" && npm run dev"

:: ── Frontend setup ───────────────────────────────────────
echo [4/4] Setting up frontend...
cd /d "%~dp0frontend"
call npm install --silent 2>nul
echo [✓] Frontend ready

:: ── Start frontend ───────────────────────────────────────
echo Starting React app on http://localhost:3000 ...
start "Aks Rooh App" cmd /c "cd /d "%~dp0frontend" && npm start"

echo.
echo ============================================
echo   Both servers are starting up!
echo.
echo   Backend API  → http://localhost:4000
echo   Frontend App → http://localhost:3000
echo.
echo   If the React app opens at 127.0.0.1:3000
echo   instead of localhost:3000, the CORS
echo   configuration now supports both.
echo ============================================
echo.
echo Close this window to stop both servers.
echo.
pause

