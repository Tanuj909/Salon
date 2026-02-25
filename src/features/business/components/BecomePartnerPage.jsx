"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useRegisterBusiness } from "../hooks/useRegisterBusiness";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Building2, 
  Globe, 
  Briefcase, 
  Navigation,
  CheckCircle2,
  AlertCircle,
  Loader2
} from "lucide-react";

export default function BecomePartnerPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { submitBusiness, loading, error, success } = useRegisterBusiness();

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

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/contact");
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
    setForm(prev => ({
        ...prev,
        categoryIds: prev.categoryIds.includes(id) 
            ? prev.categoryIds.filter(c => c !== id)
            : [...prev.categoryIds, id]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitBusiness({
      ...form,
      latitude: Number(form.latitude),
      longitude: Number(form.longitude),
      categoryIds: form.categoryIds.length > 0 ? form.categoryIds : [1], // Default if none
    });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#f9f5f2] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#7a2860] animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#f9f5f2] pt-24 pb-20 font-[DM_Sans]">
      {/* Premium Header */}
      <div className="max-w-[1200px] mx-auto px-6 text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-bold text-[#1e0a18] font-[Cormorant_Garamond] mb-4">
          Become a <span className="italic text-[#7a2860]">Partner</span>
        </h1>
        <p className="text-lg text-[#3c143280] max-w-2xl mx-auto">
          Join our curated network of premium salons and reach thousands of beauty seekers.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-[#7a2860] to-[#3c1432] mx-auto rounded-full mt-8 opacity-40"></div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Left Column: Info & Values */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-[#3c143208]">
              <h2 className="text-3xl font-bold text-[#1e0a18] font-[Cormorant_Garamond] mb-6">Partner Perks</h2>
              <div className="space-y-6">
                {[
                  { icon: <Globe />, title: "Digital Presence", desc: "Get a premium digital storefront that showcases your craft." },
                  { icon: <Briefcase />, title: "Business Growth", desc: "Access pro tools to manage bookings and customer loyalty." },
                  { icon: <MapPin />, title: "Local Discovery", desc: "Appear first when customers search for salons in your area." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-[#7a2860]/5 text-[#7a2860] flex items-center justify-center transition-colors group-hover:bg-[#7a2860] group-hover:text-white">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1e0a18]">{item.title}</h4>
                      <p className="text-sm text-[#3c143260] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-[#3c143208]">
                 <div className="w-10 h-10 rounded-xl bg-slate-50 text-[#7a2860] flex items-center justify-center"><Mail size={18} /></div>
                 <div>
                   <p className="text-[0.65rem] font-black uppercase tracking-widest text-[#3c143240]">Email Support</p>
                   <p className="font-bold text-[#1e0a18]">partners@salonhub.com</p>
                 </div>
              </div>
              <div className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-[#3c143208]">
                 <div className="w-10 h-10 rounded-xl bg-slate-50 text-[#7a2860] flex items-center justify-center"><Phone size={18} /></div>
                 <div>
                   <p className="text-[0.65rem] font-black uppercase tracking-widest text-[#3c143240]">Call Center</p>
                   <p className="font-bold text-[#1e0a18]">+971 800 SALON</p>
                 </div>
              </div>
            </div>
          </div>

          {/* Right Column: Registration Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-[#3c143208] relative overflow-hidden">
               {success ? (
                 <div className="py-20 text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h2 className="text-3xl font-bold text-[#1e0a18] mb-4">Application Received!</h2>
                    <p className="text-[#3c143260] mb-8">Thank you for applying. Our team will review your business details and get back to you within 48 hours.</p>
                    <button 
                      onClick={() => router.push('/')}
                      className="px-8 py-3 bg-[#1e0a18] text-white rounded-xl font-bold hover:bg-[#7a2860] transition-colors"
                    >
                      Return Home
                    </button>
                 </div>
               ) : (
                 <>
                   <div className="mb-10">
                    <h3 className="text-2xl font-bold text-[#1e0a18] mb-2">Business Application</h3>
                    <p className="text-sm text-[#3c143260]">Please provide accurate information about your enterprise.</p>
                   </div>

                   {error && (
                     <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex gap-3 text-red-600 text-sm font-medium">
                       <AlertCircle size={18} className="shrink-0" />
                       {error}
                     </div>
                   )}

                   <form onSubmit={handleSubmit} className="space-y-8">
                     
                     {/* Basic Info */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[0.65rem] font-black uppercase tracking-widest text-[#3c143240] ml-1">Salon Name</label>
                          <input
                            name="name"
                            placeholder="e.g. Royal Glow Salon"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full h-[55px] px-5 rounded-2xl bg-[#f9f5f2] border-transparent focus:bg-white focus:border-[#7a2860] focus:ring-4 focus:ring-[#7a2860]/5 transition-all outline-none font-medium text-[#1e0a18]"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[0.65rem] font-black uppercase tracking-widest text-[#3c143240] ml-1">Reg. Number</label>
                          <input
                            name="registrationNumber"
                            placeholder="Trade License #"
                            value={form.registrationNumber}
                            onChange={handleChange}
                            required
                            className="w-full h-[55px] px-5 rounded-2xl bg-[#f9f5f2] border-transparent focus:bg-white focus:border-[#7a2860] focus:ring-4 focus:ring-[#7a2860]/5 transition-all outline-none font-medium text-[#1e0a18]"
                          />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-[0.65rem] font-black uppercase tracking-widest text-[#3c143240] ml-1">Description</label>
                        <textarea
                          name="description"
                          placeholder="Tell us about your services, vibe, and expertise..."
                          value={form.description}
                          onChange={handleChange}
                          required
                          rows="3"
                          className="w-full p-5 rounded-2xl bg-[#f9f5f2] border-transparent focus:bg-white focus:border-[#7a2860] focus:ring-4 focus:ring-[#7a2860]/5 transition-all outline-none font-medium text-[#1e0a18] resize-none"
                        />
                     </div>

                     {/* Contact & Location */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[0.65rem] font-black uppercase tracking-widest text-[#3c143240] ml-1">Official Email</label>
                          <input
                            type="email"
                            name="email"
                            placeholder="salon@example.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full h-[55px] px-5 rounded-2xl bg-[#f9f5f2] border-transparent focus:bg-white focus:border-[#7a2860] focus:ring-4 focus:ring-[#7a2860]/5 transition-all outline-none font-medium text-[#1e0a18]"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[0.65rem] font-black uppercase tracking-widest text-[#3c143240] ml-1">Phone Number</label>
                          <input
                            name="phoneNumber"
                            placeholder="+971 50 XXXXXXX"
                            value={form.phoneNumber}
                            onChange={handleChange}
                            required
                            className="w-full h-[55px] px-5 rounded-2xl bg-[#f9f5f2] border-transparent focus:bg-white focus:border-[#7a2860] focus:ring-4 focus:ring-[#7a2860]/5 transition-all outline-none font-medium text-[#1e0a18]"
                          />
                        </div>
                     </div>

                     {/* Address Details */}
                     <div className="space-y-6 bg-slate-50/50 p-6 rounded-3xl border border-[#3c143208]">
                        <div className="space-y-2">
                          <label className="text-[0.65rem] font-black uppercase tracking-widest text-[#3c143240] ml-1">Physical Address</label>
                          <input
                            name="address"
                            placeholder="Street, Building, Unit#"
                            value={form.address}
                            onChange={handleChange}
                            required
                            className="w-full h-[55px] px-5 rounded-2xl bg-white border-transparent focus:border-[#7a2860] focus:ring-4 focus:ring-[#7a2860]/5 transition-all outline-none font-medium text-[#1e0a18] shadow-sm"
                          />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                           <div className="space-y-2">
                              <label className="text-[0.65rem] font-black uppercase tracking-widest text-[#3c143240] ml-1">City</label>
                              <input name="city" value={form.city} onChange={handleChange} required className="w-full h-[50px] px-4 rounded-xl bg-white border-transparent outline-none font-bold text-sm shadow-sm" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[0.65rem] font-black uppercase tracking-widest text-[#3c143240] ml-1">State</label>
                              <input name="state" value={form.state} onChange={handleChange} required className="w-full h-[50px] px-4 rounded-xl bg-white border-transparent outline-none font-bold text-sm shadow-sm" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[0.65rem] font-black uppercase tracking-widest text-[#3c143240] ml-1">Pincode</label>
                              <input name="postalCode" value={form.postalCode} onChange={handleChange} required className="w-full h-[50px] px-4 rounded-xl bg-white border-transparent outline-none font-bold text-sm shadow-sm" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[0.65rem] font-black uppercase tracking-widest text-[#3c143240] ml-1">Country</label>
                              <input name="country" value={form.country} onChange={handleChange} required className="w-full h-[50px] px-4 rounded-xl bg-white border-transparent outline-none font-bold text-sm shadow-sm" />
                           </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <label className="text-[0.65rem] font-black uppercase tracking-widest text-[#3c143240] ml-1">Latitude</label>
                              <input name="latitude" type="number" step="any" value={form.latitude} onChange={handleChange} required className="w-full h-[50px] px-4 rounded-xl bg-white border-transparent outline-none font-bold text-sm shadow-sm" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[0.65rem] font-black uppercase tracking-widest text-[#3c143240] ml-1">Longitude</label>
                              <input name="longitude" type="number" step="any" value={form.longitude} onChange={handleChange} required className="w-full h-[50px] px-4 rounded-xl bg-white border-transparent outline-none font-bold text-sm shadow-sm" />
                           </div>
                        </div>
                     </div>

                     {/* SEO Section (Optional but desired) */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[0.65rem] font-black uppercase tracking-widest text-[#3c143240] ml-1">SEO Title</label>
                          <input
                            name="metaDescription"
                            placeholder="Brief SEO summary"
                            value={form.metaDescription}
                            onChange={handleChange}
                            className="w-full h-[55px] px-5 rounded-2xl bg-[#f9f5f2] transition-all outline-none font-medium text-[#1e0a18]"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[0.65rem] font-black uppercase tracking-widest text-[#3c143240] ml-1">Keywords</label>
                          <input
                            name="metaKeywords"
                            placeholder="salon, beauty, spa..."
                            value={form.metaKeywords}
                            onChange={handleChange}
                            className="w-full h-[55px] px-5 rounded-2xl bg-[#f9f5f2] transition-all outline-none font-medium text-[#1e0a18]"
                          />
                        </div>
                     </div>

                     {/* Categories */}
                     <div className="space-y-3">
                        <label className="text-[0.65rem] font-black uppercase tracking-widest text-[#3c143240] ml-1">Primary Services</label>
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
                              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                                form.categoryIds.includes(cat.id)
                                  ? "bg-[#1e0a18] text-white border-[#1e0a18]"
                                  : "bg-white text-[#3c143260] border-[#3c143210] hover:border-[#7a2860]"
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
                        className="w-full h-[65px] bg-gradient-to-r from-[#1e0a18] to-[#7a2860] text-white rounded-2xl font-bold text-lg shadow-xl shadow-[#7a2860]/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3"
                      >
                        {loading && <Loader2 className="animate-spin" size={20} />}
                        {loading ? "Processing Application..." : "Submit Partnership Application"}
                      </button>
                   </form>
                 </>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}