#!/bin/bash

# ShopHub E-commerce Website Startup Script

echo "===================================="
echo "   ShopHub E-commerce Platform   "
echo "===================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✓ Node.js detected"

# Navigate to backend directory
cd backend

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
fi

# Initialize database if needed
if [ ! -f "database.sqlite" ]; then
    echo "🗄️  Initializing database..."
    npm run init-db
fi

echo ""
echo "🚀 Starting backend server..."
echo "   Backend API: http://localhost:3000"
echo ""
echo "🌐 To view the frontend, open another terminal and run:"
echo "   cd ecommerce-website"
echo "   python3 -m http.server 8000"
echo "   Or use VS Code Live Server"
echo ""
echo "   Frontend URL: http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop the server"
echo "===================================="
echo ""

# Start the backend server
npm start
