"use client";

import { useCurrentCustomer } from "@/features/customer/hooks/useCurrentCustomer";
import { useAuth } from "@/features/auth/hooks/useAuth";

import React from 'react';
import ProfileHeader from './ProfileHeader';
import PersonalInfoSection from './PersonalInfoSection';
import BookingHistory from './BookingHistory';
import FavoriteSalons from './FavoriteSalons';
import RecentReviews from './RecentReviews';

const ProfilePage = () => {
    const { user: authUser, loading: authLoading } = useAuth();
    const { customer, loading: customerLoading, error: customerError } = useCurrentCustomer();

    const isCustomer = authUser?.role === 'CUSTOMER';
    const isLoading = authLoading || (isCustomer && customerLoading);

    if (isLoading) return <p className="p-10 text-center font-medium opacity-60">Loading profile...</p>;

    // Normalize display data: 
    // Customers use their full profile, others use auth data with empty stats
    const displayUser = isCustomer ? customer : { user: authUser, stats: {} };

    if (!displayUser) {
        if (isCustomer && customerError) return <p className="p-10 text-center text-red-500">{customerError}</p>;
        return null;
    }

    return (
        <main className="min-h-screen pb-20 bg-background-light">
            {/* Profile Banner & Overlap Image handle internally */}
            <ProfileHeader user={displayUser} />

            <div className="max-w-[1200px] mx-auto">
                {/* Personal Info & Membership Stats */}
                <PersonalInfoSection user={displayUser} />

                {/* Only show these for Customers */}
                {isCustomer && (
                    <>
                        <BookingHistory businessId={customer?.businessId} />
                        <RecentReviews reviews={customer?.recentReviews} />
                    </>
                )}

                {/* Favorite Salons (Premium Grid) */}
                {/* <FavoriteSalons /> */}
            </div>
        </main>
    );
};

export default ProfilePage;

