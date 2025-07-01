
"use client";

import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { useAuth } from './auth-context';

// Define the shape of a single campaign
export interface Campaign {
  id: string;
  title: string;
  startDate: string; // YYYY-MM-DD format
  endDate: string; // YYYY-MM-DD format
  status: "Akan Datang" | "Berakhir" | "Sedang Berlangsung";
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
  addCampaign: (campaign: Omit<Campaign, 'id' | 'status'>) => boolean;
  updateCampaign: (id: string, updatedCampaign: Omit<Campaign, 'id'>) => void;
  deleteCampaign: (id: string) => void;
}

// Initial data for campaigns, ensuring dates are in YYYY-MM-DD format
const initialCampaigns: Omit<Campaign, 'status'>[] = [
  // 3 Past Campaigns
  {
    id: 'campaign-1',
    title: "Diskon Kilat Ramadhan",
    startDate: "2024-03-25",
    endDate: "2024-04-05",
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
    startDate: "2024-05-01",
    endDate: "2024-05-07",
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
    startDate: "2024-05-24",
    endDate: "2024-05-26",
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
    startDate: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString().split('T')[0],
    endDate: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString().split('T')[0],
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
    startDate: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString().split('T')[0],
    endDate: new Date(new Date().setDate(new Date().getDate() + 20)).toISOString().split('T')[0],
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
    startDate: new Date(new Date().setDate(new Date().getDate() + 22)).toISOString().split('T')[0],
    endDate: new Date(new Date().setDate(new Date().getDate() + 28)).toISOString().split('T')[0],
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
    startDate: "2024-07-07",
    endDate: "2024-07-07",
    description: "Jangan lewatkan flash sale terbesar! Diskon hingga 77% di jam-jam tertentu.",
    image: "https://placehold.co/600x400",
    dataAiHint: "online shopping",
    businessCategory: "Toko Online",
    interests: ["flash-sale-online"],
    variant: "default",
    outletId: "outlet-005",
  },
];


// Create the context with a default value
const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

// Create the provider component
export const CampaignsProvider = ({ children }: { children: ReactNode }) => {
  const [campaigns, setCampaigns] = useState<Omit<Campaign, 'status'>[]>(initialCampaigns);
  const { user } = useAuth();

  const addCampaign = (campaign: Omit<Campaign, 'id' | 'status'>): boolean => {
    if (!user) return false;

    // Demo user can only create 1 campaign
    if (user.role === 'demo') {
        const campaignsByDemoUser = campaigns.filter(c => user.outletIds?.includes(c.outletId)).length;
        if (campaignsByDemoUser >= 1) {
            return false; // Signal failure
        }
    }

    const newCampaign: Omit<Campaign, 'status'> = {
      ...campaign,
      id: `campaign-${new Date().getTime()}`,
    };
    setCampaigns((prevCampaigns) => [...prevCampaigns, newCampaign]);
    return true; // Signal success
  };
  
  const updateCampaign = (id: string, updatedCampaignData: Omit<Campaign, 'id'>) => {
     if (!user) return;
     const campaignToUpdate = campaigns.find(c => c.id === id);
    if (user.role === 'demo' || (user.role === 'member' && (!user.outletIds || !user.outletIds.includes(campaignToUpdate?.outletId!)))) {
        return;
    }
    setCampaigns(prev => prev.map(c => (c.id === id ? { id, ...updatedCampaignData } : c)));
  };

  const deleteCampaign = (id: string) => {
    if (!user) return;
    const campaignToDelete = campaigns.find(c => c.id === id);
    if (user.role === 'demo' || (user.role === 'member' && (!user.outletIds || !user.outletIds.includes(campaignToDelete?.outletId!)))) {
        return;
    }
    setCampaigns(prev => prev.filter(c => c.id !== id));
  };
  
  const processedCampaigns = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison

    const allProcessed = campaigns
      .map(campaign => {
        const startDate = new Date(`${campaign.startDate}T00:00:00`);
        const endDate = new Date(`${campaign.endDate}T00:00:00`);
        
        let status: "Akan Datang" | "Berakhir" | "Sedang Berlangsung";

        if (endDate < today) {
          status = "Berakhir";
        } else if (startDate > today) {
          status = "Akan Datang";
        } else {
          status = "Sedang Berlangsung";
        }

        return { ...campaign, status };
      })
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    
    if (user?.role === 'member' || user?.role === 'demo') {
        return allProcessed.filter(c => user.outletIds?.includes(c.outletId));
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
