// Import skrip Firebase
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

try {
    // Ambil konfigurasi Firebase dari parameter URL
    const urlParams = new URLSearchParams(location.search);
    const firebaseConfigParam = urlParams.get('firebaseConfig');
    
    if (!firebaseConfigParam) {
        console.error('Konfigurasi Firebase tidak ditemukan di URL service worker.');
    } else {
        const firebaseConfig = JSON.parse(decodeURIComponent(firebaseConfigParam));
        
        // Inisialisasi Firebase
        firebase.initializeApp(firebaseConfig);

        const messaging = firebase.messaging();

        // Tangani pesan notifikasi saat aplikasi berada di background
        messaging.onBackgroundMessage((payload) => {
            console.log(
                '[firebase-messaging-sw.js] Menerima pesan background ',
                payload,
            );
            
            const notificationTitle = payload.notification.title || 'Notifikasi Baru';
            const notificationOptions = {
                body: payload.notification.body || 'Anda punya pesan baru.',
                icon: '/logo.png', // Ganti dengan path ke logo Anda
            };

            self.registration.showNotification(notificationTitle, notificationOptions);
        });
    }
} catch (e) {
    console.error('Error di service worker:', e);
}
