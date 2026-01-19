/**
 * Firebase Cloud Functions for BidSmith ASF.
 * - Stripe webhook verification
 * - Background PDF generation
 * - Email notifications on signatures
 */
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Stripe = require('stripe');
const { PDFDocument, StandardFonts } = require('pdf-lib');
const nodemailer = require('nodemailer');

admin.initializeApp();
const db = admin.firestore();
const bucket = admin.storage().bucket();

const stripeSecret = process.env.STRIPE_SECRET_KEY || functions.config().stripe?.secret;
const stripeWebhookSecret =
  process.env.STRIPE_WEBHOOK_SECRET || functions.config().stripe?.webhook_secret;
const stripe = stripeSecret ? new Stripe(stripeSecret) : null;

const transporter =
  process.env.SMTP_HOST && process.env.SMTP_USER
    ? nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: false,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      })
    : null;

exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  if (!stripe || !stripeWebhookSecret) {
    return res.status(500).send('Stripe not configured');
  }

  const signature = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, signature, stripeWebhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const uid = session.metadata?.uid;
      if (uid) {
        await db.collection('users').doc(uid).set(
          {
            subscription_status: 'active',
            stripe_customer_id: session.customer,
            stripe_subscription_id: session.subscription,
            updated_at: admin.firestore.FieldValue.serverTimestamp()
          },
          { merge: true }
        );
      }
    }
    res.json({ received: true });
  } catch (err) {
    console.error('Stripe webhook processing failed', err);
    res.status(500).send('Webhook handler failed');
  }
});

exports.generateBidPdf = functions.firestore.document('bids/{bidId}').onCreate(async snapshot => {
  const data = snapshot.data();
  if (!data?.generated_content) return null;

  const doc = await PDFDocument.create();
  let page = doc.addPage([595.28, 841.89]); // A4
  const font = await doc.embedFont(StandardFonts.Helvetica);

  const text = typeof data.generated_content === 'string'
    ? data.generated_content
    : JSON.stringify(data.generated_content, null, 2);

  const wrapped = wrapText(text, 90);
  const textHeight = font.heightAtSize(11);
  let y = page.getHeight() - 40;

  wrapped.forEach(line => {
    page.drawText(line, { x: 40, y, size: 11, font });
    y -= textHeight + 2;
    if (y < 40) {
      page = doc.addPage([595.28, 841.89]);
      y = page.getHeight() - 40;
    }
  });

  const pdfBytes = await doc.save();
  const filePath = `bids/${snapshot.id}.pdf`;
  await bucket.file(filePath).save(pdfBytes, { contentType: 'application/pdf' });
  await snapshot.ref.set({ pdf_url: `gs://${bucket.name}/${filePath}` }, { merge: true });

  return null;
});

exports.notifyOnSignature = functions.firestore.document('bids/{bidId}').onUpdate(async change => {
  const before = change.before.data();
  const after = change.after.data();
  if (before.signature || !after.signature) return null;

  if (!transporter) {
    functions.logger.warn('Email transporter not configured; skipping notification.');
    return null;
  }

  const to = process.env.NOTIFY_TO || after.signature.email;
  const from = process.env.NOTIFY_FROM || process.env.SMTP_USER;

  await transporter.sendMail({
    to,
    from,
    subject: `Bid signed: ${after.bid_id || change.after.id}`,
    text: `Bid ${after.bid_id || change.after.id} signed by ${after.signature.name} on ${after.signature.signed_at}`
  });

  return null;
});

function wrapText(text, maxChars) {
  return text
    .split('\n')
    .flatMap(line => {
      if (line.length <= maxChars) return [line];
      const parts = [];
      let remaining = line;
      while (remaining.length > maxChars) {
        parts.push(remaining.slice(0, maxChars));
        remaining = remaining.slice(maxChars);
      }
      if (remaining) parts.push(remaining);
      return parts;
    })
    .map(line => line.trim());
}
