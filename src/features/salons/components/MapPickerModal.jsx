"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { X, Check, MapPin, Loader2 } from 'lucide-react';

// Fix Leaflet default icon issues
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

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
                headers: { 'Accept-Language': 'en' }
            }
        ).catch(err => {
            console.warn("Fetch failed:", err);
            return null;
        });

        clearTimeout(timeoutId);

        if (!res || !res.ok) {
            setAddress(`Coordinates: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
            return;
        }

        const data = await res.json();
        setAddress(data.display_name || `Coordinates: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
    } catch (err) {
        console.warn("Reverse geocoding suppressed:", err);
        setAddress(`Coordinates: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
    }
};

const MapPickerModal = ({ isOpen, onClose, onSelect, initialPos }) => {
    const [position, setPosition] = useState(initialPos || { lat: 25.2048, lng: 55.2708 });
    const [address, setAddress] = useState("Loading address...");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        if (initialPos && initialPos.lat && initialPos.lng) {
            setPosition(initialPos);
            reverseGeocode(initialPos.lat, initialPos.lng, setAddress).catch(() => { });
        }
    }, [initialPos]);

    if (!isOpen || !isMounted) return null;

    const modalContent = (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-4xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col h-[80vh]">
                {/* Header */}
                <div className="px-8 py-6 flex items-center justify-between border-b border-[#3c14320a]">
                    <div>
                        <h2 className="text-xl font-bold text-[#1e0a18]">Pick Location</h2>
                        <p className="text-sm text-[#3c143260]">Click on the map to set your position</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-[#f9f5f2] rounded-full transition-colors">
                        <X size={24} className="text-[#3c143280]" />
                    </button>
                </div>

                {/* Map Area */}
                <div className="flex-1 relative">
                    <MapContainer
                        center={position}
                        zoom={13}
                        style={{ height: '100%', width: '100%' }}
                        scrollWheelZoom={true}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker position={position} setPosition={setPosition} setAddress={setAddress} />
                    </MapContainer>
                </div>

                {/* Footer Info */}
                <div className="px-8 py-6 bg-[#f9f5f2]/50 border-t border-[#3c14320a]">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-start gap-3 flex-1">
                            <div className="p-2 bg-white rounded-xl text-[#7a2860] shadow-sm mt-1">
                                <MapPin size={20} />
                            </div>
                            <div className="flex-1">
                                <p className="text-[0.65rem] font-black uppercase tracking-widest text-[#3c143250] mb-1">Selected Area</p>
                                <p className="text-[0.9rem] font-bold text-[#1e0a18] line-clamp-1">{address}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={onClose}
                                className="px-8 py-3 rounded-2xl text-[0.9rem] font-bold text-[#3c143280] hover:bg-white hover:shadow-sm transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => onSelect({ ...position, address })}
                                className="px-10 py-3 bg-[#1e0a18] text-white rounded-2xl text-[0.9rem] font-bold hover:bg-[#7a2860] transition-all flex items-center gap-2 shadow-xl active:scale-95"
                            >
                                <Check size={18} />
                                Confirm Location
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
