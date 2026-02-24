"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useRouter } from 'next/navigation';

const ContactPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className="bg-creamy/30 min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-terracotta/20 border-t-terracotta rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="bg-creamy/30 min-h-screen">
      {/* Simple Header */}
      <div className="max-w-[1200px] mx-auto px-6 pt-24 pb-12 text-center mt-15">
        <h1 className="text-5xl md:text-6xl font-bold text-plum font-display mb-4">
          Become a Partner
        </h1>
        <div className='flex items-center justify-center'>
        <p className="text-lg text-earthy-brown/70 max-w-2xl mx-auto font-display">
          Join our network of premium beauty professionals
        </p>
        </div>
        <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-6"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Left Column - Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-plum font-display mb-4">
                Let's work together
              </h2>
              <p className="text-earthy-brown/70 font-display leading-relaxed">
                We're always looking for talented professionals to join our community. 
                Whether you're a stylist, esthetician, or salon owner, we'd love to hear from you.
              </p>
            </div>

            {/* Contact Cards - Simple & Clean */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-xl">📍</span>
                </div>
                <div>
                  <p className="text-sm text-earthy-brown/60 font-display">Visit us</p>
                  <p className="text-plum font-display">123 Beauty Ave, NY 10001</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-xl">📞</span>
                </div>
                <div>
                  <p className="text-sm text-earthy-brown/60 font-display">Call us</p>
                  <p className="text-plum font-display">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-xl">✉️</span>
                </div>
                <div>
                  <p className="text-sm text-earthy-brown/60 font-display">Email us</p>
                  <p className="text-plum font-display">partner@beautysalon.com</p>
                </div>
              </div>
            </div>

            {/* Simple Social Links */}
            <div className="flex gap-3">
              {['📘', '📷', '🐦'].map((icon, i) => (
                <button key={i} className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center hover:shadow-md transition">
                  <span className="text-lg">{icon}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold text-plum font-display mb-6">
              Send us a message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-plum mb-1 font-display">
                  Full name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition font-display"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-plum mb-1 font-display">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-display"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-plum mb-1 font-display">
                  Phone number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-display"
                  placeholder="+1 234 567 8900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-plum mb-1 font-display">
                  Business name (optional)
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-display"
                  placeholder="Your salon/spa name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-plum mb-1 font-display">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none font-display"
                  placeholder="Tell us about your partnership ideas..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-creamy py-3 rounded-lg font-bold font-display hover:bg-plum transition-colors"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
