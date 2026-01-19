/**
 * Firebase Admin initialization and Firestore helpers.
 */
import admin from 'firebase-admin';

let app;

function initializeFirebase() {
  if (app) return app;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

  const credential =
    projectId && privateKey && clientEmail
      ? admin.credential.cert({ projectId, privateKey, clientEmail })
      : admin.credential.applicationDefault();

  app = admin.initializeApp({ credential });
  return app;
}

const firebaseApp = initializeFirebase();
export const auth = admin.auth(firebaseApp);
export const db = admin.firestore(firebaseApp);
const { FieldValue } = admin.firestore;

export async function getUserProfile(uid) {
  if (!uid) return null;
  const ref = db.collection('users').doc(uid);
  const snap = await ref.get();

  if (!snap.exists) {
    const profile = {
      uid,
      subscription_status: 'inactive',
      created_at: FieldValue.serverTimestamp()
    };
    await ref.set(profile, { merge: true });
    return profile;
  }

  return snap.data();
}

export async function updateSubscriptionStatus(uid, updates) {
  if (!uid) return null;
  const ref = db.collection('users').doc(uid);
  const payload = {
    ...updates,
    updated_at: FieldValue.serverTimestamp()
  };
  await ref.set(payload, { merge: true });
  return payload;
}

export async function createTenderRecord({ uid, filename, contentType, parsedData }) {
  const ref = db.collection('tenders').doc();
  const record = {
    tender_id: ref.id,
    owner_uid: uid,
    uploaded_at: FieldValue.serverTimestamp(),
    filename,
    content_type: contentType,
    parsed_data: parsedData,
    raw_text: parsedData?.text || '',
    status: 'uploaded'
  };

  await ref.set(record, { merge: true });
  return { id: ref.id, ...record };
}

export async function getTenderById(tenderId) {
  if (!tenderId) return null;
  const snap = await db.collection('tenders').doc(tenderId).get();
  return snap.exists ? snap.data() : null;
}

export async function updateTenderAnalysis(tenderId, analysis) {
  if (!tenderId) return null;
  const ref = db.collection('tenders').doc(tenderId);
  const payload = {
    analyzed_data: analysis,
    analyzed_at: FieldValue.serverTimestamp(),
    status: 'analyzed'
  };
  await ref.set(payload, { merge: true });
  return { id: tenderId, ...payload };
}

export async function saveBidDraft({ tenderId, content, analysis, ownerUid }) {
  const ref = db.collection('bids').doc();
  const record = {
    bid_id: ref.id,
    tender_id: tenderId,
    owner_uid: ownerUid,
    generated_content: content,
    analyzed_data: analysis,
    status: 'draft',
    created_at: FieldValue.serverTimestamp()
  };

  await ref.set(record, { merge: true });
  return { id: ref.id, ...record };
}

export async function getBidById(bidId) {
  const snap = await db.collection('bids').doc(bidId).get();
  return snap.exists ? snap.data() : null;
}

export async function markBidSigned(bidId, signature) {
  const ref = db.collection('bids').doc(bidId);
  const payload = {
    signature,
    status: 'signed',
    signed_at: FieldValue.serverTimestamp()
  };
  await ref.set(payload, { merge: true });
  const snap = await ref.get();
  return snap.data();
}

export async function updateBidContent(bidId, content, status = 'draft') {
  const ref = db.collection('bids').doc(bidId);
  const payload = {
    generated_content: content,
    status,
    updated_at: FieldValue.serverTimestamp()
  };
  await ref.set(payload, { merge: true });
  const snap = await ref.get();
  return snap.data();
}

export async function logAuditEvent(event, payload, uid) {
  const ref = db.collection('audit_log').doc();
  const record = {
    event,
    payload,
    uid,
    created_at: FieldValue.serverTimestamp()
  };
  await ref.set(record);
  return record;
}
