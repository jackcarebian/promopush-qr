
import { Suspense } from "react";
import { RegisterForm, RegisterFormSkeleton } from "./components/register-form";

export default function RegisterPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
            <Suspense fallback={<RegisterFormSkeleton />}>
                <RegisterForm />
            </Suspense>
        </div>
    );
}
