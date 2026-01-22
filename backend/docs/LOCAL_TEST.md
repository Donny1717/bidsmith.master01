# Local Test Runbook

## Environment
Create `.env.local` files with escaped newlines:

```
# backend/.env.local
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nXXXX\n-----END PRIVATE KEY-----\n"
STRIPE_SECRET_KEY=sk_test_51xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
STRIPE_PRICE_BIDSMITH_FULL=price_1xxxxx
OPENAI_API_KEY=sk-proj-xxxxx
FRONTEND_URL=http://localhost:3001
PORT=3000
```

```
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51xxxxx
```

## Run
```
npm run dev --prefix backend
npm run dev --prefix frontend
```

## Verify
```
curl http://localhost:3000/api/health
```
Expect `status` `ok` or `degraded` with messages; no secrets returned.
