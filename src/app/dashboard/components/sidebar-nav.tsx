"use client"

import { SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import { LayoutDashboard, Megaphone, Calendar, Users, Bot, ScanLine, QrCode, LogOut, Store } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from 'next/link';
import { Button } from "@/components/ui/button";

const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/dashboard/campaigns", icon: Megaphone, label: "Kampanye" },
    { href: "/dashboard/calendar", icon: Calendar, label: "Kalender Kampanye" },
    { href: "/dashboard/customers", icon: Users, label: "Database Pelanggan" },
    { href: "/dashboard/marketing-ai", icon: Bot, label: "Tool Pemasaran AI" },
    { href: "/dashboard/cashier", icon: ScanLine, label: "Kasir" },
    { href: "/dashboard/qr-outlet", icon: Store, label: "QR Outlet" },
    { href: "/dashboard/qrcodes", icon: QrCode, label: "Langganan QR" },
];

export function SidebarNav() {
    const pathname = usePathname();

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
                 <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                    <Link href="/login">
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                    </Link>
                 </Button>
            </SidebarFooter>
        </>
    );
}
