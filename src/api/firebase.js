const admin = require('firebase-admin');

// Initialize Firebase Admin
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
 * Update user subscription after payment
 */
async function updateSubscriptionStatus(userId, subscriptionData) {
  try {
    const userRef = db.collection('users').doc(userId);

    await userRef.set(
      {
        subscription: subscriptionData,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      },
      { merge: true }
    );

    console.log('✅ Subscription updated:', userId);
  } catch (error) {
    console.error('❌ Subscription update error:', error);
    throw error;
  }
}

/**
 * Get user by email
 */
async function getUserByEmail(email) {
  try {
    const snapshot = await db.collection('users').where('email', '==', email).limit(1).get();

    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    console.error('❌ Get user error:', error);
    throw error;
  }
}

/**
 * Get user subscription status
 */
async function getUserSubscription(userId) {
  try {
    const userDoc = await db.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      return null;
    }

    return userDoc.data().subscription || null;
  } catch (error) {
    console.error('❌ Failed to get subscription:', error);
    return null;
  }
}

module.exports = {
  updateSubscriptionStatus,
  getUserByEmail,
  getUserSubscription,
  db,
  admin
};
