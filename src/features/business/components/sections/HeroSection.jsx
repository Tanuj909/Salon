// import React from 'react';
// import Link from 'next/link';
// import Image from 'next/image';

// const HeroSection = () => {
//     return (
//         <section className="relative text-center py-10 md:py-16 px-4 sm:px-6">
//             <div className="max-w-[1200px] mx-auto">
//                 <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-white/60 border border-[#3c1432]/10">
//                     <span className="w-1.5 h-1.5 rounded-full bg-[#c4956a]" />
//                     <span className="text-xs font-semibold uppercase text-[#7a2860]">Premium Partnership Program</span>
//                 </div>
//                 <div className='flex flex-col justify-center items-center'>
//                     <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1e0a18] mb-4 font-[Cormorant_Garamond] whitespace-nowrap overflow-x-auto pb-2">
//                         The #1 Platform for <span className="italic text-[#7a2860]">Salons & Spas</span>
//                     </h1>

//                     <p className="text-base md:text-lg text-[#3c1432]/70 max-w-2xl mx-auto mb-8 leading-relaxed">
//                         Simple, flexible, and beautifully powerful booking software to elevate your business. Join thousands of top-tier professionals today.
//                     </p>
//                 </div>

//                 {/* Button moved above the image */}
//                 <div className="mb-8">
// <Link
//     href="/partner"
//     className="inline-block px-10 py-4 bg-[#c4956a] text-white rounded-full font-semibold text-base hover:bg-[#b07a4f] transition-colors shadow-lg hover:shadow-xl"
// >
//     Join Now as a Partner
// </Link>
//                 </div>

//                 {/* Extra Large Image with Thin Border */}
//                 <div className="flex justify-center">
//                     <div className="relative w-full max-w-[900px] mx-auto">
//                         {/* Thin border frame */}
//                         <div className="border border-[#7a2860]/20 rounded-2xl shadow-lg overflow-hidden bg-white p-2">
//                             <div className="border border-[#c4956a]/30 rounded-xl overflow-hidden">
//                                 <Image
//                                     src="/images/business/banner.png"
//                                     alt="Salon booking platform preview"
//                                     width={900}
//                                     height={900}
//                                     className="object-contain w-full h-auto"
//                                     priority
//                                     unoptimized
//                                 />
//                             </div>
//                         </div>

