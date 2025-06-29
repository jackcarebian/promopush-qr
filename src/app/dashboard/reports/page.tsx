
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useAuth } from "../contexts/auth-context";
import { useCustomers } from "../contexts/customer-context";
import { useCampaigns } from "../contexts/campaign-context";
import { getOutletById } from "@/data/outlets";
import { Users, Megaphone, BarChart2, Calendar, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Image from "next/image";

export default function ReportPage() {
    const { user } = useAuth();
    const { customers } = useCustomers(); // Already filtered by context
    const { campaigns } = useCampaigns(); // Already filtered by context

    if (user?.role !== 'member') {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Halaman Khusus Member</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Halaman ini hanya dapat diakses oleh pengguna dengan peran Member.</p>
                </CardContent>
            </Card>
        )
    }

    const outlet = getOutletById(user.outletId || '');
    const upcomingCampaigns = campaigns.filter(c => c.status === "Akan Datang");
    const pastCampaigns = campaigns.filter(c => c.status === "Berakhir");

    if (!outlet) {
        return <p>Data outlet tidak ditemukan.</p>
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-headline font-bold">Laporan Outlet: {outlet.name}</h1>
                <p className="text-muted-foreground">{outlet.location}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Pelanggan Terdaftar</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{customers.length}</div>
                        <p className="text-xs text-muted-foreground">Pelanggan dari outlet ini</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Kampanye Dibuat</CardTitle>
                        <Megaphone className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{campaigns.length}</div>
                        <p className="text-xs text-muted-foreground">{upcomingCampaigns.length} kampanye akan datang</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tingkat Konversi (Mock)</CardTitle>
                        <BarChart2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12.3%</div>
                        <p className="text-xs text-muted-foreground">Berdasarkan kampanye terakhir</p>
                    </CardContent>
                </Card>
            </div>
            
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Kampanye Akan Datang</CardTitle>
                    <CardDescription>Kampanye yang telah Anda jadwalkan untuk outlet ini.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {upcomingCampaigns.length > 0 ? (
                        upcomingCampaigns.map(campaign => (
                            <div key={campaign.id} className="flex items-center gap-4 p-2 rounded-lg border">
                               <Image src={campaign.image} alt={campaign.title} width={80} height={80} className="rounded-md object-cover aspect-square" data-ai-hint={campaign.dataAiHint} />
                               <div className="flex-1">
                                    <h3 className="font-semibold">{campaign.title}</h3>
                                    <p className="text-sm text-muted-foreground">{campaign.description}</p>
                                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-1"><Calendar className="w-3 h-3"/> {format(new Date(`${campaign.date}T00:00:00`), "dd MMMM yyyy", { locale: id })}</div>
                                        <div className="flex items-center gap-1"><Tag className="w-3 h-3"/> {campaign.businessCategory}</div>
                                    </div>
                               </div>
                               <Badge>{campaign.status}</Badge>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-muted-foreground py-4">Tidak ada kampanye yang akan datang.</p>
                    )}
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Pelanggan Terbaru</CardTitle>
                    <CardDescription>5 pelanggan terakhir yang mendaftar melalui outlet Anda.</CardDescription>
                </CardHeader>
                <CardContent>
                     <ul className="space-y-3">
                        {customers.slice(0, 5).map(customer => (
                            <li key={customer.id} className="flex justify-between items-center p-2 border rounded-lg">
                                <div>
                                    <p className="font-medium">{customer.name}</p>
                                    <p className="text-sm text-muted-foreground">{customer.email}</p>
                                </div>
                                <p className="text-xs text-muted-foreground">{format(new Date(customer.registeredAt), 'dd MMM yyyy, HH:mm')}</p>
                            </li>
                        ))}
                    </ul>
                </CardContent>
                 <CardFooter>
                    <p className="text-xs text-muted-foreground">Untuk melihat daftar lengkap, kunjungi halaman Database Pelanggan.</p>
                 </CardFooter>
            </Card>
        </div>
    )
}
