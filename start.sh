#!/bin/bash

echo "🚀 Starting BidSmith ASF..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Start backend
echo -e "${BLUE}Starting backend on port 3000...${NC}"
cd backend
npm run dev &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Start frontend
echo -e "${BLUE}Starting frontend on port 3001...${NC}"
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo -e "${GREEN}✅ Backend running:${NC} http://localhost:3000"
echo -e "${GREEN}✅ Frontend running:${NC} http://localhost:3001"
echo ""
echo -e "${BLUE}📍 API Health Check:${NC} http://localhost:3000/api/health"
echo ""
echo "Press Ctrl+C to stop both servers"

# Cleanup function
cleanup() {
  echo ""
  echo "Stopping servers..."
  kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
  exit 0
}

trap cleanup INT

# Wait
wait
