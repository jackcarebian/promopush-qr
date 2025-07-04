
"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import { QrCode, Mail, Calendar, Users, Bot, ShoppingCart, Check, Store, Building, Globe, Calculator, Minus, Plus } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

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
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
                <Link href="/register-demo">Daftar Demo</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="pt-20 md:pt-24 pb-16 md:pb-24">
          <div className="container text-center">
            <div className="mb-10 flex justify-center">
                <Image
                    src="https://i.imghippo.com/files/kHRT8148tqk.png"
                    alt="Dua orang tersenyum bahagia sambil menunjukkan notifikasi promo di ponsel mereka"
                    data-ai-hint="happy people"
                    width={1024}
                    height={683}
                    className="max-w-full h-auto"
                    priority
                />
            </div>
            <h1 className="text-4xl md:text-6xl font-headline font-bold mb-6 text-foreground tracking-tight">
              Semua yang anda perlukan untuk memulai <br className="hidden md:block" /> kampanye promo yang efektif dan sukses
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground mb-10">
              Notiflayer adalah platform lengkap untuk mengubah pengunjung menjadi pelanggan setia melalui pendaftaran berbasis QR dan notifikasi push yang dipersonalisasi.
            </p>
            <Button size="lg" asChild>
              <Link href="/register-demo">Mulai Sekarang</Link>
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

        <section id="pricing" className="py-20 md:py-32">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">Langganan Kode QR</h2>
              <p className="text-muted-foreground mt-4">
                Pilih paket langganan yang paling sesuai untuk skala dan kebutuhan bisnis Anda.
              </p>
            </div>

            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
                <h2 className="text-2xl font-bold font-headline text-primary">Buka Potensi Penuh Bisnis Anda</h2>
                <div className="text-muted-foreground mt-4 space-y-3">
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
                         <ul className="space-y-3 text-sm text-left">
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
                        <Button className="w-full" variant="outline" asChild><Link href="/register-member">Pilih Paket</Link></Button>
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
                        <ul className="space-y-3 text-sm text-left">
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
                        <Button className="w-full" asChild><Link href="/register-member">Pilih Paket</Link></Button>
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
                        <ul className="space-y-3 text-sm text-left">
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
                        <Button variant="outline" className="w-full" asChild><Link href="/register-member">Pilih Paket</Link></Button>
                    </CardFooter>
                </Card>
            </div>

             <Card className="mt-16 max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl text-center">Biaya Penambahan Fleksibel (Add-on)</CardTitle>
                    <CardDescription className="text-center">Untuk Member "Banyak Cabang" & "Multi Bisnis"</CardDescription>
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
                                <TableCell className="font-medium">Tambah Cabang (Banyak Cabang)</TableCell>
                                <TableCell>Rp 49.000 / cabang</TableCell>
                                <TableCell>Langganan bulanan tetap berlaku per outlet.</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Tambah Cabang (Multi Bisnis)</TableCell>
                                <TableCell>Rp 49.000 / cabang</TableCell>
                                <TableCell>Biaya 50% dari paket bulanan Banyak Cabang.</TableCell>
                            </TableRow>
                             <TableRow>
                                <TableCell className="font-medium">Tambah Brand (Multi Bisnis)</TableCell>
                                <TableCell>Rp 99.500 / brand</TableCell>
                                <TableCell>Biaya 50% dari paket bulanan Multi Bisnis.</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Upgrade dari "1 Cabang" ke "Banyak Cabang"</TableCell>
                                <TableCell>Rp 50.000 (1x bayar)</TableCell>
                                <TableCell>Ubah akun agar bisa menambah banyak cabang. Langganan bulanan tetap berlaku per outlet.</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Tambah Kampanye Promo Baru</TableCell>
                                <TableCell>Rp 20.000 / kampanye</TableCell>
                                <TableCell>Setelah 1 kampanye gratis per bulan habis.</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                     <div className="mt-6 grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
                        <div>
                            <h4 className="font-semibold text-foreground mb-2">Keterangan Tambahan:</h4>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Semua Member mendapatkan <strong>1 kampanye promo gratis</strong> setiap bulan.</li>
                                <li>Kampanye tambahan bersifat berbayar per eksekusi.</li>
                                <li>Sistem secara otomatis akan menghitung sisa kuota kampanye Anda.</li>
                                <li>Penagihan add-on akan digabungkan dengan tagihan bulanan Anda.</li>
                            </ul>
                        </div>
                        <div className="p-4 bg-secondary rounded-lg">
                            <h4 className="font-semibold text-secondary-foreground mb-2">Contoh Kasus:</h4>
                             <p className="font-medium text-secondary-foreground">Member "Banyak Cabang"</p>
                            <ul className="list-disc pl-5 space-y-1 mt-1 text-secondary-foreground">
                                <li>Bulan ini sudah menggunakan 1 kampanye (gratis).</li>
                                <li>Membuat 2 kampanye tambahan untuk cabang lain.</li>
                                <li className="font-bold">Total Biaya Tambahan: Rp 40.000</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>

          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container text-center text-muted-foreground">
          &copy; {new Date().getFullYear()} Notiflayer. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
