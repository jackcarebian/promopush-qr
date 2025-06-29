
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

// Define the shape of a single customer
export interface Customer {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  interests: string[]; // Array of interest IDs
  registeredAt: string; // ISO date string
  fcmToken: string; // Token for push notifications
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
    // Query without ordering to be more robust against missing fields
    const q = query(collection(db, "pelanggan"));

    // Set up a real-time listener with error handling
    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const customersData = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                ...data,
                id: doc.id,
            };
        })
        .filter(data => data.registeredAt) // Ensure the document has a registration date
        .sort((a, b) => new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime()) // Sort on the client side
        .map((data) => ({ // Map to the final format for the UI
            id: data.id,
            name: data.name,
            email: data.email,
            whatsapp: data.whatsapp || '',
            interests: data.interests || [],
            registeredAt: data.registeredAt,
            fcmToken: data.fcmToken || '', // Get the FCM token
        }));
        
        setCustomers(customersData as Customer[]);
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
