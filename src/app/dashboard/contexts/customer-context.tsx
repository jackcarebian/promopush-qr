
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

// Define the shape of a single customer
export interface Customer {
  id: string;
  name: string;
  email: string;
  whatsapp: string; // This field is not in the registration form, so it will be empty
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

  useEffect(() => {
    // Create a query to get customers, ordered by registration date
    const q = query(collection(db, "pelanggan"), orderBy("registeredAt", "desc"));

    // Set up a real-time listener
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const customersData: Customer[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        customersData.push({
          id: doc.id,
          name: data.name,
          email: data.email,
          whatsapp: data.whatsapp || '', // Set to empty string if not present
          interests: data.interests,
          // Format date for better readability, or use as is
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
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []); // Empty dependency array means this effect runs once on mount

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
