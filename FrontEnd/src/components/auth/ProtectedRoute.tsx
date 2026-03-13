"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRole?: 'user' | 'admin';
}

export default function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("accessToken");
            const storedUserStr = localStorage.getItem("user");

            if (!token || !storedUserStr) {
                // If not logged in, redirect to appropriate login page
                if (pathname.startsWith('/admin')) {
                    router.push("/admin/login");
                } else {
                    router.push("/auth/login");
                }
                return;
            }

            try {
                const user = JSON.parse(storedUserStr);
                
                // Role-based logic
                if (allowedRole && user.role !== allowedRole) {
                    // If wrong role, redirect to unauthorized or home
                    console.warn(`Access denied: required ${allowedRole}, but user is ${user.role}`);
                    router.push(user.role === 'admin' ? "/admin/dashboard" : "/");
                    return;
                }

                setIsAuthorized(true);
            } catch (err) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("user");
                router.push("/auth/login");
            }
        };
        
        checkAuth();
    }, [router, allowedRole, pathname]);

    if (isAuthorized === null) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-brand-orange"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-400">ADS</div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
