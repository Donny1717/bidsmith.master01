/**
 * BidSmith ASF - Stripe Payment Integration
 * Production-ready Stripe setup
 */

import Stripe from "stripe";

// ================================
// Environment variables
// ================================
const {
  STRIPE_SECRET_KEY,
  STRIPE_PRICE_ID,
  STRIPE_WEBHOOK_SECRET,
  FRONTEND_URL
} = process.env;

// ================================
// Validation
// ================================
if (!STRIPE_SECRET_KEY) {
  throw new Error("❌ STRIPE_SECRET_KEY is missing");
}

if (!STRIPE_PRICE_ID) {
  throw new Error("❌ STRIPE_PRICE_ID is missing");
}

// ================================
// Stripe Client
// ================================
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16"
});

// ================================
// Helpers
// ================================
const getSuccessUrl = () =>
  `${FRONTEND_URL || "http://localhost:3000"}/payment/success`;

const getCancelUrl = () =>
  `${FRONTEND_URL || "http://localhost:3000"}/payment/cancel`;

// ================================
// Create Checkout Session
// ================================
export async function createCheckoutSession({
  customerEmail,
  metadata = {}
}) {
  return await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: customerEmail,
    line_items: [
      {
        price: STRIPE_PRICE_ID,
        quantity: 1
      }
    ],
    success_url: getSuccessUrl(),
    cancel_url: getCancelUrl(),
    metadata
  });
}

// ================================
// Webhook Handler
// ================================
export function constructWebhookEvent(rawBody, signature) {
  if (!STRIPE_WEBHOOK_SECRET) {
    throw new Error("❌ STRIPE_WEBHOOK_SECRET is missing");
  }

  return stripe.webhooks.constructEvent(
    rawBody,
    signature,
    STRIPE_WEBHOOK_SECRET
  );
}

// ================================
// Export Stripe client (optional)
// ================================
export default stripe;
