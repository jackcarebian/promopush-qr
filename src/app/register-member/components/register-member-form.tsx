
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React, { useState, useMemo, useEffect } from "react";
import Link from 'next/link';
import { cn } from "@/lib/utils";

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
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { businessCategories, interestCategories } from "@/app/dashboard/campaigns/data/categories";
import { Check, Calculator, Minus, Plus } from "lucide-react";

// Schema for form validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Nama harus diisi, minimal 2 karakter." }),
  outletName: z.string().min(2, { message: "Nama outlet harus diisi, minimal 2 karakter." }),
  businessType: z.string({ required_error: "Pilih jenis bisnis Anda." }),
  branchType: z.enum(["satu-cabang", "banyak-cabang", "multi-bisnis"], { required_error: "Pilih paket langganan Anda." }),
  email: z.string().email({ message: "Format email tidak valid." }),
  whatsapp: z.string().min(10, { message: "Nomor WhatsApp minimal 10 digit." }),
});

export function RegisterMemberForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  
  // Pricing data for calculator
  const plans = {
      'satu-cabang': { name: 'Satu Cabang', cost: 49000 },
      'banyak-cabang': { name: 'Banyak Cabang', cost: 99000 },
      'multi-bisnis': { name: 'Multi Bisnis', cost: 199000 },
  };
  const campaignAddonCost = 20000;

  // State for the calculator
  const [additionalCampaignsInput, setAdditionalCampaignsInput] = useState(0);
  const [additionalBranchesInput, setAdditionalBranchesInput] = useState(0);
  const [additionalBrandsInput, setAdditionalBrandsInput] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      outletName: "",
      email: "",
      whatsapp: "",
      branchType: "banyak-cabang",
    },
  });
  
  const selectedPlan = form.watch("branchType");

  // Reset inputs when plan changes to avoid invalid states
  useEffect(() => {
      if (selectedPlan === 'satu-cabang') {
          setAdditionalBranchesInput(0);
      }
      if (selectedPlan !== 'multi-bisnis') {
          setAdditionalBrandsInput(0);
      }
  }, [selectedPlan]);

  // Memoized calculation for performance
  const { planCost, campaignCost, branchCost, brandCost, totalCost } = useMemo(() => {
      const pc = plans[selectedPlan].cost;
      const cc = additionalCampaignsInput * campaignAddonCost;
      
      let currentBranchAddonCost = 0;
      if (selectedPlan === 'banyak-cabang') {
          currentBranchAddonCost = 49000;
      } else if (selectedPlan === 'multi-bisnis') {
          currentBranchAddonCost = 49000;
      }

      const bc = selectedPlan === 'satu-cabang' ? 0 : additionalBranchesInput * currentBranchAddonCost;

      let currentBrandAddonCost = 0;
      if (selectedPlan === 'multi-bisnis') {
          currentBrandAddonCost = pc * 0.5; // 50% of the 'Multi Bisnis' plan cost
      }

      const brc = selectedPlan === 'multi-bisnis' ? additionalBrandsInput * currentBrandAddonCost : 0;
      const tc = pc + cc + bc + brc;

      return {
          planCost: pc,
          campaignCost: cc,
          branchCost: bc,
          brandCost: brc,
          totalCost: tc,
      };
  }, [selectedPlan, additionalCampaignsInput, additionalBranchesInput, additionalBrandsInput, plans]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    const selectedPlanName = plans[values.branchType].name;

    const costDetails = `
Estimasi Biaya Bulanan:
--------------------------
- Paket: ${selectedPlanName} (${formatCurrency(planCost)})
- Kampanye Tambahan: ${additionalCampaignsInput}x (${formatCurrency(campaignCost)})
- Cabang Tambahan: ${additionalBranchesInput}x (${formatCurrency(branchCost)})
- Brand Tambahan: ${additionalBrandsInput}x (${formatCurrency(brandCost)})
--------------------------
- Total Estimasi: ${formatCurrency(totalCost)} / bulan
    `;

    // Simulate sending email to admin
    console.log(`--- SIMULASI EMAIL AKTIVASI ---
Kepada: jimmy.tjahyono@gmail.com
Subjek: Pendaftaran Mitra Baru - ${values.name}

Halo Admin,

Ada pendaftaran baru sebagai Mitra Outlet Berbayar:

Informasi Pendaftar:
- Nama: ${values.name}
- Nama Outlet: ${values.outletName}
- Email: ${values.email}
- WhatsApp: ${values.whatsapp}
- Jenis Usaha: ${values.businessType}

Pilihan Paket & Estimasi Biaya:
${costDetails}

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
        <Card className="w-full max-w-2xl text-center shadow-2xl">
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
    <Card className="w-full max-w-2xl shadow-2xl">
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
                name="branchType"
                render={({ field }) => (
                    <FormItem>
                        <Card className="shadow-none border-t border-b-0 border-x-0 rounded-none pt-6 mt-6 -mx-6 px-6">
                            <CardHeader className="items-center text-center p-0 mb-6">
                                <Calculator className="w-8 h-8 text-primary mb-3" />
                                <CardTitle className="font-headline text-xl">Pilih Paket & Estimasi Biaya</CardTitle>
                                <CardDescription>
                                Pilih paket yang paling sesuai dengan skala bisnis Anda.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid md:grid-cols-2 gap-8 p-0">
                            <div className="space-y-4">
                                <FormLabel className="font-semibold">Paket Langganan</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="space-y-3"
                                    >
                                        {Object.entries(plans).map(([key, { name, cost }]) => (
                                        <FormItem key={key} className="flex items-center space-x-3">
                                            <FormControl>
                                            <RadioGroupItem value={key} id={key} />
                                            </FormControl>
                                            <Label htmlFor={key} className="grid grid-cols-[1fr_auto] gap-4 w-full font-normal cursor-pointer text-sm">
                                            <span>{name}</span>
                                            <span className="font-medium">{formatCurrency(cost)}</span>
                                            </Label>
                                        </FormItem>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <Label className="font-semibold">Penambahan (Opsional)</Label>
                                    <FormDescription className="text-xs">Di luar kuota paket dasar Anda.</FormDescription>
                                </div>
                                <div className="flex flex-col gap-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label htmlFor="campaign-count" className="text-sm">Kampanye Tambahan</Label>
                                                <p className="text-xs text-muted-foreground">Gratis 1 per bulan.</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button type="button" variant="outline" size="icon" className="h-8 w-8 shrink-0 rounded-full" onClick={() => setAdditionalCampaignsInput(p => Math.max(0, p - 1))} disabled={additionalCampaignsInput === 0}><Minus className="h-4 w-4" /><span className="sr-only">Kurangi</span></Button>
                                                <Input id="campaign-count" type="text" className="h-8 w-12 text-center" value={additionalCampaignsInput} readOnly />
                                                <Button type="button" variant="outline" size="icon" className="h-8 w-8 shrink-0 rounded-full" onClick={() => setAdditionalCampaignsInput(p => p + 1)}><Plus className="h-4 w-4" /><span className="sr-only">Tambah</span></Button>
                                            </div>
                                        </div>
                                        <div className={cn("flex items-center justify-between transition-opacity", selectedPlan === 'satu-cabang' && "opacity-50")}>
                                            <div>
                                                <Label htmlFor="branch-count" className="text-sm">Cabang Tambahan</Label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button type="button" variant="outline" size="icon" className="h-8 w-8 shrink-0 rounded-full" onClick={() => setAdditionalBranchesInput(p => Math.max(0, p - 1))} disabled={selectedPlan === 'satu-cabang' || additionalBranchesInput === 0}><Minus className="h-4 w-4" /><span className="sr-only">Kurangi</span></Button>
                                                <Input id="branch-count" type="text" className="h-8 w-12 text-center" value={additionalBranchesInput} readOnly disabled={selectedPlan === 'satu-cabang'} />
                                                <Button type="button" variant="outline" size="icon" className="h-8 w-8 shrink-0 rounded-full" onClick={() => setAdditionalBranchesInput(p => p + 1)} disabled={selectedPlan === 'satu-cabang'}><Plus className="h-4 w-4" /><span className="sr-only">Tambah</span></Button>
                                            </div>
                                        </div>
                                        <div className={cn("flex items-center justify-between transition-opacity", selectedPlan !== 'multi-bisnis' && "opacity-50")}>
                                            <div>
                                                <Label htmlFor="brand-count" className="text-sm">Brand Tambahan</Label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button type="button" variant="outline" size="icon" className="h-8 w-8 shrink-0 rounded-full" onClick={() => setAdditionalBrandsInput(p => Math.max(0, p - 1))} disabled={selectedPlan !== 'multi-bisnis' || additionalBrandsInput === 0}><Minus className="h-4 w-4" /><span className="sr-only">Kurangi</span></Button>
                                                <Input id="brand-count" type="text" className="h-8 w-12 text-center" value={additionalBrandsInput} readOnly disabled={selectedPlan !== 'multi-bisnis'} />
                                                <Button type="button" variant="outline" size="icon" className="h-8 w-8 shrink-0 rounded-full" onClick={() => setAdditionalBrandsInput(p => p + 1)} disabled={selectedPlan !== 'multi-bisnis'}><Plus className="h-4 w-4" /><span className="sr-only">Tambah</span></Button>
                                            </div>
                                        </div>
                                </div>
                            </div>
                            </CardContent>
                            <CardFooter className="flex flex-col items-start bg-secondary p-4 rounded-lg mt-6">
                                <h3 className="text-base font-semibold mb-3 text-foreground">Rincian Estimasi Biaya:</h3>
                                <div className="w-full space-y-1.5 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Paket {plans[selectedPlan].name}</span>
                                        <span className="font-medium text-foreground">{formatCurrency(planCost)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Tambahan Kampanye ({additionalCampaignsInput}x)</span>
                                        <span className="font-medium text-foreground">{formatCurrency(campaignCost)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Tambahan Cabang ({additionalBranchesInput}x)</span>
                                        <span className="font-medium text-foreground">{formatCurrency(branchCost)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Tambahan Brand ({additionalBrandsInput}x)</span>
                                        <span className="font-medium text-foreground">{formatCurrency(brandCost)}</span>
                                    </div>
                                    <hr className="my-2 border-dashed border-border"/>
                                    <div className="flex justify-between items-center text-base font-bold text-primary">
                                        <span>Total Estimasi per Bulan</span>
                                        <span className="text-xl">{formatCurrency(totalCost)}</span>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
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
