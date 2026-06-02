@echo off
echo Starting Backend Server...
start cmd.exe /k "cd backend && python manage.py runserver"

echo Starting Frontend Server...
start cmd.exe /k "cd frontendIntern && npm run dev"

echo Both servers are starting up!
