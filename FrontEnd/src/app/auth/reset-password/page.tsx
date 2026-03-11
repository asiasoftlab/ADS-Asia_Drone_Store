"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordPage() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const storedEmail = localStorage.getItem("resetEmail");
        if (!storedEmail) {
            router.push("/auth/forgot-password");
        } else {
            setEmail(storedEmail);
        }
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("http://localhost:7878/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setSuccess(data.message);
                localStorage.removeItem("resetEmail");
                setTimeout(() => {
                    router.push("/auth/login");
                }, 2000);
            } else {
                setError(data.message || "Failed to reset password");
            }
        } catch (err: any) {
            setError(err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-900">
            <form onSubmit={handleSubmit} className="border border-slate-700 bg-slate-800 p-8 rounded-xl w-full max-w-md shadow-2xl">
                <h2 className="text-3xl font-bold mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                    Set New Password
                </h2>
                <p className="text-slate-400 text-sm text-center mb-6">
                    Almost there! Enter your new strong password below.
                </p>

                {error && <div className="bg-red-500/20 border border-red-500/30 text-red-400 p-3 rounded-lg mb-4 text-sm text-center">{error}</div>}
                {success && <div className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 p-3 rounded-lg mb-4 text-sm text-center">{success}</div>}

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">New Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            required
                            className="bg-slate-900 border border-slate-700 text-white w-full p-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Confirm New Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            required
                            className="bg-slate-900 border border-slate-700 text-white w-full p-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-[0.98] disabled:opacity-50 text-white font-semibold w-full p-3 rounded-lg transition-all mt-4 shadow-lg shadow-emerald-500/20"
                    >
                        {loading ? "Updating Password..." : "Reset Password & Login"}
                    </button>
                </div>
            </form>
        </div>
    );
}
