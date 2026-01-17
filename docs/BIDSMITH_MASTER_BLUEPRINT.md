# BidSmith Master Blueprint

Definitive guide to building an AI-powered tender proposal platform for UK construction/NHS use cases. Use as a reusable template for adjacent industries.

## Executive Summary
- Project: BidSmith – AI-powered tender proposal generator
- Version: 1.0 (January 2026)
- Created by: Anon Singka for Honey-2024 Ltd (Company No. [Registration])
- Domain/Contact: www.bidsmith.co.uk | info@bidsmith.co.uk | +44 7467 393510
- Purpose: Step-by-step methodology covering architecture, build steps, compliance, payments, legal pack, and pricing.

## Part A: System Architecture
**Frontend**
- Next.js 14 (App Router), TypeScript 5.7+, Tailwind CSS 3.4+
- Radix UI components, Framer Motion animations
- React Hooks for state, React Hook Form + Zod for forms/validation

**Backend**
- Next.js API Routes (Node.js 20+, Edge where suitable)
- Auth: NextAuth.js (future)

**AI Integration**
- Primary: OpenAI GPT-4o (128k) via `openai` SDK
- Optional fallback: Claude 3.5 Sonnet (Anthropic)
- Future vector search: Pinecone

**Database & Storage**
- PostgreSQL via Supabase; Supabase Storage or S3
- Caching: Vercel Edge Config / Redis
- Session store: Vercel KV (Redis)

**Payments**
- Stripe subscriptions and one-off; Stripe webhooks

**Infrastructure**
- Hosting: Vercel (frontend + API), Vercel Edge Network
- DNS: Cloudflare; Email: SendGrid or SES; Monitoring: Sentry + Vercel Analytics

**Tooling**
- Git/GitHub, npm or pnpm, ESLint/Prettier, Jest/RTL (future), GitHub Actions + Vercel

**System Components Diagram (text)**
- UI: Landing | Generator Form | Dashboard (History)
- Next.js Router
- API Routes: /api/generate, /api/payment, /api/webhook
- Middleware: Auth, rate limit, CORS; Server Actions
- Business Logic: Tender Analyzer | Compliance Engine | Proposal Generator | Quality Validator
- Integrations: OpenAI GPT-4o; Database (Supabase/Postgres)
- External: Stripe | SendGrid | Storage

