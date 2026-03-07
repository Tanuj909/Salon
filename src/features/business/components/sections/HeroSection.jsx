import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const HeroSection = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            },
        },
    };

    const contentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    const centerImageVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    const leftImageVariants = {
        hidden: { opacity: 0, x: -60 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    const chipVariants = {
        hidden: { opacity: 0, scale: 0.88, y: 8 },
        visible: (delay) => ({
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.7,
                delay: delay,
                ease: [0.22, 1, 0.36, 1],
            },
        }),
        float: {
            y: [0, -7, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
    };

    return (
        <motion.section
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="relative min-h-[60vh] md:min-h-[70vh] flex flex-col items-center px-4 sm:px-6 pt-10 md:pt-12 overflow-hidden"
            style={{
                background: 'transparent',
            }}
        >
            <div className="max-w-[1200px] mx-auto relative z-10 w-full flex flex-col items-center">

                {/* Badge - Reduced top margin */}
                <motion.div
                    variants={contentVariants}
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        padding: '5px 14px 5px 8px',
                        background: '#D4E9E6',
                        border: '1px solid rgba(30,92,82,0.18)',
                        borderRadius: 100,
                        marginBottom: 16,
                    }}
                >
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 15, delay: 0.2 }}
                        style={{
                            width: 20, height: 20,
                            background: '#1E5C52',
                            borderRadius: '50%',
                            display: 'grid', placeItems: 'center',
                            flexShrink: 0,
                        }}
                    >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M5 1L6.5 4H9.5L7 6L8 9L5 7.5L2 9L3 6L0.5 4H3.5L5 1Z" fill="white" />
                        </svg>
                    </motion.span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.09em', textTransform: 'uppercase', color: '#1E5C52' }}>
                        Trusted by 5,000+ salons worldwide
                    </span>
                </motion.div>

                {/* Headline - Improved for mobile wrapping */}
                <motion.div variants={contentVariants} style={{ marginBottom: 12, textAlign: 'center', width: '100%' }}>
                    <h1 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(2rem, 8vw, 4.2rem)',
                        fontWeight: 400,
                        lineHeight: 1.1,
                        color: '#1C1410',
                        letterSpacing: '-0.01em',
                    }}>
                        Run your salon with <em style={{ fontStyle: 'italic', color: '#1E5C52' }}>effortless</em> clarity
                    </h1>
                </motion.div>

                {/* Description - Responsive wrapping */}
                <motion.p
                    variants={contentVariants}
                    style={{
                        fontSize: 'max(0.9rem, 0.97rem)',
                        fontWeight: 300,
                        lineHeight: 1.6,
                        color: '#967E6E',
                        margin: '0 auto 32px',
                        textAlign: 'center',
                        maxWidth: '600px'
                    }}
                >
                    Bookings, staff & revenue — all in one place. The modern operating system for salons and spas.
                </motion.p>

                {/* CTA Button - Reduced margin */}
                <motion.div
                    variants={contentVariants}
                    style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}
                >
                    <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link
                            href="/partner"
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: 8,
                                padding: '16px 42px',
                                borderRadius: 100,
                                background: '#1E5C52',
                                color: '#fff',
                                fontWeight: 500,
                                fontSize: '0.9rem',
                                letterSpacing: '0.07em',
                                textTransform: 'uppercase',
                                textDecoration: 'none',
                                boxShadow: '0 8px 30px rgba(30,92,82,0.32)',
                                transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                            }}
                        >
                            Start Free Trial
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* Images Section - Responsive Stack */}
            <div className="relative z-10 w-full max-w-[1100px] mx-auto mt-8 md:mt-4 px-4 sm:px-6 pb-4">
                <div className="relative w-full flex flex-col md:flex-row items-center md:items-start justify-center gap-6 md:gap-0 min-h-auto md:min-h-[480px]">

                    {/* Left Secondary Image - Analytics Dashboard */}
                    <motion.div
                        variants={leftImageVariants}
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.3 }}
                        className="w-full md:w-[48%] relative md:absolute order-2 md:order-1 md:left-0 md:top-[30px]"
                        style={{
                            zIndex: 1,
                        }}
                    >
                        <div style={{
                            borderRadius: 16,
                            overflow: 'hidden',
                            background: 'white',
                            boxShadow: '0 2px 8px rgba(28,20,16,0.04), 0 12px 40px rgba(28,20,16,0.10), 0 32px 80px rgba(28,20,16,0.07)',
                            border: '1px solid rgba(212,200,188,0.4)',
                        }}>
                            <Image
                                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Analytics Dashboard"
                                width={700}
                                height={450}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block',
                                }}
                                unoptimized
                            />
                        </div>
                    </motion.div>

                    {/* Right Main Image - Booking Dashboard */}
                    <motion.div
                        variants={centerImageVariants}
                        whileHover={{ y: -8 }}
                        transition={{ duration: 0.3 }}
                        className="w-full md:w-[58%] relative md:ml-[28%] order-1 md:order-2"
                        style={{
                            zIndex: 2,
                        }}
                    >
                        {/* Floating Chips - Hidden/Optimized for mobile */}
                        <motion.div
                            custom={1.1}
                            variants={chipVariants}
                            animate="visible"
                            whileHover="float"
                            className="absolute -top-4 -right-2 md:top-[-18px] md:right-[28px] p-2.5 md:p-[10px_14px]"
                            style={{
                                background: 'white',
                                borderRadius: 12,
                                boxShadow: '0 6px 28px rgba(28,20,16,0.13), 0 1px 4px rgba(28,20,16,0.07)',
                                border: '1px solid rgba(212,200,188,0.3)',
                                zIndex: 20,
                            }}
                        >
                            <div style={{ fontSize: '0.55rem md:0.62rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#B8A898', marginBottom: 3 }}>
                                Today's Revenue
                            </div>
                            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem md:1.25rem', fontWeight: 500, color: '#1C1410', lineHeight: 1 }}>
                                $4,120
                            </div>
                        </motion.div>

                        <motion.div
                            custom={1.3}
                            variants={chipVariants}
                            animate="visible"
                            whileHover="float"
                            className="absolute -bottom-4 -left-2 md:bottom-[28px] md:left-[-24px] p-2.5 md:p-[10px_14px]"
                            style={{
                                background: 'white',
                                borderRadius: 12,
                                boxShadow: '0 6px 28px rgba(28,20,16,0.13), 0 1px 4px rgba(28,20,16,0.07)',
                                border: '1px solid rgba(212,200,188,0.3)',
                                zIndex: 20,
                            }}
                        >
                            <div style={{ fontSize: '0.55rem md:0.62rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#B8A898', marginBottom: 3 }}>
                                Up Next · 2:30 PM
                            </div>
                            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.9rem md:1rem', fontWeight: 500, color: '#1E5C52', lineHeight: 1 }}>
                                Sarah M.
                            </div>
                        </motion.div>

                        <div style={{
                            borderRadius: 18,
                            overflow: 'hidden',
                            background: 'white',
                            boxShadow: '0 4px 16px rgba(28,20,16,0.06), 0 20px 60px rgba(28,20,16,0.14), 0 60px 120px rgba(28,20,16,0.10), 0 0 0 1px rgba(212,200,188,0.3)',
                        }}>
                            <Image
                                src="/images/business/banner.png"
                                alt="Salon booking platform preview"
                                width={800}
                                height={500}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block',
                                }}
                                priority
                                unoptimized
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default HeroSection;