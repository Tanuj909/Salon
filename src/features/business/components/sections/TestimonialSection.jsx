// import React from 'react';

// const TestimonialSection = () => {
//     return (
//         <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto">
//             <h2 className='text-center text-3xl md:text-4xl font-bold text-[#1e0a18] font-[Cormorant_Garamond] mb-3'>Client Review</h2>
//             <div className="bg-[#f9f5f2] p-8 md:p-10 rounded-2xl text-center border border-white">
//                 <p className="text-xl md:text-2xl text-[#3c1432] italic mb-6 font-[Cormorant_Garamond] leading-relaxed">
//                     "By far the best experience I've had with a salon booking system! Super user-friendly, and automated policies reduced no-shows dramatically."
//                 </p>
//                 <div>
//                     <p className="font-bold text-base text-[#1e0a18]">Ursula</p>
//                     <p className="text-xs text-[#7a2860] font-semibold mb-2">Royal Salon</p>
//                     <div className="flex gap-1 justify-center">
//                         {[...Array(5)].map((_, i) => (
//                             <svg key={i} className="w-4 h-4 text-[#c4956a]" fill="currentColor" viewBox="0 0 20 20">
//                                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                             </svg>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default TestimonialSection;

import React from 'react';

const TestimonialSection = () => {
    const testimonials = [
        {
            quote: "By far the best experience I've had with a salon booking system! Super user-friendly, and automated policies reduced no-shows dramatically.",
            name: 'Ursula M.',
            business: 'Royal Salon',
            location: 'Paris, France',
            rating: 5,
        },
    ];

    return (
        <section style={{ padding: '72px 24px', maxWidth: 900, margin: '0 auto' }}>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: 44 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 12 }}>
                    <div style={{ height: 1, width: 40, background: 'linear-gradient(90deg, transparent, rgba(196,149,106,0.5))' }} />
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#c4956a' }}>
                        Client Stories
                    </span>
                    <div style={{ height: 1, width: 40, background: 'linear-gradient(90deg, rgba(196,149,106,0.5), transparent)' }} />
                </div>
                <h2 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                    fontWeight: 700,
                    color: '#1e0a18',
                    letterSpacing: '-0.02em',
                }}>
                    Loved by professionals worldwide
                </h2>
            </div>

            {/* Testimonial Card */}
            {testimonials.map((t, i) => (
                <div key={i} style={{
                    borderRadius: 24,
                    border: '1px solid rgba(196,149,106,0.16)',
                    background: 'linear-gradient(135deg, rgba(249,245,242,0.8) 0%, rgba(255,255,255,0.9) 100%)',
                    padding: 'clamp(32px, 5vw, 56px)',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    {/* Large decorative quote */}
                    <div style={{
                        position: 'absolute',
                        top: -10, left: 28,
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '9rem',
                        lineHeight: 1,
                        color: 'rgba(196,149,106,0.09)',
                        fontWeight: 700,
                        userSelect: 'none',
                        pointerEvents: 'none',
                    }}>
                        "
                    </div>

                    {/* Stars */}
                    <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginBottom: 24 }}>
                        {[...Array(t.rating)].map((_, si) => (
                            <svg key={si} width="16" height="16" viewBox="0 0 20 20" fill="#c4956a">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                        ))}
                    </div>

                    {/* Quote */}
                    <p style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 'clamp(1.15rem, 2.5vw, 1.5rem)',
                        color: '#3c1432',
                        fontStyle: 'italic',
                        lineHeight: 1.65,
                        textAlign: 'center',
                        maxWidth: 640,
                        margin: '0 auto 32px',
                        position: 'relative',
                    }}>
                        "{t.quote}"
                    </p>

                    {/* Thin divider */}
                    <div style={{
                        width: 48, height: 1,
                        background: 'linear-gradient(90deg, transparent, rgba(196,149,106,0.4), transparent)',
                        margin: '0 auto 20px',
                    }} />

                    {/* Attribution */}
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 10,
                        }}>
                            {/* Avatar placeholder */}
                            <div style={{
                                width: 40, height: 40, borderRadius: '50%',
                                background: 'linear-gradient(135deg, #c4956a, #7a2860)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: '#fff', fontWeight: 700, fontSize: '0.95rem',
                                flexShrink: 0,
                            }}>
                                {t.name[0]}
                            </div>
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e0a18' }}>{t.name}</div>
                                <div style={{ fontSize: '0.72rem', color: '#7a2860', fontWeight: 600 }}>
                                    {t.business} · {t.location}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative corner */}
                    <div style={{
                        position: 'absolute', bottom: 0, right: 0,
                        width: 80, height: 80,
                        borderTop: '1px solid rgba(196,149,106,0.12)',
                        borderLeft: '1px solid rgba(196,149,106,0.12)',
                        borderTopLeftRadius: 16,
                    }} />
                </div>
            ))}
        </section>
    );
};

export default TestimonialSection;