## Part B: Step-by-Step Implementation Guide
### Phase 1: Project Setup (Day 1)
1) Create Next.js app (TS, Tailwind, App Router, ESLint, alias @/*).
2) Install deps:
   - AI: openai, anthropic-sdk (optional)
   - DB/Auth: @supabase/supabase-js, @supabase/auth-helpers-nextjs
   - Payments: stripe, @stripe/stripe-js
   - Forms/validation: react-hook-form, zod, @hookform/resolvers
   - UI: Radix (dialog, dropdown, select, tabs, toast)
   - Utilities: date-fns, clsx, tailwind-merge, class-variance-authority
   - PDF/signature: jspdf, html2canvas, react-pdf, react-signature-canvas
   - Animations/icons/email: framer-motion, lucide-react, @sendgrid/mail, nodemailer
3) Structure:
   - `app/(marketing)/page.tsx` (landing), `app/(marketing)/pricing/page.tsx`
   - `app/(platform)/generate`, `app/(platform)/dashboard`, `app/(platform)/history`
   - API: `/api/generate`, `/api/proposals`, `/api/payment/create-checkout`, `/api/payment/webhook`, `/api/auth/[...nextauth]`
   - Components: ui (button/input/card/dialog/toast), forms (proposal-form, signature-pad), pricing (cards/modal), dashboard (proposal-list, stats-card)
   - Lib: ai (openai, prompts, compliance), db (supabase, queries), payments (stripe), email (sendgrid), utils; types for proposal/user/api

### Phase 2: Database Setup (Day 1-2)
- Create Supabase project (London region).
- Schema (Postgres):
  - `profiles` (id/email/name/company/subscription tier/status/stripe_customer_id; timestamps)
  - `proposals` (id/user_id, company_name/strengths/tender_text/project_value/type, proposal_content, analysis_data JSONB, signature_data JSONB, tokens_used, generation_time_ms, status, timestamps)
  - `usage` (actions, tokens, cost, links to proposals)
  - `subscriptions` (stripe_subscription_id/price_id/status/periods/cancel flag; user_id)
- Indexes on user_id, created_at.
- Enable RLS on all; policies for per-user CRUD.
- Supabase client: browser (anon) and server (service role) helpers.

### Phase 3: AI Integration (Day 2-3)
- OpenAI client (`lib/ai/openai.ts`): model GPT-4o, temp 0.7, max_tokens 4000; cost calculator.
- Prompts (`lib/ai/prompts.ts`): system prompt (BidSmith expert UK construction/NHS/CDM/Building Regs/Social Value); user prompt builder with sections (Exec Summary, Understanding, Methodology, Experience, Team, HSW, QA, Sustainability & Social Value, Programme, Risk, Conclusion), British English, specific numbers, compliance cues.
- Generator service (`lib/ai/generator.ts`): analyze tender (NHS/London/CDM/social value/sustainability/constraints), call OpenAI, inject compliance sections, add signature block, return tokens/cost/timing.
- Compliance injector: CDM Reg 13 duties, HTM/ICRA, London (London Plan, ULEZ/NRMM, CLP), Social Value highlights.

### Phase 4: Payments (Day 3-4)
- Stripe setup with product/price IDs env-configured.
- `/api/payment/create-checkout`: create subscription session by tier/billing.
- `/api/payment/webhook`: verify signature, upsert subscription status/periods; handle subscription updated/deleted.

### Phase 5: Frontend (Day 4-6)
- Landing page: hero, trust badges, feature cards, pricing, CTA; animations; glassmorphism accents.
- Generator page: form (React Hook Form + Zod), textarea for tender, company info, optional signature; call `/api/generate`; show proposal viewer, compliance highlights, metrics, copy/download.
- Dashboard/history: list proposals (Supabase), filters, stats counters (React CountUp + motion).
- Pricing modal: three tiers (Starter, Professional, Business), monthly/quarterly/annual toggle, motion hover.
- SignaturePad: react-signature-canvas with clear/undo/export.
- Global styling: Tailwind + custom glassmorphism utilities; motion presets for page/section transitions; responsive layouts.

### Phase 6: Deployment (Day 6-7)
- `.env.local` with base URL, Supabase keys, OpenAI key, Stripe keys and price IDs, SendGrid keys.
- Deploy via Vercel CLI/Dashboard; set env vars in Vercel.
- Domain: add bidsmith.co.uk and www CNAME; A record to Vercel IP if needed.

## Part C: Legal Documentation (Templates)

### Document 2: Intellectual Property Assignment (Template)
- Parties: Assignor (Anon Singka) to Honey-2024 Ltd (Company No. [NUMBER], registered office [ADDRESS]).
- Assignment: Full title guarantee of all IP in the software (code, docs, prompts, data structures, UI, brand assets, domains), worldwide, all renewals; includes economic/moral rights, past infringements, goodwill, domain names.
- Warranties: Sole owner, no encumbrances, authority to assign, non-infringing, no claims, independent creation (except licensed OSS).
- Consideration: Payment/equity/royalty placeholders.
- Further assurance and power of attorney; moral rights waived; confidentiality; English law/jurisdiction.
- Signature blocks for Assignor and Director of Assignee.

### Document 3: Terms and Conditions (Template)
- Service: AI-generated tender proposals; CDM compliance checking; PDF export; storage for paid plans.
- Accounts: Accuracy, credential security, suspension for breach.
- Subscriptions: Starter GBP 29/month (10 proposals), Professional GBP 49/quarter (25 proposals), Business GBP 199/year (unlimited); auto-renew; no refunds for partial periods; notice for price changes.
- Payments: Via Stripe; failed payments may suspend service.
- IP: Honey-2024 retains service IP; users retain input data and generated proposals for business use; license to process data for service.
- Acceptable use: No unlawful use, IP infringement, malware, reverse engineering, resale, non-construction use, or overload/abuse.
- AI content disclaimer: Must review/verify; no guarantee of wins/compliance/accuracy.
- Data protection: UK GDPR; purposes (service, improvement, comms, legal); security measures; rights to access/rectify/delete/object; retention; processors (OpenAI, Stripe, Supabase, SendGrid, Vercel).
- Liability: Service “as is”; exclude implied warranties; cap at fees paid in prior 12 months; carve-outs for death/personal injury/fraud/non-excludable.
- Indemnity: For breaches/use/third-party claims/input data.
- Termination: Convenience 30 days, material breach immediate; data deletion after 30 days; survival clauses.
- Governing law: England; jurisdiction: English courts; general boilerplate.

### Document 4: Privacy Policy (Template)
- Scope: UK GDPR/Data Protection Act 2018.
- Data collected: Account data; payment data (via Stripe); usage data; content data (tenders, proposals, signatures).
- Uses: Provide/improve service; comms; legal compliance.
- Legal bases: Contract, legitimate interests, legal obligation, consent (marketing).
- Sharing: OpenAI, Stripe, Supabase, SendGrid, Vercel; no selling data; safeguards in place.
- Security: TLS, encryption at rest, access controls, audits, training.
- Retention: Account until deletion + 30 days; proposals until deletion; logs 12 months; payment records 7 years.
- Rights: Access, rectify, delete, restrict, portability, object, withdraw consent, complain to ICO.
- Cookies: Auth, preferences, analytics, advertising (consent).
- International transfers: SCCs/adequate safeguards (US/EU services).
- Children: Not for under 18.
- Changes: Notify on significant updates.
- Contacts: Data Controller (Honey-2024 Ltd), info@bidsmith.co.uk, +44 7467 393510.

## Part D: Pricing Structure
### Pricing Tiers
- Starter: GBP 29/month, 10 proposals/month, PDF export, email support, 7-day free trial.
- Professional (most popular): GBP 49/quarter (GBP 16.33/month), 25 proposals/month, includes Starter, priority support, analytics dashboard, custom templates, 14-day free trial.
- Business: GBP 199/year (GBP 16.58/month), unlimited proposals, includes Professional, API access, team accounts (up to 5 users), dedicated account manager, custom integrations, 30-day free trial.

### Value Illustration (example)
- Starter: 10 proposals x 4 hours saved = 40 hours; 40 x GBP 50/hour = GBP 2,000 value; ROI ~6,800%.
- Professional: 25 proposals x 4 hours = 100 hours; 100 x GBP 50/hour = GBP 5,000 value; ROI ~30,600%.
- Business: Unlimited proposals; scale savings and team productivity; API/integrations for enterprise workflows.

## Implementation Notes
- Keep currency as GBP; avoid fabricated project claims; enforce British English and UK construction terminology.
- All prompts and compliance injectors should reference CDM 2015 (e.g., Reg 13), Building Regulations Parts A–Q, HTM/HBN where NHS, London Plan/ULEZ/NRMM where London, and Social Value Act commitments with numbers.
- Add middleware for rate limiting and auth guards; ensure API keys and Stripe webhook secret are set in environment.
- Maintain RLS policies in Supabase; server-side calls should use service role with care and minimal scope.

## Deployment Checklist
- Set env vars in Vercel: base URL, Supabase keys, OpenAI key, Stripe keys/price IDs, SendGrid keys.
- Run migrations (Supabase SQL) and verify RLS policies.
- Test API routes locally (`/api/generate`, payments webhook with Stripe CLI).
- QA: Proposal generation, compliance injection, signature capture, PDF export, pricing checkout, and dashboard listing.

---
This blueprint is a living document—update version/date when material changes to stack, pricing, or legal terms occur.
