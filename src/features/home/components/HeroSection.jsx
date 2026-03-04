// "use client";
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';

// const HeroSection = () => {
//   const [current, setCurrent] = useState(0);

//   const slides = [
//     { url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1600&q=80', label: '01' },
//     { url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=80', label: '02' },
//     { url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1600&q=80', label: '03' },
//     { url: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1600&q=80', label: '04' }
//   ];

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % slides.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, [slides.length]);

//   const goTo = (index) => {
//     setCurrent(index);
//   };

//   return (
//     <>
//       <style jsx global>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Sans:wght@300;400;500&display=swap');
        
//         :root {
//           --gold: #C9A96E;
//           --gold-light: #E8D5A3;
//           --dark: #0D0D0D;
//           --cream: #FAF7F2;
//         }

//         .hero-grain {
//           background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
//         }

//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(24px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         @keyframes pulse {
//           0%, 100% { opacity: 1; transform: scale(1); }
//           50% { opacity: 0.5; transform: scale(0.8); }
//         }

//         .animate-pulse-custom {
//           animation: pulse 2s infinite;
//         }

//         .animate-fade-up {
//           animation: fadeUp 0.9s ease both;
//         }
//       `}</style>

//       {/* Hero Section */}
//       <section className="relative w-full min-h-[100svh] overflow-visible font-['DM_Sans',sans-serif] bg-black flex flex-col justify-center">
//         {/* Slides */}
//         <div className="absolute inset-0 z-0 bg-black overflow-hidden">
//           {slides.map((slide, index) => (
//             <div
//               key={index}
//               className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${index === current ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.03]' }`}
//               style={{
//                 backgroundImage: `url('${slide.url}')`,
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'top center',
//                 transition: 'opacity 1.2s ease, transform 6s ease'
//               }}
//             />
//           ))}
//         </div>

//         {/* Overlays */}
//         <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/35 via-black/55 to-black/88" />
//         <div className="absolute inset-0 z-[3] opacity-[0.04] pointer-events-none hero-grain transition-opacity duration-700" />

//         {/* Content */}
//         <div className="relative z-[10] w-full flex flex-col items-center justify-center text-center px-4 md:px-8 lg:px-16 pt-5 pb-12">
//           {/* Badge */}
//           <div className="inline-flex items-center gap-2 bg-[#C9A96E]/20 border border-[#C9A96E]/30 rounded-full px-[14px] md:px-[18px] py-[4px] md:py-[6px] mb-[20px] md:mb-[20px] animate-fade-up [animation-delay:200ms] mt-4 md:mt-20 backdrop-blur-sm">
//             <div className="w-[5px] md:w-[6px] h-[5px] md:h-[6px] rounded-full bg-gold animate-pulse-custom" />
//             <span className="text-[10px] md:text-[11px] tracking-[0.12em] uppercase text-white font-medium">
//               Now Accepting Bookings
//             </span>
//           </div>

//           <h1 className="font-['Cormorant_Garamond',serif] text-[clamp(1.2rem,5vw,4rem)] lg:text-[4.5rem] font-light text-white leading-[1.1] tracking-[-0.01em] w-full max-w-[1200px] mb-5 animate-fade-up [animation-delay:400ms] whitespace-nowrap">
//             Experience <em className="italic text-gold-light font-normal">Luxury</em> Salon Services, Near You
//           </h1>

//           <p className="text-[clamp(0.85rem,2vw,1.06rem)] font-light text-white/65 tracking-[0.03em] max-w-[600px] leading-[1.7] mb-8 animate-fade-up [animation-delay:600ms]">
//             Premium grooming for Men, Women & Pets — All in One Platform.
//           </p>

//           {/* Premium Filter Bar */}
//           <div className="w-full max-w-[1000px] animate-fade-up [animation-delay:700ms] mb-8 mt-5">
//             <div className="bg-white p-2 md:p-2.5 rounded-[2rem] md:rounded-full shadow-[0_32px_64px_rgba(0,0,0,0.6)] flex flex-col md:flex-row items-center gap-2 md:gap-1.5">
              
