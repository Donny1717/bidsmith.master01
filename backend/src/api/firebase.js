// backend/src/api/firebase.js
const admin = require('firebase-admin');

let app;
function initFirebaseAdmin() {
  if (app) return app;
  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL || process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = (process.env.FIREBASE_PRIVATE_KEY || process.env.FIREBASE_ADMIN_PRIVATE_KEY || '').replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    console.warn('[firebase] missing credentials; admin not initialized');
    return null;
  }

  app = admin.initializeApp({
    credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
  console.info('[firebase] initialized');
  return app;
}

function getDb() {
  const a = initFirebaseAdmin();
  if (!a) throw new Error('Firebase Admin not initialized');
  return admin.firestore(a);
}

function getBucket() {
  const a = initFirebaseAdmin();
  if (!a) throw new Error('Firebase Admin not initialized');
  if (!admin.storage().bucket()) throw new Error('Storage bucket not configured');
  return admin.storage().bucket();
}

async function updateSubscriptionStatus(userId, subscriptionData) {
  const db = getDb();
  await db
    .collection('users')
    .doc(userId)
    .set(
      { subscription: subscriptionData, updatedAt: admin.firestore.FieldValue.serverTimestamp() },
      { merge: true }
    );
  console.info('[firebase] subscription updated', userId);
}

async function saveTenderAnalysis(analysisId, data) {
  const db = getDb();
  await db.collection('tenders').doc(analysisId).set(data, { merge: true });
  console.info('[firebase] tender saved', analysisId);
}

async function getTenderAnalysis(analysisId) {
  const db = getDb();
  const snap = await db.collection('tenders').doc(analysisId).get();
  return snap.exists ? snap.data() : null;
}

async function saveBidContent(bidId, data) {
  const db = getDb();
  await db.collection('bids').doc(bidId).set(data, { merge: true });
  console.info('[firebase] bid content saved', bidId);
}

async function getBidContent(bidId) {
  const db = getDb();
  const snap = await db.collection('bids').doc(bidId).get();
  return snap.exists ? snap.data() : null;
}

async function uploadPDFToStorage(bidId, buffer, contentType = 'application/pdf') {
  const bucket = getBucket();
  const filePath = `pdfs/${bidId}.pdf`;
  const file = bucket.file(filePath);
  await file.save(buffer, { contentType, resumable: false, public: false });
  const [url] = await file.getSignedUrl({
    action: 'read',
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
  });
  console.info('[firebase] pdf uploaded', filePath);
  return url;
}

module.exports = {
  admin,
  initFirebaseAdmin,
  getDb,
  updateSubscriptionStatus,
  saveTenderAnalysis,
  getTenderAnalysis,
  saveBidContent,
  getBidContent,
  uploadPDFToStorage,
};
