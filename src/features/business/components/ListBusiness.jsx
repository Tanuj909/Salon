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
        <div className="bg-plum/5 font-[DM_Sans] text-[#3c1432] min-h-screen pt-24 md:pt-28">
            {/* ── Hero Section ── */}
            <section className="relative text-center py-10 md:py-16 px-4 sm:px-6">
                <div className="max-w-[1000px] mx-auto">
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-white/60 border border-[#3c1432]/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c4956a]" />
                        <span className="text-xs font-semibold uppercase text-[#7a2860]">Premium Partnership Program</span>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1e0a18] mb-4 font-[Cormorant_Garamond] whitespace-nowrap overflow-x-auto pb-2">
    The #1 Platform for <span className="italic text-[#7a2860]">Salons & Spas</span>
</h1>
                    
                    <p className="text-base md:text-lg text-[#3c1432]/70 max-w-2xl mx-auto mb-8 leading-relaxed">
                        Simple, flexible, and beautifully powerful booking software to elevate your business. Join thousands of top-tier professionals today.
                    </p>
                    </div>

                    <div className="flex justify-center mb-8">
                        <div className="relative w-64 h-64 md:w-72 md:h-72">
                            <Image
                                src="/hero-image.png"
                                alt="Salon booking platform preview"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>

                    <Link
                        href="/partner"
                        className="inline-block px-8 py-3.5 bg-gray-600 text-white rounded-full font-semibold text-sm hover:bg-[#7a2860] transition-colors"
                    >
                        <p className='text-white'>Join Now as a Partner</p>
                        
                    </Link>
                </div>
            </section>

            {/* ── Features Section ── */}
            <section className="py-16 md:py-20 px-4 sm:px-6 max-w-[1240px] mx-auto">
                <div className="text-center mb-12 flex flex-col justify-center items-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1e0a18] font-[Cormorant_Garamond] mb-3">
                        A full solution to manage and <span className="italic text-[#7a2860]">grow</span> your business
                    </h2>
                    <p className="text-base text-[#3c1432]/70 max-w-2xl mx-auto">
                        Packed with all the essential tools you need to boost sales, seamlessly manage your calendar, and retain elite clients.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl border border-[#3c1432]/5 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-plum/5 rounded-xl flex items-center justify-center text-2xl mb-4">
                                {feature.emoji}
                            </div>
                            <h3 className="text-lg font-bold text-[#1e0a18] mb-2">{feature.title}</h3>
                            <p className="text-sm text-[#3c1432]/60 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Online Booking Section ── */}
            <section className="py-16 md:py-20 px-4 sm:px-6 border-y border-[#3c1432]/5">
                <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1e0a18] font-[Cormorant_Garamond] mb-4">
                            Grow sales by attracting <span className="italic text-[#7a2860]">new clients</span> online
                        </h2>
                        <p className="text-base text-[#3c1432]/70 mb-6">
                            Be seen, be available, and get booked instantly. Create a stunning online profile and get discovered by thousands of potential customers, 24/7.
                        </p>
                        <ul className="space-y-3">
                            {['Attract and retain premium clients', 'Seamless online self-booking experience', 'Build reputation with trusted ratings & reviews'].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm">
                                    <div className="w-5 h-5 rounded-full bg-plum/10 flex items-center justify-center text-[#7a2860] shrink-0">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="bg-[#f9f5f2] rounded-2xl p-8 h-[300px] flex items-center justify-center border border-white/50">
                        <div className="text-center">
                            <span className="text-6xl block mb-4">📱✨</span>
                            <span className="text-xl font-medium text-[#3c1432]">Your Premium App</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Stats Section ── */}
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

            {/* ── Marketing Section ── */}
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

            {/* ── Testimonial ── */}
            <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto">
                <h2 className='text-center text-3xl md:text-4xl font-bold text-[#1e0a18] font-[Cormorant_Garamond] mb-3'>Client Review</h2>
                <div className="bg-[#f9f5f2] p-8 md:p-10 rounded-2xl text-center border border-white">
                    <p className="text-xl md:text-2xl text-[#3c1432] italic mb-6 font-[Cormorant_Garamond] leading-relaxed">
                        "By far the best experience I've had with a salon booking system! Super user-friendly, and automated policies reduced no-shows dramatically."
                    </p>
                    <div>
                        <p className="font-bold text-base text-[#1e0a18]">Ursula</p>
                        <p className="text-xs text-[#7a2860] font-semibold mb-2">Royal Salon</p>
                        <div className="flex gap-1 justify-center">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-4 h-4 text-[#c4956a]" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Business Types ── */}
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

            {/* ── Download App ── */}
<section className="py-16 px-4 sm:px-6 text-center border-t border-[#3c1432]/5">
    <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1e0a18] font-[Cormorant_Garamond] mb-3">
            Download the <span className="italic text-[#7a2860]">Fast Booking</span> App
        </h2>
        
        {/* Paragraph ko alag div mein wrap kiya */}
        <div className="mb-6">
            <p className="text-sm text-[#3c1432]/70">
                Manage your business on the go with our mobile app
            </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
            <Link href="/download/app-store" className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-lg text-sm">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <span className='text-white'>App Store</span>
            </Link>

            <Link href="/download/google-play" className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-lg text-sm">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.61 20.91L14.12 13.5l2.09 2.09-7.91 5.41c-.79.55-1.89.54-2.69-.09M2.5 18.8v-13.6c0-.6.3-1.12.78-1.44l8.5 7.44-9.28 8.5M19.3 9.89l2.3 1.32c.8.5 1.3 1.3 1.3 2.19s-.5 1.69-1.3 2.19l-2.3 1.32-3.09-3.09 3.09-2.93M15.5 10.8L5.39 2.59c.8-.39 1.79-.29 2.5.2l7.91 5.41-2.3 2.6" />
                </svg>
                <span className='text-white'>Google Play</span>
            </Link>
        </div>

        {/* Last paragraph ke liye bhi alag div */}
        <div>
            <p className="text-xs text-[#3c1432]/40">Scan QR code to download directly</p>
        </div>
    </div>
</section>
        </div>
    );
};

export default ListBusiness;