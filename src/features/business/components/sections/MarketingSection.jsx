import React from 'react';

const MarketingSection = () => {
    return (
        <section className="py-16 md:py-20 px-4 sm:px-6 max-w-[1240px] mx-auto border-t border-[#3c1432]/5">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1 bg-white rounded-2xl p-8 h-[300px] flex items-center justify-center border border-[#3c1432]/5">
                    <div className="text-center">
                        <span className="text-6xl block mb-4">💬📧</span>
                        <span className="text-xl font-medium text-[#3c1432]">Smart Marketing</span>
                    </div>
                </div>
                
                <div className="order-1 md:order-2">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1e0a18] font-[Cormorant_Garamond] mb-4">
                        Stay in touch with <span className="italic text-[#7a2860]">smart</span> campaigns
                    </h2>
                    <p className="text-base text-[#3c1432]/70 mb-6">
                        Engage clients effortlessly. Automate messaging to reduce no-shows, keep promotions active, and boost retention.
                    </p>
                    <ul className="space-y-3">
                        {['Exquisite customizable message templates', 'Advanced precision client targeting', 'Automated reminders & post-visit follow-ups'].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm">
                                <div className="w-5 h-5 rounded-full bg-plum/10 flex items-center justify-center text-[#7a2860] shrink-0">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </div>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default MarketingSection;
