import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getMessaging, type Messaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let messaging: Messaging | null = null;

// Only initialize Firebase if the configuration is valid.
const isConfigValid = firebaseConfig.projectId && firebaseConfig.apiKey;

if (isConfigValid) {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  db = getFirestore(app);
  if (typeof window !== 'undefined') {
    try {
      // Messaging requires a service worker which might not be set up,
      // so we'll wrap this in a try-catch to prevent crashes.
      messaging = getMessaging(app);
    } catch (error) {
      console.error("Could not initialize Firebase Messaging.", error);
    }
  }
}

export { db, messaging, app };
