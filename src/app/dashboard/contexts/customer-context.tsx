
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

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

// Initial data for customers with interest IDs
const initialCustomers: Customer[] = [
    {
      id: "cust-001",
      name: "Budi Santoso",
      email: "budi.s@example.com",
      whatsapp: "081234567890",
      interests: ["promo-hp-aksesoris", "promo-pakaian"], // Elektronik & Gadget, Butik & Aksesoris
      registeredAt: "2024-07-10 09:15",
    },
    {
      id: "cust-002",
      name: "Siti Aminah",
      email: "siti.a@example.com",
      whatsapp: "082345678901",
      interests: ["promo-makanan", "promo-minuman", "promo-makeup"], // Cafe, Resto, Foodcourt, Kosmetik & Skincare
      registeredAt: "2024-07-09 14:30",
    },
    {
      id: "cust-003",
      name: "Agus Wijaya",
      email: "agus.w@example.com",
      whatsapp: "083456789012",
      interests: ["diskon-potong-rambut", "snack-kekinian"], // Salon & Perawatan, Toko Kue & Snack
      registeredAt: "2024-07-09 11:05",
    },
    {
      id: "cust-004",
      name: "Dewi Lestari",
      email: "dewi.l@example.com",
      whatsapp: "084567890123",
      interests: ["koleksi-terbaru", "promo-skincare"], // Butik & Aksesoris, Kosmetik & Skincare
      registeredAt: "2024-07-08 20:00",
    },
    {
      id: "cust-005",
      name: "Eko Prasetyo",
      email: "eko.p@example.com",
      whatsapp: "085678901234",
      interests: ["promo-laptop-gadget", "barang-second"], // Elektronik & Gadget
      registeredAt: "2024-07-08 16:45",
    },
    {
      id: "cust-006",
      name: "Fitri Handayani",
      email: "fitri.h@example.com",
      whatsapp: "086789012345",
      interests: ["promo-makanan", "event-tester"], // Cafe, Resto, Foodcourt, Toko Kue & Snack
      registeredAt: "2024-07-07 18:22",
    },
];

// Create the context with a default value
const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

// Create the provider component
export const CustomersProvider = ({ children }: { children: ReactNode }) => {
  const [customers] = useState<Customer[]>(initialCustomers);

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
