
"use client";

import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { useAuth } from './auth-context';

// Define the shape of a single campaign
export interface Campaign {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD format
  status: "Akan Datang" | "Berakhir";
  description: string;
  image: string;
  dataAiHint: string;
  businessCategory: string;
  interests: string[];
  variant: "default" | "secondary";
  outletId: string;
}

// Define the shape of the context
interface CampaignContextType {
  campaigns: Campaign[];
  addCampaign: (campaign: Omit<Campaign, 'id' | 'status' | 'outletId'>) => void;
  updateCampaign: (id: string, updatedCampaign: Omit<Campaign, 'id'>) => void;
  deleteCampaign: (id: string) => void;
}

// Initial data for campaigns, ensuring dates are in YYYY-MM-DD format
const initialCampaigns: Campaign[] = [
  // 3 Past Campaigns
  {
    id: 'campaign-1',
    title: "Diskon Kilat Ramadhan",
    date: "2024-04-05",
    status: "Berakhir",
    description: "Serbu diskon spesial hingga 70% untuk persiapan Lebaran. Baju baru, hati baru!",
    image: "https://placehold.co/600x400",
    dataAiHint: "ramadan sale",
    businessCategory: "Butik & Aksesoris",
    interests: ["promo-pakaian", "flash-sale"],
    variant: "secondary",
    outletId: "outlet-002",
  },
  {
    id: 'campaign-2',
    title: "Promo Hari Pendidikan",
    date: "2024-05-02",
    status: "Berakhir",
    description: "Spesial Hari Pendidikan Nasional, dapatkan diskon 25% untuk semua buku dan alat tulis.",
    image: "https://placehold.co/600x400",
    dataAiHint: "books stationery",
    businessCategory: "Toko Online",
    interests: ["diskon-spesial"],
    variant: "secondary",
    outletId: "outlet-005",
  },
  {
    id: 'campaign-3',
    title: "Gebyar Diskon Akhir Pekan",
    date: "2024-05-24",
    status: "Berakhir",
    description: "Nikmati akhir pekan dengan promo Beli 1 Gratis 1 untuk semua minuman boba favoritmu.",
    image: "https://placehold.co/600x400",
    dataAiHint: "bubble tea",
    businessCategory: "Cafe, Resto, Foodcourt",
    interests: ["promo-minuman"],
    variant: "secondary",
    outletId: "outlet-001",
  },
  // 7 Upcoming Campaigns
  {
    id: 'campaign-4',
    title: "Promo Nonton Bola Bareng",
    date: "2024-06-15",
    status: "Akan Datang",
    description: "Dukung tim favoritmu! Paket nobar hemat: pizza + minuman hanya Rp 50.000.",
    image: "https://placehold.co/600x400",
    dataAiHint: "pizza soccer",
    businessCategory: "Cafe, Resto, Foodcourt",
    interests: ["promo-makanan", "promo-minuman"],
    variant: "default",
    outletId: "outlet-006",
  },
  {
    id: 'campaign-5',
    title: "Diskon Liburan Sekolah Ceria",
    date: "2024-06-22",
    status: "Akan Datang",
    description: "Isi liburan anak dengan mainan edukatif, diskon spesial 30% untuk semua item.",
    image: "https://placehold.co/600x400",
    dataAiHint: "kids toys",
    businessCategory: "Toko Online",
    interests: ["diskon-spesial"],
    variant: "default",
    outletId: "outlet-005",
  },
  {
    id: 'campaign-6',
    title: "Pesta Gajian Juni",
    date: "2024-06-28",
    status: "Akan Datang",
    description: "Waktunya self-reward! Nikmati cashback 20% untuk semua produk fashion.",
    image: "https://placehold.co/600x400",
    dataAiHint: "fashion sale",
    businessCategory: "Butik & Aksesoris",
    interests: ["promo-pakaian", "promo-tas-sepatu"],
    variant: "default",
    outletId: "outlet-002",
  },
  {
    id: 'campaign-7',
    title: "Flash Sale 7.7",
    date: "2024-07-07",
    status: "Akan Datang",
    description: "Jangan lewatkan flash sale terbesar! Diskon hingga 77% di jam-jam tertentu.",
    image: "https://placehold.co/600x400",
    dataAiHint: "online shopping",
    businessCategory: "Toko Online",
    interests: ["flash-sale-online"],
    variant: "default",
    outletId: "outlet-005",
  },
  {
    id: 'campaign-8',
    title: "Promo Kembali ke Kantor",
    date: "2024-07-15",
    status: "Akan Datang",
    description: "Tampil profesional dengan koleksi kemeja baru, diskon 20% + gratis ongkir.",
    image: "https://placehold.co/600x400",
    dataAiHint: "office fashion",
    businessCategory: "Butik & Aksesoris",
    interests: ["promo-pakaian", "koleksi-terbaru"],
    variant: "default",
    outletId: "outlet-002",
  },
  {
    id: 'campaign-9',
    title: "Spesial Hari Anak Nasional",
    date: "2024-07-23",
    status: "Akan Datang",
    description: "Kado istimewa untuk si kecil. Diskon 40% untuk semua pakaian dan mainan anak.",
    image: "https://placehold.co/600x400",
    dataAiHint: "kids fashion toys",
    businessCategory: "Toko Online",
    interests: ["diskon-spesial"],
    variant: "default",
    outletId: "outlet-005",
  },
  {
    id: 'campaign-10',
    title: "Promo Merdeka",
    date: "2024-08-17",
    status: "Akan Datang",
    description: "Rayakan kemerdekaan dengan semangat! Semua produk merah-putih diskon 17%.",
    image: "https://placehold.co/600x400",
    dataAiHint: "indonesia independence",
    businessCategory: "Toko Online",
    interests: ["diskon-spesial"],
    variant: "default",
    outletId: "outlet-005",
  }
];


