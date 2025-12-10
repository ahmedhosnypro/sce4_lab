#!/bin/bash
# startup.sh - Helper script to start the Employee Management System

echo "======================================"
echo "Employee Management System Startup"
echo "======================================"
echo ""

# Check if Docker/SQL Server is running
echo "✓ Checking prerequisites..."

if ! command -v dotnet &> /dev/null; then
    echo "✗ .NET SDK not found. Please ensure it's installed."
    exit 1
fi

if ! command -v bun &> /dev/null; then
    echo "⚠ Bun not found. Attempting to use npm..."
    NODE_PACKAGE_MGR="npm"
else
    NODE_PACKAGE_MGR="bun"
fi

echo "✓ .NET SDK found"
echo "✓ Package manager: $NODE_PACKAGE_MGR"
echo ""

# Start backend
echo "======================================"
echo "Starting ASP.NET Core Backend..."
echo "======================================"
echo ""
echo "Location: EmployeeService/"
echo "Port: http://localhost:5000"
echo ""

cd EmployeeService

# Check if it's the first run (no Migrations folder)
if [ ! -d "Migrations" ]; then
    echo "First run detected. Creating database migrations..."
    dotnet ef migrations add InitialCreate
fi

echo "Building backend..."
dotnet build

echo ""
echo "Starting server..."
echo "Press Ctrl+C to stop the server"
echo ""

dotnet run &
BACKEND_PID=$!

sleep 3

# Check if backend started successfully
if ! kill -0 $BACKEND_PID 2>/dev/null; then
    echo "✗ Backend failed to start. Check the errors above."
    exit 1
fi

echo "✓ Backend started (PID: $BACKEND_PID)"
echo ""

# Navigate to frontend
cd ../front

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "======================================"
    echo "Installing Frontend Dependencies..."
    echo "======================================"
    $NODE_PACKAGE_MGR install
    echo ""
fi

# Start frontend
echo "======================================"
echo "Starting React Frontend..."
echo "======================================"
echo ""
echo "Location: front/"
echo "Port: http://localhost:5173"
echo ""

$NODE_PACKAGE_MGR run dev &
FRONTEND_PID=$!

sleep 2

# Check if frontend started successfully
if ! kill -0 $FRONTEND_PID 2>/dev/null; then
    echo "✗ Frontend failed to start. Check the errors above."
    kill $BACKEND_PID
    exit 1
fi

echo "✓ Frontend started (PID: $FRONTEND_PID)"
echo ""

echo "======================================"
echo "🎉 All services running!"
echo "======================================"
echo ""
echo "Frontend:  http://localhost:5173"
echo "Backend:   http://localhost:5000"
echo "API Docs:  http://localhost:5000/openapi/v1.json"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; echo ''; echo 'Services stopped.'; exit 0" INT

wait
