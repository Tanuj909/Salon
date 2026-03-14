import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="pt-4 pb-12">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* ── Section Header ── */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-6 h-px inline-block bg-[#c4956a]" />
          <span className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c4956a] font-[DM_Sans]">
            Who We Are
          </span>
        </div>
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <h2 className="font-bold leading-[1.1] text-[#1e0a18] font-[Cormorant_Garamond,Georgia,serif] text-[clamp(1.75rem,3vw,2.6rem)]">
            About <span className="italic text-[#7a2860]">Us</span>
          </h2>
        </div>
        <div className="h-px mb-10 bg-[#3c143214]" />

        <div className="space-y-16 md:space-y-24">
          {/* Experience Part */}
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-8 lg:gap-16">
            <div className="w-full md:w-1/2">
              <div className="relative group">
                <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 w-full h-full border-2 border-[#D98C5F]/30 rounded-xl -z-10 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform"></div>
                <img
                  alt="About our Experience"
                  className="w-full aspect-[4/3] object-cover rounded-xl shadow-xl md:shadow-2xl"
                  src="https://images.unsplash.com/photo-1637308596839-9487d9894028?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNhbG9uJTIwaW1hZ2VzfGVufDB8fDB8fHww"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h3 className="text-[#B76E4B] font-bold tracking-[0.15em] uppercase text-xs md:text-xs lg:text-sm mb-3 lg:mb-4">The Experience</h3>
              <h2 className="text-3xl md:text-3xl lg:text-4xl font-extrabold mb-4 lg:mb-6 leading-tight text-[#3c1432]">Elevated Atmosphere for the Modern Client</h2>
              <p className="text-base md:text-sm lg:text-lg text-[#3c1432]/70 mb-4 lg:mb-6 leading-relaxed">
                Step into a realm where time slows down. At Luxe Salon, we believe that beauty is an experience, not just a result. Our space is meticulously designed to provide a serene escape from the urban rush.
              </p>
              <p className="text-base md:text-sm lg:text-lg text-[#3c1432]/70 leading-relaxed md:block">
                Every visit begins with a personal consultation. We take the time to understand your lifestyle and preferences, ensuring every cut, color, and treatment is perfectly aligned with who you are.
              </p>
            </div>
          </div>

          {/* Expertise Part */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-8 lg:gap-16">
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h3 className="text-[#B76E4B] font-bold tracking-[0.15em] uppercase text-xs md:text-xs lg:text-sm mb-3 lg:mb-4">The Expertise</h3>
              <h2 className="text-3xl md:text-3xl lg:text-4xl font-extrabold mb-4 lg:mb-6 leading-tight text-[#3c1432]">Master Craftsmanship & Premium Products</h2>
              <p className="text-base md:text-sm lg:text-lg text-[#3c1432]/70 mb-4 lg:mb-6 leading-relaxed">
                Our team consists of internationally trained stylists and therapists who are masters of their craft. We stay ahead of global trends while maintaining a focus on timeless techniques.
              </p>
              <p className="text-base md:text-sm lg:text-lg text-[#3c1432]/70 leading-relaxed md:block">
                We exclusively use award-winning, ethically sourced products that are as kind to the environment as they are to your skin and hair. Luxury, for us, means zero compromise on quality.
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <div className="relative group">
                <div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 w-full h-full border-2 border-[#D98C5F]/30 rounded-xl -z-10 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform"></div>
                <img
                  alt="Our Expertise"
                  className="w-full aspect-[4/3] object-cover rounded-xl shadow-xl md:shadow-2xl"
                  src="https://images.unsplash.com/photo-1612817288484-6f916006741a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXR5JTIwUHJvZHVjdHN8ZW58MHx8MHx8fDA%3D"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
