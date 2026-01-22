const admin = require("firebase-admin");

let firebaseApp = null;

function getMissingEnv() {
  const required = [
    "FIREBASE_PROJECT_ID",
    "FIREBASE_CLIENT_EMAIL",
    "FIREBASE_PRIVATE_KEY",
  ];
  return required.filter((k) => !process.env[k]);
}

function initFirebaseAdmin() {
  // already initialized
  if (firebaseApp) {
    return firebaseApp;
  }

  // already initialized elsewhere (hot reload / multiple imports)
  if (admin.apps && admin.apps.length) {
    firebaseApp = admin.app();
    return firebaseApp;
  }

  const missing = getMissingEnv();

  // 🚫 DEV SAFE MODE: do NOT crash server
  if (missing.length) {
    console.warn(
      "[firebaseAdmin] Firebase env missing, admin disabled:",
      missing.join(", ")
    );
    return null;
  }

  try {
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      }),
    });

    console.log("[firebaseAdmin] Firebase Admin initialized");
    return firebaseApp;
  } catch (err) {
    console.error("[firebaseAdmin] Init failed:", err.message);
    return null;
  }
}

module.exports = {
  admin,
  initFirebaseAdmin,
};
