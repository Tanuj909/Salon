// import React, { useEffect, useRef, useState } from "react";

// function useReveal() {
//     const ref = useRef(null);
//     const [visible, setVisible] = useState(false);
//     useEffect(() => {
//         const el = ref.current;
//         if (!el) return;
//         const obs = new IntersectionObserver(
//             ([entry]) => {
//                 if (entry.isIntersecting) {
//                     setVisible(true);
//                     obs.unobserve(el);
//                 }
//             },
//             { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
//         );
//         obs.observe(el);
//         return () => obs.disconnect();
//     }, []);
//     return { ref, visible };
// }

// function Reveal({ children, delay = 0, className = "" }) {
//     const { ref, visible } = useReveal();
//     return (
//         <div
//             ref={ref}
//             className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
//             style={{ transitionDelay: `${delay}ms` }}
//         >
//             {children}
//         </div>
//     );
// }

// const AboutSection = ({ description }) => {
//     return (
//         <section className="py-24 px-8 max-w-7xl mx-auto" id="about">
//             <Reveal>
//                 <div className="max-w-4xl mx-auto text-center">
//                     <span className="block text-[11px] tracking-[0.4em] uppercase text-[#cd6133] font-extrabold mb-6">Our Legacy</span>
//                     <h2 className="text-5xl text-[#5a3d2b] font-bold leading-tight mb-8 font-[Cormorant_Garamond,Georgia,serif]">
//                         About <em className="italic font-light text-[#cd6133]">Us</em>
//                     </h2>
//                     <p className="text-[#5a3d2b] text-lg leading-relaxed font-medium">
//                         {description}
//                     </p>
//                 </div>
//             </Reveal>
//         </section>
//     );
// };

// export default AboutSection;


import React, { useEffect, useRef, useState } from "react";

function useReveal() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    obs.unobserve(el);
                }
            },
            { threshold: 0.05, rootMargin: "50px" }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return { ref, visible };
}

function Reveal({ children, delay = 0, className = "" }) {
    const { ref, visible } = useReveal();
    const safeDelay = Math.min(delay, 300);
    return (
        <div
            ref={ref}
            className={`transition-all duration-500 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} ${className}`}
            style={{ transitionDelay: `${safeDelay}ms` }}
        >
            {children}
        </div>
    );
}

const AboutSection = ({ description, images }) => {
    // Default images if none provided
    const defaultImages = [
        "https://images.unsplash.com/photo-1560066984-13812e8c6e6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    ];

    const displayImages = images && images.length >= 2 ? images.slice(0, 2) : 
                          (images && images.length === 1 ? [images[0], defaultImages[1]] : defaultImages);

    return (
        <section className="py-8 sm:py-12 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden" id="about">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
                {/* Left Side - Content (Adjusted slightly down) */}
                <Reveal>
                    <div className="text-left lg:mt-[-20px]">
                        <span className="block text-[10px] sm:text-[11px] tracking-[0.3em] sm:tracking-[0.4em] uppercase rec-section-heading-accent font-extrabold mb-4 sm:mb-5">
                            Our Legacy
                        </span>
                        <h2 className="text-[26px] sm:text-4xl md:text-5xl rec-section-heading font-bold leading-tight mb-4 sm:mb-5 font-[Cormorant_Garamond,Georgia,serif]">
                            About <em className="italic font-light rec-section-heading-accent">Us</em>
                        </h2>
                        <p className="rec-section-subtext text-sm sm:text-base md:text-lg leading-relaxed font-medium">
                            {description}
                        </p>
                        
                        {/* Decorative element */}
                        <div className="mt-5 sm:mt-6 w-12 sm:w-16 h-0.5 rec-section-divider"></div>
                    </div>
                </Reveal>

                {/* Right Side - Two Images with 15% overlap */}
                <Reveal delay={200}>
                    <div className="relative h-[350px] sm:h-[450px] w-full max-w-[500px] mx-auto lg:mx-0 mt-8 lg:mt-0 px-4">
                        {/* Second Image (Bottom Layer, Left-ish) */}
                        <div className="absolute top-8 left-0 w-[58%] aspect-[4/5] overflow-hidden rounded-2xl shadow-xl z-10 border-4 border-white">
                            <img 
                                src={displayImages[1]} 
                                alt="Salon ambiance"
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                        </div>

                        {/* First Image (Top Layer, Right-ish, overlapping by 15%) */}
                        {/* Overlap calculation: Left at 42%, Width 58% -> 42 + 58 = 100. Overlap = 58 - 42 = 16% */}
                        <div className="absolute top-0 left-[42%] w-[58%] aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl z-20 border-4 border-white">
                            <img 
                                src={displayImages[0]} 
                                alt="Salon service"
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                        </div>

                        {/* Subtle decorative elements */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 badge-verified-bg rounded-full blur-2xl -z-10 opacity-10"></div>
                        <div className="absolute -bottom-4 -left-4 w-24 h-24 rec-section-heading-accent rounded-full blur-2xl -z-10 opacity-5"></div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default AboutSection;