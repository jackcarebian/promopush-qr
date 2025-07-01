
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

function LoginForm({ role }: { role: 'admin' | 'member' }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const { toast } = useToast();
    const router = useRouter();

    const handleLogin = () => {
        // We pass 'member' role here for both member and demo users, 
        // as the auth context will determine their actual role from data.
        const success = login({ email, pass: password, role });
        if (!success) {
            toast({
                variant: "destructive",
                title: "Login Gagal",
                description: "Email atau password yang Anda masukkan salah.",
            });
        }
    };
    
    // Clear fields when role changes
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
                        placeholder={role === 'member' ? "email@anda.com" : "jimmy.tjahyono@gmail.com"} 
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
                        Belum punya akun Member berbayar?{" "}
                        <Link
                            href="/register-member"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Daftar di sini
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
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Coba Akun Demo</CardTitle>
                    <CardDescription>
                        Rasakan pengalaman menggunakan Notiflayer dengan mendaftar untuk akun demo.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Dengan akun demo, Anda dapat menjelajahi fitur-fitur utama kami. Pendaftaran memerlukan aktivasi oleh Admin untuk memastikan setiap outlet demo terpisah dan unik.
                    </p>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button className="w-full" asChild>
                        <Link href="/register-demo">Daftar Akun Demo Gratis</Link>
                    </Button>
                    <p className="px-8 text-center text-sm text-muted-foreground">
                        Sudah punya akun demo? Login melalui tab "Member".
                    </p>
                </CardFooter>
            </Card>
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
