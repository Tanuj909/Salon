"use client";

import { useCurrentCustomer } from "@/features/customer/hooks/useCurrentCustomer";

import React from 'react';
import ProfileHeader from './ProfileHeader';
import PersonalInfoSection from './PersonalInfoSection';
import BookingHistory from './BookingHistory';
import FavoriteSalons from './FavoriteSalons';
import RecentReviews from './RecentReviews';

const ProfilePage = () => {

        const { customer, loading, error } = useCurrentCustomer();

          if (loading) return <p>Loading profile...</p>;
  if (error) return <p>{error}</p>;
  if (!customer) return null;

    return (
        <main className="min-h-screen pb-20 bg-background-light">
            {/* Profile Banner & Overlap Image handle internally */}
            <ProfileHeader user={customer} />

            <div className="max-w-[1200px] mx-auto overflow-hidden">
                {/* Personal Info & Membership Stats (2026 Refined Layout) */}
                <PersonalInfoSection user={customer} />

                {/* Booking History (Clean Cards) */}
                <BookingHistory businessId={customer.businessId} />

                {/* Recent Reviews (Feedback) */}
                <RecentReviews reviews={customer.recentReviews} />

                {/* Favorite Salons (Premium Grid) */}
                <FavoriteSalons />
            </div>
        </main>
    );
};

export default ProfilePage;
