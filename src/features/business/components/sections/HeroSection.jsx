import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => {
    return (
        <section className="relative text-center py-10 md:py-16 px-4 sm:px-6">
            <div className="max-w-[1200px] mx-auto">
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
                
                {/* Button moved above the image */}
                <div className="mb-8">
<Link
    href="/partner"
    className="inline-block px-10 py-4 bg-[#c4956a] text-white rounded-full font-semibold text-base hover:bg-[#b07a4f] transition-colors shadow-lg hover:shadow-xl"
>
    Join Now as a Partner
</Link>
                </div>
                
                {/* Extra Large Image with Thin Border */}
                <div className="flex justify-center">
                    <div className="relative w-full max-w-[900px] mx-auto">
                        {/* Thin border frame */}
                        <div className="border border-[#7a2860]/20 rounded-2xl shadow-lg overflow-hidden bg-white p-2">
                            <div className="border border-[#c4956a]/30 rounded-xl overflow-hidden">
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
                        
                        {/* Optional: Very subtle shadow at the bottom for depth */}
                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-6 bg-black/5 blur-xl rounded-full"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;