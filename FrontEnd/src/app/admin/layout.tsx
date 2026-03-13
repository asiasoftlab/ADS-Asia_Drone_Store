"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (pathname === "/admin/login") {
            setLoading(false);
            return;
        }

        const userStr = localStorage.getItem("adminData");
        if (!userStr) {
            router.push("/admin/login");
            return;
        }

        try {
            const user = JSON.parse(userStr);
            if (user && user.role === "admin") {
                setLoading(false);
            } else {
                router.push("/admin/login");
            }
        } catch {
            router.push("/admin/login");
        }
    }, [pathname, router]);

    if (loading && pathname !== "/admin/login") {
        return (
            <div className="flex flex-col gap-6 justify-center items-center min-h-screen bg-slate-900 text-white">
                <Logo width={100} height={100} />
                <p className="text-xl animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-300">Checking Admin Access...</p>
            </div>

        );
    }

    return <>{children}</>;
}
