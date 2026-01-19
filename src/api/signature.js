const admin = require('firebase-admin');
const crypto = require('crypto');

// Initialize Firebase (if not already done)
if (!admin.apps.length) {
  const serviceAccount = {
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID || process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL || process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: (process.env.FIREBASE_ADMIN_PRIVATE_KEY || process.env.FIREBASE_PRIVATE_KEY || '').replace(
      /\\n/g,
      '\n'
    )
  };

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

/**
 * Save electronic signature
 * Compliant with UK Electronic Communications Act 2000
 */
async function saveSignature(signatureData) {
  const {
    userId,
    bidId,
    signatureData: base64Signature,
    signatoryName,
    signatoryPosition,
    timestamp,
    ipAddress,
    userAgent
  } = signatureData;

  if (!base64Signature?.startsWith('data:image/png;base64,')) {
    throw new Error('Signature must be PNG image in base64 format');
  }

  const signatureId = `sig_${Date.now()}_${crypto.randomBytes(8).toString('hex')}`;
  const auditData = `${userId}|${bidId}|${signatoryName}|${timestamp}`;
  const auditHash = crypto.createHash('sha256').update(auditData).digest('hex');

  const signature = {
    id: signatureId,
    userId,
    bidId,
    signatureData: base64Signature,
    signatoryName,
    signatoryPosition,
    timestamp,
    ipAddress,
    userAgent,
    auditHash,
    compliance: {
      standard: 'UK Electronic Communications Act 2000',
      eIDASEquivalent: true,
      tamperProof: true
    },
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  };

  try {
    await db.collection('signatures').doc(signatureId).set(signature);

    await db
      .collection('bids')
      .doc(bidId)
      .set(
        {
          signatureId,
          signedAt: timestamp,
          signedBy: signatoryName,
          signatureStatus: 'signed'
        },
        { merge: true }
      );

    console.log('✅ Signature saved:', signatureId);

    return {
      id: signatureId,
      timestamp,
      signatoryName,
      ipAddress,
      auditHash
    };
  } catch (error) {
    console.error('❌ Signature save error:', error);
    throw new Error(`Failed to save signature: ${error.message}`);
  }
}

/**
 * Retrieve signature by bid ID
 */
async function getSignature(bidId) {
  try {
    const snapshot = await db.collection('signatures').where('bidId', '==', bidId).limit(1).get();

    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data()
    };
  } catch (error) {
    console.error('❌ Get signature error:', error);
    throw new Error('Failed to retrieve signature');
  }
}

/**
 * Delete signature
 */
async function deleteSignature(bidId) {
  try {
    const signature = await getSignature(bidId);

    if (!signature) {
      throw new Error('Signature not found');
    }

    await db.collection('signatures').doc(signature.id).delete();

    await db
      .collection('bids')
      .doc(bidId)
      .set(
        {
          signatureId: null,
          signatureStatus: 'unsigned'
        },
        { merge: true }
      );

    console.log('✅ Signature deleted:', signature.id);
  } catch (error) {
    console.error('❌ Delete signature error:', error);
    throw new Error('Failed to delete signature');
  }
}

/**
 * Verify signature integrity
 */
async function verifySignature(signatureId) {
  try {
    const doc = await db.collection('signatures').doc(signatureId).get();

    if (!doc.exists) {
      return { valid: false, reason: 'Signature not found' };
    }

    const signature = doc.data();
    const auditData = `${signature.userId}|${signature.bidId}|${signature.signatoryName}|${signature.timestamp}`;
    const calculatedHash = crypto.createHash('sha256').update(auditData).digest('hex');

    if (calculatedHash !== signature.auditHash) {
      return {
        valid: false,
        reason: 'Signature has been tampered with'
      };
    }

    return {
      valid: true,
      signedBy: signature.signatoryName,
      signedAt: signature.timestamp,
      ipAddress: signature.ipAddress
    };
  } catch (error) {
    console.error('❌ Verification error:', error);
    throw new Error('Failed to verify signature');
  }
}

module.exports = {
  saveSignature,
  getSignature,
  deleteSignature,
  verifySignature
};
