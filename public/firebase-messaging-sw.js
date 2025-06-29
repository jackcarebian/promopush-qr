// Import and initialize the Firebase SDK
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging/sw';

const firebaseConfig = {
  apiKey: "AIzaSyASqEDrSRQ0ZgOW8V5NMALQ1RBtTp8o5mI",
  authDomain: "promopush-qr.firebaseapp.com",
  projectId: "promopush-qr",
  storageBucket: "promopush-qr.appspot.com",
  messagingSenderId: "246705033642",
  appId: "1:246705033642:web:b244307a45314efa6f1bd3"
};

// Initialize the Firebase app in the service worker
// using the same pattern as the main app to avoid conflicts.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const messaging = getMessaging(app);

// The service worker is now correctly set up to handle background notifications.
// You can add event listeners here for 'push' events if you need custom
// background notification handling in the future.
