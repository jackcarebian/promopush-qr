
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
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary">
      <Tabs defaultValue="admin" className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="admin">Admin</TabsTrigger>
          <TabsTrigger value="operator">Operator</TabsTrigger>
        </TabsList>
        <TabsContent value="admin">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Login Admin</CardTitle>
              <CardDescription>
                Masukkan kredensial Anda untuk mengakses dasbor admin.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-email">Email</Label>
                <Input id="admin-email" type="email" placeholder="admin@example.com" defaultValue="admin@promopush.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-password">Password</Label>
                <Input id="admin-password" type="password" defaultValue="admin123" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="/dashboard">Login</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="operator">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Login Operator</CardTitle>
              <CardDescription>
                Masukkan kredensial Anda untuk mengakses dasbor operator.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="operator-email">Email</Label>
                <Input id="operator-email" type="email" placeholder="operator@example.com" defaultValue="operator@promopush.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="operator-password">Password</Label>
                <Input id="operator-password" type="password" defaultValue="operator123" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="/dashboard">Login</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
