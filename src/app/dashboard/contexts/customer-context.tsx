
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useMemo } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, doc, deleteDoc, type DocumentData } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from './auth-context';

// Define the shape of a single customer
export interface Customer {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  interests: string[]; // Array of interest IDs
  registeredAt: string; // ISO date string
  fcmToken: string; // Token for push notifications
  outletId: string;
}

// Define the shape of the context
interface CustomerContextType {
  customers: Customer[];
  deleteCustomer: (id: string) => void;
}

// Create the context with a default value
const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

// Create the provider component
export const CustomersProvider = ({ children }: { children: ReactNode }) => {
  const [allCustomers, setAllCustomers] = useState<Customer[]>([]);
  const { toast } = useToast();
  const { user } = useAuth();

  const deleteCustomer = async (id: string) => {
    if (!db) {
      toast({
          variant: "destructive",
          title: "Konfigurasi Firebase Tidak Ditemukan",
          description: "Harap periksa kredensial Firebase Anda di file .env."
      });
      return;
    }
    const customerToDelete = allCustomers.find(c => c.id === id);
     if (user?.role === 'member' && (!user.outletIds || !user.outletIds.includes(customerToDelete?.outletId!))) {
        toast({ variant: "destructive", title: "Akses Ditolak" });
        return;
    }

    try {
      await deleteDoc(doc(db, "pelanggan", id));
      toast({
        title: "Pelanggan Dihapus",
        description: "Data pelanggan telah berhasil dihapus dari database."
      });
    } catch (error) {
      console.error("Gagal menghapus pelanggan:", error);
      toast({
        variant: "destructive",
        title: "Gagal Menghapus",
        description: "Terjadi kesalahan saat menghapus data pelanggan."
      });
    }
  };

  useEffect(() => {
    if (!db) {
        toast({
            variant: "destructive",
            title: "Database Tidak Terhubung",
            description: "Konfigurasi Firebase tidak lengkap. Silakan periksa file .env Anda.",
            duration: Infinity, // Keep the toast visible
        });
        return;
    }
    
    const q = query(collection(db, "pelanggan"));

    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const customersData = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                ...data,
                id: doc.id,
            };
        })
        .filter(data => data.registeredAt)
        .sort((a, b) => new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime())
        .map((data: DocumentData) => ({
            id: data.id,
            name: data.name,
            email: data.email,
            whatsapp: data.whatsapp || '',
            interests: data.interests || [],
            registeredAt: data.registeredAt,
            fcmToken: data.fcmToken || '',
            outletId: data.outletId || 'unknown'
        }));
        
        setAllCustomers(customersData as Customer[]);
      },
      (error) => {
        console.error("Gagal mengambil data pelanggan:", error);
        toast({
            variant: "destructive",
            title: "Gagal Memuat Pelanggan",
            description: "Tidak dapat mengambil data dari database. Pastikan aturan keamanan Firestore Anda sudah benar dan aktif.",
        });
      }
    );

    return () => unsubscribe();
  }, [toast]);

  const filteredCustomers = useMemo(() => {
    if (user?.role === 'member' || user?.role === 'demo') {
        return allCustomers.filter(c => user.outletIds?.includes(c.outletId));
    }
    return allCustomers;
  }, [allCustomers, user]);


  return (
    <CustomerContext.Provider value={{ customers: filteredCustomers, deleteCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
};

// Create a custom hook to use the context
export const useCustomers = () => {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error('useCustomers must be used within a CustomersProvider');
  }
  return context;
};
