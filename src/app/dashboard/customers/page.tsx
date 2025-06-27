import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, PlusCircle } from "lucide-react";
  
const customers = [
    {
      name: "Budi Santoso",
      email: "budi.s@example.com",
      whatsapp: "081234567890",
      interests: ["Elektronik", "Fashion"],
      registeredAt: "2024-07-10 09:15",
    },
    {
      name: "Siti Aminah",
      email: "siti.a@example.com",
      whatsapp: "082345678901",
      interests: ["Makanan & Minuman", "Kecantikan"],
      registeredAt: "2024-07-09 14:30",
    },
    {
      name: "Agus Wijaya",
      email: "agus.w@example.com",
      whatsapp: "083456789012",
      interests: ["Perjalanan"],
      registeredAt: "2024-07-09 11:05",
    },
    {
      name: "Dewi Lestari",
      email: "dewi.l@example.com",
      whatsapp: "084567890123",
      interests: ["Fashion", "Kecantikan"],
      registeredAt: "2024-07-08 20:00",
    },
    {
      name: "Eko Prasetyo",
      email: "eko.p@example.com",
      whatsapp: "085678901234",
      interests: ["Elektronik"],
      registeredAt: "2024-07-08 16:45",
    },
    {
      name: "Fitri Handayani",
      email: "fitri.h@example.com",
      whatsapp: "086789012345",
      interests: ["Makanan & Minuman"],
      registeredAt: "2024-07-07 18:22",
    },
];

type Customer = typeof customers[0];

export default function CustomersPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-headline font-bold">Database Pelanggan</h1>
                <p className="text-muted-foreground">Kelola semua pelanggan terdaftar Anda di satu tempat.</p>
            </div>

            <Card>
                <CardHeader className="flex flex-row justify-between items-center">
                    <div>
                        <CardTitle className="font-headline">Daftar Pelanggan</CardTitle>
                        <CardDescription>Menampilkan {customers.length} pelanggan terbaru.</CardDescription>
                    </div>
                    <div className="flex gap-2">
                         <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Ekspor Data
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Nama</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>WhatsApp</TableHead>
                            <TableHead>Minat</TableHead>
                            <TableHead>Tanggal Daftar</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {customers.map((customer) => (
                            <TableRow key={customer.email}>
                                <TableCell className="font-medium">{customer.name}</TableCell>
                                <TableCell>{customer.email}</TableCell>
                                <TableCell>{customer.whatsapp}</TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                        {customer.interests.map((interest) => (
                                            <Badge key={interest} variant="secondary">{interest}</Badge>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell>{customer.registeredAt}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
