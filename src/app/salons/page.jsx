// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { filters, badgeStyles } from "@/features/salons/data/salons";
// import { useNearbySalons } from "@/features/salons/hooks/useNearbySalons";

// // ─── Star Icon ────────────────────────────────────────────────────────────────
// const StarIcon = ({ filled }) => (
//   <svg width={13} height={13} viewBox="0 0 20 20" fill={filled ? "#c4956a" : "#e0d0c8"}>
//     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//   </svg>
// );

// // ─── Salon Card ───────────────────────────────────────────────────────────────
// function SalonCard({ salon }) {
//   const bc = salon.badge ? badgeStyles[salon.badge] : null;

//   return (
//     <Link
//       href={`/salons/${salon.slug}`}
//       className="group block bg-white rounded-[20px] overflow-hidden border border-[#3c143212] cursor-pointer shadow-[0_2px_16px_rgba(60,20,50,0.06)] no-underline h-full"
//     >
//       {/* ── Image ── */}
//       <div className="relative h-[210px] overflow-hidden">
//         <img
//           src={salon.image || "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=60"}
//           alt={salon.name}
//           className="w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.06]"
//         />
//         {/* Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(30,10,25,0.45)]" />

//         {/* Badge */}
//         {salon.badge && bc && (
//           <span className={`absolute top-3.5 left-3.5 px-[11px] py-1 rounded-full text-[0.68rem] font-semibold tracking-[0.06em] backdrop-blur-[8px] border font-[DM_Sans] ${bc.bg} ${bc.text} ${bc.border}`}>
//             {salon.badge}
//           </span>
//         )}

//         {/* Price */}
//         <span className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full text-[0.72rem] font-semibold tracking-[0.04em] backdrop-blur-[8px] bg-[rgba(253,246,240,0.92)] text-[#7a4020] font-[DM_Sans]">
//           {salon.price || "₹₹"}
//         </span>
//       </div>

//       {/* ── Body ── */}
//       <div className="p-[22px_22px_20px] flex flex-col h-[calc(100%-210px)]">
//         <h3 className="text-[1.25rem] font-bold leading-[1.2] mb-1 text-[#1e0a18] font-[Cormorant_Garamond,Georgia,serif]">
//           {salon.name}
//         </h3>

//         <div className="flex items-center gap-1 text-[0.78rem] mb-3 text-[#3c143280] font-[DM_Sans]">
//           <svg width={12} height={12} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
//             <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
//             <circle cx="12" cy="10" r="3" />
//           </svg>
//           {salon.location || salon.address}
//         </div>

//         {/* Divider */}
//         <div className="h-px mb-3.5 bg-[#3c143212]" />

//         <p className="text-[0.78rem] font-normal mb-3.5 text-[#3c14328c] font-[DM_Sans]">
//           {salon.category}
//         </p>

//         {/* Tags */}
//         {salon.tags && (
//           <div className="flex gap-1.5 flex-wrap mb-4">
//             {salon.tags.map((tag) => (
//               <span
//                 key={tag}
//                 className="text-[0.68rem] font-medium px-2.5 py-[3px] rounded-full border bg-[#9b587614] text-[#7a2860] border-[#9b587826] font-[DM_Sans]"
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>
//         )}

//         {/* Footer */}
//         <div className="mt-auto flex items-center justify-between">
//           <div className="flex items-center gap-[5px]">
//             <div className="flex gap-0.5">
//               {[1, 2, 3, 4, 5].map((i) => (
//                 <StarIcon key={i} filled={i <= Math.round(salon.rating || 4.5)} />
//               ))}
//             </div>
//             <span className="text-[0.82rem] font-semibold text-[#1e0a18] font-[DM_Sans]">
//               {salon.rating || 4.5}
//             </span>
//             <span className="text-[0.72rem] text-[#3c143266] font-[DM_Sans]">
//               ({salon.reviews || 0})
//             </span>
//           </div>

//           <span className="py-2 px-[18px] rounded-full border-[1.5px] border-[#3c14322e] text-[0.75rem] font-semibold text-[#3c1432] tracking-[0.04em] font-[DM_Sans] transition-all duration-[220ms] group-hover:bg-gradient-to-br group-hover:from-[#3c1432] group-hover:to-[#7a2860] group-hover:border-transparent group-hover:text-[#fdf6f0] group-hover:shadow-[0_4px_16px_rgba(60,20,50,0.22)]">
//             Book Now
//           </span>
//         </div>
//       </div>
//     </Link>
//   );
// }

// // ─── Main Page Component ─────────────────────────────────────────────────────
// export default function SalonsPage() {
//   const { salons, loading, isFallback } = useNearbySalons();
//   const [activeFilter, setActiveFilter] = useState("All");
//   const [search, setSearch] = useState("");

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#f9f5f2] flex items-center justify-center">
//         <div className="flex flex-col items-center gap-4">
//           <div className="w-12 h-12 border-4 border-[#7a2860]/20 border-t-[#7a2860] rounded-full animate-spin" />
//           <p className="text-[#3c143280] font-medium font-[DM_Sans]">Finding best salons near you...</p>
//         </div>
//       </div>
//     );
//   }

