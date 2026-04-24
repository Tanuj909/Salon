"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const LocationContext = createContext();
const STORAGE_KEY = "user_preferred_location";

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isTimeout, setIsTimeout] = useState(false);

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
      if (isManualTrigger === true) {
        alert("Geolocation is not supported by your browser.");
      }
      setUAEFallback();
      return;
    }

    const timeoutId = setTimeout(() => {
      setIsTimeout(true);
      setError("Location search timed out");
      if (isManualTrigger === true) {
        alert("Location search timed out. Please try again.");
      }
      setUAEFallback();
    }, 15000);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        clearTimeout(timeoutId);
        const loc = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: Date.now(),
          isManual: false
        };
        setLocation(loc);
        if (typeof window !== "undefined") {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(loc));
        }
        setLoading(false);
      },
      (err) => {
        clearTimeout(timeoutId);
        setError("Location permission denied or failed");
        if (isManualTrigger === true) {
          if (err.code === err.PERMISSION_DENIED) {
            alert("Location access is denied. Please enable it in your browser settings or click the lock icon in the address bar to allow location.");
          } else {
            alert("Failed to detect location. Please try again.");
          }
        }
        setUAEFallback();
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 }
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
            setLoading(false);
            return;
          }
        } catch (e) {
          console.error("Failed to parse stored location", e);
        }
      }
    }

    // 2. Initial Geolocation (re-uses logic or just triggers refreshLocation)
    refreshLocation();
  }, [refreshLocation]);

  return (
    <LocationContext.Provider value={{ location, error, loading, isTimeout, saveManualLocation, refreshLocation }}>
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
