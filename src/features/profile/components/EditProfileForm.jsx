import { Camera, Save, X, Phone, User, Mail, Calendar, MapPin, Loader2, AlertCircle, CheckCircle, Info, Home, Building2, MapPinned } from 'lucide-react';
import { useUpdateProfile } from '../hooks/useUpdateProfile';
import { useCustomerProfile } from '../../customer/hooks/useCustomerProfile';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const EditProfileForm = ({ user: initialUser }) => {
    const { profile: fetchedProfile, loading: fetching, error: fetchError } = useCustomerProfile();
    const { updateProfile, loading: updating, error: updateError, success, reset } = useUpdateProfile();
    const [showToast, setShowToast] = useState(false);

    // Handle Success Toast
    useEffect(() => {
        if (success) {
            setShowToast(true);
            const timer = setTimeout(() => {
                setShowToast(false);
                reset(); // Reset the success state in the hook
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success, reset]);

    const [formData, setFormData] = useState({
        fullName: "",
        phoneNumber: "",
        dateOfBirth: "",
        gender: "",
        preferences: "",
        profileImageUrl: "",
        defaultAddress: {
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            postalCode: "",
            country: "India"
        }
    });

    // Sync fetched data to form
    useEffect(() => {
        const profile = fetchedProfile || initialUser;
        if (profile) {
            console.log("Profile data received:", profile); // Debug log

            // Handle date formatting properly
            let formattedDate = "";
            if (profile.dateOfBirth) {
                // If it's a timestamp or date string, extract YYYY-MM-DD
                const date = new Date(profile.dateOfBirth);
                if (!isNaN(date.getTime())) {
                    formattedDate = date.toISOString().split('T')[0];
                }
            }

            setFormData({
                fullName: profile.user?.fullName || profile.fullName || "",
                phoneNumber: profile.user?.phoneNumber || profile.phoneNumber || "",
                dateOfBirth: formattedDate,
                gender: profile.gender || "",
                preferences: profile.preferences || "",
                profileImageUrl: profile.user?.profileImageUrl || profile.profileImageUrl || "",
                defaultAddress: {
                    addressLine1: profile.addresses?.[0]?.addressLine1 || "",
                    addressLine2: profile.addresses?.[0]?.addressLine2 || "",
                    city: profile.addresses?.[0]?.city || "",
                    state: profile.addresses?.[0]?.state || "",
                    postalCode: profile.addresses?.[0]?.postalCode || "",
                    country: profile.addresses?.[0]?.country || "India"
                }
            });
        }
    }, [fetchedProfile, initialUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: { ...prev[parent], [child]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateProfile(formData);
    };

    if (fetching) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <div className="relative">
                    <div className="w-20 h-20 border-4 border-[#C8A951]/20 border-t-[#C8A951] rounded-full animate-spin"></div>
                </div>
                <div className="text-center">
                    <p className="text-lg font-medium text-gray-900">Loading Profile</p>
                    <p className="text-sm text-gray-500 mt-1">Please wait while we fetch your details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-10">
            <div className="max-w-[1600px] mx-auto">
                <form onSubmit={handleSubmit}>
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#1C1C1C] rounded-xl flex items-center justify-center shadow-lg">
                                <User className="w-6 h-6 text-[#C8A951]" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Profile Settings</h1>
                                <p className="text-sm text-gray-500">Manage your personal identity and salon preferences.</p>
                            </div>
                        </div>
                    </div>

                    {/* Bento Grid Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        
                        {/* Profile & Loyalty Card (Span 4) */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center text-center">
                                <div className="relative group mb-6">
                                    <div className="w-40 h-40 rounded-full ring-8 ring-gray-50 overflow-hidden bg-gray-100">
                                        {formData.profileImageUrl ? (
                                            <Image
                                                src={formData.profileImageUrl}
                                                alt="Profile"
                                                width={160}
                                                height={160}
                                                className="w-full h-full object-cover"
                                                unoptimized
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <User className="w-16 h-16 text-gray-300" />
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const url = window.prompt("Enter image URL:", formData.profileImageUrl);
                                            if (url !== null) setFormData(prev => ({ ...prev, profileImageUrl: url }));
                                        }}
                                        className="absolute bottom-1 right-1 p-3 bg-[#1C1C1C] text-[#C8A951] rounded-2xl shadow-xl hover:scale-105 transition-all border-4 border-white"
                                    >
                                        <Camera size={20} />
                                    </button>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">{formData.fullName || "Your Name"}</h3>
                                <p className="text-sm text-gray-500 mb-6">{fetchedProfile?.user?.email || "email@example.com"}</p>
                                
                                <div className="w-full grid grid-cols-2 gap-4 pt-6 border-t border-gray-50">
                                    <div className="p-4 bg-gray-50 rounded-2xl text-center">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
                                        <p className="text-sm font-bold text-gray-900">{fetchedProfile?.membershipLevel || "BRONZE"}</p>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-2xl text-center">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Points</p>
                                        <p className="text-sm font-bold text-gray-900">{fetchedProfile?.loyaltyPoints || 0}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#1C1C1C] p-8 rounded-[2.5rem] text-white relative overflow-hidden">
                                <div className="relative z-10">
                                    <h4 className="text-[10px] font-bold text-[#C8A951] uppercase tracking-[0.2em] mb-4">Membership Card</h4>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-2xl font-bold mb-1">{formData.fullName || "VALUED GUEST"}</p>
                                            <p className="text-xs text-gray-400">Member since 2024</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-[#C8A951] font-bold italic">FAST BOOKING</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-[#C8A951]/10 rounded-full blur-3xl"></div>
                            </div>
                        </div>

                        {/* Form Details (Span 8) */}
                        <div className="lg:col-span-8 space-y-6">
                            {/* Basic Details Card */}
                            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                                        <User className="w-5 h-5 text-[#C8A951]" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                        <div className="relative group">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#C8A951] outline-none transition-all text-gray-900 font-semibold"
                                                placeholder="Enter full name"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                                        <div className="relative group">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="tel"
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={handleChange}
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#C8A951] outline-none transition-all text-gray-900 font-semibold"
                                                placeholder="+91 00000 00000"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Date of Birth</label>
                                        <div className="relative group">
                                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="date"
                                                name="dateOfBirth"
                                                value={formData.dateOfBirth}
                                                onChange={handleChange}
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#C8A951] outline-none transition-all text-gray-900 font-semibold"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Gender</label>
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#C8A951] outline-none transition-all text-gray-900 font-semibold appearance-none cursor-pointer"
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="MALE">Male</option>
                                            <option value="FEMALE">Female</option>
                                            <option value="OTHER">Other</option>
                                            <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Address & Preferences Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                                            <MapPinned className="w-5 h-5 text-[#C8A951]" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900">Address</h3>
                                    </div>
                                    <div className="space-y-4">
                                        <input
                                            type="text"
                                            name="defaultAddress.addressLine1"
                                            value={formData.defaultAddress.addressLine1}
                                            onChange={handleChange}
                                            className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#C8A951] outline-none transition-all text-gray-900 font-semibold text-sm"
                                            placeholder="Street Address"
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                name="defaultAddress.city"
                                                value={formData.defaultAddress.city}
                                                onChange={handleChange}
                                                className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#C8A951] outline-none transition-all text-gray-900 font-semibold text-sm"
                                                placeholder="City"
                                            />
                                            <input
                                                type="text"
                                                name="defaultAddress.postalCode"
                                                value={formData.defaultAddress.postalCode}
                                                onChange={handleChange}
                                                className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#C8A951] outline-none transition-all text-gray-900 font-semibold text-sm"
                                                placeholder="Pincode"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                                            <Info className="w-5 h-5 text-[#C8A951]" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900">Style Notes</h3>
                                    </div>
                                    <textarea
                                        name="preferences"
                                        value={formData.preferences}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-[#C8A951] outline-none transition-all text-gray-900 font-semibold resize-none text-sm"
                                        placeholder="Allergies or preferences..."
                                    />
                                </div>
                            </div>

                            {/* Error Message */}
                            {(updateError || fetchError) && (
                                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600">
                                    <AlertCircle size={18} />
                                    <p className="text-sm font-semibold">{updateError || fetchError}</p>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-6">
                                <Link
                                    href="/profile"
                                    className="w-full sm:w-auto px-10 py-4 text-gray-500 font-bold text-sm tracking-wide text-center hover:text-gray-900 transition-colors"
                                >
                                    Cancel Changes
                                </Link>
                                <button
                                    type="submit"
                                    disabled={updating}
                                    className="w-full sm:w-auto min-w-[240px] px-10 py-5 bg-[#1C1C1C] text-white font-bold rounded-2xl shadow-xl shadow-gray-100 hover:bg-[#C8A951] hover:text-[#1C1C1C] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                                >
                                    {updating ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                                    {updating ? "Saving Changes..." : "Save Changes"}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            {/* Success Toast */}
            {showToast && (
                <div className="fixed bottom-10 right-10 z-[100] px-8 py-5 bg-[#1C1C1C] text-white shadow-2xl rounded-[1.5rem] flex items-center gap-4 animate-in fade-in slide-in-from-right-8 duration-500">
                    <div className="w-10 h-10 bg-[#C8A951] text-[#1C1C1C] rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-bold tracking-tight">Updated Successfully</p>
                        <p className="text-xs text-gray-400 mt-0.5">Your profile changes are now live.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditProfileForm;