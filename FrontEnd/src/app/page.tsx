"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PlaneTakeoff, LogOut, User } from "lucide-react";
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

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        router.push("/auth/login");
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="text-brand-blue text-lg font-medium animate-pulse flex flex-col items-center gap-4 relative z-10">
                    <Logo width={80} height={80} />
                    <span>Establishing Secure Connection...</span>
                </div>

            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans relative overflow-x-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-blue/5 blur-[150px] pointer-events-none"></div>
            <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-brand-orange/5 blur-[120px] pointer-events-none"></div>

            <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-200 p-4 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Logo width={40} height={40} showText={true} />

                    <div className="flex items-center gap-6">
                        <div className="text-sm hidden md:flex items-center gap-2">
                            <span className="text-slate-500 text-xs uppercase tracking-widest font-bold">Pilot</span>
                            <span className="font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-inner">
                                <User size={14} className="text-brand-blue" />
                                {user?.name}
                            </span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-xl text-sm transition-all border border-red-200 shadow-sm flex items-center gap-2 font-medium"
                        >
                            <LogOut size={16} />
                            Sign out
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto p-4 md:p-8 mt-4 md:mt-10 relative z-10 w-full flex justify-center items-center min-h-[50vh]">
                <h2 className="text-xl text-slate-400 font-medium">Content is hidden. Navbar only.</h2>
            </main>
        </div>
    );
}