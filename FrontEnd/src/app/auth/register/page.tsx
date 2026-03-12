"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { PasswordInput } from "@/components/PasswordInput";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (name.trim().length < 3) {
            setError("Name must be at least 3 characters long");
            return;
        }
        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await fetch("http://localhost:7878/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    role: "user"
                }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                // Success
                router.push("/auth/login");
            } else {
                setError(data.message || "Registration failed");
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message || "Something went wrong. Is backend running?");
            } else {
                setError("Something went wrong. Is backend running?");
            }
        } finally {
            setLoading(false);
        }
    };

    const loginWithGoogle = async () => {
        setLoading(true);
        setError("");
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            const token = await user.getIdToken();

            const res = await fetch("http://localhost:7878/auth/google-login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ token })
            });

            const data = await res.json();

            if (res.ok && data.success) {
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("refreshToken", data.refreshToken);
                localStorage.setItem("user", JSON.stringify(data.user));
                router.push("/");
            } else {
                setError(data.message || "Google registration failed");
            }
        } catch (err: any) {
            setError(err.message || "Google registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-900">
            <form onSubmit={handleSubmit} className="border border-slate-700 bg-slate-800 p-8 rounded-xl w-full max-w-md shadow-2xl">
                <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                    Create Account
                </h2>

                {error && <div className="bg-red-500/20 border border-red-500/30 text-red-400 p-3 rounded-lg mb-4 text-sm text-center">{error}</div>}

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter Your Name"
                            required
                            className="bg-slate-900 border border-slate-700 text-white w-full p-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            suppressHydrationWarning
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter Your Email Address"
                            required
                            className="bg-slate-900 border border-slate-700 text-white w-full p-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            suppressHydrationWarning
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                        <PasswordInput
                            placeholder="••••••••"
                            required
                            className="bg-slate-900 border border-slate-700 text-white w-full p-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            suppressHydrationWarning
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] disabled:opacity-50 text-white font-semibold w-full p-3 rounded-lg transition-all mt-4 shadow-lg shadow-blue-500/20"
                        suppressHydrationWarning
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>

                    <div className="flex items-center my-4">
                        <div className="flex-grow border-t border-slate-700"></div>
                        <span className="flex-shrink-0 mx-4 text-slate-400 text-sm">or</span>
                        <div className="flex-grow border-t border-slate-700"></div>
                    </div>

                    <button
                        type="button"
                        onClick={loginWithGoogle}
                        disabled={loading}
                        className="flex flex-row items-center justify-center gap-3 bg-white text-slate-800 hover:bg-slate-100 active:scale-[0.98] disabled:opacity-50 font-semibold w-full p-3 rounded-lg transition-all shadow-lg"
                        suppressHydrationWarning
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                    </button>
                </div>

                <p className="mt-6 text-center text-sm text-slate-400">
                    Already have an account? <Link href="/auth/login" className="text-blue-400 hover:text-blue-300 font-medium">Log in</Link>
                </p>
            </form>
        </div>
    );
}