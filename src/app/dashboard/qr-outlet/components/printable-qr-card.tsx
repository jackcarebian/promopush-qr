import { Logo } from "@/components/logo";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScanLine } from "lucide-react";
import Image from "next/image";

interface PrintableQrCardProps {
    outlet: {
        id: string;
        name: string;
        location: string;
        qrData: string;
    };
}

export function PrintableQrCard({ outlet }: PrintableQrCardProps) {
    return (
        <Card className="w-full max-w-md mx-auto font-body text-center shadow-2xl printable-card" id="printable-area">
            <CardContent className="p-8 space-y-6">
                <div className="flex justify-center">
                    <Logo />
                </div>
                
                <div className="space-y-2">
                    <h2 className="text-2xl font-headline font-bold text-primary">
                        Scan & Dapatkan Promo Spesial!
                    </h2>
                    <p className="text-muted-foreground">
                        Arahkan kamera Anda ke kode QR di bawah ini untuk mendaftar.
                    </p>
                </div>
                
                <div className="flex justify-center p-4 bg-secondary rounded-lg">
                    <Image
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(outlet.qrData)}`}
                        alt={`QR Code for ${outlet.name}`}
                        width={250}
                        height={250}
                        data-ai-hint="qr code"
                        className="rounded-md"
                    />
                </div>

                <div className="text-center">
                    <p className="font-semibold text-lg">{outlet.name}</p>
                    <p className="text-muted-foreground">{outlet.location}</p>
                </div>

                <Alert>
                    <ScanLine className="h-4 w-4" />
                    <AlertTitle>Info Penting!</AlertTitle>
                    <AlertDescription>
                        Notifikasi promo yang akan Anda terima akan disesuaikan dengan preferensi minat yang Anda pilih saat mendaftar.
                    </AlertDescription>
                </Alert>
            </CardContent>
        </Card>
    );
}
