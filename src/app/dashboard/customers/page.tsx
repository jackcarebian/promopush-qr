
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
import { Download } from "lucide-react";
import { useCustomers } from "../contexts/customer-context";
import { interestCategories } from "../campaigns/data/categories";
import { format } from "date-fns";
import { id } from "date-fns/locale";
  
// Helper to create a flat map of all possible interests for easy lookup
const allInterests = Object.values(interestCategories).flatMap(category => category.interests);
const interestLabelMap = new Map(allInterests.map(interest => [interest.id, interest.label]));

export default function CustomersPage() {
    const { customers } = useCustomers();

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
                            <TableRow key={customer.id}>
                                <TableCell className="font-medium">{customer.name}</TableCell>
                                <TableCell>{customer.email}</TableCell>
                                <TableCell>{customer.whatsapp}</TableCell>
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
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
