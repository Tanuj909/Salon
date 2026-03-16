"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Navigation, Star, Search, X, SlidersHorizontal, ChevronDown } from "lucide-react";
// Local badge styles
const badgeStyles = {
  "VERIFIED": {
    bg: "bg-[#cd6133]/10",
    text: "text-[#cd6133]",
    border: "border-[#cd6133]/20"
  },
  "New": {
    bg: "bg-[#4b3621]/10",
    text: "text-[#4b3621]",
    border: "border-[#4b3621]/20"
  },
  "Trending": {
    bg: "bg-[#C8A951]/10",
    text: "text-[#C8A951]",
    border: "border-[#C8A951]/20"
  }
};
import { useNearbySalons } from "@/features/salons/hooks/useNearbySalons";
import { fetchActiveCategories } from "@/features/salons/services/salonService";
import LocationPicker from "./LocationPicker";

// ─── Star Icon ────────────────────────────────────────────────────────────────
const StarIcon = ({ filled }) => (
  <Star size={13} fill={filled ? "#cd6133" : "transparent"} color={filled ? "#cd6133" : "#e0d0c8"} />
);

// ─── Salon Card ───────────────────────────────────────────────────────────────
function SalonCard({ salon }) {
  // Determine image source with fallback
  const imageSrc = salon.bannerImageUrl || (salon.imageUrls && salon.imageUrls.length > 0 ? salon.imageUrls[0] : "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=60");

  // Build location string from available fields
  const locationString = [salon.city, salon.state, salon.country].filter(Boolean).join(", ");

  // Open status badge
  const openBadge = salon.isOpen ? "Open Now" : "Closed";

  // Verification badge check
  const badge = salon.verificationStatus === "VERIFIED" ? "VERIFIED" : null;
  const bc = badge ? badgeStyles[badge] : null;

  return (
    <Link
      href={`/salons/${salon.id}`}
      className="group block rounded-[20px] overflow-hidden border border-[#4b3621]/10 cursor-pointer shadow-[0_2px_16px_rgba(75,54,33,0.06)] no-underline h-full flex flex-col"
    >
      {/* ── Image ── */}
      <div className="relative h-[210px] overflow-hidden shrink-0">
        <img
          src={imageSrc}
          alt={salon.name}
          className="w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-[1.08]"
        />
        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(75,54,33,0.6)]" />

        {/* Badge */}
        {badge && bc && (
          <span
            className="
      absolute top-3.5 left-3.5
      px-[11px] py-1
      rounded-full
      text-[0.68rem]
      font-bold
      tracking-[0.06em]
      font-['Manrope',sans-serif]
      bg-[#cd6133]
      text-white
      border border-white/20
      shadow-md
    "
          >
            Top Rated
          </span>
        )}

        {/* Open/Closed Badge */}
        <span className={`absolute top-3.5 right-3.5 px-3 py-1 rounded-full text-[0.7rem] font-bold tracking-[0.04em] backdrop-blur-[8px] ${salon.isOpen ? "bg-[#fdf6f0]/90 text-[#cd6133]" : "bg-[#f8d4d4]/90 text-[#7f1a1a]"} font-['Manrope',sans-serif]`}>
          {openBadge}
        </span>
      </div>

      {/* ── Body ── */}
      <div className="p-[22px_22px_20px] flex flex-col flex-1">
        <h3 className="text-[1.15rem] font-bold leading-[1.3] mb-1.5 text-[#4b3621] font-[Cormorant_Garamond,Georgia,serif] line-clamp-1">
          {salon.name}
        </h3>

        <div className="flex items-center gap-1.5 text-[0.75rem] mb-3 text-[#5a3d2b]/70 font-['Manrope',sans-serif] font-medium">
          <MapPin size={12} className="text-[#cd6133]" />
          {locationString || salon.address || "Location unavailable"}
        </div>

        {/* Divider */}
        <div className="h-px mb-3 bg-[#4b3621]/10" />

        {/* Description */}
        {salon.description && (
          <p className="text-[0.8rem] text-[#5a3d2b]/80 mb-3 font-['Manrope',sans-serif] line-clamp-2 italic leading-relaxed">
            {salon.description}
          </p>
        )}

        {/* Service Count (if available) */}
        {salon.serviceCount !== undefined && salon.serviceCount !== null && (
          <div className="inline-block px-2.5 py-1 bg-[#4b3621]/5 text-[#4b3621] text-[0.68rem] font-bold uppercase tracking-widest rounded-md mb-auto font-['Manrope',sans-serif] self-start">
            {salon.serviceCount} Services Available
          </div>
        )}

        {/* Footer: Rating & Button */}
        <div className="mt-4 pt-4 flex items-center justify-between border-t border-[#4b3621]/10">
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <StarIcon
                  key={i}
                  filled={i <= Math.round(salon.averageRating || 0)}
                />
              ))}
            </div>
            <span className="text-[0.85rem] font-bold text-[#4b3621] font-['Manrope',sans-serif]">
              {(salon.averageRating || 0).toFixed(1)}
            </span>
            <span className="text-[0.75rem] text-[#5a3d2b]/60 font-['Manrope',sans-serif] ml-0.5">
              ({salon.totalReviews || 0})
            </span>
          </div>

          <span className="py-2 px-[18px] rounded-full border-[1.5px] border-[#cd6133] text-[0.75rem] font-bold text-[#cd6133] tracking-[0.04em] font-['Manrope',sans-serif] transition-all duration-300 group-hover:bg-[#cd6133] group-hover:text-[#fef9f3] group-hover:shadow-[0_4px_16px_rgba(205,97,51,0.3)]">
            Explore
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Main List Component ─────────────────────────────────────────────────────
export default function SalonList() {
  const {
    salons, loading, error, isFallback,
    searchParams, updateParams, useCurrentLocation, retry
  } = useNearbySalons();

  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [draftParams, setDraftParams] = useState({
    lat: searchParams.lat,
    lng: searchParams.lng,
    radius: searchParams.radius,
    address: searchParams.address,
    serviceName: searchParams.serviceName || "",
    categoryId: searchParams.categoryId || ""
  });

  const [showTimeoutOptions, setShowTimeoutOptions] = useState(false);
  const [categories, setCategories] = useState([]);

  // ─── Dynamic Placeholders ───
  const [salonPlaceholderIndex, setSalonPlaceholderIndex] = useState(0);
  const [servicePlaceholderIndex, setServicePlaceholderIndex] = useState(0);

  const salonPlaceholders = ["Encore Salon", "The Barber Shop", "Luxe Cuts", "Zen Spa", "Elite Grooming", "Radiance Beauty"];
  const servicePlaceholders = ["Haircut", "Manicure", "Beard Trim", "Facial", "Hair Coloring", "Massage"];

  const [headingIndex, setHeadingIndex] = useState(0);
  const headings = [
    "Discover Premium Salons",
    "Find Your Perfect Style",
    "Experience Luxury Grooming",
    "Your Beauty, Our Priority"
  ];

  const [placeholderFade, setPlaceholderFade] = useState(true);
  const [headingFade, setHeadingFade] = useState(true);

  // ─── Heading Cycle (5s) ───
  React.useEffect(() => {
    const headingInterval = setInterval(() => {
      setHeadingFade(false);
      setTimeout(() => {
        setHeadingIndex((prev) => (prev + 1) % headings.length);
        setHeadingFade(true);
      }, 500);
    }, 5000);
    return () => clearInterval(headingInterval);
  }, []);

  // ─── Placeholder Cycle (3.5s) ───
  React.useEffect(() => {
    const placeholderInterval = setInterval(() => {
      setPlaceholderFade(false);
      setTimeout(() => {
        setSalonPlaceholderIndex((prev) => (prev + 1) % salonPlaceholders.length);
        setServicePlaceholderIndex((prev) => (prev + 1) % servicePlaceholders.length);
        setPlaceholderFade(true);
      }, 500);
    }, 3500);
    return () => clearInterval(placeholderInterval);
  }, []);

  React.useEffect(() => {
    fetchActiveCategories().then(data => {
      // Depending on API response structure, it could be data.content or just data
      const catList = Array.isArray(data) ? data : (data.content || []);
      setCategories(catList);
    }).catch(console.error);
  }, []);

  React.useEffect(() => {
    let timer;
    if (loading && !salons.length) {
      timer = setTimeout(() => {
        setShowTimeoutOptions(true);
      }, 15000);
    } else {
      setShowTimeoutOptions(false);
    }
    return () => clearTimeout(timer);
  }, [loading, salons.length]);

  // Sync draft params with search params only on initial load or browser detection
  const hasInitialized = React.useRef(false);
  React.useEffect(() => {
    if (searchParams.lat && !hasInitialized.current) {
      setDraftParams({
        lat: searchParams.lat,
        lng: searchParams.lng,
        radius: searchParams.radius,
        address: searchParams.address,
        serviceName: searchParams.serviceName || "",
        categoryId: searchParams.categoryId || ""
      });
      hasInitialized.current = true;
    }
  }, [searchParams.lat, searchParams.lng, searchParams.radius, searchParams.address]);

  const handleFetch = () => {
    updateParams(draftParams);
  };

  const hasChanges =
    draftParams.lat !== searchParams.lat ||
    draftParams.lng !== searchParams.lng ||
    draftParams.radius !== searchParams.radius ||
    draftParams.address !== searchParams.address ||
    draftParams.serviceName !== searchParams.serviceName ||
    draftParams.categoryId !== searchParams.categoryId;

  if (loading && !salons.length) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-6 text-center max-w-md">
          <div className="w-16 h-16 border-4 border-[#7a2860]/20 border-t-[#7a2860] rounded-full animate-spin" />
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-[#1e0a18] font-[Cormorant_Garamond]">
              {showTimeoutOptions ? "Still searching for your location..." : "Finding best salons near you..."}
            </h2>
            <p className="text-[#3c143280] font-medium font-[DM_Sans] text-sm">
              {showTimeoutOptions
                ? "It's taking a bit longer than expected. You can wait a moment or enter your location manually below."
                : "We're locating the premium grooming spaces in your area."}
            </p>
          </div>

          {showTimeoutOptions && (
            <div className="w-full pt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="p-4 bg-white/50 rounded-2xl border border-[#3c143208] shadow-sm">
                <p className="text-[10px] uppercase tracking-widest font-bold text-[#7a2860] mb-3">Enter Manually</p>
                <LocationPicker
                  currentAddress={draftParams.address}
                  lat={draftParams.lat}
                  lng={draftParams.lng}
                  onLocationSelect={(loc) => {
                    setDraftParams(prev => ({ ...prev, ...loc }));
                    updateParams({ ...draftParams, ...loc });
                  }}
                  onDetectLocation={() => {
                    navigator.geolocation.getCurrentPosition(
                      (pos) => {
                        const newLoc = {
                          lat: pos.coords.latitude,
                          lng: pos.coords.longitude,
                          address: "Detected Location"
                        };
                        setDraftParams(prev => ({ ...prev, ...newLoc }));
                        updateParams({ ...draftParams, ...newLoc });
                      }
                    );
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const filtered = (salons || []).filter((s) => {
    const salonCategory = s.category || (s.categoryNames && s.categoryNames.length > 0 ? s.categoryNames[0] : "");
    const matchFilter =
      activeFilter === "All" ||
      salonCategory?.toLowerCase().includes(activeFilter.toLowerCase()) ||
      s.tags?.some((t) => t.toLowerCase().includes(activeFilter.toLowerCase()));

    const matchSearch =
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.location?.toLowerCase().includes(search.toLowerCase()) ||
      s.city?.toLowerCase().includes(search.toLowerCase()) ||
      salonCategory?.toLowerCase().includes(search.toLowerCase());

    return matchFilter && matchSearch;
  });

  return (
    <div className="min-h-screen font-[DM_Sans,sans-serif] pt-20 md:pt-28 pb-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* ── Header Section ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 md:gap-6 mb-4 md:mb-8 mt-2 md:mt-0">
          <div className="flex-1 w-full">
            {!showMobileSearch ? (
              <div 
                className="flex items-center justify-between px-4 py-2 bg-white/60 backdrop-blur-md rounded-2xl border border-[#3c143208] shadow-sm w-full md:w-fit font-bold leading-none text-[#1e0a18] font-[Cormorant_Garamond,Georgia,serif] text-[0.85rem] sm:text-[1rem] md:text-[2.5rem] md:bg-transparent md:border-none md:shadow-none md:px-0 md:py-0 md:mb-1.5 md:block md:cursor-default"
              >
                <span 
                  onClick={() => setShowMobileSearch(true)} 
                  className={`flex-1 cursor-pointer md:cursor-default whitespace-nowrap transition-opacity duration-500 ${headingFade ? "opacity-100" : "opacity-0"}`}
                >
                  {headings[headingIndex]}
                </span>
                <div className="flex items-center gap-3 md:hidden">
                    {!showFilters && (
                      <Search size={18} className="text-[#7a2860] cursor-pointer" onClick={() => setShowMobileSearch(true)} />
                    )}
                    <div className="w-px h-4 bg-[#3c143212]" />
                    <button onClick={() => setShowFilters(!showFilters)} className="relative">
                        <SlidersHorizontal size={18} className="text-[#7a2860] cursor-pointer" />
                        {hasChanges && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#cd6133] border-2 border-white" />
                        )}
                    </button>
                </div>
              </div>
            ) : (
                <div className="relative w-full flex items-center md:hidden">
                    {!showFilters && (
                      <>
                        <span className="absolute left-[16px] top-1/2 -translate-y-1/2 pointer-events-none text-[#3c143259]">
                            <Search size={16} />
                        </span>
                        <input
                            autoFocus
                            className={`w-full h-[46px] pr-[40px] pl-[38px] rounded-2xl border border-[#3c143230] bg-white/80 backdrop-blur-md text-[#2a1020] text-[0.85rem] outline-none transition-all duration-300 shadow-sm focus:border-[#7a2860] focus:ring-4 focus:ring-[#7a2860]/5 font-[DM_Sans] placeholder:text-[#3c143270] placeholder:transition-all placeholder:duration-500 ${placeholderFade ? "placeholder:opacity-100 placeholder:translate-x-0" : "placeholder:opacity-0 placeholder:-translate-x-4"}`}
                            type="text"
                            placeholder={salonPlaceholders[salonPlaceholderIndex]}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onBlur={() => !search && setShowMobileSearch(false)}
                        />
                        <button 
                            onClick={() => {
                                setSearch("");
                                setShowMobileSearch(false);
                            }}
                            className="absolute right-[12px] top-1/2 -translate-y-1/2 p-1 text-[#3c143259] hover:text-[#7a2860]"
                        >
                            <X size={16} />
                        </button>
                      </>
                    )}
                </div>
            )}
          </div>

          {/* Filter Toggle (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`h-11 px-6 flex items-center gap-3 rounded-2xl border transition-all duration-300 font-bold text-[0.85rem] ${showFilters ? 'bg-[#1e0a18] text-white border-[#1e0a18] shadow-md' : 'bg-white/50 border-[#3c143212] text-[#4b3621] hover:bg-white hover:border-[#7a2860]/30 shadow-sm'}`}
            >
              <SlidersHorizontal size={16} className={showFilters ? 'text-[#C8A951]' : 'text-[#7a2860]'} />
              <span>{showFilters ? 'Hide Filters' : 'Filters'}</span>
              {hasChanges && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#cd6133] animate-pulse" />
              )}
              <ChevronDown size={14} className={`transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* ── Desktop Dual Search Bar ── */}
        <div className={`hidden md:block overflow-hidden transition-all duration-300 ${!showFilters ? 'max-h-[100px] mb-8 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
          <div className="flex items-center gap-4 p-2.5 bg-white/70 backdrop-blur-md rounded-[1.5rem] border border-[#3c143212] shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
            {/* Salon Name Search */}
            <div className="relative flex-1 group">
              <span className="absolute left-[18px] top-1/2 -translate-y-1/2 pointer-events-none text-[#3c143260] transition-colors group-focus-within:text-[#7a2860]">
                <Search size={18} />
              </span>
              <input
                className={`w-full h-12 pr-[16px] pl-[48px] rounded-xl border border-[#3c143212] bg-white/95 text-[#2a1020] text-[0.9rem] outline-none transition-all duration-200 focus:bg-white focus:border-[#7a2860]/40 focus:ring-4 focus:ring-[#7a2860]/5 font-[DM_Sans] placeholder:text-[#3c143260] placeholder:transition-all placeholder:duration-500 ${placeholderFade ? "placeholder:opacity-100 placeholder:translate-x-0" : "placeholder:opacity-0 placeholder:-translate-x-4"}`}
                type="text"
                placeholder={salonPlaceholders[salonPlaceholderIndex]}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="w-px h-8 bg-[#3c143212]" />

            {/* Service Name Search */}
            <div className="relative flex-1 group">
              <span className="absolute left-[18px] top-1/2 -translate-y-1/2 pointer-events-none text-[#3c143260] transition-colors group-focus-within:text-[#7a2860]">
                <Search size={18} />
              </span>
              <input
                className={`w-full h-12 pr-[16px] pl-[48px] rounded-xl border border-[#3c143212] bg-white/95 text-[#2a1020] text-[0.9rem] outline-none transition-all duration-200 focus:bg-white focus:border-[#7a2860]/40 focus:ring-4 focus:ring-[#7a2860]/5 font-[DM_Sans] placeholder:text-[#3c143260] placeholder:transition-all placeholder:duration-500 ${placeholderFade ? "placeholder:opacity-100 placeholder:translate-x-0" : "placeholder:opacity-0 placeholder:-translate-x-4"}`}
                type="text"
                placeholder={servicePlaceholders[servicePlaceholderIndex]}
                value={draftParams.serviceName}
                onChange={(e) => setDraftParams(prev => ({ ...prev, serviceName: e.target.value }))}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !loading) {
                    handleFetch();
                  }
                }}
              />
            </div>

            {/* Search Action Button */}
            <button
              onClick={handleFetch}
              disabled={loading}
              className={`h-12 px-6 flex items-center justify-center gap-2 rounded-xl bg-[#1e0a18] text-white font-bold text-[0.85rem] tracking-wide transition-all duration-300 hover:bg-[#7a2860] hover:shadow-lg hover:shadow-[#1e0a18]/10 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Search size={18} />
                  <span>Search</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ── Advanced Filter Control (Collapsible) ── */}
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showFilters ? 'max-h-[800px] mb-6 md:mb-10 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
          <div className="p-4 md:p-6 rounded-[1.2rem] md:rounded-[1.5rem] border border-[#3c143208] bg-white/40 backdrop-blur-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 items-end mb-4 md:mb-6">
              {/* Location Picker */}
              <div className="lg:col-span-8 space-y-1.5">
                <div className="flex items-center justify-between px-1">
                  <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#3c143240]">Near Your Location</label>
                </div>
                <LocationPicker
                  currentAddress={draftParams.address}
                  lat={draftParams.lat}
                  lng={draftParams.lng}
                  onLocationSelect={(loc) => setDraftParams(prev => ({ ...prev, ...loc }))}
                  onDetectLocation={() => {
                    // Custom implementation of detect location to update draft state
                    navigator.geolocation.getCurrentPosition(
                      (pos) => setDraftParams(prev => ({
                        ...prev,
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude,
                        address: "Detected Location"
                      }))
                    );
                  }}
                />
              </div>

              {/* Radius Select */}
              <div className="lg:col-span-4 space-y-1.5">
                <div className="flex items-center justify-between px-1">
                  <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#3c143240]">Search Radius</label>
                  <span className="text-[9px] font-black text-[#7a2860] bg-[#7a2860]/5 px-2 py-0.5 rounded-full">{draftParams.radius}km</span>
                </div>
                <div className="flex items-center h-11 px-5 rounded-xl border border-[#3c143212] bg-[#fdfaf8]/50 group">
                  <input
                    type="range" min="1" max="100"
                    value={draftParams.radius}
                    onChange={(e) => setDraftParams(prev => ({ ...prev, radius: parseInt(e.target.value) }))}
                    className="w-full h-1 bg-[#7a2860]/10 rounded-lg appearance-none cursor-pointer accent-[#7a2860]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 items-end">
              {/* Category Select */}
              <div className="lg:col-span-5 space-y-1.5 flex flex-col">
                <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#3c143240] ml-1">Category</label>
                <div className="relative">
                  <select
                    className="w-full h-11 px-4 pr-10 rounded-xl border border-[#3c143212] bg-[#fdfaf8]/50 text-[#2a1020] text-[0.85rem] outline-none focus:border-[#7a2860] focus:ring-2 focus:ring-[#7a2860]/5 font-[DM_Sans] appearance-none"
                    value={draftParams.categoryId}
                    onChange={(e) => setDraftParams(prev => ({ ...prev, categoryId: e.target.value }))}
                  >
                    <option value="">Choose Category</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#3c143240]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </span>
                </div>
              </div>

              {/* Service Name Box */}
              <div className="lg:col-span-5 space-y-1.5 flex flex-col">
                <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#3c143240] ml-1">Service Name</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3c143240]">
                    <Search size={14} />
                  </span>
                  <input
                    className="w-full h-11 pl-9 pr-4 rounded-xl border border-[#3c143212] bg-[#fdfaf8]/50 text-[#2a1020] text-[0.85rem] outline-none focus:border-[#7a2860] focus:ring-2 focus:ring-[#7a2860]/5 font-[DM_Sans]"
                    type="text"
                    placeholder="e.g. Haircut, Facial..."
                    value={draftParams.serviceName}
                    onChange={(e) => {
                        setDraftParams(prev => ({ ...prev, serviceName: e.target.value }));
                    }}
                    onKeyDown={(e) => {
                       if (e.key === "Enter" && hasChanges && !loading) {
                         handleFetch();
                       }
                    }}
                  />
                </div>
              </div>

              {/* Fetch Button */}
              <div className="lg:col-span-2">
                <button
                  onClick={handleFetch}
                  disabled={loading || !hasChanges}
                  className={`w-full h-11 rounded-xl font-bold text-[0.7rem] uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${loading || !hasChanges ? "bg-[#3c143208] text-[#3c143230] cursor-not-allowed border border-[#3c143205]" : "bg-[#1e0a18] text-white hover:bg-[#7a2860] shadow-lg shadow-[#1e0a18]/10 hover:shadow-[#7a2860]/20 active:scale-95"}`}
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Search size={14} />
                  )}
                  {loading ? "Fetching" : "Apply"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {error ? (
          <div className="text-center py-24 bg-white/50 rounded-[40px] border border-dashed border-red-200">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width={32} height={32} fill="none" stroke="#ef4444" strokeWidth={1.5} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#1e0a18] mb-2 font-[Cormorant_Garamond]">Something went wrong</h3>
            <p className="text-[#3c143260] font-[DM_Sans] max-w-[400px] mx-auto">{error}</p>
            <button
              onClick={retry}
              className="mt-6 px-8 py-3 bg-[#1e0a18] text-white rounded-xl font-bold hover:bg-[#7a2860] transition-colors font-[DM_Sans]"
            >
              Try Again
            </button>
          </div>
        ) : salons.length === 0 ? (
          <div className="text-center py-24 bg-white/50 rounded-[40px] border border-dashed border-[#3c143220]">
            <div className="w-20 h-20 bg-[#3c1432]/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width={32} height={32} fill="none" stroke="#7a2860" strokeWidth={1.5} viewBox="0 0 24 24">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-bold text-[#1e0a18] mb-2 font-[Cormorant_Garamond]">Location Access Required</h3>
              <p className="text-[#3c143260] font-[DM_Sans] max-w-[400px] mx-auto mb-6">Please allow location access or search for a location manually to discover premium salons.</p>
            </div>
            {error && error.includes("denied") && (
              <button
                onClick={() => window.location.reload()}
                className="px-8 py-3 bg-[#1e0a18] text-white rounded-xl font-bold hover:bg-[#7a2860] transition-colors font-[DM_Sans]"
              >
                Retry Location Access
              </button>
            )}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 bg-white/50 rounded-[40px] border border-dashed border-[#3c143220]">
            <div className="w-20 h-20 bg-[#3c1432]/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width={32} height={32} fill="none" stroke="#3c1432" strokeWidth={1.5} viewBox="0 0 24 24" className="opacity-40">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#1e0a18] mb-2 font-[Cormorant_Garamond]">No matches found</h3>
            <p className="text-[#3c143260] font-[DM_Sans]">Try adjusting your search or filters within the current results.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((salon) => (
              <SalonCard key={salon.id} salon={salon} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}