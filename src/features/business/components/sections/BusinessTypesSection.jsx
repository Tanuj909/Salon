// import React from 'react';

// const BusinessTypesSection = () => {
//     const businessTypes = [
//         'Hair Salon', 'Waxing Studio', 'Nail Boutique', 'Premium Barbershop',
//         'Massage Therapy', 'Beauty Lounge', 'Tattoo & Piercing', 'Aesthetic Clinic',
//         'Weight Loss Center', 'Luxury Spa', 'Wellness Retreat', 'Yoga & Fitness',
//     ];

//     return (
//         <section className="py-12 px-4 sm:px-6 max-w-[1000px] mx-auto text-center">
//             <h2 className="text-2xl md:text-3xl font-bold text-[#1e0a18] font-[Cormorant_Garamond] mb-2">
//                 Tailored for your business
//             </h2>
//             <div className="mb-6 mt-5">
//                 <p className="text-sm text-[#3c1432]/60">Elite software built for your industry</p>
//             </div>
//             <div className="flex flex-wrap justify-center gap-2">
//                 {businessTypes.map((type, index) => (
//                     <span key={index} className="px-4 py-2 bg-white border border-[#3c1432]/10 rounded-full text-xs hover:bg-[#7a2860] hover:text-white transition-colors cursor-pointer">
//                         {type}
//                     </span>
//                 ))}
//             </div>
//         </section>
//     );
// };

// export default BusinessTypesSection;
import React from 'react';

const BusinessTypesSection = () => {
    const businessTypes = [
        { label: 'Hair Salon', icon: '✂️' },
        { label: 'Waxing Studio', icon: '🌸' },
        { label: 'Nail Boutique', icon: '💅' },
        { label: 'Premium Barbershop', icon: '💈' },
        { label: 'Massage Therapy', icon: '🧘' },
        { label: 'Beauty Lounge', icon: '✨' },
        { label: 'Tattoo & Piercing', icon: '🖋️' },
        { label: 'Aesthetic Clinic', icon: '🌿' },
        { label: 'Weight Loss Center', icon: '🏃' },
        { label: 'Luxury Spa', icon: '🛁' },
        { label: 'Wellness Retreat', icon: '🌅' },
        { label: 'Yoga & Fitness', icon: '🧘' },
    ];

    return (
        <section style={{ padding: '72px 24px', maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>

            {/* Header */}
            <div style={{ marginBottom: 36 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 14 }}>
                    <div style={{ height: 1, width: 32, background: 'linear-gradient(90deg, transparent, rgba(196,149,106,0.5))' }} />
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#c4956a' }}>
                        Built for Your Industry
                    </span>
                    <div style={{ height: 1, width: 32, background: 'linear-gradient(90deg, rgba(196,149,106,0.5), transparent)' }} />
                </div>
                <h2 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(1.7rem, 3.5vw, 2.4rem)',
                    fontWeight: 700,
                    color: '#1e0a18',
                    letterSpacing: '-0.02em',
                    marginBottom: 10,
                }}>
                    Tailored for{' '}
                    <span style={{ color: '#7a2860', fontStyle: 'italic' }}>your</span>{' '}
                    business
                </h2>
                <p style={{ fontSize: '0.86rem', color: 'rgba(60,20,50,0.52)', letterSpacing: '0.01em' }}>
                    Elite software purpose-built for beauty & wellness professionals
                </p>
            </div>

            {/* Tags */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 10,
            }}>
                {businessTypes.map((type, index) => (
                    <button
                        key={index}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: 7,
                            padding: '9px 18px',
                            borderRadius: 50,
                            border: '1px solid rgba(60,20,50,0.10)',
                            background: 'rgba(255,255,255,0.7)',
                            color: '#3c1432',
                            fontSize: '0.8rem',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'all 0.18s ease',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, #c4956a, #7a2860)';
                            e.currentTarget.style.color = '#fff';
                            e.currentTarget.style.borderColor = 'transparent';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 18px rgba(196,149,106,0.28)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.7)';
                            e.currentTarget.style.color = '#3c1432';
                            e.currentTarget.style.borderColor = 'rgba(60,20,50,0.10)';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <span style={{ fontSize: '0.9rem' }}>{type.icon}</span>
                        {type.label}
                    </button>
                ))}
            </div>

            {/* Bottom CTA hint */}
            <p style={{
                marginTop: 32,
                fontSize: '0.78rem',
                color: 'rgba(60,20,50,0.38)',
                letterSpacing: '0.02em',
            }}>
                Don't see your category?{' '}
                <a href="/contact" style={{ color: '#c4956a', fontWeight: 600, textDecoration: 'none' }}>
                    Get in touch →
                </a>
            </p>
        </section>
    );
};

export default BusinessTypesSection;
