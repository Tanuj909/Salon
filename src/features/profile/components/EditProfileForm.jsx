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
        <div className="min-h-screen bg-[#FDFCF7] pt-28 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1400px] mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-[#1C1C1C] rounded-2xl flex items-center justify-center shadow-xl rotate-3">
                            <User className="w-7 h-7 text-[#C8A951]" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-[#1C1C1C] tracking-tight">Profile Settings</h1>
                            <p className="text-gray-500 font-medium">Manage your personal identity and preferences</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/profile"
                            className="px-6 py-3 bg-white border-2 border-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-200 transition-all flex items-center gap-2"
                        >
                            <X size={18} />
                            Cancel
                        </Link>
                        <button
                            onClick={handleSubmit}
                            disabled={updating}
                            className="px-8 py-3 bg-[#1C1C1C] text-white font-bold rounded-xl shadow-[0_10px_20px_-5px_rgba(28,28,28,0.3)] hover:bg-[#C8A951] hover:text-[#1C1C1C] transition-all flex items-center gap-2 group"
                        >
                            {updating ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} className="group-hover:scale-110 transition-transform" />}
                            {updating ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Left Column: Photo & Quick Glance (Span 4) */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Avatar Card */}
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col items-center text-center relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8A951]/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />

                            <div className="relative mb-6">
                                <div className="w-40 h-40 rounded-full p-1.5 bg-gradient-to-tr from-[#C8A951] to-[#1C1C1C] shadow-2xl">
                                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-white bg-gray-50">
                                        {formData.profileImageUrl ? (
                                            <img
                                                src={formData.profileImageUrl}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.fullName || 'User')}&background=C8A951&color=fff&size=256`;
                                                }}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                                <User className="w-16 h-16 text-gray-300" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const url = window.prompt("Enter image URL:", formData.profileImageUrl);
                                        if (url !== null) setFormData(prev => ({ ...prev, profileImageUrl: url }));
                                    }}
                                    className="absolute bottom-2 right-2 p-3 bg-[#1C1C1C] text-[#C8A951] rounded-2xl shadow-xl hover:bg-[#C8A951] hover:text-[#1C1C1C] transition-all border-4 border-white group-avatar"
                                >
                                    <Camera size={20} />
                                </button>
                            </div>

                            <h3 className="text-xl font-bold text-[#1C1C1C] mb-1">{formData.fullName || "Your Full Name"}</h3>
                            <p className="text-sm text-gray-500 mb-6">{fetchedProfile?.user?.email || "email@example.com"}</p>

                            <div className="grid grid-cols-2 gap-4 w-full pt-6 border-t border-gray-100">
                                <div className="p-4 bg-gray-50 rounded-2xl">
                                    <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Bookings</p>
                                    <p className="text-lg font-black text-[#1C1C1C]">{fetchedProfile?.stats?.totalBookings || 0}</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-2xl">
                                    <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Member Since</p>
                                    <p className="text-sm font-black text-[#1C1C1C]">
                                        {fetchedProfile?.stats?.memberSince ? new Date(fetchedProfile.stats.memberSince).getFullYear() : '2024'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Status Card */}
                        <div className="bg-[#1C1C1C] p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden text-white">
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <Info className="w-5 h-5 text-[#C8A951]" />
                                    <h4 className="font-bold uppercase tracking-widest text-[10px] text-[#C8A951]">Membership Status</h4>
                                </div>
                                <p className="text-3xl font-black mb-2">{fetchedProfile?.membershipLevel || "BRONZE"}</p>
                                <p className="text-gray-400 text-sm">{fetchedProfile?.loyaltyPoints || 0} Loyalty Points earned</p>
                            </div>
                            <div className="absolute bottom-[-20%] right-[-10%] w-40 h-40 bg-[#C8A951]/10 rounded-full blur-3xl" />
                        </div>
                    </div>

                    {/* Right Column: Information Forms (Span 8) */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* Personal Details Bento Block */}
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 bg-[#F8F5EE] rounded-xl flex items-center justify-center">
                                    <User className="w-5 h-5 text-[#C8A951]" />
                                </div>
                                <h3 className="text-xl font-bold text-[#1C1C1C]">Personal Details</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-gray-400 ml-1">Full Name</label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-[#C8A951] transition-colors" />
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-[1.25rem] focus:bg-white focus:border-[#C8A951] focus:ring-4 focus:ring-[#C8A951]/5 outline-none transition-all text-[#1C1C1C] font-semibold"
                                            placeholder="Enter full name"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-gray-400 ml-1">Phone Number</label>
                                    <div className="relative group">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-[#C8A951] transition-colors" />
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-[1.25rem] focus:bg-white focus:border-[#C8A951] focus:ring-4 focus:ring-[#C8A951]/5 outline-none transition-all text-[#1C1C1C] font-semibold"
                                            placeholder="+91 00000 00000"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-gray-400 ml-1">Date of Birth</label>
                                    <div className="relative group">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-[#C8A951] transition-colors" />
                                        <input
                                            type="date"
                                            name="dateOfBirth"
                                            value={formData.dateOfBirth}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-[1.25rem] focus:bg-white focus:border-[#C8A951] focus:ring-4 focus:ring-[#C8A951]/5 outline-none transition-all text-[#1C1C1C] font-semibold"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-gray-400 ml-1">Gender Identity</label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-[1.25rem] focus:bg-white focus:border-[#C8A951] focus:ring-4 focus:ring-[#C8A951]/5 outline-none transition-all text-[#1C1C1C] font-semibold appearance-none cursor-pointer"
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

                        {/* Preferences & Address Bento Blocks (Two Columns) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Address Section */}
                            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-[#F4F7FF] rounded-xl flex items-center justify-center">
                                        <MapPinned className="w-5 h-5 text-[#516CC8]" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#1C1C1C]">Default Address</h3>
                                </div>

                                <div className="space-y-4 flex-1">
                                    <input
                                        type="text"
                                        name="defaultAddress.addressLine1"
                                        value={formData.defaultAddress.addressLine1}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#C8A951] outline-none transition-all text-[#1C1C1C] font-semibold text-sm"
                                        placeholder="Street Address Line 1"
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            name="defaultAddress.city"
                                            value={formData.defaultAddress.city}
                                            onChange={handleChange}
                                            className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#C8A951] outline-none transition-all text-[#1C1C1C] font-semibold text-sm"
                                            placeholder="City"
                                        />
                                        <input
                                            type="text"
                                            name="defaultAddress.postalCode"
                                            value={formData.defaultAddress.postalCode}
                                            onChange={handleChange}
                                            className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#C8A951] outline-none transition-all text-[#1C1C1C] font-semibold text-sm"
                                            placeholder="Pincode"
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        name="defaultAddress.state"
                                        value={formData.defaultAddress.state}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#C8A951] outline-none transition-all text-[#1C1C1C] font-semibold text-sm"
                                        placeholder="State"
                                    />
                                </div>
                            </div>

                            {/* Preferences Section */}
                            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-[#FFF4F4] rounded-xl flex items-center justify-center">
                                        <Info className="w-5 h-5 text-[#C85151]" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#1C1C1C]">Service Notes</h3>
                                </div>

                                <div className="flex-1 flex flex-col">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-gray-400 ml-1 mb-2">Style Preferences</label>
                                    <textarea
                                        name="preferences"
                                        value={formData.preferences}
                                        onChange={handleChange}
                                        rows={6}
                                        className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-[1.25rem] focus:bg-white focus:border-[#C8A951] outline-none transition-all text-[#1C1C1C] font-semibold resize-none flex-1"
                                        placeholder="Add any specific style notes or preferences here..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Notification Messages Block */}
                        {(updateError || fetchError) && (
                            <div className={`p-6 rounded-[2rem] border-2 transition-all animate-in fade-in slide-in-from-bottom-4 duration-500 bg-red-50 border-red-100 text-red-700`}>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-red-100">
                                        <AlertCircle className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-bold">Action Required</p>
                                        <p className="text-sm opacity-90">{updateError || fetchError}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Floating Success Toast Modal */}
            {showToast && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
                    <div className="bg-[#1C1C1C] text-white px-8 py-6 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-[#C8A951]/20 flex flex-col items-center gap-4 animate-in zoom-in slide-in-from-top-4 duration-300 pointer-events-auto">
                        <div className="w-16 h-16 bg-[#C8A951] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(200,169,81,0.4)]">
                            <CheckCircle className="w-8 h-8 text-[#1C1C1C]" />
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-bold tracking-tight">Updated Successfully!</h3>
                            <p className="text-gray-400 text-sm mt-1 font-medium">Your profile changes are now live.</p>
                        </div>
                        {/* Progress Bar for the 3s timeout */}
                        <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                            <div className="h-full bg-[#C8A951] animate-progress-shrink transition-all duration-[3000ms] ease-linear"></div>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom Animation for Progress Bar */}
            <style jsx>{`
                @keyframes progress-shrink {
                    from { width: 100%; }
                    to { width: 0%; }
                }
                .animate-progress-shrink {
                    animation: progress-shrink 3s linear forwards;
                }
            `}</style>
        </div>
    );
};

export default EditProfileForm;