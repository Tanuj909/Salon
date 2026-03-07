"use client";

import React from 'react';
import { Star, MessageSquare, Calendar } from 'lucide-react';

const RecentReviews = ({ reviews }) => {
    const displayReviews = reviews || [];

    if (displayReviews.length === 0) {
        return (
            <div className="px-4 sm:px-8 mt-12 sm:mt-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Recent Reviews</h2>
                <div className="bg-white p-12 rounded-xl border border-dashed border-border text-center">
                    <div className="w-16 h-16 bg-background-light rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                        <MessageSquare size={32} />
                    </div>
                    <p className="text-muted font-medium">You haven't left any reviews yet.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="px-4 sm:px-8 mt-12 sm:mt-16">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1e0a18] mb-8 font-[Cormorant_Garamond]">Share Feedback</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayReviews.map((review) => (
                    <div key={review.id} className="bg-white p-5 sm:p-6 rounded-2xl border border-[#3c143208] shadow-sm hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#3c143208] border border-[#3c14320a] flex items-center justify-center text-[#7a2860] font-black text-xs">
                                    {review.salonName?.charAt(0) || 'S'}
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#1e0a18] leading-tight font-[Cormorant_Garamond] text-md">{review.salonName || 'Premium Salon'}</h4>
                                    <p className="text-[0.6rem] uppercase tracking-widest text-[#3c143240] font-black">{review.serviceName || 'Service'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 px-2 py-1 bg-[#fff9f0] border border-[#f59e0b10] text-[#f59e0b] rounded-lg text-[10px] font-black">
                                <Star size={10} fill="currentColor" />
                                {review.rating?.toFixed(1) || '0.0'}
                            </div>
                        </div>
                        <p className="text-[#3c143280] text-[0.85rem] italic mb-5 leading-relaxed">
                            "{review.comment || review.content}"
                        </p>
                        <div className="flex items-center gap-2 text-[#3c143230] text-[0.55rem] uppercase font-black tracking-[0.15em] pt-4 border-t border-[#3c143208]">
                            <Calendar size={10} />
                            {new Date(review.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentReviews;
