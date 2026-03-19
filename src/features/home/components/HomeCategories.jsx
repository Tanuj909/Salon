"use client";

import React from "react";
import Link from "next/link";
import useActiveCategories from '../../../features/salons/hooks/useActiveServices';

const CATEGORIES = [
  {
    name: "Men",
    image: "/api/placeholder/400/400", // Will replace with actual generated paths in final step or use relative if possible
    href: "/salons?category=MEN",
    imgKey: "category_men_1773427934952.png",
    price: "30"
  },
  {
    name: "Women",
    image: "/api/placeholder/400/400",
    href: "/salons?category=WOMEN",
    imgKey: "category_women_1773427951840.png",
    price: "80"
  },
  {
    name: "Kids",
    image: "/api/placeholder/400/400",
    href: "/salons?category=KIDS",
    imgKey: "category_kids_1773427988583.png",
    price: "50"
  },
  {
    name: "Pets",
    image: "/api/placeholder/400/400",
    href: "/salons?category=PETS",
    imgKey: "category_pets_1773428004915.png",
    price: "70"
  }
];

// Note: Using a helper to get the full path for the generated images
// In a real app, these would be in public/ or served via CDN.
// For now, I'll use the provided absolute paths mapping.

export default function HomeCategories() {
  const { categories, loading } = useActiveCategories();

  const dynamicCategories = CATEGORIES.map(cat => {
    const backendMatch = categories?.find(c => c.name.toLowerCase() === cat.name.toLowerCase());
    return {
      ...cat,
      href: backendMatch ? `/salons?categoryId=${backendMatch.id}` : cat.href
    };
  });

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="text-center mb-12 sm:mb-20">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
            <span className="w-8 sm:w-12 h-px bg-[#cd6133]/30" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.5em] text-[#cd6133] font-bold">Quick Selection</span>
            <span className="w-8 sm:w-12 h-px bg-[#cd6133]/30" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#4b3621] font-[Cormorant_Garamond,serif] leading-tight">
            Browse by <em className="italic font-light text-[#cd6133]">Category</em>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 md:gap-16 place-items-center">
          {dynamicCategories.map((cat) => (
            <Link 
              key={cat.name} 
              href={cat.href}
              className="group flex flex-col items-center no-underline"
            >
              <div className="relative w-36 h-36 md:w-52 md:h-52 lg:w-48 lg:h-48 xl:w-60 xl:h-60 rounded-full shadow-[0_20px_60px_rgba(205,97,51,0.15)] border-[6px] md:border-[8px] border-white/80 transition-all duration-1000 ease-out group-hover:scale-105 group-hover:border-[#cd6133] group-hover:shadow-[0_30px_80px_rgba(205,97,51,0.3)] ring-1 ring-[#cd6133]/10">
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <img 
                    src={`/${cat.imgKey}`}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-125"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/4 bg-black/80 backdrop-blur-[2px] transition-colors duration-700 group-hover:bg-[#cd6133]/90" />
                </div>
                
                <div className="absolute inset-x-0 bottom-0 h-1/4 flex items-center justify-center pb-2">
                  <div className="flex flex-col items-center">
                    <span className="text-white text-base sm:text-lg md:text-xl font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-transform duration-700 group-hover:-translate-y-1 drop-shadow-md">
                      {cat.name}
                    </span>
                    <div className="w-0 h-0.5 bg-white transition-all duration-700 group-hover:w-full mt-1.5 opacity-80 shadow-sm" />
                  </div>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="mt-4 sm:mt-5 flex flex-col items-center justify-center transition-opacity duration-500 opacity-90 group-hover:opacity-100">
                <span className="text-xs sm:text-sm text-gray-500 font-medium tracking-wide uppercase">Starting from</span>
                <span className="text-base sm:text-lg font-bold text-[#cd6133] mt-0.5">Starting at {cat.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}