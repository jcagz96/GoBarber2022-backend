import * as admin from 'firebase-admin';
import 'dotenv/config';

// Initialize our project application
export const firebase = admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/gm, "\n"),
    projectId: process.env.FIREBASE_PROJECT_ID
  }),
});

