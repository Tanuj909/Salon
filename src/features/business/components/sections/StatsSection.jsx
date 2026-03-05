import React from 'react';

const StatsSection = () => {
    const stats = [
        { value: '120k+', label: 'Elite Businesses' },
        { value: '450k+', label: 'Daily Appointments' },
        { value: '1B+', label: 'Customers Served' },
        { value: '120+', label: 'Countries Worldwide' },
    ];

    return (
        <section className="py-16 px-4 sm:px-6 max-w-[1240px] mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {stats.map((stat, index) => (
                    <div key={index}>
                        <div className="text-3xl md:text-4xl font-bold text-[#c4956a] font-[Cormorant_Garamond] mb-2">
                            {stat.value}
                        </div>
                        <div className="w-10 h-0.5 bg-[#3c1432]/20 mx-auto mb-2" />
                        <div className="text-xs uppercase tracking-wider text-[#3c1432]/70">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default StatsSection;
