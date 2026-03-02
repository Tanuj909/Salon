import React from 'react';

const Footer = () => {
  return (
    // <footer className="bg-[#3c1432] text-[#fdf6f0] pt-20 pb-10 px-6" style={{ fontFamily: "'Georgia', serif" }}>
    <footer className="bg-plum text-[#fdf6f0] pt-20 pb-10 px-6" style={{ fontFamily: "'Georgia', serif" }}>
      {/* Scoped styles only for pseudo-elements and hover effects Tailwind can't do in JSX */}
      <style>{`
        .ft-link:hover { color: #c4956a; }
        .ft-social-btn:hover { background: #9b5876; border-color: #9b5876; color: #fdf6f0; }
        .ft-input::placeholder { color: rgba(253,246,240,0.3); }
        .ft-input:focus { border-color: rgba(155,88,118,0.6); background: rgba(253,246,240,0.09); }
        .ft-subscribe:hover { opacity: 0.88; transform: translateY(-1px); }
        .ft-bottom-link:hover { color: #fdf6f0; }
      `}</style>

      <div className="max-w-[1200px] mx-auto">

        {/* Responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Col 1 — Brand */}
          <div>
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-5">
              <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#c4956a" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 3l6 6-6 6M12 15h6" />
                <circle cx="18" cy="15" r="2" />
                <circle cx="6" cy="3" r="1.5" />
              </svg>
              <span className="text-2xl font-extrabold tracking-[0.08em] text-[#fdf6f0]">LUXE</span>
              <div className="w-2 h-2 rounded-full bg-[#c4956a] shrink-0" />
            </div>

            {/* Tagline */}
            <p className="text-[0.86rem] leading-[1.7] mb-6" style={{ color: 'rgba(253,246,240,0.52)' }}>
              Dedicated to the art of luxury grooming and holistic well-being. Redefining elegance since 2010.
            </p>

            {/* Social buttons */}
            <div className="flex gap-3 mt-1">
              {/* Instagram */}
              <a href="#" className="ft-social-btn w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer transition-[background,border-color,color] duration-[220ms] no-underline"
                style={{ borderColor: 'rgba(253,246,240,0.2)', color: 'rgba(253,246,240,0.7)', background: 'transparent' }}
                aria-label="Instagram">
                <svg width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4.5" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" className="ft-social-btn w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer transition-[background,border-color,color] duration-[220ms] no-underline"
                style={{ borderColor: 'rgba(253,246,240,0.2)', color: 'rgba(253,246,240,0.7)', background: 'transparent' }}
                aria-label="Facebook">
                <svg width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              {/* Globe */}
              <a href="#" className="ft-social-btn w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer transition-[background,border-color,color] duration-[220ms] no-underline"
                style={{ borderColor: 'rgba(253,246,240,0.2)', color: 'rgba(253,246,240,0.7)', background: 'transparent' }}
                aria-label="Website">
                <svg width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2 — Explore */}
          <div>
            <h4 className="text-base font-bold mb-6 tracking-[0.02em] text-[#fdf6f0]">Explore</h4>
            {["Our Salons", "Special Offers", "Gift Cards", "Meet the Team", "Gallery"].map(item => (
              <a
                key={item}
                href="#"
                className="ft-link block text-[0.88rem] mb-3.5 no-underline transition-colors duration-200"
                style={{ color: 'rgba(253,246,240,0.55)', fontFamily: "'Georgia', serif" }}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Col 3 — Visit Us */}
          <div>
            <h4 className="text-base font-bold mb-6 tracking-[0.02em] text-[#fdf6f0]">Visit Us</h4>

            {/* Address */}
            <div className="flex items-start gap-3 mb-[18px] text-[0.88rem] leading-[1.6]" style={{ color: 'rgba(253,246,240,0.55)' }}>
              <span className="text-[#c4956a] shrink-0 mt-[2px]">
                <svg width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <span>123 Elegance Blvd, Suite 100<br />Beverly Hills, CA 90210</span>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3 mb-[18px] text-[0.88rem] leading-[1.6]" style={{ color: 'rgba(253,246,240,0.55)' }}>
              <span className="text-[#c4956a] shrink-0 mt-[2px]">
                <svg width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </span>
              <span>+1 (555) 123-4567</span>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3 mb-[18px] text-[0.88rem] leading-[1.6]" style={{ color: 'rgba(253,246,240,0.55)' }}>
              <span className="text-[#c4956a] shrink-0 mt-[2px]">
                <svg width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
              <span>appointments@luxesalon.com</span>
            </div>
          </div>

          {/* Col 4 — Newsletter */}
          <div>
            <h4 className="text-base font-bold mb-6 tracking-[0.02em] text-[#fdf6f0]">Stay Elegant</h4>
            <p className="text-[0.86rem] leading-[1.65] mb-5" style={{ color: 'rgba(253,246,240,0.52)' }}>
              Join our list for exclusive beauty tips and seasonal offers.
            </p>
            <input
              className="ft-input w-full rounded-[10px] border px-4 py-[11px] text-[0.85rem] text-[#fdf6f0] outline-none mb-2.5 transition-[border-color,background] duration-200"
              style={{ background: 'rgba(253,246,240,0.06)', borderColor: 'rgba(253,246,240,0.18)', fontFamily: "'Georgia', serif" }}
              type="email"
              placeholder="Your email address"
            />
            <button
              className="ft-subscribe w-full rounded-[10px] border-none px-4 py-[11px] text-[0.85rem] font-bold text-[#fdf6f0] cursor-pointer tracking-[0.04em] transition-[opacity,transform] duration-200 shadow-[0_4px_16px_rgba(60,20,50,0.3)]"
              style={{ background: 'linear-gradient(135deg, #9b5876, #7a2860)', fontFamily: "'Georgia', serif" }}
            >
              Subscribe →
            </button>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4 pt-7 border-t" style={{ borderColor: 'rgba(253,246,240,0.1)' }}>
          <p className="text-[0.78rem] w-full md:w-auto" style={{ color: 'rgba(253,246,240,0.35)', fontFamily: "'Georgia', serif" }}>
            © 2024 Luxe Salon &amp; Spa. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6 w-full md:w-auto">
            <a href="#" className="ft-bottom-link text-[0.78rem] no-underline transition-colors duration-200"
              style={{ color: 'rgba(253,246,240,0.35)', fontFamily: "'Georgia', serif" }}>
              Privacy Policy
            </a>
            <a href="#" className="ft-bottom-link text-[0.78rem] no-underline transition-colors duration-200"
              style={{ color: 'rgba(253,246,240,0.35)', fontFamily: "'Georgia', serif" }}>
              Terms of Service
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;