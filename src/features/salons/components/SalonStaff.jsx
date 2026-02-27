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
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────
const BriefcaseIcon = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const UsersOffIcon = () => (
  <svg width={56} height={56} viewBox="0 0 24 24" fill="none" stroke="#C8A951" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <line x1="17" y1="8" x2="23" y2="8" />
  </svg>
);

const CloseIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ─── Staff Profile Modal ──────────────────────────────────────────────────
function StaffProfileModal({ profile, loading, error, onClose }) {
  // Lock body scroll when modal is open
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
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease]" />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#FDFAF6] rounded-2xl shadow-2xl animate-[slideUp_0.3s_ease]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-[#7a7065] hover:text-[#1C1C1C] transition-colors shadow-sm"
        >
          <CloseIcon />
        </button>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-10 h-10 border-3 border-[#C8A951]/20 border-t-[#C8A951] rounded-full animate-spin" />
            <p className="text-[#7a7065] text-sm">Loading profile...</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#e53e3e" strokeWidth={1.5}>
              <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            <p className="text-[#7a7065] text-sm">{error}</p>
          </div>
        )}

        {profile && !loading && (
          <>
            {/* Header */}
            <div className="relative pt-8 pb-6 px-8 text-center border-b border-[#C8A951]/10">
              {/* Gold accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C8A951] to-transparent" />

              {/* Avatar */}
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#C8A951]/30 mx-auto mb-4 bg-white flex items-center justify-center">
                {profile.userProfileImageUrl ? (
                  <img src={profile.userProfileImageUrl} alt={profile.userFullName} className="w-full h-full object-cover" />
                ) : (
                  <svg width={36} height={36} viewBox="0 0 24 24" fill="none" stroke="#C8A951" strokeWidth={1.2}>
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                  </svg>
                )}
              </div>

              <h3 className="font-[Cormorant_Garamond,Georgia,serif] text-2xl text-[#1C1C1C] mb-1">
                {profile.userFullName}
              </h3>
              <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase text-[#C8A951] font-semibold">
                <BriefcaseIcon />
                {profile.designation}
              </span>

              {/* Availability badge */}
              <div className="mt-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium ${
                  profile.isAvailable
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-red-50 text-red-600'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${profile.isAvailable ? 'bg-emerald-400' : 'bg-red-400'}`} />
                  {profile.isAvailable ? 'Available for Booking' : 'Currently Unavailable'}
                </span>
              </div>
            </div>

            {/* Bio */}
            {profile.bio && (
              <div className="px-8 py-5 border-b border-[#C8A951]/10">
                <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#C8A951] font-semibold mb-2">About</h4>
                <p className="text-[#7a7065] text-[13px] leading-relaxed font-light italic">
                  "{profile.bio}"
                </p>
              </div>
            )}

            {/* Details Grid */}
            <div className="px-8 py-5 border-b border-[#C8A951]/10">
              <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#C8A951] font-semibold mb-4">Details</h4>
              <div className="grid grid-cols-2 gap-4">
                {/* Rating */}
                <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                  <span className="text-[#C8A951] text-lg">★</span>
                  <p className="font-[Cormorant_Garamond] text-xl text-[#1C1C1C] leading-none mt-1">
                    {(profile.averageRating || 0).toFixed(1)}
                  </p>
                  <span className="text-[9px] uppercase tracking-widest text-[#9e9287]">Rating</span>
                </div>

                {/* Reviews */}
                <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                  <svg className="mx-auto mb-1" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#C8A951" strokeWidth={1.5}>
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <p className="font-[Cormorant_Garamond] text-xl text-[#1C1C1C] leading-none mt-1">
                    {profile.totalReviews || 0}
                  </p>
                  <span className="text-[9px] uppercase tracking-widest text-[#9e9287]">Reviews</span>
                </div>

                {/* Bookings */}
                <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                  <svg className="mx-auto mb-1" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#C8A951" strokeWidth={1.5}>
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <p className="font-[Cormorant_Garamond] text-xl text-[#1C1C1C] leading-none mt-1">
                    {profile.totalBookings || 0}
                  </p>
                  <span className="text-[9px] uppercase tracking-widest text-[#9e9287]">Bookings</span>
                </div>

                {/* Commission */}
                <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                  <svg className="mx-auto mb-1" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#C8A951" strokeWidth={1.5}>
                    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                  <p className="font-[Cormorant_Garamond] text-xl text-[#1C1C1C] leading-none mt-1">
                    {profile.commission || 0}%
                  </p>
                  <span className="text-[9px] uppercase tracking-widest text-[#9e9287]">Commission</span>
                </div>
              </div>
            </div>

            {/* Work Schedule */}
            <div className="px-8 py-5 border-b border-[#C8A951]/10">
              <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#C8A951] font-semibold mb-3">Work Schedule</h4>
              <div className="flex flex-wrap gap-3">
                {/* Hours */}
                <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2.5 shadow-sm">
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#C8A951" strokeWidth={1.5}>
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span className="text-[13px] text-[#1C1C1C]">
                    {formatTime(profile.workStartTime)} – {formatTime(profile.workEndTime)}
                  </span>
                </div>

                {/* Off Days */}
                {profile.weeklyOffDays && profile.weeklyOffDays.length > 0 && (
                  <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2.5 shadow-sm">
                    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#C8A951" strokeWidth={1.5}>
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span className="text-[13px] text-[#1C1C1C]">
                      Off: {profile.weeklyOffDays.map(d => d.charAt(0) + d.slice(1).toLowerCase()).join(', ')}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Contact */}
            {profile.userPhoneNumber && (
              <div className="px-8 py-5 border-b border-[#C8A951]/10">
                <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#C8A951] font-semibold mb-3">Contact</h4>
                <div className="flex items-center gap-3 bg-white rounded-lg px-4 py-3 shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-[#f5edce] flex items-center justify-center flex-shrink-0">
                    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#C8A951" strokeWidth={1.5}>
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <span className="text-[14px] text-[#1C1C1C]">{profile.userPhoneNumber}</span>
                </div>
              </div>
            )}

            {/* Specialized Services */}
            {profile.specializedServices && profile.specializedServices.length > 0 && (
              <div className="px-8 py-5">
                <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#C8A951] font-semibold mb-4">Specialized Services</h4>
                <div className="space-y-3">
                  {profile.specializedServices.map((service) => (
                    <div key={service.id} className="bg-white rounded-xl p-4 shadow-sm flex items-start gap-4">
                      {service.imageUrl && (
                        <img
                          src={service.imageUrl}
                          alt={service.name}
                          className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h5 className="font-[Cormorant_Garamond,Georgia,serif] text-base text-[#1C1C1C] leading-tight">
                            {service.name}
                          </h5>
                          <span className="font-[Cormorant_Garamond] text-lg text-[#C8A951] font-semibold whitespace-nowrap">
                            ₹{service.price}
                          </span>
                        </div>
                        {service.description && (
                          <p className="text-[#9e9287] text-[11px] leading-relaxed mt-1 line-clamp-2">{service.description}</p>
                        )}
                        <div className="flex items-center gap-3 mt-2">
                          {service.durationMinutes && (
                            <span className="flex items-center gap-1 text-[10px] text-[#7a7065]">
                              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                              </svg>
                              {service.durationMinutes} min
                            </span>
                          )}
                          {service.category && (
                            <span className="text-[10px] text-[#C8A951] bg-[#C8A951]/10 px-2 py-0.5 rounded-full">
                              {service.category}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom padding */}
            <div className="h-4" />
          </>
        )}
      </div>

      {/* Keyframe styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

// ─── Staff Card ───────────────────────────────────────────────────────────
function StaffCard({ member, index, onClick }) {
  return (
    <Reveal delay={index * 100}>
      <div
        className="group relative bg-white rounded-xl overflow-hidden shadow-[0_2px_12px_-4px_rgba(200,169,81,0.08)] hover:shadow-[0_8px_28px_-6px_rgba(200,169,81,0.2)] transition-all duration-500 hover:-translate-y-1 cursor-pointer"
        onClick={onClick}
      >
        {/* Gold accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8A951] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Profile Section */}
        <div className="relative pt-5 pb-3 px-4 flex flex-col items-center">
          {/* Avatar */}
          <div className="relative mb-3">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#C8A951]/15 group-hover:border-[#C8A951]/50 transition-colors duration-500 bg-[#FDFAF6] flex items-center justify-center">
              {member.userProfileImageUrl ? (
                <img
                  src={member.userProfileImageUrl}
                  alt={member.userFullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#C8A951" strokeWidth={1.2}>
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              )}
            </div>
            {/* Availability dot */}
            <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
              member.isAvailable ? 'bg-emerald-400' : 'bg-red-400'
            }`} />
          </div>

          {/* Name */}
          <h3 className="font-[Cormorant_Garamond,Georgia,serif] text-lg text-[#1C1C1C] text-center leading-tight mb-0.5">
            {member.userFullName}
          </h3>

          {/* Designation */}
          <span className="inline-flex items-center gap-1 text-[10px] tracking-[0.12em] uppercase text-[#C8A951] font-medium">
            <BriefcaseIcon />
            {member.designation}
          </span>
        </div>

        {/* Availability Strip */}
        <div className={`py-1.5 text-center text-[10px] font-medium tracking-wider uppercase ${
          member.isAvailable
            ? 'bg-emerald-50 text-emerald-700'
            : 'bg-red-50 text-red-600'
        }`}>
          {member.isAvailable ? '● Available' : '● Unavailable'}
        </div>

        {/* Bio Hover Overlay */}
        {member.bio && (
          <div className="absolute inset-0 bg-[#1C1C1C]/90 backdrop-blur-sm flex flex-col items-center justify-center px-5 opacity-0 group-hover:opacity-100 transition-all duration-400 pointer-events-none rounded-xl">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#C8A951]/40 mx-auto mb-3 bg-[#FDFAF6] flex items-center justify-center">
                {member.userProfileImageUrl ? (
                  <img src={member.userProfileImageUrl} alt={member.userFullName} className="w-full h-full object-cover" />
                ) : (
                  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#C8A951" strokeWidth={1.2}>
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                  </svg>
                )}
              </div>
              <h4 className="font-[Cormorant_Garamond,Georgia,serif] text-base text-[#C8A951] text-center mb-2">
                {member.userFullName}
              </h4>
              <div className="w-8 h-px bg-[#C8A951]/40 mx-auto mb-3" />
              <p className="text-white/75 text-[12px] leading-relaxed font-light italic text-center line-clamp-4">
                "{member.bio}"
              </p>
            </div>
          </div>
        )}
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
      <section className="py-16 bg-[#FDFAF6]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col items-center justify-center gap-3 py-12">
            <div className="w-10 h-10 border-3 border-[#C8A951]/20 border-t-[#C8A951] rounded-full animate-spin" />
            <p className="text-[#7a7065] text-sm tracking-wider uppercase">Loading our team...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-[#FDFAF6]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col items-center justify-center gap-3 py-12">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#e53e3e" strokeWidth={1.5}>
                <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <p className="text-[#7a7065] text-sm">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!staff || staff.length === 0) {
    return (
      <section className="py-16 bg-[#FDFAF6]">
        <div className="max-w-7xl mx-auto px-8">
          <Reveal>
            <div className="text-center mb-10">
              <span className="block text-[10px] tracking-[0.4em] uppercase text-[#C8A951] font-semibold mb-3 opacity-90">
                Our Team
              </span>
              <h2
                className="font-[Cormorant_Garamond,Georgia,serif] font-light text-[#1C1C1C] leading-[1.1]"
                style={{ fontSize: "clamp(32px,4.5vw,46px)" }}
              >
                Meet Our <em className="italic text-[#C8A951]">Experts</em>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="flex flex-col items-center justify-center py-14 border border-dashed border-[#C8A951]/25 rounded-xl bg-white/50">
              <div className="w-20 h-20 rounded-full bg-[#f5edce]/50 flex items-center justify-center mb-5">
                <UsersOffIcon />
              </div>
              <h3 className="font-[Cormorant_Garamond,Georgia,serif] text-xl text-[#1C1C1C] mb-2">
                No Staff for this Store
              </h3>
              <p className="text-[#9e9287] text-sm font-light max-w-sm text-center leading-relaxed">
                This salon hasn't added any team members yet. Check back later for updates.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-16 bg-[#FDFAF6]" id="team">
        <div className="max-w-7xl mx-auto px-8">
          <Reveal>
            <div className="text-center mb-10">
              <span className="block text-[10px] tracking-[0.4em] uppercase text-[#C8A951] font-semibold mb-3 opacity-90">
                Our Team
              </span>
              <h2
                className="font-[Cormorant_Garamond,Georgia,serif] font-light text-[#1C1C1C] leading-[1.1] mb-4"
                style={{ fontSize: "clamp(32px,4.5vw,46px)" }}
              >
                Meet Our <em className="italic text-[#C8A951]">Experts</em>
              </h2>
              <p className="text-[#7a7065] text-[14px] leading-relaxed font-light opacity-80 max-w-md mx-auto">
                Our talented professionals are here to provide you with an exceptional experience.
              </p>
            </div>
          </Reveal>

          <div className={`grid gap-5 ${
            staff.length === 1
              ? 'grid-cols-1 max-w-[220px] mx-auto'
              : staff.length === 2
                ? 'grid-cols-2 max-w-md mx-auto'
                : staff.length === 3
                  ? 'grid-cols-2 md:grid-cols-3 max-w-2xl mx-auto'
                  : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
          }`}>
            {staff.map((member, index) => (
              <StaffCard
                key={member.id || index}
                member={member}
                index={index}
                onClick={() => handleCardClick(member.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Staff Profile Modal */}
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