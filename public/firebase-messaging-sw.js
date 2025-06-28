
importScripts("https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js");

// NOTE: This configuration is duplicated from the main app.
// In a real-world scenario, you might pass this configuration via a query string
// during service worker registration to keep it in one place.
firebase.initializeApp({
  apiKey: "AIzaSyASqEDrSRQ0ZgOW8V5NMALQ1RBtTp8o5mI",
  authDomain: "promopush-qr.firebaseapp.com",
  projectId: "promopush-qr",
  storageBucket: "promopush-qr.firebasestorage.app",
  messagingSenderId: "246705033642",
  appId: "1:246705033642:web:b244307a45314efa6f1bd3"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[SW] Pesan latar belakang diterima:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    // icon can be added here if you have one in the /public folder
    // e.g., icon: '/logo-192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
