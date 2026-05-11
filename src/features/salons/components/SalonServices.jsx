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

// ─── Service Image Mapper ──────────────────────────────────────────────────────
const SERVICE_IMAGE_MAP = [
    // ── Salon / Beauty Services ──
    { keywords: ["beard", "trim"],          image: "/services/beardtrim.png" },
    { keywords: ["shav"],                   image: "/services/shaving.png" },
    { keywords: ["haircut", "hair cut", "cutting", "hair cutting"], image: "/services/haircut.png" },
    { keywords: ["hair color", "colour", "coloring", "colouring", "dye"], image: "/services/haircoloring.png" },
    { keywords: ["hair spa", "hairspa"],     image: "/services/hairspa.png" },
    { keywords: ["straighten", "straight", "rebond", "keratin", "smoothen"], image: "/services/hairstraighting.png" },
    { keywords: ["hair styl", "hairstyl", "blow dry", "blowdry", "blow-dry"], image: "/services/hairstyling.png" },
    { keywords: ["hair treat", "hairtreat", "botox", "protein"], image: "/services/hairtreatment.jpg" },
    { keywords: ["hair wash", "hairwash", "shampoo"], image: "/services/hairwash.png" },
    { keywords: ["head massage", "scalp"],  image: "/services/headmassage.png" },
    { keywords: ["facial", "face", "cleanup", "clean up", "clean-up"], image: "/services/facial.png" },
    { keywords: ["bleach"],                  image: "/services/bleach.png" },
    { keywords: ["detan", "de-tan", "de tan"], image: "/services/detan.png" },
    { keywords: ["manicur"],                 image: "/services/manicure.png" },
    { keywords: ["pedicur"],                 image: "/services/pedicure.png" },
    { keywords: ["nail art", "nailart"],     image: "/services/nailart.png" },
    { keywords: ["nail ext", "nailext", "acrylic nail", "gel nail"], image: "/services/nailextension.png" },
    { keywords: ["massage", "body mass"],    image: "/services/massage.png" },
    { keywords: ["threading", "thread", "eyebrow", "brow"], image: "/services/threading.png" },
    { keywords: ["wax"],                     image: "/services/waxing.png" },
    { keywords: ["makeup", "make up", "make-up", "bridal", "brdal"], image: "/services/hairstyling.png" },

    // ── Pet Services ──
    { keywords: ["pet groom", "dog groom", "cat groom", "pet haircut", "pet cut", "fur trim", "fur cut"], image: "/services/pet_grooming.jfif" },
    { keywords: ["pet bath", "pet spa", "dog bath", "cat bath", "dog spa", "cat spa", "pet wash", "dog wash"], image: "/services/pet_bath_Spa.jfif" },
    { keywords: ["pet board", "pet daycare", "dog board", "dog daycare", "cat board", "pet hostel", "pet sitting", "dog sitting"], image: "/services/pet_boarding_daycare.jfif" },
    { keywords: ["pet train", "dog train", "puppy train", "obedience", "pet behav"], image: "/services/pet_training.jfif" },
    { keywords: ["vet", "veterinar", "pet health", "pet check", "pet vaccin", "pet medical", "deworming", "tick", "flea"], image: "/services/vet_health_services.jfif" },
    { keywords: ["nail hygiene", "pet nail", "dog nail", "cat nail", "paw care", "nail care"], image: "/services/nail_hygiene_care.jfif" },

    // ── Generic fallbacks (keep last) ──
    { keywords: ["spa"],                     image: "/services/hairspa.png" },
    { keywords: ["hair"],                    image: "/services/haircut.png" },
    { keywords: ["nail"],                    image: "/services/nailart.png" },
];

/**
 * Returns the matching service image path, or null if no match is found.
 * When null is returned the image section will be hidden on the card.
 */
function getServiceImage(serviceName) {
    if (!serviceName) return null;
    const name = serviceName.toLowerCase();
    for (const entry of SERVICE_IMAGE_MAP) {
        if (entry.keywords.some((kw) => name.includes(kw))) {
            return entry.image;
        }
    }
    return null;
}

// ─── Service Card ──────────────────────────────────────────────────────────────
function ServiceCard({ service, index, onBookNow, salon }) {
    const salonName = salon?.name || "Glamour Studio";
    const salonCategory = salon?.category?.name || "Premium Salon";
    const serviceImage = getServiceImage(service.name);
    const [showPreview, setShowPreview] = useState(false);

    return (
        <Reveal delay={index * 80}>
            <div className="group w-full max-w-[340px] mx-auto service-card-bg rounded-[18px] border overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col relative">

                {/* Image Preview Overlay */}
                {showPreview && serviceImage && (
                    <div
                        className="absolute inset-0 z-20 flex items-center justify-center rounded-[18px]"
                        style={{ backgroundColor: "rgba(0,0,0,0.85)", animation: "servicePreviewFadeIn 0.2s ease-out" }}
                        onClick={() => setShowPreview(false)}
                    >
                        <button
                            onClick={(e) => { e.stopPropagation(); setShowPreview(false); }}
                            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-white/30 hover:scale-110 active:scale-95 z-30"
                            aria-label="Close preview"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                        <img
                            src={serviceImage}
                            alt={service.name}
                            className="max-w-[85%] max-h-[85%] object-contain rounded-2xl shadow-2xl"
                            style={{ animation: "servicePreviewScaleIn 0.25s ease-out" }}
                        />
                    </div>
                )}

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
                    </div>
                </div>

                {/* Body */}
                <div className="p-[1.25rem_1.25rem_1.4rem] flex flex-col flex-1">

                    {/* Service Label + Title + Image */}
                    <div className="pb-4 mb-4 flex items-center gap-4">
                        <div className="flex-1 min-w-0">
                            <p className="rec-section-heading-accent text-[10px] tracking-[0.18em] uppercase font-bold mb-[5px]">Service</p>
                            <h2 className="rec-section-heading text-[24px] font-bold m-0 tracking-[-0.3px] leading-tight line-clamp-2 font-[Cormorant_Garamond,serif]">
                                {service.name}
                            </h2>
                        </div>
                        {serviceImage && (
                            <div
                                className="w-[72px] h-[72px] rounded-2xl overflow-hidden shrink-0 shadow-lg border border-white/10 cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
                                onClick={() => setShowPreview(true)}
                                title="Click to preview"
                            >
                                <img
                                    src={serviceImage}
                                    alt={service.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    loading="lazy"
                                />
                            </div>
                        )}
                    </div>

                    {/* Price Section */}
                    <div className="space-y-2 mb-6">
                        <div className="flex items-center justify-between">
                            <span className="text-[12px] font-bold rec-section-heading font-[Cormorant_Garamond,serif]">
                                Start Price
                            </span>
                            <span className="text-[16px] font-bold rec-section-heading-accent font-[Cormorant_Garamond,serif]">
                                AED {service.startPrice || service.price}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[12px] font-bold rec-section-heading font-[Cormorant_Garamond,serif]">
                                End Price
                            </span>
                            <span className="text-[16px] font-bold rec-section-heading-accent font-[Cormorant_Garamond,serif]">
                                AED {service.endPrice || service.price}
                            </span>
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