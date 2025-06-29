// This file must be in the public folder.
// It's used by Firebase Messaging to handle background notifications.

// Firebase SDKs are imported dynamically.
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

// The service worker is initialized with the Firebase config passed via URL parameters
// when the service worker is registered in register-form.tsx.
const urlParams = new URLSearchParams(location.search);
const firebaseConfigParam = urlParams.get('firebaseConfig');

if (firebaseConfigParam) {
    try {
        const firebaseConfig = JSON.parse(firebaseConfigParam);
        firebase.initializeApp(firebaseConfig);

        const messaging = firebase.messaging();

        // Optional: Handle background messages here.
        // This allows you to show notifications even when the app is not in the foreground.
        messaging.onBackgroundMessage((payload) => {
            console.log(
                '[firebase-messaging-sw.js] Received background message ',
                payload
            );

            const notificationTitle = payload.notification.title;
            const notificationOptions = {
                body: payload.notification.body,
                icon: '/icon.png' // Optional: path to a public icon
            };

            self.registration.showNotification(notificationTitle, notificationOptions);
        });
    } catch (e) {
        console.error('Error initializing Firebase in service worker', e);
    }
} else {
    console.error('Firebase config not found in service worker URL.');
}
