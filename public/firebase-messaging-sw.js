
// This file must be in the public directory
// Import the Firebase app and messaging packages.
// The versions must match the ones in package.json
importScripts('https://www.gstatic.com/firebasejs/11.9.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.9.1/firebase-messaging-compat.js');

// We need to fetch the config from the server, because we can't use
// process.env here.
//
// The server will respond with a script that we can import.
importScripts('/api/firebase-config-script');

// It's very important that you call this function.
// Otherwise, the service worker will not be able to handle notifications.
if (self.firebaseConfig) {
  firebase.initializeApp(self.firebaseConfig);

  // Retrieve an instance of Firebase Messaging so that it can handle background
  // messages.
  const messaging = firebase.messaging();

  messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.image,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
}
