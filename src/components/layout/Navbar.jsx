"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Scissors, Search, Menu, X } from 'lucide-react';
import { useAuth, useAuthContext } from '@/features/auth/hooks/useAuth';
import { logoutUser } from '@/features/auth/services/authService';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, loading, logout } = useAuthContext();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    router.push('/login');
  };


  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[1200px]">
      <div className="glass-nav rounded-full px-4 md:px-8 py-3 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-4 md:gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="material-symbols-outlined text-terracotta text-3xl">content_cut</span>
            <span className="text-xl font-extrabold tracking-tight text-earthy-brown font-display hidden [@media(min-width:400px)]:inline">Fast Booking</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {['Home', 'Salons', 'About', 'Contact'].map((item) => (
              <Link
                key={item}
                href={
                  item === 'Home' ? '/' :
                    item === 'About' ? '/#about' :
                      `/${item.toLowerCase()}`
                }
                className="text-sm font-semibold hover:text-terracotta transition-colors text-earthy-brown font-display"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-terracotta/60 text-sm">search</span>
            <input
              className="pl-10 pr-4 py-2 bg-white/40 border-none rounded-full text-sm focus:ring-2 focus:ring-primary w-48 lg:w-64 transition-all placeholder-earthy-brown/50 font-display outline-none text-earthy-brown"
              placeholder="Search services..."
              type="text"
            />
          </div>

          <div className="relative">
            {!loading && (
              user ? (
                <>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white/40 text-earthy-brown hover:bg-white/60 transition-all border border-terracotta/20"
                    aria-label="User profile"
                  >
                    <span className="material-symbols-outlined text-xl">person</span>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-48 glass-nav rounded-2xl overflow-hidden py-2 shadow-xl animate-fade-in border border-terracotta/10">
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-earthy-brown hover:bg-terracotta/10 hover:text-terracotta transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <span className="material-symbols-outlined text-lg">account_circle</span>
                        Profile
                      </Link>
                      <button
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-earthy-brown hover:bg-terracotta/10 hover:text-terracotta transition-colors"
                        onClick={handleLogout}
                      >
                        <span className="material-symbols-outlined text-lg">logout</span>
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href="/login"
                  className="px-6 py-2 bg-terracotta text-white rounded-full text-sm font-semibold hover:bg-terracotta-dark transition-all shadow-lg hover:shadow-terracotta/20 active:scale-95"
                >
                  Login
                </Link>
              )
            )}
          </div>

          <button
            className="md:hidden p-2 text-earthy-brown"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full mt-4 w-full p-4 glass-nav rounded-2xl md:hidden flex flex-col gap-2 animate-fade-in">
          {['Home', 'Salons', 'About', 'Contact'].map((item) => (
            <Link
              key={item}
              href={
                item === 'Home' ? '/' :
                  item === 'About' ? '/#about' :
                    `/${item.toLowerCase()}`
              }
              className="text-earthy-brown font-semibold hover:text-terracotta transition-colors px-4 py-2 rounded-xl hover:bg-white/40"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
          {!loading && !user && (
            <Link
              href="/login"
              className="mt-2 text-center py-3 bg-terracotta text-white rounded-xl font-bold shadow-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

