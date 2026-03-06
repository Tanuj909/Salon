"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { fetchCategories, fetchNearbyByCategory } from "@/features/salons/services/salonService";
import { useUserLocation } from "@/features/salons/hooks/useUserLocation";


// ─── Category fallback images (keyed by name) ──────────────────────────────
const CATEGORY_IMAGES = {
  MEN: "https://images.unsplash.com/photo-1647140655214-e4a2d914971f?w=600&auto=format&fit=crop&q=70",
  WOMEN: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&auto=format&fit=crop&q=70",
  PETS: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&auto=format&fit=crop&q=70",
  PEATS: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&auto=format&fit=crop&q=70",
  KIDS: "https://media.istockphoto.com/id/680907176/photo/little-boy-getting-haircut-by-barber-while-sitting-in-chair-at-barbershop.webp?a=1&b=1&s=612x612&w=0&k=20&c=TnERWxLL7zG9s8He2TEDZD7yhHy42LiJpj3xE33Q7ls=",
  DEFAULT: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&auto=format&fit=crop&q=70",
};

function getCategoryImage(category) {
  // Use iconUrl from API if it looks like a real URL (not example.com placeholder)
  if (category.iconUrl && !category.iconUrl.includes("example.com")) {
    return category.iconUrl;
  }
  const key = (category.name || "").toUpperCase();
  return CATEGORY_IMAGES[key] || CATEGORY_IMAGES.DEFAULT;
}

// ─── Star icon ───────────────────────────────────────────────────────────────
const StarIcon = ({ filled }) => (
  <svg width={13} height={13} viewBox="0 0 20 20" fill={filled ? "#c4956a" : "#e0d0c8"}>
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

// ─── Salon card ──────────────────────────────────────────────────────────────
function SalonCard({ salon }) {
  const img =
    salon.imageUrls?.[0] ||
    salon.bannerImageUrl ||
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=60";
  const rating = salon.averageRating;
  const badge = salon.verificationStatus === "VERIFIED" ? "Top Rated" : null;

  return (
    <Link
      href={`/salons/${salon.id}`}
      className="group block bg-white rounded-[20px] overflow-hidden border border-[#3c143212] cursor-pointer shadow-[0_2px_16px_rgba(60,20,50,0.06)] no-underline w-[280px] flex-shrink-0"
    >
      {/* Image */}
      <div className="relative h-[200px] overflow-hidden">
        <img
          src={img}
          alt={salon.name}
          className="w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.06]"
          loading="lazy"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(30,10,25,0.45)]" />

        {/* Badge */}
        {badge && (
          <span className="absolute top-3.5 left-3.5 px-[11px] py-1 rounded-full text-[0.68rem] font-semibold tracking-[0.06em] backdrop-blur-[8px] border bg-[#7a2860]/60 text-[#ffffff] border-[#7a2860]/20 font-[DM_Sans]">
            {badge}
          </span>
        )}

        {/* Open Status */}
        <span
          className={`absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full text-[0.72rem] font-semibold tracking-[0.04em] backdrop-blur-[8px] font-[DM_Sans] ${salon.isOpen
            ? "bg-[#fdf6f0e0] text-[#7a4020]"
            : "bg-red-50/90 text-primary"
            }`}
        >
          {salon.isOpen ? "Open" : "Closed"}
        </span>
      </div>

      {/* Body */}
      <div className="p-[20px_20px_18px] flex flex-col justify-between h-[calc(100%-200px)]">
        <div>
          <h4 className="text-[1.18rem] font-bold leading-[1.2] mb-1 text-[#1e0a18] font-[Cormorant_Garamond,Georgia,serif] line-clamp-1">
            {salon.name}
          </h4>

          <div className="flex items-center gap-1 text-[0.76rem] mb-3 text-[#3c143280] font-[DM_Sans]">
            <svg width={11} height={11} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {[salon.city, salon.country].filter(Boolean).join(", ") || "—"}
          </div>

          {/* Divider */}
          <div className="h-px mb-3 bg-[#3c143212]" />

          <p className="text-[0.76rem] font-normal mb-3 text-[#3c14328c] font-[DM_Sans] line-clamp-2 italic">
            {salon.description || "Luxury salon offering premium beauty services."}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex items-center gap-[5px]">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <StarIcon key={i} filled={i <= Math.round(rating)} />
              ))}
            </div>
            <span className="text-[0.8rem] font-semibold text-[#1e0a18] font-[DM_Sans]">
              {rating.toFixed(1)}
            </span>
          </div>
          <span className="py-[7px] px-[16px] rounded-full border-[1.5px] border-[#3c14322e] text-[0.73rem] font-semibold text-[#3c1432] tracking-[0.04em] font-[DM_Sans] transition-all duration-[220ms] group-hover:bg-gradient-to-br group-hover:from-[#3c1432] group-hover:to-[#7a2860] group-hover:border-transparent group-hover:text-[#fdf6f0] group-hover:shadow-[0_4px_16px_rgba(60,20,50,0.22)]">
            View
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Skeleton card ───────────────────────────────────────────────────────────
function SalonCardSkeleton() {
  return (
    <div className="flex-shrink-0 w-[280px] rounded-[20px] overflow-hidden border border-[#3c143210] bg-white shadow-sm animate-pulse">
      <div className="h-[200px] bg-[#f0e8ee]" />
      <div className="p-[20px_20px_18px] space-y-2">
        <div className="h-4 bg-[#f0e8ee] rounded w-3/4" />
        <div className="h-3 bg-[#f0e8ee] rounded w-1/2" />
        <div className="h-3 bg-[#f0e8ee] rounded w-1/3" />
      </div>
    </div>
  );
}

