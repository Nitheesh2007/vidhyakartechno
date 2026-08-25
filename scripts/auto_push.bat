@echo off
echo Starting Auto-Push Watcher for repository: https://github.com/Nitheesh2007/vidhyakartechno.git ...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0auto_push.ps1"
pause
