// import React from 'react';

// const FeaturesSection = () => {
//     const features = [
//         { emoji: '📅', title: 'Appointment scheduling', description: 'A seamless booking software with intelligent automated reminders.' },
//         { emoji: '💳', title: 'Payment processing', description: 'Secure, frictionless payments via PayPal, Stripe, and more.' },
//         { emoji: '🛒', title: 'Point of sale (POS)', description: 'Effortlessly manage transactions, barcode scanning, and digital receipts.' },
//         { emoji: '📢', title: 'Marketing promotions', description: 'Powerful curated marketing tools for targeted promotions and elite discounts.' },
//         { emoji: '📦', title: 'Product inventory', description: 'Precisely track stock levels and seamlessly manage online retail sales.' },
//         { emoji: '📊', title: 'Reporting & analytics', description: 'Analyze comprehensive performance metrics with real-time actionable insights.' },
//     ];

//     return (
//         <section className="py-16 md:py-20 px-4 sm:px-6 max-w-[1240px] mx-auto">
//             <div className="text-center mb-12 flex flex-col justify-center items-center">
//                 <h2 className="text-3xl md:text-4xl font-bold text-[#1e0a18] font-[Cormorant_Garamond] mb-3">
//                     A full solution to manage and <span className="italic text-[#7a2860]">grow</span> your business
//                 </h2>
//                 <p className="text-base text-[#3c1432]/70 max-w-2xl mx-auto">
//                     Packed with all the essential tools you need to boost sales, seamlessly manage your calendar, and retain elite clients.
//                 </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//                 {features.map((feature, index) => (
//                     <div key={index} className="bg-white p-6 rounded-xl border border-[#3c1432]/5 hover:shadow-lg transition-shadow">
//                         <div className="w-12 h-12 bg-plum/5 rounded-xl flex items-center justify-center text-2xl mb-4">
//                             {feature.emoji}
//                         </div>
//                         <h3 className="text-lg font-bold text-[#1e0a18] mb-2">{feature.title}</h3>
//                         <p className="text-sm text-[#3c1432]/60 leading-relaxed">
//                             {feature.description}
//                         </p>
//                     </div>
//                 ))}
//             </div>
//         </section>
//     );
// };

// export default FeaturesSection;

import React from 'react';

const FeaturesSection = () => {
    const features = [
        {
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
            ),
            title: 'Appointment Scheduling',
            description: 'Seamless booking with intelligent automated reminders that reduce no-shows by up to 40%.',
        },
        {
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
                </svg>
            ),
            title: 'Payment Processing',
            description: 'Secure, frictionless payments via PayPal, Stripe, and more — fully integrated.',
        },
        {
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
                </svg>
            ),
            title: 'Point of Sale (POS)',
            description: 'Effortlessly manage transactions, barcode scanning, and digital receipts.',
        },
        {
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
            ),
            title: 'Marketing Promotions',
            description: 'Powerful curated marketing tools for targeted promotions and elite discounts.',
        },
        {
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
            ),
            title: 'Product Inventory',
            description: 'Precisely track stock levels and seamlessly manage online retail sales.',
        },
        {
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
                </svg>
            ),
            title: 'Reporting & Analytics',
            description: 'Analyze comprehensive performance metrics with real-time actionable insights.',
        },
    ];

    return (
        <section style={{ padding: '80px 24px', maxWidth: 1200, margin: '0 auto' }}>

            {/* Section header */}
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    marginBottom: 18,
                }}>
                    <div style={{ width: 28, height: 1, background: 'rgba(196,149,106,0.5)' }} />
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#c4956a' }}>
                        Everything You Need
                    </span>
                    <div style={{ width: 28, height: 1, background: 'rgba(196,149,106,0.5)' }} />
                </div>
                <h2 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                    fontWeight: 700,
                    color: '#1e0a18',
                    lineHeight: 1.12,
                    letterSpacing: '-0.02em',
                    marginBottom: 14,
                }}>
                    A full solution to manage and{' '}
                    <span style={{ color: '#7a2860', fontStyle: 'italic' }}>grow</span>{' '}
                    your business
                </h2>
                <p style={{
                    fontSize: '0.95rem', color: 'rgba(60,20,50,0.60)',
                    maxWidth: 520, margin: '0 auto', lineHeight: 1.7,
                }}>
                    Packed with essential tools to boost sales, manage your calendar seamlessly, and retain elite clients.
                </p>
            </div>

            {/* Feature grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: 20,
            }}>
                {features.map((feature, index) => (
                    <div
                        key={index}
                        style={{
                            padding: '28px 28px 28px',
                            borderRadius: 18,
                            border: '1px solid rgba(60,20,50,0.07)',
                            background: 'rgba(255,255,255,0.7)',
                            transition: 'all 0.22s ease',
                            cursor: 'default',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.boxShadow = '0 16px 48px rgba(60,20,50,0.09)';
                            e.currentTarget.style.borderColor = 'rgba(196,149,106,0.28)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.borderColor = 'rgba(60,20,50,0.07)';
                        }}
                    >
                        {/* Hover accent line */}
                        <div style={{
                            position: 'absolute', top: 0, left: 24, right: 24, height: 2,
                            background: 'linear-gradient(90deg, #c4956a, #7a2860)',
                            borderRadius: '0 0 4px 4px',
                            opacity: 0,
                            transition: 'opacity 0.22s',
                        }} className="feature-accent-line" />

                        {/* Icon */}
                        <div style={{
                            width: 46, height: 46,
                            borderRadius: 13,
                            background: 'linear-gradient(135deg, rgba(196,149,106,0.12), rgba(122,40,96,0.06))',
                            border: '1px solid rgba(196,149,106,0.18)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#c4956a',
                            marginBottom: 18,
                        }}>
                            {feature.icon}
                        </div>

                        {/* Number */}
                        <div style={{
                            position: 'absolute', top: 22, right: 24,
                            fontSize: '0.65rem', fontWeight: 700,
                            color: 'rgba(60,20,50,0.12)',
                            fontFamily: "'Cormorant Garamond', serif",
                            letterSpacing: '0.04em',
                        }}>
                            0{index + 1}
                        </div>

                        <h3 style={{
                            fontSize: '0.98rem', fontWeight: 700,
                            color: '#1e0a18', marginBottom: 8,
                            letterSpacing: '-0.01em',
                        }}>
                            {feature.title}
                        </h3>
                        <p style={{
                            fontSize: '0.85rem', color: 'rgba(60,20,50,0.58)',
                            lineHeight: 1.65,
                        }}>
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>

            <style>{`
                div:hover .feature-accent-line { opacity: 1 !important; }
            `}</style>
        </section>
    );
};

export default FeaturesSection;