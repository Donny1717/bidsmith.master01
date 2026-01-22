// backend/src/api/signature.js
const crypto = require('crypto');
const { admin, getDb, initFirebaseAdmin } = require('./firebase');

initFirebaseAdmin();
const db = getDb();

function ensureSignatureInput(payload) {
  const { userId, bidId, signatureData, signatoryName } = payload;
  if (!userId || !bidId || !signatureData || !signatoryName) {
    throw new Error('userId, bidId, signatureData, and signatoryName are required');
  }
  if (!signatureData.startsWith('data:image/png;base64,')) {
    throw new Error('Signature must be PNG image in base64 format');
  }
}

async function saveSignature(data) {
  ensureSignatureInput(data);

  const signatureId = `sig_${Date.now()}_${crypto.randomBytes(6).toString('hex')}`;
  const timestamp = data.timestamp || new Date().toISOString();
  const auditData = `${data.userId}|${data.bidId}|${data.signatoryName}|${timestamp}`;
  const auditHash = crypto.createHash('sha256').update(auditData).digest('hex');

  const record = {
    id: signatureId,
    userId: data.userId,
    bidId: data.bidId,
    signatureData: data.signatureData,
    signatoryName: data.signatoryName,
    signatoryPosition: data.signatoryPosition || 'Director',
    timestamp,
    ipAddress: data.ipAddress,
    userAgent: data.userAgent,
    auditHash,
    compliance: {
      standard: 'UK Electronic Communications Act 2000',
      eIDASEquivalent: true,
      tamperProof: true,
    },
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  await db.collection('signatures').doc(signatureId).set(record);
  await db
    .collection('bids')
    .doc(data.bidId)
    .set(
      {
        signatureId,
        signedAt: timestamp,
        signedBy: data.signatoryName,
        signatureStatus: 'signed',
      },
      { merge: true }
    );

  console.info('[signature] saved', signatureId);
  return { id: signatureId, timestamp, signatoryName: data.signatoryName, auditHash, ipAddress: data.ipAddress };
}

async function getSignature(bidId) {
  const snap = await db.collection('signatures').where('bidId', '==', bidId).limit(1).get();
  if (snap.empty) return null;
  const doc = snap.docs[0];
  return { id: doc.id, ...doc.data() };
}

async function verifySignature(signatureId) {
  const doc = await db.collection('signatures').doc(signatureId).get();
  if (!doc.exists) return { valid: false, reason: 'Signature not found' };

  const signature = doc.data();
  const auditData = `${signature.userId}|${signature.bidId}|${signature.signatoryName}|${signature.timestamp}`;
  const calculatedHash = crypto.createHash('sha256').update(auditData).digest('hex');

  if (calculatedHash !== signature.auditHash) {
    return { valid: false, reason: 'Signature has been tampered with' };
  }

  return {
    valid: true,
    signedBy: signature.signatoryName,
    signedAt: signature.timestamp,
    ipAddress: signature.ipAddress,
  };
}

module.exports = {
  saveSignature,
  getSignature,
  verifySignature,
};
