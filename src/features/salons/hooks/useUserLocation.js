"use client";

import { useState, useEffect } from "react";

export const useUserLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isTimeout, setIsTimeout] = useState(false);

  useEffect(() => {
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
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        clearTimeout(timeoutId);
        setError("Location permission denied");
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );

    return () => clearTimeout(timeoutId);
  }, []);

  return { location, error, loading, isTimeout };
};
