const Stripe = require('stripe');
const { updateSubscriptionStatus } = require('./firebase');

const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_BIDSMITH_FULL || process.env.STRIPE_PRICE_ID;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
const stripeClient = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY) : null;

function assertStripeConfigured() {
  if (!stripeClient) {
    throw new Error('Stripe is not configured. Set STRIPE_SECRET_KEY in .env.local');
  }
}

function getSuccessUrl() {
  const base = process.env.FRONTEND_URL || 'http://localhost:5173';
  return `${base}/payment/success`;
}

function getCancelUrl() {
  const base = process.env.FRONTEND_URL || 'http://localhost:5173';
  return `${base}/payment/cancel`;
}

/**
 * Create Stripe Checkout Session for £1,490 payment
 */
async function createCheckoutSession({ userId, userEmail, bidId }) {
  assertStripeConfigured();

  if (!STRIPE_PRICE_ID) {
    throw new Error('STRIPE_PRICE_ID not configured in environment');
  }

  try {
    const session = await stripeClient.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: STRIPE_PRICE_ID,
          quantity: 1
        }
      ],
      success_url: `${getSuccessUrl()}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: getCancelUrl(),
      client_reference_id: userId,
      customer_email: userEmail,
      metadata: {
        userId,
        bidId,
        product: 'BidSmith ASF Full Access',
        purchaseDate: new Date().toISOString()
      },
      allow_promotion_codes: true
    });

    console.log('✅ Checkout session created:', session.id);

    return {
      sessionId: session.id,
      url: session.url
    };
  } catch (error) {
    console.error('❌ Stripe checkout error:', error);
    throw new Error(`Failed to create checkout: ${error.message}`);
  }
}

/**
 * Verify checkout session
 */
async function verifyCheckoutSession(sessionId) {
  assertStripeConfigured();

  try {
    const session = await stripeClient.checkout.sessions.retrieve(sessionId);

    return {
      id: session.id,
      paymentStatus: session.payment_status,
      customerEmail: session.customer_email,
      amountTotal: session.amount_total / 100,
      currency: (session.currency || 'gbp').toUpperCase(),
      metadata: session.metadata,
      isSuccessful: session.payment_status === 'paid'
    };
  } catch (error) {
    console.error('❌ Verification error:', error);
    throw new Error('Invalid session ID');
  }
}

/**
 * Handle Stripe webhooks
 */
async function handleWebhook(req) {
  assertStripeConfigured();

  const sig = req.headers['stripe-signature'];

  if (!sig) {
    throw new Error('Missing stripe-signature header');
  }

  let event;

  try {
    event = stripeClient.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('⚠️ Webhook signature failed:', err.message);
    throw new Error('Invalid webhook signature');
  }

  console.log('📨 Webhook event:', event.type);

  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutCompleted(event.data.object);
      break;
    case 'payment_intent.succeeded':
      console.log('✅ Payment succeeded:', event.data.object.id);
      break;
    case 'payment_intent.payment_failed':
      console.error('❌ Payment failed:', event.data.object.id);
      break;
    default:
      console.log('ℹ️ Unhandled event:', event.type);
  }

  return { received: true };
}

async function handleCheckoutCompleted(session) {
  const { client_reference_id: userId, metadata } = session;

  console.log('✅ Checkout completed:', {
    userId,
    bidId: metadata?.bidId,
    amount: session.amount_total / 100
  });

  try {
    if (userId) {
      await updateSubscriptionStatus(userId, {
        status: 'active',
        plan: 'full_access',
        amount: session.amount_total / 100,
        currency: (session.currency || 'gbp').toUpperCase(),
        stripeSessionId: session.id,
        stripeCustomerId: session.customer
      });
    }
  } catch (err) {
    console.error('❌ Firestore update error:', err.message);
  }
}

/**
 * Get payment details with receipt
 */
async function getPaymentDetails(sessionId) {
  assertStripeConfigured();

  try {
    const session = await stripeClient.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent', 'line_items']
    });

    return {
      id: session.id,
      amount: session.amount_total / 100,
      currency: (session.currency || 'gbp').toUpperCase(),
      status: session.payment_status,
      email: session.customer_email,
      createdAt: new Date(session.created * 1000).toISOString(),
      receiptUrl: session.payment_intent?.charges?.data[0]?.receipt_url
    };
  } catch (error) {
    throw new Error('Payment not found');
  }
}

module.exports = {
  createCheckoutSession,
  verifyCheckoutSession,
  handleWebhook,
  getPaymentDetails
};
