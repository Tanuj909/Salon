"use client";

import React, { useState } from "react";
import { Clock } from "lucide-react";
import { useSalonTimings } from "../hooks/useSalonTimings";

// Helper function to format HH:MM into 12-hour AM/PM
const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hoursStr, minutesStr] = timeString.split(":");
    let hours = parseInt(hoursStr, 10);
    const minutes = minutesStr;
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return `${hours}:${minutes} ${ampm}`;
};

const BusinessTimings = ({ id }) => {
    const { timings, loading, error } = useSalonTimings({ id });
    const [expanded, setExpanded] = useState(false);

    if (loading) {
        return (
            <div className="py-12 flex justify-center items-center gap-3">
                <div className="w-6 h-6 border-2 border-[#C8A951]/20 border-t-[#C8A951] rounded-full animate-spin" />
                <span className="text-sm font-medium text-[#7a7065]">Loading timings...</span>
            </div>
        );
    }

    if (error || !timings || timings.length === 0) {
        return null; // Fail gracefully
    }

    // Sort timings by day of week starting from Monday
    const dayOrder = {
        MONDAY: 1,
        TUESDAY: 2,
        WEDNESDAY: 3,
        THURSDAY: 4,
        FRIDAY: 5,
        SATURDAY: 6,
        SUNDAY: 7,
    };

    const sortedTimings = [...timings].sort((a, b) => dayOrder[a.dayOfWeek] - dayOrder[b.dayOfWeek]);

    // Current day for highlighting
    const todayStr = new Date().toLocaleDateString("en-US", { weekday: "long" }).toUpperCase();

    return (
        <section className="py-24 px-8 max-w-7xl mx-auto" id="timings">
            <div className="text-center mb-16">
                <span className="block text-[11px] tracking-[0.4em] uppercase text-[#C8A951] font-bold mb-4">When to visit</span>
                <h2 className="font-[Cormorant_Garamond,Georgia,serif] text-5xl text-[#1C1C1C] leading-tight flex justify-center items-center gap-4">
                    <Clock className="w-10 h-10 text-[#C8A951]" strokeWidth={1.5} />
                    Operating <em className="italic text-[#C8A951]">Hours</em>
                </h2>
            </div>

            <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 lg:p-12 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-[#C8A951]/10">
                <div className="space-y-2">
                    {sortedTimings.map((dayData, index) => {
                        const isToday = dayData.dayOfWeek === todayStr;
                        const isHidden = !expanded && !isToday && index > 2; // Show today + first few if collapsed (if we want collage behavior)

                        // If not expanded, only show first 3 days + today
                        if (!expanded && index > 2 && !isToday) {
                            return null;
                        }

                        return (
                            <div
                                key={dayData.id}
                                className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${isToday ? 'bg-[#F7F3EE] ring-1 ring-[#C8A951]/30' : 'hover:bg-[#F7F3EE]/50'}`}
                            >
                                <div className="flex items-center gap-3">
                                    {isToday && <span className="w-2 h-2 rounded-full bg-[#C8A951] animate-pulse" />}
                                    <span className={`text-sm tracking-widest font-bold uppercase ${isToday ? 'text-[#C8A951]' : 'text-[#1C1C1C]'}`}>
                                        {dayData.dayOfWeek.charAt(0) + dayData.dayOfWeek.slice(1).toLowerCase()}
                                    </span>
                                    {isToday && <span className="ml-2 text-[10px] bg-[#C8A951] text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Today</span>}
                                </div>

                                <div className="text-right">
                                    {dayData.isClosed ? (
                                        <span className="text-sm font-medium text-red-500/80 uppercase tracking-widest">Closed</span>
                                    ) : (
                                        <span className={`text-sm font-semibold tracking-wider ${isToday ? 'text-[#1C1C1C]' : 'text-[#7a7065]'}`}>
                                            {formatTime(dayData.openTime)} - {formatTime(dayData.closeTime)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {sortedTimings.length > 4 && (
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="w-full mt-6 py-4 border-t border-[#C8A951]/10 text-xs font-bold uppercase tracking-[0.2em] text-[#C8A951] hover:text-[#1C1C1C] transition-colors flex items-center justify-center gap-2"
                    >
                        {expanded ? "Show Less" : "View Full Schedule"}
                        <svg
                            className={`w-4 h-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                        >
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </button>
                )}
            </div>
        </section>
    );
};

export default BusinessTimings;
