"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { X, Check, MapPin, Globe } from 'lucide-react';

// Fix Leaflet default icon issues
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const COUNTRIES = {
    "UAE": { lat: 25.7971, lng: 56.0220 },
    "Saudi Arabia": { lat: 24.7136, lng: 46.6753 },
    "Oman": { lat: 23.5859, lng: 58.4059 },
    "Qatar": { lat: 25.2854, lng: 51.5310 },
    "Iran": { lat: 35.6892, lng: 51.3890 },
    "India": { lat: 28.6139, lng: 77.2090 },
    "Kuwait": { lat: 29.3759, lng: 47.9774 }
};

const MapController = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.setView(center, map.getZoom());
        }
    }, [center, map]);
    return null;
};

const LocationMarker = ({ position, setPosition, setAddress }) => {
    useMapEvents({
        click(e) {
            setPosition(e.latlng);
            reverseGeocode(e.latlng.lat, e.latlng.lng, setAddress);
        },
    });

    return position ? <Marker position={position} icon={DefaultIcon} /> : null;
};

const reverseGeocode = async (lat, lng, setAddress) => {
    if (!lat || !lng) return;
    try {
        setAddress("Locating...");
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
            {
                signal: controller.signal,
                headers: { 
                    'Accept-Language': 'en',
                    'User-Agent': 'SalonHub-MapPicker/1.0'
                }
            }
        ).catch(err => {
            console.warn("Fetch failed:", err);
            return null;
        });

        clearTimeout(timeoutId);

        if (!res || !res.ok) {
            setAddress(`Selected Location (${lat.toFixed(3)}, ${lng.toFixed(3)})`);
            return;
        }

        const data = await res.json();
        setAddress(data.display_name || `Selected Location (${lat.toFixed(3)}, ${lng.toFixed(3)})`);
    } catch (err) {
        console.warn("Reverse geocoding suppressed:", err);
        setAddress(`Selected Location (${lat.toFixed(3)}, ${lng.toFixed(3)})`);
    }
};

