"use client";

import { useLocationContext } from "../context/LocationContext";

/**
 * Hook to access the global user location state.
 * Refactored to use LocationContext for app-wide synchronization.
 */
export const useUserLocation = () => useLocationContext();
