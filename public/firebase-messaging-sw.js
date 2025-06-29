
// This script is executed in a service worker context
// It must be able to initialize Firebase Messaging to handle background notifications

try {
    // Dynamically import the configuration from a dedicated API endpoint
    // This is the most reliable way to get environment variables into a service worker
    importScripts('/api/firebase-config-script');

    // These imports are needed for Firebase v9+ modular SDK
    importScripts('https://www.gstatic.com/firebasejs/10.12.3/firebase-app-compat.js');
    importScripts('https://www.gstatic.com/firebasejs/10.12.3/firebase-messaging-compat.js');

    if (self.firebaseConfig && self.firebaseConfig.apiKey) {
        // Initialize Firebase with the fetched config
        firebase.initializeApp(self.firebaseConfig);

        // Get an instance of Firebase Messaging
        const messaging = firebase.messaging();

        // Set a handler for background messages
        messaging.onBackgroundMessage((payload) => {
            console.log('[firebase-messaging-sw.js] Received background message: ', payload);

            // Customize the notification that will be shown to the user
            const notificationTitle = payload.notification?.title || 'Promo Baru!';
            const notificationOptions = {
                body: payload.notification?.body || 'Cek promo terbaru dari kami.',
                icon: '/logo-192.png' // A default icon for notifications
            };

            // Display the notification
            self.registration.showNotification(notificationTitle, notificationOptions);
        });

        console.log('[firebase-messaging-sw.js] Firebase initialized successfully.');

    } else {
        console.error('[firebase-messaging-sw.js] Firebase config not found or invalid. Background messaging will not work.');
    }

} catch (error) {
    console.error('[firebase-messaging-sw.js] Error initializing service worker:', error);
}

// Good practice: ensure the new service worker activates immediately
self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
});
