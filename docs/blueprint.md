# **App Name**: PromoPush QR

## Core Features:

- Akses Kode QR: Pemindaian kode QR untuk akses langsung ke formulir pendaftaran.
- Formulir Pendaftaran: Menampilkan formulir di peramban yang memungkinkan pengguna memasukkan nama, email, whatsapp dan preferensi minat promo. Kemudian klik tombol saya terima notifikasi promo (otomatis terinput di database pelanggan), kemudian disimpan ke Firebase. Pengguna mengonfirmasi izin untuk mengirim notifikasi push.
- Penyimpanan Data Firestore: Data dari formulir pendaftaran disimpan di Firestore, termasuk nama, email, preferensi yang dipilih, token perangkat (dari Firebase Messaging), dan stempel waktu pendaftaran.
- Notifikasi Push Web: Firebase Cloud Messaging (FCM) memungkinkan pengiriman notifikasi push web setelah izin pengguna diberikan; token perangkat pelanggan disimpan ke Firestore.
- Halaman Kasir untuk Masukan Kode: Halaman khusus untuk kasir, untuk memasukkan kode unik.
- Pencatatan Penebusan: Mencatat setiap kali promosi digunakan.
- Tool pemasaran AI: Gunakan tool untuk membuat salinan pemasaran dinamis berdasarkan jenis bisnis.
- Halaman Kampanye: Halaman kampanye, untuk membuat kampanye yang bisa menyisipkan gambar dan fitur drag and drop, kirim kampanye sekarang atau terjadwal. Terapkan loading bar 0-100% proses kirim kampanye
- Database Pelanggan: Halaman database pelanggan untuk menyimpan pendaftaran pelanggan
- Halaman Kalender Kampanye: Halaman kalender, untuk melihat jadwal kampanye ayng akan datang atau sudah berakhir (buat contoh 5 kampanye)
- Halaman Utama: Halaman utama sebagai landing page. Promosikan web dengan nama Notiflayer (icon lonceng) , tag line : Semua yang anda perlukan untuk memulai kampanye promo yang efektid dan sukses , tampikan juga feature yang ada
- Halaman Login Demo: Halaman login Demo : Untuk Admin (email dan password) dan operator (email dan password) , batasi akses hapus dan laporan untuk operator
- Langganan QR Kode: Langganan QR Kode penghasil kode QR(outket) dan penghasil kode QR outlet Kasir

## Style Guidelines:

- Biru elegan
- Abu-abu lembut
- Putih
- Font badan dan tajuk: 'PT Sans' (sans-serif) untuk memastikan keterbacaan yang baik di berbagai perangkat, dipadukan dengan 'Playfair' (serif) untuk tajuk, untuk menyampaikan kesan kelas atas yang elegan dan modis.
- Ikon sederhana dan jelas yang sesuai dengan gaya modern aplikasi. Ikon-ikon ini harus mewakili kategori preferensi yang berbeda.
- Animasi halus saat pemindaian kode QR berhasil, pengiriman formulir, dan pengiriman notifikasi untuk meningkatkan pengalaman pengguna.
- Tata letak yang bersih dan lugas untuk memastikan kemudahan penggunaan bagi pelanggan dan staf. Desain menekankan keterbacaan.
- Buat tampilan web bersih dan profesional
- Buat web responsive smartphone, tablet dan PC
- Warna tombol biru elegan
- Warna background putih clear
- Warna garis atau batas abu abu elegan halus