"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "user_preferred_location";

export const useUserLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isTimeout, setIsTimeout] = useState(false);

  const saveManualLocation = (lat, lng, addr = "Selected Location") => {
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
  };

  useEffect(() => {
    // Initial check for stored location
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

    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      setLoading(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      if (!location && !error) {
        setIsTimeout(true);
        setLoading(false);
        setError("Location search timed out");
      }
    }, 10000); // 10 seconds timeout

    navigator.geolocation.getCurrentPosition(
      (position) => {
        clearTimeout(timeoutId);
        setLocation(prev => {
          // If we already have a manual location (set while this was pending), don't overwrite it
          if (prev?.isManual) return prev;
          return {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
        });
        setLoading(false);
      },
      (err) => {
        clearTimeout(timeoutId);
        setError(prevError => {
          // If we already have a location (manual/stored), don't show an error
          if (location || (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY))) {
            return null;
          }
          return "Location permission denied";
        });
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );

    return () => clearTimeout(timeoutId);
  }, []);

  return { location, error, loading, isTimeout, saveManualLocation };
};
