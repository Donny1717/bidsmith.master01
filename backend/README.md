# BidSmith ASF Backend

Express API for BidSmith ASF. Provides tender upload, analysis stubs, bid generation, electronic signatures, Stripe payments, and PDF generation.

## Setup
```bash
cp .env.local .env.local # edit values
npm install
npm run dev
```

## Scripts
- `npm run dev` - start API with nodemon
- `npm start` - start API

## Key Endpoints
- `GET /api/health`
- `POST /api/upload`
- `POST /api/analyze`
- `POST /api/generate`
- `POST /api/signature`
- `GET /api/signature/:bidId`
- `POST /api/stripe/checkout`
- `GET /api/stripe/verify/:sessionId`
- `POST /api/stripe/webhook`
- `POST /api/pdf/generate`
