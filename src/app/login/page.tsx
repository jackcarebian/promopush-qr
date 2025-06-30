
"use client";

import React, { useState } from "react";
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
    
    // Pre-fill for demo purposes
    React.useEffect(() => {
        if (role === 'admin') {
            setEmail('jimmy.tjahyono@gmail.com');
            setPassword('+-Sejam#123');
        } else if (role === 'demo') {
            setEmail('demo@promopush.com');
            setPassword('demo123');
        } else if (role === 'member') {
            setEmail('anyar@example.com');
            setPassword('password');
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
                    <Input id={`${role}-email`} type="email" placeholder={`${role}@example.com`} value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor={`${role}-password`}>Password</Label>
                    <Input id={`${role}-password`} type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full" onClick={handleLogin}>
                    Login
                </Button>
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
