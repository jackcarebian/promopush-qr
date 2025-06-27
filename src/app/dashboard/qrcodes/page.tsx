import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, QrCode, Store, ConciergeBell } from "lucide-react";

const features = [
    { name: "Kode QR Outlet Unik", description: "Setiap outlet mendapatkan kode QR unik untuk pelacakan yang mudah." },
    { name: "Kode QR Kasir", description: "Hasilkan kode QR spesifik untuk setiap kasir untuk pencatatan redem." },
    { name: "Analitik Pendaftaran", description: "Lacak berapa banyak pendaftaran yang dihasilkan oleh setiap kode QR." },
    { name: "Manajemen Terpusat", description: "Kelola semua kode QR Anda dari satu dasbor yang mudah digunakan." },
    { name: "Tidak Terbatas", description: "Hasilkan kode QR sebanyak yang Anda butuhkan untuk outlet dan kasir Anda." },
]

export default function QrCodesPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-headline font-bold flex items-center gap-2">
                    <QrCode className="w-8 h-8" />
                    Langganan Kode QR
                </h1>
                <p className="text-muted-foreground">Perluas jangkauan Anda dengan kode QR yang dapat disesuaikan untuk outlet dan kasir Anda.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="font-headline">Tingkatkan Akuisisi Pelanggan Anda</CardTitle>
                        <CardDescription>Layanan langganan kode QR kami dirancang untuk membantu Anda mengubah pengunjung fisik menjadi pelanggan digital dengan mudah. Tempatkan kode QR di outlet Anda, di meja kasir, atau bahkan pada materi pemasaran untuk mendorong pendaftaran instan ke program loyalitas dan promosi Anda.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <h3 className="font-semibold font-headline">Fitur Utama:</h3>
                        <ul className="space-y-3">
                            {features.map((feature, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium">{feature.name}</p>
                                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <div className="space-y-8">
                    <Card className="bg-primary text-primary-foreground">
                        <CardHeader>
                            <CardTitle className="font-headline">Siap untuk Memulai?</CardTitle>
                            <CardDescription className="text-primary-foreground/80">Pilih paket yang paling sesuai untuk bisnis Anda.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold">Mulai dari Rp 99.000/bln</div>
                            <p className="text-sm text-primary-foreground/80 mt-1">per outlet</p>
                        </CardContent>
                        <CardFooter>
                            <Button variant="secondary" className="w-full">Hubungi Penjualan</Button>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-lg">Contoh Penggunaan</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div className="flex items-center gap-3">
                                <Store className="w-5 h-5 text-muted-foreground" />
                                <p>Tempatkan QR di pintu masuk <span className="font-semibold">Outlet</span> untuk menangkap pelanggan baru.</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <ConciergeBell className="w-5 h-5 text-muted-foreground" />
                                <p>Letakkan QR <span className="font-semibold">Kasir</span> di meja untuk promo saat pembayaran.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
