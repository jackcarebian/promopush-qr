
"use client";

import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { generateMarketingCopy, GenerateMarketingCopyOutput } from '@/ai/flows/generate-marketing-copy';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Wand2, Copy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  businessType: z.string({ required_error: 'Pilih jenis bisnismu dulu ya.' }),
  productService: z.string().min(3, { message: 'Isi produknya dong, minimal 3 karakter.' }),
  targetAudience: z.string().min(3, { message: 'Siapa target pasarmu? Minimal 3 karakter.' }),
  tone: z.enum(['santai', 'profesional', 'lucu', 'bersemangat'], {
    required_error: 'Pilih gaya bahasanya juga.',
  }),
});

export function GenerateCopyForm() {
  const [isPending, startTransition] = useTransition();
  const [generatedCopies, setGeneratedCopies] = useState<GenerateMarketingCopyOutput['copies']>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setGeneratedCopies([]);
    startTransition(async () => {
      try {
        const result = await generateMarketingCopy(values);
        setGeneratedCopies(result.copies);
      } catch (error) {
        console.error(error);
        toast({
          variant: 'destructive',
          title: 'Waduh, Gagal Nih!',
          description: 'Gagal menghasilkan ide promosi. Coba lagi beberapa saat ya.',
        });
      }
    });
  };

  const handleCopy = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    toast({
      title: 'Sip, Berhasil Disalin!',
      description: 'Kalimat promosinya udah siap kamu pake.',
    });
  };

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="businessType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenis Bisnis</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis bisnismu" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Restoran">Restoran</SelectItem>
                      <SelectItem value="Toko Ritel Fashion">Toko Ritel Fashion</SelectItem>
                      <SelectItem value="Toko Online">Toko Online</SelectItem>
                      <SelectItem value="Kedai Kopi">Kedai Kopi</SelectItem>
                      <SelectItem value="Salon Kecantikan">Salon Kecantikan</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="productService"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Produk/Layanan Spesifik</FormLabel>
                   <FormControl>
                        <Input placeholder="Contoh: Kopi Susu Aren, Potong Rambut Pria" {...field} />
                    </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="targetAudience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Audiens</FormLabel>
                   <FormControl>
                        <Input placeholder="Contoh: Mahasiswa, Pekerja Kantoran" {...field} />
                    </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gaya Bahasa</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih gaya bahasa yang cocok" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="santai">Santai & Kekinian</SelectItem>
                        <SelectItem value="profesional">Profesional & Terpercaya</SelectItem>
                        <SelectItem value="lucu">Lucu & Menghibur</SelectItem>
                        <SelectItem value="bersemangat">Bersemangat & Menggugah</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending} className="w-full">
              <Wand2 className="mr-2 h-4 w-4" />
              {isPending ? 'Lagi Mikir...' : 'Buatkan Saya Promosi!'}
            </Button>
          </form>
        </Form>
      </div>
      
      <div className="lg:col-span-3">
         <Card className="bg-secondary min-h-full">
            <CardHeader>
                <CardTitle className="font-headline text-lg">✨ Ide Promosi dari AI ✨</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {isPending && (
                    <div className="flex items-center justify-center p-8 space-x-2 text-center">
                        <Wand2 className="h-5 w-5 animate-spin" />
                        <p className="text-muted-foreground">Lagi meracik ide cemerlang... 🧠</p>
                    </div>
                )}
                {!isPending && generatedCopies.length === 0 && (
                    <div className="flex flex-col items-center justify-center text-center p-8 h-full">
                        <p className="text-muted-foreground font-medium">Hasilnya bakal nongol di sini!</p>
                        <p className="text-sm text-muted-foreground">Isi form di samping & biarkan keajaiban dimulai.</p>
                    </div>
                )}
                {generatedCopies.map((copy, index) => (
                    <Card key={index} className="relative group bg-background shadow-sm">
                        <CardHeader>
                            <CardTitle className="font-headline text-base">{copy.headline}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{copy.body}</p>
                        </CardContent>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleCopy(`${copy.headline}\n\n${copy.body}`)}
                        >
                            <Copy className="h-4 w-4" />
                             <span className="sr-only">Salin</span>
                        </Button>
                    </Card>
                ))}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
