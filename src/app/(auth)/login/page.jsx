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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-gray-50/50">
      <div className="w-full max-w-md mt-6 sm:mt-0 mb-6 sm:mb-0">
        {/* Logo/Brand Section */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <Link href="/" className="inline-flex items-center justify-center mb-6 sm:mb-8">
            <img 
              src="/logo/fastbooking.png" 
              alt="Fast Booking Logo" 
              className="w-20 sm:w-28 h-auto object-contain" 
            />
          </Link>
          {/* <h1 className="text-xl sm:text-2xl font-bold text-earthy-brown">Welcome Back</h1> */}
          <p className="text-xs sm:text-sm text-earthy-brown/60 mt-1 sm:mt-2">Sign in to your account to continue</p>
        </div>

        {/* Login Card */}
        <div className="glass-nav rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-2xl border border-terracotta/10 animate-slide-up bg-white/80">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-semibold text-earthy-brown/80 ml-1">Email Address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-terracotta/40 text-lg sm:text-xl">mail</span>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-white/60 sm:bg-white/40 border-none rounded-xl sm:rounded-2xl text-xs sm:text-sm focus:ring-2 focus:ring-terracotta/20 transition-all placeholder-earthy-brown/30 outline-none text-earthy-brown font-medium"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs sm:text-sm font-semibold text-earthy-brown/80">Password</label>
                <Link href="/forgot-password" size="sm" className="text-[10px] sm:text-xs font-bold text-terracotta hover:text-terracotta-dark transition-colors">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-terracotta/40 text-lg sm:text-xl">lock</span>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-white/60 sm:bg-white/40 border-none rounded-xl sm:rounded-2xl text-xs sm:text-sm focus:ring-2 focus:ring-terracotta/20 transition-all placeholder-earthy-brown/30 outline-none text-earthy-brown font-medium"
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 sm:mt-8 py-3.5 sm:py-4 bg-terracotta text-white rounded-xl sm:rounded-2xl font-bold shadow-lg shadow-terracotta/20 hover:bg-terracotta-dark transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {loading ? (
                <span className="animate-spin material-symbols-outlined text-xl">progress_activity</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <span className="material-symbols-outlined text-sm sm:text-base">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-terracotta/10 text-center">
            <p className="text-xs sm:text-sm text-earthy-brown/60">
              Don't have an account?{" "}
              <Link href="/signup" className="text-terracotta font-bold hover:underline ml-1">
                Register now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}