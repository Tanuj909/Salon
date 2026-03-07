import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlineUserGroup, HiOutlineBell } from 'react-icons/hi';
import { BsMegaphone, BsChatDots, BsGift, BsGraphUp } from 'react-icons/bs';
import { FiCheckCircle } from 'react-icons/fi';

const MarketingSection = () => {
    const points = [
        {
            label: 'Exquisite customizable message templates',
            icon: <BsMegaphone size={16} />,
            color: '#c4956a',
            description: 'Create beautiful campaigns in minutes'
        },
        {
            label: 'Advanced precision client targeting',
            icon: <HiOutlineUserGroup size={16} />,
            color: '#7a2860',
            description: 'Reach the right clients at the right time'
        },
        {
            label: 'Automated reminders & post-visit follow-ups',
            icon: <HiOutlineBell size={16} />,
            color: '#c4956a',
            description: 'Reduce no-shows by up to 40% automatically'
        },
    ];


    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    };

    return (
        <section style={{
            padding: '40px 24px',
            maxWidth: 1200,
            margin: '0 auto',
            position: 'relative',
        }}>
            {/* Background decoration */}
            <div style={{
                position: 'absolute',
                top: '20%',
                right: '10%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(196,149,106,0.03) 0%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 0,
            }} />

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
                style={{
                    position: 'relative',
                    zIndex: 2,
                }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[60px] items-center relative z-[2]"
            >
                {/* Content - Left Side */}
                <motion.div variants={itemVariants}>
                    {/* Badge */}
                    <motion.div
                        variants={itemVariants}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 10,
                            marginBottom: 24,
                            background: 'rgba(122,40,96,0.03)',
                            padding: '6px 14px 6px 8px',
                            borderRadius: 100,
                            border: '1px solid rgba(196,149,106,0.15)',
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 500, damping: 15, delay: 0.3 }}
                            style={{
                                width: 24,
                                height: 24,
                                borderRadius: 8,
                                background: 'linear-gradient(135deg, #c4956a, #7a2860)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                            }}
                        >
                            <BsChatDots size={14} />
                        </motion.div>
                        <span style={{
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: '#7a2860',
                        }}>
                            Marketing Automation
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h2
                        variants={itemVariants}
                        style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                            fontWeight: 600,
                            color: '#1e0a18',
                            lineHeight: 1.1,
                            letterSpacing: '-0.02em',
                            marginBottom: 20,
                        }}
                    >
                        Stay in touch with{' '}
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            style={{
                                color: '#7a2860',
                                fontStyle: 'italic',
                                position: 'relative',
                                display: 'inline-block',
                            }}
                        >
                            smart
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: '100%' }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.8 }}
                                style={{
                                    position: 'absolute',
                                    bottom: 4,
                                    left: 0,
                                    height: 6,
                                    background: 'rgba(196,149,106,0.15)',
                                    borderRadius: 3,
                                    zIndex: -1,
                                }}
                            />
                        </motion.span>{' '}
                        campaigns
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        variants={itemVariants}
                        style={{
                            fontSize: '1rem',
                            color: 'rgba(60,20,50,0.6)',
                            lineHeight: 1.7,
                            marginBottom: 36,
                            maxWidth: 480,
                        }}
                    >
                        Engage clients effortlessly with personalized messaging that feels human, not automated. Build lasting relationships and watch your retention soar.
                    </motion.p>

                    {/* Feature List */}
                    <motion.div
                        variants={containerVariants}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 24,
                            marginBottom: 32,
                        }}
                    >
                        {points.map((item, i) => (
                            <motion.div
                                key={i}
                                variants={itemVariants}
                                whileHover={{ x: 5 }}
                                transition={{ duration: 0.2 }}
                                style={{
                                    display: 'flex',
                                    gap: 16,
                                }}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ duration: 0.2 }}
                                    style={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: 14,
                                        background: `linear-gradient(135deg, ${item.color}12, ${item.color}05)`,
                                        border: `1px solid ${item.color}25`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: item.color,
                                        flexShrink: 0,
                                        boxShadow: `0 6px 12px -8px ${item.color}`,
                                    }}
                                >
                                    {item.icon}
                                </motion.div>
                                <div>
                                    <span style={{
                                        fontSize: '1rem',
                                        color: '#1e0a18',
                                        fontWeight: 600,
                                        letterSpacing: '-0.01em',
                                        display: 'block',
                                        marginBottom: 4,
                                    }}>
                                        {item.label}
                                    </span>
                                    <span style={{
                                        fontSize: '0.85rem',
                                        color: 'rgba(60,20,50,0.5)',
                                        lineHeight: 1.5,
                                    }}>
                                        {item.description}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                </motion.div>

                {/* Image - Right Side */}
                <motion.div
                    variants={itemVariants}
                    style={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {/* Decorative elements */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        style={{
                            position: 'absolute',
                            top: -20,
                            right: -20,
                            width: 300,
                            height: 300,
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(196,149,106,0.08) 0%, transparent 70%)',
                            zIndex: 0,
                        }}
                    />
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        style={{
                            position: 'absolute',
                            bottom: -20,
                            left: -20,
                            width: 250,
                            height: 250,
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(122,40,96,0.06) 0%, transparent 70%)',
                            zIndex: 0,
                        }}
                    />

                    {/* Main Image Card */}
                    <motion.div
                        whileHover={{ y: -8 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: 'relative',
                            width: '100%',
                            maxWidth: 480,
                            borderRadius: 32,
                            overflow: 'hidden',
                            boxShadow: '0 30px 60px -20px rgba(122,40,96,0.3), 0 0 0 1px rgba(196,149,106,0.15)',
                            zIndex: 2,
                        }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.4 }}
                            style={{
                                borderRadius: 32,
                                overflow: 'hidden',
                            }}
                        >
                            <img
                                src="https://placehold.co/600x400/7a2860/c4956a?text=Marketing+Dashboard&font=montserrat"
                                alt="Marketing Campaign Dashboard"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block',
                                }}
                            />
                        </motion.div>

                        {/* Gradient Overlay */}
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '40%',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.02), transparent)',
                            pointerEvents: 'none',
                        }} />
                    </motion.div>

                    {/* Auto-Pilot Status Overlay - Centered below image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        style={{
                            background: '#1e0a18',
                            borderRadius: 100,
                            padding: '12px 24px',
                            boxShadow: '0 20px 40px -10px rgba(30,10,24,0.4)',
                            zIndex: 4,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            border: '1px solid rgba(196,149,106,0.3)',
                            marginTop: 24,
                        }}
                    >
                        <div style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: '#c4956a',
                            boxShadow: '0 0 12px #c4956a',
                        }} />
                        <span style={{
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            color: 'white',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase'
                        }}>
                            Auto-Pilot Active
                        </span>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default MarketingSection;