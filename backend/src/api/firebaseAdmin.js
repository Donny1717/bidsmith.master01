const admin = require('firebase-admin');

function validateEnv() {
  const missing = [];
  if (!process.env.FIREBASE_PROJECT_ID) missing.push('FIREBASE_PROJECT_ID');
  if (!process.env.FIREBASE_CLIENT_EMAIL) missing.push('FIREBASE_CLIENT_EMAIL');
  if (!process.env.FIREBASE_PRIVATE_KEY) missing.push('FIREBASE_PRIVATE_KEY');

  if (missing.length) {
    throw new Error(
      `Missing Firebase env vars: ${missing.join(
        ', '
      )}. Ensure FIREBASE_PRIVATE_KEY is a single line with \\n escapes.`
    );
  }
}

function initFirebaseAdmin() {
  if (admin.apps.length) {
    return admin.app();
  }

  validateEnv();

  const app = admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    })
  });

  return app;
}

function getDb() {
  return admin.firestore(initFirebaseAdmin());
}

module.exports = {
  admin,
  initFirebaseAdmin,
  getDb
};
