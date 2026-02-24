import React from 'react';
import { Heart, Star, ShieldCheck, Bell } from 'lucide-react';

const ProfileDetails = () => {
    const settings = [
        { icon: <Heart size={20} />, title: "My Favorites", desc: "Your saved salons and services" },
        { icon: <Star size={20} />, title: "Reviews", desc: "Manage your ratings and feedback" },
        { icon: <Bell size={20} />, title: "Notifications", desc: "Manage your alert preferences" },
        { icon: <ShieldCheck size={20} />, title: "Security", desc: "Password and privacy settings" },
    ];

    return (
        <div className="bg-creamy rounded-2xl p-6 shadow-sm border border-terracotta/10">
            <h3 className="text-xl font-bold text-earthy-brown mb-6">Account Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {settings.map((item, index) => (
                    <div key={index} className="p-4 rounded-xl bg-beige/50 hover:bg-beige transition-default cursor-pointer flex items-center gap-4 border border-transparent hover:border-terracotta/20">
                        <div className="p-2 bg-creamy rounded-lg text-terracotta shadow-sm">
                            {item.icon}
                        </div>
                        <div>
                            <h4 className="font-bold text-earthy-brown text-sm">{item.title}</h4>
                            <p className="text-xs text-earthy-brown/60">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileDetails;
