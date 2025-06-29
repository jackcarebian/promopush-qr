
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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { Skeleton } from "@/components/ui/skeleton";
import { interestCategories } from "@/app/dashboard/campaigns/data/categories";
import { getOutletById } from "@/data/outlets";
import { Check } from "lucide-react";


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

// Pre-calculate all interests at the module level to ensure a stable reference.
const allInterests = Object.values(interestCategories).flatMap(category => category.interests);

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
  // Default messages for success with no token
  let toastTitle = "Pendaftaran Berhasil!";
  let toastDescription = "Terima kasih! Data Anda telah kami simpan.";

  // 1. Check for browser support
  if (typeof window === "undefined" || !('serviceWorker' in navigator) || !window.isSecureContext) {
    console.warn("DIAGNOSTIC: Browser tidak mendukung notifikasi atau konteks tidak aman. Proses aktivasi notifikasi dilewati.");
    toastDescription = "Data Anda tersimpan, namun notifikasi tidak dapat diaktifkan di browser ini.";
    return { fcmToken: "", toastTitle, toastDescription };
  }
  
  if (!messaging) {
    console.warn("DIAGNOSTIC: Layanan Firebase Messaging tidak tersedia. Proses aktivasi notifikasi dilewati.");
    toastTitle = "Pendaftaran Berhasil, Notifikasi Tidak Tersedia";
    toastDescription = "Layanan notifikasi tidak dapat dimuat saat ini.";
    return { fcmToken: "", toastTitle, toastDescription };
  }

  // 2. Request permission
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.log("DIAGNOSTIC: Izin notifikasi ditolak oleh pengguna.");
      toastTitle = "Pendaftaran Berhasil, Notifikasi Tidak Aktif";
      toastDescription = "Anda tidak akan menerima promo hingga izin notifikasi diberikan di pengaturan browser.";
      return { fcmToken: "", toastTitle, toastDescription };
    }
  } catch (err) {
      console.error("DIAGNOSTIC: Error saat meminta izin notifikasi:", err);
      toastDescription = "Gagal meminta izin notifikasi. Anda dapat mengaktifkannya secara manual nanti.";
      return { fcmToken: "", toastTitle, toastDescription };
  }

  // 3. Get the FCM token
  try {
    console.log("DIAGNOSTIC: Mencoba mendapatkan token FCM...");
    const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
    if (!vapidKey) {
        console.error("DIAGNOSTIC: VAPID key tidak ditemukan di environment variables.");
        throw new Error("Missing VAPID key configuration.");
    }

    const token = await getToken(messaging, { vapidKey });

    if (token) {
      console.log("DIAGNOSTIC: Token FCM berhasil didapatkan:", token);
      toastTitle = "Pendaftaran Berhasil!";
      toastDescription = "Terima kasih! Notifikasi promo telah diaktifkan untuk Anda.";
      return { fcmToken: token, toastTitle, toastDescription };
    } else {
      console.warn("DIAGNOSTIC: Gagal mendapatkan token FCM: 'getToken' tidak mengembalikan token. Cek service worker.");
      toastTitle = "Pendaftaran Berhasil, Notifikasi Gagal Aktif";
      toastDescription = "Kami gagal mengaktifkan notifikasi untuk browser Anda. Pastikan tidak ada yang memblokir service worker.";
      return { fcmToken: "", toastTitle, toastDescription };
    }
  } catch (err) {
    console.error("DIAGNOSTIC: Error saat proses mendapatkan token FCM:", err);
    toastTitle = "Pendaftaran Berhasil, Notifikasi Gagal Aktif";
    if (err instanceof Error) {
        if (err.message.includes("permission-blocked") || err.message.includes("permission default")) {
          toastDescription = "Izin notifikasi diblokir. Harap aktifkan di pengaturan browser Anda.";
        } else if (err.message.includes("unsupported-browser")) {
            toastDescription = "Browser Anda tidak mendukung fitur notifikasi ini.";
        } else if (err.message.includes("service-worker-unsupported")) {
            toastDescription = "Service worker tidak didukung di browser ini.";
        } else {
            toastDescription = "Terjadi kesalahan saat mencoba mengaktifkan notifikasi. Cek konsol untuk detail.";
        }
    } else {
        toastDescription = "Terjadi kesalahan yang tidak diketahui saat mengaktifkan notifikasi.";
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
    // Fallback to a stable, pre-calculated array of all interests
    return allInterests; 
  }, [outlet]);

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

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
    // Reset interests when the available interests change, ensuring no invalid selections persist.
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
      console.log(`DIAGNOSTIC: Menyimpan data pelanggan dengan token FCM: ${fcmToken || 'tidak ada'}`);
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
      setIsSuccess(true);

    } catch (error) {
      console.error("DIAGNOSTIC: Gagal menyimpan pendaftaran ke Firestore:", error);
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
                    Terima kasih telah bergabung. Anda akan menjadi orang pertama yang tahu tentang promo eksklusif kami.
                </CardDescription>
            </CardContent>
            <CardFooter className="flex flex-col items-center justify-center gap-4 pt-4">
                <p className="text-sm text-muted-foreground">Anda sekarang dapat menutup halaman ini.</p>
                <Button onClick={() => window.close()} className="w-full max-w-xs">Tutup Halaman</Button>
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
