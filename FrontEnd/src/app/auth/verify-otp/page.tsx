"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function VerifyOtpPage() {
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const router = useRouter();

    useEffect(() => {
        const storedEmail = localStorage.getItem("resetEmail");
        if (!storedEmail) {
            router.push("/auth/forgot-password");
        } else {
            setEmail(storedEmail);
        }
    }, [router]);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("http://localhost:7878/auth/verify-reset-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setSuccess(data.message);
                setTimeout(() => {
                    router.push("/auth/reset-password");
                }, 1000);
            } else {
                setError(data.message || "Invalid OTP");
            }
        } catch (err: any) {
            setError(err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (countdown > 0) return;

        setResendLoading(true);
        setError("");
        setSuccess("");

        try {
            const res = await fetch("http://localhost:7878/auth/resend-reset-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setSuccess(data.message);
                setCountdown(60); // Reset timer
            } else {
                setError(data.message || "Failed to resend OTP");
            }
        } catch (err: any) {
            setError(err.message || "Something went wrong.");
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-900">
            <form onSubmit={handleSubmit} className="border border-slate-700 bg-slate-800 p-8 rounded-xl w-full max-w-md shadow-2xl">
                <h2 className="text-3xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                    Verify OTP
                </h2>
                <p className="text-slate-400 text-sm text-center mb-6">
                    Enter the 6-digit verification code sent to <br />
                    <span className="font-semibold text-slate-200">{email}</span>
                </p>

                {error && <div className="bg-red-500/20 border border-red-500/30 text-red-400 p-3 rounded-lg mb-4 text-sm text-center">{error}</div>}
                {success && <div className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 p-3 rounded-lg mb-4 text-sm text-center">{success}</div>}

                <div className="space-y-4">
                    <div>
                        <input
                            type="text"
                            maxLength={6}
                            placeholder="••••••"
                            required
                            className="bg-slate-900 border border-slate-700 text-white w-full p-4 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-center text-2xl tracking-[0.5em] font-mono"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || otp.length < 6}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] disabled:opacity-50 text-white font-semibold w-full p-3 rounded-lg transition-all shadow-lg shadow-blue-500/20"
                    >
                        {loading ? "Verifying..." : "Verify Code"}
                    </button>

                    <div className="text-center mt-4">
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={countdown > 0 || resendLoading}
                            className={`text-sm font-medium ${countdown > 0 ? "text-slate-500 cursor-not-allowed" : "text-blue-400 hover:text-blue-300"}`}
                        >
                            {resendLoading ? "Resending..." : countdown > 0 ? `Resend OTP in ${countdown}s` : "Didn't receive a code? Resend"}
                        </button>
                    </div>
                </div>

                <p className="mt-8 text-center text-sm text-slate-400">
                    <Link href="/auth/forgot-password" className="text-blue-400 hover:text-blue-300 font-medium">&larr; Back to Email Entry</Link>
                </p>
            </form>
        </div>
    );
}
