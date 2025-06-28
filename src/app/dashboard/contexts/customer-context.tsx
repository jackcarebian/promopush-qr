
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

// Helper function to generate a random subset of interests
const getRandomInterests = (interestPool: string[], count: number = 2) => {
    const shuffled = interestPool.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * count) + 1);
};

// Interest Pools
const foodieInterests = ["promo-makanan", "promo-minuman", "menu-baru", "snack-kekinian", "event-tester"];
const fashionistaInterests = ["promo-pakaian", "promo-tas-sepatu", "koleksi-terbaru", "flash-sale", "promo-makeup", "promo-skincare"];
const techInterests = ["promo-hp-aksesoris", "promo-laptop-gadget", "barang-second", "flash-sale-online"];
const homebodyInterests = ["promo-perabot", "diskon-dekorasi", "produk-custom", "tips-dekor"];
const selfcareInterests = ["diskon-potong-rambut", "promo-creambath-spa", "jadwal-member", "tips-rambut", "promo-skincare", "tips-tutorial"];

const generateCustomers = () => {
    const customers: Customer[] = [];
    const maleNames = ['Budi', 'Agus', 'Eko', 'Joko', 'Hendra', 'Surya', 'Rian', 'Putra', 'Andi', 'Taufik', 'Iqbal', 'Fajar', 'Reza', 'Dimas', 'Anton'];
    const femaleNames = ['Siti', 'Dewi', 'Fitri', 'Ani', 'Sari', 'Maya', 'Rina', 'Lina', 'Indah', 'Putri', 'Ayu', 'Wulan', 'Dian', 'Eva', 'Cindy'];
    const lastNames = ['Santoso', 'Wijaya', 'Prasetyo', 'Lestari', 'Handayani', 'Nugroho', 'Susanto', 'Kusuma', 'Gunawan', 'Wibowo', 'Saputra', 'Maulana', 'Hidayat', 'Ramadhan', 'Hakim'];
    let customerId = 1;

    // Generate 50 Foodies
    for (let i = 0; i < 50; i++) {
        const firstName = i % 2 === 0 ? maleNames[Math.floor(Math.random() * maleNames.length)] : femaleNames[Math.floor(Math.random() * femaleNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        customers.push({
            id: `cust-${String(customerId).padStart(3, '0')}`,
            name: `${firstName} ${lastName}`,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${customerId}@example.com`,
            whatsapp: `0812${String(10000000 + customerId).padStart(8, '0')}`,
            interests: getRandomInterests(foodieInterests, 3),
            registeredAt: `2024-07-${Math.floor(Math.random() * 10) + 1} 10:00`,
        });
        customerId++;
    }

    // Generate 50 Fashionistas
    for (let i = 0; i < 50; i++) {
        const firstName = i % 2 !== 0 ? maleNames[Math.floor(Math.random() * maleNames.length)] : femaleNames[Math.floor(Math.random() * femaleNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        customers.push({
            id: `cust-${String(customerId).padStart(3, '0')}`,
            name: `${firstName} ${lastName}`,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${customerId}@example.com`,
            whatsapp: `0813${String(10000000 + customerId).padStart(8, '0')}`,
            interests: getRandomInterests(fashionistaInterests, 3),
            registeredAt: `2024-07-${Math.floor(Math.random() * 10) + 10} 11:00`,
        });
        customerId++;
    }

    // Generate 30 Tech Enthusiasts
    for (let i = 0; i < 30; i++) {
        const firstName = maleNames[Math.floor(Math.random() * maleNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        customers.push({
            id: `cust-${String(customerId).padStart(3, '0')}`,
            name: `${firstName} ${lastName}`,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${customerId}@example.com`,
            whatsapp: `0814${String(10000000 + customerId).padStart(8, '0')}`,
            interests: getRandomInterests(techInterests, 2),
            registeredAt: `2024-06-${Math.floor(Math.random() * 10) + 1} 12:00`,
        });
        customerId++;
    }

    // Generate 30 Homebodies
    for (let i = 0; i < 30; i++) {
        const firstName = femaleNames[Math.floor(Math.random() * femaleNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        customers.push({
            id: `cust-${String(customerId).padStart(3, '0')}`,
            name: `${firstName} ${lastName}`,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${customerId}@example.com`,
            whatsapp: `0815${String(10000000 + customerId).padStart(8, '0')}`,
            interests: getRandomInterests(homebodyInterests, 2),
            registeredAt: `2024-06-${Math.floor(Math.random() * 10) + 10} 13:00`,
        });
        customerId++;
    }

    // Generate 40 Self-Carers
    for (let i = 0; i < 40; i++) {
        const firstName = i % 2 === 0 ? maleNames[Math.floor(Math.random() * maleNames.length)] : femaleNames[Math.floor(Math.random() * femaleNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        customers.push({
            id: `cust-${String(customerId).padStart(3, '0')}`,
            name: `${firstName} ${lastName}`,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${customerId}@example.com`,
            whatsapp: `0816${String(10000000 + customerId).padStart(8, '0')}`,
            interests: getRandomInterests(selfcareInterests, 3),
            registeredAt: `2024-06-${Math.floor(Math.random() * 10) + 20} 14:00`,
        });
        customerId++;
    }
    
    return customers;
};


// Initial data for customers with interest IDs
const initialCustomers: Customer[] = generateCustomers();

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
