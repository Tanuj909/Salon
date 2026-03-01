"use client";

import { useEffect, useState, useCallback } from "react";
import { getMyBookings, getMyBusinessBookings, cancelMyBooking } from "../services/bookingService";
import { createReview } from "../../salons/services/reviewService";

export const useBookingHistory = (businessId) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [pagination, setPagination] = useState({
    totalPages: 0,
    totalElements: 0,
    isFirst: true,
    isLast: true,
    currentPage: 0,
    pageSize: 10,
  });

  const [isCanceling, setIsCanceling] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const fetchBookings = useCallback(async (pageNum = 0) => {

    setLoading(true);
    setError(null);
    try {
      const data = businessId
        ? await getMyBusinessBookings(businessId, pageNum, 10, "bookingDate,asc")
        : await getMyBookings(pageNum, 10, "bookingDate,asc");

      setBookings(data.content || []);
      setPagination({
        totalPages: data.totalPages || 0,
        totalElements: data.totalElements || 0,
        isFirst: data.first ?? true,
        isLast: data.last ?? true,
        currentPage: data.number || 0,
        pageSize: data.size || 10,
      });
      setPage(pageNum);
    } catch (err) {
      setError("Failed to fetch booking history");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, [businessId]);

  useEffect(() => {
    fetchBookings(0);
  }, [fetchBookings]);

  const nextPage = () => {
    if (!pagination.isLast) {
      fetchBookings(page + 1);
    }
  };

  const prevPage = () => {
    if (!pagination.isFirst) {
      fetchBookings(page - 1);
    }
  };

  const goToPage = (pageNum) => {
    if (pageNum >= 0 && pageNum < pagination.totalPages) {
      fetchBookings(pageNum);
    }
  };

  const cancelBooking = async (bookingId, reason) => {
    setIsCanceling(true);
    try {
      await cancelMyBooking(bookingId, reason);
      // Refetch to get updated status
      await fetchBookings(page);
      return true;
    } catch (err) {
      console.error("Error canceling booking:", err);
      return false;
    } finally {
      setIsCanceling(false);
    }
  };

  const submitReview = async (reviewData) => {
    setIsSubmittingReview(true);
    try {
      await createReview(reviewData);
      // Wait for completion, then optional refetch or UI update can happen.
      return true;
    } catch (err) {
      console.error("Error creating review:", err);
      return false;
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return {
    bookings,
    loading,
    error,
    pagination,
    isCanceling,
    isSubmittingReview,
    nextPage,
    prevPage,
    goToPage,
    cancelBooking,
    submitReview,
    refetch: () => fetchBookings(page),
  };
};
