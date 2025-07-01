
import type { OutletData } from './outlets';

export interface Member {
    id: string;
    name: string;
    email: string;
    password: string; // simple password for demo
    role: 'member' | 'demo';
    outletId: string;
}

export const members: Member[] = [
    // Pre-activated Demo Account
    { id: 'demo-user-1', name: 'Akun Demo Notiflayer', email: 'demo@notiflayer.com', password: 'password', role: 'demo', outletId: 'demo-user-1' },
    
    // Regular Member Accounts
    { id: 'member-001', name: 'Pemilik Kopi Anyar', email: 'anyar@example.com', password: 'password', role: 'member', outletId: 'outlet-001' },
    { id: 'member-002', name: 'Manajer Griya Batik', email: 'batik@example.com', password: 'password', role: 'member', outletId: 'outlet-002' },
    { id: 'member-003', name: 'Raras Omah Cantik', email: 'raras@example.com', password: 'password', role: 'member', outletId: 'outlet-003' },
    { id: 'member-004', name: 'Bu Warni', email: 'warni@example.com', password: 'password', role: 'member', outletId: 'outlet-004' },
    { id: 'member-005', name: 'Admin Guyub Rukun', email: 'guyub@example.com', password: 'password', role: 'member', outletId: 'outlet-005' },
    { id: 'member-006', name: 'Cucu Mbah Kakung', email: 'mendoan@example.com', password: 'password', role: 'member', outletId: 'outlet-006' },
    { id: 'member-007', name: 'Staf Kopi Anyar', email: 'anyar2@example.com', password: 'password', role: 'member', outletId: 'outlet-001' },
    { id: 'member-008', name: 'Staf Griya Batik', email: 'batik2@example.com', password: 'password', role: 'member', outletId: 'outlet-002' },
    { id: 'member-009', name: 'Kasir Omah Cantik', email: 'raras2@example.com', password: 'password', role: 'member', outletId: 'outlet-003' },
    { id: 'member-010', name: 'Kasir Toko Bu Warni', email: 'warni2@example.com', password: 'password', role: 'member', outletId: 'outlet-004' },
];

export const getMemberByEmail = (email: string): Member | undefined => {
    return members.find(m => m.email.toLowerCase() === email.toLowerCase());
};
