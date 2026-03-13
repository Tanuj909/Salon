"use client";

import React, { useRef, useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { useSalonTimings } from "../hooks/useSalonTimings";

// ─── Reveal Animation ──────────────────────────────────────────────────────────
function useReveal() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    obs.unobserve(el);
                }
            },
            { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return { ref, visible };
}

function Reveal({ children, delay = 0, className = "" }) {
    const { ref, visible } = useReveal();
    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hoursStr, minutesStr] = timeString.split(":");
    let hours = parseInt(hoursStr, 10);
    const minutes = minutesStr;
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
};

const BusinessTimings = ({ id, compact = false }) => {
    const { timings, loading, error } = useSalonTimings({ id });

    if (loading) {
        return (
            <div className={`${compact ? 'py-12' : 'py-32'} flex justify-center items-center gap-6`}>
                <div className="w-10 h-10 border-4 border-[#cd6133]/20 border-t-[#cd6133] rounded-full animate-spin" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#5a3d2b]">Aligning Moments...</span>
            </div>
        );
    }

    if (error || !timings || timings.length === 0) return null;

    const daysOfWeek = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
    const currentDay = new Date().toLocaleDateString("en-US", { weekday: "long" }).toUpperCase();

    return (
        <section className={compact ? "h-full" : "py-40"} id="timings">
            <div className={compact ? "h-full" : "max-w-7xl mx-auto px-8"}>
                {!compact && (
                    <Reveal>
                        <div className="text-center mb-24">
                            <span className="block text-[11px] tracking-[0.4em] uppercase text-[#cd6133] font-extrabold mb-8">Plan Your Visit</span>
                            <h2 className="text-6xl text-[#5a3d2b] font-bold leading-tight">
                                Opening <em className="italic font-light">Hours</em>
                            </h2>
                        </div>
                    </Reveal>
                )}

                <div className={`${compact ? 'p-8 md:p-12 rounded-[48px] h-full flex flex-col justify-center' : 'max-w-3xl mx-auto rounded-[64px] p-12 md:p-20'} bg-white border border-[#cd6133]/20 shadow-lg relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#cd6133]/5 rounded-full -translate-y-1/2 translate-x-1/2" />

                    <div className={compact ? "space-y-3" : "space-y-6"}>
                        {daysOfWeek.map((day) => {
                            const timing = timings.find(t => t.dayOfWeek === day);
                            const isSelected = day === currentDay;

                            return (
                                <div
                                    key={day}
                                    className={`flex items-center justify-between transition-all duration-500 ${compact ? 'p-5 rounded-[24px]' : 'p-8 rounded-[32px]'
                                        } ${isSelected
                                            ? "bg-[#cd6133] text-[#fef9f3] shadow-2xl scale-[1.05] z-10 relative"
                                            : "hover:bg-[#cd6133]/5 text-[#5a3d2b]"
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <span className={`${compact ? 'text-xs' : 'text-lg'} font-bold tracking-widest uppercase ${isSelected ? "text-[#fef9f3]" : "text-[#5a3d2b]"}`}>
                                            {day.charAt(0) + day.slice(1).toLowerCase()}
                                        </span>
                                        {isSelected && (
                                            <span className={`${compact ? 'text-[7px]' : 'text-[9px]'} bg-[#fef9f3]/20 px-3 py-1.5 rounded-full uppercase font-extrabold tracking-widest animate-pulse`}>
                                                Today
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-4">
                                        {!timing || timing.isClosed ? (
                                            <span className={`${compact ? 'text-[10px]' : 'text-xs'} font-extrabold uppercase tracking-widest ${isSelected ? "text-[#fef9f3]/70" : "text-[#cd6133]"}`}>
                                                Closed
                                            </span>
                                        ) : (
                                            <div className={`flex items-center ${compact ? 'gap-4' : 'gap-8'}`}>
                                                <span className={`${compact ? 'text-xs' : 'text-base'} font-bold ${isSelected ? "text-[#fef9f3]" : "text-[#5a3d2b]"}`}>
                                                    {formatTime(timing.openTime)} — {formatTime(timing.closeTime)}
                                                </span>
                                                <div className={`${compact ? 'w-8 h-8' : 'w-10 h-10'} rounded-full flex items-center justify-center ${isSelected ? "bg-white/20" : "bg-[#cd6133]/10"}`}>
                                                    <Clock className={compact ? "w-4 h-4" : "w-5 h-5"} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BusinessTimings;