// ─── Single category row ─────────────────────────────────────────────────────
function CategoryRow({ category, lat, lng }) {
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchNearbyByCategory(category.id, lat, lng, 50, 4)
      .then((data) => { if (!cancelled) setSalons(data || []); })
      .catch(() => { if (!cancelled) setSalons([]); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [category.id, lat, lng]);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  return (
    <div className="mb-16 last:mb-0">
      {/* Row header */}
      <div className="flex items-end justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-4">
          {/* Eyebrow with circle */}
          <div className="flex items-center gap-2">
            <span className="w-6 h-px inline-block bg-[#c4956a]" />
            <span className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c4956a] font-[DM_Sans]">
              {category.name.charAt(0) + category.name.slice(1).toLowerCase()}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Circle category badge */}
            <div className="relative w-[50px] h-[50px] rounded-full overflow-hidden border-[3px] border-[#FAF7F2] shadow-md flex-shrink-0">
              <img
                src={getCategoryImage(category)}
                alt={category.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-black/10 to-black/50" />
            </div>
            <div>
              <h3 className="font-bold leading-[1.1] text-[#1e0a18] font-[Cormorant_Garamond,Georgia,serif] text-[clamp(1.1rem,2vw,1.6rem)] capitalize">
                {category.name} Salons
              </h3>
              <p className="text-[0.85rem] leading-[1.65] mt-1 max-w-[380px] text-[#3c143280] font-[DM_Sans] line-clamp-1">
                {category.description || `${category.businessCount || 0} salons available in your area`}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Arrow scroll btns */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll(-1)}
              className="w-8 h-8 rounded-full border border-[#3c14322e] flex items-center justify-center text-[#3c1432] hover:bg-[#3c1432] hover:text-white transition-colors duration-200"
              aria-label="Scroll left"
            >
              <svg width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={() => scroll(1)}
              className="w-8 h-8 rounded-full border border-[#3c14322e] flex items-center justify-center text-[#3c1432] hover:bg-[#3c1432] hover:text-white transition-colors duration-200"
              aria-label="Scroll right"
            >
              <svg width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
          <Link
            href={`/salons?categoryId=${category.id}`}
            className="flex items-center gap-2 py-[11px] px-6 rounded-full border-[1.5px] border-[#3c14322e] bg-white text-[0.8rem] font-semibold tracking-[0.04em] cursor-pointer transition-all duration-[220ms] text-[#3c1432] no-underline font-[DM_Sans] hover:bg-gradient-to-br hover:from-[#3c1432] hover:to-[#7a2860] hover:border-transparent hover:text-[#fdf6f0] hover:shadow-[0_6px_24px_rgba(60,20,50,0.22)]"
          >
            See All
            <svg width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px mb-10 bg-[#3c143214]" />

      {/* Horizontal scroll row */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-3 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {loading
          ? [1, 2, 3, 4].map((i) => <SalonCardSkeleton key={i} />)
          : salons.length > 0
            ? salons.map((salon) => <SalonCard key={salon.id} salon={salon} />)
            : (
              <div className="flex-1 py-10 text-center text-[#3c143260] text-sm font-[DM_Sans] bg-white/60 rounded-2xl">
                No salons found nearby for this category.
              </div>
            )}
      </div>

      {/* Divider */}
      <div className="h-px mt-10 bg-gradient-to-r from-transparent via-[#3c143218] to-transparent" />
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const { location, error, loading: locationLoading } = useUserLocation();

  const handleRetryLocation = () => {
    window.location.reload(); // Simple way to re-trigger for now since hook uses useEffect once
  };

  // ── Fetch categories ────────────────────────────────────────────────────────
  useEffect(() => {
    fetchCategories()
      .then((cats) => setCategories((cats || []).filter((c) => c.isActive)))
      .catch(() => setCategories([]))
      .finally(() => setLoadingCats(false));
  }, []);

  return (
    <section className="w-full bg-plum/5 py-10 relative font-['Georgia',serif]">
      <div className="max-w-[1280px] mx-auto px-12">

        {/* ── Section header ── */}
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-px inline-block bg-[#c4956a]" />
              <span className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c4956a] font-[DM_Sans]">
                Tailored For You
              </span>
            </div>
            <h2 className="font-bold leading-[1.1] text-[#1e0a18] font-[Cormorant_Garamond,Georgia,serif] text-[clamp(1.75rem,3vw,2.6rem)]">
              Browse By
              <span className="italic text-[#7a2860] ml-2">Category</span>
            </h2>
            <p className="text-[0.85rem] leading-[1.65] mt-2 max-w-[380px] text-[#3c143280] font-[DM_Sans]">
              Discover the best salons near you, organised by what you need.
            </p>
          </div>

          <Link
            href="/salons"
            className="flex items-center gap-2 py-[11px] px-6 rounded-full border-[1.5px] border-[#3c14322e] bg-white text-[0.8rem] font-semibold tracking-[0.04em] cursor-pointer transition-all duration-[220ms] text-[#3c1432] no-underline font-[DM_Sans] hover:bg-gradient-to-br hover:from-[#3c1432] hover:to-[#7a2860] hover:border-transparent hover:text-[#fdf6f0] hover:shadow-[0_6px_24px_rgba(60,20,50,0.22)]"
          >
            View All Categories
            <svg width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        {/* Divider */}
        <div className="h-px mb-10 bg-[#3c143214]" />

        {/* ── Category rows ── */}
        {loadingCats || locationLoading ? (
          // skeleton for category rows
          <div className="space-y-14">
            {[1, 2].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-[50px] h-[50px] rounded-full bg-[#f0e8ee]" />
                  <div className="space-y-2">
                    <div className="h-5 bg-[#f0e8ee] rounded w-36" />
                    <div className="h-3 bg-[#f0e8ee] rounded w-52" />
                  </div>
                </div>
                <div className="flex gap-4">
                  {[1, 2, 3, 4].map((j) => <SalonCardSkeleton key={j} />)}
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          // Location denied or error state
          <div className="text-center py-16 bg-white/50 rounded-2xl border border-dashed border-[#7a2860]/20">
            <div className="w-16 h-16 bg-[#7a2860]/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width={24} height={24} fill="none" stroke="#7a2860" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#1e0a18] mb-2 font-[Cormorant_Garamond]">Location Access Required</h3>
            <p className="text-[#3c143280] font-[DM_Sans] text-sm max-w-[350px] mx-auto mb-6">
              To see salons in your area, please allow location access.
            </p>
            <button
              onClick={handleRetryLocation}
              className="py-2.5 px-8 rounded-full bg-[#1e0a18] text-white text-[0.8rem] font-bold tracking-widest hover:bg-[#7a2860] transition-all"
            >
              Retry Location
            </button>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#3c143260] font-[DM_Sans]">
              No categories available at the moment.
            </p>
          </div>
        ) : (
          categories.map((cat) => (
            <CategoryRow
              key={cat.id}
              category={cat}
              lat={location.latitude}
              lng={location.longitude}
            />
          ))
        )}
      </div>
    </section>
  );
}