import React from 'react';
import { motion } from 'framer-motion';
import {
    GiScissors,
    GiSparkles,
    GiNails,
    GiRazor,
    GiSpineArrow,
    GiLipstick,
    GiPencilBrush,
    GiHealthNormal,
    GiWeightScale,
    GiFlowerTwirl,
    GiMeditation
} from 'react-icons/gi';
import { PiFlowerTulip } from 'react-icons/pi';

const BusinessTypesSection = () => {
    const businessTypes = [
        { label: 'Hair Salon', icon: <GiScissors size={16} /> },
        { label: 'Waxing Studio', icon: <PiFlowerTulip size={16} /> },
        { label: 'Nail Boutique', icon: <GiNails size={16} /> },
        { label: 'Premium Barbershop', icon: <GiRazor size={16} /> },
        { label: 'Massage Therapy', icon: <GiSpineArrow size={16} /> },
        { label: 'Beauty Lounge', icon: <GiLipstick size={16} /> },
        { label: 'Tattoo & Piercing', icon: <GiPencilBrush size={16} /> },
        { label: 'Aesthetic Clinic', icon: <GiHealthNormal size={16} /> },
        { label: 'Weight Loss Center', icon: <GiWeightScale size={16} /> },
        { label: 'Luxury Spa', icon: <GiSparkles size={16} /> },
        { label: 'Wellness Retreat', icon: <GiFlowerTwirl size={16} /> },
        { label: 'Yoga & Fitness', icon: <GiMeditation size={16} /> },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 10 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    };

    return (
        <section style={{
            padding: '40px 24px',
            maxWidth: 1100,
            margin: '0 auto',
            textAlign: 'center',
            position: 'relative',
        }}>

            {/* Background decoration */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at 50% 50%, rgba(196,149,106,0.03) 0%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 0,
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: 40 }}
                >
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 12,
                        marginBottom: 16
                    }}>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: 40 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            style={{ height: 2, background: 'linear-gradient(90deg, transparent, #c4956a)' }}
                        />
                        <span style={{
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            color: '#7a2860',
                            background: 'rgba(122,40,96,0.03)',
                            padding: '4px 12px',
                            borderRadius: 100,
                        }}>
                            Built for Your Industry
                        </span>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: 40 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            style={{ height: 2, background: 'linear-gradient(90deg, #c4956a, transparent)' }}
                        />
                    </div>

                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                            fontWeight: 600,
                            color: '#1e0a18',
                            letterSpacing: '-0.02em',
                            marginBottom: 12,
                        }}
                    >
                        Tailored for{' '}
                        <motion.span
                            initial={{ opacity: 0, x: -5 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            style={{
                                color: '#7a2860',
                                fontStyle: 'italic',
                                position: 'relative',
                                display: 'inline-block',
                            }}
                        >
                            your
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: '100%' }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.7 }}
                                style={{
                                    position: 'absolute',
                                    bottom: 2,
                                    left: 0,
                                    height: 4,
                                    background: 'rgba(196,149,106,0.15)',
                                    borderRadius: 2,
                                    zIndex: -1,
                                }}
                            />
                        </motion.span>{' '}
                        business
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        style={{
                            fontSize: '0.88rem',
                            color: 'rgba(60,20,50,0.55)',
                            fontWeight: 400,
                            letterSpacing: '0.01em',
                        }}
                    >
                        Elite software purpose-built for beauty & wellness professionals
                    </motion.p>
                </motion.div>

                {/* Tags Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: 10,
                    }}
                >
                    {businessTypes.map((type, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.05,
                                y: -3,
                                transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 8,
                                padding: '8px 18px',
                                borderRadius: 40,
                                border: '1px solid rgba(196,149,106,0.15)',
                                background: 'white',
                                color: '#3c1432',
                                fontSize: '0.82rem',
                                fontWeight: 500,
                                cursor: 'pointer',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                                transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'linear-gradient(135deg, #c4956a, #7a2860)';
                                e.currentTarget.style.color = '#fff';
                                e.currentTarget.style.borderColor = 'transparent';
                                e.currentTarget.style.boxShadow = '0 8px 20px -8px rgba(122,40,96,0.4)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'white';
                                e.currentTarget.style.color = '#3c1432';
                                e.currentTarget.style.borderColor = 'rgba(196,149,106,0.15)';
                                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.02)';
                            }}
                        >
                            <motion.span
                                whileHover={{ rotate: 5 }}
                                transition={{ duration: 0.2 }}
                                style={{
                                    fontSize: '0.9rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'inherit',
                                }}
                            >
                                {type.icon}
                            </motion.span>
                            {type.label}
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom CTA hint */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    style={{
                        marginTop: 36,
                        fontSize: '0.8rem',
                        color: 'rgba(60,20,50,0.4)',
                        letterSpacing: '0.02em',
                    }}
                >
                    Don't see your category?{' '}
                    <motion.a
                        href="/contact"
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            color: '#c4956a',
                            fontWeight: 600,
                            textDecoration: 'none',
                            borderBottom: '1px dashed rgba(196,149,106,0.3)',
                            paddingBottom: 2,
                            display: 'inline-block',
                        }}
                    >
                        Get in touch →
                    </motion.a>
                </motion.p>
            </div>
        </section>
    );
};

export default BusinessTypesSection;