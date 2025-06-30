
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { businessCategories, interestCategories } from "@/app/dashboard/campaigns/data/categories";
import { Check } from "lucide-react";

// Schema for form validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Nama harus diisi, minimal 2 karakter." }),
  outletName: z.string().min(2, { message: "Nama outlet harus diisi, minimal 2 karakter." }),
  businessType: z.string({ required_error: "Pilih jenis bisnis Anda." }),
  branchType: z.enum(["single", "multi"], { required_error: "Pilih tipe cabang bisnis Anda." }),
  email: z.string().email({ message: "Format email tidak valid." }),
  whatsapp: z.string().min(10, { message: "Nomor WhatsApp minimal 10 digit." }),
});

export function RegisterMemberForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      outletName: "",
      email: "",
      whatsapp: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    // Simulate sending email to admin
    console.log(`--- SIMULASI EMAIL AKTIVASI ---
Kepada: jimmy.tjahyono@gmail.com
Subjek: Pendaftaran Mitra Baru - ${values.name}

Halo Admin,

Ada pendaftaran baru sebagai Mitra Outlet Berbayar:

Nama: ${values.name}
Nama Outlet: ${values.outletName}
Email: ${values.email}
WhatsApp: ${values.whatsapp}
Jenis Usaha: ${values.businessType}
Tipe Cabang: ${values.branchType === 'single' ? 'Satu Cabang' : 'Multi Cabang / Multi Bisnis'}

Silakan aktifkan akun melalui dasbor admin Anda.

Salam,
Tim Notiflayer
--------------------`);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
        title: "Pendaftaran Terkirim!",
        description: "Data Anda berhasil dikirim. Akun Anda akan segera diaktivasi oleh Admin.",
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
                <CardTitle className="font-headline text-2xl">Pendaftaran Berhasil!</CardTitle>
                <CardDescription className="px-4">
                    Terima kasih telah mendaftar! Akun Anda sedang dalam peninjauan oleh Admin. Anda akan menerima notifikasi email setelah akun Anda diaktifkan.
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
        <CardTitle className="font-headline text-2xl">Daftar sebagai Member Outlet</CardTitle>
        <CardDescription>
          Isi formulir di bawah ini untuk menjadi mitra Notiflayer.
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
              name="businessType"
              render={({ field }) => (
                  <FormItem>
                      <FormLabel>Jenis Bisnis</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                              <SelectTrigger>
                                  <SelectValue placeholder="Pilih jenis bisnis Anda" />
                              </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                              {businessCategories.map(category => (
                                  <SelectItem key={category} value={category}>
                                      {interestCategories[category].emoji} {category}
                                  </SelectItem>
                              ))}
                          </SelectContent>
                      </Select>
                      <FormMessage />
                  </FormItem>
              )}
            />
             <FormField
                control={form.control}
                name="branchType"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel>Skala Bisnis Anda</FormLabel>
                        <FormControl>
                            <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                            >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                    <RadioGroupItem value="single" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                    Satu Cabang
                                    </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                    <RadioGroupItem value="multi" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                    Multi Cabang / Multi Bisnis
                                    </FormLabel>
                                </FormItem>
                            </RadioGroup>
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
            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Mengirim Pendaftaran..." : "Daftar Sekarang"}
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
