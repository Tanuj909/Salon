import React from 'react';

const TestimonialSection = () => {
    return (
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
    );
};

export default TestimonialSection;
