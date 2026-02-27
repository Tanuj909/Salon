"use client";

import { useState } from "react";
import { getStaffProfile } from "../services/salonService";

export const useStaffProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = async (staffId) => {
    if (!staffId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getStaffProfile(staffId);
      setProfile(data);
    } catch (err) {
      console.error("Error fetching staff profile:", err?.response?.status, err?.response?.data || err.message);
      setError("Failed to load staff profile.");
    } finally {
      setLoading(false);
    }
  };

  const clearProfile = () => {
    setProfile(null);
    setError(null);
  };

  return { profile, loading, error, fetchProfile, clearProfile };
};
