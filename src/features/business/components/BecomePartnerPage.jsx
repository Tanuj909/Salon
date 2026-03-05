// "use client";

// import React, { useState, useEffect } from "react";
// import { useAuth } from "@/features/auth/hooks/useAuth";
// import { useRouter } from "next/navigation";
// import { useRegisterBusiness } from "../hooks/useRegisterBusiness";
// import dynamic from "next/dynamic";
// import {
//   MapPin,
//   Phone,
//   Mail,
//   Globe,
//   Briefcase,
//   Navigation,
//   CheckCircle2,
//   AlertCircle,
//   Loader2,
//   Map as MapIcon,
// } from "lucide-react";

// const MapPickerModal = dynamic(() => import("@/features/salons/components/MapPickerModal"), {
//   ssr: false,
//   loading: () => null,
// });

// export default function BecomePartnerPage() {
//   const { user, loading: authLoading } = useAuth();
//   const router = useRouter();
//   const { submitBusiness, loading, error, success } =
//     useRegisterBusiness();

//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     registrationNumber: "",
//     phoneNumber: "",
//     email: "",
//     address: "",
//     city: "",
//     state: "",
//     postalCode: "",
//     country: "",
//     latitude: "",
//     longitude: "",
//     metaDescription: "",
//     metaKeywords: "",
//     categoryIds: [],
//   });

//   const [locationLoading, setLocationLoading] = useState(false);
//   const [locationError, setLocationError] = useState(null);
//   const [manualLocation, setManualLocation] = useState(false);
//   const [isMapOpen, setIsMapOpen] = useState(false);

//   // 🔐 Auth Guard
//   useEffect(() => {
//     if (!authLoading && !user) {
//       router.push("/login?redirect=/become-partner");
//     }
//   }, [user, authLoading, router]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleCategoryToggle = (id) => {
//     setForm((prev) => ({
//       ...prev,
//       categoryIds: prev.categoryIds.includes(id)
//         ? prev.categoryIds.filter((c) => c !== id)
//         : [...prev.categoryIds, id],
//     }));
//   };

//   // 📍 Handle Map Selection
//   const handleMapSelect = (data) => {
//     setForm((prev) => ({
//       ...prev,
//       latitude: data.lat,
//       longitude: data.lng,
//       address: data.address || prev.address,
//     }));
//     setIsMapOpen(false);
//   };

//   // 📍 Get User Location (Shortcut)
//   const handleGetLocation = () => {
//     if (!navigator.geolocation) {
//       setLocationError("Geolocation not supported.");
//       return;
//     }

