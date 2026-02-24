import React from 'react';

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
        <div className="flex items-end gap-6">
          <div className="relative">
            <div className="w-48 h-48 rounded-full border-[6px] border-white dark:border-background-dark shadow-2xl overflow-hidden bg-white">
              <img
                src={user?.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"}
                alt={user?.name || "Profile"}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Optional: You can add name + title here later */}
          
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-white drop-shadow-md">{user?.name}</h1>
            <p className="text-primary font-medium">Premium Gold Member</p>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;