
"use client";

import React from "react";
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
import { Download, Trash2 } from "lucide-react";
import { useCustomers } from "../contexts/customer-context";
import { interestCategories } from "../campaigns/data/categories";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
  
// Helper to create a flat map of all possible interests for easy lookup
const allInterests = Object.values(interestCategories).flatMap(category => category.interests);
const interestLabelMap = new Map(allInterests.map(interest => [interest.id, interest.label]));

export default function CustomersPage() {
    const { customers, deleteCustomer } = useCustomers();

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
                            <TableHead>Minat</TableHead>
                            <TableHead>Tanggal Daftar</TableHead>
                            <TableHead>Token FCM</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {customers.map((customer) => (
                            <TableRow key={customer.id}>
                                <TableCell className="font-medium">{customer.name}</TableCell>
                                <TableCell>{customer.email}</TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                        {customer.interests.map((interestId) => (
                                            <Badge key={interestId} variant="secondary">
                                                {interestLabelMap.get(interestId) || interestId}
                                            </Badge>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell>{format(new Date(customer.registeredAt), 'dd MMMM yyyy, HH:mm', { locale: id })}</TableCell>
                                <TableCell>
                                    <span title={customer.fcmToken} className="block max-w-xs truncate text-muted-foreground text-xs font-mono">
                                        {customer.fcmToken || "-"}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                          <Trash2 className="h-4 w-4" />
                                          <span className="sr-only">Hapus</span>
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            Tindakan ini tidak dapat dibatalkan. Ini akan menghapus data pelanggan <strong>{customer.name}</strong> secara permanen.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>Batal</AlertDialogCancel>
                                          <AlertDialogAction onClick={() => deleteCustomer(customer.id)}>Hapus</AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
