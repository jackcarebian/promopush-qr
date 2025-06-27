import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateCampaignForm } from "./components/create-campaign-form";

export default function CampaignsPage() {
    return (
        <div className="space-y-8">
             <div>
                <h1 className="text-3xl font-headline font-bold">Manajemen Kampanye</h1>
                <p className="text-muted-foreground">Buat dan kirim kampanye promo baru ke pelanggan Anda.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Buat Kampanye Baru</CardTitle>
                    <CardDescription>Isi detail di bawah ini untuk meluncurkan kampanye Anda berikutnya.</CardDescription>
                </CardHeader>
                <CardContent>
                    <CreateCampaignForm />
                </CardContent>
            </Card>
        </div>
    )
}
