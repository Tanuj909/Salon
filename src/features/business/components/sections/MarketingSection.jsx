// import React from 'react';

// const MarketingSection = () => {
//     return (
//         <section className="py-16 md:py-20 px-4 sm:px-6 max-w-[1240px] mx-auto border-t border-[#3c1432]/5">
//             <div className="grid md:grid-cols-2 gap-12 items-center">
//                 <div className="order-2 md:order-1 bg-white rounded-2xl p-8 h-[300px] flex items-center justify-center border border-[#3c1432]/5">
//                     <div className="text-center">
//                         <span className="text-6xl block mb-4">💬📧</span>
//                         <span className="text-xl font-medium text-[#3c1432]">Smart Marketing</span>
//                     </div>
//                 </div>

//                 <div className="order-1 md:order-2">
//                     <h2 className="text-3xl md:text-4xl font-bold text-[#1e0a18] font-[Cormorant_Garamond] mb-4">
//                         Stay in touch with <span className="italic text-[#7a2860]">smart</span> campaigns
//                     </h2>
//                     <p className="text-base text-[#3c1432]/70 mb-6">
//                         Engage clients effortlessly. Automate messaging to reduce no-shows, keep promotions active, and boost retention.
//                     </p>
//                     <ul className="space-y-3">
//                         {['Exquisite customizable message templates', 'Advanced precision client targeting', 'Automated reminders & post-visit follow-ups'].map((item, i) => (
//                             <li key={i} className="flex items-center gap-3 text-sm">
//                                 <div className="w-5 h-5 rounded-full bg-plum/10 flex items-center justify-center text-[#7a2860] shrink-0">
//                                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
//                                 </div>
//                                 {item}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default MarketingSection;

import React from 'react';

const MarketingSection = () => {
    const points = [
        { label: 'Exquisite customizable message templates', icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6' },
        { label: 'Advanced precision client targeting', icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75' },
        { label: 'Automated reminders & post-visit follow-ups', icon: 'M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0' },
    ];

    return (
        <section style={{ padding: '72px 24px', maxWidth: 1200, margin: '0 auto' }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 48,
                alignItems: 'center',
            }}>

                {/* Visual Card */}
                <div style={{
                    borderRadius: 24,
                    border: '1px solid rgba(60,20,50,0.08)',
                    background: 'linear-gradient(135deg, rgba(196,149,106,0.05) 0%, rgba(122,40,96,0.04) 100%)',
                    padding: 40,
                    minHeight: 340,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 20,
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    {/* Decorative circles */}
                    <div style={{
                        position: 'absolute', top: -40, right: -40,
                        width: 180, height: 180,
                        borderRadius: '50%',
                        border: '1px solid rgba(196,149,106,0.12)',
                    }} />
                    <div style={{
                        position: 'absolute', bottom: -30, left: -30,
                        width: 130, height: 130,
                        borderRadius: '50%',
                        border: '1px solid rgba(122,40,96,0.08)',
                    }} />

                    {/* Mock notification cards */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 280, position: 'relative' }}>
                        {[
                            { icon: '📩', title: 'Reminder sent', sub: 'Your appointment is tomorrow at 3pm', time: 'Just now' },
                            { icon: '⭐', title: 'Review request', sub: 'How was your experience today?', time: '2 min ago' },
                            { icon: '🎁', title: 'Promo blast', sub: '20% off this weekend — 48 clients reached', time: '1 hr ago' },
                        ].map((notif, i) => (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'flex-start', gap: 12,
                                padding: '12px 14px',
                                borderRadius: 12,
                                background: '#fff',
                                border: '1px solid rgba(196,149,106,0.12)',
                                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                                opacity: 1 - i * 0.08,
                                transform: `scale(${1 - i * 0.02})`,
                            }}>
                                <span style={{ fontSize: 20, flexShrink: 0 }}>{notif.icon}</span>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                                        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1e0a18' }}>{notif.title}</span>
                                        <span style={{ fontSize: '0.62rem', color: 'rgba(60,20,50,0.35)', flexShrink: 0 }}>{notif.time}</span>
                                    </div>
                                    <div style={{ fontSize: '0.72rem', color: 'rgba(60,20,50,0.55)', marginTop: 2, lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {notif.sub}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
                        <div style={{ width: 28, height: 1, background: 'rgba(196,149,106,0.5)' }} />
                        <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#c4956a' }}>
                            Smart Campaigns
                        </span>
                    </div>

                    <h2 style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                        fontWeight: 700,
                        color: '#1e0a18',
                        lineHeight: 1.15,
                        letterSpacing: '-0.02em',
                        marginBottom: 16,
                    }}>
                        Stay in touch with{' '}
                        <span style={{ color: '#7a2860', fontStyle: 'italic' }}>smart</span>{' '}
                        campaigns
                    </h2>

                    <p style={{
                        fontSize: '0.93rem',
                        color: 'rgba(60,20,50,0.62)',
                        lineHeight: 1.7,
                        marginBottom: 28,
                    }}>
                        Engage clients effortlessly. Automate messaging to reduce no-shows, keep promotions active, and boost retention.
                    </p>

                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {points.map((item, i) => (
                            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{
                                    width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                                    background: 'linear-gradient(135deg, rgba(196,149,106,0.15), rgba(122,40,96,0.08))',
                                    border: '1px solid rgba(196,149,106,0.2)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: '#c4956a',
                                }}>
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                                <span style={{ fontSize: '0.86rem', color: '#3c1432', fontWeight: 500 }}>{item.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default MarketingSection;