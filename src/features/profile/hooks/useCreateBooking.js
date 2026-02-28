"use client";

import { useState, useCallback } from "react";
import { createBooking } from "../services/bookingService";

export const useCreateBooking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);

  const submitBooking = useCallback(async (bookingData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setBookingResult(null);
    try {
      const result = await createBooking(bookingData);
      setBookingResult(result);
      setSuccess(true);
      return result;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to create booking. Please try again.";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setSuccess(false);
    setBookingResult(null);
  }, []);

  return {
    submitBooking,
    loading,
    error,
    success,
    bookingResult,
    reset,
  };
};
