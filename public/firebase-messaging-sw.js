// This file must be in the public folder.

// These scripts are required for the service worker to work.
importScripts("https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js");

// Initialize the Firebase app in the service worker with the same config.
// IMPORTANT: These values are hardcoded for the demo and should be
// replaced with a secure method of loading configuration in a production environment.
firebase.initializeApp({
  apiKey: "AIzaSyASqEDrSRQ0ZgOW8V5NMALQ1RBtTp8o5mI",
  authDomain: "promopush-qr.firebaseapp.com",
  projectId: "promopush-qr",
  storageBucket: "promopush-qr.firebasestorage.app",
  messagingSenderId: "246705033642",
  appId: "1:246705033642:web:b244307a45314efa6f1bd3"
});

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
