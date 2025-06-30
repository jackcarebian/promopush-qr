
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { outlets } from "@/data/outlets";
import { PrintableQrCard } from "./components/printable-qr-card";
import { Printer, QrCode } from "lucide-react";
import { useAuth } from "../contexts/auth-context";

export default function QrOutletPage() {
    const { user } = useAuth();
    const [baseUrl, setBaseUrl] = useState("");

    useEffect(() => {
        // Ensure this runs only on the client
        setBaseUrl(window.location.origin);
    }, []);

    const generateQrUrl = (outletId: string) => {
        if (!baseUrl) return "";
        const registerUrl = `${baseUrl}/register?outlet=${outletId}`;
        // Gunakan API internal yang baru
        return `/api/qr?data=${encodeURIComponent(registerUrl)}`;
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
                    <QrCode className="w-8 h-8" />
                    Manajemen QR Outlet
                </h1>
                <p className="text-muted-foreground">Buat dan cetak kode QR unik untuk setiap outlet agar pelanggan bisa mendaftar.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {outlets.map((outlet) => {
                    const qrUrl = generateQrUrl(outlet.id);
                    return (
                        <Card key={outlet.id} className="flex flex-col">
                            <CardHeader>
                                <CardTitle className="font-headline">{outlet.name}</CardTitle>
                                <CardDescription>{outlet.location}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow flex items-center justify-center">
                                {qrUrl ? (
                                    <Image
                                        src={qrUrl}
                                        alt={`QR Code for ${outlet.name}`}
                                        width={150}
                                        height={150}
                                        className="rounded-lg"
                                    />
                                ) : (
                                    <div className="w-[150px] h-[150px] bg-gray-200 animate-pulse rounded-lg" />
                                )}
                            </CardContent>
                            <CardContent>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="w-full">
                                            <Printer className="mr-2 h-4 w-4" />
                                            Cetak QR
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-4xl p-0 border-0 printable-dialog">
                                        <DialogHeader>
                                            <DialogTitle className="sr-only">Cetak Kode QR untuk {outlet.name}</DialogTitle>
                                        </DialogHeader>
                                        <PrintableQrCard outlet={outlet} qrUrl={qrUrl} />
                                    </DialogContent>
                                </Dialog>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    );
}
