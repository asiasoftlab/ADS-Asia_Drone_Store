"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const res = await fetch("http://localhost:7878/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setSuccess(data.message);
                localStorage.setItem("resetEmail", email);
                setTimeout(() => {
                    router.push("/auth/verify-otp");
                }, 1500);
            } else {
                setError(data.message || "Failed to send OTP");
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
                <h2 className="text-3xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                    Forgot Password
                </h2>
                <p className="text-slate-400 text-sm text-center mb-6">
                    Enter your email address to receive a secure OTP for resetting your password.
                </p>

                {error && <div className="bg-red-500/20 border border-red-500/30 text-red-400 p-3 rounded-lg mb-4 text-sm text-center">{error}</div>}
                {success && <div className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 p-3 rounded-lg mb-4 text-sm text-center">{success}</div>}

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                        <input
                            type="email"
                            placeholder="pilot@drone.com"
                            required
                            className="bg-slate-900 border border-slate-700 text-white w-full p-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] disabled:opacity-50 text-white font-semibold w-full p-3 rounded-lg transition-all mt-4 shadow-lg shadow-blue-500/20"
                    >
                        {loading ? "Sending OTP..." : "Request Reset OTP"}
                    </button>
                </div>

                <p className="mt-6 text-center text-sm text-slate-400">
                    Remember your password? <Link href="/auth/login" className="text-blue-400 hover:text-blue-300 font-medium">Log in</Link>
                </p>
            </form>
        </div>
    );
}
