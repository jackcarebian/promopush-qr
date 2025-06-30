
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Logo } from "@/components/logo";
import { useAuth, User } from "@/app/dashboard/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

function LoginForm({ role }: { role: User['role'] }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const { toast } = useToast();
    const router = useRouter();

    const handleLogin = () => {
        const success = login({ email, pass: password, role });
        if (!success) {
            toast({
                variant: "destructive",
                title: "Login Gagal",
                description: "Email atau password yang Anda masukkan salah.",
            });
        }
    };
    
    // Special case for Demo login
    if (role === 'demo') {
        const handleDemoRegister = () => {
            if (!email || !email.includes('@')) {
                toast({
                    variant: "destructive",
                    title: "Email Tidak Valid",
                    description: "Silakan masukkan alamat email yang valid untuk memulai demo.",
                });
                return;
            }
            const success = login({ email, role: 'demo' });
             if (!success) {
                 toast({
                    variant: "destructive",
                    title: "Gagal Memulai Demo",
                    description: "Terjadi kesalahan. Silakan coba lagi.",
                });
            }
        };

        return (
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline capitalize">Coba Akun Demo</CardTitle>
                    <CardDescription>
                       Daftar untuk akses demo 30 hari. Tidak perlu aktivasi.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="demo-email">Alamat Email</Label>
                        <Input 
                            id="demo-email" 
                            type="email" 
                            placeholder="anda@email.com" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                        />
                    </div>
                     <p className="text-xs text-center text-muted-foreground p-2 bg-secondary rounded-md">
                        Fitur terbatas: bisa melihat database pelanggan dan membuat 1 kampanye.
                    </p>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={handleDemoRegister}>
                        Mulai Demo Gratis
                    </Button>
                </CardFooter>
            </Card>
        );
    }
    
    // Clear fields for Admin and Member roles
    React.useEffect(() => {
        setEmail('');
        setPassword('');
    }, [role]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline capitalize">Login {role}</CardTitle>
                <CardDescription>
                    Masukkan kredensial Anda untuk mengakses dasbor {role}.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor={`${role}-email`}>Email</Label>
                    <Input 
                        id={`${role}-email`} 
                        type="email" 
                        placeholder={role === 'member' ? "email@anda.com" : "admin@example.com"} 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor={`${role}-password`}>Password</Label>
                    <Input 
                        id={`${role}-password`} 
                        type="password" 
                        placeholder="••••••••"
                        value={password} 
                        onChange={e => setPassword(e.target.value)} />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center gap-4">
                <Button className="w-full" onClick={handleLogin}>
                    Login
                </Button>
                {role === 'member' && (
                     <p className="px-8 text-center text-sm text-muted-foreground">
                        Belum punya akun?{" "}
                        <Link
                            href="/register"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Daftar sekarang
                        </Link>
                    </p>
                )}
            </CardFooter>
        </Card>
    );
}

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary">
      <Tabs defaultValue="demo" className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="demo">Demo</TabsTrigger>
          <TabsTrigger value="member">Member</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
        </TabsList>
        <TabsContent value="demo">
          <LoginForm role="demo" />
        </TabsContent>
        <TabsContent value="member">
          <LoginForm role="member" />
        </TabsContent>
        <TabsContent value="admin">
          <LoginForm role="admin" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
