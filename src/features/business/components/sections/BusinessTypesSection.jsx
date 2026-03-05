import React from 'react';

const BusinessTypesSection = () => {
    const businessTypes = [
        'Hair Salon', 'Waxing Studio', 'Nail Boutique', 'Premium Barbershop',
        'Massage Therapy', 'Beauty Lounge', 'Tattoo & Piercing', 'Aesthetic Clinic',
        'Weight Loss Center', 'Luxury Spa', 'Wellness Retreat', 'Yoga & Fitness',
    ];

    return (
        <section className="py-12 px-4 sm:px-6 max-w-[1000px] mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1e0a18] font-[Cormorant_Garamond] mb-2">
                Tailored for your business
            </h2>
            <div className="mb-6 mt-5">
                <p className="text-sm text-[#3c1432]/60">Elite software built for your industry</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
                {businessTypes.map((type, index) => (
                    <span key={index} className="px-4 py-2 bg-white border border-[#3c1432]/10 rounded-full text-xs hover:bg-[#7a2860] hover:text-white transition-colors cursor-pointer">
                        {type}
                    </span>
                ))}
            </div>
        </section>
    );
};

export default BusinessTypesSection;
