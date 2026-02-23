"use client";

import { use, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { salons } from "@/features/salons/data/salonsData";
import { getDetailOrDefault } from "@/features/salons/data/salonDetailData";

// ─── Custom Hooks ────────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); } },
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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return ref;
}

// ─── Components ───────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "", threshold = 0.12 }) {
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

function SectionHeading({ subtitle, title, description, align = "left", mb = "mb-12" }) {
  const words = title.split(" ");
  const lastWord = words.pop();
  const mainTitle = words.join(" ");

  return (
    <div className={`${mb} ${align === "center" ? "text-center mx-auto" : ""}`}>
      <span className="block text-[10px] tracking-[0.4em] uppercase text-[#C8A951] font-semibold mb-4 opacity-90">
        {subtitle}
      </span>
      <h2 className="font-[Cormorant_Garamond,Georgia,serif] font-light text-[#1C1C1C] leading-[1.1] mb-6"
        style={{ fontSize: "clamp(36px,5vw,52px)" }}>
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

function StatCard({ number, label, icon, extra }) {
  return (
    <div className="flex items-center gap-3">
      {icon && <div className="text-[#C8A951] text-xl">{icon}</div>}
      <div>
        <span className="block font-[Cormorant_Garamond,Georgia,serif] font-light text-3xl text-[#1C1C1C] leading-none">
          {number}
        </span>
        <span className="text-xs tracking-wider uppercase text-[#7a7065]">{label}</span>
        {extra && <div className="mt-1">{extra}</div>}
      </div>
    </div>
  );
}

function Badge({ children, variant = "gold" }) {
  const variants = {
    gold: "bg-[#C8A951] text-[#1C1C1C]",
    outline: "bg-transparent border border-[#C8A951] text-[#C8A951]",
    glass: "backdrop-blur-md bg-white/10 text-white border border-white/20",
    dark: "bg-[#1C1C1C] text-[#C8A951]"
  };

  return (
    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wide ${variants[variant]}`}>
      {children}
    </span>
  );
}

// ─── Constants ───────────────────────────────────────────────────────────────
const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// ─── Main Page Component ─────────────────────────────────────────────────────
export default function SalonDetails({ params }) {
  const { slug } = use(params);
  const salon = salons.find((s) => s.slug === slug);
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [activeTab, setActiveTab] = useState("services");
  const today = DAY_NAMES[new Date().getDay()];
  const heroRef = useParallax();

  if (!salon) {
    return (
      <div className="min-h-screen bg-[#F7F3EE] flex flex-col items-center justify-center gap-4 font-[Jost,sans-serif]">
        <p className="text-[#7a7065] text-lg">Salon not found.</p>
        <Link href="/salons" className="text-[#C8A951] underline text-sm">← Back to all salons</Link>
      </div>
    );
  }

  const detail = getDetailOrDefault(slug, salon);
  const isOpen = true; // Implement actual logic

  return (
    <div className="min-h-screen bg-[#F7F3EE] font-[Jost,sans-serif] font-light">

      {/* ═══════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════ */}
      <section className="relative h-[65vh] min-h-[500px] overflow-hidden">
        {/* Parallax Background */}
        <div ref={heroRef} className="absolute inset-0">
          <img
            src={salon.image}
            alt={salon.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-[#1C1C1C]/40 to-transparent" />
        </div>

        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-20 px-8 py-6 flex justify-end items-center">
          <div className="flex gap-2">
            <button className="p-2 text-white/80 hover:text-white transition-colors">
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
            <button className="p-2 text-white/80 hover:text-white transition-colors">
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M4 4v16h16" />
              </svg>
            </button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-8 md:px-16 pb-16 md:pb-24">
          <div className="max-w-4xl">
            {/* Badges */}
            <Reveal delay={200}>
              <div className="flex gap-3 flex-wrap mb-6">
                <Badge variant="glass">
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path d="M9 12l2 2 4-4" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  Verified
                </Badge>
                <Badge variant="glass">
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="5" />
                  </svg>
                  {isOpen ? "Open Now" : "Closed"}
                </Badge>
                {salon.badge && (
                  <Badge variant="outline">
                    {salon.badge}
                  </Badge>
                )}
              </div>
            </Reveal>

            {/* Title */}
            <Reveal delay={300}>
              <h1 className="font-[Cormorant_Garamond,Georgia,serif] font-light text-white leading-[1.1] mb-4"
                style={{ fontSize: "clamp(48px,8vw,96px)" }}>
                {salon.name.split(" ").map((word, i, arr) =>
                  i === arr.length - 1 ? (
                    <em key={i} className="italic text-[#C8A951] block md:inline">{word}</em>
                  ) : (
                    <span key={i} className="block md:inline">{word} </span>
                  )
                )}
              </h1>
            </Reveal>

            {/* Rating & Quick Info */}
            <Reveal delay={400}>
              <div className="flex items-center gap-6 flex-wrap mb-8">
                <div className="flex items-center gap-3">
                  <Stars rating={salon.rating} size={20} />
                  <span className="text-white/80 text-sm">{salon.rating} · {salon.reviews} reviews</span>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{salon.location.split(',')[0]}</span>
                </div>
              </div>
            </Reveal>

            {/* CTA Buttons */}
            <Reveal delay={500}>
              <div className="flex gap-4 flex-wrap">
                <a
                  href="#booking"
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-[#C8A951] text-[#1C1C1C] text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:bg-[#d4b55f] hover:shadow-[0_10px_30px_-5px_rgba(200,169,81,0.5)]"
                >
                  <span>Book Appointment</span>
                  <svg className="group-hover:translate-x-1 transition-transform" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center px-8 py-4 rounded-lg text-sm font-medium tracking-wider uppercase text-white border border-white/30 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/50"
                >
                  View Services
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-[2px] h-16 bg-white/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/3 bg-white animate-[scroll_2s_ease-in-out_infinite]" />
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          ABOUT SECTION
      ═══════════════════════════════════════════ */}
      <section className="py-12 px-8 max-w-7xl mx-auto" id="about">
        <Reveal>
          <div className="grid lg:grid-cols-4 border border-[#C8A951]/20 rounded-2xl overflow-hidden bg-white shadow-[0_20px_50px_-20px_rgba(200,169,81,0.1)]">
            {/* Cell 1: Branding/Heading */}
            <div className="lg:col-span-1 p-8 bg-[#FDFAF6] border-b lg:border-b-0 lg:border-r border-[#C8A951]/10 flex flex-col justify-center">
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#C8A951] font-semibold mb-2">Our Story</span>
              <h2 className="font-[Cormorant_Garamond] text-3xl text-[#1C1C1C] leading-tight">
                Crafting <em className="italic text-[#C8A951]">Beauty</em> Since 2014
              </h2>
            </div>

            {/* Cell 2: Description */}
            <div className="lg:col-span-2 p-8 border-b lg:border-b-0 lg:border-r border-[#C8A951]/10 flex items-center">
              <p className="text-[#7a7065] text-[13px] leading-relaxed font-light italic">
                "{detail.about}"
              </p>
            </div>

            {/* Cell 3: Compact Stats Grid */}
            <div className="lg:col-span-1 grid grid-cols-2">
              <div className="p-6 border-r border-b border-[#C8A951]/10 flex flex-col items-center justify-center text-center">
                <span className="text-[9px] uppercase tracking-widest text-[#C8A951] mb-1">Rating</span>
                <span className="font-[Cormorant_Garamond] text-2xl text-[#1C1C1C] leading-none">{salon.rating}</span>
              </div>
              <div className="p-6 border-b border-[#C8A951]/10 flex flex-col items-center justify-center text-center">
                <span className="text-[9px] uppercase tracking-widest text-[#C8A951] mb-1">Reviews</span>
                <span className="font-[Cormorant_Garamond] text-2xl text-[#1C1C1C] leading-none">{salon.reviews}</span>
              </div>
              <div className="p-6 border-r border-[#C8A951]/10 flex flex-col items-center justify-center text-center">
                <span className="text-[9px] uppercase tracking-widest text-[#C8A951] mb-1">Team</span>
                <span className="font-[Cormorant_Garamond] text-2xl text-[#1C1C1C] leading-none">{detail.staff.length}</span>
              </div>
              <div className="p-6 flex flex-col items-center justify-center text-center">
                <span className="text-[9px] uppercase tracking-widest text-[#C8A951] mb-1">Years</span>
                <span className="font-[Cormorant_Garamond] text-2xl text-[#1C1C1C] leading-none">10+</span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════
          SERVICES SECTION
      ═══════════════════════════════════════════ */}
      <section className="py-20 bg-[#FDFAF6]" id="services">
        <div className="max-w-7xl mx-auto px-8">
          <Reveal>
            <SectionHeading
              subtitle="Our Expertise"
              title="Signature Services"
              description="Experience the finest in beauty and wellness with our curated selection of premium services."
              align="center"
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {detail.services.map((service, i) => (
              <Reveal key={service.name} delay={i * 100}>
                <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#C8A951]/5 rounded-bl-[100%] group-hover:bg-[#C8A951]/10 transition-colors" />

                  <h3 className="font-[Cormorant_Garamond,Georgia,serif] text-2xl text-[#1C1C1C] mb-3">
                    {service.name}
                  </h3>

                  <p className="text-[#7a7065] text-sm leading-relaxed mb-4">
                    {service.desc}
                  </p>

                  <div className="flex items-center justify-between mb-6">
                    <span className="font-[Cormorant_Garamond,Georgia,serif] text-2xl text-[#1C1C1C]">
                      {service.price}
                      <span className="text-xs text-[#7a7065] ml-1">starting</span>
                    </span>
                    {service.duration && (
                      <span className="flex items-center gap-1 text-xs text-[#9e9287]">
                        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {service.duration}
                      </span>
                    )}
                  </div>

                  <button className="w-full py-3 rounded-lg bg-[#1C1C1C] text-[#C8A951] text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:bg-[#2a2a2a] hover:shadow-lg group-hover:shadow-[#C8A951]/20">
                    Book Now
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TEAM SECTION
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-8 max-w-7xl mx-auto" id="team">
        <Reveal>
          <SectionHeading
            subtitle="Meet The Team"
            title="Our Artisans"
            description="Each member brings unique expertise and passion to create your perfect experience."
          />
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {detail.staff.map((member, i) => (
            <Reveal key={member.name} delay={i * 50}>
              <div className="group text-center">
                <div className="relative mb-4">
                  <div className="w-32 h-32 mx-auto rounded-full bg-[#EDE8E0] border-4 border-white shadow-lg overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-[Cormorant_Garamond,Georgia,serif] text-3xl text-[#C8A951]">
                        {member.initials}
                      </span>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-full bg-[#C8A951]/0 group-hover:bg-[#C8A951]/20 transition-colors" />
                </div>

                <h3 className="font-[Cormorant_Garamond,Georgia,serif] text-lg text-[#1C1C1C] mb-1">
                  {member.name}
                </h3>

                <p className="text-xs tracking-wider uppercase text-[#7a7065] mb-2">
                  {member.role}
                </p>

                <div className="flex items-center justify-center gap-2">
                  <Stars rating={member.rating} size={12} />
                  <span className="text-xs text-[#7a7065]">{member.rating.toFixed(1)}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          GALLERY SECTION
      ═══════════════════════════════════════════ */}
      <section className="py-20 bg-[#FDFAF6]" id="gallery">
        <div className="max-w-7xl mx-auto px-8">
          <Reveal>
            <SectionHeading
              subtitle="Portfolio"
              title="Our Work"
              description="A glimpse into the transformations that define our artistry."
              align="center"
            />
          </Reveal>

          <Reveal delay={100}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {detail.gallery.slice(0, 8).map((url, i) => (
                <div
                  key={i}
                  className={`group relative rounded-xl overflow-hidden cursor-pointer aspect-square ${i === 0 ? "md:col-span-2 md:row-span-2" : ""
                    }`}
                  onClick={() => setLightboxSrc(url)}
                >
                  <img
                    src={url}
                    alt={`Gallery ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-0">
                      ⊕
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          LOCATION & HOURS
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-8 max-w-7xl mx-auto" id="location">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Location Info */}
          <Reveal>
            <SectionHeading
              subtitle="Visit Us"
              title="Find Your Sanctuary"
            />

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-[#f5edce] flex items-center justify-center flex-shrink-0">
                  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#C8A951" strokeWidth={1.8}>
                    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium uppercase tracking-wider text-[#7a7065] mb-1">Address</h4>
                  <p className="text-lg text-[#1C1C1C]">{salon.location}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-[#f5edce] flex items-center justify-center flex-shrink-0">
                  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#C8A951" strokeWidth={1.8}>
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium uppercase tracking-wider text-[#7a7065] mb-1">Hours</h4>
                  <div className="space-y-2">
                    {detail.timings.map((t) => (
                      <div key={t.day} className="flex items-center justify-between gap-8">
                        <span className={`text-sm ${t.day === today ? "text-[#C8A951] font-medium" : "text-[#7a7065]"}`}>
                          {t.day}
                        </span>
                        <span className="text-sm text-[#1C1C1C]">
                          {t.open ? `${t.open} - ${t.close}` : "Closed"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(salon.location)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-200 text-gray-300 text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:bg-gray-400 hover:shadow-lg mt-4"
              >
                Get Directions
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </Reveal>

          {/* Map */}
          <Reveal delay={150}>
            <div className="rounded-2xl overflow-hidden shadow-2xl h-full min-h-[400px]">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14017.0!2d77.2090!3d28.6139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s${encodeURIComponent(salon.location)}!5e0!3m2!1sen!2sin!4v1700000000000`}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          BOOKING CTA
      ═══════════════════════════════════════════ */}
      <section className="py-20 bg-[#1C1C1C] text-center" id="booking">
        <div className="max-w-3xl mx-auto px-8">
          <Reveal>
            <span className="block text-xs tracking-[0.3em] uppercase text-[#C8A951] font-medium mb-4">
              Ready to Transform?
            </span>
            <h2 className="font-[Cormorant_Garamond,Georgia,serif] font-light text-white text-5xl md:text-6xl mb-6">
              Book Your <em className="italic text-[#C8A951]">Experience</em>
            </h2>
            <p className="text-white/60 text-lg mb-10 font-light">
              Join us for a journey of beauty and relaxation. Our team is ready to welcome you.
            </p>
            <div className="flex gap-4 justify-center mt-5">
              <a
                href="#"
                className="px-10 py-4 rounded-lg bg-[#C8A951] text-[#1C1C1C] text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:bg-[#d4b55f] hover:shadow-[0_10px_30px_-5px_rgba(200,169,81,0.5)]"
              >
                Book Appointment
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          LIGHTBOX
      ═══════════════════════════════════════════ */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center"
          onClick={() => setLightboxSrc(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/60 hover:text-white text-4xl transition-colors"
            onClick={() => setLightboxSrc(null)}
          >
            ✕
          </button>
          <img
            src={lightboxSrc}
            alt="Gallery"
            className="max-w-[90vw] max-h-[90vh] rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Global Styles */}
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}