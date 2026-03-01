import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle, Crown, MapPin, Calendar, Star, Edit3, Share2, ChevronRight } from 'lucide-react';

const ProfileHeader = ({ user }) => {
  const [scrolled, setScrolled] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const memberSince = "2024";
  const location = "New York, NY";
  const reviews = 128;

  const membershipConfig = {
    BRONZE: {
      gradient: 'linear-gradient(135deg, #92400e, #b45309, #d97706)',
      label: 'Bronze',
      glow: 'rgba(180, 83, 9, 0.4)',
    },
    SILVER: {
      gradient: 'linear-gradient(135deg, #6b7280, #9ca3af, #d1d5db)',
      label: 'Silver',
      glow: 'rgba(156, 163, 175, 0.4)',
    },
    GOLD: {
      gradient: 'linear-gradient(135deg, #a16207, #ca8a04, #eab308)',
      label: 'Gold',
      glow: 'rgba(234, 179, 8, 0.5)',
    },
    PLATINUM: {
      gradient: 'linear-gradient(135deg, #334155, #64748b, #cbd5e1)',
      label: 'Platinum',
      glow: 'rgba(148, 163, 184, 0.4)',
    },
  };

  const tier = membershipConfig[user?.membershipLevel] || membershipConfig.GOLD;
  const isVerified = user?.user?.verificationStatus === 'VERIFIED';
  const isEmailVerified = user?.user?.isEmailVerified;

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

    .ph-wrapper * { box-sizing: border-box; margin: 0; padding: 0; }

    .ph-wrapper {
      font-family: 'DM Sans', sans-serif;
      --gold: #c9a84c;
      --gold-light: #e8c97a;
      --ink: #0d0f12;
      --ink-soft: #4b4f5a;
      --surface: #ffffff;
      --border: rgba(0,0,0,0.07);
    }

    /* Banner */
    .ph-banner {
      position: relative;
      height: 300px;
      overflow: hidden;
    }

    .ph-banner-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: scale(1.05);
      transition: transform 8s ease;
    }

    .ph-banner-img.loaded {
      transform: scale(1);
    }

    .ph-banner-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to bottom,
        rgba(0,0,0,0.05) 0%,
        rgba(0,0,0,0.15) 40%,
        rgba(0,0,0,0.72) 100%
      );
    }

    .ph-banner-line {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent 0%, #c9a84c 30%, #e8c97a 50%, #c9a84c 70%, transparent 100%);
    }

    /* Card */
    .ph-card {
      position: relative;
      margin: 0 24px;
      margin-top: -88px;
      background: #ffffff;
      border-radius: 20px;
      box-shadow:
        0 0 0 1px rgba(0,0,0,0.06),
        0 4px 6px rgba(0,0,0,0.04),
        0 24px 48px rgba(0,0,0,0.10);
      padding: 32px;
      z-index: 10;
      opacity: 0;
      transform: translateY(16px);
      transition: opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s;
    }

    .ph-card.loaded {
      opacity: 1;
      transform: translateY(0);
    }

    /* Layout */
    .ph-layout {
      display: flex;
      align-items: flex-end;
      gap: 28px;
      flex-wrap: wrap;
    }

    /* Avatar */
    .ph-avatar-wrap {
      position: relative;
      margin-top: -80px;
      flex-shrink: 0;
    }

    .ph-avatar-ring {
      padding: 3px;
      border-radius: 18px;
      background: linear-gradient(135deg, #c9a84c, #e8c97a, #a07830);
      box-shadow: 0 0 24px rgba(201,168,76,0.35);
    }

    .ph-avatar {
      width: 120px;
      height: 120px;
      border-radius: 15px;
      object-fit: cover;
      display: block;
      background: #f0ede8;
      border: 3px solid #fff;
    }

    .ph-badge-verified {
      position: absolute;
      bottom: -8px;
      right: -8px;
      width: 32px;
      height: 32px;
      border-radius: 10px;
      background: linear-gradient(135deg, #c9a84c, #f0c040);
      display: flex;
      align-items: center;
      justify-content: center;
      border: 3px solid #fff;
      box-shadow: 0 2px 8px rgba(201,168,76,0.5);
    }

    /* Info */
    .ph-info {
      flex: 1;
      min-width: 200px;
    }

    .ph-name-row {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 10px;
    }

    .ph-name {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2.2rem;
      font-weight: 600;
      color: #0d0f12;
      letter-spacing: -0.02em;
      line-height: 1.1;
    }

    .ph-email-chip {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 3px 10px;
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 100px;
      font-size: 0.7rem;
      font-weight: 600;
      color: #166534;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .ph-tier-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 14px;
      flex-wrap: wrap;
    }

    .ph-tier-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 14px;
      border-radius: 100px;
      font-size: 0.75rem;
      font-weight: 600;
      color: white;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      position: relative;
      overflow: hidden;
    }

    .ph-tier-badge::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 60%);
    }

    .ph-id-chip {
      font-size: 0.75rem;
      color: #9ca3af;
      font-weight: 400;
      letter-spacing: 0.03em;
    }

    .ph-meta {
      display: flex;
      align-items: center;
      gap: 20px;
      flex-wrap: wrap;
    }

    .ph-meta-item {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 0.82rem;
      color: #6b7280;
      font-weight: 400;
    }

    .ph-meta-icon {
      color: #c9a84c;
    }

    /* Divider */
    .ph-divider {
      width: 1px;
      height: 16px;
      background: #e5e7eb;
    }

    /* Actions */
    .ph-actions {
      display: flex;
      gap: 8px;
      align-self: center;
    }

    .ph-btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 9px 18px;
      background: linear-gradient(135deg, #b8860b, #c9a84c, #d4a843);
      color: white;
      border: none;
      border-radius: 10px;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.82rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 2px 8px rgba(201,168,76,0.35);
      letter-spacing: 0.01em;
    }

    .ph-btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 16px rgba(201,168,76,0.45);
    }

    .ph-btn-secondary {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 9px 14px;
      background: transparent;
      color: #4b4f5a;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.82rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .ph-btn-secondary:hover {
      background: #f9fafb;
      border-color: #d1d5db;
    }

    /* Stats bar */
    .ph-stats-bar {
      display: flex;
      align-items: center;
      gap: 0;
      margin-top: 24px;
      padding-top: 20px;
      border-top: 1px solid #f3f4f6;
      flex-wrap: wrap;
    }

    .ph-stat {
      flex: 1;
      min-width: 100px;
      text-align: center;
      padding: 4px 16px;
      position: relative;
    }

    .ph-stat + .ph-stat::before {
      content: '';
      position: absolute;
      left: 0;
      top: 10%;
      height: 80%;
      width: 1px;
      background: #f0f0f0;
    }

    .ph-stat-value {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.6rem;
      font-weight: 600;
      color: #0d0f12;
      line-height: 1.1;
    }

    .ph-stat-label {
      font-size: 0.7rem;
      color: #9ca3af;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-top: 2px;
      font-weight: 500;
    }

    /* Responsive */
    @media (max-width: 600px) {
      .ph-card { margin: 0 12px; margin-top: -60px; padding: 20px; }
      .ph-banner { height: 220px; }
      .ph-name { font-size: 1.7rem; }
      .ph-avatar { width: 88px; height: 88px; border-radius: 12px; }
      .ph-avatar-wrap { margin-top: -56px; }
      .ph-actions { width: 100%; justify-content: flex-start; }
      .ph-layout { gap: 16px; }
    }
  `;

  return (
    <div className="ph-wrapper">
      <style>{styles}</style>

      {/* Banner */}
      <div className="ph-banner">
        <img
          className={`ph-banner-img ${loaded ? 'loaded' : ''}`}
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2074&auto=format&fit=crop"
          alt="Profile banner"
        />
        <div className="ph-banner-overlay" />
        <div className="ph-banner-line" />
      </div>

      {/* Card */}
      <div className={`ph-card ${loaded ? 'loaded' : ''}`}>
        <div className="ph-layout">

          {/* Avatar */}
          <div className="ph-avatar-wrap">
            <div className="ph-avatar-ring">
              <img
                className="ph-avatar"
                src={user?.user?.profileImageUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop'}
                alt={user?.user?.fullName || 'Profile'}
              />
            </div>
            {isVerified && (
              <div className="ph-badge-verified">
                <ShieldCheck size={14} color="white" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="ph-info">
            <div className="ph-name-row">
              <span className="ph-name">{user?.user?.fullName || 'Alexandra Monroe'}</span>
              {isEmailVerified && (
                <span className="ph-email-chip">
                  <CheckCircle size={11} />
                  Verified
                </span>
              )}
            </div>

            <div className="ph-tier-row">
              <span
                className="ph-tier-badge"
                style={{ background: tier.gradient, boxShadow: `0 2px 12px ${tier.glow}` }}
              >
                <Crown size={12} />
                {tier.label} Member
              </span>
              <span className="ph-id-chip">ID #{user?.user?.id || '10284'}</span>
            </div>

            <div className="ph-meta">
              <div className="ph-meta-item">
                <Calendar size={13} className="ph-meta-icon" />
                Since {memberSince}
              </div>
              <div className="ph-divider" />
              <div className="ph-meta-item">
                <MapPin size={13} className="ph-meta-icon" />
                {location}
              </div>
              <div className="ph-divider" />
              <div className="ph-meta-item">
                <Star size={13} className="ph-meta-icon" />
                {reviews} reviews
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="ph-actions">
            <button className="ph-btn-primary">
              <Edit3 size={13} />
              Edit Profile
            </button>
            <button className="ph-btn-secondary">
              <Share2 size={13} />
              Share
            </button>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default ProfileHeader;