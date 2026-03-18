"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useActiveCategories from '../../../features/salons/hooks/useActiveServices';
import { fetchDistinctServiceNames } from '@/features/salons/services/salonService';
import Fuse from 'fuse.js';
import { fuseData } from '../data/fuseData';

const serviceData = fuseData.filter(item => item.type === 'service');
const fuseOptions = {
  keys: ["name", "synonyms"],
  threshold: 0.35,
};
const fuse = new Fuse(serviceData, fuseOptions);

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [serviceSearch, setServiceSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setServiceSearch(val);
    if (val.trim()) {
      const results = fuse.search(val.trim()).slice(0, 3).map(result => result.item);
      setSuggestions(results);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (serviceName) => {
    setServiceSearch(serviceName);
    setShowSuggestions(false);
  };

  const handleSearchSubmit = () => {
    const trimmed = serviceSearch.trim();
    if (!trimmed) return;
    
    // Fuzzy search to find the closest matching correct name
    const results = fuse.search(trimmed);
    let finalSearchTerm = trimmed;
    
    if (results.length > 0) {
      // Pick the exact best match name to bypass typos
      finalSearchTerm = results[0].item.name;
    }
    
    setServiceSearch(finalSearchTerm);
    setShowSuggestions(false);
    router.push(`/salons?serviceName=${encodeURIComponent(finalSearchTerm)}`);
  };

  const [headingIndex, setHeadingIndex] = useState(0);
  const [headingFade, setHeadingFade] = useState(true);
  const [placeholderFade, setPlaceholderFade] = useState(true);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const [distinctServices, setDistinctServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);

  const headings = [
    "Experience Luxury Services Near You",
    "Find Your Perfect Style Right Today",
    "Expert Grooming For Everyone Locally",
    "Your Beauty Is Always Our Priority"
  ];

  const servicePlaceholders = [
    "Haircut", "Manicure", "Beard Trim", "Facial", "Hair Coloring", "Massage", "Spa Treatment"
  ];

  const { categories, loading, error } = useActiveCategories();

  const slides = [
    { url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1600&q=80', label: '01' },
    { url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=80', label: '02' },
    { url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1600&q=80', label: '03' },
    { url: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1600&q=80', label: '04' }
  ];

  // ─── Background Cycle ───
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // ─── Fetch Distinct Services ───
  useEffect(() => {
    fetchDistinctServiceNames()
      .then((data) => {
        setDistinctServices(data || []);
      })
      .catch((err) => {
        console.error("Failed to load distinct services:", err);
      })
      .finally(() => {
        setLoadingServices(false);
      });
  }, []);

  // ─── Heading Cycle (5s) ───
  useEffect(() => {
    const headingTimer = setInterval(() => {
      setHeadingFade(false);
      setTimeout(() => {
        setHeadingIndex((prev) => (prev + 1) % headings.length);
        setHeadingFade(true);
      }, 500);
    }, 5000);
    return () => clearInterval(headingTimer);
  }, []);

  // ─── Placeholder Cycle (3.5s) ───
  useEffect(() => {
    const placeholderTimer = setInterval(() => {
      setPlaceholderFade(false);
      setTimeout(() => {
        setPlaceholderIndex((prev) => (prev + 1) % servicePlaceholders.length);
        setPlaceholderFade(true);
      }, 500);
    }, 3500);
    return () => clearInterval(placeholderTimer);
  }, []);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Sans:wght@300;400;500&display=swap');
        
        :root {
          --gold: #C9A96E;
          --terracotta: #B76E4B;
        }

        .hero-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }

        .animate-fade-up {
          animation: fadeUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }

        .text-shadow {
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
        }
        
        .text-shadow-lg {
          text-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
        }
      `}</style>

      <section className="relative w-full min-h-[100svh] overflow-hidden font-['DM_Sans',sans-serif] flex flex-col justify-center py-20 px-4">
        {/* Animated Background Slides */}
        <div className="absolute inset-0 z-0">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${index === current ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                }`}
              style={{
                backgroundImage: `url('${slide.url}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'opacity 1.5s ease-in-out, transform 8s linear'
              }}
            />
          ))}
        </div>

        {/* Dynamic Overlays */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        <div className="absolute inset-0 z-[4] opacity-[0.03] pointer-events-none hero-grain" />

        {/* Content Container - Shifted downward slightly to clear navbar */}
        <div className="relative z-[10] w-full max-w-7xl mx-auto flex flex-col items-center text-center mt-6 md:mt-16 lg:mt-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-6 animate-fade-up [animation-delay:100ms]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#B76E4B] animate-pulse" />
            <span className="text-[10px] md:text-xs tracking-[0.15em] uppercase text-white font-medium text-shadow">
              Premium Salon Experiences
            </span>
          </div>

          {/* Main Heading - Refined for single line */}
          <h1 className="font-['Cormorant_Garamond',serif] text-[clamp(1.6rem,8vw,4.5rem)] text-white font-light leading-[1.1] tracking-tight mb-5 animate-fade-up [animation-delay:300ms] text-shadow-lg px-2 min-h-[1.2em]">
            <span className={`inline-block transition-opacity duration-500 ${headingFade ? 'opacity-100' : 'opacity-0'}`}>
              {headings[headingIndex].split(' ').map((word, i) => (
                <React.Fragment key={i}>
                  {word === 'Luxury' ? (
                    <span className="italic text-[#B76E4B] font-normal">{word} </span>
                  ) : (
                    <>{word} </>
                  )}
                </React.Fragment>
              ))}
            </span>
          </h1>

          {/* Subtext */}
          <p className="hidden md:block text-[clamp(1rem,2vw,1.25rem)] font-light text-white/80 tracking-wide max-w-2xl leading-relaxed mb-10 animate-fade-up [animation-delay:500ms] px-4 text-shadow">
            Discover and book the finest grooming for Men, Women & Pets. <br className="hidden md:block" /> Seamless appointments, exceptional results.
          </p>

          {/* Filter Bar (Optimized for Narrow Mobile and Tablet) */}
          <div className="w-full max-w-4xl px-3 animate-fade-up [animation-delay:700ms] mt-5 relative z-[100]">
            <div className="bg-white/95 backdrop-blur-xl p-3 md:p-4 lg:p-2 rounded-[2rem] lg:rounded-full shadow-2xl grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-row items-center gap-3 lg:gap-2">

              {/* Category Select */}
              <div className="w-full lg:w-[28%] relative flex items-center bg-gray-50 rounded-full border border-gray-100 px-4 py-3 lg:py-2 transition-all hover:bg-white focus-within:ring-2 focus-within:ring-[#B76E4B]/20">
                <span className="material-symbols-outlined text-[#B76E4B] text-lg mr-2">category</span>
                <select 
                  className="w-full bg-transparent text-[#4A3B2F] text-sm font-medium outline-none appearance-none cursor-pointer"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Categories</option>
                  {loading ? (
                    <option disabled>Loading...</option>
                  ) : (
                    categories?.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))
                  )}
                </select>
                <span className="material-symbols-outlined text-gray-400 text-sm absolute right-4 pointer-events-none">expand_more</span>
              </div>

              {/* Service Select */}
              <div className="w-full lg:w-[24%] relative flex items-center bg-gray-50 rounded-full border border-gray-100 px-4 py-3 lg:py-2 transition-all hover:bg-white focus-within:ring-2 focus-within:ring-[#B76E4B]/20">
                <span className="material-symbols-outlined text-[#B76E4B] text-lg mr-2">content_cut</span>
                <select 
                  className="w-full bg-transparent text-[#4A3B2F] text-sm font-medium outline-none appearance-none cursor-pointer"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                >
                  <option value="">Services</option>
                  {loadingServices ? (
                    <option disabled>Loading...</option>
                  ) : (
                    distinctServices.map((service, idx) => (
                      <option key={idx} value={service}>{service}</option>
                    ))
                  )}
                </select>
                <span className="material-symbols-outlined text-gray-400 text-sm absolute right-4 pointer-events-none">expand_more</span>
              </div>

              {/* Location */}
              <div className="w-full lg:w-[32%] relative flex items-center bg-gray-50 rounded-full border border-gray-100 px-4 py-2.5 lg:py-2 transition-all hover:bg-white cursor-pointer group">
                <span className="material-symbols-outlined text-[#B76E4B] text-lg mr-2 shrink-0">location_on</span>
                <div className="flex flex-col text-left overflow-hidden">
                  <span className="text-[7px] lg:text-[8px] uppercase font-bold text-gray-400 tracking-tighter">Nearby</span>
                  <span className="text-xs lg:text-sm font-medium text-[#4A3B2F] truncate">Current Location</span>
                </div>
                <button className="ml-auto w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm hover:text-[#B76E4B] transition-colors">
                  <span className="material-symbols-outlined text-[1rem] lg:text-lg">my_location</span>
                </button>
              </div>

              {/* Search Trigger */}
              <Link
                href={`/salons?${new URLSearchParams({
                  ...(selectedCategory && { categoryId: selectedCategory }),
                  ...(selectedService && { serviceName: selectedService }),
                }).toString()}`}
                className="w-full lg:w-[16%] py-3 lg:py-2.5 bg-[#B76E4B] hover:bg-[#9E5A3A] text-white rounded-full font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-[#B76E4B]/30 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">search</span>
                <span>Search</span>
              </Link>
            </div>

            {/* Service Search Bar - Below Filter Bar */}
            <div className="mt-4 md:mt-6 flex justify-center w-full relative z-[100]">
              <div className="w-full max-w-xl relative" ref={searchRef}>
                <div className="w-full bg-white/95 backdrop-blur-xl p-1.5 md:p-2 rounded-full md:rounded-full shadow-2xl border border-white/20 flex items-center gap-2 group transition-all hover:bg-white relative z-[110]">
                  <div className="flex-1 relative flex items-center pl-3">
                    <span className="material-symbols-outlined text-[#B76E4B] text-xl mr-3">content_cut</span>
                    <input
                      type="text"
                      className={`w-full bg-transparent text-[#4A3B2F] text-sm md:text-base font-medium outline-none placeholder:text-[#4A3B2F]/50 placeholder:transition-all placeholder:duration-500 ${placeholderFade ? 'placeholder:opacity-100 placeholder:translate-x-0' : 'placeholder:opacity-0 placeholder:-translate-x-4'}`}
                      placeholder={`${servicePlaceholders[placeholderIndex]}`}
                      value={serviceSearch}
                      onChange={handleSearchChange}
                      onFocus={() => {
                        if (serviceSearch.trim()) {
                          setShowSuggestions(true);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSearchSubmit();
                        }
                      }}
                    />
                  </div>
                  <button
                    onClick={handleSearchSubmit}
                    className="px-3 py-2.5 bg-[#B76E4B] hover:bg-[#9E5A3A] text-white rounded-full md:rounded-full font-bold text-sm tracking-wide transition-all flex items-center gap-2 active:scale-95 shrink-0"
                  >
                    <span className="material-symbols-outlined text-lg">search</span>
                    <span className="hidden sm:inline">Search Service</span>
                  </button>
                </div>

                {/* Suggestions Dropdown */}
                {showSuggestions && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl overflow-hidden z-[120] border border-gray-100 flex flex-col">
                    {suggestions.length > 0 ? (
                      suggestions.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSuggestionClick(item.name)}
                          className="w-full text-left px-5 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 flex items-center gap-3"
                        >
                          <span className="material-symbols-outlined text-gray-400 text-sm">search</span>
                          <span className="text-[#4A3B2F] font-medium text-sm md:text-base">{item.name}</span>
                        </button>
                      ))
                    ) : (
                      <div className="px-5 py-4 text-center text-gray-500 text-sm font-medium">
                        No services found
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions (Hero Bottom) */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 animate-fade-up [animation-delay:900ms]">
            <Link
              href="/salons"
              className="px-8 py-4 bg-[#B76E4B] hover:bg-[#9E5A3A] border-2 border-white/30 backdrop-blur-md rounded-full text-white font-bold tracking-widest uppercase text-[10px] transition-all flex items-center gap-2 group"
            >
              <span>Explore All</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;