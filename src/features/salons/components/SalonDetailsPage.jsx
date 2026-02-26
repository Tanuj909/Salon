"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSalonDetails } from "../hooks/useSalonDetails";

// ─── Custom Hooks ────────────────────────────────────────────────────────────
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

// ─── Components ───────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function SectionHeading({ subtitle, title, description, align = "left", mb = "mb-12" }) {
  const words = title.split(" ");
  const lastWord = words.pop();
  const mainTitle = words.join(" ");

  return (
    <div className={`${mb} ${align === "center" ? "text-center mx-auto" : ""}`}>
      <span className="block text-[10px] tracking-[0.4em] uppercase text-[#C8A951] font-semibold mb-4 opacity-90">
        {subtitle}
      </span>
      <h2
        className="font-[Cormorant_Garamond,Georgia,serif] font-light text-[#1C1C1C] leading-[1.1] mb-6"
        style={{ fontSize: "clamp(36px,5vw,52px)" }}
      >
        {mainTitle}{" "}
        <em className="italic text-[#C8A951] block md:inline">{lastWord}</em>
      </h2>
      {description && (
        <p className="text-[#7a7065] text-[15px] leading-relaxed font-light opacity-80">
          {description}
        </p>
      )}
    </div>
  );
}

function Stars({ rating, size = 14 }) {
  return (
    <span className="text-[#C8A951]" style={{ fontSize: size, letterSpacing: 2 }}>
      {"★".repeat(Math.round(rating))}{"☆".repeat(5 - Math.round(rating))}
    </span>
  );
}

