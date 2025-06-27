import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import { QrCode, Mail, Calendar, Users, Bot, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: <QrCode className="w-8 h-8 text-primary" />,
    title: 'Akses Kode QR',
    description: 'Pemindaian kode QR untuk akses langsung ke formulir pendaftaran promo Anda.',
  },
  {
    icon: <Mail className="w-8 h-8 text-primary" />,
    title: 'Notifikasi Push Web',
    description: 'Kirim notifikasi promo langsung ke peramban pelanggan Anda dengan Firebase Cloud Messaging.',
  },
  {
    icon: <Calendar className="w-8 h-8 text-primary" />,
    title: 'Manajemen Kampanye',
    description: 'Buat, jadwalkan, dan lacak kampanye pemasaran Anda dengan mudah.',
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: 'Database Pelanggan',
    description: 'Kelola data pelanggan Anda di satu tempat yang aman dan terpusat.',
  },
  {
    icon: <Bot className="w-8 h-8 text-primary" />,
    title: 'Tool Pemasaran AI',
    description: 'Hasilkan salinan pemasaran yang menarik secara dinamis berdasarkan jenis bisnis Anda.',
  },
  {
    icon: <ShoppingCart className="w-8 h-8 text-primary" />,
    title: 'Pencatatan Redem',
    description: 'Catat setiap kali promosi digunakan oleh pelanggan di titik penjualan.',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Logo />
          <Button asChild>
            <Link href="/login">Login Demo</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 md:py-32">
          <div className="container text-center">
            <h1 className="text-4xl md:text-6xl font-headline font-bold mb-6 text-foreground tracking-tight">
              Semua yang anda perlukan untuk memulai <br className="hidden md:block" /> kampanye promo yang efektif dan sukses
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground mb-10">
              Notiflayer adalah platform lengkap untuk mengubah pengunjung menjadi pelanggan setia melalui pendaftaran berbasis QR dan notifikasi push yang dipersonalisasi.
            </p>
            <Button size="lg" asChild>
              <Link href="/login">Mulai Sekarang</Link>
            </Button>
          </div>
        </section>

        <section id="features" className="py-20 md:py-32 bg-secondary">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">Fitur Unggulan</h2>
              <p className="text-muted-foreground mt-4">
                Temukan alat canggih yang kami sediakan untuk memberdayakan strategi pemasaran Anda.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="bg-background text-left shadow-md hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="flex flex-row items-center gap-4">
                    {feature.icon}
                    <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container text-center text-muted-foreground">
          &copy; {new Date().getFullYear()} PromoPush QR. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
