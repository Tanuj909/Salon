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
            <div className="group bg-white rounded-3xl overflow-hidden border border-[#C8A951]/5 hover:border-[#C8A951]/20 hover:shadow-[0_30px_60px_-12px_rgba(200,169,81,0.15)] transition-all duration-500 hover:-translate-y-2 relative flex flex-col h-full">
                {/* Service Image */}
                {service.imageUrl && (
                    <div className="h-52 overflow-hidden relative">
                        <img
                            src={service.imageUrl}
                            alt={service.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            onError={(e) => { e.target.style.display = "none"; }}
                        />

                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex items-center gap-2">
                            {service.isPopular && (
                                <div className="bg-[#C8A951] text-[#1C1C1C] text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-1.5">
                                    <FireIcon /> Popular
                                </div>
                            )}
                        </div>

                        {service.category && (
                            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[9px] font-bold text-[#1C1C1C] shadow-sm uppercase tracking-widest border border-white/50">
                                {service.category}
                            </div>
                        )}

                        {/* Discount ribbon */}
                        {hasDiscount && (
                            <div className="absolute top-4 right-4 bg-[#ef4444] text-white text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                                {Math.round(((service.price - service.discountedPrice) / service.price) * 100)}% OFF
                            </div>
                        )}
                    </div>
                )}

                {/* No image fallback — show badges inline */}
                {!service.imageUrl && (
                    <div className="h-40 bg-gradient-to-br from-[#F7F3EE] to-[#f0e9dc] flex items-center justify-center relative">
                        <svg width={48} height={48} viewBox="0 0 24 24" fill="none" stroke="#C8A951" strokeWidth={1} opacity={0.3}>
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>

                        <div className="absolute top-4 left-4 flex items-center gap-2">
                            {service.isPopular && (
                                <div className="bg-[#C8A951] text-[#1C1C1C] text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-1.5">
                                    <FireIcon /> Popular
                                </div>
                            )}
                        </div>

                        {service.category && (
                            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[9px] font-bold text-[#1C1C1C] shadow-sm uppercase tracking-widest">
                                {service.category}
                            </div>
                        )}

                        {hasDiscount && (
                            <div className="absolute top-4 right-4 bg-[#ef4444] text-white text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                                {Math.round(((service.price - service.discountedPrice) / service.price) * 100)}% OFF
                            </div>
                        )}
                    </div>
                )}

                {/* Card Content */}
                <div className="p-8 flex flex-col flex-1">
                    <div className="mb-6 flex-1">
                        <h3 className="font-[Cormorant_Garamond,Georgia,serif] text-2xl text-[#1C1C1C] mb-3 group-hover:text-[#C8A951] transition-colors leading-tight">
                            {service.name}
                        </h3>
                        {service.description && (
                            <p className="text-[#7a7065] text-sm leading-relaxed line-clamp-2">
                                {service.description}
                            </p>
                        )}
                    </div>

                    {/* Meta info row */}
                    <div className="flex items-center gap-4 mb-5 flex-wrap">
                        {service.durationMinutes && (
                            <span className="flex items-center gap-1.5 text-xs text-[#1C1C1C] font-medium">
                                <ClockIcon />
                                {service.durationMinutes} min
                            </span>
                        )}
                        {service.staffCount > 0 && (
                            <span className="flex items-center gap-1.5 text-xs text-[#9e9287] font-medium">
                                <UsersIcon />
                                {service.staffCount} {service.staffCount === 1 ? "Stylist" : "Stylists"}
                            </span>
                        )}
                        {service.totalBookings > 0 && (
                            <span className="text-[10px] text-[#9e9287] font-bold uppercase tracking-wider">
                                {service.totalBookings} booked
                            </span>
                        )}
                    </div>

                    {/* Price & Book */}
                    <div className="mt-auto">
                        <div className="flex items-end justify-between mb-6">
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-widest text-[#9e9287] font-bold mb-1">
                                    {hasDiscount ? "Special Price" : "From"}
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="font-[Cormorant_Garamond] text-3xl text-[#1C1C1C] font-semibold">
                                        ₹{displayPrice}
                                    </span>
                                    {hasDiscount && (
                                        <span className="text-sm text-[#9e9287] line-through font-light">
                                            ₹{service.price}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {service.durationMinutes && (
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] uppercase tracking-widest text-[#9e9287] font-bold mb-1">Duration</span>
                                    <span className="flex items-center gap-1.5 text-xs text-[#1C1C1C] font-medium">
                                        <ClockIcon />
                                        {service.durationMinutes} min
                                    </span>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => onBookNow?.(service)}
                            className="w-full py-4 rounded-xl bg-[#1C1C1C] text-white text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#C8A951] hover:text-[#1C1C1C] hover:shadow-lg active:scale-[0.98] cursor-pointer"
                        >
                            Book Now
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
        <section className="py-24 bg-white relative overflow-hidden" id="services">
            {/* Decorative side text */}
            <div className="absolute top-1/2 -right-40 -translate-y-1/2 rotate-90 hidden lg:block">
                <span className="text-[8vw] font-black text-[#C8A951]/5 whitespace-nowrap uppercase tracking-[0.5em] select-none">
                    LUXURY TREATMENT
                </span>
            </div>

            <div className="max-w-7xl mx-auto px-8 relative z-10">
                <Reveal>
                    <div className="text-center mb-16">
                        <span className="block text-[11px] tracking-[0.4em] uppercase text-[#C8A951] font-bold mb-4">Pricing & Collections</span>
                        <h2 className="font-[Cormorant_Garamond,Georgia,serif] text-5xl text-[#1C1C1C] mb-4">Our Services</h2>
                        <div className="w-20 h-px bg-[#C8A951]/30 mx-auto mb-3" />
                        <p className="text-[#9e9287] text-sm font-light">
                            {services.length} {services.length === 1 ? "service" : "services"} available
                        </p>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
