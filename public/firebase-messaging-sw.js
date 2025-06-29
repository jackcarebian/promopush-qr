// Using compat libraries for broader browser support in service workers
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js");

// This configuration is public and safe to expose in a client-side file.
const firebaseConfig = {
  apiKey: "AIzaSyASqEDrSRQ0ZgOW8V5NMALQ1RBtTp8o5mI",
  authDomain: "promopush-qr.firebaseapp.com",
  projectId: "promopush-qr",
  storageBucket: "promopush-qr.appspot.com",
  messagingSenderId: "246705033642",
  appId: "1:246705033642:web:b244307a45314efa6f1bd3"
};

// Only initialize if the config is valid
if (firebaseConfig && firebaseConfig.apiKey) {
    firebase.initializeApp(firebaseConfig);

    const messaging = firebase.messaging();

    // Optional: Handle background messages
    messaging.onBackgroundMessage(function(payload) {
      console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload
      );

      // Customize notification here
      const notificationTitle = payload.notification.title || "Promo Baru!";
      const notificationOptions = {
        body: payload.notification.body,
      };

      self.registration.showNotification(notificationTitle, notificationOptions);
    });
} else {
    console.log("Firebase config not found, service worker not initialized.");
}
