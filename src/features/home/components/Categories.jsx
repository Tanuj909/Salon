"use client";
import React from 'react';

const Categories = () => {
  const categories = [
    {
      label: "Men",
      sub: "Haircut · Styling",
      img: "https://images.unsplash.com/photo-1647140655214-e4a2d914971f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmFyYmVyfGVufDB8fDB8fHww",
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
    <section className="w-full bg-white py-16 md:py-24 relative z-10 font-['Georgia',serif]">
      {/* Header */}
      <div className="text-center mb-10 md:mb-14">
        <p className="text-[#9b5876] text-[0.8rem] tracking-[0.2em] uppercase mb-3 font-['Georgia',serif]">
          Tailored For You
        </p>
        <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-extrabold text-[#3c1432] m-0 leading-[1.15] font-['Georgia',serif]">
          Browse By Category
        </h2>
        <div className="w-16 h-[3px] bg-gradient-to-r from-[#9b5876] to-[#3c1432] mx-auto mt-4 rounded-sm" />
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20 px-6 max-w-7xl mx-auto">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="flex flex-col items-center cursor-pointer group animate-fade-up"
            style={{ animationDelay: `${300 + index * 150}ms` }}
          >
            <div className="w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] md:w-[220px] md:h-[220px] rounded-full overflow-hidden border-[4px] md:border-[6px] border-[#FAF7F2] shadow-[0_24px_64px_rgba(0,0,0,0.15),0_4px_16px_rgba(0,0,0,0.05)] transition-all duration-[450ms] cubic-bezier(0.34,1.56,0.64,1) group-hover:shadow-[0_45px_100px_rgba(0,0,0,0.2),0_0_0_4px_#C9A96E,0_15px_40px_rgba(201,169,110,0.25)] relative bg-[#111]">
              <img src={cat.img} alt={cat.label} className="w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-115" loading="lazy" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-black/20 via-transparent to-black/65" />

              {/* Content Inside Card */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-[5]">
                <div className="font-['Cormorant_Garamond',serif] text-[24px] sm:text-[28px] md:text-[32px] font-semibold text-white shadow-[0_2px_4px_rgba(0,0,0,0.5)] tracking-[0.04em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] transform transition-transform duration-500 group-hover:scale-110">
                  {cat.label}
                </div>
                <div className="text-[9px] md:text-[11px] text-white/80 tracking-[0.15em] uppercase mt-1 font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                  {cat.sub}
                </div>
              </div>

              <div className="absolute bottom-[20px] md:bottom-[24px] left-1/2 -translate-x-1/2 z-[10] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-[38px] md:w-[44px] h-[38px] md:h-[44px] bg-[#C9A96E] rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(201,169,110,0.4)]">
                  {cat.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
