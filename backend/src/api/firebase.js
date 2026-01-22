const { admin, getDb, initFirebaseAdmin } = require('./firebaseAdmin');

async function updateSubscriptionStatus(uid, updates) {
  if (!uid) {
    throw new Error('uid is required to update subscription status');
  }

  initFirebaseAdmin();

  const payload = {
    ...updates,
    updated_at: admin.firestore.FieldValue.serverTimestamp()
  };

  await getDb().collection('users').doc(uid).set(payload, { merge: true });
  return payload;
}

module.exports = {
  admin,
  getDb,
  updateSubscriptionStatus
};
