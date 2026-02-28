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
            { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return { ref, visible };
}

function Reveal({ children, delay = 0, className = "" }) {
    const { ref, visible } = useReveal();
    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                } ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

// ─── Main Component ────────────────────────────────────────────────────────────
const SalonReviews = ({ id, overallRating, totalReviews, ratingBreakdown }) => {
    const { reviews, loading, error, pagination, nextPage, prevPage } = useSalonReviews(id);



    if (loading) {
        return (
            <section className="py-24 bg-[#FDFAF6]" id="reviews">
                <div className="max-w-7xl mx-auto px-8 flex flex-col items-center justify-center py-20">
                    <div className="w-12 h-12 border-4 border-[#C8A951]/20 border-t-[#C8A951] rounded-full animate-spin mb-4" />
                    <p className="text-[#9e9287] text-xs uppercase tracking-[0.3em] font-bold">Curating Experiences...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-24 bg-[#FDFAF6]" id="reviews">
                <div className="max-w-7xl mx-auto px-8 text-center py-10">
                    <p className="text-[#9e9287] text-sm italic">Unable to load reviews. Please try again later.</p>
                </div>
            </section>
        );
    }

    if (!reviews || reviews.length === 0) {
        return (
            <section className="py-24 bg-[#FDFAF6]" id="reviews">
                <div className="max-w-7xl mx-auto px-8 text-center py-10">
                    <span className="block text-[11px] tracking-[0.4em] uppercase text-[#C8A951] font-bold mb-4">Testimonials</span>
                    <h2 className="font-[Cormorant_Garamond,Georgia,serif] text-5xl text-[#1C1C1C] mb-6">Customer Reviews</h2>
                    <p className="text-[#9e9287] text-sm italic mb-8">No reviews yet for this salon.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-24 bg-[#FDFAF6]" id="reviews">
            <div className="max-w-7xl mx-auto px-8">
                <Reveal>
                    <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
                        <div className="text-center md:text-left">
                            <span className="block text-[11px] tracking-[0.4em] uppercase text-[#C8A951] font-bold mb-4">Testimonials</span>
                            <h2 className="font-[Cormorant_Garamond,Georgia,serif] text-5xl text-[#1C1C1C]">Customer Reviews</h2>
                        </div>
                    </div>
                </Reveal>

                <div className="grid lg:grid-cols-3 gap-12 items-start">
                    <Reveal className="lg:col-span-1 bg-white p-10 rounded-3xl shadow-sm border border-[#C8A951]/5">
                        <h3 className="font-[Cormorant_Garamond,Georgia,serif] text-3xl text-[#1C1C1C] mb-6">Overall Rating</h3>
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-6xl font-bold text-[#1C1C1C]">
                                {(overallRating || 0).toFixed(1)}
                            </span>
                            <div>
                                <div className="flex text-[#C8A951] mb-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <span key={i}>{i < Math.round(overallRating || 0) ? "★" : "☆"}</span>
                                    ))}
                                </div>
                                <span className="text-[#9e9287] text-sm font-medium uppercase tracking-widest">{totalReviews || 0} Reviews</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {[5, 4, 3, 2, 1].map((star) => (
                                <div key={star} className="flex items-center gap-4">
                                    <span className="text-xs font-bold text-[#7a7065] w-4">{star}</span>
                                    <div className="flex-1 h-1.5 bg-[#f5edce] rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-[#C8A951]"
                                            style={{ width: totalReviews ? `${((ratingBreakdown?.[star] || 0) / totalReviews) * 100}%` : '0%' }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Reveal>

                    <div className="lg:col-span-2">
                        <div className="grid md:grid-cols-2 gap-6 mb-10">
                            {reviews.map((review, i) => (
                                <Reveal key={review.id || i} delay={i * 100}>
                                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#C8A951]/5 hover:border-[#C8A951]/20 transition-all h-full">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 rounded-full bg-[#f5edce] flex items-center justify-center text-[#C8A951] font-bold overflow-hidden flex-shrink-0">
                                                {(review.isAnonymous || !review.customer) ? (
                                                    <span className="text-sm">ANON</span>
                                                ) : review.customer?.profileImageUrl ? (
                                                    <img src={review.customer.profileImageUrl} alt={review.customer.fullName} className="w-full h-full object-cover" />
                                                ) : (
                                                    review.customer?.fullName?.substring(0, 2).toUpperCase() || 'AN'
                                                )}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h4 className="text-sm font-bold text-[#1C1C1C] truncate">
                                                    {review.isAnonymous || !review.customer ? "Anonymous User" : review.customer.fullName}
                                                </h4>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <div className="flex text-[#C8A951] text-[10px]">
                                                        {Array.from({ length: 5 }).map((_, idx) => (
                                                            <span key={idx}>{idx < Math.round(review.rating) ? "★" : "☆"}</span>
                                                        ))}
                                                    </div>
                                                    <span className="text-[#9e9287] text-[10px] whitespace-nowrap">
                                                        {new Date(review.createdAt).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {review.staff && (
                                            <div className="mb-3 text-[10px] text-[#C8A951] uppercase tracking-widest font-bold">
                                                Service by {review.staff.fullName}
                                            </div>
                                        )}

                                        <p className="text-[#7a7065] text-sm leading-relaxed italic line-clamp-3">
                                            "{review.comment}"
                                        </p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        {pagination.totalPages > 1 && (
                            <Reveal>
                                <div className="flex justify-center items-center gap-4">
                                    <button
                                        onClick={prevPage}
                                        disabled={pagination.isFirst}
                                        className="px-6 py-2 rounded-full border border-[#C8A951]/20 text-[#1C1C1C] text-xs font-bold uppercase tracking-wider disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#C8A951] transition-all"
                                        type="button"
                                    >
                                        Previous
                                    </button>
                                    <span className="text-[#9e9287] text-sm font-medium">
                                        Page {pagination.currentPage + 1} of {pagination.totalPages}
                                    </span>
                                    <button
                                        onClick={nextPage}
                                        disabled={pagination.isLast}
                                        className="px-6 py-2 rounded-full border border-[#C8A951]/20 text-[#1C1C1C] text-xs font-bold uppercase tracking-wider disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#C8A951] transition-all"
                                        type="button"
                                    >
                                        Next
                                    </button>
                                </div>
                            </Reveal>
                        )}
                    </div>
                </div>
            </div>



            <style jsx>{`
                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </section>
    );
};

export default SalonReviews;