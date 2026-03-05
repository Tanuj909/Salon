"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchBusinesses } from '../../services/businessService';

const SalonsSection = () => {
    const [salons, setSalons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSalons = async () => {
            try {
                // Fetch enough salons to show in marquee
                const data = await fetchBusinesses(0, 15);
                setSalons(data.content || []);
            } catch (error) {
                console.error("Error fetching salons for marquee:", error);
            } finally {
                setLoading(false);
            }
        };
        getSalons();
    }, []);

    if (loading || salons.length === 0) return null;

    // Duplicate salons array for a seamless loop
    const doubledSalons = [...salons, ...salons];

    return (
        <section className="py-16 md:py-24 overflow-hidden">
            <div className="max-w-[1240px] mx-auto px-6 mb-12 text-center">
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-[#7a2860]/5 border border-[#7a2860]/10">
                    <span className="w-1 h-1 rounded-full bg-[#c4956a]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#7a2860]">Our Network</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#1e0a18] font-[Cormorant_Garamond]">
                    Join a community of <span className="italic text-[#7a2860]">Excellence</span>
                </h2>
                <p className="text-sm text-[#3c1432]/60 mt-4 max-w-xl mx-auto">
                    Trusted by the most prestigious salons and wellness centers across the globe.
                </p>
            </div>

            <div className="flex relative overflow-hidden group">
                {/* Marquee Animation Container */}
                <motion.div 
                    className="flex gap-6 pr-6 py-4"
                    animate={{ x: [0, "-50%"] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: salons.length * 4, // Dynamic speed based on count
                            ease: "linear",
                        },
                    }}
                    style={{ width: "fit-content" }}
                >
                    {doubledSalons.map((salon, index) => (
                        <div 
                            key={`${salon.id}-${index}`}
                            className="relative flex-shrink-0 w-[280px] md:w-[350px] aspect-[16/10] rounded-2xl overflow-hidden shadow-[0_10px_30px_-15px_rgba(30,10,24,0.15)] group/card"
                        >
                            <img 
                                src={salon.bannerImageUrl || (salon.imageUrls && salon.imageUrls[0]) || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800'} 
                                alt={salon.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                            />
                            {/* Sophisticated Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1e0a18]/90 via-[#1e0a18]/20 to-transparent opacity-80 group-hover/card:opacity-90 transition-opacity" />
                            
                            <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover/card:translate-y-0 transition-transform">
                                <span className="inline-block px-2 py-0.5 rounded-full bg-[#c4956a]/20 border border-[#c4956a]/30 text-[9px] text-[#c4956a] font-bold uppercase tracking-widest mb-2 backdrop-blur-sm">
                                    {salon.city || "Premium"}
                                </span>
                                <h3 className="text-white text-lg md:text-xl font-bold font-[Cormorant_Garamond] leading-tight drop-shadow-lg">
                                    {salon.name}
                                </h3>
                            </div>
                        </div>
                    ))}
                </motion.div>
                
                {/* Side Fades for depth */}
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
            </div>
        </section>
    );
};

export default SalonsSection;
