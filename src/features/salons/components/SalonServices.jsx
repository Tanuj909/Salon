"use client";

import React, { useRef, useEffect, useState } from "react";
import { useSalonServices } from "../hooks/useSalonServices";

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
            className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

// ─── Icons ─────────────────────────────────────────────────────────────────────
function ClockIcon() {
    return (
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#C8A951" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
    );
}

function UsersIcon() {
    return (
        <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    );
}

function FireIcon() {
    return (
        <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 23c-3.6 0-8-2.4-8-8.3 0-5 4.5-8.6 6.1-12.4.2-.5.8-.5 1 0 .8 1.8 2.2 3.4 3.5 5.1C17 10.3 20 13 20 14.7 20 20.5 15.6 23 12 23z" />
        </svg>
    );
}

// ─── Service Card ──────────────────────────────────────────────────────────────
function ServiceCard({ service, index, onBookNow }) {
    const hasDiscount = service.discountedPrice && service.discountedPrice < service.price;
    const displayPrice = service.effectivePrice || service.discountedPrice || service.price;

    return (
        <Reveal delay={index * 100}>
            <div className="group bg-white rounded-[24px] p-6 md:p-8 border border-[#cd6133]/5 hover:border-[#cd6133]/20 hover:shadow-[0_40px_80px_-15px_rgba(205,97,51,0.1)] transition-all duration-500 hover:-translate-y-2 relative flex flex-col h-full overflow-hidden">
                {/* Terracotta Top Accent Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[#cd6133] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                {/* Service Badges */}
                <div className="flex items-center gap-2 mb-6">
                    {service.isPopular && (
                        <div className="bg-[#cd6133] text-[#fef9f3] text-[8px] font-bold px-3 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg flex items-center gap-1">
                            <FireIcon /> Popular
                        </div>
                    )}
                    {hasDiscount && (
                        <div className="bg-[#4b3621] text-[#fef9f3] text-[8px] font-bold px-3 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg">
                            {Math.round(((service.price - service.discountedPrice) / service.price) * 100)}% OFF
                        </div>
                    )}
                </div>

                {/* Card Content */}
                <div className="flex flex-col flex-1">
                    <div className="mb-6">
                        <div className="flex items-start justify-between gap-4 mb-3">
                            <h3 className="text-2xl text-[#5a3d2b] font-bold leading-tight group-hover:text-[#cd6133] transition-colors">
                                {service.name}
                            </h3>
                            {service.durationMinutes && (
                                <span className="flex items-center gap-2 text-[9px] text-[#5a3d2b]/50 border border-[#5a3d2b]/10 px-2.5 py-1 rounded-full font-bold uppercase tracking-widest whitespace-nowrap">
                                    <ClockIcon /> {service.durationMinutes} min
                                </span>
                            )}
                        </div>
                        {service.description && (
                            <p className="text-[#5a3d2b]/70 text-sm leading-relaxed font-medium line-clamp-2">
                                {service.description}
                            </p>
                        )}
                    </div>

                    {/* Meta info row */}
                    {(service.staffCount > 0 || service.totalBookings > 0) && (
                        <div className="flex items-center gap-5 mb-8 border-t border-[#cd6133]/5 pt-5">
                            {service.staffCount > 0 && (
                                <span className="flex items-center gap-2 text-[9px] text-[#5a3d2b]/60 font-bold uppercase tracking-widest">
                                    <UsersIcon />
                                    {service.staffCount} Specialists
                                </span>
                            )}
                            {service.totalBookings > 0 && (
                                <span className="text-[9px] text-[#cd6133] font-extrabold uppercase tracking-[0.2em]">
                                    {service.totalBookings} Experienced
                                </span>
                            )}
                        </div>
                    )}

                    {/* Price & Book */}
                    <div className="mt-auto">
                        <div className="flex items-end justify-between mb-6">
                            <div className="flex flex-col">
                                <span className="text-[9px] uppercase tracking-[0.2em] text-[#5a3d2b]/40 font-extrabold mb-1">
                                    Investment
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="text-3xl text-[#5a3d2b] font-bold tracking-tighter">
                                        ₹{displayPrice}
                                    </span>
                                    {hasDiscount && (
                                        <span className="text-sm text-[#5a3d2b]/40 line-through font-medium">
                                            ₹{service.price}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => onBookNow?.(service)}
                            className="w-full py-4 rounded-xl border-2 border-[#cd6133] text-[#cd6133] text-[10px] font-bold tracking-[0.3em] uppercase transition-all duration-500 hover:bg-[#cd6133] hover:text-[#fef9f3] hover:shadow-[0_15px_30px_-10px_rgba(205,97,51,0.4)] active:scale-[0.98] cursor-pointer"
                        >
                            Reserve Experience
                        </button>
                    </div>
                </div>
            </div>
        </Reveal>
    );
}

// ─── Main Component ────────────────────────────────────────────────────────────
const SalonServices = ({ id, onBookService }) => {
    const { services, loading, error } = useSalonServices({ id });

    if (loading) {
        return (
            <section className="py-24 bg-white" id="services">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="flex flex-col items-center justify-center gap-4 py-20">
                        <div className="w-12 h-12 border-4 border-[#C8A951]/20 border-t-[#C8A951] rounded-full animate-spin" />
                        <p className="text-[#9e9287] text-xs uppercase tracking-[0.3em] font-bold">Curating Services...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (error || !services || services.length === 0) {
        return null;
    }

    return (
        <section className="py-32 bg-[#f7ede2] relative overflow-hidden" id="services">
            {/* Decorative background text */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -rotate-90 hidden lg:block select-none pointer-events-none">
                <span className="text-[12vw] font-black text-[#cd6133]/5 whitespace-nowrap uppercase tracking-[0.5em]">
                    Authentic Beauty
                </span>
            </div>

            <div className="max-w-7xl mx-auto px-8 relative z-10">
                <Reveal>
                    <div className="text-center mb-24">
                        <span className="block text-[11px] tracking-[0.5em] uppercase text-[#cd6133] font-extrabold mb-6">Pricing & Rituals</span>
                        <h2 className="text-6xl text-[#5a3d2b] font-bold mb-8">Our Services</h2>
                        <div className="w-24 h-1 bg-[#cd6133]/20 mx-auto" />
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {services.map((service, i) => (
                        <ServiceCard
                            key={service.id || i}
                            service={service}
                            index={i}
                            onBookNow={onBookService}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SalonServices;
