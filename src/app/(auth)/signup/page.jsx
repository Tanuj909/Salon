"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerUser } from "@/features/auth/services/authService";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    otp: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerUser(form);
      alert("Registration successful!");
      router.push("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-beige p-6 py-12">
      <div className="w-full max-w-2xl">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8 animate-fade-in">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-terracotta text-4xl">content_cut</span>
            <span className="text-3xl font-extrabold tracking-tight text-earthy-brown font-display">LUXE</span>
          </Link>
          <h1 className="text-2xl font-bold text-earthy-brown font-display">Create Your Account</h1>
          <p className="text-earthy-brown/60 mt-2">Join LUXE and book your next appointment easily</p>
        </div>

        {/* Signup Card */}
        <div className="glass-nav rounded-[2.5rem] p-8 md:p-10 shadow-2xl border border-terracotta/10 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-earthy-brown/80 ml-1">Full Name</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-terracotta/40 text-xl">person</span>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-4 bg-white/40 border-none rounded-2xl text-sm focus:ring-2 focus:ring-terracotta/20 transition-all placeholder-earthy-brown/30 outline-none text-earthy-brown font-medium"
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-earthy-brown/80 ml-1">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-terracotta/40 text-xl">mail</span>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full pl-12 pr-4 py-4 bg-white/40 border-none rounded-2xl text-sm focus:ring-2 focus:ring-terracotta/20 transition-all placeholder-earthy-brown/30 outline-none text-earthy-brown font-medium"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-earthy-brown/80 ml-1">Phone Number</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-terracotta/40 text-xl">call</span>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-12 pr-4 py-4 bg-white/40 border-none rounded-2xl text-sm focus:ring-2 focus:ring-terracotta/20 transition-all placeholder-earthy-brown/30 outline-none text-earthy-brown font-medium"
                    onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                  />
                </div>
              </div>

              {/* OTP (Simplified for now) */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-earthy-brown/80 ml-1">OTP</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-terracotta/40 text-xl">verified_user</span>
                  <input
                    type="text"
                    required
                    placeholder="Enter OTP"
                    className="w-full pl-12 pr-4 py-4 bg-white/40 border-none rounded-2xl text-sm focus:ring-2 focus:ring-terracotta/20 transition-all placeholder-earthy-brown/30 outline-none text-earthy-brown font-medium"
                    onChange={(e) => setForm({ ...form, otp: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-earthy-brown/80 ml-1">Password</label>
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
                  <span>Create Account</span>
                  <span className="material-symbols-outlined text-sm">person_add</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-terracotta/10 text-center">
            <p className="text-sm text-earthy-brown/60">
              Already have an account?{" "}
              <Link href="/login" className="text-terracotta font-bold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}