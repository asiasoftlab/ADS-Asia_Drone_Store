"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { User, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

interface UserProfile {
    id?: string;
    name: string;
    email: string;
    role: string;
}

const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "New Collections", path: "/collections" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
];

export function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll effect for dynamic navbar styling
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Check user authentication status on load and storage updates
    useEffect(() => {
        const checkUser = () => {
            const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
            const storedUserStr = typeof window !== "undefined" ? localStorage.getItem("user") : null;

            if (token && storedUserStr) {
                try {
                    const storedUser = JSON.parse(storedUserStr);
                    setUser(storedUser);
                } catch {
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        };

        checkUser();
        window.addEventListener('storage', checkUser);
        return () => window.removeEventListener('storage', checkUser);
    }, [pathname]);

    // Skip rendering navbar on authentication pages
    if (pathname?.startsWith("/auth")) {
        return null;
    }

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        setUser(null);
        router.push("/auth/login");
    };

    return (
        <nav 
            className={`sticky top-0 z-50 transition-all duration-300 w-full ${
                isScrolled 
                ? "bg-white/95 backdrop-blur-md shadow-lg shadow-black/5 py-3" 
                : "bg-white py-5 border-b border-slate-100"
            }`}
        >
            <div className="mx-auto px-4 md:px-8 flex justify-between items-center relative">
                
                {/* Left Side: Logo */}
                <div className="flex-shrink-0 z-50">
                    <Logo width={100} height={100} showText={true} textColor="text-brand-blue-dark" />
                </div>

                {/* Center: Navigation Menu (Desktop) */}
                <div className="hidden lg:flex items-center space-x-8 lg:space-x-10">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.name} 
                            href={link.path}
                            className={`relative text-[15px] font-medium transition-colors hover:text-brand-orange group py-2 ${
                                pathname === link.path ? "text-brand-orange" : "text-brand-blue-dark"
                            }`}
                        >
                            {link.name}
                            <span 
                                className={`absolute bottom-0 left-0 w-full h-[2px] bg-brand-orange transform origin-left transition-transform duration-300 ease-out ${
                                    pathname === link.path ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                }`}
                            ></span>
                        </Link>
                    ))}
                </div>

                {/* Right Side: Profile / Actions */}
                <div className="hidden md:flex items-center gap-6 z-50">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-slate-500 hidden xl:block">
                                Welcome, <span className="text-brand-blue-dark capitalize">{user.name.split(' ')[0]}</span>
                            </span>
                            
                            <div className="relative group cursor-pointer">
                                <div className="w-[42px] h-[42px] rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-brand-blue-dark transition-all duration-300 group-hover:border-brand-orange group-hover:text-brand-orange group-hover:shadow-[0_0_12px_rgba(241,90,34,0.15)]">
                                    <User size={18} strokeWidth={2.5} />
                                </div>
                                
                                {/* User Dropdown Menu */}
                                <div className="absolute top-[120%] right-0 w-52 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right border border-slate-100 overflow-hidden translate-y-2 group-hover:translate-y-0">
                                    <div className="px-5 py-4 border-b border-slate-100 bg-slate-50">
                                        <p className="text-sm font-bold text-slate-900 capitalize">{user.name}</p>
                                        <p className="text-xs text-slate-500 truncate mt-1">{user.email}</p>
                                    </div>
                                    <div className="py-2">
                                        <button 
                                            onClick={handleLogout}
                                            className="w-full text-left px-5 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
                                        >
                                            <LogOut size={16} />
                                            Sign out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => router.push("/auth/login")}
                            className="bg-brand-blue hover:bg-[#003B73] text-white px-6 py-2.5 rounded-full text-[15px] font-medium transition-all duration-300 shadow-lg shadow-brand-blue/20 flex items-center gap-2 hover:-translate-y-0.5"
                        >
                            <User size={16} />
                            Sign In
                        </button>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <div className="lg:hidden flex items-center z-50">
                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-brand-blue-dark hover:text-brand-orange transition-colors focus:outline-none p-2"
                        aria-label="Toggle Menu"
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div 
                className={`fixed inset-0 bg-white z-40 lg:hidden flex flex-col pt-28 px-6 transition-transform duration-300 ease-in-out ${
                    isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex flex-col space-y-2 text-center">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.name} 
                            href={link.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`text-xl font-medium tracking-wide py-4 border-b border-slate-100 ${
                                pathname === link.path ? "text-brand-orange" : "text-brand-blue-dark hover:text-brand-blue"
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="mt-12 pb-10 flex flex-col items-center gap-6">
                    {user ? (
                        <>
                            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl w-full border border-slate-100">
                                <div className="w-12 h-12 rounded-full bg-white border-2 border-brand-orange flex items-center justify-center text-brand-orange flex-shrink-0">
                                    <User size={20} />
                                </div>
                                <div className="text-left overflow-hidden">
                                    <p className="text-brand-blue-dark text-lg font-medium capitalize truncate">{user.name}</p>
                                    <p className="text-slate-500 text-sm truncate">{user.email}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => {
                                    handleLogout();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full bg-slate-50 hover:bg-red-50 text-red-500 hover:text-red-600 py-3.5 rounded-xl transition-colors font-medium flex items-center justify-center gap-2 border border-slate-200 hover:border-red-200"
                            >
                                <LogOut size={18} />
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <button 
                            onClick={() => {
                                router.push("/auth/login");
                                setIsMobileMenuOpen(false);
                            }}
                            className="w-full bg-brand-blue hover:bg-[#003B73] text-white py-3.5 rounded-xl transition-all font-medium flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/20"
                        >
                            <User size={18} />
                            Sign In / Register
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
