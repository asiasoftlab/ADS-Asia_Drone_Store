"use client";

import { useRouter } from "next/navigation";
import { ShieldCheck, LogOut, LayoutDashboard, Settings, Users, Box } from "lucide-react";

export default function AdminDashboardPage() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        router.push("/admin/login");
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans relative flex">
            {/* Sidebar Navigation */}
            <aside className="hidden md:flex flex-col w-64 bg-white/80 backdrop-blur-3xl border-r border-slate-200 h-screen sticky top-0 z-40 shadow-sm">
                <div className="p-6 border-b border-slate-200">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-orange to-red-600 flex items-center justify-center shadow-md shadow-red-500/20">
                            <ShieldCheck className="text-white w-4 h-4" />
                        </div>
                        <h1 className="text-xl font-black tracking-tight text-slate-900 flex items-center">
                            A<span className="text-brand-orange">D</span>S
                        </h1>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-red-600">Command Center</span>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                    <button className="flex items-center w-full gap-3 px-4 py-3 bg-brand-orange/10 text-brand-orange border border-brand-orange/20 rounded-xl font-bold transition-colors shadow-sm">
                        <LayoutDashboard size={18} />
                        Dashboard
                    </button>
                    <button className="flex items-center w-full gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-xl font-semibold transition-colors cursor-not-allowed opacity-50">
                        <Users size={18} />
                        Pilots & Users
                    </button>
                    <button className="flex items-center w-full gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-xl font-semibold transition-colors cursor-not-allowed opacity-50">
                        <Box size={18} />
                        Fleet Inventory
                    </button>
                    <button className="flex items-center w-full gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-xl font-semibold transition-colors cursor-not-allowed opacity-50">
                        <Settings size={18} />
                        System Config
                    </button>
                </div>

                <div className="p-4 border-t border-slate-200">
                    <button
                        onClick={handleLogout}
                        className="flex items-center justify-center w-full gap-2 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 px-4 py-3 rounded-xl transition-all font-bold text-sm shadow-sm"
                    >
                        <LogOut size={16} />
                        Terminate Uplink
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 w-full relative z-10 p-4 md:p-8 lg:p-12">
                {/* Ambient Background Elements */}
                <div className="fixed top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-orange/5 blur-[150px] pointer-events-none z-[-1]"></div>
                
                {/* Mobile Header */}
                <header className="md:hidden flex justify-between items-center mb-8 bg-white/80 p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="text-brand-orange w-6 h-6" />
                        <h1 className="text-xl font-black text-slate-900">ADS</h1>
                    </div>
                    <button onClick={handleLogout} className="p-2 bg-red-50 text-red-600 rounded-lg border border-red-100">
                        <LogOut size={18} />
                    </button>
                </header>

                {/* Dashboard Stats / Grid */}
                <div className="mb-10">
                    <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">System Overview</h2>
                    <p className="text-slate-500 font-medium">Welcome to restricted command center</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white/60 backdrop-blur-xl border border-slate-200 p-6 rounded-2xl shadow-lg hover:border-brand-orange/50 transition-all group">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-brand-blue/10 rounded-xl text-brand-blue border border-brand-blue/20">
                                <Users size={24} />
                            </div>
                            <span className="px-2 py-1 bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs font-bold rounded-lg">+12%</span>
                        </div>
                        <h3 className="text-slate-500 text-sm uppercase tracking-wider font-bold">Active Pilots</h3>
                        <div className="text-3xl font-black text-slate-900 mt-1 group-hover:text-brand-blue transition-colors">1,248</div>
                    </div>

                    <div className="bg-white/60 backdrop-blur-xl border border-slate-200 p-6 rounded-2xl shadow-lg hover:border-brand-orange/50 transition-all group">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-brand-orange/10 rounded-xl text-brand-orange border border-brand-orange/20">
                                <Box size={24} />
                            </div>
                            <span className="px-2 py-1 bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs font-bold rounded-lg">Stable</span>
                        </div>
                        <h3 className="text-slate-500 text-sm uppercase tracking-wider font-bold">Drone Inventory</h3>
                        <div className="text-3xl font-black text-slate-900 mt-1 group-hover:text-brand-orange transition-colors">342 Units</div>
                    </div>

                    <div className="bg-white/60 backdrop-blur-xl border border-slate-200 p-6 rounded-2xl shadow-lg hover:border-brand-orange/50 transition-all group">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-red-50 rounded-xl text-red-600 border border-red-200">
                                <ShieldCheck size={24} />
                            </div>
                            <span className="px-2 py-1 bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold rounded-lg shadow-sm">RESTRICTED</span>
                        </div>
                        <h3 className="text-slate-500 text-sm uppercase tracking-wider font-bold">Security Level</h3>
                        <div className="text-3xl font-black text-slate-900 mt-1 group-hover:text-red-500 transition-colors">Omega</div>
                    </div>
                </div>

                {/* Primary Content Notice */}
                <div className="bg-white border border-slate-200 p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-orange to-red-600"></div>
                    <div className="absolute top-[-40%] right-[-10%] opacity-10 transition-transform duration-[10000ms] group-hover:rotate-180 pointer-events-none">
                        <svg width="400" height="400" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="5,5" className="text-brand-orange"/><circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="1" fill="none" className="text-brand-blue"/></svg>
                    </div>

                    <div className="relative z-10 max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-200 rounded-full text-red-600 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                            Under Construction
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 uppercase tracking-tight leading-tight">
                            Aviation Command Interface <br className="hidden md:block"/> Loading Phase 2
                        </h2>
                        <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-medium">
                            Welcome, Commander. This is a highly classified secure area only accessible by users with executive clearance. Currently, high-level product management, tactical orders, and drone telemetry analytics are not fully initialized.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
