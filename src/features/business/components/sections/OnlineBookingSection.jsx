import React from 'react';

const OnlineBookingSection = () => {
    return (
        <section className="py-16 md:py-20 px-4 sm:px-6 border-y border-[#3c1432]/5">
            <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1e0a18] font-[Cormorant_Garamond] mb-4">
                        Grow sales by attracting <span className="italic text-[#7a2860]">new clients</span> online
                    </h2>
                    <p className="text-base text-[#3c1432]/70 mb-6">
                        Be seen, be available, and get booked instantly. Create a stunning online profile and get discovered by thousands of potential customers, 24/7.
                    </p>
                    <ul className="space-y-3">
                        {['Attract and retain premium clients', 'Seamless online self-booking experience', 'Build reputation with trusted ratings & reviews'].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm">
                                <div className="w-5 h-5 rounded-full bg-plum/10 flex items-center justify-center text-[#7a2860] shrink-0">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </div>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div className="bg-[#f9f5f2] rounded-2xl p-8 h-[300px] flex items-center justify-center border border-white/50">
                    <div className="text-center">
                        <span className="text-6xl block mb-4">📱✨</span>
                        <span className="text-xl font-medium text-[#3c1432]">Your Premium App</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OnlineBookingSection;
