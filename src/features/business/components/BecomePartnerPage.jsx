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
        ? prev.categoryIds.filter((c) => c !== id)
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
      <div className="min-h-screen bg-[#f9f5f2] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#7a2860] animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#f9f5f2] pt-24 pb-20 font-[DM_Sans]">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-[#3c143208]">

          {success ? (
            <div className="py-16 text-center">
              <CheckCircle2 size={60} className="text-green-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">
                Application Received!
              </h2>
              <p className="text-[#3c143260] mb-8">
                Our team will review your business details within 48 hours.
              </p>
              <button
                onClick={() => router.push("/")}
                className="px-8 py-3 bg-[#1e0a18] text-white rounded-xl font-bold hover:bg-[#7a2860]"
              >
                Return Home
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-8">
                Become a Partner
              </h2>

              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl flex gap-2">
                  <AlertCircle size={18} />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">

                <input
                  name="name"
                  placeholder="Salon Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full h-14 px-5 rounded-2xl bg-[#f9f5f2]"
                />

                <input
                  name="registrationNumber"
                  placeholder="Registration Number"
                  value={form.registrationNumber}
                  onChange={handleChange}
                  required
                  className="w-full h-14 px-5 rounded-2xl bg-[#f9f5f2]"
                />

                <textarea
                  name="description"
                  placeholder="Business Description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full p-5 rounded-2xl bg-[#f9f5f2] border-transparent focus:bg-white focus:border-[#7a2860] focus:ring-4 focus:ring-[#7a2860]/5 transition-all outline-none font-medium text-[#1e0a18] resize-none"
                />

                {/* Contact Info Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="space-y-2">
                    <label className="text-[0.65rem] font-black uppercase tracking-widest text-[#3c143240] ml-1">Official Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="salonname@salon.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full h-14 px-5 rounded-2xl bg-[#f9f5f2] border-transparent focus:bg-white focus:border-[#7a2860] focus:ring-4 focus:ring-[#7a2860]/5 transition-all outline-none font-medium text-[#1e0a18]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[0.65rem] font-black uppercase tracking-widest text-[#3c143240] ml-1">Phone Number</label>
                    <input
                      name="phoneNumber"
                      placeholder="+971501234567"
                      value={form.phoneNumber}
                      onChange={handleChange}
                      required
                      className="w-full h-14 px-5 rounded-2xl bg-[#f9f5f2] border-transparent focus:bg-white focus:border-[#7a2860] focus:ring-4 focus:ring-[#7a2860]/5 transition-all outline-none font-medium text-[#1e0a18]"
                    />
                  </div>
                </div>

                {/* Address Section */}
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <label className="text-[0.65rem] font-black uppercase tracking-widest text-[#3c143240] ml-1">Street Address</label>
                    <input
                      name="address"
                      placeholder="Sheikh Zayed Road"
                      value={form.address}
                      onChange={handleChange}
                      required
                      className="w-full h-14 px-5 rounded-2xl bg-[#f9f5f2] border-transparent focus:bg-white focus:border-[#7a2860] focus:ring-4 focus:ring-[#7a2860]/5 transition-all outline-none font-medium text-[#1e0a18]"
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <label className="text-[0.65rem] font-black uppercase tracking-widest text-[#3c143240] ml-1">City</label>
                      <input name="city" placeholder="Dubai" value={form.city} onChange={handleChange} required className="w-full h-12 px-4 rounded-xl bg-[#f9f5f2] outline-none font-bold text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[0.65rem] font-black uppercase tracking-widest text-[#3c143240] ml-1">State</label>
                      <input name="state" placeholder="Dubai" value={form.state} onChange={handleChange} required className="w-full h-12 px-4 rounded-xl bg-[#f9f5f2] outline-none font-bold text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[0.65rem] font-black uppercase tracking-widest text-[#3c143240] ml-1">Zip Code</label>
                      <input name="postalCode" placeholder="00000" value={form.postalCode} onChange={handleChange} required className="w-full h-12 px-4 rounded-xl bg-[#f9f5f2] outline-none font-bold text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[0.65rem] font-black uppercase tracking-widest text-[#3c143240] ml-1">Country</label>
                      <input name="country" placeholder="United Arab Emirates" value={form.country} onChange={handleChange} required className="w-full h-12 px-4 rounded-xl bg-[#f9f5f2] outline-none font-bold text-sm" />
                    </div>
                  </div>
                </div>

                {/* SEO Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="space-y-2">
                    <label className="text-[0.65rem] font-black uppercase tracking-widest text-[#3c143240] ml-1">Meta Description</label>
                    <input
                      name="metaDescription"
                      placeholder="SEO summary for search results"
                      value={form.metaDescription}
                      onChange={handleChange}
                      className="w-full h-14 px-5 rounded-2xl bg-[#f9f5f2] border-transparent focus:bg-white focus:border-[#7a2860] focus:ring-4 focus:ring-[#7a2860]/5 transition-all outline-none font-medium text-[#1e0a18]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[0.65rem] font-black uppercase tracking-widest text-[#3c143240] ml-1">Keywords</label>
                    <input
                      name="metaKeywords"
                      placeholder="salon in Dubai, hair cut..."
                      value={form.metaKeywords}
                      onChange={handleChange}
                      className="w-full h-14 px-5 rounded-2xl bg-[#f9f5f2] border-transparent focus:bg-white focus:border-[#7a2860] focus:ring-4 focus:ring-[#7a2860]/5 transition-all outline-none font-medium text-[#1e0a18]"
                    />
                  </div>
                </div>

                {/* Location Section */}
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handleGetLocation}
                      className="px-4 py-2 bg-[#7a2860] text-white rounded-xl flex items-center gap-2"
                    >
                      {locationLoading ? (
                        <Loader2
                          size={16}
                          className="animate-spin"
                        />
                      ) : (
                        <Navigation size={16} />
                      )}
                      {locationLoading
                        ? "Fetching..."
                        : "Use My Location"}
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsMapOpen(true)}
                      className="px-4 py-2 border rounded-xl flex items-center gap-2 hover:bg-[#7a2860] hover:text-white transition-all"
                    >
                      <MapIcon size={16} />
                      Pick from Map
                    </button>
                  </div>

                  {locationError && (
                    <p className="text-red-500 text-sm">
                      {locationError}
                    </p>
                  )}

                  {(manualLocation || form.latitude) && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[0.65rem] font-black uppercase text-[#3c143240] ml-1">Latitude</label>
                        <input
                          name="latitude"
                          type="number"
                          step="any"
                          placeholder="Latitude"
                          value={form.latitude}
                          readOnly
                          className="w-full h-12 px-4 rounded-xl bg-[#f9f5f2] cursor-not-allowed opacity-70"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[0.65rem] font-black uppercase text-[#3c143240] ml-1">Longitude</label>
                        <input
                          name="longitude"
                          type="number"
                          step="any"
                          placeholder="Longitude"
                          value={form.longitude}
                          readOnly
                          className="w-full h-12 px-4 rounded-xl bg-[#f9f5f2] cursor-not-allowed opacity-70"
                        />
                      </div>
                    </div>
                  )}

                  <MapPickerModal
                    isOpen={isMapOpen}
                    onClose={() => setIsMapOpen(false)}
                    onSelect={handleMapSelect}
                    initialPos={form.latitude && form.longitude ? { lat: form.latitude, lng: form.longitude } : null}
                  />
                </div>

                {/* Categories */}
                <div className="space-y-3 pt-4">
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
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${form.categoryIds.includes(cat.id)
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
                  className="w-full h-16 bg-gradient-to-r from-[#1e0a18] to-[#7a2860] text-white rounded-2xl font-bold flex items-center justify-center gap-3"
                >
                  {loading && (
                    <Loader2
                      size={20}
                      className="animate-spin"
                    />
                  )}
                  {loading
                    ? "Processing..."
                    : "Submit Application"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}