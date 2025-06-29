
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateCampaignForm } from "./components/create-campaign-form";
import { CampaignList } from "./components/campaign-list";
import { useAuth } from "../contexts/auth-context";

export default function CampaignsPage() {
    const { user } = useAuth();
    
    // Operator does not manage campaigns
    if (user?.role === 'operator') {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Akses Ditolak</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Anda tidak memiliki izin untuk mengakses halaman ini.</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="space-y-8">
             <div>
                <h1 className="text-3xl font-headline font-bold">Manajemen Kampanye</h1>
                <p className="text-muted-foreground">Buat, kelola, edit, dan hapus kampanye promo untuk pelanggan Anda.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Buat Kampanye Baru</CardTitle>
                    <CardDescription>Isi detail di bawah ini untuk meluncurkan kampanye Anda berikutnya. Kampanye akan otomatis muncul di kalender dan daftar di bawah.</CardDescription>
                </CardHeader>
                <CardContent>
                    <CreateCampaignForm />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Daftar Kampanye</CardTitle>
                    <CardDescription>
                        {user?.role === 'member' 
                            ? "Berikut adalah semua kampanye yang telah Anda buat untuk outlet Anda."
                            : "Berikut adalah semua kampanye yang telah Anda buat. Anda dapat mengedit atau menghapusnya dari sini."
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <CampaignList />
                </CardContent>
            </Card>
        </div>
    )
}
