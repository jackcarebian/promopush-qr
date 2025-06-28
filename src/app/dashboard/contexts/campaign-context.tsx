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

// Initial data for campaigns
const initialCampaigns: Campaign[] = [
    // 3 Past Campaigns
  {
    title: "Diskon Hari Valentine",
    date: "2024-02-14",
    status: "Berakhir",
    description: "Rayakan cinta dengan diskon spesial 20% untuk semua item cokelat dan bunga.",
    image: "https://placehold.co/600x400",
    dataAiHint: "valentine gift",
    audience: 1500,
    variant: "secondary",
  },
  {
    title: "Promo Lebaran Sale",
    date: "2024-04-10",
    status: "Berakhir",
    description: "Lengkapi kebutuhan Lebaran Anda dengan diskon hingga 50% untuk baju koko dan gamis.",
    image: "https://placehold.co/600x400",
    dataAiHint: "eid celebration",
    audience: 4200,
    variant: "secondary",
  },
  {
    title: "Promo Akhir Pekan Mei",
    date: "2024-05-24",
    status: "Berakhir",
    description: "Promo spesial untuk menemani akhir pekan Anda. Diskon 20% untuk makanan & minuman.",
    image: "https://placehold.co/600x400",
    dataAiHint: "food delivery",
    audience: 850,
    variant: "secondary",
  },
  // 7 Upcoming Campaigns (June & July)
  {
    title: "Diskon Liburan Sekolah",
    date: "2024-06-25",
    status: "Akan Datang",
    description: "Isi liburan anak dengan produk mainan edukatif, diskon spesial 30%.",
    image: "https://placehold.co/600x400",
    dataAiHint: "kids toys",
    audience: 1800,
    variant: "default",
  },
  {
    title: "Promo Gajian Juni",
    date: "2024-06-28",
    status: "Akan Datang",
    description: "Nikmati diskon gajian 25% untuk semua produk elektronik. Waktunya upgrade!",
    image: "https://placehold.co/600x400",
    dataAiHint: "electronics sale",
    audience: 2100,
    variant: "default",
  },
  {
    title: "Flash Sale 7.7",
    date: "2024-07-07",
    status: "Akan Datang",
    description: "Jangan lewatkan flash sale terbesar kami! Diskon hingga 77% hanya selama 24 jam.",
    image: "https://placehold.co/600x400",
    dataAiHint: "online shopping",
    audience: 7500,
    variant: "default",
  },
  {
    title: "Promo Kopi Tengah Bulan",
    date: "2024-07-15",
    status: "Akan Datang",
    description: "Semangat lagi di tengah bulan! Beli 2 gratis 1 untuk semua varian es kopi susu.",
    image: "https://placehold.co/600x400",
    dataAiHint: "iced coffee",
    audience: 950,
    variant: "default",
  },
  {
    title: "Spesial Hari Anak Nasional",
    date: "2024-07-23",
    status: "Akan Datang",
    description: "Hadiahkan yang terbaik untuk si kecil. Diskon 40% untuk semua pakaian anak.",
    image: "https://placehold.co/600x400",
    dataAiHint: "kids fashion",
    audience: 2300,
    variant: "default",
  },
  {
    title: "Payday Sale Juli",
    date: "2024-07-26",
    status: "Akan Datang",
    description: "Waktunya belanja! Dapatkan cashback hingga Rp 100.000 untuk semua kategori.",
    image: "https://placehold.co/600x400",
    dataAiHint: "shopping bags",
    audience: 3200,
    variant: "default",
  },
  {
    title: "Promo Back to Campus",
    date: "2024-07-29",
    status: "Akan Datang",
    description: "Siap kembali ke kampus? Dapatkan diskon 20% untuk laptop dan aksesorisnya.",
    image: "https://placehold.co/600x400",
    dataAiHint: "laptop student",
    audience: 1500,
    variant: "default",
  }
];

// Create the context with a default value
const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

// Create the provider component
export const CampaignsProvider = ({ children }: { children: ReactNode }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);

  const addCampaign = (campaign: Campaign) => {
    setCampaigns((prevCampaigns) => [...prevCampaigns, campaign].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
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