//     setLocationLoading(true);
//     setLocationError(null);

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setForm((prev) => ({
//           ...prev,
//           latitude: position.coords.latitude.toString(),
//           longitude: position.coords.longitude.toString()
//         }));
//         setLocationLoading(false);
//       },
//       () => {
//         setLocationError("Location permission denied.");
//         setLocationLoading(false);
//       }
//     );
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!form.latitude || !form.longitude) {
//       setLocationError("Please provide location before submitting.");
//       return;
//     }

//     submitBusiness({
//       ...form,
//       latitude: parseFloat(form.latitude),
//       longitude: parseFloat(form.longitude),
//       categoryIds: form.categoryIds.length > 0
//         ? form.categoryIds.map(id => Number(id))
//         : [1],
//     });
//   };

//   if (authLoading) {
//     return (
//       <div className="min-h-screen bg-[#f9f5f2] flex items-center justify-center">
//         <Loader2 className="w-12 h-12 text-[#7a2860] animate-spin" />
//       </div>
//     );
//   }

//   if (!user) return null;

//   return (
//     <div className="min-h-screen pt-32 pb-24 font-[Jost,sans-serif]">
//       <style jsx global>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Jost:wght@300;400;500;600&display=swap');
//       `}</style>

//       <div className="max-w-[1200px] mx-auto px-6">
//         <div className="relative overflow-hidden rounded-[2rem] bg-white border border-[#C8A951]/20 shadow-[0_20px_50px_-20px_rgba(200,169,81,0.15)]">
//           {/* Decorative Background Elements */}
//           {success ? (
//             <div className="py-20 px-10 text-center relative z-10">
//               <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-100">
//                 <CheckCircle2 size={40} className="text-primary" />
//               </div>

//               <div className="flex flex-col items-center">
//                 <h2 className="font-[Cormorant_Garamond] text-4xl text-[#1C1C1C] mb-5">
//                   Application <em className="italic text-[#C8A951]">Received</em>
//                 </h2>
//                 <p className="text-[#7a7065] text-lg max-w-md mx-auto mb-10 font-light">
//                   Thank you for choosing Luxe. Our curation team will review your business details and get back to you within 48 hours.
//                 </p>
//               </div>
//               <button
//                 onClick={() => router.push("/")}
//                 className="px-10 py-4 bg-[#1C1C1C] text-[#C8A951] rounded-lg text-sm font-medium tracking-widest uppercase hover:bg-[#2a2a2a] transition-all shadow-lg mt-5"
//               >
//                 Return Home
//               </button>
//             </div>
//           ) : (
//             <div className="relative z-10 flex flex-col md:flex-row">
//               {/* Sidebar Info */}
//               <div className="md:w-1/3 p-10 bg-[#FDFAF6] border-b md:border-b-0 md:border-r border-[#C8A951]/10">
//                 <span className="block text-[10px] tracking-[0.4em] uppercase text-[#C8A951] font-semibold mb-6">Partnership</span>
//                 <h2 className="font-[Cormorant_Garamond] text-4xl text-[#1C1C1C] leading-tight mb-6">
//                   Grow Your <em className="italic text-[#C8A951]">Business</em> With Luxe
//                 </h2>
//                 <p className="text-[#7a7065] text-sm leading-relaxed font-light mb-10 opacity-80">
//                   Join an exclusive community of premium salons. Elevate your brand, reach more clients, and manage your bookings with ease.
//                 </p>

//                 <div className="space-y-6">
//                   <div className="flex items-center gap-4">
//                     <div className="w-10 h-10 rounded-full bg-white border border-[#C8A951]/20 flex items-center justify-center">
//                       <CheckCircle2 size={18} className="text-[#C8A951]" />
//                     </div>
//                     <span className="text-xs font-medium text-[#1C1C1C] tracking-wide">Premium Visibility</span>
//                   </div>
//                   <div className="flex items-center gap-4">
//                     <div className="w-10 h-10 rounded-full bg-white border border-[#C8A951]/20 flex items-center justify-center">
//                       <Briefcase size={18} className="text-[#C8A951]" />
//                     </div>
//                     <span className="text-xs font-medium text-[#1C1C1C] tracking-wide">Smart Dashboard</span>
//                   </div>
//                   <div className="flex items-center gap-4">
//                     <div className="w-10 h-10 rounded-full bg-white border border-[#C8A951]/20 flex items-center justify-center">
//                       <Navigation size={18} className="text-[#C8A951]" />
//                     </div>
//                     <span className="text-xs font-medium text-[#1C1C1C] tracking-wide">Simple Management</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Form Area */}
//               <div className="md:w-2/3 p-10">
//                 {error && (
//                   <div className="mb-8 p-4 bg-red-50 text-primary rounded-xl border border-red-100 flex gap-3 text-sm animate-fade-in">
//                     <AlertCircle size={18} />
//                     {error}
//                   </div>
//                 )}

//                 <form onSubmit={handleSubmit} className="space-y-8">
//                   {/* Basic Information */}
//                   <div className="space-y-6">
//                     <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C8A951]">Business Profile</h3>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div className="space-y-2">
//                         <label className="text-[10px] uppercase tracking-wider text-[#9e9287] font-semibold ml-1">Salon Name</label>
//                         <input
//                           name="name"
//                           placeholder="e.g. Royal Grace Studio"
//                           value={form.name}
//                           onChange={handleChange}
//                           required
//                           className="w-full h-12 px-5 rounded-lg bg-[#F7F3EE]/50 border border-[#C8A951]/10 focus:bg-white focus:border-[#C8A951] focus:ring-4 focus:ring-[#C8A951]/5 transition-all outline-none font-medium text-[#1C1C1C]"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <label className="text-[10px] uppercase tracking-wider text-[#9e9287] font-semibold ml-1">Registration No.</label>
//                         <input
//                           name="registrationNumber"
//                           placeholder="Trade License / Tax ID"
//                           value={form.registrationNumber}
//                           onChange={handleChange}
//                           required
//                           className="w-full h-12 px-5 rounded-lg bg-[#F7F3EE]/50 border border-[#C8A951]/10 focus:bg-white focus:border-[#C8A951] focus:ring-4 focus:ring-[#C8A951]/5 transition-all outline-none font-medium text-[#1C1C1C]"
//                         />
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <label className="text-[10px] uppercase tracking-wider text-[#9e9287] font-semibold ml-1">About the Business</label>
//                       <textarea
//                         name="description"
//                         placeholder="Tell us about your salon's philosophy and specialties..."
//                         value={form.description}
//                         onChange={handleChange}
//                         required
//                         rows="3"
//                         className="w-full p-5 rounded-xl bg-[#F7F3EE]/50 border border-[#C8A951]/10 focus:bg-white focus:border-[#C8A951] focus:ring-4 focus:ring-[#C8A951]/5 transition-all outline-none font-medium text-[#1C1C1C] resize-none"
//                       />
//                     </div>
//                   </div>

//                   {/* Contact Information */}
//                   <div className="space-y-6 pt-4">
//                     <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C8A951]">Contact Details</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div className="space-y-2">
//                         <label className="text-[10px] uppercase tracking-wider text-[#9e9287] font-semibold ml-1">Business Email</label>
//                         <div className="relative">
//                           <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C8A951]/50" />
//                           <input
//                             type="email"
//                             name="email"
//                             placeholder="contact@salon.com"
//                             value={form.email}
//                             onChange={handleChange}
//                             required
//                             className="w-full h-12 pl-12 pr-5 rounded-lg bg-[#F7F3EE]/50 border border-[#C8A951]/10 focus:bg-white focus:border-[#C8A951] transition-all outline-none font-medium text-[#1C1C1C]"
//                           />
//                         </div>
//                       </div>
//                       <div className="space-y-2">
//                         <label className="text-[10px] uppercase tracking-wider text-[#9e9287] font-semibold ml-1">Phone Number</label>
//                         <div className="relative">
//                           <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C8A951]/50" />
//                           <input
//                             name="phoneNumber"
//                             placeholder="+971 -- --- ----"
//                             value={form.phoneNumber}
//                             onChange={handleChange}
//                             required
//                             className="w-full h-12 pl-12 pr-5 rounded-lg bg-[#F7F3EE]/50 border border-[#C8A951]/10 focus:bg-white focus:border-[#C8A951] transition-all outline-none font-medium text-[#1C1C1C]"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Location Information */}
//                   <div className="space-y-6 pt-4">
//                     <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C8A951]">Location</h3>
//                     <div className="space-y-4">
//                       <div className="space-y-2">
//                         <label className="text-[10px] uppercase tracking-wider text-[#9e9287] font-semibold ml-1">Street Address</label>
//                         <div className="relative">
//                           <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C8A951]/50" />
//                           <input
//                             name="address"
//                             placeholder="Unit, Floor, Building Name"
//                             value={form.address}
//                             onChange={handleChange}
//                             required
//                             className="w-full h-12 pl-12 pr-5 rounded-lg bg-[#F7F3EE]/50 border border-[#C8A951]/10 focus:bg-white focus:border-[#C8A951] transition-all outline-none font-medium text-[#1C1C1C]"
//                           />
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                         <div className="space-y-1.5">
//                           <label className="text-[9px] uppercase tracking-widest text-[#9e9287] font-bold ml-1">City</label>
//                           <input name="city" placeholder="City" value={form.city} onChange={handleChange} required className="w-full h-11 px-4 rounded-lg bg-[#F7F3EE]/50 border border-[#C8A951]/10 outline-none font-medium text-xs focus:bg-white" />
//                         </div>
//                         <div className="space-y-1.5">
//                           <label className="text-[9px] uppercase tracking-widest text-[#9e9287] font-bold ml-1">State</label>
//                           <input name="state" placeholder="State" value={form.state} onChange={handleChange} required className="w-full h-11 px-4 rounded-lg bg-[#F7F3EE]/50 border border-[#C8A951]/10 outline-none font-medium text-xs focus:bg-white" />
//                         </div>
//                         <div className="space-y-1.5">
//                           <label className="text-[9px] uppercase tracking-widest text-[#9e9287] font-bold ml-1">Postal</label>
//                           <input name="postalCode" placeholder="00000" value={form.postalCode} onChange={handleChange} required className="w-full h-11 px-4 rounded-lg bg-[#F7F3EE]/50 border border-[#C8A951]/10 outline-none font-medium text-xs focus:bg-white" />
//                         </div>
//                         <div className="space-y-1.5">
//                           <label className="text-[9px] uppercase tracking-widest text-[#9e9287] font-bold ml-1">Country</label>
//                           <input name="country" placeholder="Country" value={form.country} onChange={handleChange} required className="w-full h-11 px-4 rounded-lg bg-[#F7F3EE]/50 border border-[#C8A951]/10 outline-none font-medium text-xs focus:bg-white" />
//                         </div>
//                       </div>

//                       <div className="flex flex-wrap gap-3 py-2">
//                         <button
//                           type="button"
//                           onClick={handleGetLocation}
//                           className="px-5 py-2.5 bg-white border border-[#C8A951]/30 text-[#C8A951] rounded-lg flex items-center gap-2 text-xs font-semibold hover:bg-[#C8A951] hover:text-white transition-all shadow-sm"
//                         >
//                           {locationLoading ? <Loader2 size={14} className="animate-spin" /> : <Navigation size={14} />}
//                           {locationLoading ? "Detecting..." : "Current Location"}
//                         </button>

//                         <button
//                           type="button"
//                           onClick={() => setIsMapOpen(true)}
//                           className="px-5 py-2.5 bg-white border border-[#C8A951]/30 text-[#C8A951] rounded-lg flex items-center gap-2 text-xs font-semibold hover:bg-[#C8A951] hover:text-white transition-all shadow-sm"
//                         >
//                           <MapIcon size={14} />
//                           Pick from Map
//                         </button>
//                       </div>

//                       {(form.latitude || form.longitude) && (
//                         <div className="p-4 rounded-lg bg-[#FDFAF6] border border-[#C8A951]/10 flex items-center justify-between">
//                           <div className="flex gap-4">
//                             <div>
//                               <span className="text-[9px] uppercase text-[#9e9287] font-bold block">Lat</span>
//                               <span className="text-xs font-medium text-[#1C1C1C]">{parseFloat(form.latitude).toFixed(4)}</span>
//                             </div>
//                             <div>
//                               <span className="text-[9px] uppercase text-[#9e9287] font-bold block">Lng</span>
//                               <span className="text-xs font-medium text-[#1C1C1C]">{parseFloat(form.longitude).toFixed(4)}</span>
//                             </div>
//                           </div>
//                           <CheckCircle2 size={16} className="text-primary" />
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Primary Services */}
//                   <div className="space-y-4 pt-4">
//                     <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C8A951]">Specialties</h3>
//                     <div className="flex flex-wrap gap-2">
//                       {[
//                         { id: 1, name: "Hair Styling" },
//                         { id: 2, name: "Skincare" },
//                         { id: 3, name: "Grooming" },
//                         { id: 4, name: "Spa" },
//                         { id: 5, name: "Nail Art" }
//                       ].map(cat => (
//                         <button
//                           key={cat.id}
//                           type="button"
//                           onClick={() => handleCategoryToggle(cat.id)}
//                           className={`px-5 py-2 rounded-lg text-xs font-medium tracking-wide transition-all border ${form.categoryIds.includes(cat.id) ? "bg-[#C8A951] text-[#1C1C1C] border-[#C8A951] shadow-md shadow-[#C8A951]/20" : "bg-white text-[#7a7065] border-[#C8A951]/10 hover:border-[#C8A951]"}`}
//                         >
//                           {cat.name}
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="group relative w-full h-14 bg-[#1C1C1C] text-[#C8A951] rounded-lg font-bold overflow-hidden transition-all hover:shadow-2xl active:scale-[0.98] disabled:opacity-70 mt-8"
//                   >
//                     <div className="absolute inset-0 bg-[#2a2a2a] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
//                     <div className="relative z-10 flex items-center justify-center gap-3">
//                       {loading ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle2 size={18} />}
//                       <span className="text-sm tracking-widest uppercase">
//                         {loading ? "Submitting..." : "Send Application"}
//                       </span>
//                     </div>
//                   </button>
//                 </form>
//               </div>
//             </div>
//           )}
//         </div>

//         <p className="mt-8 text-center text-[#7a7065] text-xs font-light tracking-wide opacity-60">
//           By submitting, you agree to Luxe's Partner Terms of Service and Privacy Policy.
//         </p>
//       </div>

//       <MapPickerModal
//         isOpen={isMapOpen}
//         onClose={() => setIsMapOpen(false)}
//         onSelect={handleMapSelect}
//         initialPos={form.latitude && form.longitude ? { lat: parseFloat(form.latitude), lng: parseFloat(form.longitude) } : null}
//       />
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useRegisterBusiness } from "../hooks/useRegisterBusiness";
import dynamic from "next/dynamic";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Briefcase,
  Navigation,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Map as MapIcon,
} from "lucide-react";

