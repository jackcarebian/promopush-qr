
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { type OutletData } from "@/data/outlets";
import { ScanLine, Printer } from "lucide-react";

export function PrintableQrCard({ outlet, qrUrl }: { outlet: OutletData, qrUrl: string }) {
    
    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            <div className="absolute top-4 right-4 no-print z-50">
                <Button onClick={handlePrint}>
                    <Printer className="mr-2 h-4 w-4" />
                    Cetak Halaman Ini
                </Button>
            </div>
            <Card className="printable-card bg-white text-black p-8 text-center rounded-none">
                <div className="flex flex-col items-center justify-center space-y-8 w-full max-w-md mx-auto">

                    <Logo className="text-4xl" />

                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold font-headline">Promo Eksklusif dari {outlet.name}</h1>
                        <p className="text-lg text-gray-600">
                           {outlet.location}
                        </p>
                    </div>

                    <div className="flex items-center gap-4 text-primary font-semibold text-xl">
                        <ScanLine className="w-10 h-10" />
                        <span>Pindai untuk Bergabung!</span>
                        <ScanLine className="w-10 h-10" />
                    </div>

                    <div className="p-4 border-4 border-dashed border-gray-300 rounded-xl">
                        {qrUrl ? (
                             <Image
                                src={qrUrl}
                                alt={`QR Code for ${outlet.name}`}
                                width={300}
                                height={300}
                                className="rounded-lg"
                                unoptimized
                            />
                        ) : (
                            <div className="w-[300px] h-[300px] bg-gray-200 animate-pulse rounded-lg" />
                        )}
                    </div>
                   
                    <p className="text-gray-700 text-lg font-medium">
                        Dapatkan notifikasi langsung di HP Anda untuk penawaran spesial, diskon, dan menu baru!
                    </p>
                </div>
            </Card>
        </>
    );
}
