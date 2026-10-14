@echo off
cd /d "%~dp0"
call npm ci
if errorlevel 1 goto fail
call npm test
if errorlevel 1 goto fail
call npm run build:win
if errorlevel 1 goto fail
echo Your unsigned setup installer is in the release folder.
pause
exit /b 0
:fail
echo Build failed. Read the errors above.
pause
exit /b 1
