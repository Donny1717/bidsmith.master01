# Copilot / AI Agent Instructions for BidSmith

Concise, repo-specific guidance for automated code assistance.

## Quick orientation
- Repo layout: top-level Node app plus `backend/` (Express API) and `frontend/` (Next.js 14 app).
- Primary server entrypoints: `src/api/server.js` (root) and `backend/src/api/server.js` (backend package.json `main`).
- Typical runtime: Node >= 18 (see `package.json` `engines`).

## High-level data flow
- User uploads tender -> `POST /api/upload` handled by backend upload routes.
- Analysis step -> `POST /api/analyze` (server-side analyzers in `src/analyzers` / `backend` equivalents).
- Generation -> `POST /api/generate` creates draft proposals (generators in `generators/` and `src/generators`).
- Signature flow -> client signature component posts to `POST /api/signature` and server stores/verifies signatures.
- Payment flow -> Stripe checkout via `POST /api/stripe/checkout` and webhook at `POST /api/stripe/webhook`.

## Developer workflows (exact commands)
- Install (Unix): `chmod +x install.sh && ./install.sh` — on Windows, use WSL or run equivalent `npm install` in each subfolder.
- Run both servers (Unix): `chmod +x start.sh && ./start.sh` — on Windows run both processes separately.
- Backend dev: `cd backend && npm install && npm run dev` (nodemon-style dev server).
- Frontend dev: `cd frontend && npm install && npm run dev` (Next dev server, default port set to 3001).
- Root quick dev: `npm run dev` runs `src/api/server.js` from repo root.

## Files & locations to consult for implementing changes
- API routes and integrations: `src/api/` and `backend/src/api/` (look for `routes.js`, `stripe.js`, `signature.js`).
- Client components for flows: `frontend/components/` and `bidsmith-frontend/components/` (e.g., `SignaturePad.tsx`, `PaymentCheckout.tsx`).
- Analyzers/generators: `src/analyzers/`, `generators/`, and `src/generators/`.
- Cloud / infra hints: `firebase.json`, `vercel.json`, and `cloudbuild.yaml` for deployments.

## Project-specific conventions
- Env files: copy and edit `backend/.env.example` and `frontend/.env.example` to run locally.
- Port convention: Next frontend uses `-p 3001` in `frontend/package.json` — be careful running multiple frontends concurrently.
- Use Node >=18 and ES modules in backend (see `type: "module"` in `backend/package.json`).

## Integration details to watch for
- Stripe: server uses `stripe` library and provides checkout/session endpoints; `test-stripe.js` is a smoke test in root.
- Firebase Admin: used server-side for auth/data in `src/api/firebaseAdmin.js` and `config/serviceAccountKey.json` is present.
- OpenAI/Anthropic: referenced in dependencies; look in `src/api/openai.js` and `src/generators` for prompt usage.

## Debugging tips
- For live backend reloads use `npm run dev` in `backend` (nodemon). For production simulations set `NODE_ENV=production` and use `npm start`.
- If shell scripts fail on Windows, run commands in WSL or translate to PowerShell equivalents (copy env examples manually).

## Examples for common tasks
- Add a new API route: edit `src/api/routes.js` or add file under `src/api/`, then register in `src/api/server.js`.
- Add a frontend page/component: edit `frontend/app/` (Next app router) and `frontend/components/` for shared UI.

If any section is unclear or you want more examples (e.g., sequence of files touched for the signature or Stripe flows), tell me which flow and I will expand the instructions and add code pointers.