"use client";
import React, { useState, useEffect } from 'react';

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

  const categories = [
    {
      label: "Men",
      sub: "Haircut · Beard · Styling",
      img: "https://www.freepik.com/premium-photo/man-getting-his-hair-cut-by-barber_278589335.htm#fromView=keyword&page=1&position=27&uuid=dde32999-462e-4b3a-bd55-ec2717865765&query=Men+hair+salon",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-[17px] h-[17px] text-[#0D0D0D]">
          <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v11m0 0H5a2 2 0 0 1-2-2v-1m6 3h10m0 0a2 2 0 0 0 2-2v-1m-2 3v4a2 2 0 0 1-2 2H9m10-6H9m0 4v1a2 2 0 0 0 2 2h2" />
        </svg>
      )
    },
    {
      label: "Women",
      sub: "Color · Facial · Nails",
      img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&q=80",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-[17px] h-[17px] text-[#0D0D0D]">
          <path d="M12 2a5 5 0 1 0 0 10A5 5 0 0 0 12 2z" />
          <path d="M12 12v10m-4-4h8" />
        </svg>
      )
    },
    {
      label: "Pets",
      sub: "Bath · Trim · Spa",
      img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-[17px] h-[17px] text-[#0D0D0D]">
          <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5" />
          <path d="M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5" />
          <path d="M8 14v.5A3.5 3.5 0 0 0 11.5 18h1a3.5 3.5 0 0 0 3.5-3.5V14a2 2 0 0 0-2-2H10a2 2 0 0 0-2 2z" />
        </svg>
      )
    },
    {
      label: "Kids",
      sub: "Bath · Trim · Spa",
      img: "https://media.istockphoto.com/id/680907176/photo/little-boy-getting-haircut-by-barber-while-sitting-in-chair-at-barbershop.webp?a=1&b=1&s=612x612&w=0&k=20&c=TnERWxLL7zG9s8He2TEDZD7yhHy42LiJpj3xE33Q7ls=",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-[17px] h-[17px] text-[#0D0D0D]">
          <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5" />
          <path d="M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5" />
          <path d="M8 14v.5A3.5 3.5 0 0 0 11.5 18h1a3.5 3.5 0 0 0 3.5-3.5V14a2 2 0 0 0-2-2H10a2 2 0 0 0-2 2z" />
        </svg>
      )
    }
  ];

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
      <section className="relative w-full h-[80vh] min-h-[600px]  overflow-visible mb-32 md:mb-40 font-['DM_Sans',sans-serif] bg-black">
        {/* Slides */}
        <div className="absolute inset-0 z-0 bg-black overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${index === current ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.03]'
                }`}
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
        <div className="relative z-[10] h-full flex flex-col items-center justify-center text-center px-6 pb-[100px]">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gold/12 border border-gray-300 rounded-full px-[18px] py-[6px] mb-[28px] animate-fade-up [animation-delay:200ms] mt-20">
            <div className="w-[6px] h-[6px] rounded-full bg-gold animate-pulse-custom" />
            <span className="text-[11px] tracking-[0.12em] uppercase text-white font-medium">
              Now Accepting Bookings
            </span>
          </div>

          <h1 className="font-['Cormorant_Garamond',serif] text-[clamp(42px,7vw,88px)] font-light text-white leading-[1.1] tracking-[-0.01em] max-w-[820px] mb-5 animate-fade-up [animation-delay:400ms]">
            Book <em className="italic text-gold-light font-normal">Trusted</em> Salon<br />Services Near You
          </h1>

          <p className="text-[clamp(14px,1.5vw,17px)] font-light text-white/65 tracking-[0.03em] max-w-[480px] leading-[1.7] mb-11 animate-fade-up [animation-delay:600ms]">
            Premium grooming for Men, Women & Pets —<br />All in One Platform.
          </p>

          <a href="#" className="group relative inline-flex items-center gap-3 bg-gradient-to-br from-[#C9A96E] to-[#A07840] text-black text-[14px] font-medium tracking-[0.06em] uppercase px-10 py-[18px] rounded-full shadow-[0_8px_32px_rgba(201,169,110,0.25)] hover:shadow-[0_16px_48px_rgba(201,169,110,0.4)] transition-all duration-400 hover:-translate-y-[3px] animate-fade-up [animation-delay:800ms] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#E8D5A3] to-[#C9A96E] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            <span className="relative z-[1]">Explore Salons</span>
            <svg className="relative z-[1] w-[18px] h-[18px] transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>

        {/* CATEGORY CARDS — shift lower: translateY(70%) */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-[60%] z-[40] flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 pointer-events-none">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer pointer-events-auto group animate-fade-up"
              style={{ animationDelay: `${300 + index * 150}ms` }}
            >
              <div className="w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-full overflow-hidden border-[6px] border-[#FAF7F2] shadow-[0_24px_64px_rgba(0,0,0,0.22),0_4px_16px_rgba(0,0,0,0.10)] transition-all duration-[450ms] cubic-bezier(0.34,1.56,0.64,1) group-hover:shadow-[0_45px_100px_rgba(0,0,0,0.3),0_0_0_4px_#C9A96E,0_15px_40px_rgba(201,169,110,0.25)] relative bg-[#111]">
                <img src={cat.img} alt={cat.label} className="w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-115" loading="lazy" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-black/20 via-transparent to-black/65" />

                {/* Content Inside Card */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-[5]">
                  <div className="font-['Cormorant_Garamond',serif] text-[28px] md:text-[32px] font-semibold text-white shadow-[0_2px_4px_rgba(0,0,0,0.5)] tracking-[0.04em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] transform transition-transform duration-500 group-hover:scale-110">
                    {cat.label}
                  </div>
                  <div className="text-[10px] md:text-[11px] text-white/80 tracking-[0.15em] uppercase mt-1 font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                    {cat.sub}
                  </div>
                </div>

                <div className="absolute bottom-[24px] left-1/2 -translate-x-1/2 z-[10] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-[44px] h-[44px] bg-[#C9A96E] rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(201,169,110,0.4)]">
                    {cat.icon}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default HeroSection;