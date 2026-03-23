"use client";

import React, { useRef, useEffect, useState } from 'react';
import { useSalonStaff } from '../hooks/useSalonStaff';
import { useStaffProfile } from '../hooks/useStaffProfile';

// ─── Reveal Animation Hook ────────────────────────────────────────────────
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

// ─── Icons ────────────────────────────────────────────────────────────────
const CloseIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ─── Staff Profile Modal ──────────────────────────────────────────────────
function StaffProfileModal({ profile, loading, error, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const formatTime = (time) => {
    if (!time) return '';
    const [h, m] = time.split(':');
    const hour = parseInt(h, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const h12 = hour % 12 || 12;
    return `${h12}:${m} ${ampm}`;
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-[#1C3152]/80 backdrop-blur-md animate-fadeIn" />
      <div
        className="relative w-full max-w-xl bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-[40px] overflow-hidden shadow-2xl animate-slideUp border border-white/20 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center footer-main-text transition-all cursor-pointer">
          <CloseIcon />
        </button>

        {loading && (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <div className="w-12 h-12 border-4 border-muted border-t-accent rounded-full animate-spin" />
            <p className="footer-main-text text-[10px] font-bold uppercase tracking-widest">Profiling Excellence...</p>
          </div>
        )}

        {profile && !loading && (
          <div className="p-6 sm:p-10 md:p-14">
            <div className="flex flex-col items-center text-center mb-6 sm:mb-10">
              <div className="relative w-28 h-28 mb-6 group">
                <div className="absolute inset-0 hero-filter-btn-bg rounded-[32px] rotate-6 scale-105 opacity-20 group-hover:rotate-12 transition-transform duration-500" />
                <div className="relative w-full h-full rounded-[32px] overflow-hidden border-2 border-white shadow-xl">
                  <img src={profile.userProfileImageUrl || `https://ui-avatars.com/api/?name=${profile.userFullName}&background=1C3152&color=ffffff`} alt={profile.userFullName} className="w-full h-full object-cover" />
                </div>
              </div>
              <h3 className="text-3xl font-bold footer-main-text mb-1">{profile.userFullName}</h3>
              <span className="text-[9px] uppercase tracking-[0.3em] hero-filter-btn-bg text-white px-3 py-1 rounded-full font-bold">{profile.designation}</span>
            </div>

            <div className="space-y-8">
              {profile.bio && (
                <div className="text-center">
                  <p className="footer-main-text opacity-80 text-base leading-relaxed italic px-4">"{profile.bio}"</p>
                </div>
              )}

              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Rating', value: (profile.averageRating || 0).toFixed(1) },
                  { label: 'Experience', value: (profile.experienceYears || 0) + 'y' },
                  { label: 'Bookings', value: profile.totalBookings || 0 }
                ].map((stat, i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 text-center border hero-filter-input-bg shadow-sm hover:hero-filter-btn-bg transition-colors group">
                    <span className="block text-xl font-bold footer-main-text mb-0.5 group-hover:text-white">{stat.value}</span>
                    <span className="block text-[7px] uppercase tracking-widest footer-link-text opacity-40 font-bold group-hover:text-white/70">{stat.label}</span>
                  </div>
                ))}
              </div>

              <div className="badge-verified-bg border hero-filter-input-bg p-5 sm:p-8 rounded-2xl sm:rounded-[32px] flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 sm:gap-0 text-center sm:text-left">
                <div className="flex flex-col">
                  <span className="text-[8px] uppercase tracking-widest badge-verified-text font-bold mb-1.5 opacity-60">Availability</span>
                  <p className="text-lg font-bold salon-list-title-text">{formatTime(profile.workStartTime)} — {formatTime(profile.workEndTime)}</p>
                </div>
                <div className={`px-4 py-1.5 rounded-full text-[8px] font-bold uppercase tracking-widest text-white shadow-lg ${profile.isAvailable ? 'hero-filter-btn-bg' : 'bg-red-500'}`}>
                  {profile.isAvailable ? 'Active' : 'Busy'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Staff Card ───────────────────────────────────────────────────────────────
function StaffCard({ member, index, onBook }) {
  const name = member.userFullName || member.fullName || "Specialist";
  return (
    <Reveal delay={index * 100}>
      <div className="group relative bg-white p-4 sm:p-5 rounded-2xl sm:rounded-[48px] border hero-filter-input-bg shadow-md hover:border-accent/40 transition-all duration-700 hover:shadow-xl flex flex-col items-center text-center h-full">
        <div className="relative mb-5 mt-2 w-full flex justify-center">
          <div className="w-28 h-28 rounded-full overflow-hidden border-[3px] hero-filter-input-bg shadow-md relative z-10 bg-[#f7ede2] group-hover:border-accent/40 transition-colors duration-500">
            <img
              src={member.userProfileImageUrl || member.image || `https://ui-avatars.com/api/?name=${name}&background=1C3152&color=ffffff`}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              style={{ objectPosition: "top" }}
            />
          </div>
        </div>

        <h3 className="text-lg salon-list-title-text font-bold mb-1 group-hover:salon-list-title-accent transition-colors truncate w-full px-2">{name}</h3>
        <p className="text-[8px] uppercase tracking-[0.2em] salon-card-text opacity-50 font-extrabold mb-5 truncate w-full px-2">{member.designation}</p>

        <div className="flex items-center gap-4 mb-5 w-full justify-center border-t hero-filter-input-bg pt-5">
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold salon-list-title-text">{member.averageRating || member.rating || "5.0"}</span>
            <span className="text-[7px] uppercase tracking-widest salon-card-text opacity-40 font-bold">Grade</span>
          </div>
          <div className="w-px h-6 hero-filter-input-bg" />
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold salon-list-title-text">{member.experienceYears || "4"}+</span>
            <span className="text-[7px] uppercase tracking-widest salon-card-text opacity-40 font-bold">Exp</span>
          </div>
        </div>

        <button
          onClick={onBook}
          className="w-full py-3.5 rounded-xl border-0 rec-btn-primary text-white text-[10px] font-bold uppercase tracking-widest hover:shadow-xl transition-all duration-300 active:scale-95 cursor-pointer mt-auto"
        >
          Book Now
        </button>
      </div>
    </Reveal>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────
const SalonStaff = ({ id, onBookStaff }) => {
  const { staff: allStaff, loading, error } = useSalonStaff({ id });
  const { profile, loading: profileLoading, error: profileError, fetchProfile, clearProfile } = useStaffProfile();
  const [showModal, setShowModal] = useState(false);

  const staff = React.useMemo(() => {
    if (!allStaff) return [];
    return allStaff.filter(
      (member) =>
        !member.designation?.toLowerCase().includes("receptionist") &&
        !member.designation?.toLowerCase().includes("front desk")
    );
  }, [allStaff]);

  const handleCardClick = (staffMember) => {
    onBookStaff?.(staffMember);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    clearProfile();
  };

  if (loading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-8 flex flex-col items-center justify-center gap-6">
          <div className="w-12 h-12 border-4 border-muted border-t-accent rounded-full animate-spin" />
          <p className="salon-card-text text-[10px] font-bold uppercase tracking-widest">Gathering Excellence...</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-8 sm:py-12" id="reviews">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
                <Reveal>
                    <div className="text-center mb-16 sm:mb-24">
                        <span className="block text-[10px] sm:text-[11px] tracking-[0.3em] sm:tracking-[0.4em] uppercase rec-section-heading-accent font-extrabold mb-4 sm:mb-6">Master Artisans</span>
                        <h2 className="text-[24px] sm:text-5xl md:text-6xl rec-section-heading font-bold leading-tight font-[Cormorant_Garamond,serif]">
                            Meet Our <em className="italic font-light rec-section-heading-accent">Experts</em>
                        </h2>
                    </div>
                </Reveal>

          {(!staff || staff.length === 0) ? (
            <div className="bg-white/30 rounded-2xl sm:rounded-[48px] p-8 sm:p-24 text-center border hero-filter-input-bg italic footer-link-text opacity-60">
              No staff profiles available at this moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-12">
              {staff.map((member, index) => (
                <StaffCard
                  key={member.id || index}
                  member={member}
                  index={index}
                  onBook={() => handleCardClick(member)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {showModal && (
        <StaffProfileModal
          profile={profile}
          loading={profileLoading}
          error={profileError}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default SalonStaff;