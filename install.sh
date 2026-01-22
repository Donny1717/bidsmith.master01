#!/bin/bash

echo "📦 Installing BidSmith ASF dependencies..."
echo ""

# Install backend
echo "Installing backend dependencies..."
cd backend
npm install
cd ..

# Install frontend
echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo ""
echo "✅ Installation complete!"
echo ""
echo "Next steps:"
echo "1. Copy .env.example to .env.local in both backend/ and frontend/"
echo "2. Add your API keys (Stripe, Firebase, OpenAI)"
echo "3. Run: ./start.sh"
