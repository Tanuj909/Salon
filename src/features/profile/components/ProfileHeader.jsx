import React from 'react';
import { ShieldCheck, CheckCircle } from 'lucide-react';

const ProfileHeader = ({ user }) => {
  return (
    <div className="relative w-full">
      {/* Banner Section */}
      <div className="relative w-full h-[300px] overflow-hidden">
        {/* Banner Image */}
        <img
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2074&auto=format&fit=crop"
          alt="Premium Salon Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background-dark/30 via-transparent to-background-dark/30 z-10" />

        {/* Texture/Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-10 mix-blend-overlay z-10"
          style={{
            backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')",
          }}
        />
      </div>

      {/* Profile Image Overlap */}
      <div className="relative px-12 -mt-24 z-20">
        <div className="flex items-end gap-6 flex-wrap">
          <div className="relative">
            <div className="w-48 h-48 rounded-full border-[6px] border-white dark:border-background-dark shadow-2xl overflow-hidden bg-white">
              <img
                src={user?.user?.profileImageUrl || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"}
                alt={user?.user?.fullName || "Profile"}
                className="w-full h-full object-cover"
              />
            </div>
            {user?.user?.verificationStatus === "VERIFIED" && (
                <div className="absolute bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full border-4 border-white shadow-lg">
                    <ShieldCheck size={20} />
                </div>
            )}
          </div>
          
          <div className="mb-6 flex-1 min-w-[300px]">
            <div className="flex items-center gap-3 mb-1">
                <h1 className="text-4xl font-bold text-white drop-shadow-md">{user?.user?.fullName}</h1>
                {user?.user?.isEmailVerified && (
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-wider">
                        <CheckCircle size={12} className="text-green-400" />
                        Verified
                    </div>
                )}
            </div>
            <p className="text-primary font-medium capitalize text-lg">{user?.membershipLevel || 'Bronze'} Member</p>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
