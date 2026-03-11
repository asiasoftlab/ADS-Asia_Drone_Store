"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-blue-400 text-xl font-medium animate-pulse flex items-center gap-3">
                    <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading secure area...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
            <nav className="bg-slate-800/80 backdrop-blur-md border-b border-slate-700/50 p-4 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                            <svg className="text-white w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                            Asia Drone Store
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-sm hidden md:block">
                            <span className="text-slate-400 text-xs uppercase tracking-wider font-semibold mr-2">Pilot:</span>
                            <span className="font-semibold text-white bg-slate-700/50 px-3 py-1.5 rounded-full">{user?.name}</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-slate-800 hover:bg-slate-700 hover:text-red-400 text-slate-300 px-4 py-2 rounded-lg text-sm transition-all border border-slate-600 shadow-sm"
                        >
                            Sign out
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto p-4 md:p-8 mt-4 md:mt-8">
                <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Welcome to the Dashboard!</h2>
                        <p className="text-slate-400 mb-10 text-lg max-w-2xl leading-relaxed">
                            This is the protected area. You&apos;ve successfully authenticated and your JSON Web Token is stored and active.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Profile Card */}
                            <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl relative overflow-hidden group hover:border-blue-500/50 transition-colors">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent"></div>
                                <h3 className="text-xl font-semibold mb-4 text-blue-400 flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                    Profile Data
                                </h3>
                                <div className="space-y-4 text-slate-300 relative z-10">
                                    <div>
                                        <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">Full Name</div>
                                        <div className="font-medium bg-slate-800/80 px-4 py-2 rounded border border-slate-700/50">{user?.name}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">Email Address</div>
                                        <div className="font-medium bg-slate-800/80 px-4 py-2 rounded border border-slate-700/50">{user?.email}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">Access Role</div>
                                        <div className="font-medium bg-slate-800/80 px-4 py-2 rounded border border-slate-700/50 inline-block text-indigo-300 uppercase text-sm tracking-wide">{user?.role || "user"}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Status Card */}
                            <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl relative hover:border-emerald-500/50 transition-colors">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-transparent"></div>
                                <h3 className="text-xl font-semibold mb-4 text-emerald-400 flex items-center gap-2 relative z-10">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    System Status
                                </h3>
                                <ul className="space-y-4 relative z-10">
                                    <li className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-emerald-500/20">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></div>
                                            <span className="text-slate-300 font-medium">API Connection</span>
                                        </div>
                                        <span className="text-emerald-400 font-mono text-xs uppercase tracking-wider font-semibold">Online</span>
                                    </li>
                                    <li className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-emerald-500/20">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" style={{ animationDelay: "200ms" }}></div>
                                            <span className="text-slate-300 font-medium">Auth Token</span>
                                        </div>
                                        <span className="text-emerald-400 font-mono text-xs uppercase tracking-wider font-semibold">Valid</span>
                                    </li>
                                    <li className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-emerald-500/20">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" style={{ animationDelay: "400ms" }}></div>
                                            <span className="text-slate-300 font-medium">Database</span>
                                        </div>
                                        <span className="text-emerald-400 font-mono text-xs uppercase tracking-wider font-semibold">Connected</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}