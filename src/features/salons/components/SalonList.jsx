"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Navigation, Star, Search } from "lucide-react";
// Local badge styles since the data file was removed
const badgeStyles = {
  "Top Rated": {
    bg: "bg-[#7a2860]/10",
    text: "text-[#7a2860]",
    border: "border-[#7a2860]/20"
  },
  "New": {
    bg: "bg-[#287a60]/10",
    text: "text-[#287a60]",
    border: "border-[#287a60]/20"
  },
  "Trending": {
    bg: "bg-[#7a6028]/10",
    text: "text-[#7a6028]",
    border: "border-[#7a6028]/20"
  }
};
import { useNearbySalons } from "@/features/salons/hooks/useNearbySalons";
import LocationPicker from "./LocationPicker";

// ─── Star Icon ────────────────────────────────────────────────────────────────
const StarIcon = ({ filled }) => (
  <Star size={13} fill={filled ? "#c4956a" : "transparent"} color={filled ? "#c4956a" : "#e0d0c8"} />
);

// ─── Salon Card ───────────────────────────────────────────────────────────────
function SalonCard({ salon }) {
  const bc = salon.badge ? badgeStyles[salon.badge] : null;

  // Determine image source with fallback
  const imageSrc = salon.imageUrls && salon.imageUrls.length > 0 ? salon.imageUrls[0] : salon.bannerImageUrl || "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=60";

  // Build location string from available fields
  const locationString = [salon.city, salon.state, salon.country].filter(Boolean).join(", ");

  // Open status badge
  const openBadge = salon.isOpen ? "Open" : "Closed";

  // Verification badge
  const verified = salon.verificationStatus === "VERIFIED";

  return (
    <Link
      href={`/salons/${salon.id}`}
      className="group block bg-white rounded-[20px] overflow-hidden border border-[#3c143212] cursor-pointer shadow-[0_2px_16px_rgba(60,20,50,0.06)] no-underline h-full"
    >
      {/* ── Image ── */}
      <div className="relative h-[210px] overflow-hidden">
        <img
          src={imageSrc}
          alt={salon.name}
          className="w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.06]"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(30,10,25,0.45)]" />

        {/* Badge (if any) */}
        {salon.badge && bc && (
          <span className={`absolute top-3.5 left-3.5 px-[11px] py-1 rounded-full text-[0.68rem] font-semibold tracking-[0.06em] backdrop-blur-[8px] border font-[DM_Sans] ${bc.bg} ${bc.text} ${bc.border}`}
            >
            {salon.badge}
          </span>
        )}

        {/* Open/Closed Badge */}
        <span className={`absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full text-[0.72rem] font-semibold tracking-[0.04em] backdrop-blur-[8px] ${openBadge === "Open" ? "bg-[#d4f8e8] text-[#1a7f3b]" : "bg-[#f8d4d4] text-[#7f1a1a]"} font-[DM_Sans]`}
          >
          {openBadge}
        </span>

        {/* Verification Icon */}
        {verified && (
          <span className="absolute top-3.5 left-24">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#1a7f3b]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </span>
        )}
      </div>

      {/* ── Body ── */}
      <div className="p-[22px_22px_20px] flex flex-col h-[calc(100%-210px)]">
        <h3 className="text-[1.1rem] font-bold leading-[1.3] mb-1.5 text-[#1e0a18] font-[Cormorant_Garamond,Georgia,serif]"
          >
          {salon.name}
        </h3>

        {/* Description */}
        {salon.description && (
          <p className="text-[0.85rem] text-[#3c143280] mb-2 font-[DM_Sans] line-clamp-2">
            {salon.description}
          </p>
        )}

        <div className="flex items-center gap-1 text-[0.72rem] mb-2.5 text-[#3c143280] font-[DM_Sans]">
          <MapPin size={11} className="text-[#7a2860]/60" />
          {locationString || salon.location || salon.address}
        </div>

        {/* Divider */}
        <div className="h-px mb-2.5 bg-[#3c143212]" />

        <p className="text-[0.72rem] font-medium mb-3 text-[#3c14328c] font-[DM_Sans]">
          {salon.category}
        </p>

        {/* Tags */}
        {salon.tags && (
          <div className="flex gap-1.5 flex-wrap mb-3.5">
            {salon.tags.map((tag) => (
              <span
                key={tag}
                className="text-[0.62rem] font-semibold px-2 py-[2px] rounded-full border bg-[#9b58760a] text-[#7a2860] border-[#9b58781a] font-[DM_Sans] tracking-wider uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-[5px]">
            <div className="flex gap-0.5">
              {/* Use averageRating and totalReviews if available */}
              {[1, 2, 3, 4, 5].map((i) => (
                <StarIcon
                  key={i}
                  filled={i <= Math.round(salon.averageRating ?? salon.rating ?? 0)}
                />
              ))}
            </div>
            <span className="text-[0.82rem] font-semibold text-[#1e0a18] font-[DM_Sans]">
              {salon.averageRating?.toFixed(1) ?? salon.rating?.toFixed(1) ?? "0.0"}
            </span>
            <span className="text-[0.72rem] text-[#3c143266] font-[DM_Sans]">
              ({salon.totalReviews ?? salon.reviews ?? 0})
            </span>
          </div>

          <span className="py-2 px-[18px] rounded-full border-[1.5px] border-[#3c14322e] text-[0.75rem] font-semibold text-[#3c1432] tracking-[0.04em] font-[DM_Sans] transition-all duration-[220ms] group-hover:bg-gradient-to-br group-hover:from-[#3c1432] group-hover:to-[#7a2860] group-hover:border-transparent group-hover:text-[#fdf6f0] group-hover:shadow-[0_4px_16px_rgba(60,20,50,0.22)]">
            Book Now
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

  if (loading && !salons.length) {
    return (
      <div className="min-h-screen bg-[#f9f5f2] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#7a2860]/20 border-t-[#7a2860] rounded-full animate-spin" />
          <p className="text-[#3c143280] font-medium font-[DM_Sans]">Finding best salons near you...</p>
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
    <div className="min-h-screen bg-[#f9f5f2] font-[DM_Sans,sans-serif] pt-24 pb-20">
      {/* ── Header Section ── */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-4">
          <div className="flex-1">
            <h1 className="font-bold leading-[1.15] mb-2 text-[#1e0a18] font-[Cormorant_Garamond,Georgia,serif] text-[clamp(2.2rem,4.5vw,2.8rem)]">
              Discover Premium
              <span className="italic text-[#7a2860] block md:inline md:ml-3">
                Salons
              </span>
            </h1>
            <p className="text-[0.92rem] leading-[1.6] max-w-[450px] text-[#3c143280] font-[DM_Sans]">
              {isFallback || filtered.length === 0 && salons.length > 0
                ? "We couldn't find exactly what you were looking for here, but explore our curated collection."
                : "Handpicked spaces where craft meets care — professional styling just around the corner."}
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-[360px]">
            <span className="absolute left-[18px] top-1/2 -translate-y-1/2 pointer-events-none text-[#3c143259]">
              <Search size={18} />
            </span>
            <input
              className="w-full py-[12px] pr-[20px] pl-[45px] rounded-xl border-[1.5px] border-[#3c14321f] bg-white text-[#2a1020] text-[0.85rem] outline-none transition-all duration-[220ms] shadow-sm focus:border-[#7a2860] focus:ring-4 focus:ring-[#7a2860]/5 font-[DM_Sans]"
              type="text"
              placeholder="Search by name or service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* ── Advanced Filter Control ── */}
        <div className="mb-10">
          <div className="bg-white p-5 rounded-[2rem] border border-[#3c143212] shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Location Picker */}
              <div className="lg:col-span-5 space-y-1.5">
                <label className="text-[0.62rem] font-black uppercase tracking-widest text-[#3c143250] ml-1">Your Location</label>
                <LocationPicker
                  currentAddress={searchParams.address}
                  lat={searchParams.lat}
                  lng={searchParams.lng}
                  onLocationSelect={(loc) => updateParams(loc)}
                  onDetectLocation={useCurrentLocation}
                />
              </div>

              {/* Radius Select */}
              <div className="lg:col-span-3 space-y-1.5">
                <label className="text-[0.62rem] font-black uppercase tracking-widest text-[#3c143250] ml-1">Search Radius ({searchParams.radius}km)</label>
                <div className="flex items-center h-[50px] px-5 rounded-xl border border-[#3c143212] bg-[#fdfaf8] relative group">
                  <input
                    type="range" min="1" max="100"
                    value={searchParams.radius}
                    onChange={(e) => updateParams({ radius: parseInt(e.target.value) })}
                    className="w-full h-1 bg-[#3c143212] rounded-lg appearance-none cursor-pointer accent-[#7a2860]"
                  />
                </div>
              </div>

              {/* Category Filters */}
              {/* <div className="lg:col-span-4 space-y-1.5">
                <label className="text-[0.62rem] font-black uppercase tracking-widest text-[#3c143250] ml-1">Service Category</label>
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  {filters.map((f) => (
                    <button
                      key={f}
                      onClick={() => setActiveFilter(f)}
                      className={`py-2 px-4 h-[50px] rounded-xl border-[1.5px] text-[0.72rem] font-bold cursor-pointer transition-all duration-200 whitespace-nowrap font-[DM_Sans] ${activeFilter === f
                        ? "bg-[#1e0a18] border-[#1e0a18] text-[#fdf6f0] shadow-md shadow-[#1e0a18]/20"
                        : "bg-white border-[#3c14320a] text-[#3c143280] hover:border-[#7a2860]/40 hover:text-[#7a2860]"
                        }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
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
            <h3 className="text-xl font-bold text-[#1e0a18] mb-2 font-[Cormorant_Garamond]">No salons found area</h3>
            <p className="text-[#3c143260] font-[DM_Sans] max-w-[400px] mx-auto">There are no premium salons registered within {searchParams.radius}km of this location yet.</p>
            <button
              onClick={() => updateParams({ radius: 50 })}
              className="mt-6 text-[#7a2860] font-bold hover:underline font-[DM_Sans]"
            >
              Try expanding search radius
            </button>
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
