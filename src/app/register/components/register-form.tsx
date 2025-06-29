
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React from "react";
import { useSearchParams } from "next/navigation";

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
import { Skeleton } from "@/components/ui/skeleton";
import { interestCategories } from "@/app/dashboard/campaigns/data/categories";
import { getOutletById } from "@/data/outlets";

// Firebase imports
import { db, messaging } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { getToken } from "firebase/messaging";

const formSchema = z.object({
  name: z.string().min(2, { message: "Nama harus memiliki setidaknya 2 karakter." }),
  email: z.string().email({ message: "Format email tidak valid." }),
  whatsapp: z.string().optional(),
  interests: z.array(z.string()).refine((value) => value.length > 0, {
    message: "Anda harus memilih setidaknya satu minat.",
  }),
});

export function RegisterFormSkeleton() {
    return (
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-fit">
            <Logo />
          </div>
          <CardTitle className="font-headline text-2xl">Daftar untuk Promo Eksklusif</CardTitle>
          <CardDescription>
            Memuat formulir...
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
            </div>
             <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
            </div>
             <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
                 <Skeleton className="h-5 w-48 mb-2" />
                 <Skeleton className="h-40 w-full" />
            </div>
            <Skeleton className="h-12 w-full" />
        </CardContent>
      </Card>
    )
}

// Helper function to isolate the token logic for better error handling and clarity
async function getNotificationToken(): Promise<{ fcmToken: string; toastTitle: string; toastDescription: string }> {
  let toastTitle = "Pendaftaran Berhasil!";
  let toastDescription = "Terima kasih! Data Anda telah kami simpan.";

  // 1. Check for browser support & secure environment
  if (typeof window === "undefined" || !('serviceWorker' in navigator) || !window.isSecureContext) {
    console.warn("Browser tidak mendukung notifikasi atau konteks tidak aman. Proses aktivasi notifikasi dilewati.");
    toastDescription = "Browser Anda tidak mendukung notifikasi atau koneksi tidak aman.";
    return { fcmToken: "", toastTitle, toastDescription };
  }
  
  if (!messaging) {
    console.warn("Layanan Firebase Messaging tidak tersedia. Proses aktivasi notifikasi dilewati.");
    toastTitle = "Pendaftaran Berhasil, Notifikasi Tidak Tersedia";
    toastDescription = "Layanan notifikasi tidak dapat dimuat saat ini.";
    return { fcmToken: "", toastTitle, toastDescription };
  }

  try {
    // 2. Request permission from the user
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.log("Izin notifikasi ditolak oleh pengguna.");
      toastTitle = "Pendaftaran Berhasil, Notifikasi Tidak Aktif";
      toastDescription = "Anda tidak akan menerima promo hingga izin notifikasi diberikan di pengaturan browser.";
      return { fcmToken: "", toastTitle, toastDescription };
    }

    // 3. Register the service worker
    console.log("Izin notifikasi diberikan. Mendaftarkan service worker...");
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };
    const swUrl = `/firebase-messaging-sw.js?${new URLSearchParams(firebaseConfig as Record<string, string>).toString()}`;
    const registration = await navigator.serviceWorker.register(swUrl);
    console.log("Service worker berhasil didaftarkan:", registration);

    // 4. Get the FCM token
    console.log("Mencoba mendapatkan token FCM...");
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: registration,
    });

    if (token) {
      console.log("Token FCM berhasil didapatkan:", token);
      toastDescription = "Terima kasih! Notifikasi promo telah diaktifkan untuk Anda.";
      return { fcmToken: token, toastTitle, toastDescription };
    } else {
      console.warn("Gagal mendapatkan token FCM. 'getToken' tidak mengembalikan token.");
      toastTitle = "Pendaftaran Berhasil, Notifikasi Gagal Aktif";
      toastDescription = "Kami gagal mengaktifkan notifikasi untuk browser Anda. Anda dapat mencobanya lagi nanti.";
      return { fcmToken: "", toastTitle, toastDescription };
    }
  } catch (err) {
    console.error("Error saat proses aktivasi notifikasi:", err);
    toastTitle = "Pendaftaran Berhasil, Notifikasi Gagal Aktif";
    if (err instanceof Error && err.message.includes("unsupported-browser")) {
      toastDescription = "Browser Anda tidak mendukung fitur notifikasi ini.";
    } else {
      toastDescription = "Terjadi kesalahan saat mencoba mengaktifkan notifikasi.";
    }
    return { fcmToken: "", toastTitle, toastDescription };
  }
}

export function RegisterForm() {
  const searchParams = useSearchParams();
  const outletId = searchParams.get('outlet');
  const outlet = React.useMemo(() => getOutletById(outletId), [outletId]);

  const interestsToShow = React.useMemo(() => {
    if (outlet && interestCategories[outlet.businessCategory]) {
      return interestCategories[outlet.businessCategory].interests;
    }
    return Object.values(interestCategories).flatMap(category => category.interests);
  }, [outlet]);

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      whatsapp: "",
      interests: [],
    },
  });

  React.useEffect(() => {
    form.reset({ ...form.getValues(), interests: [] });
  }, [interestsToShow, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    if (!db) {
        toast({
            variant: "destructive",
            title: "Pendaftaran Gagal",
            description: "Layanan tidak tersedia. Konfigurasi server tidak lengkap.",
        });
        setIsSubmitting(false);
        return;
    }

    // Get token and user-facing messages by running our robust helper function
    const { fcmToken, toastTitle, toastDescription } = await getNotificationToken();

    try {
      console.log(`Menyimpan data pelanggan dengan token FCM: ${fcmToken || 'tidak ada'}`);
      // Always save customer data to Firestore, with or without a token
      await addDoc(collection(db, "pelanggan"), {
        name: values.name,
        email: values.email,
        whatsapp: values.whatsapp || '',
        interests: values.interests,
        fcmToken: fcmToken,
        registeredAt: new Date().toISOString(),
        outletId: outletId || 'unknown',
      });

      toast({
        title: toastTitle,
        description: toastDescription,
      });
      form.reset();

    } catch (error) {
      console.error("Gagal menyimpan pendaftaran ke Firestore:", error);
      const errorMessage = error instanceof Error ? error.message : "Terjadi kesalahan pada database.";
      toast({
        variant: "destructive",
        title: "Pendaftaran Gagal Disimpan",
        description: `Kami tidak dapat menyimpan data Anda saat ini. ${errorMessage}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-lg shadow-2xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 w-fit">
          <Logo />
        </div>
        <CardTitle className="font-headline text-2xl">Daftar untuk Promo Eksklusif</CardTitle>
        <CardDescription>
          {outlet
            ? `Jadilah yang pertama tahu tentang penawaran dari ${outlet.name}!`
            : "Jadilah yang pertama tahu tentang penawaran dan diskon terbaru kami!"}
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
              name="whatsapp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor WhatsApp (Opsional)</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="081234567890" {...field} />
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
                      {interestsToShow.map((item) => (
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
  );
}
