@echo off
echo ====================================================================
echo  Connecting to https://github.com/Nitheesh2007/vidhyakartechno.git
echo  and pushing all project files...
echo ====================================================================

cd /d "%~dp0"

:: Initialize Git if not initialized
if not exist ".git" (
    echo Initializing Git repository...
    git init
    git branch -M main
)

:: Set remote URL
git remote remove origin 2>nul
git remote add origin https://github.com/Nitheesh2007/vidhyakartechno.git

:: Add all files
echo Staging all files...
git add .

:: Commit
echo Committing files...
git commit -m "Initial push: Smart Farming full project codebase"

:: Pull rebase and push
echo Pushing to origin main...
git pull --rebase origin main --allow-unrelated-histories 2>nul
git push -u origin main

echo ====================================================================
echo  ALL FILES HAVE BEEN PUSHED TO GITHUB!
echo ====================================================================
echo.
echo Starting continuous background auto-push watcher...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\auto_push.ps1"

pause
