"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSalonDetails } from "../hooks/useSalonDetails";
import SalonStaff from "./SalonStaff";

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
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
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
  const salonImg = salon.bannerImageUrl || (salon.imageUrls && salon.imageUrls.length > 0 ? salon.imageUrls[0] : "");
  const locationText = [salon.address, salon.city, salon.state, salon.postalCode, salon.country]
    .filter(Boolean)
    .filter(str => !str.includes("Coordinates:")) // Filter out placeholder coordinates string if full details exist
    .join(", ") || salon.address;

  return (
    <div className="min-h-screen bg-[#F7F3EE] font-[Jost,sans-serif] font-light">
      {/* ═══════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════ */}
      <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
        <div ref={heroRef} className="absolute inset-0">
          <img src={salonImg} alt={salon.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="absolute inset-0 z-10 flex items-center px-8 md:px-16 lg:px-24">
          <div className="max-w-4xl text-white">
            <Reveal delay={100}>
              <button onClick={() => window.history.back()} className="inline-flex items-center gap-2 text-white/70 hover:text-[#C8A951] transition-all mb-8 group bg-transparent border-0 cursor-pointer">
                <svg className="group-hover:-translate-x-1 transition-transform" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <span className="text-xs uppercase tracking-[0.2em] font-medium">Explore Salons</span>
              </button>
            </Reveal>

            <Reveal delay={200}>
              <div className="flex items-center gap-3 mb-6">
                {salon.verificationStatus === "VERIFIED" && (
                  <div className="flex items-center gap-1.5 bg-blue-500/90 text-white px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold shadow-lg">
                    <svg width={12} height={12} viewBox="0 0 24 24" fill="white">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    Verified Salon
                  </div>
                )}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold">
                  {salon.isOpen ? "Open Now" : "Closed"}
                </div>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <h1 className="font-[Cormorant_Garamond,Georgia,serif] font-bold leading-tight mb-4 text-white uppercase tracking-tight"
                style={{ fontSize: "clamp(48px,7vw,84px)" }}>
                {salon.name}
              </h1>
            </Reveal>

            <Reveal delay={400}>
              <div className="flex items-center gap-6 flex-wrap mb-10">
                <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                  <div className="flex items-center gap-1 text-[#C8A951]">
                    <span className="text-lg font-bold">
                      {salon.averageRating > 0 ? salon.averageRating.toFixed(1) : "New"}
                    </span>
                    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </div>
                  <div className="w-px h-4 bg-white/20" />
                  <span className="text-white/80 text-xs font-medium uppercase tracking-wider">
                    {salon.totalReviews > 0 ? `${salon.totalReviews} Reviews` : "No Reviews Yet"}
                  </span>
                </div>

                {salon.city && (
                  <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <span>{salon.city}</span>
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal delay={500}>
              <div className="flex gap-4 sm:gap-6 flex-wrap">
                <a href="#booking" className="group relative px-10 py-5 rounded-full bg-[#C8A951] text-[#1C1C1C] text-sm font-bold tracking-widest uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_-10px_rgba(200,169,81,0.4)] hover:-translate-y-1">
                  <span className="relative z-10">Book Appointment</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </a>
                <a href="#services" className="group px-10 py-5 rounded-full border-2 border-white text-white text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:bg-white hover:text-black">
                  <span>View Services</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ABOUT SECTION
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-8 max-w-7xl mx-auto" id="about">
        <Reveal>
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Left: Bio */}
            <div className="lg:w-3/5">
              <span className="block text-[11px] tracking-[0.4em] uppercase text-[#C8A951] font-bold mb-6">Our Story</span>
              <h2 className="font-[Cormorant_Garamond,Georgia,serif] text-5xl text-[#1C1C1C] leading-tight mb-8">
                About <em className="italic text-[#C8A951]">Us</em>
              </h2>
              <p className="text-[#7a7065] text-lg leading-relaxed font-light mb-8 max-w-2xl">
                {salon.description}
              </p>
              <div className="w-24 h-px bg-[#C8A951]/30" />
            </div>

            {/* Right: Quick Info Cards */}
            <div className="lg:w-2/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#C8A951]/5 hover:border-[#C8A951]/20 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-[#f5edce] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#C8A951" strokeWidth={2}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <h4 className="text-[10px] uppercase tracking-widest text-[#9e9287] font-bold mb-1">Address</h4>
                <p className="text-sm text-[#1C1C1C] font-medium leading-snug">{salon.address}, {salon.city}</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#C8A951]/5 hover:border-[#C8A951]/20 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-[#f5edce] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#C8A951" strokeWidth={2}>
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <h4 className="text-[10px] uppercase tracking-widest text-[#9e9287] font-bold mb-1">Working Hours</h4>
                <p className="text-sm text-[#1C1C1C] font-medium leading-snug">
                  {salon.timings?.find(t => t.day === today)?.open} - {salon.timings?.find(t => t.day === today)?.close}
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#C8A951]/5 hover:border-[#C8A951]/20 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-[#f5edce] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#C8A951" strokeWidth={2}>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <h4 className="text-[10px] uppercase tracking-widest text-[#9e9287] font-bold mb-1">Contact</h4>
                <p className="text-sm text-[#1C1C1C] font-medium leading-snug">{salon.phoneNumber}</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#C8A951]/5 hover:border-[#C8A951]/20 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-[#f5edce] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#C8A951" strokeWidth={2}>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h4 className="text-[10px] uppercase tracking-widest text-[#9e9287] font-bold mb-1">Registration</h4>
                <p className="text-sm text-[#1C1C1C] font-medium leading-snug">{salon.registrationNumber}</p>
              </div>
            </div>
          </div>
          <div className="mt-20 h-px bg-gradient-to-r from-transparent via-[#C8A951]/20 to-transparent" />
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════
          CATEGORIES SECTION
      ═══════════════════════════════════════════ */}
      {salon.categories && salon.categories.length > 0 && (
        <section className="py-20 px-8 max-w-7xl mx-auto" id="categories">
          <Reveal>
            <div className="text-center mb-16">
              <span className="block text-[11px] tracking-[0.4em] uppercase text-[#C8A951] font-bold mb-4">Our Expertise</span>
              <h2 className="font-[Cormorant_Garamond,Georgia,serif] text-5xl text-[#1C1C1C] leading-tight">
                Categories
              </h2>
            </div>
          </Reveal>

          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {salon.categories.map((cat, i) => (
              <Reveal key={cat.id || i} delay={i * 100}>
                <div className="flex flex-col items-center group cursor-pointer">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl border border-[#C8A951]/10 bg-white shadow-[0_15px_35px_-15px_rgba(200,169,81,0.1)] flex flex-col items-center justify-center p-8 text-center transition-all duration-500 hover:border-[#C8A951]/40 hover:shadow-[0_25px_50px_-12px_rgba(200,169,81,0.2)] hover:-translate-y-2 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#C8A951]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Icon based on Category Name */}
                    <div className="mb-3 text-[#C8A951] group-hover:scale-110 transition-transform duration-500">
                      {cat.name.toUpperCase() === "MEN" && (
                        <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" /></svg>
                      )}
                      {cat.name.toUpperCase() === "WOMEN" && (
                        <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                      )}
                      {cat.name.toUpperCase() === "CHILDREN" && (
                        <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zM2 20c0-2 4-3 5-3 .34 0 .65.04.93.11A6.38 6.38 0 0 1 12 15a6.38 6.38 0 0 1 4.07 2.11c.28-.07.59-.11.93-.11 1 0 5 1 5 3v2H2z" /></svg>
                      )}
                      {cat.name.toUpperCase() === "PETS" && (
                        <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><circle cx="6.5" cy="5.5" r="2.5" /><circle cx="10" cy="5" r="2.5" /><circle cx="14" cy="5" r="2.5" /><circle cx="17.5" cy="5.5" r="2.5" /><path d="M12 10a5 5 0 0 1 5 5v3l-5 2-5-2v-3a5 5 0 0 1 5-5z" /></svg>
                      )}
                      {!["MEN", "WOMEN", "CHILDREN", "PETS"].includes(cat.name.toUpperCase()) && (
                        <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M20 7h-9l-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" /></svg>
                      )}
                    </div>

                    <span className="font-[Cormorant_Garamond] text-sm md:text-base font-bold tracking-[0.2em] uppercase text-[#1C1C1C] z-10 group-hover:text-[#C8A951] transition-colors duration-300">
                      {cat.name}
                    </span>
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
        <section className="py-24 bg-white" id="services">
          <div className="max-w-7xl mx-auto px-8">
            <Reveal>
              <div className="text-center mb-16">
                <span className="block text-[11px] tracking-[0.4em] uppercase text-[#C8A951] font-bold mb-4">Pricing & Services</span>
                <h2 className="font-[Cormorant_Garamond,Georgia,serif] text-5xl text-[#1C1C1C]">Our Services</h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {salon.services.map((service, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="group bg-[#FDFAF6] rounded-3xl p-10 border border-[#C8A951]/5 hover:border-[#C8A951]/20 hover:bg-white hover:shadow-[0_30px_60px_-12px_rgba(200,169,81,0.15)] transition-all duration-500 hover:-translate-y-2 relative flex flex-col h-full">
                    <div className="mb-8">
                      <h3 className="font-[Cormorant_Garamond,Georgia,serif] text-3xl text-[#1C1C1C] mb-4 group-hover:text-[#C8A951] transition-colors">{service.name}</h3>
                      <p className="text-[#7a7065] text-sm leading-relaxed line-clamp-2">{service.description || service.desc}</p>
                    </div>

                    <div className="mt-auto">
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-widest text-[#9e9287] font-bold mb-1">Price</span>
                          <span className="font-[Cormorant_Garamond,Georgia,serif] text-3xl text-[#1C1C1C] font-semibold">
                            ₹{service.price}
                          </span>
                        </div>
                        {service.duration && (
                          <div className="flex flex-col items-end">
                            <span className="text-[10px] uppercase tracking-widest text-[#9e9287] font-bold mb-1">Duration</span>
                            <span className="flex items-center gap-1.5 text-sm text-[#1C1C1C] font-medium">
                              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#C8A951" strokeWidth={2}>
                                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                              </svg>
                              {service.duration}
                            </span>
                          </div>
                        )}
                      </div>
                      <button className="w-full py-4 rounded-xl bg-[#1C1C1C] text-white text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#C8A951] hover:text-[#1C1C1C] hover:shadow-lg">Book Now</button>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          REVIEWS SECTION
      ═══════════════════════════════════════════ */}
      {salon.reviews && salon.reviews.length > 0 && (
        <section className="py-24 bg-[#FDFAF6]" id="reviews">
          <div className="max-w-7xl mx-auto px-8">
            <Reveal>
              <div className="text-center mb-16">
                <span className="block text-[11px] tracking-[0.4em] uppercase text-[#C8A951] font-bold mb-4">Testimonials</span>
                <h2 className="font-[Cormorant_Garamond,Georgia,serif] text-5xl text-[#1C1C1C] mb-6">Customer Reviews</h2>
              </div>
            </Reveal>

            <div className="grid lg:grid-cols-3 gap-12 items-start">
              <Reveal className="lg:col-span-1 bg-white p-10 rounded-3xl shadow-sm border border-[#C8A951]/5">
                <h3 className="font-[Cormorant_Garamond,Georgia,serif] text-3xl text-[#1C1C1C] mb-6">Overall Rating</h3>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-6xl font-bold text-[#1C1C1C]">
                    {(salon.averageRating || 0).toFixed(1)}
                  </span>
                  <div>
                    <div className="flex text-[#C8A951] mb-1">
                      {"★".repeat(Math.round(salon.averageRating || 0))}{"☆".repeat(5 - Math.round(salon.averageRating || 0))}
                    </div>
                    <span className="text-[#9e9287] text-sm font-medium uppercase tracking-widest">{salon.totalReviews || 0} Reviews</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-4">
                      <span className="text-xs font-bold text-[#7a7065] w-4">{star}</span>
                      <div className="flex-1 h-1.5 bg-[#f5edce] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#C8A951]"
                          style={{ width: `${(salon.ratingBreakdown?.[star] / salon.totalReviews) * 100 || 0}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>

              <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
                {salon.reviews.map((review, i) => (
                  <Reveal key={review.id || i} delay={i * 100}>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#C8A951]/5 hover:border-[#C8A951]/20 transition-all">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-[#f5edce] flex items-center justify-center text-[#C8A951] font-bold overflow-hidden">
                          {review.userProfileImageUrl ? (
                            <img src={review.userProfileImageUrl} alt={review.userName} className="w-full h-full object-cover" />
                          ) : (
                            review.userName?.substring(0, 2).toUpperCase()
                          )}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-[#1C1C1C]">
                            {review.userName}
                          </h4>
                          <div className="flex text-[#C8A951] text-[10px]">
                            {"★".repeat(Math.round(review.rating))}{"☆".repeat(5 - Math.round(review.rating))}
                          </div>
                        </div>
                      </div>
                      <p className="text-[#7a7065] text-sm leading-relaxed italic">
                        "{review.comment}"
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          SALON STAFF SECTION
      ═══════════════════════════════════════════ */}
      <SalonStaff id={id} />

      {/* ═══════════════════════════════════════════
          LOCATION SECTION
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-8 max-w-7xl mx-auto" id="location">
        <Reveal>
          <div className="text-center mb-16">
            <span className="block text-[11px] tracking-[0.4em] uppercase text-[#C8A951] font-bold mb-4">Find Us</span>
            <h2 className="font-[Cormorant_Garamond,Georgia,serif] text-5xl text-[#1C1C1C] leading-tight">
              Our Location
            </h2>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {salon.latitude && salon.longitude && (
            <Reveal>
              <div className="rounded-[40px] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] h-[500px] border-8 border-white">
                <iframe
                  src={`https://maps.google.com/maps?q=${salon.latitude},${salon.longitude}&z=15&output=embed`}
                  className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          )}

          <Reveal delay={200}>
            <div className="space-y-10">
              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-full bg-[#f5edce] flex items-center justify-center flex-shrink-0">
                  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#C8A951" strokeWidth={2}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#9e9287] font-bold mb-2">Address</h4>
                  <p className="text-xl text-[#1C1C1C] font-semibold leading-relaxed mb-4">{locationText}</p>
                  <button className="px-6 py-2 rounded-full border border-[#C8A951] text-[#C8A951] text-[10px] font-bold uppercase tracking-widest hover:bg-[#C8A951] hover:text-white transition-all">Get Directions</button>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-full bg-[#f5edce] flex items-center justify-center flex-shrink-0">
                  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#C8A951" strokeWidth={2}>
                    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#9e9287] font-bold mb-2">Metadata</h4>
                  <p className="text-sm text-[#7a7065] font-light leading-relaxed">
                    {salon.metaDescription}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-[#C8A951]/10">
                <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#9e9287] font-bold mb-4">Contact Info</h4>
                <div className="flex flex-wrap gap-8">
                  {salon.phoneNumber && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#1C1C1C]">P:</span>
                      <span className="text-sm text-[#7a7065]">{salon.phoneNumber}</span>
                    </div>
                  )}
                  {salon.email && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#1C1C1C]">E:</span>
                      <span className="text-sm text-[#7a7065]">{salon.email}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          BOOKING CTA
      ═══════════════════════════════════════════ */}
      <section className="py-32 bg-[#1C1C1C] relative overflow-hidden" id="booking">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#C8A951]/5 -skew-x-12 translate-x-1/2" />
        <div className="max-w-4xl mx-auto px-8 relative z-10 text-center">
          <Reveal>
            <h2 className="font-[Cormorant_Garamond,Georgia,serif] font-light text-white text-6xl md:text-8xl mb-12 leading-tight uppercase">
              Book Your <em className="italic text-[#C8A951] font-light">Experience</em>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="px-12 py-6 rounded-full bg-[#C8A951] text-[#1C1C1C] text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:-translate-y-1">Book Appointment Now</button>
              <button className="px-12 py-6 rounded-full border border-white/20 text-white text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white/10">Inquire via WhatsApp</button>
            </div>
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
