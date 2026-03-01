// import React from 'react';
// import { Heart, Star, ShieldCheck, Bell } from 'lucide-react';

// const ProfileDetails = () => {
//     const settings = [
//         { icon: <Heart size={20} />, title: "My Favorites", desc: "Your saved salons and services" },
//         { icon: <Star size={20} />, title: "Reviews", desc: "Manage your ratings and feedback" },
//         { icon: <Bell size={20} />, title: "Notifications", desc: "Manage your alert preferences" },
//         { icon: <ShieldCheck size={20} />, title: "Security", desc: "Password and privacy settings" },
//     ];

//     return (
//         <div className="bg-creamy rounded-2xl p-6 shadow-sm border border-terracotta/10">
//             <h3 className="text-xl font-bold text-earthy-brown mb-6">Account Settings</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {settings.map((item, index) => (
//                     <div key={index} className="p-4 rounded-xl bg-beige/50 hover:bg-beige transition-default cursor-pointer flex items-center gap-4 border border-transparent hover:border-terracotta/20">
//                         <div className="p-2 bg-creamy rounded-lg text-terracotta shadow-sm">
//                             {item.icon}
//                         </div>
//                         <div>
//                             <h4 className="font-bold text-earthy-brown text-sm">{item.title}</h4>
//                             <p className="text-xs text-earthy-brown/60">{item.desc}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ProfileDetails;

// Improved ProfileDetails.jsx
import React from 'react';
import { Heart, Star, ShieldCheck, Bell } from 'lucide-react';

const ProfileDetails = () => {
    const settings = [
        { icon: <Heart size={24} />, title: "My Favorites", desc: "Your saved salons and services" },
        { icon: <Star size={24} />, title: "Reviews", desc: "Manage your ratings and feedback" },
        { icon: <Bell size={24} />, title: "Notifications", desc: "Manage your alert preferences" },
        { icon: <ShieldCheck size={24} />, title: "Security", desc: "Password and privacy settings" },
    ];

    return (
        <div className="bg-white rounded-3xl p-8 shadow-md border border-terracotta/5 overflow-hidden relative">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] pointer-events-none" />
            
            <h3 className="text-2xl font-bold text-earthy-brown mb-8 relative z-10">Account Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {settings.map((item, index) => (
                    <div 
                        key={index} 
                        className="p-6 rounded-2xl bg-beige/30 hover:bg-beige/50 transition-all duration-300 cursor-pointer flex items-center gap-4 border border-terracotta/10 hover:border-terracotta/30 hover:shadow-md group"
                    >
                        <div className="p-3 bg-white rounded-xl text-terracotta shadow-sm group-hover:shadow-md transition-shadow transform group-hover:scale-110 duration-300">
                            {item.icon}
                        </div>
                        <div>
                            <h4 className="font-bold text-earthy-brown text-base group-hover:text-terracotta transition-colors">{item.title}</h4>
                            <p className="text-sm text-earthy-brown/70">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileDetails;