
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
        const handleDemoLogin = () => {
            const success = login({ email: 'demo@promopush.com', pass: 'demo123', role: 'demo' });
            if (!success) {
                 toast({
                    variant: "destructive",
                    title: "Login Gagal",
                    description: "Terjadi kesalahan pada akun demo.",
                });
            }
        };

        return (
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline capitalize">Akses Demo</CardTitle>
                    <CardDescription>
                        Klik tombol di bawah ini untuk masuk ke dasbor dengan akun demo dan mencoba fitur-fitur yang tersedia.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-center text-muted-foreground p-4 bg-secondary rounded-md">
                        Anda akan masuk dengan hak akses terbatas yang dirancang untuk keperluan demonstrasi.
                    </p>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={handleDemoLogin}>
                        Masuk sebagai Demo
                    </Button>
                </CardFooter>
            </Card>
        );
    }
    
    // Pre-fill for Admin, clear for Member
    React.useEffect(() => {
        if (role === 'admin') {
            setEmail('jimmy.tjahyono@gmail.com');
            setPassword('+-Sejam#123');
        } else {
            setEmail('');
            setPassword('');
        }
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
                        placeholder={role === 'member' ? "email@anda.com" : `${role}@example.com`} 
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
