
export const interestCategories: Record<string, { emoji: string; interests: { id: string; label: string }[] }> = {
    "Cafe, Resto, Foodcourt": {
        emoji: "🍽️",
        interests: [
            { id: "promo-makanan", label: "Promo Makanan" },
            { id: "promo-minuman", label: "Promo Minuman" },
            { id: "menu-baru", label: "Menu Baru" },
            { id: "diskon-spesial-hari", label: "Diskon Spesial Hari Tertentu (Senin Hemat, Jumat Ngopi)" }
        ]
    },
    "Butik & Aksesoris": {
        emoji: "👗",
        interests: [
            { id: "promo-pakaian", label: "Promo Pakaian" },
            { id: "promo-tas-sepatu", label: "Promo Tas, Sepatu, Sandal" },
            { id: "koleksi-terbaru", label: "Koleksi Terbaru" },
            { id: "flash-sale", label: "Flash Sale (Diskon Kilat)" }
        ]
    },
    "Kosmetik & Skincare": {
        emoji: "💄",
        interests: [
            { id: "promo-makeup", label: "Promo Makeup (Lipstik, Eyeliner, dll)" },
            { id: "promo-skincare", label: "Promo Skincare (Serum, Masker, Toner)" },
            { id: "produk-baru-kosmetik", label: "Produk Baru" },
            { id: "tips-tutorial", label: "Tips & Cara Pakai (Tutorial Singkat)" }
        ]
    },
    "Elektronik & Gadget": {
        emoji: "📱",
        interests: [
            { id: "promo-hp-aksesoris", label: "Promo HP & Aksesoris" },
            { id: "promo-laptop-gadget", label: "Promo Laptop / Gadget" },
            { id: "tips-perawatan", label: "Tips Perawatan / Penggunaan" },
            { id: "barang-second", label: "Barang Second Berkualitas" }
        ]
    },
    "Furnitur & Dekorasi": {
        emoji: "🏠",
        interests: [
            { id: "promo-perabot", label: "Promo Perabot Rumah" },
            { id: "diskon-dekorasi", label: "Diskon Dekorasi Rumah Minimalis" },
            { id: "produk-custom", label: "Produk Custom / Limited" },
            { id: "tips-dekor", label: "Tips Dekor Rumah (Short Notif)" }
        ]
    },
    "Toko Kue & Snack": {
        emoji: "🧁",
        interests: [
            { id: "promo-kue-ultah", label: "Promo Kue Ulang Tahun" },
            { id: "snack-kekinian", label: "Snack Kekinian" },
            { id: "po-spesial", label: "PO (Pre Order) Spesial" },
            { id: "event-tester", label: "Event Uji Coba Rasa Baru" }
        ]
    },
    "Salon & Perawatan": {
        emoji: "💇",
        interests: [
            { id: "diskon-potong-rambut", label: "Diskon Potong Rambut" },
            { id: "promo-creambath-spa", label: "Promo Creambath / Spa" },
            { id: "jadwal-member", label: "Jadwal Khusus Member" },
            { id: "tips-rambut", label: "Tips Perawatan Rambut di Rumah" }
        ]
    },
    "Toko Online": {
        emoji: "🛒",
        interests: [
            { id: "flash-sale-online", label: "Flash Sale" },
            { id: "diskon-spesial", label: "Diskon Spesial" },
            { id: "promo-gratis-ongkir", label: "Promo Gratis Ongkir" },
            { id: "produk-baru-online", label: "Produk Baru" }
        ]
    },
    "Bengkel & Otomotif": {
        emoji: "🛠️",
        interests: [
            { id: "promo-servis", label: "Promo Servis Rutin" },
            { id: "diskon-suku-cadang", label: "Diskon Suku Cadang" },
            { id: "info-perawatan-otomotif", label: "Info Perawatan Kendaraan" },
            { id: "promo-cuci-kendaraan", label: "Promo Cuci Kendaraan" }
        ]
    },
    "Jasa & Profesional": {
        emoji: "🧺",
        interests: [
            { id: "promo-laundry", label: "Promo Laundry Kiloan" },
            { id: "diskon-cleaning-service", label: "Diskon Jasa Kebersihan" },
            { id: "penawaran-khusus-jasa", label: "Penawaran Khusus (Fotografi, Desain)" },
            { id: "tips-trik-profesional", label: "Tips & Trik Bermanfaat" }
        ]
    },
    "Kesehatan & Kebugaran": {
        emoji: "💪",
        interests: [
            { id: "promo-membership-gym", label: "Promo Membership Gym" },
            { id: "diskon-kelas-yoga", label: "Diskon Kelas Yoga / Pilates" },
            { id: "info-event-sehat", label: "Info Event Olahraga / Kesehatan" },
            { id: "tips-nutrisi", label: "Tips Nutrisi & Gaya Hidup Sehat" }
        ]
    },
    "Hiburan & Hobi": {
        emoji: "🎟️",
        interests: [
            { id: "promo-tiket-nonton", label: "Promo Tiket Nonton Bioskop" },
            { id: "diskon-buku-game", label: "Diskon Buku atau Game" },
            { id: "jadwal-rilis-baru", label: "Jadwal Rilis Film/Buku Baru" },
            { id: "event-komunitas-hobi", label: "Info Event Komunitas" }
        ]
    }
};

export const businessCategories = Object.keys(interestCategories);
