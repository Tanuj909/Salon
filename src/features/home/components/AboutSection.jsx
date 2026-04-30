import React from 'react';
import { 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Clock, 
  AlertCircle, 
  Calendar, 
  Search, 
  Layers, 
  Globe, 
  TrendingUp, 
  Users, 
  Activity, 
  Monitor 
} from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="pt-4 pb-12 md:pb-20 font-[DM_Sans]">
      <div className="max-w-[1240px] mx-auto px-5 md:px-12">

        {/* ── Section Header ── */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-6 h-px inline-block rec-section-divider" />
          <span className="text-[0.65rem] md:text-[0.72rem] font-semibold tracking-[0.12em] uppercase rec-section-eyebrow">
            Who We Are
          </span>
        </div>
        <div className="flex items-end justify-between mb-8 md:mb-10 flex-wrap gap-4">
          <h2 className="font-bold leading-[1.15] rec-section-heading font-[Cormorant_Garamond,Georgia,serif] text-[clamp(1.5rem,4vw,2.6rem)]">
            About <span className="italic rec-section-heading-accent">Us</span> – Fast Booking Service
          </h2>
        </div>
        <div className="h-px mb-12 md:mb-16 rec-section-divider-line" />

        <div className="space-y-16 md:space-y-32">
          {/* Row 1: Intro Part */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-8 lg:gap-16">
            <div className="w-full md:w-1/2">
              <div className="relative group">
                <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 w-full h-full border-2 border-[#C49B66]/30 rounded-xl -z-10 transition-transform"></div>
                <img
                  alt="About Us"
                  className="w-full aspect-[4/3] object-cover rounded-xl shadow-lg md:shadow-2xl"
                  src="https://images.unsplash.com/photo-1637308596839-9487d9894028?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNhbG9uJTIwaW1hZ2VzfGVufDB8fDB8fHww"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h3 className="rec-section-heading-accent font-bold tracking-[0.15em] uppercase text-[0.65rem] md:text-xs lg:text-sm mb-2 lg:mb-4">The Platform</h3>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3 lg:mb-6 leading-tight rec-section-heading font-[Cormorant_Garamond,serif]">Modern & Hassle-Free Booking</h2>
              <p className="text-sm md:text-base lg:text-lg rec-section-subtext mb-3 lg:mb-6 leading-relaxed">
                Fast Booking Service is a modern and user-friendly platform designed to make salon appointment booking fast, easy, and hassle-free across the UAE. Whether you are looking for a barber, beauty salon, spa, massage center, or nail art studio, Fast Booking Service helps you find and book the best services near you in just a few clicks.
              </p>
              <p className="text-sm md:text-base lg:text-lg rec-section-subtext leading-relaxed">
                We understand the value of your time. That’s why our platform focuses on instant booking, real-time availability, and quick confirmation, so you can skip long waiting times and walk into your appointment exactly when it’s scheduled.
              </p>
            </div>
          </div>

          {/* Row 2: What We Do */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-8 lg:gap-16">
            <div className="w-full md:w-1/2 text-center md:text-left order-2 md:order-1">
              <h3 className="rec-section-heading-accent font-bold tracking-[0.15em] uppercase text-[0.65rem] md:text-xs lg:text-sm mb-2 lg:mb-4">What We Do</h3>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3 lg:mb-6 leading-tight rec-section-heading font-[Cormorant_Garamond,serif]">Connecting Customers with Excellence</h2>
              <p className="text-sm md:text-base lg:text-lg rec-section-subtext mb-4 lg:mb-8 leading-relaxed">
                Fast Booking Service acts as a technology platform that connects customers with trusted salons and service providers.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { text: "Easy online appointment booking", icon: Calendar },
                  { text: "Access to multiple salons and services", icon: Search },
                  { text: "Quick and secure booking experience", icon: ShieldCheck },
                  { text: "Time-saving solutions for busy customers", icon: Zap }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-white rounded-xl border border-[#1C3152]/5 hover:border-[#C49B66]/30 hover:shadow-md transition-all group">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-[#C49B66]/10 flex items-center justify-center group-hover:bg-[#C49B66] transition-colors flex-shrink-0">
                      <item.icon className="w-4 h-4 md:w-5 md:h-5 text-[#C49B66] group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-xs md:text-[0.95rem] font-semibold rec-section-heading leading-tight">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <div className="relative group">
                <div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 w-full h-full border-2 border-[#C49B66]/30 rounded-xl -z-10 transition-transform"></div>
                <img
                  alt="Our Services"
                  className="w-full aspect-[4/3] object-cover rounded-xl shadow-lg md:shadow-2xl"
                  src="https://images.unsplash.com/photo-1612817288484-6f916006741a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXR5JTIwUHJvZHVjdHN8ZW58MHx8MHx8fDA%3D"
                />
              </div>
            </div>
          </div>

          {/* Row 3: For Customers */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-8 lg:gap-16">
            <div className="w-full md:w-1/2">
              <div className="relative group">
                <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 w-full h-full border-2 border-[#C49B66]/30 rounded-xl -z-10 transition-transform"></div>
                <img
                  alt="For Customers"
                  className="w-full aspect-[4/3] object-cover rounded-xl shadow-lg md:shadow-2xl"
                  src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=500&auto=format&fit=crop&q=60"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h3 className="rec-section-heading-accent font-bold tracking-[0.15em] uppercase text-[0.65rem] md:text-xs lg:text-sm mb-2 lg:mb-4">For Customers</h3>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3 lg:mb-6 leading-tight rec-section-heading font-[Cormorant_Garamond,serif]">Discover & Book Anytime</h2>
              <p className="text-sm md:text-base lg:text-lg rec-section-subtext mb-4 lg:mb-8 leading-relaxed">
                With Fast Booking Service, you can:
              </p>
              <div className="space-y-3">
                {[
                  { text: "Discover top-rated salons, spas, and barbers", icon: Search },
                  { text: "Compare services, pricing, and availability", icon: Layers },
                  { text: "Book appointments anytime, anywhere", icon: Globe },
                  { text: "Avoid waiting and manage your schedule better", icon: Clock }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-2 rounded-xl border border-transparent hover:bg-[#1C3152]/5 transition-colors group">
                    <div className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#1C3152] flex items-center justify-center">
                      <item.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#C49B66]" />
                    </div>
                    <span className="text-[0.95rem] md:text-lg rec-section-subtext font-medium text-left">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 4: For Salon Owners */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-8 lg:gap-16">
            <div className="w-full md:w-1/2 text-center md:text-left order-2 md:order-1">
              <h3 className="rec-section-heading-accent font-bold tracking-[0.15em] uppercase text-[0.65rem] md:text-xs lg:text-sm mb-2 lg:mb-4">For Salon Owners</h3>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3 lg:mb-6 leading-tight rec-section-heading font-[Cormorant_Garamond,serif]">Grow Your Business Digitally</h2>
              <p className="text-sm md:text-base lg:text-lg rec-section-subtext mb-4 lg:mb-8 leading-relaxed">
                We help salons grow their business by:
              </p>
              <div className="space-y-3">
                {[
                  { text: "Bringing new customers through online visibility", icon: TrendingUp },
                  { text: "Managing appointments efficiently", icon: Users },
                  { text: "Reducing no-shows and idle time", icon: Activity },
                  { text: "Providing a simple digital booking system", icon: Monitor }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-2 rounded-xl border border-transparent hover:bg-[#1C3152]/5 transition-colors group">
                    <div className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#1C3152] flex items-center justify-center">
                      <item.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#C49B66]" />
                    </div>
                    <span className="text-[0.95rem] md:text-lg rec-section-subtext font-medium text-left">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <div className="relative group">
                <div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 w-full h-full border-2 border-[#C49B66]/30 rounded-xl -z-10 transition-transform"></div>
                <img
                  alt="Salon Management"
                  className="w-full aspect-[4/3] object-cover rounded-xl shadow-lg md:shadow-2xl"
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&auto=format&fit=crop&q=60"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mt-16 md:mt-32 p-6 md:p-12 bg-[#1C3152]/5 rounded-3xl border border-[#1C3152]/10 text-center">
          <h3 className="rec-section-heading-accent font-bold tracking-[0.15em] uppercase text-[0.65rem] md:text-xs mb-2">Our Mission</h3>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 rec-section-heading font-[Cormorant_Garamond,serif]">Empowering Choice & Growth</h2>
          <p className="max-w-3xl mx-auto text-sm md:text-lg lg:text-xl rec-section-subtext leading-relaxed">
            Our mission is to simplify the salon booking experience by providing a reliable platform that saves time for customers and helps businesses grow.
          </p>
        </div>

        {/* Why Choose Section */}
        <div className="mt-16 md:mt-32">
          <div className="text-center mb-10 md:mb-16">
            <h3 className="rec-section-heading-accent font-bold tracking-[0.15em] uppercase text-[0.65rem] md:text-xs mb-2">Why Us</h3>
            <h2 className="text-2xl md:text-4xl font-extrabold rec-section-heading font-[Cormorant_Garamond,serif]">Why Choose Fast Booking Service</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { title: "Fast & easy", desc: "appointment booking", icon: Zap },
              { title: "Trusted salons", desc: "& professionals", icon: ShieldCheck },
              { title: "Convenient", desc: "and time-saving", icon: Clock },
              { title: "Simple and smooth", desc: "user experience", icon: CheckCircle2 }
            ].map((item, idx) => (
              <div key={idx} className="group p-6 md:p-8 bg-white rounded-2xl border border-[#1C3152]/5 hover:border-[#C49B66]/20 hover:shadow-xl transition-all text-center">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-[#1C3152]/5 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:bg-[#C49B66]/10 transition-colors">
                  <item.icon className="w-6 h-6 md:w-7 md:h-7 text-[#1C3152] group-hover:text-[#C49B66] transition-colors" />
                </div>
                <h4 className="text-base md:text-lg font-bold mb-1 md:mb-2 rec-section-heading">{item.title}</h4>
                <p className="text-xs md:text-sm rec-section-subtext">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Disclaimer */}
        <div className="mt-16 md:mt-32 flex flex-col md:flex-row items-center gap-6 md:gap-8 p-6 md:p-10 bg-red-50/50 rounded-2xl border border-red-100 italic">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-6 h-6 md:w-8 md:h-8 text-red-600" />
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-base md:text-lg font-bold text-red-900 mb-2 font-[Cormorant_Garamond,serif] uppercase tracking-wider">Important Disclaimer</h4>
            <div className="space-y-2">
               <p className="text-xs md:text-base text-red-800/80 leading-relaxed font-medium">
                  Fast Booking Service is an independent booking platform and does not provide salon or beauty services directly.
               </p>
               <p className="text-xs md:text-base text-red-800/80 leading-relaxed">
                  All services are offered by third-party salons and service providers, who are solely responsible for service quality, pricing, and customer experience.
               </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
