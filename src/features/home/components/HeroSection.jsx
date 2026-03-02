"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  const slides = [
    { url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1600&q=80', label: '01' },
    { url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=80', label: '02' },
    { url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1600&q=80', label: '03' },
    { url: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1600&q=80', label: '04' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goTo = (index) => {
    setCurrent(index);
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Sans:wght@300;400;500&display=swap');
        
        :root {
          --gold: #C9A96E;
          --gold-light: #E8D5A3;
          --dark: #0D0D0D;
          --cream: #FAF7F2;
        }

        .hero-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        .animate-pulse-custom {
          animation: pulse 2s infinite;
        }

        .animate-fade-up {
          animation: fadeUp 0.9s ease both;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative w-full min-h-[100svh] overflow-visible font-['DM_Sans',sans-serif] bg-black flex flex-col justify-center">
        {/* Slides */}
        <div className="absolute inset-0 z-0 bg-black overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${index === current ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.03]' }`}
              style={{
                backgroundImage: `url('${slide.url}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'top center',
                transition: 'opacity 1.2s ease, transform 6s ease'
              }}
            />
          ))}
        </div>

        {/* Overlays */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/35 via-black/55 to-black/88" />
        <div className="absolute inset-0 z-[3] opacity-[0.04] pointer-events-none hero-grain transition-opacity duration-700" />

        {/* Content */}
        <div className="relative z-[10] w-full flex flex-col items-center justify-center text-center px-4 md:px-8 lg:px-16 pt-5 pb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#C9A96E]/20 border border-[#C9A96E]/30 rounded-full px-[14px] md:px-[18px] py-[4px] md:py-[6px] mb-[20px] md:mb-[20px] animate-fade-up [animation-delay:200ms] mt-4 md:mt-20 backdrop-blur-sm">
            <div className="w-[5px] md:w-[6px] h-[5px] md:h-[6px] rounded-full bg-gold animate-pulse-custom" />
            <span className="text-[10px] md:text-[11px] tracking-[0.12em] uppercase text-white font-medium">
              Now Accepting Bookings
            </span>
          </div>

          <h1 className="font-['Cormorant_Garamond',serif] text-[clamp(1.2rem,5vw,4rem)] lg:text-[4.5rem] font-light text-white leading-[1.1] tracking-[-0.01em] w-full max-w-[1200px] mb-5 animate-fade-up [animation-delay:400ms] whitespace-nowrap">
            Experience <em className="italic text-gold-light font-normal">Luxury</em> Salon Services, Near You
          </h1>

          <p className="text-[clamp(0.85rem,2vw,1.06rem)] font-light text-white/65 tracking-[0.03em] max-w-[600px] leading-[1.7] mb-12 animate-fade-up [animation-delay:600ms]">
            Premium grooming for Men, Women & Pets — All in One Platform.
          </p>

          {/* Premium Filter Bar */}
          <div className="w-full max-w-[900px] animate-fade-up [animation-delay:700ms] mb-12 mt-5">
            <div className="bg-white p-2 md:p-3 rounded-[2rem] md:rounded-full shadow-[0_32px_64px_rgba(0,0,0,0.6)] flex flex-col md:flex-row items-center gap-3 md:gap-2">
              
              {/* Category Select */}
              <div className="w-full md:w-[35%] relative flex items-center bg-[#F7F3EE] md:bg-transparent rounded-[1.5rem] md:rounded-l-full border border-black/5 md:border-transparent md:border-r-black/10 px-4 md:px-6 py-3.5 md:py-2 transition-colors hover:bg-black/5">
                <svg className="w-5 h-5 text-[#cd6133] mr-3 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
                <div className="w-full relative">
                  <select className="w-full bg-transparent text-black text-[15px] font-bold outline-none appearance-none cursor-pointer">
                    <option value="">All Categories</option>
                    <option value="haircut">Hair & Styling</option>
                    <option value="spa">Spa & Massage</option>
                    <option value="nails">Nails & Makeup</option>
                    <option value="pets">Pet Grooming</option>
                  </select>
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Location Button */}
              <div className="w-full md:w-[45%] relative flex items-center bg-[#F7F3EE] md:bg-transparent rounded-[1.5rem] border border-black/5 md:border-transparent px-4 md:px-6 py-3.5 md:py-2 transition-colors hover:bg-black/5 cursor-pointer">
                <svg className="w-5 h-5 text-[#cd6133] mr-3 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="flex flex-col flex-1 text-left">
                  <span className="text-black/50 text-[10px] uppercase font-extrabold tracking-wider">Location</span>
                  <span className="w-full bg-transparent text-black text-[15px] font-bold truncate">
                    Current Location
                  </span>
                </div>
                <button className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/10 transition-colors text-black/50 hover:text-black" title="Detect Location">
                   <svg width={18} height={18} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </button>
              </div>

              {/* Search Button */}
              <div className="w-full md:w-[20%] mt-2 md:mt-0 relative group">
                <Link href="/salons" className="w-full h-full min-h-[50px] md:min-h-[56px] flex items-center justify-center gap-2 bg-[#cd6133] hover:bg-[#4b3621] text-[#fef9f3] rounded-[1.25rem] md:rounded-full font-bold text-[15px] transition-all duration-300 shadow-[0_8px_20px_rgba(205,97,51,0.3)] hover:shadow-[0_8px_25px_rgba(75,54,33,0.4)]">
                  <svg className="w-4 h-4 text-[#fef9f3]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up [animation-delay:800ms]">
            <Link href="/salons" className="group relative inline-flex items-center justify-center gap-3 bg-[#4b3621]/80 backdrop-blur-md text-[#fef9f3] border-[1.5px] border-[#cd6133]/40 text-[13px] md:text-[14px] font-bold tracking-[0.06em] uppercase px-8 md:px-10 py-[16px] md:py-[18px] rounded-full hover:bg-[#cd6133] hover:text-[#fef9f3] hover:border-[#cd6133] shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_45px_rgba(205,97,51,0.4)] transition-all duration-400 overflow-hidden w-full sm:w-auto">
              <span className="relative z-[1] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] group-hover:drop-shadow-none">Explore All Salons</span>
              <svg className="relative z-[1] w-[18px] h-[18px] transition-transform duration-300 group-hover:translate-x-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] group-hover:drop-shadow-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>

      </section>
    </>
  );
};

export default HeroSection;