//               {/* Category Select */}
//               <div className="w-full md:w-[28%] relative flex items-center bg-[#F7F3EE] md:bg-transparent rounded-[1.5rem] md:rounded-l-full border border-black/5 md:border-transparent md:border-r-black/10 px-4 md:px-4 py-2.5 md:py-1.5 transition-colors hover:bg-black/5">
//                 <svg className="w-4 h-4 text-[#cd6133] mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
//                 </svg>
//                 <div className="w-full relative">
//                   <select className="w-full bg-transparent text-black text-[14px] font-medium outline-none appearance-none cursor-pointer py-0.5">
//                     <option value="">All Categories</option>
//                     <option value="haircut">Hair & Styling</option>
//                     <option value="spa">Spa & Massage</option>
//                     <option value="nails">Nails & Makeup</option>
//                     <option value="pets">Pet Grooming</option>
//                   </select>
//                 </div>
//                 <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
//                   <svg className="w-3.5 h-3.5 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </div>
//               </div>

//               {/* Service Select - NEW DROPDOWN */}
//               <div className="w-full md:w-[24%] relative flex items-center bg-[#F7F3EE] md:bg-transparent rounded-[1.5rem] border border-black/5 md:border-transparent md:border-r-black/10 px-4 md:px-4 py-2.5 md:py-1.5 transition-colors hover:bg-black/5">
//                 <svg className="w-4 h-4 text-[#cd6133] mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
//                 </svg>
//                 <div className="w-full relative">
//                   <select className="w-full bg-transparent text-black text-[14px] font-medium outline-none appearance-none cursor-pointer py-0.5">
//                     <option value="">All Services</option>
//                     <option value="haircut">Haircut</option>
//                     <option value="coloring">Hair Coloring</option>
//                     <option value="styling">Styling</option>
//                     <option value="facial">Facial</option>
//                     <option value="massage">Massage</option>
//                     <option value="manicure">Manicure</option>
//                     <option value="pedicure">Pedicure</option>
//                     <option value="makeup">Makeup</option>
//                     <option value="pet">Pet Grooming</option>
//                   </select>
//                 </div>
//                 <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
//                   <svg className="w-3.5 h-3.5 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </div>
//               </div>

//               {/* Location Button */}
//               <div className="w-full md:w-[32%] relative flex items-center bg-[#F7F3EE] md:bg-transparent rounded-[1.5rem] border border-black/5 md:border-transparent md:border-r-black/10 px-4 md:px-4 py-2.5 md:py-1.5 transition-colors hover:bg-black/5 cursor-pointer">
//                 <svg className="w-4 h-4 text-[#cd6133] mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                 </svg>
//                 <div className="flex flex-col flex-1 text-left">
//                   <span className="text-black/50 text-[9px] uppercase font-bold tracking-wider">Location</span>
//                   <span className="w-full bg-transparent text-black text-[14px] font-medium truncate">
//                     Current Location
//                   </span>
//                 </div>
//                 <button className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-black/10 transition-colors text-black/50 hover:text-black" title="Detect Location">
//                    <svg width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
//                     <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
//                     <circle cx="12" cy="10" r="3" />
//                   </svg>
//                 </button>
//               </div>

