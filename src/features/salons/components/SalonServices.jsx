"use client";

import React from "react";
import { useSalonServices } from "../hooks/useSalonServices";
import { useRef, useEffect, useState } from "react";

// ─── Reveal Animation Component (Local copy for independence) ────────────────
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

// ─── Service Card Component ──────────────────────────────────────────────────
function ServiceCard({ service, index }) {
    return (
        <Reveal delay={index * 100}>
            <div className="group bg-white rounded-3xl overflow-hidden border border-[#C8A951]/5 hover:border-[#C8A951]/20 hover:shadow-[0_30px_60px_-12px_rgba(200,169,81,0.15)] transition-all duration-500 hover:-translate-y-2 relative flex flex-col h-full">
                {/* Service Image */}
                {service.imageUrl && (
                    <div className="h-48 overflow-hidden relative">
                        <img
                            src={service.imageUrl}
                            alt={service.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        {service.isPopular && (
                            <div className="absolute top-4 left-4 bg-[#C8A951] text-[#1C1C1C] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                                Popular
                            </div>
                        )}
                        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-[#1C1C1C] shadow-sm uppercase tracking-widest">
                            {service.category}
                        </div>
                    </div>
                )}

                <div className="p-8 flex flex-col flex-1">
                    <div className="mb-6 flex-1">
                        <h3 className="font-[Cormorant_Garamond,Georgia,serif] text-2xl text-[#1C1C1C] mb-3 group-hover:text-[#C8A951] transition-colors">{service.name}</h3>
                        <p className="text-[#7a7065] text-sm leading-relaxed line-clamp-2">{service.description}</p>
                    </div>

                    <div className="mt-auto">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-widest text-[#9e9287] font-bold mb-1">From</span>
                                <div className="flex items-center gap-2">
                                    <span className="font-[Cormorant_Garamond] text-3xl text-[#1C1C1C] font-semibold">
                                        ₹{service.effectivePrice || service.price}
                                    </span>
                                    {service.discountedPrice && service.discountedPrice < service.price && (
                                        <span className="text-sm text-[#9e9287] line-through font-light">₹{service.price}</span>
                                    )}
                                </div>
                            </div>

                            {service.durationMinutes && (
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] uppercase tracking-widest text-[#9e9287] font-bold mb-1">Time</span>
                                    <span className="flex items-center gap-1.5 text-xs text-[#1C1C1C] font-medium">
                                        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#C8A951" strokeWidth={2}>
                                            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                                        </svg>
                                        {service.durationMinutes} min
                                    </span>
                                </div>
                            )}
                        </div>

                        <button className="w-full py-4 rounded-xl bg-[#1C1C1C] text-white text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#C8A951] hover:text-[#1C1C1C] hover:shadow-lg active:scale-95">Book Now</button>
                    </div>
                </div>
            </div>
        </Reveal>
    );
}

// ─── Main Services Component ─────────────────────────────────────────────────
const SalonServices = ({ id }) => {
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
        return null; // Don't render sections with no data as requested
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
                        <div className="w-20 h-px bg-[#C8A951]/30 mx-auto" />
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {services.map((service, i) => (
                        <ServiceCard key={service.id || i} service={service} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SalonServices;
