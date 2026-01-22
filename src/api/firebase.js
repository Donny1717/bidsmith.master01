const { admin, getDb, initFirebaseAdmin } = require('./firebaseAdmin');

async function updateSubscriptionStatus(userId, subscriptionData) {
  try {
    initFirebaseAdmin();
    const userRef = getDb().collection('users').doc(userId);

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
    initFirebaseAdmin();
    const snapshot = await getDb()
      .collection('users')
      .where('email', '==', email)
      .limit(1)
      .get();

    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    console.error('❌ Get user error:', error);
    throw error;
  }
}

module.exports = {
  updateSubscriptionStatus,
  getUserByEmail,
  db: getDb(),
  admin
};
