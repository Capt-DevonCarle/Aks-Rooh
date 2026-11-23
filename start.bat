@echo off
setlocal
title Aks Rooh - Reflection Journal

echo ============================================
echo   Aks Rooh - Starting Your Soul Garden
echo ============================================
echo.

where node >nul 2>nul
if errorlevel 1 (
    echo [ERROR] Node.js is not installed or not in your PATH.
    echo Please download it from https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js found

echo.
echo [1/4] Checking backend configuration...
cd /d "%~dp0backend"

if not exist ".env" (
    copy ".env.example" ".env" >nul
)

findstr /C:"JWT_SECRET=replace-with" /C:"JWT_SECRET=dev-secret" ".env" >nul 2>nul
if not errorlevel 1 (
    echo [i] Generating a secure JWT secret...
    for /f "usebackq delims=" %%S in (`node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`) do set "JWT_SECRET=%%S"
    powershell -NoProfile -Command "$value=$env:JWT_SECRET; $found=$false; $lines=foreach($line in (Get-Content '.env')) { if($line -like 'JWT_SECRET=*') { $found=$true; 'JWT_SECRET='+$value } else { $line } }; if(-not $found) { $lines += 'JWT_SECRET='+$value }; Set-Content -Path '.env' -Value $lines"
)

findstr /C:"JOURNAL_ENCRYPTION_KEY=" ".env" >nul 2>nul
if errorlevel 1 (
    set "NEEDS_JOURNAL_KEY=1"
) else (
    findstr /C:"JOURNAL_ENCRYPTION_KEY=replace-with" /C:"JOURNAL_ENCRYPTION_KEY=$" ".env" >nul 2>nul
    if not errorlevel 1 set "NEEDS_JOURNAL_KEY=1"
)
if defined NEEDS_JOURNAL_KEY (
    echo [i] Generating the journal encryption key...
    for /f "usebackq delims=" %%K in (`node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`) do set "JOURNAL_KEY=%%K"
    powershell -NoProfile -Command "$value=$env:JOURNAL_KEY; $found=$false; $lines=foreach($line in (Get-Content '.env')) { if($line -like 'JOURNAL_ENCRYPTION_KEY=*') { $found=$true; 'JOURNAL_ENCRYPTION_KEY='+$value } else { $line } }; if(-not $found) { $lines += 'JOURNAL_ENCRYPTION_KEY='+$value }; Set-Content -Path '.env' -Value $lines"
)

echo [2/4] Installing backend dependencies...
call npm install --silent
if errorlevel 1 (
    echo [ERROR] Backend dependencies could not be installed.
    pause
    exit /b 1
)

curl.exe -fsS http://127.0.0.1:4000/api/health >nul 2>nul
if errorlevel 1 (
    echo [3/4] Starting API server on http://localhost:4000 ...
    start "Aks Rooh API" cmd /d /k "cd /d ""%~dp0backend"" && npm run dev"
) else (
    echo [3/4] API server is already running on http://localhost:4000
)

echo [4/4] Checking frontend dependencies...
cd /d "%~dp0frontend"
call npm install --silent
if errorlevel 1 (
    echo [ERROR] Frontend dependencies could not be installed.
    pause
    exit /b 1
)

curl.exe -fsS http://127.0.0.1:3000 >nul 2>nul
if errorlevel 1 (
    echo Starting React app on http://localhost:3000 ...
    start "Aks Rooh App" cmd /d /k "cd /d ""%~dp0frontend"" && npm start"
) else (
    echo React app is already running on http://localhost:3000
)

echo.
echo ============================================
echo   Aks Rooh is starting or already running.
echo.
echo   Backend API  - http://localhost:4000
echo   Frontend App - http://localhost:3000
echo ============================================
echo.
pause
