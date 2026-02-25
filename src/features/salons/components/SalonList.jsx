"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Navigation, Star, Search } from "lucide-react";
import { filters, badgeStyles } from "@/features/salons/data/salons";
import { useNearbySalons } from "@/features/salons/hooks/useNearbySalons";
import LocationPicker from "./LocationPicker";

// ─── Star Icon ────────────────────────────────────────────────────────────────
const StarIcon = ({ filled }) => (
  <Star size={13} fill={filled ? "#c4956a" : "transparent"} color={filled ? "#c4956a" : "#e0d0c8"} />
);

// ─── Salon Card ───────────────────────────────────────────────────────────────
function SalonCard({ salon }) {
  const bc = salon.badge ? badgeStyles[salon.badge] : null;

  return (
    <Link
      href={`/salons/${salon.slug}`}
      className="group block bg-white rounded-[20px] overflow-hidden border border-[#3c143212] cursor-pointer shadow-[0_2px_16px_rgba(60,20,50,0.06)] no-underline h-full"
    >
      {/* ── Image ── */}
      <div className="relative h-[210px] overflow-hidden">
        <img
          src={salon.image || "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=60"}
          alt={salon.name}
          className="w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.06]"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(30,10,25,0.45)]" />

        {/* Badge */}
        {salon.badge && bc && (
          <span className={`absolute top-3.5 left-3.5 px-[11px] py-1 rounded-full text-[0.68rem] font-semibold tracking-[0.06em] backdrop-blur-[8px] border font-[DM_Sans] ${bc.bg} ${bc.text} ${bc.border}`}>
            {salon.badge}
          </span>
        )}

        {/* Price */}
        <span className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full text-[0.72rem] font-semibold tracking-[0.04em] backdrop-blur-[8px] bg-[rgba(253,246,240,0.92)] text-[#7a4020] font-[DM_Sans]">
          {salon.price || "₹₹"}
        </span>
      </div>

      {/* ── Body ── */}
      <div className="p-[22px_22px_20px] flex flex-col h-[calc(100%-210px)]">
        <h3 className="text-[1.25rem] font-bold leading-[1.2] mb-1 text-[#1e0a18] font-[Cormorant_Garamond,Georgia,serif]">
          {salon.name}
        </h3>

        <div className="flex items-center gap-1 text-[0.78rem] mb-3 text-[#3c143280] font-[DM_Sans]">
          <MapPin size={12} className="text-[#7a2860]/60" />
          {salon.location || salon.address}
        </div>

        {/* Divider */}
        <div className="h-px mb-3.5 bg-[#3c143212]" />

        <p className="text-[0.78rem] font-normal mb-3.5 text-[#3c14328c] font-[DM_Sans]">
          {salon.category}
        </p>

        {/* Tags */}
        {salon.tags && (
          <div className="flex gap-1.5 flex-wrap mb-4">
            {salon.tags.map((tag) => (
              <span
                key={tag}
                className="text-[0.68rem] font-medium px-2.5 py-[3px] rounded-full border bg-[#9b587614] text-[#7a2860] border-[#9b587826] font-[DM_Sans]"
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
              {[1, 2, 3, 4, 5].map((i) => (
                <StarIcon key={i} filled={i <= Math.round(salon.rating || 4.5)} />
              ))}
            </div>
            <span className="text-[0.82rem] font-semibold text-[#1e0a18] font-[DM_Sans]">
              {salon.rating || 4.5}
            </span>
            <span className="text-[0.72rem] text-[#3c143266] font-[DM_Sans]">
              ({salon.reviews || 0})
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
    const matchFilter =
      activeFilter === "All" ||
      s.category?.toLowerCase().includes(activeFilter.toLowerCase()) ||
      s.tags?.some((t) => t.toLowerCase().includes(activeFilter.toLowerCase()));
    const matchSearch =
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.location?.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#f9f5f2] font-[DM_Sans,sans-serif] pt-24 pb-20">
      {/* ── Header Section ── */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-4">
          <div className="flex-1">
            <h1 className="font-bold leading-[1.1] mb-2 text-[#1e0a18] font-[Cormorant_Garamond,Georgia,serif] text-[clamp(2.5rem,5vw,3.5rem)]">
              Discover Premium
              <span className="italic text-[#7a2860] block md:inline md:ml-3">
                Salons
              </span>
            </h1>
            <p className="text-[1rem] leading-[1.6] max-w-[500px] text-[#3c143280] font-[DM_Sans]">
              {isFallback || filtered.length === 0 && salons.length > 0
                ? "We couldn't find exactly what you were looking for here, but explore our curated collection."
                : "Handpicked spaces where craft meets care — professional styling just around the corner."}
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-[400px]">
            <span className="absolute left-[18px] top-1/2 -translate-y-1/2 pointer-events-none text-[#3c143259]">
              <Search size={20} />
            </span>
            <input
              className="w-full py-[15px] pr-[20px] pl-[50px] rounded-2xl border-[1.5px] border-[#3c14321f] bg-white text-[#2a1020] text-[0.95rem] outline-none transition-all duration-[220ms] shadow-sm focus:border-[#7a2860] focus:ring-4 focus:ring-[#7a2860]/5 font-[DM_Sans]"
              type="text"
              placeholder="Search by salon name or service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* ── Advanced Filter Control ── */}
        <div className="mb-12">
           <div className="bg-white p-6 rounded-[2.5rem] border border-[#3c143212] shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-end">
                {/* Location Picker */}
                <div className="lg:col-span-5 space-y-2">
                  <label className="text-[0.65rem] font-black uppercase tracking-widest text-[#3c143250] ml-1">Your Location</label>
                  <LocationPicker 
                    currentAddress={searchParams.address}
                    lat={searchParams.lat}
                    lng={searchParams.lng}
                    onLocationSelect={(loc) => updateParams(loc)}
                    onDetectLocation={useCurrentLocation}
                  />
                </div>

                {/* Radius Select */}
                <div className="lg:col-span-3 space-y-2">
                  <label className="text-[0.65rem] font-black uppercase tracking-widest text-[#3c143250] ml-1">Search Radius ({searchParams.radius}km)</label>
                  <div className="flex items-center h-[55px] px-6 rounded-2xl border border-[#3c143212] bg-[#f9f5f2] relative group">
                    <input 
                      type="range" min="1" max="100" 
                      value={searchParams.radius}
                      onChange={(e) => updateParams({ radius: parseInt(e.target.value) })}
                      className="w-full h-1 bg-[#3c143212] rounded-lg appearance-none cursor-pointer accent-[#7a2860]"
                    />
                  </div>
                </div>

                {/* Category Filters */}
                <div className="lg:col-span-4 space-y-2">
                   <label className="text-[0.65rem] font-black uppercase tracking-widest text-[#3c143250] ml-1">Service Category</label>
                   <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {filters.map((f) => (
                      <button
                        key={f}
                        onClick={() => setActiveFilter(f)}
                        className={`py-2 px-5 h-[55px] rounded-2xl border-[1.5px] text-[0.8rem] font-bold cursor-pointer transition-all duration-200 whitespace-nowrap font-[DM_Sans] ${activeFilter === f
                            ? "bg-[#1e0a18] border-[#1e0a18] text-[#fdf6f0] shadow-lg shadow-[#1e0a18]/20"
                            : "bg-white border-[#3c14320a] text-[#3c143280] hover:border-[#7a2860]/40 hover:text-[#7a2860]"
                          }`}
                      >
                        {f}
                      </button>
                    ))}
                   </div>
                </div>
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
