import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GenerateCopyForm } from "./components/generate-copy-form";
import { Bot } from "lucide-react";

export default function MarketingAiPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-headline font-bold flex items-center gap-2">
                    <Bot className="w-8 h-8" />
                    Tool Pemasaran AI
                </h1>
                <p className="text-muted-foreground">Buat salinan pemasaran yang menarik secara instan untuk bisnis Anda.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Hasilkan Salinan Pemasaran</CardTitle>
                    <CardDescription>Pilih jenis bisnis Anda dan biarkan AI kami membuat pesan promosi yang efektif untuk Anda.</CardDescription>
                </CardHeader>
                <CardContent>
                    <GenerateCopyForm />
                </CardContent>
            </Card>
        </div>
    )
}
