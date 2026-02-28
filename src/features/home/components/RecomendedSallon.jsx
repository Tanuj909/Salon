"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchNearbySalons } from "@/features/salons/services/salonService";

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

const StarIcon = ({ filled }) => (
  <svg width={13} height={13} viewBox="0 0 20 20" fill={filled ? "#c4956a" : "#e0d0c8"}>
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default function RecomendedSallon() {
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        setLoading(true);
        // Using Dubai coordinates as default for home page recommendations
        const data = await fetchNearbySalons(25.2048, 55.2708, 50);
        setSalons(data || []);
      } catch (error) {
        console.error("Failed to fetch recommended salons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalons();
  }, []);

  if (loading) {
    return (
      <section className="bg-[#f9f5f2] py-20">
        <div className="max-w-[1280px] mx-auto px-12 text-center">
          <p className="text-[#3c143280]">Loading recommendations...</p>
        </div>
      </section>
    );
  }

  // Show up to 4 salons
  const recommendedSalons = salons.slice(0, 4);

  return (
    <section className="bg-[#f9f5f2] py-20">
      <div className="max-w-[1280px] mx-auto px-12">

        {/* ── Section Header ── */}
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-px inline-block bg-[#c4956a]" />
              <span className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c4956a] font-[DM_Sans]">
                Handpicked For You
              </span>
            </div>

            <h2 className="font-bold leading-[1.1] text-[#1e0a18] font-[Cormorant_Garamond,Georgia,serif] text-[clamp(1.75rem,3vw,2.6rem)]">
              Recommended
              <span className="italic text-[#7a2860] ml-2">Salons</span>
            </h2>
            <p className="text-[0.88rem] leading-[1.65] mt-2 max-w-[380px] text-[#3c143280] font-[DM_Sans]">
              Top-rated spaces loved by our community — book a session today.
            </p>
          </div>

          {/* View All */}
          <Link
            href="/salons"
            className="flex items-center gap-2 py-[11px] px-6 rounded-full border-[1.5px] border-[#3c14322e] bg-white text-[0.8rem] font-semibold tracking-[0.04em] cursor-pointer transition-all duration-[220ms] text-[#3c1432] no-underline font-[DM_Sans] hover:bg-gradient-to-br hover:from-[#3c1432] hover:to-[#7a2860] hover:border-transparent hover:text-[#fdf6f0] hover:shadow-[0_6px_24px_rgba(60,20,50,0.22)]"
          >
            View All Salons
            <svg width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        {/* Divider */}
        <div className="h-px mb-10 bg-[#3c143214]" />

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedSalons.map((salon) => {
            const badge = salon.verificationStatus === "VERIFIED" ? "Top Rated" : null;
            const bc = badge ? badgeStyles[badge] : null;
            const salonImg = salon.imageUrls?.[0] || salon.bannerImageUrl || "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=60";
            
            return (
              <Link
                key={salon.id}
                href={`/salons/${salon.id}`}
                className="group block bg-white rounded-[20px] overflow-hidden border border-[#3c143212] cursor-pointer shadow-[0_2px_16px_rgba(60,20,50,0.06)] no-underline h-full"
              >
                {/* Image */}
                <div className="relative h-[200px] overflow-hidden">
                  <img
                    src={salonImg}
                    alt={salon.name}
                    className="w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.06]"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(30,10,25,0.45)]" />

                  {/* Badge */}
                  {badge && bc && (
                    <span className={`absolute top-3.5 left-3.5 px-[11px] py-1 rounded-full text-[0.68rem] font-semibold tracking-[0.06em] backdrop-blur-[8px] border font-[DM_Sans] ${bc.bg} ${bc.text} ${bc.border}`}>
                      {badge}
                    </span>
                  )}

                  {/* Open Status */}
                  <span className={`absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full text-[0.72rem] font-semibold tracking-[0.04em] backdrop-blur-[8px] ${salon.isOpen ? 'bg-[#fdf6f0e0] text-[#7a4020]' : 'bg-red-50/90 text-primary'} font-[DM_Sans]`}>
                    {salon.isOpen ? 'Open' : 'Closed'}
                  </span>
                </div>

                {/* Body */}
                <div className="p-[20px_20px_18px] flex flex-col justify-between h-[calc(100%-200px)]">
                  <div>
                    <h3 className="text-[1.18rem] font-bold leading-[1.2] mb-1 text-[#1e0a18] font-[Cormorant_Garamond,Georgia,serif] line-clamp-1">
                      {salon.name}
                    </h3>

                    <div className="flex items-center gap-1 text-[0.76rem] mb-3 text-[#3c143280] font-[DM_Sans]">
                      <svg width={11} height={11} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {salon.city}, {salon.country}
                    </div>

                    {/* Divider */}
                    <div className="h-px mb-3 bg-[#3c143212]" />

                    <p className="text-[0.76rem] font-normal mb-3 text-[#3c14328c] font-[DM_Sans] line-clamp-2 italic">
                      {salon.description}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <div className="flex items-center gap-[5px]">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <StarIcon key={i} filled={i <= Math.round(salon.averageRating || 0)} />
                        ))}
                      </div>
                      <span className="text-[0.8rem] font-semibold text-[#1e0a18] font-[DM_Sans]">
                        {(salon.averageRating || 0).toFixed(1)}
                      </span>
                    </div>
                    {/* Link handling by parent Link */}
                    <span className="py-[7px] px-[16px] rounded-full border-[1.5px] border-[#3c14322e] text-[0.73rem] font-semibold text-[#3c1432] tracking-[0.04em] font-[DM_Sans] transition-all duration-[220ms] group-hover:bg-gradient-to-br group-hover:from-[#3c1432] group-hover:to-[#7a2860] group-hover:border-transparent group-hover:text-[#fdf6f0] group-hover:shadow-[0_4px_16px_rgba(60,20,50,0.22)]">
                      View
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
