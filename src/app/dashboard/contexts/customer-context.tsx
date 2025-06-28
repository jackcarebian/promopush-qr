
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

// Define the shape of a single customer
export interface Customer {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  interests: string[]; // Array of interest IDs
  registeredAt: string;
}

// Define the shape of the context
interface CustomerContextType {
  customers: Customer[];
}

// Create the context with a default value
const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

// Create the provider component
export const CustomersProvider = ({ children }: { children: ReactNode }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Create a query to get customers, ordered by registration date
    const q = query(collection(db, "pelanggan"), orderBy("registeredAt", "desc"));

    // Set up a real-time listener with error handling
    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const customersData: Customer[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          customersData.push({
            id: doc.id,
            name: data.name,
            email: data.email,
            whatsapp: data.whatsapp || '',
            interests: data.interests,
            registeredAt: new Date(data.registeredAt).toLocaleString('id-ID', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }),
          });
        });
        setCustomers(customersData);
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

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, [toast]); // Empty dependency array means this effect runs once on mount

  return (
    <CustomerContext.Provider value={{ customers }}>
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
