import React from 'react';

const StatsSection = () => {
    const stats = [
        { value: '120k+', label: 'Elite Businesses' },
        { value: '450k+', label: 'Daily Appointments' },
        { value: '1B+', label: 'Customers Served' },
        { value: '120+', label: 'Countries Worldwide' },
    ];

    return (
        <section className="py-8 px-4 sm:px-6 max-w-[1240px] mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {stats.map((stat, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div className="text-3xl md:text-5xl font-bold rec-section-heading-accent font-[Cormorant_Garamond,serif] mb-2 tracking-tight">
                            {stat.value}
                        </div>
                        <div className="w-8 h-[1px] bg-[#C8A951]/40 mb-3" />
                        <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] rec-section-subtext">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default StatsSection;
