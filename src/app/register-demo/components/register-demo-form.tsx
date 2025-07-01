
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React from "react";
import Link from 'next/link';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { Check } from "lucide-react";

// Schema for form validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Nama harus diisi, minimal 2 karakter." }),
  outletName: z.string().min(2, { message: "Nama outlet harus diisi, minimal 2 karakter." }),
  outletAddress: z.string().min(10, { message: "Alamat outlet minimal 10 karakter." }),
  email: z.string().email({ message: "Format email tidak valid." }),
  whatsapp: z.string().min(10, { message: "Nomor WhatsApp minimal 10 digit." }),
  password: z.string().min(8, { message: "Password minimal 8 karakter." }),
});

export function RegisterDemoForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      outletName: "",
      outletAddress: "",
      email: "",
      whatsapp: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    // Simulate sending email to admin for activation
    console.log(`--- SIMULASI EMAIL AKTIVASI AKUN DEMO ---
Kepada: jimmy.tjahyono@gmail.com
Subjek: Pendaftaran Akun Demo Baru - ${values.outletName}

Halo Admin,

Ada pendaftaran baru untuk Akun Demo:

Informasi Pendaftar:
- Nama Kontak: ${values.name}
- Nama Outlet: ${values.outletName}
- Alamat Outlet: ${values.outletAddress}
- Email (untuk login): ${values.email}
- WhatsApp: ${values.whatsapp}
- Password: [SENSITIVE]

Untuk mengaktifkan, tambahkan pengguna ini ke file 'src/data/members.ts' dengan role: 'demo'.

Salam,
Sistem Notiflayer
--------------------`);

    // Simulate API call latency
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
        title: "Pendaftaran Terkirim!",
        description: "Data Anda telah kami terima. Akun demo akan segera diaktivasi oleh Admin.",
        duration: 9000,
    });
    
    setIsSuccess(true);
    setIsSubmitting(false);
  }

  if (isSuccess) {
    return (
        <Card className="w-full max-w-lg text-center shadow-2xl">
            <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
                    <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
                </div>
            </CardHeader>
            <CardContent className="space-y-2">
                <CardTitle className="font-headline text-2xl">Pendaftaran Diterima!</CardTitle>
                <CardDescription className="px-4">
                    Terima kasih telah mendaftar. Akun Anda sedang dalam peninjauan dan akan diaktifkan oleh Admin dalam 1x24 jam. Anda akan menerima notifikasi melalui email setelah akun siap digunakan.
                </CardDescription>
            </CardContent>
            <CardFooter className="flex flex-col items-center justify-center gap-4 pt-4">
                 <Button asChild className="w-full max-w-xs">
                    <Link href="/login">Kembali ke Halaman Login</Link>
                </Button>
            </CardFooter>
        </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg shadow-2xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 w-fit">
          <Logo />
        </div>
        <CardTitle className="font-headline text-2xl">Daftar Akun Demo</CardTitle>
        <CardDescription>
          Isi formulir di bawah ini untuk mencoba Notiflayer. Akun memerlukan aktivasi dari Admin.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap Anda</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: Budi Santoso" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="outletName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Outlet/Bisnis</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: Kedai Kopi Senja" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="outletAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat Outlet</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Contoh: Jl. Merdeka No. 17, Boyolali, 57311" className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Alamat Email</FormLabel>
                    <FormControl>
                        <Input type="email" placeholder="email@bisnisanda.com" {...field} />
                    </FormControl>
                    <FormDescription>
                        Email ini akan digunakan untuk login setelah akun diaktifkan.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
            <FormField
                control={form.control}
                name="whatsapp"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Nomor WhatsApp</FormLabel>
                    <FormControl>
                        <Input type="tel" placeholder="081234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
             <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="Minimal 8 karakter" {...field} />
                    </FormControl>
                     <FormDescription>
                        Password ini akan digunakan untuk login Notiflayer.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
            />
            
            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Mengirim Pendaftaran..." : "Daftar & Minta Aktivasi"}
            </Button>
          </form>
        </Form>
      </CardContent>
       <CardFooter className="flex justify-center">
            <p className="px-8 text-center text-sm text-muted-foreground">
                Sudah punya akun?{" "}
                <Link
                    href="/login"
                    className="underline underline-offset-4 hover:text-primary"
                >
                    Login di sini
                </Link>
            </p>
        </CardFooter>
    </Card>
  );
}
