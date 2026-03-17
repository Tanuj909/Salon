"use client";

import React, { useRef, useEffect, useState } from "react";
import { useSalonReviews } from "../hooks/useSalonReviews";

// ─── Reveal Animation ──────────────────────────────────────────────────────────
function useReveal() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    obs.unobserve(el);
                }
            },
            { threshold: 0.05, rootMargin: "50px" }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return { ref, visible };
}

function Reveal({ children, delay = 0, className = "" }) {
    const { ref, visible } = useReveal();
    const safeDelay = Math.min(delay, 300);
    return (
        <div
            ref={ref}
            className={`transition-all duration-500 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} ${className}`}
            style={{ transitionDelay: `${safeDelay}ms` }}
        >
            {children}
        </div>
    );
}

// ─── Main Component ────────────────────────────────────────────────────────────
const SalonReviews = ({ id, overallRating, totalReviews }) => {
    const { reviews, loading, error, pagination, nextPage, prevPage } = useSalonReviews(id);

    if (loading) {
        return (
            <section className="py-12 bg-[#f7ede2]" id="reviews">
                <div className="max-w-7xl mx-auto px-8 flex flex-col items-center justify-center py-20">
                    <div className="w-12 h-12 border-4 border-[#cd6133]/20 border-t-[#cd6133] rounded-full animate-spin mb-4" />
                    <p className="text-[#5a3d2b] text-xs uppercase tracking-[0.3em] font-bold">Curating Experiences...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-12 bg-[#f7ede2]" id="reviews">
                <div className="max-w-7xl mx-auto px-8 text-center py-10">
                    <p className="text-[#5a3d2b] text-sm italic">Unable to load reviews. Please try again later.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-8 sm:py-12" id="reviews">
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
                <Reveal>
                    <div className="text-center mb-12 sm:mb-24">
                        <span className="block text-[9px] sm:text-[11px] tracking-[0.3em] sm:tracking-[0.4em] uppercase text-[#cd6133] font-extrabold mb-4 sm:mb-6">Testimonials</span>
                        <h2 className="text-[22px] sm:text-4xl md:text-6xl text-[#5a3d2b] font-bold leading-tight whitespace-nowrap tracking-tight">
                            What Our Clients <em className="italic font-light">Say</em>
                        </h2>
                    </div>
                </Reveal>

                {reviews.length === 0 ? (
                    <div className="text-center py-16 sm:py-24 px-4 bg-white/30 rounded-[32px] sm:rounded-[40px] border border-[#cd6133]/10">
                        <p className="text-[#5a3d2b]/60 italic text-lg sm:text-xl">No reviews yet. Be the first to share your experience.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
                        {reviews.map((review, i) => (
                            <Reveal key={review.id || i} delay={i * 100}>
                                <div className="bg-white p-6 sm:p-10 rounded-3xl sm:rounded-[48px] border border-[#cd6133]/20 shadow-md hover:border-[#cd6133]/40 hover:shadow-xl transition-all duration-500 h-full flex flex-col group">
                                    <div className="flex items-center gap-4 sm:gap-5 mb-6">
                                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[#cd6133]/10 group-hover:border-[#cd6133]/30 transition-colors bg-[#fef9f3] shrink-0">
                                            <img
                                                src={review.customer?.profileImageUrl || "https://ui-avatars.com/api/?name=" + (review.customer?.fullName || "User") + "&background=cd6133&color=fef9f3"}
                                                alt={review.customer?.fullName}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                                <h4 className="font-bold text-[#5a3d2b] text-lg leading-tight">{review.customer?.fullName}</h4>
                                                <div className="flex items-center gap-0.5">
                                                    {Array.from({ length: 5 }).map((_, starI) => (
                                                        <svg key={starI} width={14} height={14} viewBox="0 0 24 24" fill={starI < review.rating ? "#cd6133" : "rgba(0,0,0,0.1)"}>
                                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[10px] uppercase tracking-wider font-bold text-[#cd6133]/70">
                                                <span>{review.business?.name}</span>
                                                {review.staff && (
                                                    <span className="flex items-center gap-1">
                                                        <span className="w-1 h-1 rounded-full bg-[#cd6133]/30" />
                                                        Staff: {review.staff.fullName}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-[#5a3d2b] text-sm sm:text-base leading-relaxed mb-6 italic flex-1 opacity-80 break-words line-clamp-4">
                                        "{review.comment}"
                                    </p>
                                    
                                    <div className="flex items-center justify-between pt-6 border-t border-[#cd6133]/5 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#5a3d2b]/40">
                                        <span className="flex items-center gap-1.5">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-green-600/60">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            Verified Experience
                                        </span>
                                        <span>{new Date(review.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                )}

                {/* Pagination Controls */}
                {pagination.totalPages > 1 && (
                    <Reveal delay={300}>
                        <div className="flex justify-center items-center gap-4 sm:gap-10 mt-12 sm:mt-20">
                            <button
                                onClick={prevPage}
                                disabled={pagination.isFirst}
                                className="px-6 sm:px-10 py-3.5 sm:py-5 rounded-full border-2 border-[#cd6133]/20 text-[#cd6133] text-[9px] sm:text-[10px] font-bold uppercase tracking-widest disabled:opacity-20 disabled:cursor-not-allowed hover:bg-[#cd6133] hover:text-[#fef9f3] transition-all cursor-pointer whitespace-nowrap"
                            >
                                Previous
                            </button>
                            <span className="text-[#5a3d2b] text-xs sm:text-sm font-bold tracking-widest whitespace-nowrap">
                                {pagination.currentPage + 1} / {pagination.totalPages}
                            </span>
                            <button
                                onClick={nextPage}
                                disabled={pagination.isLast}
                                className="px-6 sm:px-10 py-3.5 sm:py-5 rounded-full border-2 border-[#cd6133]/20 text-[#cd6133] text-[9px] sm:text-[10px] font-bold uppercase tracking-widest disabled:opacity-20 disabled:cursor-not-allowed hover:bg-[#cd6133] hover:text-[#fef9f3] transition-all cursor-pointer whitespace-nowrap"
                            >
                                Next
                            </button>
                        </div>
                    </Reveal>
                )}
            </div>
        </section>
    );
};

export default SalonReviews;