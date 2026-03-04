import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="pt-4 pb-12 bg-plum/5">
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

        <div className="space-y-16">
          {/* Experience Part */}
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary rounded-xl -z-10"></div>
                <img
                  alt="About our Experience"
                  className="w-full aspect-[4/3] object-cover rounded-xl shadow-2xl"
                  src="https://images.unsplash.com/photo-1637308596839-9487d9894028?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNhbG9uJTIwaW1hZ2VzfGVufDB8fDB8fHww"
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <h3 className="text-terracotta font-bold tracking-widest uppercase text-sm mb-4">The Experience</h3>
              <h2 className="text-4xl font-extrabold mb-6 leading-tight text-earthy-brown">Elevated Atmosphere for the Modern Client</h2>
              <p className="text-lg text-earthy-brown/80 mb-6 leading-relaxed">
                Step into a realm where time slows down. At Luxe Salon, we believe that beauty is an experience, not just a result. Our space is meticulously designed to provide a serene escape from the urban rush, featuring soft lighting, curated scents, and bespoke seating.
              </p>
              <p className="text-lg text-earthy-brown/80 leading-relaxed">
                Every visit begins with a personal consultation. We take the time to understand your lifestyle and preferences, ensuring every cut, color, and treatment is perfectly aligned with who you are.
              </p>
            </div>
          </div>

          {/* Expertise Part */}
          <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2">
              <h3 className="text-terracotta font-bold tracking-widest uppercase text-sm mb-4">The Expertise</h3>
              <h2 className="text-4xl font-extrabold mb-6 leading-tight text-earthy-brown">Master Craftsmanship & Premium Products</h2>
              <p className="text-lg text-earthy-brown/80 mb-6 leading-relaxed">
                Our team consists of internationally trained stylists and therapists who are masters of their craft. We stay ahead of global trends while maintaining a focus on timeless techniques that enhance your natural features.
              </p>
              <p className="text-lg text-earthy-brown/80 leading-relaxed">
                We exclusively use award-winning, ethically sourced products that are as kind to the environment as they are to your skin and hair. Luxury, for us, means zero compromise on quality or integrity.
              </p>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-primary rounded-xl -z-10"></div>
                <img
                  alt="Our Expertise"
                  className="w-full aspect-[4/3] object-cover rounded-xl shadow-2xl"
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
