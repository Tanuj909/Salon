"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ListBusiness = () => {
    const features = [
        { emoji: '📅', title: 'Appointment scheduling', description: 'A seamless booking software with intelligent automated reminders.' },
        { emoji: '💳', title: 'Payment processing', description: 'Secure, frictionless payments via PayPal, Stripe, and more.' },
        { emoji: '🛒', title: 'Point of sale (POS)', description: 'Effortlessly manage transactions, barcode scanning, and digital receipts.' },
        { emoji: '📢', title: 'Marketing promotions', description: 'Powerful curated marketing tools for targeted promotions and elite discounts.' },
        { emoji: '📦', title: 'Product inventory', description: 'Precisely track stock levels and seamlessly manage online retail sales.' },
        { emoji: '📊', title: 'Reporting & analytics', description: 'Analyze comprehensive performance metrics with real-time actionable insights.' },
    ];

    const stats = [
        { value: '120k+', label: 'Elite Businesses' },
        { value: '450k+', label: 'Daily Appointments' },
        { value: '1B+', label: 'Customers Served' },
        { value: '120+', label: 'Countries Worldwide' },
    ];

    const businessTypes = [
        'Hair Salon', 'Waxing Studio', 'Nail Boutique', 'Premium Barbershop',
        'Massage Therapy', 'Beauty Lounge', 'Tattoo & Piercing', 'Aesthetic Clinic',
        'Weight Loss Center', 'Luxury Spa', 'Wellness Retreat', 'Yoga & Fitness',
    ];

    return (
        <div className="bg-plum/5 font-[DM_Sans] text-[#3c1432] min-h-screen pt-16 md:pt-20">

            {/* ── Hero Section with Image ── */}
            <section className="relative text-center py-12 md:py-20 px-4 sm:px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
                <div className="max-w-[900px] mx-auto relative z-10">
                    <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-white/60 border border-[#3c1432]/10 backdrop-blur-sm shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c4956a] animate-pulse" />
                        <span className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-[#7a2860]">Premium Partnership Program</span>
                    </div>
                    <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold text-[#1e0a18] mb-4 leading-[1.1] font-[Cormorant_Garamond,Georgia,serif]">
                        The #1 Platform for <br /><span className="italic text-[#7a2860]">Salons & Spas</span>
                    </h1>
                    <p className="text-base md:text-lg text-[#3c1432]/70 max-w-2xl mx-auto mb-6 leading-relaxed font-light">
                        Simple, flexible, and beautifully powerful booking software to elevate your business. Join thousands of top-tier professionals today.
                    </p>

                    {/* Centered Image */}
                    <div className="flex justify-center mb-8">
                        <div className="relative w-64 h-64 md:w-80 md:h-80">
                            <Image
                                src="/hero-image.png" // Replace with your actual image path
                                alt="Salon booking platform preview"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link
                            href="/partner"
                            className="px-8 py-3.5 bg-[#3c1432] text-[#fdf6f0] rounded-full font-semibold tracking-wide text-sm hover:bg-[#7a2860] hover:scale-105 hover:shadow-[0_12px_30px_rgba(122,40,96,0.25)] transition-all duration-300"
                        >
                            Join Now as a Partner
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Features Overview Section ── */}
            <section className="py-16 md:py-20 px-4 sm:px-6 max-w-[1240px] mx-auto relative">
                <div className="text-center mb-12 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 mb-3">
                        <span className="w-5 h-px inline-block bg-[#c4956a]" />
                        <span className="text-[0.65rem] font-semibold tracking-[0.12em] uppercase text-[#c4956a]">Comprehensive Tools</span>
                        <span className="w-5 h-px inline-block bg-[#c4956a]" />
                    </div>
                    <h2 className="text-[clamp(1.5rem,2.5vw,2.2rem)] font-bold text-[#1e0a18] font-[Cormorant_Garamond,Georgia,serif] mb-3 leading-tight">
                        A full solution to manage and <span className="italic text-[#7a2860]">grow</span> your business
                    </h2>
                    <p className="text-[#3c1432]/70 text-base leading-relaxed font-light">
                        Packed with all the essential tools you need to boost sales, seamlessly manage your calendar, and retain elite clients so you can focus on mastering your craft.
                    </p>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white p-6 rounded-2xl border border-[#3c1432]/5 shadow-[0_4px_20px_rgba(60,20,50,0.02)] hover:shadow-[0_20px_40px_rgba(60,20,50,0.08)] hover:-translate-y-1 transition-all duration-300 group">
                            <div className="w-12 h-12 bg-plum/5 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 group-hover:bg-[#3c1432] transition-all duration-300">
                                <span className="group-hover:grayscale group-hover:brightness-200 transition-all duration-300">{feature.emoji}</span>
                            </div>
                            <h3 className="text-lg font-bold text-[#1e0a18] font-[Cormorant_Garamond,Georgia,serif] mb-2 tracking-wide">{feature.title}</h3>
                            <p className="text-[#3c1432]/60 leading-relaxed text-sm font-light">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Online Booking Section ── */}
            <section className="py-16 md:py-20 px-4 sm:px-6 overflow-hidden border-y border-[#3c1432]/5 relative">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-plum/5 to-transparent pointer-events-none" />
                <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-3">
                            <span className="w-5 h-px inline-block bg-[#c4956a]" />
                            <span className="text-[0.65rem] font-semibold tracking-[0.12em] uppercase text-[#c4956a]">Online Booking</span>
                        </div>
                        <h2 className="text-[clamp(1.6rem,2.5vw,2.4rem)] font-bold text-[#1e0a18] font-[Cormorant_Garamond,Georgia,serif] mb-4 leading-tight">
                            Grow sales by attracting <span className="italic text-[#7a2860]">new clients</span> online
                        </h2>
                        <p className="text-[#3c1432]/70 text-base mb-6 leading-relaxed font-light">
                            Be seen, be available, and get booked instantly. Create a stunning online profile or marketplace listing and get discovered by thousands of potential customers, 24/7.
                        </p>
                        <ul className="space-y-3">
                            {['Attract and retain premium clients', 'Seamless online self-booking experience', 'Build reputation with trusted ratings & reviews'].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-[#3c1432] text-sm font-medium">
                                    <div className="w-6 h-6 rounded-full bg-plum/10 flex items-center justify-center text-[#7a2860] shrink-0 border border-plum/20">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#3c1432]/5 to-[#c4956a]/10 rounded-[2rem] transform rotate-3 scale-105 transition-transform duration-500 group-hover:rotate-6" />
                        <div className="bg-[#f9f5f2] border border-white rounded-[2rem] p-8 h-[360px] flex items-center justify-center relative shadow-xl z-10 overflow-hidden transition-transform duration-500 group-hover:-translate-y-2">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-plum/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#c4956a]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
                            <div className="text-center relative z-20">
                                <span className="text-[5rem] leading-none block mb-4 filter drop-shadow-lg transform transition-transform duration-500 group-hover:scale-110">📱✨</span>
                                <span className="text-xl font-[Cormorant_Garamond,Georgia,serif] font-bold text-[#3c1432] tracking-wide inline-block border-b-2 border-[#c4956a]/30 pb-1">Your Premium App</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Stats Section ── */}
            <section className="py-16 md:py-20 px-4 sm:px-6 relative overflow-hidden text-[#3c1432]">
                <div className="absolute top-0 left-0 w-full h-full opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #3c1432 1px, transparent 0)', backgroundSize: '40px 40px' }} />
                <div className="max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-6 text-center relative z-10">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center group">
                            <div className="text-[clamp(2rem,3vw,3rem)] font-extrabold text-[#c4956a] font-[Cormorant_Garamond,Georgia,serif] mb-2 leading-none group-hover:scale-110 transition-transform duration-300">
                                {stat.value}
                            </div>
                            <div className="w-10 h-0.5 bg-[#3c1432]/20 mb-3 group-hover:w-16 transition-all duration-300" />
                            <div className="text-[#3c1432]/80 text-xs uppercase tracking-[0.15em] font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Automated Marketing Section ── */}
            <section className="py-16 md:py-20 px-4 sm:px-6 max-w-[1240px] mx-auto">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="order-2 md:order-1 relative group">
                        <div className="absolute inset-0 bg-gradient-to-bl from-[#3c1432]/5 to-[#7a2860]/5 rounded-[2rem] transform -rotate-3 scale-105 transition-transform duration-500 group-hover:-rotate-6" />
                        <div className="bg-white border border-[#3c1432]/5 rounded-[2rem] p-8 h-[360px] flex items-center justify-center relative shadow-lg z-10 overflow-hidden transition-transform duration-500 group-hover:-translate-y-2">
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#c4956a]/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
                            <div className="absolute top-0 right-0 w-48 h-48 bg-plum/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
                            <div className="text-center relative z-20">
                                <span className="text-[5rem] leading-none block mb-4 filter drop-shadow-lg transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">💬📧</span>
                                <span className="text-xl font-[Cormorant_Garamond,Georgia,serif] font-bold text-[#3c1432] tracking-wide inline-block border-b-2 border-[#c4956a]/30 pb-1">Smart Marketing</span>
                            </div>
                        </div>
                    </div>
                    <div className="order-1 md:order-2">
                        <div className="inline-flex items-center gap-2 mb-3">
                            <span className="w-5 h-px inline-block bg-[#c4956a]" />
                            <span className="text-[0.65rem] font-semibold tracking-[0.12em] uppercase text-[#c4956a]">Automation</span>
                        </div>
                        <h2 className="text-[clamp(1.6rem,2.5vw,2.4rem)] font-bold text-[#1e0a18] font-[Cormorant_Garamond,Georgia,serif] mb-4 leading-tight">
                            Stay in touch with <span className="italic text-[#7a2860]">smart</span> campaigns
                        </h2>
                        <p className="text-[#3c1432]/70 text-base mb-6 leading-relaxed font-light">
                            Engage clients effortlessly. Automate your messaging to drastically reduce no-shows, keep bespoke promotions active, and boost customer retention without lifting a finger.
                        </p>
                        <ul className="space-y-3">
                            {['Exquisite customizable message templates', 'Advanced precision client targeting', 'Automated reminders & post-visit follow-ups'].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-[#3c1432] text-sm font-medium">
                                    <div className="w-6 h-6 rounded-full bg-plum/10 flex items-center justify-center text-[#7a2860] shrink-0 border border-plum/20">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* ── Testimonial Section ── */}
            <section className="py-16 md:py-20 px-4 sm:px-6 border-y border-[#3c1432]/5 relative">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 mb-3">
                        <span className="w-5 h-px inline-block bg-[#c4956a]" />
                        <span className="text-[0.65rem] font-semibold tracking-[0.12em] uppercase text-[#c4956a]">Success Stories</span>
                        <span className="w-5 h-px inline-block bg-[#c4956a]" />
                    </div>
                    <h2 className="text-[clamp(1.5rem,2.5vw,2.2rem)] font-bold text-[#1e0a18] font-[Cormorant_Garamond,Georgia,serif] mb-8">
                        See what our partners say
                    </h2>
                    <div className="bg-[#f9f5f2] p-8 md:p-10 lg:p-12 rounded-[2rem] relative shadow-[0_10px_40px_rgba(60,20,50,0.03)] border border-white">
                        <div className="text-[6rem] text-[#c4956a] absolute -top-4 left-4 md:left-8 opacity-20 font-[Georgia,serif] leading-none">"</div>
                        <p className="text-lg md:text-xl lg:text-2xl text-[#3c1432] italic mb-8 leading-relaxed font-[Cormorant_Garamond,Georgia,serif] relative z-10 font-bold">
                            By far the best experience I've had with a salon booking system! It's super user-friendly, and our automated policies reduced no-shows dramatically. Truly a game-changer for our business.
                        </p>
                        <div className="flex flex-col items-center relative z-10">
                            <div className="w-10 h-0.5 bg-[#c4956a]/40 mb-4 rounded-full" />
                            <p className="font-bold text-[#1e0a18] text-base uppercase tracking-widest mb-1">Ursula</p>
                            <p className="text-[#7a2860] text-xs font-semibold tracking-wider">Royal Salon</p>
                            <div className="flex gap-1 mt-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-4 h-4 text-[#c4956a]" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Business Types Grid ── */}
            <section className="py-16 md:py-20 px-4 sm:px-6 max-w-[1000px] mx-auto text-center">
                <h2 className="text-[clamp(1.5rem,2.5vw,2.2rem)] font-bold text-[#1e0a18] font-[Cormorant_Garamond,Georgia,serif] mb-3">
                    Tailored explicitly for your business
                </h2>
                <p className="text-[#3c1432]/60 mb-8 text-base font-light">Explore elite software built precisely for your industry needs.</p>
                <div className="flex flex-wrap justify-center gap-2.5">
                    {businessTypes.map((type, index) => (
                        <div key={index} className="px-5 py-2.5 bg-white border border-[#3c1432]/10 rounded-full hover:border-[#7a2860] hover:bg-[#7a2860] hover:text-white hover:shadow-md transition-all duration-300 cursor-pointer text-[#3c1432] font-medium tracking-wide text-xs md:text-sm">
                            {type}
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Download App Section ── */}
            <section className="py-16 md:py-20 px-4 sm:px-6 border-t border-[#3c1432]/5 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#c4956a]/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

                <div className="max-w-3xl mx-auto relative z-10">
                    <h2 className="text-[clamp(2rem,3vw,3rem)] font-bold text-[#1e0a18] font-[Cormorant_Garamond,Georgia,serif] mb-4 leading-tight">
                        Download the <span className="italic text-[#7a2860]">Fast Booking</span> App
                    </h2>
                    <p className="text-lg text-[#3c1432]/70 mb-8 font-light">
                        Manage your business on the go with our mobile app. Available for iOS and Android.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                        <Link
                            href="/download/app-store"
                            className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-black text-white rounded-xl hover:scale-105 transition-all duration-300"
                        >
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                            </svg>
                            <div className="text-left">
                                <div className="text-xs">Download on the</div>
                                <div className="text-lg font-semibold -mt-1">App Store</div>
                            </div>
                        </Link>

                        <Link
                            href="/download/google-play"
                            className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-black text-white rounded-xl hover:scale-105 transition-all duration-300"
                        >
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3.61 20.91L14.12 13.5l2.09 2.09-7.91 5.41c-.79.55-1.89.54-2.69-.09M2.5 18.8v-13.6c0-.6.3-1.12.78-1.44l8.5 7.44-9.28 8.5M19.3 9.89l2.3 1.32c.8.5 1.3 1.3 1.3 2.19s-.5 1.69-1.3 2.19l-2.3 1.32-3.09-3.09 3.09-2.93M15.5 10.8L5.39 2.59c.8-.39 1.79-.29 2.5.2l7.91 5.41-2.3 2.6" />
                            </svg>
                            <div className="text-left">
                                <div className="text-xs">Get it on</div>
                                <div className="text-lg font-semibold -mt-1">Google Play</div>
                            </div>
                        </Link>
                    </div>

                    <p className="text-sm text-[#3c1432]/60">
                        Scan the QR code to download directly
                    </p>
                </div>
            </section>
        </div>
    );
};

export default ListBusiness;