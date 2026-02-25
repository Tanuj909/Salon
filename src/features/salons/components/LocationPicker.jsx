"use client";

import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, Search, Loader2, X, Map as MapIcon } from 'lucide-react';
import dynamic from 'next/dynamic';

const MapPickerModal = dynamic(() => import('./MapPickerModal'), { 
    ssr: false,
    loading: () => null
});

const LocationPicker = ({ currentAddress, lat, lng, onLocationSelect, onDetectLocation }) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isMapOpen, setIsMapOpen] = useState(false);
    const wrapperRef = useRef(null);

    // Update query when currentAddress changes externally
    useEffect(() => {
        if (currentAddress) setQuery(currentAddress);
    }, [currentAddress]);

    // Close suggestions when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const searchPlaces = async (val) => {
        if (val.length < 3) {
            setSuggestions([]);
            return;
        }

        setIsSearching(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(val)}&limit=5&addressdetails=1`
            );
            const data = await response.json();
            setSuggestions(data);
            setShowSuggestions(true);
        } catch (error) {
            console.error("Geocoding error:", error);
        } finally {
            setIsSearching(false);
        }
    };

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (query && query !== currentAddress && query.length >= 3) {
                searchPlaces(query);
            }
        }, 800);
        return () => clearTimeout(timer);
    }, [query]);

    const handleSelect = (s) => {
        setQuery(s.display_name);
        setSuggestions([]);
        setShowSuggestions(false);
        onLocationSelect({
            lat: parseFloat(s.lat),
            lng: parseFloat(s.lon),
            address: s.display_name
        });
    };

    const handleMapSelect = (data) => {
        setIsMapOpen(false);
        onLocationSelect(data);
    };

    return (
        <div className="relative flex-1" ref={wrapperRef}>
            <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a2860]">
                    <MapPin size={18} />
                </div>
                
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.length >= 3 && setShowSuggestions(true)}
                    placeholder="Search for a city or area..."
                    className="w-full h-[55px] pl-12 pr-[160px] bg-white border border-[#3c143212] rounded-2xl text-[0.9rem] font-medium text-[#1e0a18] outline-none transition-all focus:border-[#7a2860] focus:ring-4 focus:ring-[#7a2860]/5 shadow-sm"
                />

                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                    {query && (
                        <button 
                            onClick={() => { setQuery(""); setSuggestions([]); }}
                            className="p-1.5 text-slate-400 hover:text-slate-600"
                        >
                            <X size={16} />
                        </button>
                    )}
                    
                    <button
                        onClick={() => setIsMapOpen(true)}
                        className="p-2.5 bg-slate-100 text-[#1e0a18] rounded-xl hover:bg-[#7a2860] hover:text-white transition-all active:scale-95"
                        title="Pick from map"
                    >
                        <MapIcon size={16} />
                    </button>

                    <button
                        onClick={onDetectLocation}
                        className="flex items-center gap-1.5 px-3 py-2 bg-[#7a2860] text-white rounded-xl text-[0.7rem] font-bold hover:bg-[#1e0a18] transition-all active:scale-95 shadow-md shadow-[#7a2860]/20"
                    >
                        <Navigation size={12} fill="currentColor" />
                        Detect
                    </button>
                </div>
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && (suggestions.length > 0 || isSearching) && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-[#3c143212] overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                    {isSearching ? (
                        <div className="p-6 flex items-center justify-center gap-3 text-[#3c143260]">
                            <Loader2 size={20} className="animate-spin" />
                            <span className="text-sm font-medium">Searching locations...</span>
                        </div>
                    ) : (
                        <div className="max-h-[300px] overflow-y-auto">
                            {suggestions.map((s, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSelect(s)}
                                    className="w-full px-5 py-4 flex items-start gap-4 hover:bg-[#f9f5f2] transition-colors border-b border-[#3c143208] last:border-0 text-left group"
                                >
                                    <div className="mt-1 p-1.5 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-[#7a2860]/10 group-hover:text-[#7a2860]">
                                        <MapPin size={14} />
                                    </div>
                                    <div>
                                        <p className="text-[0.85rem] font-bold text-[#1e0a18] line-clamp-1">{s.display_name.split(',')[0]}</p>
                                        <p className="text-[0.75rem] text-[#3c143260] line-clamp-1">{s.display_name.split(',').slice(1).join(',').trim()}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <MapPickerModal 
                isOpen={isMapOpen}
                onClose={() => setIsMapOpen(false)}
                onSelect={handleMapSelect}
                initialPos={lat && lng ? { lat, lng } : null}
            />
        </div>
    );
};

export default LocationPicker;
