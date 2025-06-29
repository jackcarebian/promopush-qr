
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Megaphone, Users, BarChart2, Calendar, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useCustomers } from "./contexts/customer-context";
import { useCampaigns } from "./contexts/campaign-context";
import { CustomerLoyaltyChart } from "./components/customer-loyalty-chart";
import { InterestDistributionChart } from "./components/interest-distribution-chart";
import { useEffect, useState } from "react";
import { useAuth } from "./contexts/auth-context";
import { useToast } from "@/hooks/use-toast";


export default function DashboardPage() {
  const { customers } = useCustomers();
  const { campaigns } = useCampaigns();
  const { user } = useAuth();
  const { toast } = useToast();
  const [conversionRate, setConversionRate] = useState("0.0%");

  const totalCustomers = customers.length;
  const totalCampaigns = campaigns.length;
  
  useEffect(() => {
    // Mock conversion rate calculation to avoid hydration errors
    if (totalCampaigns > 0) {
      const baseRate = 8.5;
      const randomFactor = (Math.random() - 0.5) * 2; // -1 to 1
      const finalRate = baseRate + randomFactor;
      setConversionRate(`${finalRate.toFixed(1)}%`);
    }
  }, [totalCampaigns, totalCustomers]);

  const handleCacheClean = async () => {
    toast({ title: "Pembersihan dimulai...", description: "Mencoba menghapus service worker dan membersihkan cache." });
    try {
        if ('serviceWorker' in navigator) {
            const registrations = await navigator.serviceWorker.getRegistrations();
            if (registrations.length) {
                for (const registration of registrations) {
                    await registration.unregister();
                }
                toast({ title: "Service Worker Dihapus", description: "Semua service worker aktif telah berhasil dihapus." });
            } else {
                toast({ title: "Tidak Ada Service Worker", description: "Tidak ada service worker aktif yang ditemukan untuk dibersihkan." });
            }
        }
        
        // Force a hard reload, bypassing the cache
        window.location.reload(true);

    } catch (error) {
        console.error('Gagal membersihkan cache:', error);
        toast({
            variant: "destructive",
            title: "Gagal Membersihkan",
            description: "Terjadi kesalahan saat mencoba membersihkan cache.",
        });
    }
  };


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Selamat datang kembali! Berikut adalah ringkasan aktivitas Anda.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Pelanggan
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Total pelanggan terdaftar
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Kampanye
            </CardTitle>
            <Megaphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCampaigns}</div>
             <p className="text-xs text-muted-foreground">
              {campaigns.filter(c => c.status === "Akan Datang").length} kampanye akan datang
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tingkat Konversi (Mock)</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate}</div>
            <p className="text-xs text-muted-foreground">
              Berdasarkan kampanye terakhir
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7">
        <div className="lg:col-span-4">
            <CustomerLoyaltyChart />
        </div>
        <div className="lg:col-span-3">
            <InterestDistributionChart />
        </div>
      </div>

      <Card>
        <CardHeader>
            <CardTitle className="font-headline">Aksi Cepat</CardTitle>
            <CardDescription>Mulai aktivitas baru dengan satu klik.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
            <Button asChild>
                <Link href="/dashboard/campaigns">
                    <Megaphone className="mr-2 h-4 w-4" /> Buat Kampanye Baru
                </Link>
            </Button>
            <Button variant="secondary" asChild>
                <Link href="/dashboard/customers">
                    <Users className="mr-2 h-4 w-4" /> Lihat Pelanggan
                </Link>
            </Button>
             <Button variant="secondary" asChild>
                <Link href="/dashboard/calendar">
                    <Calendar className="mr-2 h-4 w-4" /> Kalender Kampanye
                </Link>
            </Button>
        </CardContent>
      </Card>

      {user?.role === 'admin' && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Utilitas Admin</CardTitle>
            <CardDescription>Alat untuk pemeliharaan dan pemecahan masalah.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleCacheClean}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Bersihkan Cache & Segarkan
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Gunakan ini jika Anda mengalami masalah dengan data yang usang atau notifikasi. Ini akan menghapus paksa service worker dan memuat ulang halaman.
            </p>
          </CardContent>
        </Card>
      )}

    </div>
  );
}
