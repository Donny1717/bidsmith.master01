# BidSmith ASF

Bid Intelligence Platform for London Construction Tenders

## Quick Start
```
# 1. Install dependencies
chmod +x install.sh
./install.sh

# 2. Setup environment variables
cp backend/.env.example backend/.env.local
cp frontend/.env.example frontend/.env.local
# Edit both .env.local files with your API keys

# 3. Run both servers
chmod +x start.sh
./start.sh
```

## Project Structure

- backend/ - Express API server
- frontend/ - Next.js 14 web application

## Development
```
# Backend only
cd backend
npm run dev

# Frontend only
cd frontend
npm run dev
```

## Environment Variables

See `.env.example` in both `backend/` and `frontend/` directories.

## Documentation

- Backend API: `backend/README.md`
- Frontend: `frontend/README.md`