//               {/* Search Button */}
//               <div className="w-full md:w-[16%] mt-2 md:mt-0 relative group">
//                 <Link href="/salons" className="w-full h-full min-h-[42px] md:min-h-[44px] flex items-center justify-center gap-2 bg-[#cd6133] hover:bg-[#4b3621] text-[#fef9f3] rounded-[1.25rem] md:rounded-full font-semibold text-[14px] transition-all duration-300 shadow-[0_8px_20px_rgba(205,97,51,0.3)] hover:shadow-[0_8px_25px_rgba(75,54,33,0.4)]">
//                   <svg className="w-3.5 h-3.5 text-[#fef9f3]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                   </svg>
//                   Search
//                 </Link>
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up [animation-delay:800ms]">
//             <Link 
//               href="/salons" 
//               className="group relative inline-flex items-center justify-center gap-3 bg-[#4b3621] text-[#fef9f3] border-2 border-[#cd6133] text-[14px] md:text-[15px] font-bold tracking-[0.06em] uppercase px-8 md:px-10 py-[16px] md:py-[18px] rounded-full hover:bg-[#cd6133] hover:border-[#cd6133] shadow-[0_8px_25px_rgba(75,54,33,0.5)] hover:shadow-[0_12px_35px_rgba(205,97,51,0.6)] transition-all duration-300 w-full sm:w-auto"
//             >
//               <span className="relative z-[1]">Explore All Salons</span>
//               <svg className="relative z-[1] w-[18px] h-[18px] transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                 <line x1="5" y1="12" x2="19" y2="12" />
//                 <polyline points="12 5 19 12 12 19" />
//               </svg>
//             </Link>
//           </div>
//         </div>

//       </section>
//     </>
//   );
// };

