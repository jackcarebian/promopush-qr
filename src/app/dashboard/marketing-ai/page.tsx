
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GenerateCopyForm } from "./components/generate-copy-form";
import { Bot } from "lucide-react";

export default function MarketingAiPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-headline font-bold flex items-center gap-2">
                    <Bot className="w-8 h-8" />
                    Asisten Pemasaran AI
                </h1>
                <p className="text-muted-foreground">Bingung bikin kalimat promosi? Serahin aja ke AI, dijamin jitu dan menjual!</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Sihir Pemasaran dalam Sekejap</CardTitle>
                    <CardDescription>Cukup isi beberapa detail, dan biarkan asisten AI kami meracik kalimat promosi paling ciamik untuk bisnismu.</CardDescription>
                </CardHeader>
                <CardContent>
                    <GenerateCopyForm />
                </CardContent>
            </Card>
        </div>
    )
}