function Badge({ children, variant = "gold" }) {
  const variants = {
    gold: "bg-[#C8A951] text-[#1C1C1C]",
    outline: "bg-transparent border border-[#C8A951] text-[#C8A951]",
    glass: "backdrop-blur-md bg-white/10 text-white border border-white/20",
    dark: "bg-[#1C1C1C] text-[#C8A951]",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wide ${variants[variant]}`}
    >
      {children}
    </span>
  );
}

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function SalonDetailsPage({ id }) {
  const { salon, loading, error } = useSalonDetails(id);
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const today = DAY_NAMES[new Date().getDay()];
  const heroRef = useParallax();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F3EE] flex flex-col items-center justify-center gap-4 font-[Jost,sans-serif]">
        <div className="w-12 h-12 border-4 border-[#C8A951]/20 border-t-[#C8A951] rounded-full animate-spin" />
        <p className="text-[#7a7065] text-lg">Loading salon details...</p>
      </div>
    );
  }

  if (error || !salon) {
    return (
      <div className="min-h-screen bg-[#F7F3EE] flex flex-col items-center justify-center gap-4 font-[Jost,sans-serif]">
        <p className="text-[#7a7065] text-lg">{error || "Salon not found."}</p>
        <Link href="/salons" className="text-[#C8A951] underline text-sm">
          ← Back to all salons
        </Link>
      </div>
    );
  }

  // Create a combined object for UI compatibility
  const salonImg = salon.bannerImageUrl || (salon.imageUrls && salon.imageUrls.length > 0 ? salon.imageUrls[0] : "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=60");
  const locationText = [salon.address, salon.city, salon.state, salon.postalCode, salon.country].filter(Boolean).join(", ");

  return (
    <div className="min-h-screen bg-[#F7F3EE] font-[Jost,sans-serif] font-light">
      {/* ═══════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════ */}
      <section className="relative h-[65vh] min-h-[500px] overflow-hidden">
        <div ref={heroRef} className="absolute inset-0">
          <img src={salonImg} alt={salon.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-[#1C1C1C]/40 to-transparent" />
        </div>

        <nav className="absolute top-0 left-0 right-0 z-20 px-8 py-6 flex justify-between items-center">
             <Link href="/salons" className="p-2 text-white/80 hover:text-white transition-colors bg-black/20 rounded-full backdrop-blur-sm">
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </Link>
          <div className="flex gap-2">
            <button className="p-2 text-white/80 hover:text-white transition-colors bg-black/20 rounded-full backdrop-blur-sm">
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 z-10 px-8 md:px-16 pb-16 md:pb-24 text-white">
          <div className="max-w-4xl">
            <Reveal delay={200}>
              <div className="flex gap-3 flex-wrap mb-6">
                {salon.verificationStatus === "VERIFIED" && (
                  <Badge variant="glass">
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path d="M9 12l2 2 4-4" />
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    Verified
                  </Badge>
                )}
                <Badge variant="glass">
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="5" />
                  </svg>
                  {salon.isOpen ? "Open Now" : "Closed"}
                </Badge>
                {salon.categories?.map((cat, idx) => (
                  <Badge key={idx} variant="outline" className="text-white border-white/40">
                    {cat.name}
                  </Badge>
                ))}
              </div>
            </Reveal>

            <Reveal delay={300}>
              <h1 className="font-[Cormorant_Garamond,Georgia,serif] font-light leading-[1.1] mb-4 text-white"
                style={{ fontSize: "clamp(48px,8vw,96px)" }}>
                {salon.name?.split(" ").map((word, i, arr) =>
                  i === arr.length - 1 ? (
                    <em key={i} className="italic text-[#C8A951] block md:inline">{word}</em>
                  ) : (
                    <span key={i} className="block md:inline">{word} </span>
                  )
                )}
              </h1>
            </Reveal>

            <Reveal delay={400}>
              <div className="flex items-center gap-6 flex-wrap mb-8">
                <div className="flex items-center gap-3">
                  <Stars rating={salon.averageRating || 0} size={20} />
                  <span className="text-white/80 text-sm">{(salon.averageRating || 0).toFixed(1)} · {salon.totalReviews || 0} reviews</span>
                </div>
                {salon.city && (
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                      <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{salon.city}</span>
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal delay={500}>
              <div className="flex gap-4 flex-wrap">
                <a href="#booking" className="group inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-[#C8A951] text-[#1C1C1C] text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:bg-[#d4b55f] hover:shadow-[0_10px_30px_-5px_rgba(200,169,81,0.5)]">
                  <span>Book Appointment</span>
                  <svg className="group-hover:translate-x-1 transition-transform" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ABOUT SECTION
      ═══════════════════════════════════════════ */}
      <section className="py-12 px-8 max-w-7xl mx-auto" id="about">
        <Reveal>
          <div className={`grid ${salon.description ? 'lg:grid-cols-4' : 'lg:grid-cols-2'} border border-[#C8A951]/20 rounded-2xl overflow-hidden bg-white shadow-[0_20px_50px_-20px_rgba(200,169,81,0.1)]`}>
            <div className="lg:col-span-1 p-8 bg-[#FDFAF6] border-b lg:border-b-0 lg:border-r border-[#C8A951]/10 flex flex-col justify-center">
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#C8A951] font-semibold mb-2">Details</span>
              <h2 className="font-[Cormorant_Garamond] text-3xl text-[#1C1C1C] leading-tight">
                {salon.name}
              </h2>
            </div>

            {salon.description && (
              <div className="lg:col-span-2 p-8 border-b lg:border-b-0 lg:border-r border-[#C8A951]/10 flex items-center">
                <p className="text-[#7a7065] text-[13px] leading-relaxed font-light italic">
                  "{salon.description}"
                </p>
              </div>
            )}

            <div className={`lg:col-span-1 grid grid-cols-2`}>
              <div className="p-6 border-r border-b border-[#C8A951]/10 flex flex-col items-center justify-center text-center">
                <span className="text-[9px] uppercase tracking-widest text-[#C8A951] mb-1">Rating</span>
                <span className="font-[Cormorant_Garamond] text-2xl text-[#1C1C1C] leading-none">{(salon.averageRating || 0).toFixed(1)}</span>
              </div>
              <div className="p-6 border-b border-[#C8A951]/10 flex flex-col items-center justify-center text-center">
                <span className="text-[9px] uppercase tracking-widest text-[#C8A951] mb-1">Reviews</span>
                <span className="font-[Cormorant_Garamond] text-2xl text-[#1C1C1C] leading-none">{salon.totalReviews || 0}</span>
              </div>
              <div className="p-6 border-r border-[#C8A951]/10 flex flex-col items-center justify-center text-center">
                <span className="text-[9px] uppercase tracking-widest text-[#C8A951] mb-1">Bookings</span>
                <span className="font-[Cormorant_Garamond] text-2xl text-[#1C1C1C] leading-none">{salon.totalBookings || 0}</span>
              </div>
              <div className="p-6 flex flex-col items-center justify-center text-center">
                <span className="text-[9px] uppercase tracking-widest text-[#C8A951] mb-1">Verified</span>
                <span className="font-[Cormorant_Garamond] text-2xl text-[#1C1C1C] leading-none">{salon.verificationStatus === "VERIFIED" ? "✓" : "–"}</span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════
          CATEGORIES SECTION
      ═══════════════════════════════════════════ */}
      {salon.categories && salon.categories.length > 0 && (
        <section className="py-16 px-8 max-w-7xl mx-auto" id="categories">
          <Reveal>
            <SectionHeading
              subtitle="Specialties"
              title="Tailored For"
              align="center"
              mb="mb-10"
            />
          </Reveal>

          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {salon.categories.map((cat, i) => (
              <Reveal key={cat.id || i} delay={i * 100}>
                <div className="flex flex-col items-center group">
                  <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border border-[#C8A951]/20 bg-white shadow-[0_10px_30px_-10px_rgba(200,169,81,0.1)] flex items-center justify-center p-6 text-center transition-all duration-500 hover:border-[#C8A951] hover:shadow-[#C8A951]/30 hover:-translate-y-2 relative overflow-hidden group">
                    {/* Decorative Ring */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#C8A951]/10 rounded-full scale-90 group-hover:scale-100 transition-transform duration-700" />
                    
                    <span className="font-[Cormorant_Garamond] text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-[#1C1C1C] z-10 group-hover:text-[#C8A951] transition-colors duration-300">
                      {cat.name}
                    </span>
                    
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#C8A951]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          SERVICES SECTION
      ═══════════════════════════════════════════ */}
      {salon.services && salon.services.length > 0 && (
        <section className="py-20 bg-[#FDFAF6]" id="services">
          <div className="max-w-7xl mx-auto px-8">
            <Reveal>
              <SectionHeading
                subtitle="Expertise"
                title="Our Services"
                description="Professional beauty and grooming services tailored to your needs."
                align="center"
              />
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {salon.services.map((service, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-[#C8A951]/5 rounded-bl-[100%] group-hover:bg-[#C8A951]/10 transition-colors" />
                    <h3 className="font-[Cormorant_Garamond,Georgia,serif] text-2xl text-[#1C1C1C] mb-3">{service.name}</h3>
                    <p className="text-[#7a7065] text-sm leading-relaxed mb-4">{service.description || service.desc}</p>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-[Cormorant_Garamond,Georgia,serif] text-2xl text-[#1C1C1C]">
                        {typeof service.price === 'number' ? `₹${service.price}` : service.price}
                      </span>
                      {service.duration && (
                        <span className="flex items-center gap-1 text-xs text-[#9e9287]">
                          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                          </svg>
                          {service.duration}
                        </span>
                      )}
                    </div>
                    <button className="w-full py-3 rounded-lg bg-[#1C1C1C] text-[#C8A951] text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:bg-[#2a2a2a] hover:shadow-lg">Book Now</button>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          LOCATION SECTION
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-8 max-w-7xl mx-auto" id="location">
        <div className="grid lg:grid-cols-2 gap-12">
          <Reveal>
            <SectionHeading subtitle="Visit Us" title="Our Location" />
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-[#f5edce] flex items-center justify-center flex-shrink-0">
                  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#C8A951" strokeWidth={1.8}>
                    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium uppercase tracking-wider text-[#7a7065] mb-1">Address</h4>
                  <p className="text-lg text-[#1C1C1C]">{locationText}</p>
                  {salon.phoneNumber && <p className="text-sm text-[#7a7065] mt-2">Tel: {salon.phoneNumber}</p>}
                  {salon.email && <p className="text-sm text-[#7a7065]">Email: {salon.email}</p>}
                </div>
              </div>

              {salon.timings && (
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#f5edce] flex items-center justify-center flex-shrink-0">
                    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#C8A951" strokeWidth={1.8}>
                      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium uppercase tracking-wider text-[#7a7065] mb-1">Hours</h4>
                    <div className="space-y-2">
                      {salon.timings.map((t, idx) => (
                        <div key={idx} className="flex items-center justify-between gap-8">
                          <span className={`text-sm ${t.day === today ? "text-[#C8A951] font-medium" : "text-[#7a7065]"}`}>{t.day}</span>
                          <span className="text-sm text-[#1C1C1C]">{t.open ? `${t.open} - ${t.close}` : "Closed"}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Reveal>

          {salon.latitude && salon.longitude && (
            <Reveal delay={150}>
              <div className="rounded-2xl overflow-hidden shadow-2xl h-full min-h-[400px]">
                <iframe
                  src={`https://maps.google.com/maps?q=${salon.latitude},${salon.longitude}&z=15&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          BOOKING CTA
      ═══════════════════════════════════════════ */}
      <section className="py-20 bg-[#1C1C1C] text-center" id="booking">
        <div className="max-w-3xl mx-auto px-8">
          <Reveal>
            <span className="block text-xs tracking-[0.3em] uppercase text-[#C8A951] font-medium mb-4">Ready to Transform?</span>
            <h2 className="font-[Cormorant_Garamond,Georgia,serif] font-light text-white text-5xl md:text-6xl mb-6">
              Book Your <em className="italic text-[#C8A951]">Experience</em>
            </h2>
            <p className="text-white/60 text-lg mb-10 font-light">Join us for a journey of beauty and relaxation. Our team is ready to welcome you.</p>
            <button className="px-10 py-4 rounded-lg bg-[#C8A951] text-[#1C1C1C] text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:bg-[#d4b55f]">Book Appointment</button>
          </Reveal>
        </div>
      </section>

      {/* Global Styles */}
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
      `}</style>
    </div>
  );
}
