"use client";

import React from "react";
import Link from "next/link";
import { salons, badgeStyles } from "@/features/salons/data/salons";

// Show only badged (top-rated) salons as recommendations — up to 4
const recommendedSalons = salons.filter((s) => s.badge).slice(0, 4);

const StarIcon = ({ filled }) => (
  <svg width={13} height={13} viewBox="0 0 20 20" fill={filled ? "#c4956a" : "#e0d0c8"}>
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default function RecomendedSallon() {
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
            const bc = salon.badge ? badgeStyles[salon.badge] : null;
            return (
              <Link
                key={salon.id}
                href={`/salons/${salon.slug}`}
                className="group block bg-white rounded-[20px] overflow-hidden border border-[#3c143212] cursor-pointer shadow-[0_2px_16px_rgba(60,20,50,0.06)] no-underline"
              >
                {/* Image */}
                <div className="relative h-[200px] overflow-hidden">
                  <img
                    src={salon.image}
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
                    {salon.price}
                  </span>
                </div>

                {/* Body */}
                <div className="p-[20px_20px_18px]">
                  <h3 className="text-[1.18rem] font-bold leading-[1.2] mb-1 text-[#1e0a18] font-[Cormorant_Garamond,Georgia,serif]">
                    {salon.name}
                  </h3>

                  <div className="flex items-center gap-1 text-[0.76rem] mb-3 text-[#3c143280] font-[DM_Sans]">
                    <svg width={11} height={11} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {salon.location}
                  </div>

                  {/* Divider */}
                  <div className="h-px mb-3 bg-[#3c143212]" />

                  <p className="text-[0.76rem] font-normal mb-3 text-[#3c14328c] font-[DM_Sans]">
                    {salon.category}
                  </p>

                  {/* Tags */}
                  {salon.tags && (
                    <div className="flex gap-1.5 flex-wrap mb-4">
                      {salon.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[0.66rem] font-medium px-2.5 py-[3px] rounded-full border bg-[#9b587614] text-[#7a2860] border-[#9b587826] font-[DM_Sans]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[5px]">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <StarIcon key={i} filled={i <= Math.round(salon.rating)} />
                        ))}
                      </div>
                      <span className="text-[0.8rem] font-semibold text-[#1e0a18] font-[DM_Sans]">
                        {salon.rating}
                      </span>
                      <span className="text-[0.7rem] text-[#3c143266] font-[DM_Sans]">
                        ({salon.reviews})
                      </span>
                    </div>
                    {/* Book Now — visual cue, click handled by parent Link */}
                    <span className="py-[7px] px-[16px] rounded-full border-[1.5px] border-[#3c14322e] text-[0.73rem] font-semibold text-[#3c1432] tracking-[0.04em] font-[DM_Sans] transition-all duration-[220ms] group-hover:bg-gradient-to-br group-hover:from-[#3c1432] group-hover:to-[#7a2860] group-hover:border-transparent group-hover:text-[#fdf6f0] group-hover:shadow-[0_4px_16px_rgba(60,20,50,0.22)]">
                      Book Now
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
