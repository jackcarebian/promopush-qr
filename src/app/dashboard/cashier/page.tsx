"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, ScanLine } from "lucide-react";

export default function CashierPage() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleRedeem = () => {
    if (!code) {
        toast({
            variant: "destructive",
            title: "Kode Kosong",
            description: "Silakan masukkan kode unik.",
        });
        return;
    }

    setIsLoading(true);
    setTimeout(() => {
        const isValid = Math.random() > 0.3; // Simulate API call
        if (isValid) {
            toast({
                title: "Berhasil Ditebus",
                description: `Kode "${code}" telah berhasil ditebus.`,
                action: <CheckCircle className="text-green-500" />
            });
        } else {
            toast({
                variant: "destructive",
                title: "Gagal Menebus",
                description: `Kode "${code}" tidak valid atau sudah digunakan.`,
                action: <XCircle className="text-white" />
            });
        }
        setCode("");
        setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
            <div className="flex items-center gap-3">
                <ScanLine className="w-8 h-8"/>
                <div>
                    <CardTitle className="font-headline text-2xl">Penebusan Promo Kasir</CardTitle>
                    <CardDescription>Masukkan kode unik dari pelanggan untuk menebus promo.</CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="promo-code">Kode Unik Pelanggan</Label>
            <Input 
                id="promo-code" 
                placeholder="Contoh: PROMO123XYZ"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleRedeem} disabled={isLoading}>
            {isLoading ? 'Memverifikasi...' : 'Tebus Kode'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
