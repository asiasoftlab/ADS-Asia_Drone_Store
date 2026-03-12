"use client";

import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        router.push("/admin/login");
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-200">
            <nav className="bg-slate-800 p-4 shadow-lg flex justify-between items-center border-b border-slate-700">
                <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-300">
                    Admin Portal
                </h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 px-4 py-2 rounded-lg transition-all"
                >
                    Logout
                </button>
            </nav>
            <main className="p-8">
                <div className="max-w-4xl mx-auto bg-slate-800 p-8 rounded-xl shadow-2xl border border-slate-700 text-center mt-10">
                    <h2 className="text-4xl font-extrabold mb-4">Welcome to Admin Dashboard</h2>
                    <p className="text-slate-400 text-lg">
                        This is a secure area only accessible by users with the admin role. 
                        Currently, product management, orders, and analytics are not implemented.
                    </p>
                </div>
            </main>
        </div>
    );
}
