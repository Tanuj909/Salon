// "use client";
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useAuthContext } from '@/features/auth/hooks/useAuth';
// import { useRouter } from 'next/navigation';

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const { user, loading, logout } = useAuthContext();
//   const router = useRouter();

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleLogout = () => {
//     logout();
//     setIsProfileOpen(false);
//     router.push('/login');
//   };

//   return (
//     <nav
//       className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
//         isScrolled
//           ? 'bg-white/90 backdrop-blur-md shadow-md py-3'
//           : 'bg-transparent py-5'
//       }`}
//     >
//       <div className="container-custom flex items-center justify-between px-4 md:px-6 lg:px-8">
//         {/* Left Side: Logo & Primary Links */}
//         <div className="flex items-center gap-4 lg:gap-8">
// <Link
//   href="/"
//   className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm"
// >
//   <span className="material-symbols-outlined text-[#D98C5F] text-3xl">
//     content_cut
//   </span>

//   <span className="text-xl font-bold tracking-tight text-gray-700">
//     Fast Booking
//   </span>
// </Link>

//           <div className="hidden md:flex items-center gap-3">
//             <Link
//               href="/"
//               className={`px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm ${
//                 isScrolled
//                   ? 'bg-black/5 backdrop-blur-sm text-gray-400 hover:bg-[#D98C5F] hover:text-white'
//                   : 'bg-white/80 backdrop-blur-sm text-gray-400 hover:bg-gray-300 hover:text-white'
//               }`}
//             >
//               Home
//             </Link>
//             <Link
//               href="/salons"
//               className={`px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm ${
//                 isScrolled
//                   ? 'bg-black/5 backdrop-blur-sm text-gray-400 hover:bg-[#D98C5F] hover:text-white'
//                   : 'bg-white/80 backdrop-blur-sm text-gray-400 hover:bg-gray-300 hover:text-white'
//               }`}
//             >
//               Salons
//             </Link>
//           </div>
//         </div>

//         {/* Right Side: Actions */}
//         <div className="flex items-center gap-2">
//           <Link
//             href="/contact"
//             className={`hidden sm:block px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md active:scale-95 ${
//               isScrolled
//                 ? 'bg-[#D98C5F] text-white hover:bg-[#C6794C]'
//                 : 'bg-white/80 backdrop-blur-sm text-gray-400 hover:bg-[#D98C5F] hover:text-white border border-white/30'
//             }`}
//           >
//             List Your Business
//           </Link>

//           <div className="relative">
//             {!loading && (
//               user ? (
//                 <>
//                   <button
//                     onClick={() => setIsProfileOpen(!isProfileOpen)}
//                     className={`flex items-center justify-center w-10 h-10 rounded-full transition-all shadow-md border-2 ${
//                       isScrolled
//                         ? 'bg-[#D98C5F] text-white hover:bg-[#C07B52] border-white/30'
//                         : 'bg-white/80 backdrop-blur-sm text-gray-400 hover:bg-[#D98C5F] hover:text-white border-white/50'
//                     }`}
//                     aria-label="User profile"
//                   >
//                     <span className="material-symbols-outlined text-2xl">person</span>
//                   </button>

//                   {isProfileOpen && (
//                     <div className="absolute right-0 mt-3 w-48 bg-white/95 backdrop-blur-md rounded-xl overflow-hidden py-2 shadow-xl animate-fade-in border border-gray-200">
//                       <Link
//                         href="/profile"
//                         className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-400 hover:bg-[#D98C5F]/10 hover:text-[#D98C5F] transition-colors"
//                         onClick={() => setIsProfileOpen(false)}
//                       >
//                         <span className="material-symbols-outlined text-lg">account_circle</span>
//                         Profile
//                       </Link>
//                       <button
//                         className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-400 hover:bg-[#D98C5F]/10 hover:text-[#D98C5F] transition-colors text-left"
//                         onClick={handleLogout}
//                       >
//                         <span className="material-symbols-outlined text-lg">logout</span>
//                         Logout
//                       </button>
//                     </div>
//                   )}
//                 </>
//               ) : (
//                 <Link
//                   href="/login"
//                   className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md active:scale-95 ${
//                     isScrolled
//                       ? 'bg-[#D98C5F] text-white hover:bg-[#C07B52]'
//                       : 'bg-white/20 backdrop-blur-sm text-gray-400 hover:bg-[#D98C5F] hover:text-white border border-white/30'
//                   }`}
//                 >
//                   Login
//                 </Link>
//               )
//             )}
//           </div>

//           <button
//             className={`md:hidden p-2 rounded-lg transition-all ${
//               isScrolled
//                 ? 'bg-black/5 backdrop-blur-sm text-gray-400 hover:bg-[#D98C5F] hover:text-white'
//                 : 'bg-white/20 backdrop-blur-sm text-gray-400 hover:bg-[#D98C5F] hover:text-white'
//             }`}
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             <span className="material-symbols-outlined text-2xl">{isMenuOpen ? 'close' : 'menu'}</span>
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="absolute top-full left-0 w-full p-4 bg-white/95 backdrop-blur-md md:hidden flex flex-col gap-2 shadow-xl animate-fade-in border-t border-gray-200">
//           <Link
//             href="/"
//             className="text-gray-400 font-medium hover:text-white transition-colors px-4 py-3 rounded-xl hover:bg-[#D98C5F] text-base"
//             onClick={() => setIsMenuOpen(false)}
//           >
//             Home
//           </Link>
//           <Link
//             href="/salons"
//             className="text-gray-400 font-medium hover:text-white transition-colors px-4 py-3 rounded-xl hover:bg-[#D98C5F] text-base"
//             onClick={() => setIsMenuOpen(false)}
//           >
//             Salons
//           </Link>
//           <Link
//             href="/contact"
//             className="text-gray-400 font-semibold hover:text-white transition-colors px-4 py-3 rounded-xl hover:bg-[#D98C5F] text-base border border-[#D98C5F]/30"
//             onClick={() => setIsMenuOpen(false)}
//           >
//             List Your Business
//           </Link>
//           {!loading && !user && (
//             <Link
//               href="/login"
//               className="mt-2 text-center py-3.5 bg-[#D98C5F] text-white rounded-xl font-semibold shadow-lg active:scale-[0.98] transition-transform text-base"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Login
//             </Link>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// }

"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuthContext } from '@/features/auth/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, loading, logout } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    router.push('/login');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-md py-4' // Increased from py-3 to py-4
          : 'bg-transparent py-6' // Increased from py-5 to py-6
      }`}
    >
      {/* Full width container with increased horizontal padding */}
      <div className="w-full px-6 md:px-10 lg:px-16 xl:px-24 mx-auto"> {/* Increased padding */}
        <div className="flex items-center justify-between">
          {/* Left Side: Logo & Primary Links */}
          <div className="flex items-center gap-4 lg:gap-8">
            <Link
              href="/"
              className="flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm" // Increased padding
            >
              <span className="material-symbols-outlined text-[#D98C5F] text-3xl">
                content_cut
              </span>
              <span className="text-xl font-bold tracking-tight text-gray-700">
                Fast Booking
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/"
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm ${ // Increased padding
                  isScrolled
                    ? 'bg-black/5 backdrop-blur-sm text-gray-400 hover:bg-[#D98C5F] hover:text-white'
                    : 'bg-white/80 backdrop-blur-sm text-gray-400 hover:bg-gray-300 hover:text-white'
                }`}
              >
                Home
              </Link>
              <Link
                href="/salons"
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm ${ // Increased padding
                  isScrolled
                    ? 'bg-black/5 backdrop-blur-sm text-gray-400 hover:bg-[#D98C5F] hover:text-white'
                    : 'bg-white/80 backdrop-blur-sm text-gray-400 hover:bg-gray-300 hover:text-white'
                }`}
              >
                Salons
              </Link>
            </div>
          </div>

          {/* Right Side: Actions */}
          <div className="flex items-center gap-3"> {/* Increased gap from gap-2 to gap-3 */}
            <Link
              href="/contact"
              className={`hidden sm:block px-6 py-3 rounded-full text-sm font-semibold transition-all shadow-md active:scale-95 ${ // Increased padding
                isScrolled
                  ? 'bg-[#D98C5F] text-white hover:bg-[#C6794C]'
                  : 'bg-white/80 backdrop-blur-sm text-gray-400 hover:bg-[#D98C5F] hover:text-white border border-white/30'
              }`}
            >
              List Your Business
            </Link>

            <div className="relative">
              {!loading && (
                user ? (
                  <>
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className={`flex items-center justify-center w-11 h-11 rounded-full transition-all shadow-md border-2 ${ // Increased from w-10 h-10 to w-11 h-11
                        isScrolled
                          ? 'bg-[#D98C5F] text-white hover:bg-[#C07B52] border-white/30'
                          : 'bg-white/80 backdrop-blur-sm text-gray-400 hover:bg-[#D98C5F] hover:text-white border-white/50'
                      }`}
                      aria-label="User profile"
                    >
                      <span className="material-symbols-outlined text-2xl">person</span>
                    </button>

                    {isProfileOpen && (
                      <div className="absolute right-0 mt-3 w-48 bg-white/95 backdrop-blur-md rounded-xl overflow-hidden py-2 shadow-xl animate-fade-in border border-gray-200">
                        <Link
                          href="/profile"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-400 hover:bg-[#D98C5F]/10 hover:text-[#D98C5F] transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <span className="material-symbols-outlined text-lg">account_circle</span>
                          Profile
                        </Link>
                        <button
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-400 hover:bg-[#D98C5F]/10 hover:text-[#D98C5F] transition-colors text-left"
                          onClick={handleLogout}
                        >
                          <span className="material-symbols-outlined text-lg">logout</span>
                          Logout
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href="/login"
                    className={`px-7 py-3 rounded-full text-sm font-semibold transition-all shadow-md active:scale-95 ${ // Increased padding
                      isScrolled
                        ? 'bg-[#D98C5F] text-white hover:bg-[#C07B52]'
                        : 'bg-white/20 backdrop-blur-sm text-gray-400 hover:bg-[#D98C5F] hover:text-white border border-white/30'
                    }`}
                  >
                    Login
                  </Link>
                )
              )}
            </div>

            <button
              className={`md:hidden p-2.5 rounded-lg transition-all ${ // Increased from p-2 to p-2.5
                isScrolled
                  ? 'bg-black/5 backdrop-blur-sm text-gray-400 hover:bg-[#D98C5F] hover:text-white'
                  : 'bg-white/20 backdrop-blur-sm text-gray-400 hover:bg-[#D98C5F] hover:text-white'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="material-symbols-outlined text-2xl">{isMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full p-5 bg-white/95 backdrop-blur-md md:hidden flex flex-col gap-2 shadow-xl animate-fade-in border-t border-gray-200"> {/* Increased from p-4 to p-5 */}
          <Link
            href="/"
            className="text-gray-400 font-medium hover:text-white transition-colors px-5 py-3.5 rounded-xl hover:bg-[#D98C5F] text-base" // Increased padding
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/salons"
            className="text-gray-400 font-medium hover:text-white transition-colors px-5 py-3.5 rounded-xl hover:bg-[#D98C5F] text-base" // Increased padding
            onClick={() => setIsMenuOpen(false)}
          >
            Salons
          </Link>
          <Link
            href="/contact"
            className="text-gray-400 font-semibold hover:text-white transition-colors px-5 py-3.5 rounded-xl hover:bg-[#D98C5F] text-base border border-[#D98C5F]/30" // Increased padding
            onClick={() => setIsMenuOpen(false)}
          >
            List Your Business
          </Link>
          {!loading && !user && (
            <Link
              href="/login"
              className="mt-2 text-center py-4 bg-[#D98C5F] text-white rounded-xl font-semibold shadow-lg active:scale-[0.98] transition-transform text-base" // Increased from py-3.5 to py-4
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}


// "use client";
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useAuthContext } from '@/features/auth/hooks/useAuth';
// import { useRouter } from 'next/navigation';

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const { user, loading, logout } = useAuthContext();
//   const router = useRouter();

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 40);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (!e.target.closest('[data-profile-menu]')) setIsProfileOpen(false);
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     logout();
//     setIsProfileOpen(false);
//     router.push('/login');
//   };

//   return (
//     <>
//       <style>{`
//         @keyframes fadeSlideDown {
//           from { opacity: 0; transform: translateY(-8px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes mobileMenuIn {
//           from { opacity: 0; transform: translateY(-12px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>

//       <nav className="fixed top-0 left-0 right-0 z-50 w-full">

//         {/* ── Main Pill Bar ── */}
//         <div
//           style={{
//             margin: isScrolled ? '0' : '12px 24px 0',
//             borderRadius: isScrolled ? '0px' : '20px',
//             background: 'rgba(255,255,255,0.96)',
//             backdropFilter: 'blur(20px)',
//             WebkitBackdropFilter: 'blur(20px)',
//             boxShadow: isScrolled
//               ? '0 2px 32px rgba(0,0,0,0.08)'
//               : '0 4px 40px rgba(0,0,0,0.15), 0 1px 8px rgba(0,0,0,0.06)',
//             borderBottom: isScrolled ? '1px solid rgba(0,0,0,0.06)' : 'none',
//             transition: 'all 0.45s cubic-bezier(0.4,0,0.2,1)',
//           }}
//         >
//           <div
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               padding: isScrolled ? '13px 40px' : '11px 22px',
//               transition: 'padding 0.45s cubic-bezier(0.4,0,0.2,1)',
//             }}
//           >

//             {/* ── Logo ── */}
//             <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
//               <div style={{
//                 width: 38, height: 38, borderRadius: 11,
//                 background: 'linear-gradient(135deg, #D98C5F 0%, #bf6d3e 100%)',
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 boxShadow: '0 4px 14px rgba(217,140,95,0.38)',
//                 flexShrink: 0,
//               }}>
//                 <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: 20 }}>content_cut</span>
//               </div>
//               <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
//                 <span style={{ fontWeight: 700, fontSize: '0.98rem', color: '#1a1a1a', letterSpacing: '-0.02em' }}>
//                   Fast Booking
//                 </span>
//                 <span style={{ fontSize: '0.6rem', color: '#D98C5F', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
//                   Salons & Barbershops
//                 </span>
//               </div>
//             </Link>

//             {/* ── Desktop Nav Links ── */}
//             <div style={{ display: 'none', alignItems: 'center', gap: 2 }} className="md-nav">
//               {[{ href: '/', label: 'Home' }, { href: '/salons', label: 'Salons' }].map(({ href, label }) => (
//                 <Link
//                   key={href}
//                   href={href}
//                   style={{
//                     padding: '7px 15px', borderRadius: 9,
//                     fontSize: '0.86rem', fontWeight: 500,
//                     color: '#555', textDecoration: 'none',
//                     transition: 'all 0.15s ease',
//                   }}
//                   onMouseEnter={e => { e.currentTarget.style.background = 'rgba(217,140,95,0.09)'; e.currentTarget.style.color = '#D98C5F'; }}
//                   onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#555'; }}
//                 >
//                   {label}
//                 </Link>
//               ))}
//             </div>

//             {/* ── Right Actions ── */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>

//               {/* List Your Business */}
//               <Link
//                 href="/contact"
//                 className="hide-mobile"
//                 style={{
//                   display: 'flex', alignItems: 'center', gap: 6,
//                   padding: '8px 17px', borderRadius: 50,
//                   fontSize: '0.8rem', fontWeight: 600,
//                   background: 'linear-gradient(135deg, #D98C5F 0%, #c0703f 100%)',
//                   color: '#fff', textDecoration: 'none',
//                   boxShadow: '0 3px 12px rgba(217,140,95,0.32)',
//                   transition: 'all 0.18s ease',
//                   whiteSpace: 'nowrap',
//                 }}
//                 onMouseEnter={e => {
//                   e.currentTarget.style.transform = 'translateY(-1px)';
//                   e.currentTarget.style.boxShadow = '0 6px 20px rgba(217,140,95,0.45)';
//                 }}
//                 onMouseLeave={e => {
//                   e.currentTarget.style.transform = 'translateY(0)';
//                   e.currentTarget.style.boxShadow = '0 3px 12px rgba(217,140,95,0.32)';
//                 }}
//               >
//                 <span className="material-symbols-outlined" style={{ fontSize: 15 }}>add_business</span>
//                 List Your Business
//               </Link>

//               {/* Auth */}
//               {!loading && (
//                 user ? (
//                   <div style={{ position: 'relative' }} data-profile-menu>
//                     <button
//                       onClick={() => setIsProfileOpen(!isProfileOpen)}
//                       style={{
//                         width: 37, height: 37, borderRadius: '50%',
//                         background: isProfileOpen ? 'linear-gradient(135deg, #D98C5F, #c0703f)' : 'rgba(217,140,95,0.11)',
//                         border: '1.5px solid rgba(217,140,95,0.28)',
//                         color: isProfileOpen ? '#fff' : '#D98C5F',
//                         display: 'flex', alignItems: 'center', justifyContent: 'center',
//                         cursor: 'pointer', transition: 'all 0.18s ease',
//                       }}
//                     >
//                       <span className="material-symbols-outlined" style={{ fontSize: 19 }}>person</span>
//                     </button>

//                     {isProfileOpen && (
//                       <div style={{
//                         position: 'absolute', right: 0, top: 'calc(100% + 10px)',
//                         width: 176, background: '#fff',
//                         borderRadius: 16, padding: '6px',
//                         boxShadow: '0 8px 40px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.06)',
//                         border: '1px solid rgba(0,0,0,0.06)',
//                         animation: 'fadeSlideDown 0.18s ease-out',
//                       }}>
//                         {[
//                           { href: '/profile', label: 'My Profile', icon: 'account_circle', onClick: () => setIsProfileOpen(false) },
//                         ].map(({ href, label, icon, onClick }) => (
//                           <Link key={href} href={href} onClick={onClick} style={{
//                             display: 'flex', alignItems: 'center', gap: 9,
//                             padding: '10px 11px', borderRadius: 10,
//                             fontSize: '0.84rem', fontWeight: 500, color: '#444',
//                             textDecoration: 'none', transition: 'all 0.14s',
//                           }}
//                             onMouseEnter={e => { e.currentTarget.style.background = 'rgba(217,140,95,0.08)'; e.currentTarget.style.color = '#D98C5F'; }}
//                             onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#444'; }}
//                           >
//                             <span className="material-symbols-outlined" style={{ fontSize: 17, color: '#D98C5F' }}>{icon}</span>
//                             {label}
//                           </Link>
//                         ))}
//                         <div style={{ height: 1, background: 'rgba(0,0,0,0.05)', margin: '3px 8px' }} />
//                         <button onClick={handleLogout} style={{
//                           width: '100%', display: 'flex', alignItems: 'center', gap: 9,
//                           padding: '10px 11px', borderRadius: 10,
//                           fontSize: '0.84rem', fontWeight: 500, color: '#444',
//                           background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
//                           transition: 'all 0.14s',
//                         }}
//                           onMouseEnter={e => { e.currentTarget.style.background = 'rgba(217,140,95,0.08)'; e.currentTarget.style.color = '#D98C5F'; }}
//                           onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#444'; }}
//                         >
//                           <span className="material-symbols-outlined" style={{ fontSize: 17, color: '#D98C5F' }}>logout</span>
//                           Logout
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <Link href="/login" style={{
//                     padding: '8px 18px', borderRadius: 50,
//                     fontSize: '0.8rem', fontWeight: 600,
//                     color: '#D98C5F', border: '1.5px solid rgba(217,140,95,0.38)',
//                     textDecoration: 'none', transition: 'all 0.18s ease',
//                     background: 'transparent',
//                   }}
//                     onMouseEnter={e => {
//                       e.currentTarget.style.background = 'linear-gradient(135deg, #D98C5F, #c0703f)';
//                       e.currentTarget.style.color = '#fff';
//                       e.currentTarget.style.borderColor = 'transparent';
//                       e.currentTarget.style.boxShadow = '0 4px 14px rgba(217,140,95,0.35)';
//                     }}
//                     onMouseLeave={e => {
//                       e.currentTarget.style.background = 'transparent';
//                       e.currentTarget.style.color = '#D98C5F';
//                       e.currentTarget.style.borderColor = 'rgba(217,140,95,0.38)';
//                       e.currentTarget.style.boxShadow = 'none';
//                     }}
//                   >
//                     Login
//                   </Link>
//                 )
//               )}

//               {/* Hamburger */}
//               <button
//                 className="hamburger-btn"
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 style={{
//                   width: 37, height: 37, borderRadius: 10,
//                   background: 'rgba(0,0,0,0.05)',
//                   border: 'none', cursor: 'pointer',
//                   display: 'none', alignItems: 'center', justifyContent: 'center',
//                   color: '#555', transition: 'all 0.18s',
//                 }}
//               >
//                 <span className="material-symbols-outlined" style={{ fontSize: 21 }}>
//                   {isMenuOpen ? 'close' : 'menu'}
//                 </span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* ── Mobile Menu ── */}
//         {isMenuOpen && (
//           <div style={{
//             margin: '8px 24px 0',
//             borderRadius: 16,
//             background: 'rgba(255,255,255,0.98)',
//             backdropFilter: 'blur(20px)',
//             WebkitBackdropFilter: 'blur(20px)',
//             boxShadow: '0 8px 40px rgba(0,0,0,0.13)',
//             padding: '8px',
//             animation: 'mobileMenuIn 0.2s ease-out',
//           }}>
//             {[
//               { href: '/', label: 'Home', icon: 'home' },
//               { href: '/salons', label: 'Salons', icon: 'storefront' },
//               { href: '/contact', label: 'List Your Business', icon: 'add_business' },
//             ].map(({ href, label, icon }) => (
//               <Link key={href} href={href} onClick={() => setIsMenuOpen(false)}
//                 style={{
//                   display: 'flex', alignItems: 'center', gap: 11,
//                   padding: '12px 13px', borderRadius: 11,
//                   color: '#444', fontWeight: 500, fontSize: '0.9rem',
//                   textDecoration: 'none', transition: 'all 0.14s',
//                 }}
//                 onMouseEnter={e => { e.currentTarget.style.background = 'rgba(217,140,95,0.08)'; e.currentTarget.style.color = '#D98C5F'; }}
//                 onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#444'; }}
//               >
//                 <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#D98C5F' }}>{icon}</span>
//                 {label}
//               </Link>
//             ))}
//             {!loading && !user && (
//               <Link href="/login" onClick={() => setIsMenuOpen(false)} style={{
//                 display: 'block', textAlign: 'center',
//                 margin: '6px 4px 4px', padding: '13px',
//                 borderRadius: 12,
//                 background: 'linear-gradient(135deg, #D98C5F 0%, #c0703f 100%)',
//                 color: '#fff', fontWeight: 600, fontSize: '0.9rem',
//                 textDecoration: 'none',
//                 boxShadow: '0 4px 16px rgba(217,140,95,0.35)',
//               }}>
//                 Login
//               </Link>
//             )}
//           </div>
//         )}

//         {/* Responsive styles via style tag since Tailwind doesn't cover inline styles */}
//         <style>{`
//           @media (min-width: 768px) {
//             .md-nav { display: flex !important; }
//             .hamburger-btn { display: none !important; }
//             .hide-mobile { display: flex !important; }
//           }
//           @media (max-width: 767px) {
//             .md-nav { display: none !important; }
//             .hamburger-btn { display: flex !important; }
//             .hide-mobile { display: none !important; }
//           }
//         `}</style>
//       </nav>
//     </>
//   );
// }