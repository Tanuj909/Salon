import React from 'react';
import Link from 'next/link';

const DownloadAppSection = () => {
    return (
        <section className="py-16 px-4 sm:px-6 text-center border-t border-[#3c1432]/5">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold rec-section-heading font-[Cormorant_Garamond,serif] mb-4 tracking-tight leading-tight">
                    Download the <span className="italic rec-section-heading-accent font-light">Fast Booking Service</span> App
                </h2>
                
                <div className="mb-10">
                    <p className="text-base sm:text-lg rec-section-subtext font-medium">
                        Manage your business on the go with our mobile app
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                    <Link href="/download/app-store" className="inline-flex items-center gap-3 px-8 py-4 bg-[#1C3152] text-[#C8A951] rounded-2xl text-sm font-bold shadow-xl hover:shadow-2xl hover:bg-[#2a4570] transition-all border border-[#C8A951]/20 group">
                        <svg className="w-6 h-6 text-[#C8A951] transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                        </svg>
                        <span className='tracking-widest uppercase'>App Store</span>
                    </Link>

                    <Link href="/download/google-play" className="inline-flex items-center gap-3 px-8 py-4 bg-[#1C3152] text-[#C8A951] rounded-2xl text-sm font-bold shadow-xl hover:shadow-2xl hover:bg-[#2a4570] transition-all border border-[#C8A951]/20 group">
                        <svg className="w-6 h-6 text-[#C8A951] transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3.61 20.91L14.12 13.5l2.09 2.09-7.91 5.41c-.79.55-1.89.54-2.69-.09M2.5 18.8v-13.6c0-.6.3-1.12.78-1.44l8.5 7.44-9.28 8.5M19.3 9.89l2.3 1.32c.8.5 1.3 1.3 1.3 2.19s-.5 1.69-1.3 2.19l-2.3 1.32-3.09-3.09 3.09-2.93M15.5 10.8L5.39 2.59c.8-.39 1.79-.29 2.5.2l7.91 5.41-2.3 2.6" />
                        </svg>
                        <span className='tracking-widest uppercase'>Google Play</span>
                    </Link>
                </div>

                <div>
                    <p className="text-xs font-bold rec-section-subtext uppercase tracking-[0.2em]">Scan QR code to download directly</p>
                </div>
            </div>
        </section>
    );
};

export default DownloadAppSection;
