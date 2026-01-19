# BidSmith ASF Setup Guide

## 1. Install Dependencies
```bash
npm install
```

## 2. Setup Environment Variables
```bash
cp .env.example .env.local
```
Edit `.env.local` with your actual Stripe, Firebase, and OpenAI credentials.

## 3. Get Stripe Keys
1. Go to https://dashboard.stripe.com/test/apikeys and copy the Secret Key into `STRIPE_SECRET_KEY`.
2. Create product:
```bash
stripe products create --name="BidSmith ASF" --description="Full Access"
```
3. Create price:
```bash
stripe prices create --product=prod_xxxxx --unit-amount=149000 --currency=gbp
```
4. Copy price ID into `STRIPE_PRICE_BIDSMITH_FULL`.

## 4. Setup Webhook (Development)
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```
Copy the webhook secret into `STRIPE_WEBHOOK_SECRET`.

## 5. Setup Firebase
1. Create a project in Firebase Console.
2. Download service account key JSON.
3. Copy values into `.env.local` (`FIREBASE_ADMIN_*`).

## 6. Run Server
```bash
npm run dev
```

## 7. Test
```bash
node test-stripe.js
curl http://localhost:3000/api/health
```

## 8. Frontend Signature Component
```bash
cd frontend
npm install react-signature-canvas
npm run dev
```

## 9. Test Payment Flow
1. Upload tender documents.
2. Analyze tender.
3. Generate bid responses.
4. Add signature.
5. Complete payment with test card `4242 4242 4242 4242`.
6. Download PDF.

## Troubleshooting
- Port in use: stop other processes on 3000.
- Stripe webhook not firing: `stripe trigger checkout.session.completed`.
- Firebase permission denied: check Firestore rules.
