"use client";

import React from 'react';
import Link from 'next/link';
import useActiveCategories from '@/features/salons/hooks/useActiveServices';

const Footer = () => {
  const { categories } = useActiveCategories();

  const getCategoryLink = (name) => {
    const match = categories?.find(c => c.name.toLowerCase() === name.toLowerCase());
    return match ? `/salons?categoryId=${match.id}` : `/salons`;
  };

  return (
    // <footer className="bg-[#3c1432] text-[#fdf6f0] pt-20 pb-10 px-6" style={{ fontFamily: "'Georgia', serif" }}>
    <footer className="bg-plum text-[#fdf6f0] pt-20 pb-10 px-6" style={{ fontFamily: "'Georgia', serif" }}>
      {/* Scoped styles only for pseudo-elements and hover effects Tailwind can't do in JSX */}
      <style>{`
        .ft-link:hover { color: #c4956a; }
        .ft-social-btn:hover { background: #9b5876; border-color: #9b5876; color: #fdf6f0; }
        .ft-input::placeholder { color: rgba(253,246,240,0.3); }
        .ft-input:focus { border-color: rgba(155,88,118,0.6); background: rgba(253,246,240,0.09); }
        .ft-subscribe:hover { opacity: 0.88; transform: translateY(-1px); }
        .ft-bottom-link:hover { color: #fdf6f0; }
      `}</style>

      <div className="max-w-[1200px] mx-auto">

        {/* Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">

          {/* Col 1 — Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            {/* Logo */}
<div className="flex items-center gap-2.5 mb-5">
  <Link
    href="/"
    className="flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm"
  >
    <span className="material-symbols-outlined text-[#D98C5F] text-2xl md:text-3xl">
      content_cut
    </span>
  </Link>
  <div className="flex items-center gap-2.5 flex-wrap">
    <span className="text-2xl font-extrabold tracking-[0.08em] text-[#fdf6f0] whitespace-nowrap">
      Fast Booking
    </span>
  </div>
</div>

            {/* Tagline */}
            <p className="text-[0.8rem] md:text-[0.86rem] leading-[1.7] mb-6 max-w-[280px]" style={{ color: 'rgba(253,246,240,0.52)' }}>
              Dedicated to the art of luxury grooming and holistic well-being. Redefining elegance since 2010.
            </p>

            {/* Social buttons */}
            <div className="flex gap-4 md:gap-3 mt-1 justify-center md:justify-start">
              {/* Instagram */}
              <a href="#" className="ft-social-btn w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer transition-all no-underline"
                style={{ borderColor: 'rgba(253,246,240,0.2)', color: 'rgba(253,246,240,0.7)', background: 'transparent' }}
                aria-label="Instagram">
                <svg width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4.5" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" className="ft-social-btn w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer transition-all no-underline"
                style={{ borderColor: 'rgba(253,246,240,0.2)', color: 'rgba(253,246,240,0.7)', background: 'transparent' }}
                aria-label="Facebook">
                <svg width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              {/* Globe */}
              <a href="#" className="ft-social-btn w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer transition-all no-underline"
                style={{ borderColor: 'rgba(253,246,240,0.2)', color: 'rgba(253,246,240,0.7)', background: 'transparent' }}
                aria-label="Website">
                <svg width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2 — Explore */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-base font-bold mb-6 tracking-[0.02em] text-[#fdf6f0]">Explore</h4>
            
            <Link
              href="/salons"
              className="ft-link block text-[0.88rem] mb-3.5 no-underline transition-colors duration-200"
              style={{ color: 'rgba(253,246,240,0.55)', fontFamily: "'Georgia', serif" }}
            >
              Our Salons
            </Link>
            
            {/* <a
              href="#"
              className="ft-link block text-[0.88rem] mb-3.5 no-underline transition-colors duration-200"
              style={{ color: 'rgba(253,246,240,0.55)', fontFamily: "'Georgia', serif" }}
            >
              Special Offers
            </a>

            <a
              href="#"
              className="ft-link block text-[0.88rem] mb-3.5 no-underline transition-colors duration-200"
              style={{ color: 'rgba(253,246,240,0.55)', fontFamily: "'Georgia', serif" }}
            >
              Gift Cards
            </a> */}
          </div>

          {/* Col 3 — Categories */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-base font-bold mb-6 tracking-[0.02em] text-[#fdf6f0]">Categories</h4>

            {/* Dynamic Category Links */}
            {['Men', 'Women', 'Kids', 'Pets'].map((catName) => (
              <Link
                key={catName}
                href={getCategoryLink(catName)}
                className="ft-link block text-[0.88rem] mb-3.5 no-underline transition-colors duration-200"
                style={{ color: 'rgba(253,246,240,0.55)', fontFamily: "'Georgia', serif" }}
              >
                {catName}
              </Link>
            ))}
          </div>

          {/* Col 4 — Business */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-base font-bold mb-6 tracking-[0.02em] text-[#fdf6f0]">Partner With Us</h4>
            
            <Link
              href="/business"
              className="ft-link block text-[0.88rem] mb-3.5 no-underline transition-colors duration-200"
              style={{ color: 'rgba(253,246,240,0.55)', fontFamily: "'Georgia', serif" }}
            >
              List your Business
            </Link>
            
            {/* <a
              href="#"
              className="ft-link block text-[0.88rem] mb-3.5 no-underline transition-colors duration-200"
              style={{ color: 'rgba(253,246,240,0.55)', fontFamily: "'Georgia', serif" }}
            >
              Partner Portal
            </a> */}
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4 pt-7 border-t" style={{ borderColor: 'rgba(253,246,240,0.1)' }}>
          <p className="text-[0.78rem] w-full md:w-auto" style={{ color: 'rgba(253,246,240,0.35)', fontFamily: "'Georgia', serif" }}>
            © 2024 Luxe Salon &amp; Spa. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6 w-full md:w-auto">
            <a href="#" className="ft-bottom-link text-[0.78rem] no-underline transition-colors duration-200"
              style={{ color: 'rgba(253,246,240,0.35)', fontFamily: "'Georgia', serif" }}>
              Privacy Policy
            </a>
            <a href="#" className="ft-bottom-link text-[0.78rem] no-underline transition-colors duration-200"
              style={{ color: 'rgba(253,246,240,0.35)', fontFamily: "'Georgia', serif" }}>
              Terms of Service
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;