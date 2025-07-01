import type { interestCategories } from "@/app/dashboard/campaigns/data/categories";

export interface OutletData {
    id: string;
    name: string;
    location: string;
    businessCategory: keyof typeof interestCategories;
}

export const outlets: OutletData[] = [
  {
    id: "outlet-001",
    name: "Kedai Kopi Anyar",
    location: "Boyolali, Jawa Tengah",
    businessCategory: "Cafe, Resto, Foodcourt",
  },
  {
    id: "outlet-002",
    name: "Griya Batik Kencana",
    location: "Solo, Jawa Tengah",
    businessCategory: "Butik & Aksesoris",
  },
  {
    id: "outlet-003",
    name: "Omah Cantik Raras",
    location: "Semarang, Jawa Tengah",
    businessCategory: "Salon & Perawatan",
  },
   {
    id: "outlet-004",
    name: "Toko Roti & Jajan Pasar Bu Warni",
    location: "Kudus, Jawa Tengah",
    businessCategory: "Toko Kue & Snack",
  },
  {
    id: "outlet-005",
    name: "UMKM Digital 'Guyub Rukun'",
    location: "Online - Pusat di Magelang",
    businessCategory: "Toko Online",
  },
  {
    id: "outlet-006",
    name: "Jaya Elektronik",
    location: "Surabaya, Jawa Timur",
    businessCategory: "Elektronik & Gadget",
  },
  {
    id: "outlet-007",
    name: "Kedai Kopi Anyar (Bandung)",
    location: "Bandung, Jawa Barat",
    businessCategory: "Cafe, Resto, Foodcourt",
  },
  {
    id: "outlet-008",
    name: "Glamour Kosmetik",
    location: "Jakarta Selatan, DKI Jakarta",
    businessCategory: "Kosmetik & Skincare",
  },
  {
    id: "outlet-009",
    name: "Bengkel Maju Jaya Motor",
    location: "Yogyakarta, DIY",
    businessCategory: "Bengkel & Otomotif",
  },
  {
    id: "outlet-010",
    name: "KlinKlin Laundry",
    location: "Denpasar, Bali",
    businessCategory: "Jasa & Profesional",
  },
  {
    id: "outlet-011",
    name: "Pusat Kebugaran Bugar Selalu",
    location: "Medan, Sumatera Utara",
    businessCategory: "Kesehatan & Kebugaran",
  },
  {
    id: "outlet-012",
    name: "Toko Buku 'Cakrawala Ilmu'",
    location: "Makassar, Sulawesi Selatan",
    businessCategory: "Hiburan & Hobi",
  },
];

export const getOutletById = (id: string | null): OutletData | undefined => {
    if (!id) return undefined;
    return outlets.find(o => o.id === id);
}
