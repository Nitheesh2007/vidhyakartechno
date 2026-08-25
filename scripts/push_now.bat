@echo off
echo ===================================================
echo Pushing changes to https://github.com/Nitheesh2007/vidhyakartechno.git
echo ===================================================
cd /d "%~dp0.."
git add .
git commit -m "Auto-commit: %DATE% %TIME%"
git pull --rebase origin main
git push origin main
echo ===================================================
echo Done!
pause
