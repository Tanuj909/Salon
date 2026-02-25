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
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-[#3c143208]">
                        <div className="flex justify-between items-start mb-10">
                            <div>
                                <h2 className="text-[0.62rem] font-black text-[#7a2860] uppercase tracking-[0.25em] mb-2.5">Member Profile</h2>
                                <h1 className="text-4xl font-bold tracking-tight text-[#1e0a18] font-[Cormorant_Garamond]">
                                    {user?.user?.fullName || "User Name"}
                                </h1>
                                <div className="flex items-center gap-3 mt-4">
                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-[#3c143205] border border-[#3c14320a] rounded-full text-[#3c143280] text-[10px] font-black uppercase tracking-wider">
                                        <UserCheck size={12} />
                                        {user?.user?.role || "CUSTOMER"}
                                    </div>
                                    <span className="text-[#3c143215]">•</span>
                                    <span className="text-[#3c143240] text-xs font-bold uppercase tracking-wider lowercase">Joined {formatDate(stats?.memberSince)}</span>
                                </div>
                            </div>

                            <Link
                                href="/profile/edit"
                                className="flex items-center gap-2 px-6 py-3 bg-[#1e0a18] text-white rounded-xl font-bold hover:bg-[#7a2860] transition-all shadow-md group active:scale-95 text-sm"
                            >
                                <Edit3 size={16} />
                                <span>Modify Details</span>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-7 gap-x-10 pt-8 border-t border-[#3c143208]">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-[#fdfaf8] border border-[#3c14320a] flex items-center justify-center text-[#7a2860]/50">
                                    <Mail size={16} />
                                </div>
                                <div>
                                    <p className="text-[0.6rem] uppercase tracking-widest text-[#3c143240] font-black mb-1">Email Address</p>
                                    <p className="text-[#1e0a18] font-bold text-sm">{user?.user?.email || "Not provided"}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-[#fdfaf8] border border-[#3c14320a] flex items-center justify-center text-[#7a2860]/50">
                                    <Phone size={16} />
                                </div>
                                <div>
                                    <p className="text-[0.6rem] uppercase tracking-widest text-[#3c143240] font-black mb-1">Phone Number</p>
                                    <p className="text-[#1e0a18] font-bold text-sm">{user?.user?.phoneNumber || "Not provided"}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-[#fdfaf8] border border-[#3c14320a] flex items-center justify-center text-[#7a2860]/50">
                                    <Calendar size={16} />
                                </div>
                                <div>
                                    <p className="text-[0.6rem] uppercase tracking-widest text-[#3c143240] font-black mb-1">Date of Birth</p>
                                    <p className="text-[#1e0a18] font-bold text-sm">{formatDate(user?.dateOfBirth)}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-[#fdfaf8] border border-[#3c14320a] flex items-center justify-center text-[#7a2860]/50">
                                    <Award size={16} />
                                </div>
                                <div>
                                    <p className="text-[0.6rem] uppercase tracking-widest text-[#3c143240] font-black mb-1">Gender Identity</p>
                                    <p className="text-[#1e0a18] font-bold text-sm capitalize">{user?.gender || "Not Specified"}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Booking Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white p-5 rounded-[1.8rem] border border-[#3c143205] shadow-sm">
                            <div className="w-9 h-9 rounded-xl bg-[#3c143208] text-[#7a2860] flex items-center justify-center mb-4">
                                <CalendarDays size={18} />
                            </div>
                            <p className="text-[0.55rem] uppercase tracking-widest text-[#3c143240] font-black mb-1">Total Bookings</p>
                            <h3 className="text-xl font-bold text-[#1e0a18]">{stats?.totalBookings || 0}</h3>
                        </div>
                        <div className="bg-white p-5 rounded-[1.8rem] border border-[#3c143205] shadow-sm">
                            <div className="w-9 h-9 rounded-xl bg-[#f0f9f4] text-[#10b981] flex items-center justify-center mb-4">
                                <CheckCircle2 size={18} />
                            </div>
                            <p className="text-[0.55rem] uppercase tracking-widest text-[#3c143240] font-black mb-1">Completed</p>
                            <h3 className="text-xl font-bold text-[#1e0a18]">{stats?.completedBookings || 0}</h3>
                        </div>
                        <div className="bg-white p-5 rounded-[1.8rem] border border-[#3c143205] shadow-sm">
                            <div className="w-9 h-9 rounded-xl bg-[#fff9f0] text-[#f59e0b] flex items-center justify-center mb-4">
                                <Timer size={18} />
                            </div>
                            <p className="text-[0.55rem] uppercase tracking-widest text-[#3c143240] font-black mb-1">In Process</p>
                            <h3 className="text-xl font-bold text-[#1e0a18]">{stats?.pendingBookings || 0}</h3>
                        </div>
                        <div className="bg-white p-5 rounded-[1.8rem] border border-[#3c143205] shadow-sm">
                            <div className="w-9 h-9 rounded-xl bg-[#fffafb] text-[#ef4444] flex items-center justify-center mb-4">
                                <XCircle size={18} />
                            </div>
                            <p className="text-[0.55rem] uppercase tracking-widest text-[#3c143240] font-black mb-1">Cancelled</p>
                            <h3 className="text-xl font-bold text-[#1e0a18]">{stats?.cancelledBookings || 0}</h3>
                        </div>
                    </div>
                </div>

                {/* Right Column: Premium Rewards & Status */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-gradient-to-br from-[#1e0a18] via-[#3c1432] to-[#7a2860] p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden h-full flex flex-col justify-between border border-white/5">
                        <Award size={160} className="absolute -top-10 -right-10 opacity-10 stroke-[0.5] rotate-12" />

                        <div>
                            <div className="flex items-center gap-2.5 mb-8">
                                <div className="p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/10">
                                    <Star size={16} fill="#c4956a" color="#c4956a" />
                                </div>
                                <span className="text-[0.6rem] uppercase tracking-[0.2em] font-black opacity-80">Elite Rewards</span>
                            </div>

                            <div className="space-y-7">
                                <div>
                                    <p className="text-[0.6rem] uppercase tracking-[0.2em] font-black opacity-50 mb-1.5">Loyalty Points</p>
                                    <h3 className="text-5xl font-black flex items-baseline gap-2 font-[Cormorant_Garamond]">
                                        {stats?.loyaltyPoints || 0}
                                        <span className="text-[0.7rem] font-black tracking-widest opacity-60">PTS</span>
                                    </h3>
                                </div>

                                <div className="pt-4 space-y-4">
                                    <div className="flex items-center justify-between text-[0.65rem] py-2.5 border-b border-white/5">
                                        <span className="opacity-50 font-black uppercase tracking-widest">Membership Tier</span>
                                        <span className="font-bold text-[#c4956a] capitalize tracking-wider">{stats?.membershipLevel || "Bronze"}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-[0.65rem] py-2.5 border-b border-white/5">
                                        <span className="opacity-50 font-black uppercase tracking-widest">Avg. Feedbacks</span>
                                        <span className="font-bold tracking-wider">{stats?.averageRating?.toFixed(1) || "0.0"} / 5.0</span>
                                    </div>
                                    <div className="flex items-center justify-between text-[0.65rem] py-2.5 border-b border-white/5">
                                        <span className="opacity-50 font-black uppercase tracking-widest">Total Reviews</span>
                                        <span className="font-bold tracking-wider">{stats?.totalReviews || 0}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 pt-8 border-t border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="w-11 h-11 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 flex items-center justify-center text-[#c4956a]">
                                    <Wallet size={20} />
                                </div>
                                <div>
                                    <p className="text-[0.55rem] uppercase tracking-widest font-black opacity-50 mb-0.5">Total Spent</p>
                                    <p className="text-xl font-bold tracking-tight">${stats?.totalSpent?.toFixed(2) || "0.00"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Monthly Recap Row */}
            <div className="bg-[#3c143204] rounded-[2.5rem] p-8 flex items-center justify-between flex-wrap gap-8 border border-[#3c143208]">
                <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-[#3c14320a] flex items-center justify-center text-[#7a2860]">
                        <History size={22} />
                    </div>
                    <div>
                        <h4 className="text-[#1e0a18] font-bold">Monthly Recap</h4>
                        <p className="text-[#3c143260] text-xs font-medium tracking-wide">Activity for {new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })}</p>
                    </div>
                </div>

                <div className="flex items-center gap-12 flex-wrap">
                    <div className="text-center">
                        <p className="text-[0.6rem] uppercase tracking-widest text-[#3c143240] font-black mb-1.5">Bookings</p>
                        <p className="text-lg font-bold text-[#1e0a18]">{stats?.currentMonthBookings || 0}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[0.6rem] uppercase tracking-widest text-[#3c143240] font-black mb-1.5">Spent</p>
                        <p className="text-lg font-bold text-[#1e0a18] tracking-tight">${stats?.currentMonthSpent?.toFixed(2) || "0.00"}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[0.6rem] uppercase tracking-widest text-[#3c143240] font-black mb-1.5">Last Visit</p>
                        <p className="text-[0.75rem] font-bold text-[#1e0a18] tracking-wide uppercase">{stats?.lastBookingAt ? new Date(stats.lastBookingAt).toLocaleDateString() : 'N/A'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfoSection;
