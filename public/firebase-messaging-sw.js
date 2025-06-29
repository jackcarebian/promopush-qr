
// Use the modern compat libraries for service workers.
// The version should ideally match the one used in your package.json, but using a recent static version is fine.
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

// IMPORTANT: This configuration must match the one in your main app.
// Since environment variables aren't available in service workers, we hardcode them.
// Ensure these values are correct and match your .env file.
const firebaseConfig = {
  apiKey: "AIzaSyASqEDrSRQ0ZgOW8V5NMALQ1RBtTp8o5mI",
  authDomain: "promopush-qr.firebaseapp.com",
  projectId: "promopush-qr",
  storageBucket: "promopush-qr.appspot.com",
  messagingSenderId: "246705033642",
  appId: "1:246705033642:web:b244307a45314efa6f1bd3"
};

// Initialize Firebase
try {
  const app = firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();
  
  console.log('Firebase Messaging Service Worker Initialized Successfully.');

  // Optional: Set a background message handler.
  // This is triggered when the app is in the background or closed.
  messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message: ', payload);

    // Customize the notification that will be shown to the user.
    const notificationTitle = payload.notification.title || 'Promo Baru!';
    const notificationOptions = {
      body: payload.notification.body || 'Cek promo terbaru dari kami.',
      icon: '/logo-192.png' // Make sure you have an icon at this path
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
} catch (e) {
  console.error('Error initializing Firebase in Service Worker:', e);
}
