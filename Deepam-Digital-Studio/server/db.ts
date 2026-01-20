import admin from "firebase-admin";

// Check if Firebase config is set
if (!process.env.FIREBASE_PROJECT_ID) {
  throw new Error("FIREBASE_PROJECT_ID must be set in environment variables");
}

// Initialize Firebase Admin SDK with service account
let app;
if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
  } catch (err) {
    console.error("Failed to parse service account key:", err);
    throw new Error("Invalid FIREBASE_SERVICE_ACCOUNT_KEY format");
  }
} else {
  throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY must be set in environment variables");
}

export const db = admin.firestore();
