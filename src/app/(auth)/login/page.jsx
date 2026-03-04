"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginUser } from "@/features/auth/services/authService";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await loginUser(form);
      await refreshUser();
      router.push("/profile");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8 animate-fade-in">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-terracotta text-4xl">content_cut</span>
            <span className="text-3xl font-extrabold tracking-tight text-earthy-brown">LUXE</span>
          </Link>
          <h1 className="text-2xl font-bold text-earthy-brown">Welcome Back</h1>
          <p className="text-earthy-brown/60 mt-2">Sign in to your account to continue</p>
        </div>

        {/* Login Card */}
        <div className="glass-nav rounded-[2.5rem] p-8 md:p-10 shadow-2xl border border-terracotta/10 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-earthy-brown/80 ml-1">Email Address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-terracotta/40 text-xl">mail</span>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-white/40 border-none rounded-2xl text-sm focus:ring-2 focus:ring-terracotta/20 transition-all placeholder-earthy-brown/30 outline-none text-earthy-brown font-medium"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-semibold text-earthy-brown/80">Password</label>
                <Link href="/forgot-password" size="sm" className="text-xs font-bold text-terracotta hover:text-terracotta-dark transition-colors">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-terracotta/40 text-xl">lock</span>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-white/40 border-none rounded-2xl text-sm focus:ring-2 focus:ring-terracotta/20 transition-all placeholder-earthy-brown/30 outline-none text-earthy-brown font-medium"
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-terracotta text-white rounded-2xl font-bold shadow-lg shadow-terracotta/20 hover:bg-terracotta-dark transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="animate-spin material-symbols-outlined">progress_activity</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-terracotta/10 text-center">
            <p className="text-sm text-earthy-brown/60">
              Don't have an account?{" "}
              <Link href="/signup" className="text-terracotta font-bold hover:underline">
                Register now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}