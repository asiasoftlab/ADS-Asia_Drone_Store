"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/ui/Logo";


interface UserProfile {
    id?: string;
    name: string;
    email: string;
    role: string;
}

export default function Home() {
    const router = useRouter();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in
        const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
        const storedUserStr = typeof window !== "undefined" ? localStorage.getItem("user") : null;

        if (!token || !storedUserStr) {
            router.push("/auth/login");
        } else {
            try {
                const storedUser = JSON.parse(storedUserStr);
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setUser(storedUser);
            } catch {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("user");
                router.push("/auth/login");
            }
            setIsLoading(false);
        }
    }, [router]);

    if (isLoading) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center w-full min-h-[50vh] relative z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="text-brand-blue text-lg font-medium animate-pulse flex flex-col items-center gap-4">
                    <Logo width={80} height={80} />
                    <span>Establishing Secure Connection...</span>
                </div>
            </div>
        );
    }

    return (
        <main className="max-w-7xl mx-auto p-4 md:p-8 mt-4 md:mt-10 relative z-10 w-full flex flex-col justify-center items-center flex-1 min-h-[50vh]">
            <h2 className="text-xl text-slate-400 font-medium">Content is hidden. Navbar only.</h2>
        </main>
    );
}