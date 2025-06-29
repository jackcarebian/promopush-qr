// Scripts for Firebase
importScripts('https://www.gstatic.com/firebasejs/11.9.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.9.1/firebase-messaging-compat.js');

// Get Firebase config from query string passed from the client.
const urlParams = new URLSearchParams(location.search);
const firebaseConfig = {
    apiKey: urlParams.get('apiKey'),
    authDomain: urlParams.get('authDomain'),
    projectId: urlParams.get('projectId'),
    storageBucket: urlParams.get('storageBucket'),
    messagingSenderId: urlParams.get('messagingSenderId'),
    appId: urlParams.get('appId'),
};

// Initialize the Firebase app in the service worker if config is valid
if (firebaseConfig.apiKey && firebaseConfig.projectId) {
    firebase.initializeApp(firebaseConfig);
    
    // Retrieve an instance of Firebase Messaging so that it can handle background messages.
    const messaging = firebase.messaging();
    
    messaging.onBackgroundMessage((payload) => {
        console.log('[firebase-messaging-sw.js] Received background message ', payload);
        
        // Customize notification here
        const notificationTitle = payload.notification?.title || 'Notifikasi Baru';
        const notificationOptions = {
            body: payload.notification?.body || 'Anda punya pesan baru.',
            // You can add an icon here, e.g., icon: '/logo.png'
        };
        
        self.registration.showNotification(notificationTitle, notificationOptions);
    });
} else {
    console.error('Service Worker: Firebase config not found in query parameters.');
}
