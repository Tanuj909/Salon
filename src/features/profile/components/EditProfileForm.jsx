import React, { useState } from 'react';
import Link from 'next/link';
import { Camera, Save, X, Phone, User, Mail, Calendar, MapPin } from 'lucide-react';

const EditProfileForm = ({ user }) => {
    const [formData, setFormData] = useState({
        name: user?.name || "Tanuj Kashyap",
        email: user?.email || "tanuj@example.com",
        phone: user?.phone || "+91 98765 43210",
        dob: user?.dob || "1995-02-20",
        address: user?.location || "Mumbai, India",
        avatar: user?.avatar || null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="container-custom py-12 px-4 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
                <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Edit Profile</h2>
                        <p className="text-sm text-slate-500 mt-1">Update your personal information and preferences.</p>
                    </div>
                    <Link
                        href="/profile"
                        className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all"
                    >
                        <X size={24} />
                    </Link>
                </div>

                <form className="p-8 space-y-10">
                    {/* Avatar Upload */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-full border-4 border-creamy overflow-hidden bg-slate-100 shadow-md">
                                <img
                                    src={formData.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"}
                                    alt="Avatar Preview"
                                    className="w-full h-full object-cover transition-opacity group-hover:opacity-75"
                                />
                            </div>
                            <button
                                type="button"
                                className="absolute bottom-1 right-1 p-2.5 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-all border-2 border-white"
                            >
                                <Camera size={16} />
                            </button>
                        </div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Change Profile Photo</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 ml-1">Full Name</label>
                            <div className="relative">
                                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-slate-700 font-medium"
                                    placeholder="Enter your name"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    readOnly
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-100 border border-slate-100 rounded-xl cursor-not-allowed text-slate-400 font-medium"
                                />
                            </div>
                            <p className="text-[9px] text-slate-400 mt-1 ml-1">* Email cannot be changed</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 ml-1">Phone Number</label>
                            <div className="relative">
                                <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-slate-700 font-medium"
                                    placeholder="+91 00000 00000"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 ml-1">Date of Birth</label>
                            <div className="relative">
                                <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                                <input
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-slate-700 font-medium"
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 ml-1">Address</label>
                            <div className="relative">
                                <MapPin size={18} className="absolute left-4 top-4 text-slate-300" />
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-slate-700 font-medium resize-none"
                                    placeholder="Enter your full address"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                        <button
                            type="submit"
                            className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 hover:shadow-xl transition-all"
                        >
                            <Save size={20} />
                            Save Changes
                        </button>
                        <Link
                            href="/profile"
                            className="flex-1 flex items-center justify-center gap-2 bg-slate-100 text-slate-600 py-4 rounded-xl font-bold hover:bg-slate-200 transition-all"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileForm;
