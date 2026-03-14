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
      setIsScrolled(window.scrollY > 40);
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
          ? 'bg-[linear-gradient(135deg,#f5f3ff_0%,#f7f5ff_45%,#ffffff_100%)] backdrop-blur-md shadow-md py-3 md:py-4'
          : 'bg-transparent py-5 md:py-6'
        }`}
    >
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 mx-auto">
        <div className="flex items-center justify-between">
          {/* Left Side: Logo & Primary Links */}
          <div className="flex items-center gap-4 lg:gap-8">
            <Link
              href="/"
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm"
            >
              <span className="material-symbols-outlined text-[#D98C5F] text-xl sm:text-2xl md:text-3xl">
                content_cut
              </span>
              <span className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-gray-700 whitespace-nowrap">
                Fast Booking
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/"
                className={`px-4 lg:px-5 py-2 md:py-2.5 rounded-full text-sm font-medium transition-all shadow-sm ${isScrolled
                    ? 'bg-black/5 backdrop-blur-sm text-gray-500 hover:bg-[#D98C5F] hover:text-white'
                    : 'bg-white/80 backdrop-blur-sm text-gray-500 hover:bg-gray-300 hover:text-white'
                  }`}
              >
                Home
              </Link>
              <Link
                href="/salons"
                className={`px-4 lg:px-5 py-2 md:py-2.5 rounded-full text-sm font-medium transition-all shadow-sm ${isScrolled
                    ? 'bg-black/5 backdrop-blur-sm text-gray-500 hover:bg-[#D98C5F] hover:text-white'
                    : 'bg-white/80 backdrop-blur-sm text-gray-500 hover:bg-gray-300 hover:text-white'
                  }`}
              >
                Salons
              </Link>
            </div>
          </div>

          {/* Right Side: Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            <Link
              href="/contact"
              className={`hidden sm:flex px-5 md:px-6 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-semibold transition-all shadow-md active:scale-95 whitespace-nowrap ${isScrolled
                  ? 'bg-[#D98C5F] text-white hover:bg-[#C6794C]'
                  : 'bg-white/80 backdrop-blur-sm text-gray-500 hover:bg-[#D98C5F] hover:text-white border border-white/30'
                }`}
            >
              List Your Business
            </Link>

            {/* Auth / Profile */}
            <div className="relative">
              {!loading && (
                user ? (
                  <>
                    <button
                      onClick={() => {
                        setIsProfileOpen(!isProfileOpen);
                        setIsMenuOpen(false);
                      }}
                      className={`flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full transition-all shadow-md border-2 ${isScrolled
                          ? 'bg-[#D98C5F] text-white hover:bg-[#C07B52] border-white/30'
                          : 'bg-white/80 backdrop-blur-sm text-gray-500 hover:bg-[#D98C5F] hover:text-white border-white/50'
                        }`}
                      aria-label="User profile"
                    >
                      <span className="material-symbols-outlined text-2xl">person</span>
                    </button>

                    {isProfileOpen && (
                      <div className="absolute right-[-30%] mt-3 w-48 bg-white/95 backdrop-blur-md rounded-xl overflow-hidden py-2 shadow-xl border border-gray-200 animate-in fade-in slide-in-from-top-2 duration-200">
                        <Link
                          href="/profile"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-500 hover:bg-[#D98C5F]/10 hover:text-[#D98C5F] transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <span className="material-symbols-outlined text-lg">account_circle</span>
                          Profile
                        </Link>
                        <button
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-500 hover:bg-[#D98C5F]/10 hover:text-[#D98C5F] transition-colors text-left"
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
                    className={`px-5 md:px-7 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-semibold transition-all shadow-md active:scale-95 ${isScrolled
                        ? 'bg-[#D98C5F] text-white hover:bg-[#C07B52]'
                        : 'bg-white/20 backdrop-blur-sm text-gray-500 hover:bg-[#D98C5F] hover:text-white border border-white/30'
                      }`}
                  >
                    Login
                  </Link>
                )
              )}
            </div>

            {/* Hamburger (Mobile) */}
            <button
              className={`md:hidden p-2 md:p-2.5 rounded-lg transition-all ${isScrolled
                  ? 'bg-black/5 backdrop-blur-sm text-gray-500 hover:bg-[#D98C5F] hover:text-white'
                  : 'bg-white/20 backdrop-blur-sm text-gray-500 hover:bg-[#D98C5F] hover:text-white'
                }`}
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                setIsProfileOpen(false);
              }}
            >
              <span className="material-symbols-outlined text-2xl">{isMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="absolute top-full inset-x-4 mt-2 p-4 md:hidden flex flex-col gap-3 shadow-2xl border border-[#D98C5F]/10 bg-white/95 backdrop-blur-2xl animate-in slide-in-from-top-4 duration-300 rounded-3xl">
          <div className="flex flex-col gap-2 p-2">
            <Link
              href="/"
              className="flex items-center gap-3 text-gray-600 font-medium hover:text-[#D98C5F] transition-all px-4 py-3.5 rounded-2xl hover:bg-[#D98C5F]/10 text-base"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="material-symbols-outlined text-xl">home</span>
              Home
            </Link>
            <Link
              href="/salons"
              className="flex items-center gap-3 text-gray-600 font-medium hover:text-[#D98C5F] transition-all px-4 py-3.5 rounded-2xl hover:bg-[#D98C5F]/10 text-base"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="material-symbols-outlined text-xl">storefront</span>
              Salons
            </Link>
            
            <div className="h-px w-full bg-gray-100 my-2" />
            
            <Link
              href="/contact"
              className="flex items-center gap-3 text-gray-600 font-medium hover:text-[#D98C5F] transition-all px-4 py-3.5 rounded-2xl hover:bg-[#D98C5F]/10 text-base"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="material-symbols-outlined text-xl">business_center</span>
              List Your Business
            </Link>
            
            {!loading && !user && (
              <Link
                href="/login"
                className="mt-3 flex items-center justify-center gap-2 py-3.5 bg-[#D98C5F] hover:bg-[#C6794C] text-white rounded-2xl font-semibold shadow-lg shadow-[#D98C5F]/30 active:scale-[0.98] transition-all text-base"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="material-symbols-outlined text-xl">login</span>
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}