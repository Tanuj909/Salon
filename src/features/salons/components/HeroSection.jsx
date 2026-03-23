import React, { useEffect, useRef, useState } from "react";

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

function useParallax() {
    const ref = useRef(null);
    useEffect(() => {
        const handleScroll = () => {
            if (ref.current) {
                const scrollY = window.scrollY;
                const element = ref.current;
                const speed = 0.3;
                element.style.transform = `translateY(${scrollY * speed}px)`;
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return ref;
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

function Badge({ children, variant = "gold" }) {
    const variants = {
        gold: "rec-badge-top-rated-bg",
        outline: "bg-transparent border rec-card-btn rec-card-btn-text",
        glass: "backdrop-blur-md bg-white/10 text-white border border-white/20",
        plum: "rec-btn-primary",
    };

    return (
        <span
            className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[8.5px] sm:text-[9.5px] font-bold tracking-widest uppercase ${variants[variant]}`}
        >
            {children}
        </span>
    );
}

const HeroSection = ({ salonImg, salon, handleBookButtonClick }) => {
    const heroRef = useParallax();

    const toTitleCase = (str) => {
        if (!str) return "";
        return str.toLowerCase().split(' ').map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');
    };

    return (
        <section className="relative min-h-[60vh] md:h-[50vh] md:min-h-[450px] overflow-hidden flex flex-col pt-28 sm:pt-24 md:pt-[7%] pb-12">
            <div ref={heroRef} className="absolute inset-0">
                {salonImg && <img src={salonImg} alt={salon.name} className="w-full h-full object-cover" />}
                {/* More prominent dark plum gradient overlay for better navbar contrast */}
                <div className="absolute inset-0 salon-detail-hero-overlay" />
            </div>

            <div className="relative z-10 flex items-center px-4 sm:px-10 md:px-16 lg:px-24">
                <div className="max-w-5xl text-[#fef9f3] w-full">

                    <Reveal delay={200}>
                        <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4 md:mb-2">
                            {salon.verificationStatus === "VERIFIED" && (
                                <Badge variant="gold">
                                    <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                    </svg>
                                    Verified Studio
                                </Badge>
                            )}
                            <Badge variant="glass">
                                {salon.isOpen ? "Open Now" : "Closed"}
                            </Badge>
                        </div>
                    </Reveal>

                    <Reveal delay={300}>
                        <h1 className="font-bold leading-[1.1] mb-2 sm:mb-3 md:mb-3 tracking-tight font-[Cormorant_Garamond,Georgia,serif]"
                            style={{ fontSize: "clamp(22px,5.5vw,56px)" }}>
                            {toTitleCase(salon.name)}
                        </h1>
                    </Reveal>

                    <Reveal delay={400}>
                        <div className="flex flex-col gap-4 md:gap-8 mb-6 md:mb-8">
                            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
                                {/* Premium Rating */}
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1 rec-section-heading-accent">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <svg key={i} width={14} height={14} className="md:w-[16px] md:h-[16px]" viewBox="0 0 24 24" fill={i < Math.round(salon.averageRating || 0) ? "currentColor" : "rgba(255,255,255,0.2)"}>
                                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-widest text-white/80">
                                        {salon.totalReviews > 0 ? `${salon.averageRating.toFixed(1)} / ${salon.totalReviews} Reviews` : "New Experience"}
                                    </span>
                                </div>

                                {/* Location & Contact */}
                                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 backdrop-blur-md bg-black/20 p-2 sm:p-3 md:p-3.5 rounded-xl sm:rounded-2xl border border-white/10 w-fit">
                                    {salon.city && (
                                        <div className="flex items-center gap-2.5 sm:gap-3 text-[#fef9f3]/90 min-w-0">
                                            <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
                                                <svg className="w-3 h-3 md:w-3.5 md:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                                    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                                                    <circle cx="12" cy="10" r="3" />
                                                </svg>
                                            </div>
                                            <div className="flex flex-col min-w-0 flex-1">
                                                <span className="text-[7px] md:text-[8px] uppercase tracking-widest text-[#fef9f3]/50 font-bold mb-0.5">Location</span>
                                                <span className="text-[9px] sm:text-[10px] md:text-[13px] font-medium line-clamp-1 break-words">{salon.address}, {salon.city}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Inline Categories */}
                            {salon.categories && salon.categories.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-4 mt-2 md:mt-0">
                                    {salon.categories.map((cat, i) => (
                                        <div key={cat.id || i} className="flex items-center gap-1.5 sm:gap-2 bg-black/30 backdrop-blur-md px-3 sm:px-4 py-1.5 rounded-full border border-white/10">
                                            <span className="w-1.5 h-1.5 rounded-full rec-badge-top-rated-bg" />
                                            <span className="text-[8px] sm:text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-white">{cat.name}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Reveal>

                    <Reveal delay={500}>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 mt-0">
                            <button
                                onClick={handleBookButtonClick}
                                className="w-full sm:w-auto group relative px-8 py-3.5 rounded-full rec-btn-primary text-white text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 border-0 cursor-pointer text-center"
                            >
                                <span className="relative z-10">Book Appointment</span>
                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            </button>
                            <a
                                href="#services"
                                className="w-full sm:w-auto flex items-center justify-center group px-8 py-3.5 rounded-full border border-white/30 text-white text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-500 hover:bg-white hover:text-[#1C3152] hover:border-white text-center"
                            >
                                <span>View Services</span>
                            </a>
                        </div>
                    </Reveal>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 hidden md:block">
                <div className="w-px h-24 bg-gradient-to-b from-white/40 to-transparent relative">
                    <div className="absolute top-0 left-0 w-full h-full hero-filter-btn-bg origin-top animate-[scroll_2s_infinite]" />
                </div>
            </div>

            <style jsx>{`
        @keyframes scroll {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
      `}</style>
        </section>
    );
};

export default HeroSection;