//                         {/* Optional: Very subtle shadow at the bottom for depth */}
//                         <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-6 bg-black/5 blur-xl rounded-full"></div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default HeroSection;

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => {
    return (
        <section className="relative text-center px-4 sm:px-6 pt-8 pb-16 md:pt-12 md:pb-20 overflow-hidden">

            {/* Ambient background orbs */}
            <div style={{
                position: 'absolute', top: '-80px', left: '50%', transform: 'translateX(-50%)',
                width: '700px', height: '400px',
                background: 'radial-gradient(ellipse, rgba(196,149,106,0.10) 0%, transparent 70%)',
                pointerEvents: 'none', zIndex: 0,
            }} />
            <div style={{
                position: 'absolute', top: '60px', left: '10%',
                width: '300px', height: '300px',
                background: 'radial-gradient(circle, rgba(122,40,96,0.06) 0%, transparent 70%)',
                pointerEvents: 'none', zIndex: 0,
            }} />

            <div className="max-w-[1100px] mx-auto relative" style={{ zIndex: 1 }}>

                {/* Badge */}
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '6px 16px 6px 8px',
                    borderRadius: 50,
                    background: 'rgba(196,149,106,0.08)',
                    border: '1px solid rgba(196,149,106,0.22)',
                    marginBottom: 28,
                }}>
                    <span style={{
                        display: 'flex', alignItems: 'center', gap: 5,
                        padding: '3px 10px', borderRadius: 50,
                        background: 'linear-gradient(135deg, #c4956a, #a8724a)',
                        fontSize: '0.65rem', fontWeight: 700, color: '#fff',
                        letterSpacing: '0.08em', textTransform: 'uppercase',
                    }}>
                        ✦ New
                    </span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#7a2860', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                        Premium Partnership Program
                    </span>
                </div>

                {/* Headline */}
                <div style={{ marginBottom: 20 }}>
                    <h1 style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 'clamp(2.4rem, 6vw, 4.2rem)',
                        fontWeight: 700,
                        color: '#1e0a18',
                        lineHeight: 1.15,
                        letterSpacing: '-0.02em',
                        marginBottom: 0,
                    }}>
                        The&nbsp;
                        <span style={{ position: 'relative', display: 'inline-block' }}>
                            <span style={{ color: '#7a2860', fontStyle: 'italic' }}>#1 Platform</span>
                            {/* Decorative underline */}
                            <svg style={{ position: 'absolute', bottom: -4, left: 0, width: '100%' }} height="6" viewBox="0 0 200 6" preserveAspectRatio="none">
                                <path d="M0 5 Q50 1 100 4 Q150 7 200 3" stroke="#c4956a" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
                            </svg>
                        </span>
                        &nbsp;for&nbsp;
                        <span style={{ color: '#7a2860', fontStyle: 'italic' }}>Salons & Spas</span>
                    </h1>
                </div>

                {/* Subtext */}
                <p style={{
                    fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                    color: 'rgba(60,20,50,0.62)',
                    maxWidth: 560,
                    margin: '0 auto 36px',
                    lineHeight: 1.7,
                    fontWeight: 400,
                }}>
                    Simple, flexible, and beautifully powerful booking software to elevate your business. Join thousands of top-tier professionals today.
                </p>

                {/* CTA */}
                <div style={{ marginBottom: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
                    <Link
                        href="/partner"
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            padding: '14px 32px',
                            borderRadius: 50,
                            background: 'linear-gradient(135deg, #c4956a 0%, #a8724a 100%)',
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            letterSpacing: '0.02em',
                            textDecoration: 'none',
                            boxShadow: '0 6px 28px rgba(196,149,106,0.38), 0 2px 8px rgba(0,0,0,0.08)',
                            transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 36px rgba(196,149,106,0.48)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(196,149,106,0.38), 0 2px 8px rgba(0,0,0,0.08)'; }}
                    >
                        Join Now as a Partner
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </Link>
                    <span style={{ fontSize: '0.78rem', color: 'rgba(60,20,50,0.45)', fontWeight: 500 }}>
                        No credit card required
                    </span>
                </div>

                {/* Image Frame */}
                <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto' }}>
                    {/* Glow behind image */}
                    <div style={{
                        position: 'absolute', inset: -1,
                        borderRadius: 24,
                        background: 'linear-gradient(135deg, rgba(196,149,106,0.18), rgba(122,40,96,0.10))',
                        filter: 'blur(1px)',
                    }} />
                    <div style={{
                        position: 'relative',
                        borderRadius: 22,
                        border: '1px solid rgba(196,149,106,0.20)',
                        background: '#fff',
                        padding: 8,
                        boxShadow: '0 24px 80px rgba(60,20,50,0.10), 0 4px 16px rgba(0,0,0,0.06)',
                    }}>
                        <div style={{
                            borderRadius: 16,
                            overflow: 'hidden',
                            border: '1px solid rgba(196,149,106,0.12)',
                        }}>
                            <Image
                                src="/images/business/banner.png"
                                alt="Salon booking platform preview"
                                width={900}
                                height={900}
                                className="object-contain w-full h-auto"
                                priority
                                unoptimized
                            />
                        </div>
                    </div>
                    {/* Bottom shadow blur */}
                    <div style={{
                        position: 'absolute', bottom: -16, left: '50%', transform: 'translateX(-50%)',
                        width: '70%', height: 24,
                        background: 'rgba(0,0,0,0.06)',
                        filter: 'blur(20px)',
                        borderRadius: '50%',
                    }} />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;