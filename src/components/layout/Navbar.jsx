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