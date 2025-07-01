
import { Suspense } from "react";
import { RegisterDemoForm } from "./components/register-demo-form";
import { Skeleton } from "@/components/ui/skeleton";
import { Logo } from "@/components/logo";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

function RegisterDemoFormSkeleton() {
    return (
        <Card className="w-full max-w-lg">
             <CardHeader className="text-center">
                <div className="mx-auto mb-4 w-fit">
                    <Logo />
                </div>
                <CardTitle className="font-headline text-2xl">Daftar Akun Demo</CardTitle>
                <CardDescription>
                    Memuat formulir pendaftaran...
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2"><Skeleton className="h-4 w-24" /><Skeleton className="h-10 w-full" /></div>
                <div className="space-y-2"><Skeleton className="h-4 w-32" /><Skeleton className="h-10 w-full" /></div>
                <div className="space-y-2"><Skeleton className="h-4 w-28" /><Skeleton className="h-20 w-full" /></div>
                <div className="space-y-2"><Skeleton className="h-4 w-32" /><Skeleton className="h-10 w-full" /></div>
                <div className="space-y-2"><Skeleton className="h-4 w-28" /><Skeleton className="h-10 w-full" /></div>
                <div className="space-y-2"><Skeleton className="h-4 w-28" /><Skeleton className="h-10 w-full" /></div>
                <Skeleton className="h-12 w-full" />
            </CardContent>
        </Card>
    )
}

export default function RegisterDemoPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
            <Suspense fallback={<RegisterDemoFormSkeleton />}>
                <RegisterDemoForm />
            </Suspense>
        </div>
    );
}
