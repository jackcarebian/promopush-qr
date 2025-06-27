"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import jsQR from "jsqr";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, ScanLine, Camera, User, Mail, Heart } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface CustomerData {
  name: string;
  email: string;
  interests: string[];
}

// Mock database of customers
const customerDatabase: { [key: string]: CustomerData } = {
  "PROMO123XYZ": { name: "Budi Santoso", email: "budi.s@example.com", interests: ["Elektronik", "Fashion"] },
  "DISKON777": { name: "Siti Aminah", email: "siti.a@example.com", interests: ["Makanan & Minuman", "Kecantikan"] },
  "SALE555": { name: "Agus Wijaya", email: "agus.w@example.com", interests: ["Perjalanan"] },
};

export default function CashierPage() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [redeemedCodes, setRedeemedCodes] = useState<string[]>([]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
      }
    };
    getCameraPermission();
  }, []);
  
  const scanQRCode = useCallback(() => {
    if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const qrCode = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });

        if (qrCode) {
          setCode(qrCode.data.toUpperCase());
          setIsScanning(false);
          toast({
              title: "Kode QR Terdeteksi",
              description: `Kode: ${qrCode.data}`,
          });
        }
      }
    }
    if (isScanning) {
        requestAnimationFrame(scanQRCode);
    }
  }, [isScanning, toast]);

  useEffect(() => {
    if (isScanning && hasCameraPermission) {
      requestAnimationFrame(scanQRCode);
    }
  }, [isScanning, hasCameraPermission, scanQRCode]);

  const handleRedeem = () => {
    if (!code) {
      toast({
        variant: "destructive",
        title: "Kode Kosong",
        description: "Silakan masukkan atau pindai kode unik.",
      });
      return;
    }

    if (redeemedCodes.includes(code)) {
      toast({
        variant: "destructive",
        title: "Kode Sudah Digunakan",
        description: `Kode "${code}" sudah pernah ditebus.`,
        action: <XCircle className="text-white" />
      });
      return;
    }

    setIsLoading(true);
    setCustomerData(null);
    setTimeout(() => {
      const customer = customerDatabase[code];
      if (customer) {
        toast({
          title: "Berhasil Ditebus",
          description: `Kode "${code}" telah berhasil ditebus.`,
          action: <CheckCircle className="text-green-500" />
        });
        setCustomerData(customer);
        setRedeemedCodes(prev => [...prev, code]);
      } else {
        toast({
          variant: "destructive",
          title: "Gagal Menebus",
          description: `Kode "${code}" tidak valid atau sudah digunakan.`,
          action: <XCircle className="text-white" />
        });
        setCustomerData(null);
      }
      setCode("");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 flex flex-col items-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-3">
            <ScanLine className="w-8 h-8" />
            <div>
              <CardTitle className="font-headline text-2xl">Promo Redem</CardTitle>
              <CardDescription>Masukkan kode unik dari pelanggan untuk menebus promo.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="promo-code">Kode Unik Pelanggan</Label>
            <div className="flex gap-2">
              <Input
                id="promo-code"
                placeholder="Contoh: PROMO123XYZ"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
              />
              <Dialog open={isScanning} onOpenChange={setIsScanning}>
                <DialogTrigger asChild>
                   <Button variant="outline" size="icon" disabled={hasCameraPermission === false}>
                    <Camera className="w-4 h-4" />
                    <span className="sr-only">Pindai Kode QR</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Pindai Kode QR</DialogTitle>
                  </DialogHeader>
                  {hasCameraPermission === null && <p>Meminta izin kamera...</p>}
                  {hasCameraPermission === false && (
                    <Alert variant="destructive">
                      <AlertTitle>Akses Kamera Diperlukan</AlertTitle>
                      <AlertDescription>
                        Silakan izinkan akses kamera di pengaturan browser Anda untuk menggunakan fitur ini.
                      </AlertDescription>
                    </Alert>
                  )}
                  {hasCameraPermission === true && (
                     <div className="relative">
                        <video ref={videoRef} className="w-full aspect-video rounded-md" autoPlay muted playsInline />
                        <canvas ref={canvasRef} className="hidden" />
                     </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleRedeem} disabled={isLoading}>
            {isLoading ? 'Memverifikasi...' : 'Tebus Kode'}
          </Button>
        </CardFooter>
      </Card>

      {customerData && (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="font-headline">Data Pelanggan</CardTitle>
            <CardDescription>Informasi pelanggan yang terkait dengan kode yang ditebus.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Informasi</TableHead>
                  <TableHead>Detail</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium flex items-center gap-2"><User className="w-4 h-4 text-muted-foreground" /> Nama</TableCell>
                  <TableCell>{customerData.name}</TableCell>
                </TableRow>
                 <TableRow>
                  <TableCell className="font-medium flex items-center gap-2"><Mail className="w-4 h-4 text-muted-foreground" /> Email</TableCell>
                  <TableCell>{customerData.email}</TableCell>
                </TableRow>
                 <TableRow>
                  <TableCell className="font-medium flex items-center gap-2"><Heart className="w-4 h-4 text-muted-foreground" /> Minat</TableCell>
                  <TableCell>
                     <div className="flex flex-wrap gap-1">
                        {customerData.interests.map((interest) => (
                           <Badge key={interest} variant="secondary">{interest}</Badge>
                        ))}
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
