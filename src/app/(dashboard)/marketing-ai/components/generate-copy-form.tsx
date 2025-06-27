"use client";

import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { generateMarketingCopy } from '@/ai/flows/generate-marketing-copy';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Wand2, Copy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  businessType: z.string({ required_error: 'Silakan pilih jenis bisnis.' }),
});

export function GenerateCopyForm() {
  const [isPending, startTransition] = useTransition();
  const [generatedCopy, setGeneratedCopy] = useState<string>('');
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setGeneratedCopy('');
    startTransition(async () => {
      try {
        const result = await generateMarketingCopy({ businessType: values.businessType });
        setGeneratedCopy(result.marketingCopy);
      } catch (error) {
        console.error(error);
        toast({
          variant: 'destructive',
          title: 'Terjadi Kesalahan',
          description: 'Gagal menghasilkan salinan pemasaran. Silakan coba lagi.',
        });
      }
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCopy);
    toast({
      title: 'Disalin!',
      description: 'Salinan pemasaran telah disalin ke clipboard.',
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
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
                      <SelectValue placeholder="Pilih jenis bisnis" />
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
          <Button type="submit" disabled={isPending}>
            <Wand2 className="mr-2 h-4 w-4" />
            {isPending ? 'Menghasilkan...' : 'Hasilkan Salinan'}
          </Button>
        </form>
      </Form>
      
      <Card className="bg-secondary">
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-headline text-lg">Hasil</CardTitle>
            {generatedCopy && (
                <Button variant="ghost" size="icon" onClick={handleCopy}>
                    <Copy className="h-4 w-4" />
                </Button>
            )}
        </CardHeader>
        <CardContent>
            <Textarea
                readOnly
                value={isPending ? "AI sedang bekerja..." : generatedCopy || "Salinan pemasaran yang dihasilkan akan muncul di sini."}
                className="w-full h-48 resize-none bg-background"
            />
        </CardContent>
      </Card>
    </div>
  );
}
