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
      <div className="absolute inset-0 bg-[#4b3621]/80 backdrop-blur-md animate-fadeIn" />
      <div
        className="relative w-full max-w-xl bg-[#f7ede2] rounded-[48px] overflow-hidden shadow-2xl animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-8 right-8 z-10 w-12 h-12 rounded-full bg-white/50 hover:bg-white flex items-center justify-center text-[#5a3d2b] transition-all cursor-pointer">
          <CloseIcon />
        </button>

        {loading && (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <div className="w-12 h-12 border-4 border-[#cd6133]/20 border-t-[#cd6133] rounded-full animate-spin" />
            <p className="text-[#5a3d2b] text-[10px] font-bold uppercase tracking-widest">Profiling Excellence...</p>
          </div>
        )}

        {profile && !loading && (
          <div className="p-12 md:p-16">
            <div className="flex flex-col items-center text-center mb-12">
              <div className="w-32 h-32 rounded-[32px] overflow-hidden border-4 border-white shadow-xl mb-8">
                <img src={profile.userProfileImageUrl || `https://ui-avatars.com/api/?name=${profile.userFullName}&background=cd6133&color=fef9f3`} alt={profile.userFullName} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-4xl font-bold text-[#5a3d2b] mb-2">{profile.userFullName}</h3>
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#cd6133] font-extrabold">{profile.designation}</span>
            </div>

            <div className="space-y-10">
              {profile.bio && (
                <div className="text-center">
                  <p className="text-[#5a3d2b] text-lg leading-relaxed italic opacity-80">"{profile.bio}"</p>
                </div>
              )}

              <div className="grid grid-cols-3 gap-6">
                {[
                  { label: 'Rating', value: (profile.averageRating || 0).toFixed(1) },
                  { label: 'Experience', value: (profile.experienceYears || 0) + 'y' },
                  { label: 'Bookings', value: profile.totalBookings || 0 }
                ].map((stat, i) => (
                  <div key={i} className="bg-white/50 rounded-3xl p-6 text-center border border-[#cd6133]/5">
                    <span className="block text-2xl font-bold text-[#5a3d2b] mb-1">{stat.value}</span>
                    <span className="block text-[8px] uppercase tracking-widest text-[#5a3d2b]/40 font-bold">{stat.label}</span>
                  </div>
                ))}
              </div>

              <div className="bg-[#4b3621] text-[#fef9f3] p-10 rounded-[40px] flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-widest text-[#fef9f3]/40 font-bold mb-2">Availability</span>
                  <p className="text-xl font-bold">{formatTime(profile.workStartTime)} — {formatTime(profile.workEndTime)}</p>
                </div>
                <div className={`px-4 py-2 rounded-full text-[9px] font-extrabold uppercase tracking-widest ${profile.isAvailable ? 'bg-[#cd6133]' : 'bg-red-500'}`}>
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
function StaffCard({ member, index, onClick }) {
  const name = member.userFullName || member.fullName || "Specialist";
  return (
    <Reveal delay={index * 100}>
      <div className="group relative bg-white p-6 rounded-[40px] border border-[#cd6133]/5 hover:border-[#cd6133]/20 transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(205,97,51,0.15)] flex flex-col items-center text-center h-full">
        <div className="relative mb-8 w-full flex justify-center">
          <div className="w-40 h-40 rounded-[36px] overflow-hidden border-4 border-white shadow-xl relative z-10">
            <img
              src={member.userProfileImageUrl || member.image || `https://ui-avatars.com/api/?name=${name}&background=cd6133&color=fef9f3`}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-[#cd6133]/10 rounded-[28px] -z-0 group-hover:rotate-12 group-hover:bg-[#cd6133]/20 transition-all duration-700" />
        </div>

        <h3 className="text-2xl text-[#5a3d2b] font-bold mb-2 group-hover:text-[#cd6133] transition-colors">{name}</h3>
        <p className="text-[9px] uppercase tracking-[0.3em] text-[#5a3d2b]/40 font-extrabold mb-8">{member.designation}</p>

        <div className="flex items-center gap-6 mb-8 w-full justify-center border-t border-[#cd6133]/5 pt-8">
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold text-[#5a3d2b]">{member.averageRating || member.rating || "5.0"}</span>
            <span className="text-[8px] uppercase tracking-widest text-[#5a3d2b]/40 font-bold">Grade</span>
          </div>
          <div className="w-px h-8 bg-[#cd6133]/10" />
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold text-[#5a3d2b]">{member.experienceYears || "4"}+</span>
            <span className="text-[8px] uppercase tracking-widest text-[#5a3d2b]/40 font-bold">Exp</span>
          </div>
        </div>

        <button
          onClick={onClick}
          className="w-full py-4 rounded-2xl border-2 border-[#cd6133] text-[#cd6133] text-[9px] font-bold uppercase tracking-widest hover:bg-[#cd6133] hover:text-[#fef9f3] transition-all duration-500 active:scale-95 cursor-pointer mt-auto shadow-sm"
        >
          View Portfolio
        </button>
      </div>
    </Reveal>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────
const SalonStaff = ({ id }) => {
  const { staff, loading, error } = useSalonStaff({ id });
  const { profile, loading: profileLoading, error: profileError, fetchProfile, clearProfile } = useStaffProfile();
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = (staffId) => {
    setShowModal(true);
    fetchProfile(staffId);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    clearProfile();
  };

  if (loading) {
    return (
      <section className="py-32 bg-[#f7ede2]">
        <div className="max-w-7xl mx-auto px-8 flex flex-col items-center justify-center gap-6">
          <div className="w-12 h-12 border-4 border-[#cd6133]/20 border-t-[#cd6133] rounded-full animate-spin" />
          <p className="text-[#5a3d2b] text-[10px] font-bold uppercase tracking-widest">Gathering Excellence...</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-32 bg-[#f7ede2]" id="staff">
        <div className="max-w-7xl mx-auto px-8">
          <Reveal>
            <div className="text-center mb-32">
              <span className="block text-[11px] tracking-[0.5em] uppercase text-[#cd6133] font-extrabold mb-8">Master Artisans</span>
              <h2 className="text-6xl text-[#5a3d2b] font-bold leading-tight">
                Meet Our <em className="italic font-light">Experts</em>
              </h2>
            </div>
          </Reveal>

          {(!staff || staff.length === 0) ? (
            <div className="bg-white/30 rounded-[48px] p-24 text-center border border-[#cd6133]/10 italic text-[#5a3d2b]/60">
              No staff profiles available at this moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {staff.map((member, index) => (
                <StaffCard
                  key={member.id || index}
                  member={member}
                  index={index}
                  onClick={() => handleCardClick(member.id)}
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