
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Store, Download, X, Printer } from "lucide-react";
import Image from "next/image";
import { Dialog, DialogContent, DialogClose, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PrintableQrCard } from "./components/printable-qr-card";
import { Skeleton } from "@/components/ui/skeleton";
import { outlets as outletsData, type OutletData } from "@/data/outlets";
import { interestCategories } from "../campaigns/data/categories";
import { useAuth } from "../contexts/auth-context";

type Outlet = OutletData;

export default function QrOutletPage() {
    const [selectedOutlet, setSelectedOutlet] = useState<Outlet | null>(null);
    const [origin, setOrigin] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        // This ensures the code runs only on the client side, after the window object is available.
        if (typeof window !== 'undefined') {
            setOrigin(window.location.origin);
        }
    }, []);

    const handleDownloadClick = (outlet: Outlet) => {
        setSelectedOutlet(outlet);
    };

    const handleCloseDialog = () => {
        setSelectedOutlet(null);
    };
    
    const getQrDataUrl = (outletId: string) => {
        // Construct the full, dynamic URL for the QR code
        return origin ? `${origin}/register?outlet=${outletId}` : "";
    };

    if (user?.role !== 'admin') {
         return (
            <Card>
                <CardHeader>
                    <CardTitle>Akses Ditolak</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Hanya Admin yang dapat mengakses halaman ini.</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-headline font-bold flex items-center gap-2">
                    <Store className="w-8 h-8" />
                    QR Outlet
                </h1>
                <p className="text-muted-foreground">Kelola dan unduh kode QR unik untuk setiap outlet terdaftar Anda.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Kode QR Outlet Terdaftar</CardTitle>
                    <CardDescription>
                        Berikut adalah daftar kode QR yang telah dibuat untuk masing-masing outlet. Unduh dan pasang di lokasi yang strategis.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {outletsData.map((outlet) => {
                        const qrData = getQrDataUrl(outlet.id);
                        const categoryEmoji = interestCategories[outlet.businessCategory]?.emoji || '🏢';
                        return (
                            <Card key={outlet.id} className="flex flex-col">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <span>{categoryEmoji}</span>
                                        {outlet.name}
                                    </CardTitle>
                                    <CardDescription>{outlet.location}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow flex justify-center items-center p-4">
                                    {origin ? (
                                        <Image
                                            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`}
                                            alt={`QR Code for ${outlet.name}`}
                                            width={200}
                                            height={200}
                                            data-ai-hint="qr code"
                                            className="rounded-lg"
                                        />
                                    ) : (
                                        <Skeleton className="h-[200px] w-[200px] rounded-lg" />
                                    )}
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full" onClick={() => handleDownloadClick(outlet)} disabled={!origin}>
                                        <Download className="mr-2 h-4 w-4" />
                                        Unduh QR
                                    </Button>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </CardContent>
            </Card>

            <Dialog open={!!selectedOutlet} onOpenChange={(isOpen) => !isOpen && handleCloseDialog()}>
                <DialogContent className="max-w-md p-0 bg-transparent border-none shadow-none printable-dialog">
                    <DialogHeader className="sr-only">
                      <DialogTitle>Tampilan Cetak Kode QR</DialogTitle>
                      <DialogDescription>
                          Tampilan siap cetak untuk kode QR outlet {selectedOutlet?.name}.
                      </DialogDescription>
                    </DialogHeader>

                     <div className="absolute top-2 right-2 z-50 flex gap-2 no-print">
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full bg-background"
                            onClick={() => window.print()}
                            title="Cetak atau Unduh sebagai PDF"
                        >
                            <Printer className="h-4 w-4" />
                            <span className="sr-only">Cetak atau Unduh</span>
                        </Button>
                         <DialogClose asChild>
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="h-8 w-8 rounded-full"
                              title="Tutup"
                            >
                                <X className="h-4 w-4" />
                                <span className="sr-only">Tutup</span>
                            </Button>
                        </DialogClose>
                    </div>

                     {selectedOutlet && (
                        <PrintableQrCard outlet={{
                            ...selectedOutlet,
                            qrData: getQrDataUrl(selectedOutlet.id)
                        }} />
                     )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
