"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuthContext } from '@/features/auth/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, loading, logout } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    router.push('/login');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${isScrolled
        ? 'bg-beige/95 backdrop-blur-md shadow-md py-4'
        : 'bg-transparent py-6'
        }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Left Side: Logo & Primary Links */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="material-symbols-outlined text-terracotta text-3xl transition-transform group-hover:rotate-12">
              content_cut
            </span>
            <span className="text-xl font-bold tracking-tight text-earthy-brown">
              Fast Booking
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-base font-semibold text-earthy-brown hover:text-terracotta transition-colors relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-terracotta transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="/salons"
              className="text-base font-semibold text-earthy-brown hover:text-terracotta transition-colors relative group"
            >
              Salons
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-terracotta transition-all group-hover:w-full"></span>
            </Link>
          </div>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden sm:block px-6 py-3 bg-earthy-brown text-white rounded-full text-sm font-bold hover:bg-earthy-brown/90 transition-all shadow-md active:scale-95"
          >
            List Your Business
          </Link>

          <div className="relative">
            {!loading && (
              user ? (
                <>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center justify-center w-11 h-11 rounded-full bg-terracotta/10 text-terracotta hover:bg-terracotta/20 transition-all border-2 border-terracotta/20"
                    aria-label="User profile"
                  >
                    <span className="material-symbols-outlined text-2xl">person</span>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-48 bg-creamy rounded-2xl overflow-hidden py-2 shadow-xl animate-fade-in border border-terracotta/10">
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-earthy-brown hover:bg-terracotta/10 hover:text-terracotta transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <span className="material-symbols-outlined text-lg">account_circle</span>
                        Profile
                      </Link>
                      <button
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-earthy-brown hover:bg-terracotta/10 hover:text-terracotta transition-colors text-left"
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
                  className="px-7 py-3 bg-terracotta text-white rounded-full text-sm font-bold hover:bg-terracotta-dark transition-all shadow-md hover:shadow-terracotta/20 active:scale-95"
                >
                  Login
                </Link>
              )
            )}
          </div>

          <button
            className="md:hidden p-2.5 text-earthy-brown hover:text-terracotta transition-colors rounded-lg hover:bg-terracotta/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="material-symbols-outlined text-2xl">{isMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full p-5 bg-beige/98 backdrop-blur-xl md:hidden flex flex-col gap-3 shadow-xl animate-fade-in border-t border-terracotta/10">
          <Link
            href="/"
            className="text-earthy-brown font-semibold hover:text-terracotta transition-colors px-4 py-3.5 rounded-xl hover:bg-white/40 text-base"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/salons"
            className="text-earthy-brown font-semibold hover:text-terracotta transition-colors px-4 py-3.5 rounded-xl hover:bg-white/40 text-base"
            onClick={() => setIsMenuOpen(false)}
          >
            Salons
          </Link>
          <Link
            href="/contact"
            className="text-terracotta font-bold hover:text-terracotta-dark transition-colors px-4 py-3.5 rounded-xl hover:bg-terracotta/10 text-base"
            onClick={() => setIsMenuOpen(false)}
          >
            List Your Business
          </Link>
          {!loading && !user && (
            <Link
              href="/login"
              className="mt-3 text-center py-4 bg-terracotta text-white rounded-xl font-bold shadow-lg active:scale-[0.98] transition-transform text-base"
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
