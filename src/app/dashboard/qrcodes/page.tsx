
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, QrCode, Store, Building, Globe } from "lucide-react";
import { useAuth } from "../contexts/auth-context";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


export default function QrCodesPage() {
    const { user } = useAuth();
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
                
                {/* Paket Satu Cabang */}
                <Card className="flex flex-col">
                    <CardHeader className="items-center text-center">
                        <div className="p-4 bg-secondary rounded-full inline-block mb-4">
                           <Store className="w-10 h-10 text-primary" />
                        </div>
                        <CardTitle className="font-headline">Satu Cabang</CardTitle>
                        <CardDescription>Cocok untuk UMKM atau outlet tunggal di satu lokasi.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-4">
                        <div className="text-4xl font-bold text-center">Rp 49.000<span className="text-base font-normal text-muted-foreground">/bln</span></div>
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

                {/* Paket Banyak Cabang (Paling Populer) */}
                <Card className="border-2 border-primary shadow-lg relative flex flex-col">
                     <Badge variant="default" className="absolute -top-4 left-1/2 -translate-x-1/2">Paling Populer</Badge>
                    <CardHeader className="items-center text-center">
                        <div className="p-4 bg-secondary rounded-full inline-block mb-4">
                           <Building className="w-10 h-10 text-primary" />
                        </div>
                        <CardTitle className="font-headline">Banyak Cabang</CardTitle>
                        <CardDescription>Untuk pelaku usaha dengan beberapa cabang (2–5 lokasi).</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-4">
                       <div className="text-4xl font-bold text-center">Rp 99.000<span className="text-base font-normal text-muted-foreground">/bln</span></div>
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

                {/* Paket Multi Bisnis */}
                <Card className="flex flex-col">
                    <CardHeader className="items-center text-center">
                        <div className="p-4 bg-secondary rounded-full inline-block mb-4">
                           <Globe className="w-10 h-10 text-primary" />
                        </div>
                        <CardTitle className="font-headline">Multi Bisnis dan Banyak Cabang</CardTitle>
                        <CardDescription>Cocok untuk grup usaha yang punya lebih dari 1 jenis bisnis atau outlet &gt;5 cabang.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-4">
                        <div className="text-4xl font-bold text-center">Rp 199.000<span className="text-base font-normal text-muted-foreground">/bln</span></div>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                <span>Semua di paket <strong>Banyak Cabang</strong></span>
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
                        <Button variant="outline" className="w-full">Pilih Paket</Button>
                    </CardFooter>
                </Card>
            </div>

            <Card className="mt-12">
                <CardHeader>
                    <CardTitle className="font-headline">Biaya Penambahan (Add-on)</CardTitle>
                    <CardDescription>Untuk Member "Banyak Cabang" & "Multi Bisnis"</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Jenis Penambahan</TableHead>
                                <TableHead>Biaya Tambahan</TableHead>
                                <TableHead>Keterangan</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">Tambah 1 Cabang Baru</TableCell>
                                <TableCell>Rp 25.000 / cabang</TableCell>
                                <TableCell>Termasuk: 1 QR unik + 1 slot dashboard cabang</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Upgrade dari "1 Cabang" ke "Banyak Cabang"</TableCell>
                                <TableCell>Rp 50.000 (1x bayar)</TableCell>
                                <TableCell>Ubah akun agar bisa menambah banyak cabang</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Tambah Brand Baru (Multi Bisnis)</TableCell>
                                <TableCell>Rp 35.000 / brand</TableCell>
                                <TableCell>Untuk usaha lain dengan nama/bisnis berbeda</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Tambah Kampanye Promo Baru</TableCell>
                                <TableCell>Rp 20.000 / kampanye</TableCell>
                                <TableCell>Setelah kampanye pertama (gratis) dalam bulan berjalan</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <div className="mt-6 space-y-4 text-sm text-muted-foreground">
                        <div>
                            <h4 className="font-semibold text-foreground mb-2">Keterangan Tambahan:</h4>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Semua Member dapat 1 kampanye promo gratis per bulan.</li>
                                <li>Kampanye tambahan bersifat berbayar per eksekusi.</li>
                                <li>Sistem akan otomatis mendeteksi sisa kuota kampanye.</li>
                                <li>Penagihan otomatis ditambahkan ke tagihan bulan berjalan.</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground mb-2">Contoh Kasus:</h4>
                            <div className="p-4 bg-secondary rounded-lg">
                                <p className="font-medium text-secondary-foreground">Member "Banyak Cabang"</p>
                                <ul className="list-disc pl-5 space-y-1 mt-1">
                                    <li>Bulan ini sudah buat 1 kampanye (gratis).</li>
                                    <li>Mau kirim kampanye ke semua cabang → Buat 2 kampanye tambahan.</li>
                                    <li><strong>Tambahan biaya:</strong> 2 x Rp 20.000 = Rp 40.000</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}
