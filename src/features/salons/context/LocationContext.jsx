"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const LocationContext = createContext();
const STORAGE_KEY = "user_preferred_location";

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isTimeout, setIsTimeout] = useState(false);
  const [showMapTrigger, setShowMapTrigger] = useState(0);

  const saveManualLocation = useCallback((lat, lng, addr = "Selected Location") => {
    const loc = { 
      latitude: lat, 
      longitude: lng, 
      address: addr,
      isManual: true,
      timestamp: Date.now() 
    };
    setLocation(loc);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(loc));
    }
    setLoading(false);
    setError(null);
  }, []);

  const refreshLocation = useCallback((isManualTrigger = false) => {
    setLoading(true);
    setError(null);
    setIsTimeout(false);

    const setUAEFallback = () => {
      const uaeLoc = {
        latitude: 25.7971,
        longitude: 56.0220,
        address: "United Arab Emirates",
        isManual: false,
        timestamp: Date.now()
      };
      setLocation(uaeLoc);
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(uaeLoc));
      }
      setLoading(false);
    };

    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      setShowMapTrigger(prev => prev + 1);
      if (isManualTrigger === true) {
        alert("Geolocation is not supported by your browser.");
      }
      setUAEFallback();
      return;
    }

    const timeoutId = setTimeout(() => {
      setIsTimeout(true);
      setError("Location search timed out");
      setShowMapTrigger(prev => prev + 1);
      if (isManualTrigger === true) {
        alert("Location search timed out. Please try again.");
      }
      setUAEFallback();
    }, 20000);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        clearTimeout(timeoutId);
        
        // Check if location is accurate enough (e.g., within 1500 meters)
        if (position.coords.accuracy > 1500) {
          setError("Location is not accurate enough");
          setShowMapTrigger(prev => prev + 1);
          if (isManualTrigger === true) {
            alert("Location is not accurate enough. Please select your location on the map.");
          }
          setUAEFallback();
          return;
        }

        const { latitude, longitude } = position.coords;
        const loc = {
          latitude,
          longitude,
          timestamp: Date.now(),
          isManual: false
        };

        // Attempt to fetch address name
        fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`, {
          headers: { 
            'Accept-Language': 'en',
            'User-Agent': 'SalonHub-LocationProvider/1.0'
          }
        })
        .then(res => res.ok ? res.json() : Promise.reject('Network response was not ok'))
        .then(data => {
          const address = data.display_name || "Current Location";
          const finalLoc = { ...loc, address };
          setLocation(finalLoc);
          if (typeof window !== "undefined") {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(finalLoc));
          }
        })
        .catch(err => {
          console.warn("Reverse geocoding failed:", err);
          const finalLoc = { ...loc, address: "Current Location" };
          setLocation(finalLoc);
          if (typeof window !== "undefined") {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(finalLoc));
          }
        })
        .finally(() => {
          setLoading(false);
        });
      },
      (err) => {
        clearTimeout(timeoutId);
        setError("Location permission denied or failed");
        setShowMapTrigger(prev => prev + 1);
        if (isManualTrigger === true) {
          if (err.code === err.PERMISSION_DENIED) {
            alert("Location access is denied. Please enable it in your browser settings or click the lock icon in the address bar to allow location.");
          } else {
            alert("Failed to detect location. Please try again.");
          }
        }
        setUAEFallback();
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
    );
  }, []);

  useEffect(() => {
    // 1. Initial check for stored location
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.latitude && parsed.longitude) {
            setLocation(parsed);
            // If it's a manual selection and has an address, we keep it and don't auto-refresh
            if (parsed.isManual && parsed.address) {
              setLoading(false);
              return;
            }
          }
        } catch (e) {
          console.error("Failed to parse stored location", e);
        }
      }
    }

    // 2. Initial Geolocation or Refresh
    // We call refreshLocation if no stored location, or if the stored location is automatic.
    refreshLocation();
  }, [refreshLocation]);

  return (
    <LocationContext.Provider value={{ location, error, loading, isTimeout, saveManualLocation, refreshLocation, showMapTrigger }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocationContext must be used within a LocationProvider');
  }
  return context;
};