// export default HeroSection;
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
  }, []);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Sans:wght@300;400;500&display=swap');
        
        :root {
          --gold: #C9A96E;
          --gold-light: #E8D5A3;
          --terracotta: #B76E4B;
          --brown: #4A3B2F;
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

        /* Improved text shadow for better visibility on light images */
        .text-shadow {
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }
        
        .text-shadow-lg {
          text-shadow: 0 4px 15px rgba(0, 0, 0, 0.7);
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative w-full min-h-[100svh] overflow-visible font-['DM_Sans',sans-serif] bg-black flex flex-col justify-center">
        {/* Slides */}
        <div className="absolute inset-0 z-0 bg-black overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
                index === current ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.03]'
              }`}
              style={{
                backgroundImage: `url('${slide.url}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'opacity 1.2s ease, transform 6s ease'
              }}
            />
          ))}
        </div>

        {/* Enhanced overlays for better text visibility */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
        <div className="absolute inset-0 z-[3] bg-black/20" /> {/* Additional overlay */}
        <div className="absolute inset-0 z-[4] opacity-[0.03] pointer-events-none hero-grain" />

        {/* Content */}
        <div className="relative z-[10] w-full flex flex-col items-center justify-center text-center px-4 md:px-8 lg:px-16 pt-[10px] pb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/30 rounded-full px-[14px] md:px-[18px] py-[4px] md:py-[6px] mb-[20px] md:mb-[20px] animate-fade-up [animation-delay:200ms] mt-4 md:mt-20">
            <div className="w-[5px] md:w-[6px] h-[5px] md:h-[6px] rounded-full bg-[#B76E4B] animate-pulse-custom" />
            <span className="text-[10px] md:text-[11px] tracking-[0.12em] uppercase text-white font-medium text-shadow">
              Now Accepting Bookings
            </span>
          </div>

          {/* Fixed heading - now on one line */}
          <h1 className="font-['Cormorant_Garamond',serif] text-[clamp(2rem,5vw,4.5rem)] text-white font-light leading-[1.2] tracking-[-0.02em] w-full max-w-[1200px] mb-5 animate-fade-up [animation-delay:400ms] px-4 text-shadow-lg whitespace-nowrap">
            Experience <span className="italic text-[#B76E4B] font-normal">Luxury</span> Salon Services, Near You
          </h1>

          <p className="text-[clamp(1rem,2.5vw,1.2rem)] font-light text-white/90 tracking-[0.03em] max-w-[700px] leading-[1.7] mb-8 animate-fade-up [animation-delay:600ms] px-4 text-shadow">
            Premium grooming for Men, Women & Pets — All in One Platform.
          </p>

          {/* Premium Filter Bar */}
          <div className="w-full max-w-[1000px] animate-fade-up [animation-delay:700ms] mb-8 mt-5 px-4">
            <div className="bg-white/95 backdrop-blur-md p-2 md:p-2.5 rounded-[2rem] md:rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex flex-col md:flex-row items-center gap-2 md:gap-1.5">
              
              {/* Category Select */}
              <div className="w-full md:w-[28%] relative flex items-center bg-[#F9F5F0] rounded-[1.5rem] md:rounded-l-full border border-gray-200 px-4 md:px-4 py-2.5 md:py-1.5 transition-colors hover:bg-white">
                <svg className="w-4 h-4 text-[#B76E4B] mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
                <div className="w-full relative">
                  <select className="w-full bg-transparent text-[#4A3B2F] text-[14px] font-medium outline-none appearance-none cursor-pointer py-0.5">
                    <option value="">All Categories</option>
                    <option value="haircut">Hair & Styling</option>
                    <option value="spa">Spa & Massage</option>
                    <option value="nails">Nails & Makeup</option>
                    <option value="pets">Pet Grooming</option>
                  </select>
                </div>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-3.5 h-3.5 text-[#4A3B2F]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Service Select */}
              <div className="w-full md:w-[24%] relative flex items-center bg-[#F9F5F0] rounded-[1.5rem] border border-gray-200 px-4 md:px-4 py-2.5 md:py-1.5 transition-colors hover:bg-white">
                <svg className="w-4 h-4 text-[#B76E4B] mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                </svg>
                <div className="w-full relative">
                  <select className="w-full bg-transparent text-[#4A3B2F] text-[14px] font-medium outline-none appearance-none cursor-pointer py-0.5">
                    <option value="">All Services</option>
                    <option value="haircut">Haircut</option>
                    <option value="coloring">Hair Coloring</option>
                    <option value="styling">Styling</option>
                    <option value="facial">Facial</option>
                    <option value="massage">Massage</option>
                    <option value="manicure">Manicure</option>
                    <option value="pedicure">Pedicure</option>
                    <option value="makeup">Makeup</option>
                    <option value="pet">Pet Grooming</option>
                  </select>
                </div>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-3.5 h-3.5 text-[#4A3B2F]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Location Button */}
              <div className="w-full md:w-[32%] relative flex items-center bg-[#F9F5F0] rounded-[1.5rem] border border-gray-200 px-4 md:px-4 py-2.5 md:py-1.5 transition-colors hover:bg-white cursor-pointer">
                <svg className="w-4 h-4 text-[#B76E4B] mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="flex flex-col flex-1 text-left">
                  <span className="text-[#4A3B2F]/50 text-[9px] uppercase font-bold tracking-wider">Location</span>
                  <span className="w-full bg-transparent text-[#4A3B2F] text-[14px] font-medium truncate">
                    Current Location
                  </span>
                </div>
                <button className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors text-[#4A3B2F]/50 hover:text-[#B76E4B]" title="Detect Location">
                  <svg width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </button>
              </div>

              {/* Search Button */}
              <div className="w-full md:w-[16%] mt-2 md:mt-0 relative group">
                <Link 
                  href="/salons" 
                  className="w-full h-full min-h-[42px] md:min-h-[44px] flex items-center justify-center gap-2 bg-[#B76E4B] hover:bg-[#9E5A3A] text-white rounded-[1.25rem] md:rounded-full font-semibold text-[14px] transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up [animation-delay:800ms] px-4">
            <Link 
              href="/salons" 
              className="group relative inline-flex items-center justify-center gap-3 bg-[#B76E4B] text-white border-2 border-[#B76E4B] text-[14px] md:text-[15px] font-bold tracking-[0.06em] uppercase px-8 md:px-10 py-[16px] md:py-[18px] rounded-full hover:bg-[#B76E4B] hover:border-[#B76E4B] shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
            >
              <span className="relative z-[1]">Explore All Salons</span>
              <svg className="relative z-[1] w-[18px] h-[18px] transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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