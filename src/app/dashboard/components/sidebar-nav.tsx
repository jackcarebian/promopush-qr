
"use client"

import { SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import { LayoutDashboard, Megaphone, Calendar, Users, Bot, ScanLine, QrCode, LogOut, Store, FileText } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { useAuth } from "../contexts/auth-context";

const allNavItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard", roles: ['admin', 'operator', 'member'] },
    { href: "/dashboard/campaigns", icon: Megaphone, label: "Kampanye", roles: ['admin', 'member'] },
    { href: "/dashboard/calendar", icon: Calendar, label: "Kalender Kampanye", roles: ['admin', 'member'] },
    { href: "/dashboard/customers", icon: Users, label: "Database Pelanggan", roles: ['admin', 'member'] },
    { href: "/dashboard/reports", icon: FileText, label: "Laporan Outlet", roles: ['member'] },
    { href: "/dashboard/marketing-ai", icon: Bot, label: "Tool Pemasaran AI", roles: ['admin'] },
    { href: "/dashboard/cashier", icon: ScanLine, label: "Kasir", roles: ['admin', 'operator'] },
    { href: "/dashboard/qr-outlet", icon: QrCode, label: "QR Outlet", roles: ['admin'] },
];

export function SidebarNav() {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    if (!user) return null;

    const navItems = allNavItems.filter(item => item.roles.includes(user.role));

    return (
        <>
            <SidebarHeader>
                <Logo />
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {navItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                            <SidebarMenuButton asChild isActive={pathname.startsWith(item.href)}>
                                <Link href={item.href}>
                                    <item.icon className="h-4 w-4" />
                                    <span>{item.label}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                 <Button variant="ghost" className="w-full justify-start gap-2" onClick={logout}>
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                 </Button>
            </SidebarFooter>
        </>
    );
}
