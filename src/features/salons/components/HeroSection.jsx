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
            { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
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

function Badge({ children, variant = "gold" }) {
    const variants = {
        gold: "bg-[#cd6133] text-[#fef9f3]",
        outline: "bg-transparent border border-[#cd6133] text-[#cd6133]",
        glass: "backdrop-blur-md bg-white/10 text-white border border-white/20",
        plum: "bg-[#4b3621] text-[#fef9f3]",
    };

    return (
        <span
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase ${variants[variant]}`}
        >
            {children}
        </span>
    );
}

const HeroSection = ({ salonImg, salon, handleBookButtonClick }) => {
    const heroRef = useParallax();

    return (
        <section className="relative h-[auto] md:h-[65vh] min-h-[100svh] md:min-h-[600px] overflow-hidden flex flex-col justify-center">
            <div ref={heroRef} className="absolute inset-0">
                {salonImg && <img src={salonImg} alt={salon.name} className="w-full h-full object-cover" />}
                {/* Subtle dark plum gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#4b3621]/90 via-[#4b3621]/60 to-[#4b3621]/90" />
            </div>

            <div className="relative z-10 flex items-center px-5 md:px-16 lg:px-24">
                <div className="max-w-5xl text-[#fef9f3] mt-24 md:mt-20 w-full">

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
                        <h1 className="font-bold leading-[1.1] mb-6 md:mb-6 uppercase tracking-tight"
                            style={{ fontSize: "clamp(32px,7vw,80px)" }}>
                            {salon.name}
                        </h1>
                    </Reveal>

                    <Reveal delay={400}>
                        <div className="flex flex-col gap-6 md:gap-8 mb-10 md:mb-12">
                            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
                                {/* Premium Rating */}
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1 text-[#C8A951]">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <svg key={i} width={16} height={16} className="md:w-[20px] md:h-[20px]" viewBox="0 0 24 24" fill={i < Math.round(salon.averageRating || 0) ? "#cd6133" : "rgba(255,255,255,0.2)"}>
                                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="text-[10px] md:text-[12px] font-bold uppercase tracking-widest text-[#fef9f3]/80">
                                        {salon.totalReviews > 0 ? `${salon.averageRating.toFixed(1)} / ${salon.totalReviews} Reviews` : "New Experience"}
                                    </span>
                                </div>

                                {/* Location & Contact */}
                                <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 w-full backdrop-blur-md bg-black/20 p-5 md:p-6 rounded-3xl border border-white/10">
                                    {salon.city && (
                                        <div className="flex items-center gap-3 text-[#fef9f3]/90">
                                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
                                                <svg className="w-4 h-4 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                                    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                                                    <circle cx="12" cy="10" r="3" />
                                                </svg>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[8px] md:text-[9px] uppercase tracking-widest text-[#fef9f3]/50 font-bold mb-0.5">Location</span>
                                                <span className="text-[11px] md:text-sm font-medium line-clamp-1 break-all">{salon.address}, {salon.city}</span>
                                            </div>
                                        </div>
                                    )}

                                    {salon.phoneNumber && (
                                        <div className="flex items-center gap-3 text-[#fef9f3]/90 mt-2 sm:mt-0">
                                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
                                                <svg className="w-4 h-4 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                                                </svg>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[8px] md:text-[9px] uppercase tracking-widest text-[#fef9f3]/50 font-bold mb-0.5">Contact</span>
                                                <span className="text-xs md:text-sm font-medium">{salon.phoneNumber}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Inline Categories */}
                            {salon.categories && salon.categories.length > 0 && (
                                <div className="flex flex-wrap gap-2 md:gap-4 mt-2 md:mt-0">
                                    {salon.categories.map((cat, i) => (
                                        <div key={cat.id || i} className="flex items-center gap-2 md:gap-3 bg-black/20 backdrop-blur-md px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/10">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#cd6133]" />
                                            <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-[#fef9f3]">{cat.name}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Reveal>

                    <Reveal delay={500}>
                        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mt-2">
                            <button
                                onClick={handleBookButtonClick}
                                className="w-full sm:w-auto group relative px-8 py-4 md:py-4 rounded-full bg-[#cd6133] text-[#fef9f3] text-[10px] font-bold tracking-[0.3em] uppercase overflow-hidden transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(205,97,51,0.5)] hover:-translate-y-1 border-0 cursor-pointer text-center"
                            >
                                <span className="relative z-10">Book Appointment</span>
                                <div className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            </button>
                            <a
                                href="#services"
                                className="w-full sm:w-auto flex items-center justify-center group px-8 py-4 md:py-4 rounded-full border border-[#fef9f3]/30 text-[#fef9f3] text-[10px] font-bold tracking-[0.3em] uppercase transition-all duration-500 hover:bg-[#fef9f3] hover:text-[#4b3621] hover:border-[#fef9f3] text-center"
                            >
                                <span>View Services</span>
                            </a>
                        </div>
                    </Reveal>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 hidden md:block">
                <div className="w-px h-24 bg-gradient-to-b from-[#fef9f3]/40 to-transparent relative">
                    <div className="absolute top-0 left-0 w-full h-full bg-[#cd6133] origin-top animate-[scroll_2s_infinite]" />
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
