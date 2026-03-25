"use client";

import { useState, useEffect, useCallback } from "react";
import { getMyBusiness } from "../services/businessService";
import { useAuth } from "@/features/auth/hooks/useAuth";

export const useMyBusiness = () => {
  const { user } = useAuth();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBusiness = useCallback(async () => {
    if (!user) {
      setBusiness(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await getMyBusiness();
      setBusiness(data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch business:", err);
      setBusiness(null);
      // We don't necessarily want to show an error if the user just doesn't have a business
      if (err.response?.status !== 404) {
        setError(err.response?.data?.message || "Failed to fetch business details");
      }
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchBusiness();
  }, [fetchBusiness]);

  return {
    business,
    loading,
    error,
    refreshBusiness: fetchBusiness,
  };
};
