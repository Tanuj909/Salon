import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineStar, HiStar } from 'react-icons/hi';
import { BsChatQuote } from 'react-icons/bs';

const TestimonialSection = () => {
    const testimonials = [
        {
            quote: "By far the best experience I've had with a salon booking system! Super user-friendly, and automated policies reduced no-shows dramatically.",
            name: 'Ursula M.',
            business: 'Royal Salon',
            location: 'Paris, France',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1494790108777-8fd4f2a24a6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        },
        {
            quote: "This platform transformed how we manage our spa. The analytics alone saved us hours of manual work every week. Absolutely essential for any serious business.",
            name: 'James C.',
            business: 'Tranquil Spa',
            location: 'London, UK',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        },
        {
            quote: "Our bookings increased by 40% within the first month. Clients love the easy scheduling and we love the automated reminders. Win-win!",
            name: 'Sophie L.',
            business: 'Luxe Beauty Lounge',
            location: 'Milan, Italy',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
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

    const headerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    };

    return (
        <section style={{
            padding: '60px 24px',
            maxWidth: 1200,
            margin: '0 auto',
            position: 'relative',
        }}>

            {/* Background decoration */}
            <div style={{
                position: 'absolute',
                top: '20%',
                left: '5%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(196,149,106,0.03) 0%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 0,
            }} />
            <div style={{
                position: 'absolute',
                bottom: '10%',
                right: '5%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(122,40,96,0.02) 0%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 0,
            }} />

            <div style={{ position: 'relative', zIndex: 2 }}>

                {/* Header */}
                <motion.div
                    variants={headerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: 60 }}
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
                            Client Stories
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
                            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                            fontWeight: 600,
                            color: '#1e0a18',
                            letterSpacing: '-0.02em',
                            marginBottom: 12,
                        }}
                    >
                        Loved by{' '}
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
                            professionals
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: '100%' }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.7 }}
                                style={{
                                    position: 'absolute',
                                    bottom: 4,
                                    left: 0,
                                    height: 4,
                                    background: 'rgba(196,149,106,0.15)',
                                    borderRadius: 2,
                                    zIndex: -1,
                                }}
                            />
                        </motion.span>{' '}
                        worldwide
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        style={{
                            fontSize: '0.95rem',
                            color: 'rgba(60,20,50,0.6)',
                            maxWidth: 500,
                            margin: '0 auto',
                            fontWeight: 300,
                        }}
                    >
                        Join thousands of satisfied salon owners who trust our platform
                    </motion.p>
                </motion.div>

                {/* Testimonials Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: 30,
                    }}
                >
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{
                                y: -8,
                                transition: { duration: 0.3 }
                            }}
                            style={{
                                borderRadius: 28,
                                background: 'white',
                                border: '1px solid rgba(196,149,106,0.12)',
                                padding: '32px 28px',
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: '0 10px 30px -15px rgba(0,0,0,0.05)',
                                transition: 'box-shadow 0.3s ease',
                                cursor: 'default',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(122,40,96,0.2)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.boxShadow = '0 10px 30px -15px rgba(0,0,0,0.05)';
                            }}
                        >
                            {/* Quote icon background */}
                            <div style={{
                                position: 'absolute',
                                top: 20,
                                right: 20,
                                fontSize: '5rem',
                                fontFamily: "'Cormorant Garamond', serif",
                                lineHeight: 1,
                                color: 'rgba(196,149,106,0.08)',
                                fontWeight: 700,
                                pointerEvents: 'none',
                            }}>
                                "
                            </div>

                            {/* Rating */}
                            <div style={{
                                display: 'flex',
                                gap: 3,
                                marginBottom: 20
                            }}>
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            duration: 0.3,
                                            delay: 0.5 + (i * 0.05)
                                        }}
                                    >
                                        <HiStar
                                            size={18}
                                            color={i < testimonial.rating ? '#c4956a' : '#e0d6ce'}
                                        />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Quote */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                style={{
                                    fontSize: '0.95rem',
                                    color: '#3c1432',
                                    lineHeight: 1.7,
                                    marginBottom: 28,
                                    position: 'relative',
                                    zIndex: 2,
                                    fontWeight: 400,
                                }}
                            >
                                "{testimonial.quote}"
                            </motion.p>

                            {/* Author */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 14,
                                    borderTop: '1px solid rgba(196,149,106,0.1)',
                                    paddingTop: 20,
                                }}
                            >
                                {/* Avatar with image */}
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ duration: 0.2 }}
                                    style={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: '50%',
                                        overflow: 'hidden',
                                        border: '2px solid white',
                                        boxShadow: '0 4px 10px rgba(122,40,96,0.1)',
                                        flexShrink: 0,
                                    }}
                                >
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </motion.div>

                                <div>
                                    <div style={{
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        color: '#1e0a18',
                                        marginBottom: 2,
                                    }}>
                                        {testimonial.name}
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 6,
                                        fontSize: '0.75rem',
                                        color: '#7a2860',
                                        fontWeight: 500,
                                    }}>
                                        <span>{testimonial.business}</span>
                                        <span style={{
                                            width: 3,
                                            height: 3,
                                            background: '#c4956a',
                                            borderRadius: '50%',
                                        }} />
                                        <span style={{ color: 'rgba(60,20,50,0.5)' }}>
                                            {testimonial.location}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Decorative corner */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                    width: 60,
                                    height: 60,
                                    background: 'linear-gradient(135deg, transparent 50%, rgba(196,149,106,0.03) 50%)',
                                    borderBottomRightRadius: 28,
                                }}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default TestimonialSection;