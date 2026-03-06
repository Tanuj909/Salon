"use client";
import React from 'react';
import HeroSection from './sections/HeroSection';
import SalonsSection from './sections/SalonsSection';
import FeaturesSection from './sections/FeaturesSection';
import OnlineBookingSection from './sections/OnlineBookingSection';
import StatsSection from './sections/StatsSection';
import MarketingSection from './sections/MarketingSection';
import TestimonialSection from './sections/TestimonialSection';
import BusinessTypesSection from './sections/BusinessTypesSection';
import DownloadAppSection from './sections/DownloadAppSection';

/**
 * ListBusiness Component
 * Refactored into smaller, focused section components for better maintainability.
 * Uses DM Sans and Cormorant Garamond for a premium aesthetic.
 */
const ListBusiness = () => {
    return (
        <div className="bg-plum/5 font-[DM_Sans] text-[#3c1432] min-h-screen pt-16 md:pt-20">
            {/* ── Hero Section ── */}
            <HeroSection />

            {/* ── Features Section ── */}
            <FeaturesSection />

            {/* ── Online Booking Section ── */}
            {/* <OnlineBookingSection /> */}

            {/* ── Stats Section ── */}
            <StatsSection />

            {/* ── Marketing Section ── */}
            <MarketingSection />

            {/* ── Testimonial Section ── */}
            <TestimonialSection />

            {/* ── Salons Section (Marquee) ── */}
            <SalonsSection />

            {/* ── Business Types Section ── */}
            <BusinessTypesSection />

            {/* ── Download App Section ── */}
            {/* <DownloadAppSection /> */}
        </div>
    );
};

export default ListBusiness;