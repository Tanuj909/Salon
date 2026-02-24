import React from 'react';
import ProfileHeader from './ProfileHeader';
import PersonalInfoSection from './PersonalInfoSection';
import BookingHistory from './BookingHistory';
import FavoriteSalons from './FavoriteSalons';

const ProfilePage = () => {
    const user = {
        name: "Tanuj Kashyap",
        email: "tanuj@example.com",
        phone: "+91 98765 43210",
        dob: "Feb 20, 1995",
        location: "Mumbai, India",
        membershipType: "Gold Status Member",
        loyaltyPoints: "2,450",
        totalBookings: "48",
        avatar: null // Will use default in Header
    };

    return (
        <main className="min-h-screen pb-20 bg-background-light">
            {/* Profile Banner & Overlap Image handle internally */}
            <ProfileHeader user={user} />

            <div className="max-w-[1200px] mx-auto overflow-hidden">
                {/* Personal Info & Membership Stats (2026 Refined Layout) */}
                <PersonalInfoSection user={user} />

                {/* Booking History (Clean Cards) */}
                <BookingHistory />

                {/* Favorite Salons (Premium Grid) */}
                <FavoriteSalons />
            </div>
        </main>
    );
};

export default ProfilePage;