//   const filtered = (salons || []).filter((s) => {
//     const matchFilter =
//       activeFilter === "All" ||
//       s.category?.toLowerCase().includes(activeFilter.toLowerCase()) ||
//       s.tags?.some((t) => t.toLowerCase().includes(activeFilter.toLowerCase()));
//     const matchSearch =
//       s.name?.toLowerCase().includes(search.toLowerCase()) ||
//       s.location?.toLowerCase().includes(search.toLowerCase());
//     return matchFilter && matchSearch;
//   });

//   return (
//     <div className="min-h-screen bg-[#f9f5f2] font-[DM_Sans,sans-serif] pt-24 pb-20">
//       {/* ── Header Section ── */}
//       <div className="max-w-[1280px] mx-auto px-6 md:px-12">
//         <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
//           <div className="flex-1">
//             <h1 className="font-bold leading-[1.1] mb-4 text-[#1e0a18] font-[Cormorant_Garamond,Georgia,serif] text-[clamp(2.5rem,5vw,3.5rem)]">
//               Discover Premium
//               <span className="italic text-[#7a2860] block md:inline md:ml-3">
//                 Salons Near You
//               </span>
//             </h1>
//             <p className="text-[1rem] leading-[1.6] max-w-[500px] text-[#3c143280] font-[DM_Sans]">
//               {isFallback 
//                 ? "We couldn't find your exact location, but here are some popular salons in Delhi NCR."
//                 : "Handpicked spaces where craft meets care — professional styling just around the corner."}
//             </p>
//           </div>

//           {/* Search Box */}
//           <div className="relative w-full lg:w-[400px]">
//             <span className="absolute left-[18px] top-1/2 -translate-y-1/2 pointer-events-none text-[#3c143259]">
//               <svg width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
//                 <circle cx="11" cy="11" r="8" />
//                 <line x1="21" y1="21" x2="16.65" y2="16.65" />
//               </svg>
//             </span>
//             <input
//               className="w-full py-[15px] pr-[20px] pl-[50px] rounded-2xl border-[1.5px] border-[#3c14321f] bg-white text-[#2a1020] text-[0.95rem] outline-none transition-all duration-[220ms] shadow-sm focus:border-[#7a2860] focus:ring-4 focus:ring-[#7a2860]/5 font-[DM_Sans]"
//               type="text"
//               placeholder="Search by salon name or area..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* ── Filters ── */}
//         <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide items-center mb-12">
//           <span className="text-[0.85rem] font-bold mr-3 text-[#3c143240] uppercase tracking-wider font-[DM_Sans]">Filters:</span>
//           {filters.map((f) => (
//             <button
//               key={f}
//               onClick={() => setActiveFilter(f)}
//               className={`py-2.5 px-6 rounded-full border-[1.5px] text-[0.85rem] font-semibold cursor-pointer transition-all duration-200 whitespace-nowrap font-[DM_Sans] ${
//                 activeFilter === f
//                   ? "bg-[#1e0a18] border-[#1e0a18] text-[#fdf6f0] shadow-lg shadow-[#1e0a18]/20"
//                   : "bg-white border-[#3c14321f] text-[#3c143280] hover:border-[#7a2860]/40 hover:text-[#7a2860]"
//               }`}
//             >
//               {f}
//             </button>
//           ))}
//           {filtered.length !== (salons?.length || 0) && (
//             <span className="text-[0.85rem] ml-4 font-medium text-[#7a2860]">
//               {filtered.length} found
//             </span>
//           )}
//         </div>
//       </div>

//       {/* ── Grid ── */}
//       <div className="max-w-[1280px] mx-auto px-6 md:px-12">
//         {filtered.length === 0 ? (
//           <div className="text-center py-24 bg-white/50 rounded-[40px] border border-dashed border-[#3c143220]">
//             <div className="w-20 h-20 bg-[#3c1432]/5 rounded-full flex items-center justify-center mx-auto mb-6">
//               <svg width={32} height={32} fill="none" stroke="#3c1432" strokeWidth={1.5} viewBox="0 0 24 24" className="opacity-40">
//                 <circle cx="11" cy="11" r="8" />
//                 <line x1="21" y1="21" x2="16.65" y2="16.65" />
//               </svg>
//             </div>
//             <h3 className="text-xl font-bold text-[#1e0a18] mb-2 font-[Cormorant_Garamond]">No matches found</h3>
//             <p className="text-[#3c143260] font-[DM_Sans]">Try adjusting your search or filters to find more results.</p>
//             <button 
//               onClick={() => { setSearch(""); setActiveFilter("All"); }}
//               className="mt-6 text-[#7a2860] font-bold hover:underline font-[DM_Sans]"
//             >
//               Clear all filters
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filtered.map((salon) => (
//               <SalonCard key={salon.id} salon={salon} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import SalonDetailsPage from "@/features/salons/components/SalonDetailsPage";

export default function Page({ params }) {
  return <SalonDetailsPage id={params.id} />;
}