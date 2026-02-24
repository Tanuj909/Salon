import React from 'react';
import { Mail, Phone, MapPin, Calendar } from 'lucide-react';

const ProfileInfoCard = ({ user }) => {
    const infoItems = [
        { icon: <Mail size={18} />, label: "Email", value: user?.email || "jane.doe@example.com" },
        { icon: <Phone size={18} />, label: "Phone", value: user?.phone || "+1 (555) 123-4567" },
        { icon: <MapPin size={18} />, label: "Location", value: user?.location || "Manhattan, New York" },
        { icon: <Calendar size={18} />, label: "Joined", value: user?.joinedDate || "February 2024" },
    ];

    return (
        <div className="bg-creamy rounded-2xl p-6 shadow-sm border border-terracotta/10">
            <h3 className="text-xl font-bold text-earthy-brown mb-6 flex items-center gap-2">
                Personal Information
            </h3>

            <div className="space-y-6">
                {infoItems.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                        <div className="p-2 bg-beige rounded-lg text-terracotta">
                            {item.icon}
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-terracotta uppercase tracking-wider mb-0.5">
                                {item.label}
                            </p>
                            <p className="text-earthy-brown font-medium">
                                {item.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 pt-6 border-t border-terracotta/10">
                <h4 className="text-sm font-bold text-earthy-brown mb-3">Bio</h4>
                <p className="text-earthy-brown/70 text-sm leading-relaxed">
                    {user?.bio || "Passionate about wellness and style. Always looking for the next best beauty experience."}
                </p>
            </div>
        </div>
    );
};

export default ProfileInfoCard;
