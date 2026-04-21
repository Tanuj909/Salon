"use client";

import React, { useRef, useEffect, useState } from "react";

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

// ─── Icons ─────────────────────────────────────────────────────────────────────
function ScissorsIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><line x1="20" y1="4" x2="8.12" y2="15.88" /><line x1="14.47" y1="14.48" x2="20" y2="20" /><line x1="8.12" y1="8.12" x2="12" y2="12" />
        </svg>
    );
}

// ─── Service Card ──────────────────────────────────────────────────────────────
function ServiceCard({ service, index, onBookNow, salon }) {
    const hasDiscount = service.discountedPrice && service.discountedPrice < service.price;
    const displayPrice = service.effectivePrice || service.discountedPrice || service.price;
    const salonName = salon?.name || "Glamour Studio";
    const salonCategory = salon?.category?.name || "Premium Salon";
    const nameParts = service.name.split(/(\(.*\))/);

    return (
        <Reveal delay={index * 80}>
            <div className="group w-full max-w-[340px] mx-auto service-card-bg rounded-[18px] border overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">

                {/* Header */}
                <div className="service-card-header-bg p-4 sm:p-[0.9rem_1.25rem] shrink-0">
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                        <div className="flex items-center gap-[9px] min-w-0">
                            <div className="w-7 h-7 rounded-lg service-card-logo-bg flex items-center justify-center shrink-0">
                                <ScissorsIcon />
                            </div>
                            <div className="min-w-0">
                                <p className="service-card-salon-name text-[13px] font-medium m-0 leading-tight truncate">{salonName}</p>
                                <p className="service-card-salon-sub text-[10px] m-0 tracking-[0.05em] truncate uppercase">{salonCategory}</p>
                            </div>
                        </div>
                        {service.durationMinutes && (
                            <div className="shrink-0 flex items-center gap-1.5 bg-white/10 border border-white/10 rounded-lg px-2 py-1">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                                <p className="text-[10px] font-bold text-white m-0">{service.durationMinutes}m</p>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 min-h-[22px]">
                        {service.isPopular && (
                            <span className="service-card-badge-popular text-[10px] px-[9px] py-[3px] rounded-full font-medium whitespace-nowrap">★ Popular</span>
                        )}
                        {hasDiscount && (
                            <span className="service-card-badge-discount text-[10px] px-[9px] py-[3px] rounded-full font-medium whitespace-nowrap">
                                {Math.round(((service.price - service.discountedPrice) / service.price) * 100)}% OFF
                            </span>
                        )}
                    </div>
                </div>

                {/* Body */}
                <div className="p-[1.25rem_1.25rem_1.4rem] flex flex-col flex-1">

                    {/* Service Label + Title */}
                    <div className="pb-4 mb-4">
                        <p className="rec-section-heading-accent text-[10px] tracking-[0.18em] uppercase font-bold mb-[5px]">Service</p>
                        <h2 className="rec-section-heading text-[24px] font-bold m-0 tracking-[-0.3px] leading-tight line-clamp-2 font-[Cormorant_Garamond,serif]">
                            {nameParts.map((part, i) => (
                                part.startsWith('(') ? <span key={i} className="rec-section-heading-accent">{part}</span> : part
                            ))}
                        </h2>
                    </div>

                    {/* Price Section */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                        <div className="flex flex-col">
                            <span className="text-[14px] font-bold rec-section-heading font-[Cormorant_Garamond,serif] leading-none mb-1">
                                Price Starting from
                            </span>
                            <span className="text-[10px] uppercase tracking-widest rec-section-heading-accent font-bold">
                                All Inclusive
                            </span>
                        </div>
                        <div className="rec-section-heading text-2xl font-bold font-[Cormorant_Garamond,serif]">
                            AED {service.effectivePrice || service.price}
                        </div>
                    </div>

                    {/* CTA Button & Footer */}
                    <div className="mt-auto">
                        <button
                            onClick={() => onBookNow?.(service)}
                            className="rec-btn-primary w-full p-[14px] rounded-xl border-0 text-sm font-bold cursor-pointer tracking-[0.04em] transition-all duration-300 hover:shadow-xl active:scale-[0.98]"
                        >
                            Book Service
                        </button>
                    </div>
                </div>

            </div>
        </Reveal>
    );
}

// ─── Main Component ────────────────────────────────────────────────────────────
const SalonServices = ({ services, salon, onBookService }) => {
    if (!services || services.length === 0) {
        return null;
    }

    return (
        <section className="py-6 sm:py-8 relative overflow-hidden" id="services">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
                <Reveal>
                    <div className="text-center mb-16 sm:mb-24 relative">
                        <span className="rec-badge-top-rated-bg inline-block px-5 py-2 rounded-full text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-bold mb-5 shadow-sm">
                            Pricing &amp; Rituals
                        </span>
                        <h2 className="rec-section-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight font-[Cormorant_Garamond,serif]">
                            Our <em className="italic font-light rec-section-heading-accent">Services</em>
                        </h2>
                        <div className="flex items-center justify-center gap-3">
                            <div className="rec-section-divider w-16 h-[1.5px] rounded-full opacity-40" />
                            <div className="w-2 h-2 rounded-full rec-badge-top-rated-bg" />
                            <div className="rec-section-divider w-16 h-[1.5px] rounded-full opacity-40" />
                        </div>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 min-[500px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {services.map((service, i) => (
                        <ServiceCard
                            key={service.id || i}
                            service={service}
                            index={i}
                            onBookNow={onBookService}
                            salon={salon}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SalonServices;