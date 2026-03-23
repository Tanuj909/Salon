import React from 'react';

const OnlineBookingSection = () => {
    return (
        <section className="py-16 md:py-20 px-4 sm:px-6 border-y border-[#3c1432]/5">
            <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold rec-section-heading font-[Cormorant_Garamond,serif] mb-6 leading-tight tracking-tight">
                        Grow sales by attracting <span className="italic rec-section-heading-accent font-light underline decoration-[#C8A951]/20">new clients</span> online
                    </h2>
                    <p className="text-base sm:text-lg rec-section-subtext mb-8 font-medium leading-relaxed">
                        Be seen, be available, and get booked instantly. Create a stunning online profile and get discovered by thousands of potential customers, 24/7.
                    </p>
                    <ul className="space-y-4">
                        {['Attract and retain premium clients', 'Seamless online self-booking experience', 'Build reputation with trusted ratings & reviews'].map((item, i) => (
                            <li key={i} className="flex items-center gap-4 text-sm font-bold rec-section-heading tracking-wide">
                                <div className="w-6 h-6 rounded-full bg-[#C8A951]/10 flex items-center justify-center text-[#C8A951] shrink-0 border border-[#C8A951]/20">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </div>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div className="hero-filter-input-bg rounded-[2rem] p-10 h-[350px] flex items-center justify-center border rec-card-border shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1C3152]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="text-center relative z-10 transition-transform duration-500 group-hover:scale-110">
                        <span className="text-7xl block mb-6 drop-shadow-xl">📱✨</span>
                        <span className="text-2xl font-bold rec-section-heading tracking-tight italic">Your Premium App</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OnlineBookingSection;