const MapPickerModal = dynamic(() => import("@/features/salons/components/MapPickerModal"), {
  ssr: false,
  loading: () => null,
});

export default function BecomePartnerPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { submitBusiness, loading, error, success } =
    useRegisterBusiness();

  const [form, setForm] = useState({
    name: "",
    description: "",
    registrationNumber: "",
    phoneNumber: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    latitude: "",
    longitude: "",
    metaDescription: "",
    metaKeywords: "",
    categoryIds: [],
  });

  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [manualLocation, setManualLocation] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  // 🔐 Auth Guard
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/become-partner");
    }
  }, [user, authLoading, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryToggle = (id) => {
    setForm((prev) => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(id)
        ? prev.categoryIds.filter((c) =>c !== id)
        : [...prev.categoryIds, id],
    }));
  };

  // 📍 Handle Map Selection
  const handleMapSelect = (data) => {
    setForm((prev) => ({
      ...prev,
      latitude: data.lat,
      longitude: data.lng,
      address: data.address || prev.address,
    }));
    setIsMapOpen(false);
  };

  // 📍 Get User Location (Shortcut)
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation not supported.");
      return;
    }

    setLocationLoading(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setForm((prev) => ({
          ...prev,
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString()
        }));
        setLocationLoading(false);
      },
      () => {
        setLocationError("Location permission denied.");
        setLocationLoading(false);
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.latitude || !form.longitude) {
      setLocationError("Please provide location before submitting.");
      return;
    }

    submitBusiness({
      ...form,
      latitude: parseFloat(form.latitude),
      longitude: parseFloat(form.longitude),
      categoryIds: form.categoryIds.length > 0
        ? form.categoryIds.map(id => Number(id))
        : [1],
    });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#f5f0eb] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#7a2860] animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen pt-32 pb-24 font-[Jost,sans-serif] bg-[#f5f0eb]">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Jost:wght@300;400;500;600&display=swap');
      `}</style>

      <div className="max-w-[1200px] mx-auto px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.15)]">
          {/* Decorative Background Elements */}
          {success ? (
            <div className="py-20 px-10 text-center relative z-10">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-100">
                <CheckCircle2 size={40} className="text-green-600" />
              </div>

              <div className="flex flex-col items-center">
                <h2 className="font-[Cormorant_Garamond] text-4xl text-[#1C1C1C] mb-5">
                  Application <em className="italic text-[#C8A951]">Received</em>
                </h2>
                <p className="text-[#5a4e43] text-lg max-w-md mx-auto mb-10 font-light">
                  Thank you for choosing Luxe. Our curation team will review your business details and get back to you within 48 hours.
                </p>
              </div>
              <button
                onClick={() => router.push("/")}
                className="px-10 py-4 bg-[#1C1C1C] text-[#C8A951] rounded-lg text-sm font-medium tracking-widest uppercase hover:bg-[#2a2a2a] transition-all shadow-lg mt-5"
              >
                Return Home
              </button>
            </div>
          ) : (
            <div className="relative z-10 flex flex-col md:flex-row">
              {/* Sidebar Info - Darker background for contrast */}
              <div className="md:w-1/3 p-10 bg-[#1C1C1C] border-b md:border-b-0 md:border-r border-[#C8A951]/20">
                <span className="block text-[10px] tracking-[0.4em] uppercase text-[#C8A951] font-semibold mb-6">Partnership</span>
                <h2 className="font-[Cormorant_Garamond] text-4xl text-white leading-tight mb-6">
                  Grow Your <em className="italic text-[#C8A951]">Business</em> With Luxe
                </h2>
                <p className="text-[#b5a99d] text-sm leading-relaxed font-light mb-10">
                  Join an exclusive community of premium salons. Elevate your brand, reach more clients, and manage your bookings with ease.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#2a2a2a] border border-[#C8A951]/30 flex items-center justify-center">
                      <CheckCircle2 size={18} className="text-[#C8A951]" />
                    </div>
                    <span className="text-xs font-medium text-[#e5e5e5] tracking-wide">Premium Visibility</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#2a2a2a] border border-[#C8A951]/30 flex items-center justify-center">
                      <Briefcase size={18} className="text-[#C8A951]" />
                    </div>
                    <span className="text-xs font-medium text-[#e5e5e5] tracking-wide">Smart Dashboard</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#2a2a2a] border border-[#C8A951]/30 flex items-center justify-center">
                      <Navigation size={18} className="text-[#C8A951]" />
                    </div>
                    <span className="text-xs font-medium text-[#e5e5e5] tracking-wide">Simple Management</span>
                  </div>
                </div>
              </div>

              {/* Form Area - Light background but with better contrast inputs */}
              <div className="md:w-2/3 p-10 bg-[#fafafa]">
                {error && (
                  <div className="mb-8 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 flex gap-3 text-sm animate-fade-in">
                    <AlertCircle size={18} />
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Basic Information */}
                  <div className="space-y-6">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C8A951]">Business Profile</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-wider text-[#6b5e52] font-semibold ml-1">Salon Name</label>
                        <input
                          name="name"
                          placeholder="e.g. Royal Grace Studio"
                          value={form.name}
                          onChange={handleChange}
                          required
                          className="w-full h-12 px-5 rounded-lg bg-white border border-[#d4c5b5] focus:border-[#C8A951] focus:ring-2 focus:ring-[#C8A951]/20 transition-all outline-none font-medium text-[#1C1C1C] placeholder:text-[#b5a99d]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-wider text-[#6b5e52] font-semibold ml-1">Registration No.</label>
                        <input
                          name="registrationNumber"
                          placeholder="Trade License / Tax ID"
                          value={form.registrationNumber}
                          onChange={handleChange}
                          required
                          className="w-full h-12 px-5 rounded-lg bg-white border border-[#d4c5b5] focus:border-[#C8A951] focus:ring-2 focus:ring-[#C8A951]/20 transition-all outline-none font-medium text-[#1C1C1C] placeholder:text-[#b5a99d]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-wider text-[#6b5e52] font-semibold ml-1">About the Business</label>
                      <textarea
                        name="description"
                        placeholder="Tell us about your salon's philosophy and specialties..."
                        value={form.description}
                        onChange={handleChange}
                        required
                        rows="3"
                        className="w-full p-5 rounded-xl bg-white border border-[#d4c5b5] focus:border-[#C8A951] focus:ring-2 focus:ring-[#C8A951]/20 transition-all outline-none font-medium text-[#1C1C1C] placeholder:text-[#b5a99d] resize-none"
                      />
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-6 pt-4">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C8A951]">Contact Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-wider text-[#6b5e52] font-semibold ml-1">Business Email</label>
                        <div className="relative">
                          <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C8A951]" />
                          <input
                            type="email"
                            name="email"
                            placeholder="contact@salon.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full h-12 pl-12 pr-5 rounded-lg bg-white border border-[#d4c5b5] focus:border-[#C8A951] focus:ring-2 focus:ring-[#C8A951]/20 transition-all outline-none font-medium text-[#1C1C1C] placeholder:text-[#b5a99d]"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-wider text-[#6b5e52] font-semibold ml-1">Phone Number</label>
                        <div className="relative">
                          <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C8A951]" />
                          <input
                            name="phoneNumber"
                            placeholder="+971 -- --- ----"
                            value={form.phoneNumber}
                            onChange={handleChange}
                            required
                            className="w-full h-12 pl-12 pr-5 rounded-lg bg-white border border-[#d4c5b5] focus:border-[#C8A951] focus:ring-2 focus:ring-[#C8A951]/20 transition-all outline-none font-medium text-[#1C1C1C] placeholder:text-[#b5a99d]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Location Information */}
                  <div className="space-y-6 pt-4">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C8A951]">Location</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-wider text-[#6b5e52] font-semibold ml-1">Street Address</label>
                        <div className="relative">
                          <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C8A951]" />
                          <input
                            name="address"
                            placeholder="Unit, Floor, Building Name"
                            value={form.address}
                            onChange={handleChange}
                            required
                            className="w-full h-12 pl-12 pr-5 rounded-lg bg-white border border-[#d4c5b5] focus:border-[#C8A951] focus:ring-2 focus:ring-[#C8A951]/20 transition-all outline-none font-medium text-[#1C1C1C] placeholder:text-[#b5a99d]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[9px] uppercase tracking-widest text-[#6b5e52] font-bold ml-1">City</label>
                          <input name="city" placeholder="City" value={form.city} onChange={handleChange} required className="w-full h-11 px-4 rounded-lg bg-white border border-[#d4c5b5] outline-none font-medium text-xs focus:border-[#C8A951] focus:ring-2 focus:ring-[#C8A951]/20 placeholder:text-[#b5a99d]" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[9px] uppercase tracking-widest text-[#6b5e52] font-bold ml-1">State</label>
                          <input name="state" placeholder="State" value={form.state} onChange={handleChange} required className="w-full h-11 px-4 rounded-lg bg-white border border-[#d4c5b5] outline-none font-medium text-xs focus:border-[#C8A951] focus:ring-2 focus:ring-[#C8A951]/20 placeholder:text-[#b5a99d]" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[9px] uppercase tracking-widest text-[#6b5e52] font-bold ml-1">Postal</label>
                          <input name="postalCode" placeholder="00000" value={form.postalCode} onChange={handleChange} required className="w-full h-11 px-4 rounded-lg bg-white border border-[#d4c5b5] outline-none font-medium text-xs focus:border-[#C8A951] focus:ring-2 focus:ring-[#C8A951]/20 placeholder:text-[#b5a99d]" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[9px] uppercase tracking-widest text-[#6b5e52] font-bold ml-1">Country</label>
                          <input name="country" placeholder="Country" value={form.country} onChange={handleChange} required className="w-full h-11 px-4 rounded-lg bg-white border border-[#d4c5b5] outline-none font-medium text-xs focus:border-[#C8A951] focus:ring-2 focus:ring-[#C8A951]/20 placeholder:text-[#b5a99d]" />
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 py-2">
                        <button
                          type="button"
                          onClick={handleGetLocation}
                          className="px-5 py-2.5 bg-white border border-[#C8A951] text-[#C8A951] rounded-lg flex items-center gap-2 text-xs font-semibold hover:bg-[#C8A951] hover:text-[#1C1C1C] transition-all shadow-sm"
                        >
                          {locationLoading ? <Loader2 size={14} className="animate-spin" /> : <Navigation size={14} />}
                          {locationLoading ? "Detecting..." : "Current Location"}
                        </button>

                        <button
                          type="button"
                          onClick={() => setIsMapOpen(true)}
                          className="px-5 py-2.5 bg-white border border-[#C8A951] text-[#C8A951] rounded-lg flex items-center gap-2 text-xs font-semibold hover:bg-[#C8A951] hover:text-[#1C1C1C] transition-all shadow-sm"
                        >
                          <MapIcon size={14} />
                          Pick from Map
                        </button>
                      </div>

                      {(form.latitude || form.longitude) && (
                        <div className="p-4 rounded-lg bg-[#f5f0eb] border border-[#C8A951]/30 flex items-center justify-between">
                          <div className="flex gap-4">
                            <div>
                              <span className="text-[9px] uppercase text-[#6b5e52] font-bold block">Lat</span>
                              <span className="text-xs font-medium text-[#1C1C1C]">{parseFloat(form.latitude).toFixed(4)}</span>
                            </div>
                            <div>
                              <span className="text-[9px] uppercase text-[#6b5e52] font-bold block">Lng</span>
                              <span className="text-xs font-medium text-[#1C1C1C]">{parseFloat(form.longitude).toFixed(4)}</span>
                            </div>
                          </div>
                          <CheckCircle2 size={16} className="text-green-600" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Primary Services */}
                  <div className="space-y-4 pt-4">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C8A951]">Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { id: 1, name: "Hair Styling" },
                        { id: 2, name: "Skincare" },
                        { id: 3, name: "Grooming" },
                        { id: 4, name: "Spa" },
                        { id: 5, name: "Nail Art" }
                      ].map(cat => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => handleCategoryToggle(cat.id)}
                          className={`px-5 py-2 rounded-lg text-xs font-medium tracking-wide transition-all border ${
                            form.categoryIds.includes(cat.id) 
                              ? "bg-[#C8A951] text-[#1C1C1C] border-[#C8A951] shadow-md" 
                              : "bg-white text-[#5a4e43] border-[#d4c5b5] hover:border-[#C8A951]"
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full h-14 bg-[#1C1C1C] text-[#C8A951] rounded-lg font-bold overflow-hidden transition-all hover:shadow-2xl active:scale-[0.98] disabled:opacity-70 mt-8"
                  >
                    <div className="absolute inset-0 bg-[#2a2a2a] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <div className="relative z-10 flex items-center justify-center gap-3">
                      {loading ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle2 size={18} />}
                      <span className="text-sm tracking-widest uppercase">
                        {loading ? "Submitting..." : "Send Application"}
                      </span>
                    </div>
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>

        <p className="mt-8 text-center text-[#6b5e52] text-xs font-light tracking-wide">
          By submitting, you agree to Luxe's Partner Terms of Service and Privacy Policy.
        </p>
      </div>

      <MapPickerModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        onSelect={handleMapSelect}
        initialPos={form.latitude && form.longitude ? { lat: parseFloat(form.latitude), lng: parseFloat(form.longitude) } : null}
      />
    </div>
  );
}