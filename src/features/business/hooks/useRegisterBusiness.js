"use client";

import { useState } from "react";
import { registerBusiness } from "../services/businessService";

export const useRegisterBusiness = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitBusiness = async (payload) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      await registerBusiness(payload);

      setSuccess(true);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to register business"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    submitBusiness,
    loading,
    error,
    success,
  };
};