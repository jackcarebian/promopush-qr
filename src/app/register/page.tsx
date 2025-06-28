
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React from "react";

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
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { interestCategories } from "../dashboard/campaigns/data/categories";

// Firebase imports
import { db, messaging } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { getToken } from "firebase/messaging";

const allInterests = Object.values(interestCategories).flatMap(category => category.interests);

const formSchema = z.object({
  name: z.string().min(2, { message: "Nama harus memiliki setidaknya 2 karakter." }),
  email: z.string().email({ message: "Format email tidak valid." }),
  interests: z.array(z.string()).refine((value) => value.length > 0, {
    message: "Anda harus memilih setidaknya satu minat.",
  }),
});

export default function RegisterPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      interests: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    if (typeof window === "undefined" || !navigator.serviceWorker || !messaging) {
      toast({
        variant: "destructive",
        title: "Browser Tidak Mendukung",
        description: "Fitur notifikasi tidak didukung di browser ini atau layanan notifikasi gagal dimuat.",
      });
      setIsSubmitting(false);
      return;
    }
    
    try {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
            throw new Error('Izin notifikasi ditolak oleh pengguna.');
        }

        const sw = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
        const fcmToken = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
            serviceWorkerRegistration: sw,
        });

        if (fcmToken) {
            await addDoc(collection(db, "pelanggan"), {
                name: values.name,
                email: values.email,
                interests: values.interests,
                token_fcm: fcmToken,
                registeredAt: new Date().toISOString(),
            });

            toast({
                title: "Pendaftaran Berhasil!",
                description: "Terima kasih! Notifikasi promo telah diaktifkan untuk Anda.",
            });
            form.reset();
        } else {
             throw new Error('Gagal mendapatkan token notifikasi. Pastikan Anda tidak dalam mode incognito dan coba muat ulang halaman.');
        }

    } catch (err) {
        console.error("Gagal mendaftar:", err);
        const errorMessage = err instanceof Error ? err.message : "Terjadi kesalahan.";
        toast({
            variant: "destructive",
            title: "Pendaftaran Gagal",
            description: `Gagal menyimpan data atau mengaktifkan notifikasi. ${errorMessage}`,
        });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-fit">
            <Logo />
          </div>
          <CardTitle className="font-headline text-2xl">Daftar untuk Promo Eksklusif</CardTitle>
          <CardDescription>
            Jadilah yang pertama tahu tentang penawaran dan diskon terbaru kami!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input placeholder="Budi Santoso" {...field} />
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
                      <Input type="email" placeholder="budi.s@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="interests"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Preferensi Minat Promo</FormLabel>
                      <FormDescription>
                        Pilih kategori yang Anda minati untuk mendapatkan promo yang relevan.
                      </FormDescription>
                    </div>
                    <div className="max-h-40 overflow-y-auto space-y-2 rounded-md border p-4">
                        {allInterests.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="interests"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        const currentValue = field.value || [];
                                        return checked
                                          ? field.onChange([...currentValue, item.id])
                                          : field.onChange(
                                              currentValue.filter(
                                                (value) => value !== item.id
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">{item.label}</FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Memproses..." : "Daftar & Aktifkan Notifikasi"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
