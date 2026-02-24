import React from 'react';
import Link from 'next/link';
import { Edit3, Award, CalendarDays, Star } from 'lucide-react';

const PersonalInfoSection = ({ user }) => {
    return (
        <div className="px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Basic Info */}
            <div className="lg:col-span-7 bg-white p-8 rounded-xl shadow-sm border border-slate-100 relative">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">
                            {user?.name || "Alexandra Montgomery"}
                        </h1>
                        <div className="flex items-center gap-2 text-primary font-semibold">
                            <Award size={18} />
                            <span>{user?.membershipType || "Gold Status Member"}</span>
                        </div>
                    </div>

                    <Link
                        href="/profile/edit"
                        className="flex items-center gap-2 px-6 py-3 bg-slate-300 rounded-full font-bold hover:bg-slate-400 transition-all shadow-md group"
                    >
                        <Edit3 size={18} className="group-hover:scale-110 transition-transform" />
                        <span >Edit Profile</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Email Address</label>
                        <p className="text-lg font-medium text-slate-700">{user?.email || "alexandra.m@luxe-mail.com"}</p>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Phone Number</label>
                        <p className="text-lg font-medium text-slate-700">{user?.phone || "+1 (555) 234-8901"}</p>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Date of Birth</label>
                        <p className="text-lg font-medium text-slate-700">{user?.dob || "March 12, 1994"}</p>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Location</label>
                        <p className="text-lg font-medium text-slate-700">{user?.location || "Manhattan, NY"}</p>
                    </div>
                </div>
            </div>

            {/* Right Column: Stats Card */}
            <div className="lg:col-span-5 flex flex-col gap-6">
                <div className="bg-gradient-to-br from-primary via-primary/80 to-primary/60 p-8 rounded-xl shadow-xl text-white relative overflow-hidden">
                    <Award size={120} className="absolute -top-4 -right-4 opacity-10 stroke-[1]" />

                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div className="mb-12">
                            <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-80 mb-1">Loyalty Points</p>
                            <h3 className="text-4xl font-black">{user?.loyaltyPoints || "2,450"}</h3>
                            <p className="text-xs mt-2 bg-white/20 backdrop-blur-sm inline-block px-3 py-1 rounded-full font-bold">
                                Level 4 Premium Member
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-6">
                            <div>
                                <p className="text-[10px] uppercase tracking-widest opacity-70 mb-1">Total Bookings</p>
                                <div className="flex items-center gap-2">
                                    <CalendarDays size={16} />
                                    <span className="font-bold">{user?.totalBookings || "48"}</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-widest opacity-70 mb-1">Average Rating</p>
                                <div className="flex items-center gap-2">
                                    <Star size={16} fill="white" />
                                    <span className="font-bold">4.9</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfoSection;
