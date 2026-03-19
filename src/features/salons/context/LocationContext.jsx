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

  const refreshLocation = useCallback(() => {
    setLoading(true);
    setError(null);
    setIsTimeout(false);

    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      setLoading(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      setIsTimeout(true);
      setLoading(false);
      setError("Location search timed out");
    }, 10000);

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
        setError("Location permission denied");
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
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