const MapPickerModal = ({ isOpen, onClose, onSelect, initialPos }) => {
    const [position, setPosition] = useState(initialPos || COUNTRIES.UAE);
    const [address, setAddress] = useState("Loading address...");
    const [isMounted, setIsMounted] = useState(false);
    const [isLocating, setIsLocating] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState("");

    useEffect(() => {
        if (!isOpen) {
            setIsMounted(false);
            return;
        }
        setIsMounted(true);

        const useUAEFallback = () => {
            const uae = COUNTRIES.UAE;
            setPosition(uae);
            setSelectedCountry("UAE");
            reverseGeocode(uae.lat, uae.lng, setAddress).catch(() => { });
        };

        // If we have an initial position, use it.
        // If not, and we aren't already initialized, attempt geolocation.
        if (initialPos && initialPos.lat && initialPos.lng) {
            setPosition(initialPos);
            reverseGeocode(initialPos.lat, initialPos.lng, setAddress).catch(() => { });
        } else if (navigator.geolocation) {
            setIsLocating(true);
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const newPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                    setPosition(prev => {
                        // Guard: Only overwrite the position if it's still at the default UAE capital
                        if (prev.lat === COUNTRIES.UAE.lat && prev.lng === COUNTRIES.UAE.lng) {
                            reverseGeocode(newPos.lat, newPos.lng, setAddress).catch(() => { });
                            return newPos;
                        }
                        return prev;
                    });
                    setIsLocating(false);
                },
                (error) => {
                    console.warn("Geolocation failed:", error.message);
                    setIsLocating(false);
                    useUAEFallback();
                },
                { enableHighAccuracy: true, timeout: 5000 }
            );
        } else {
            useUAEFallback();
        }
    }, [isOpen]); // Only run when the modal opens/closes

    if (!isOpen || !isMounted) return null;

    const modalContent = (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-4xl rounded-2xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col h-[85vh] sm:h-[80vh]">
                {/* Header */}
                <div className="px-4 py-4 sm:px-8 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#3c14320a]">
                    <div className="flex items-center justify-between w-full sm:w-auto">
                        <div>
                            <h2 className="text-lg sm:text-xl font-bold text-[#1e0a18]">Pick Location</h2>
                            <p className="text-xs sm:text-sm text-[#3c143260]">Select country or click on map</p>
                        </div>
                        <button onClick={onClose} className="sm:hidden p-1.5 hover:bg-[#f9f5f2] rounded-full transition-colors">
                            <X size={20} className="text-[#3c143280]" />
                        </button>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="relative flex-1 sm:flex-none sm:min-w-[180px]">
                            < Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3c143260]" />
                            <select 
                                value={selectedCountry}
                                onChange={(e) => {
                                    const cName = e.target.value;
                                    if (!cName) return;
                                    setSelectedCountry(cName);
                                    const coords = COUNTRIES[cName];
                                    if (coords) {
                                        setPosition(coords);
                                        reverseGeocode(coords.lat, coords.lng, setAddress);
                                    }
                                }}
                                className="w-full pl-9 pr-4 py-2 bg-[#f9f5f2] border-none rounded-xl text-sm font-bold text-[#1e0a18] focus:ring-2 focus:ring-[#7a2860]/20 appearance-none cursor-pointer hover:bg-[#f0ece9] transition-colors"
                            >
                                <option value="">Select Country</option>
                                {Object.keys(COUNTRIES).map(country => (
                                    <option key={country} value={country}>{country}</option>
                                ))}
                            </select>
                        </div>
                        <button onClick={onClose} className="hidden sm:block p-1.5 sm:p-2 hover:bg-[#f9f5f2] rounded-full transition-colors">
                            <X size={20} className="sm:w-6 sm:h-6 text-[#3c143280]" />
                        </button>
                    </div>
                </div>

                {/* Map Area */}
                <div className="flex-1 relative">
                    <MapContainer
                        center={position}
                        zoom={13}
                        style={{ height: '100%', width: '100%' }}
                        scrollWheelZoom={true}
                    >
                        <MapController center={position} />
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker position={position} setPosition={setPosition} setAddress={setAddress} />
                    </MapContainer>
                </div>

                {/* Footer Info */}
                <div className="px-4 py-4 sm:px-8 sm:py-6 bg-[#f9f5f2]/50 border-t border-[#3c14320a]">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
                        <div className="flex items-start gap-3 flex-1">
                            <div className="p-1.5 sm:p-2 bg-white rounded-xl text-[#7a2860] shadow-sm sm:mt-1">
                                <MapPin size={16} className="sm:w-5 sm:h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[0.6rem] sm:text-[0.65rem] font-black uppercase tracking-widest text-[#3c143250] mb-0.5 sm:mb-1">Selected Area</p>
                                <p className="text-[0.8rem] sm:text-[0.9rem] font-bold text-[#1e0a18] line-clamp-2 sm:line-clamp-1 break-words">{address}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto">
                            <button
                                onClick={onClose}
                                className="flex-1 md:flex-none px-2 sm:px-8 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-[0.8rem] sm:text-[0.9rem] font-bold text-[#3c143280] hover:bg-white hover:shadow-sm transition-all text-center whitespace-nowrap"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => onSelect({ ...position, address })}
                                className="flex-[2] md:flex-none px-3 sm:px-10 py-2.5 sm:py-3 bg-[#1e0a18] text-white rounded-xl sm:rounded-2xl text-[0.8rem] sm:text-[0.9rem] font-bold hover:bg-[#7a2860] transition-all flex justify-center items-center gap-1.5 sm:gap-2 shadow-xl active:scale-95 whitespace-nowrap text-center"
                            >
                                <Check size={14} className="sm:w-[18px] sm:h-[18px]" />
                                <span>Confirm<span className="hidden sm:inline"> Location</span></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};

export default MapPickerModal;