// Create the context with a default value
const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

// Create the provider component
export const CampaignsProvider = ({ children }: { children: ReactNode }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const { user } = useAuth();

  const addCampaign = (campaign: Omit<Campaign, 'id' | 'status' | 'outletId'>) => {
    if (!user) return; // Should not happen if called from an authenticated page
    const newCampaign: Campaign = {
      ...campaign,
      id: `campaign-${new Date().getTime()}`,
      status: "Akan Datang", // Default status for new campaigns
      outletId: user.outletId || 'unknown'
    };
    setCampaigns((prevCampaigns) => [...prevCampaigns, newCampaign]);
  };
  
  const updateCampaign = (id: string, updatedCampaignData: Omit<Campaign, 'id'>) => {
     if (!user) return;
     // Ensure members can only update campaigns for their own outlet
    const campaignToUpdate = campaigns.find(c => c.id === id);
    if (user.role === 'member' && campaignToUpdate?.outletId !== user.outletId) {
        return;
    }
    setCampaigns(prev => prev.map(c => (c.id === id ? { id, ...updatedCampaignData } : c)));
  };

  const deleteCampaign = (id: string) => {
    if (!user) return;
    const campaignToDelete = campaigns.find(c => c.id === id);
    if (user.role === 'member' && campaignToDelete?.outletId !== user.outletId) {
        return;
    }
    setCampaigns(prev => prev.filter(c => c.id !== id));
  };
  
  const processedCampaigns = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison

    const allProcessed = campaigns
      .map(campaign => {
        const campaignDate = new Date(`${campaign.date}T00:00:00`);
        const status: "Akan Datang" | "Berakhir" = campaignDate < today ? "Berakhir" : "Akan Datang";
        return { ...campaign, status };
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    if (user?.role === 'member') {
        return allProcessed.filter(c => c.outletId === user.outletId);
    }
    
    return allProcessed;

  }, [campaigns, user]);

  return (
    <CampaignContext.Provider value={{ campaigns: processedCampaigns, addCampaign, updateCampaign, deleteCampaign }}>
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
