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
            { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return { ref, visible };
}

function Reveal({ children, delay = 0, className = "" }) {
    const { ref, visible } = useReveal();
    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

const AboutSection = ({ description, image }) => {
    // Default image if none provided
    const defaultImage = "https://images.unsplash.com/photo-1560066984-13812e8c6e6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80";

    const salonImage = image || defaultImage;

    return (
        <section className="py-24 px-8 max-w-7xl mx-auto" id="about">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Left Side - Content (moved up) */}
                <Reveal>
                    <div className="text-left lg:mt-[-20px]"> {/* Added negative margin to move content up */}
                        <span className="block text-[11px] tracking-[0.4em] uppercase text-[#cd6133] font-extrabold mb-5"> {/* Reduced mb-6 to mb-5 */}
                            Our Legacy
                        </span>
                        <h2 className="text-4xl md:text-5xl text-[#5a3d2b] font-bold leading-tight mb-5 font-[Cormorant_Garamond,Georgia,serif]"> {/* Reduced mb-6 to mb-5 */}
                            About <em className="italic font-light text-[#cd6133]">Us</em>
                        </h2>
                        <p className="text-[#5a3d2b] text-base md:text-lg leading-relaxed font-medium">
                            {description}
                        </p>
                        
                        {/* Decorative element - moved up slightly */}
                        <div className="mt-6 w-16 h-0.5 bg-[#cd6133]/30"></div> {/* Reduced mt-8 to mt-6 */}
                    </div>
                </Reveal>

                {/* Right Side - Image (with slight adjustment) */}
                <Reveal delay={200}>
                    <div className="relative flex justify-center lg:justify-end lg:mt-[-10px]"> {/* Slight negative margin to balance */}
                        <div className="relative overflow-hidden rounded-2xl shadow-xl w-full max-w-xs">
                            <div className="aspect-[4/5] w-full">
                                <img 
                                    src={salonImage} 
                                    alt="Salon interior"
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -top-3 -right-3 w-20 h-20 bg-[#cd6133]/10 rounded-full blur-xl -z-10"></div>
                        <div className="absolute -bottom-3 -left-3 w-24 h-24 bg-[#5a3d2b]/5 rounded-full blur-xl -z-10"></div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default AboutSection;