
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of a single campaign
export interface Campaign {
  title: string;
  date: string; // YYYY-MM-DD format
  status: "Akan Datang" | "Berakhir";
  description: string;
  image: string;
  dataAiHint: string;
  audience: number;
  variant: "default" | "secondary";
}

// Define the shape of the context
interface CampaignContextType {
  campaigns: Campaign[];
  addCampaign: (campaign: Campaign) => void;
}

// Initial data for campaigns, ensuring dates are in YYYY-MM-DD format
const initialCampaigns: Campaign[] = [
    // 3 Past Campaigns
  {
    title: "Diskon Kilat Ramadhan",
    date: "2024-04-05",
    status: "Berakhir",
    description: "Serbu diskon spesial hingga 70% untuk persiapan Lebaran. Baju baru, hati baru!",
    image: "https://placehold.co/600x400",
    dataAiHint: "ramadan sale",
    audience: 5200,
    variant: "secondary",
  },
  {
    title: "Promo Hari Pendidikan",
    date: "2024-05-02",
    status: "Berakhir",
    description: "Spesial Hari Pendidikan Nasional, dapatkan diskon 25% untuk semua buku dan alat tulis.",
    image: "https://placehold.co/600x400",
    dataAiHint: "books stationery",
    audience: 1200,
    variant: "secondary",
  },
  {
    title: "Gebyar Diskon Akhir Pekan",
    date: "2024-05-24",
    status: "Berakhir",
    description: "Nikmati akhir pekan dengan promo Beli 1 Gratis 1 untuk semua minuman boba favoritmu.",
    image: "https://placehold.co/600x400",
    dataAiHint: "bubble tea",
    audience: 980,
    variant: "secondary",
  },
  // 7 Upcoming Campaigns
  {
    title: "Promo Nonton Bola Bareng",
    date: "2024-06-15",
    status: "Akan Datang",
    description: "Dukung tim favoritmu! Paket nobar hemat: pizza + minuman hanya Rp 50.000.",
    image: "https://placehold.co/600x400",
    dataAiHint: "pizza soccer",
    audience: 750,
    variant: "default",
  },
  {
    title: "Diskon Liburan Sekolah Ceria",
    date: "2024-06-22",
    status: "Akan Datang",
    description: "Isi liburan anak dengan mainan edukatif, diskon spesial 30% untuk semua item.",
    image: "https://placehold.co/600x400",
    dataAiHint: "kids toys",
    audience: 1800,
    variant: "default",
  },
  {
    title: "Pesta Gajian Juni",
    date: "2024-06-28",
    status: "Akan Datang",
    description: "Waktunya self-reward! Nikmati cashback 20% untuk semua produk fashion.",
    image: "https://placehold.co/600x400",
    dataAiHint: "fashion sale",
    audience: 2500,
    variant: "default",
  },
  {
    title: "Flash Sale 7.7",
    date: "2024-07-07",
    status: "Akan Datang",
    description: "Jangan lewatkan flash sale terbesar! Diskon hingga 77% di jam-jam tertentu.",
    image: "https://placehold.co/600x400",
    dataAiHint: "online shopping",
    audience: 7500,
    variant: "default",
  },
  {
    title: "Promo Kembali ke Kantor",
    date: "2024-07-15",
    status: "Akan Datang",
    description: "Tampil profesional dengan koleksi kemeja baru, diskon 20% + gratis ongkir.",
    image: "https://placehold.co/600x400",
    dataAiHint: "office fashion",
    audience: 1600,
    variant: "default",
  },
  {
    title: "Spesial Hari Anak Nasional",
    date: "2024-07-23",
    status: "Akan Datang",
    description: "Kado istimewa untuk si kecil. Diskon 40% untuk semua pakaian dan mainan anak.",
    image: "https://placehold.co/600x400",
    dataAiHint: "kids fashion toys",
    audience: 2300,
    variant: "default",
  },
  {
    title: "Promo Merdeka",
    date: "2024-08-17",
    status: "Akan Datang",
    description: "Rayakan kemerdekaan dengan semangat! Semua produk merah-putih diskon 17%.",
    image: "https://placehold.co/600x400",
    dataAiHint: "indonesia independence",
    audience: 4500,
    variant: "default",
  }
];

// Create the context with a default value
const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

// Create the provider component
export const CampaignsProvider = ({ children }: { children: ReactNode }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);

  const addCampaign = (campaign: Campaign) => {
    // Add the new campaign and sort the entire array by date
    setCampaigns((prevCampaigns) => 
      [...prevCampaigns, campaign].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    );
  };

  return (
    <CampaignContext.Provider value={{ campaigns, addCampaign }}>
      {children}
    </CampaignContext.Provider>
  );
};

// Create a custom hook to use the context
export const useCampaigns = () => {
  const context = useContext(CampaignContext);
  if (context === undefined) {
    throw new Error('useCampaigns must be used within a CampaignsProvider');
  }
  return context;
};
