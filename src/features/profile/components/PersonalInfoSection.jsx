import React from 'react';
import Link from 'next/link';
import { 
    Edit3, Award, CalendarDays, Star, 
    CheckCircle2, XCircle, Timer, Wallet, 
    History, UserCheck, Mail, Phone, Calendar
} from 'lucide-react';

const PersonalInfoSection = ({ user }) => {
    const stats = user?.stats || {};
    
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="px-8 mt-12 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Primary Profile Card */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                        <div className="flex justify-between items-start mb-10">
                            <div>
                                <h2 className="text-sm font-black text-primary uppercase tracking-[0.2em] mb-2">Member Profile</h2>
                                <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                                    {user?.user?.fullName || "User Name"}
                                </h1>
                                <div className="flex items-center gap-3 mt-3">
                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-100 rounded-full text-slate-500 text-xs font-bold uppercase tracking-wider">
                                        <UserCheck size={14} />
                                        {user?.user?.role || "CUSTOMER"}
                                    </div>
                                    <span className="text-slate-300">•</span>
                                    <span className="text-slate-400 text-sm font-medium">Member since {formatDate(stats?.memberSince)}</span>
                                </div>
                            </div>

                            <Link
                                href="/profile/edit"
                                className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-primary transition-all shadow-lg group active:scale-95"
                            >
                                <Edit3 size={18} />
                                <span>Edit Profile</span>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 pt-8 border-t border-slate-50">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                    <Mail size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Email Address</p>
                                    <p className="text-slate-700 font-semibold">{user?.user?.email || "Not provided"}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                    <Phone size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Phone Number</p>
                                    <p className="text-slate-700 font-semibold">{user?.user?.phoneNumber || "Not provided"}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                    <Calendar size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Date of Birth</p>
                                    <p className="text-slate-700 font-semibold">{formatDate(user?.dateOfBirth)}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                    <Award size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Gender</p>
                                    <p className="text-slate-700 font-semibold capitalize">{user?.gender || "Not Specified"}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Booking Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center mb-4">
                                <CalendarDays size={20} />
                            </div>
                            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Total</p>
                            <h3 className="text-2xl font-bold text-slate-900">{stats?.totalBookings || 0}</h3>
                        </div>
                        <div className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm">
                            <div className="w-10 h-10 rounded-xl bg-green-50 text-green-500 flex items-center justify-center mb-4">
                                <CheckCircle2 size={20} />
                            </div>
                            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Completed</p>
                            <h3 className="text-2xl font-bold text-slate-900">{stats?.completedBookings || 0}</h3>
                        </div>
                        <div className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm">
                            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center mb-4">
                                <Timer size={20} />
                            </div>
                            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Pending</p>
                            <h3 className="text-2xl font-bold text-slate-900">{stats?.pendingBookings || 0}</h3>
                        </div>
                        <div className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm">
                            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center mb-4">
                                <XCircle size={20} />
                            </div>
                            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Cancelled</p>
                            <h3 className="text-2xl font-bold text-slate-900">{stats?.cancelledBookings || 0}</h3>
                        </div>
                    </div>
                </div>

                {/* Right Column: Premium Rewards & Status */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-gradient-to-br from-primary via-primary/90 to-earthy-brown p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden h-full flex flex-col justify-between">
                        <Award size={140} className="absolute -top-6 -right-6 opacity-10 stroke-[1]" />
                        
                        <div>
                            <div className="flex items-center gap-2 mb-8">
                                <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg">
                                    <Star size={20} fill="white" />
                                </div>
                                <span className="text-[10px] uppercase tracking-widest font-black">Membership Perks</span>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-60 mb-1">Loyalty Wallet</p>
                                    <h3 className="text-5xl font-black flex items-baseline gap-2">
                                        {stats?.loyaltyPoints || 0}
                                        <span className="text-xs font-bold opacity-70">PTS</span>
                                    </h3>
                                </div>
                                
                                <div className="pt-4 space-y-3">
                                    <div className="flex items-center justify-between text-xs py-2 border-b border-white/10">
                                        <span className="opacity-70">Current Tier</span>
                                        <span className="font-black capitalize">{stats?.membershipLevel || "Bronze"} Level</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs py-2 border-b border-white/10">
                                        <span className="opacity-70">Average Rating Given</span>
                                        <span className="font-black">{stats?.averageRating?.toFixed(1) || "0.0"}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs py-2 border-b border-white/10">
                                        <span className="opacity-70">Total Reviews</span>
                                        <span className="font-black">{stats?.totalReviews || 0}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 pt-8 border-t border-white/10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center">
                                    <Wallet size={24} />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest font-bold opacity-60 mb-0.5">Total Investments</p>
                                    <p className="text-xl font-black">${stats?.totalSpent?.toFixed(2) || "0.00"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Monthly Recap Row */}
            <div className="bg-slate-50 rounded-[2rem] p-8 flex items-center justify-between flex-wrap gap-8 border border-slate-100">
                <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary">
                        <History size={24} />
                    </div>
                    <div>
                        <h4 className="text-slate-900 font-bold">Month at a Glance</h4>
                        <p className="text-slate-500 text-sm">Your activity for {new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })}</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-12 flex-wrap">
                    <div className="text-center">
                        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Bookings</p>
                        <p className="text-xl font-bold text-slate-900">{stats?.currentMonthBookings || 0}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Spent</p>
                        <p className="text-xl font-bold text-slate-900">${stats?.currentMonthSpent?.toFixed(2) || "0.00"}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Last Booking</p>
                        <p className="text-sm font-bold text-slate-900">{formatDate(stats?.lastBookingAt)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfoSection;
