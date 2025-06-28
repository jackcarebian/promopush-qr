import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, QrCode, Store, Building, Globe } from "lucide-react";

export default function QrCodesPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-headline font-bold flex items-center gap-2">
                    <QrCode className="w-8 h-8" />
                    Langganan Kode QR
                </h1>
                <p className="text-muted-foreground">Pilih paket yang paling sesuai untuk bisnis Anda.</p>
            </div>

            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold font-headline text-primary">Buka Potensi Penuh Bisnis Anda</h2>
                <div className="text-muted-foreground mt-2 space-y-3">
                    <p>
                        Bersama Notiflayer, Anda tidak hanya mendapatkan pelanggan, tetapi membangun komunitas setia.
                    </p>
                    <p>
                        Ubah pengunjung biasa menjadi pelanggan tetap dengan memberikan mereka akses mudah ke promo eksklusif dan penawaran yang dipersonalisasi.
                    </p>
                    <p>
                        Setiap pemindaian adalah awal dari hubungan yang lebih erat. Pilih paket Anda di bawah ini dan mulailah membangun hubungan yang lebih kuat dengan pelanggan Anda hari ini!
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch pt-4">
                
                {/* Paket Per Outlet */}
                <Card className="flex flex-col">
                    <CardHeader className="items-center text-center">
                        <div className="p-4 bg-secondary rounded-full inline-block mb-4">
                           <Store className="w-10 h-10 text-primary" />
                        </div>
                        <CardTitle className="font-headline">Per Outlet</CardTitle>
                        <CardDescription>Ideal untuk bisnis dengan satu lokasi.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-4">
                        <div className="text-4xl font-bold text-center">Rp 99.000<span className="text-base font-normal text-muted-foreground">/bln</span></div>
                         <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                <span><strong>1</strong> Kode QR Outlet Unik</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                <span><strong>5</strong> Kode QR Kasir</span>
                            </li>
                             <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                <span>Analitik Pendaftaran Dasar</span>
                            </li>
                             <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                <span>Manajemen Terpusat</span>
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" variant="outline">Pilih Paket</Button>
                    </CardFooter>
                </Card>

                {/* Paket Multi Cabang (Paling Populer) */}
                <Card className="border-2 border-primary shadow-lg relative flex flex-col">
                     <Badge variant="default" className="absolute -top-4 left-1/2 -translate-x-1/2">Paling Populer</Badge>
                    <CardHeader className="items-center text-center">
                        <div className="p-4 bg-secondary rounded-full inline-block mb-4">
                           <Building className="w-10 h-10 text-primary" />
                        </div>
                        <CardTitle className="font-headline">Multi Cabang Outlet</CardTitle>
                        <CardDescription>Sempurna untuk bisnis dengan beberapa cabang.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-4">
                       <div className="text-4xl font-bold text-center">Rp 499.000<span className="text-base font-normal text-muted-foreground">/bln</span></div>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                <span>Hingga <strong>10</strong> Kode QR Outlet</span>
                            </li>
                             <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                <span>Kode QR Kasir <strong>Tak Terbatas</strong></span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                <span>Analitik Lanjutan per Outlet</span>
                            </li>
                             <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                <span>Manajemen Terpusat</span>
                            </li>
                             <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                <span>Dukungan Prioritas</span>
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">Pilih Paket</Button>
                    </CardFooter>
                </Card>

                {/* Paket Enterprise */}
                <Card className="flex flex-col">
                    <CardHeader className="items-center text-center">
                        <div className="p-4 bg-secondary rounded-full inline-block mb-4">
                           <Globe className="w-10 h-10 text-primary" />
                        </div>
                        <CardTitle className="font-headline">Enterprise</CardTitle>
                        <CardDescription>Multi-cabang & multi-bisnis.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-4">
                        <div className="text-4xl font-bold text-center">Kustom</div>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                <span>Semua di paket <strong>Multi Cabang</strong></span>
                            </li>
                             <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                <span>Outlet & Bisnis Tak Terbatas</span>
                            </li>
                             <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                <span>Single Sign-On (SSO)</span>
                            </li>
                             <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                <span>Manajer Akun Khusus</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                <span>Integrasi API</span>
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full">Hubungi Penjualan</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
