"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { fetchNearbySalons } from "../services/salonService";
import { useUserLocation } from "./useUserLocation";

export const useNearbySalons = () => {
  const { location: browserLocation, error: locationError } = useUserLocation();

  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFallback, setIsFallback] = useState(false);

  // Search parameters state
  const [searchParams, setSearchParams] = useState({
    lat: null,
    lng: null,
    radius: 20,
    address: ""
  });

  // Track if we've already initialized with browser location
  const initialized = useRef(false);

  // Initialize with browser location if not already manually set
  useEffect(() => {
    if (browserLocation && !searchParams.lat && !initialized.current) {
      setSearchParams(prev => ({
        ...prev,
        lat: browserLocation.latitude,
        lng: browserLocation.longitude,
        address: "Current Location"
      }));
      initialized.current = true;
    }
  }, [browserLocation, searchParams.lat]);

  // Handle location errors
  useEffect(() => {
    if (locationError && !searchParams.lat && !initialized.current) {
      // If we don't have a location and there's an error, but we haven't manually searched
      // We can set a default location or show the error
      // Let's not set error yet to allow manual typing
    }
  }, [locationError, searchParams.lat]);

  const loadSalons = useCallback(async (params) => {
    if (!params.lat || !params.lng) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await fetchNearbySalons(
        params.lat,
        params.lng,
        params.radius
      );

      setSalons(data || []);
      // If we got an empty array, it's not exactly an error but a state we should handle
      setIsFallback(data && data.length === 0);
    } catch (err) {
      setError("Failed to fetch salons. Please check your connection.");
      setSalons([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch when search params change
  useEffect(() => {
    if (searchParams.lat && searchParams.lng) {
      loadSalons(searchParams);
    }
  }, [searchParams.lat, searchParams.lng, searchParams.radius, loadSalons]);

  const updateParams = (newParams) => {
    setSearchParams(prev => ({ ...prev, ...newParams }));
  };

  const useCurrentLocation = () => {
    if (browserLocation) {
      updateParams({
        lat: browserLocation.latitude,
        lng: browserLocation.longitude,
        address: "Current Location"
      });
    } else {
      // Re-trigger location detection if possible
      navigator.geolocation.getCurrentPosition(
        (position) => {
          updateParams({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: "Current Location"
          });
        },
        () => {
          setError("Could not access your location. Please select manually.");
        }
      );
    }
  };

  return {
    salons,
    loading,
    error,
    isFallback,
    searchParams,
    updateParams,
    useCurrentLocation,
    retry: () => loadSalons(searchParams)
  };
};