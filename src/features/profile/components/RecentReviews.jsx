"use client";

import React from 'react';
import { Star, MessageSquare, Calendar } from 'lucide-react';

const RecentReviews = ({ reviews }) => {
    const displayReviews = reviews || [];

    if (displayReviews.length === 0) {
        return (
            <div className="px-8 mt-16">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">Recent Reviews</h2>
                <div className="bg-white p-12 rounded-xl border border-dashed border-slate-200 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                        <MessageSquare size={32} />
                    </div>
                    <p className="text-slate-500 font-medium">You haven't left any reviews yet.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="px-8 mt-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Recent Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayReviews.map((review) => (
                    <div key={review.id} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                    {review.salonName?.charAt(0) || 'S'}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 leading-tight">{review.salonName || 'Salon Name'}</h4>
                                    <p className="text-xs text-slate-500">{review.serviceName || 'Service'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 px-2 py-1 bg-yellow-50 text-yellow-600 rounded-lg text-xs font-bold">
                                <Star size={12} fill="currentColor" />
                                {review.rating?.toFixed(1) || '0.0'}
                            </div>
                        </div>
                        <p className="text-slate-600 text-sm italic mb-4">
                            "{review.comment || review.content}"
                        </p>
                        <div className="flex items-center gap-2 text-slate-400 text-[10px] uppercase font-bold tracking-wider pt-4 border-t border-slate-50">
                            <Calendar size={12} />
                            {new Date(review.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentReviews;
