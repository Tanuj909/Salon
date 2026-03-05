import React from 'react';

const FeaturesSection = () => {
    const features = [
        { emoji: '📅', title: 'Appointment scheduling', description: 'A seamless booking software with intelligent automated reminders.' },
        { emoji: '💳', title: 'Payment processing', description: 'Secure, frictionless payments via PayPal, Stripe, and more.' },
        { emoji: '🛒', title: 'Point of sale (POS)', description: 'Effortlessly manage transactions, barcode scanning, and digital receipts.' },
        { emoji: '📢', title: 'Marketing promotions', description: 'Powerful curated marketing tools for targeted promotions and elite discounts.' },
        { emoji: '📦', title: 'Product inventory', description: 'Precisely track stock levels and seamlessly manage online retail sales.' },
        { emoji: '📊', title: 'Reporting & analytics', description: 'Analyze comprehensive performance metrics with real-time actionable insights.' },
    ];

    return (
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
    );
};

export default FeaturesSection;
