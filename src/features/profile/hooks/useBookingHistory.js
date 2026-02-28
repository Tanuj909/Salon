"use client";

import { useEffect, useState, useCallback } from "react";
import { getMyBusinessBookings } from "../services/bookingService";

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
    pageSize: 20,
  });

  const fetchBookings = useCallback(async (pageNum = 0) => {
    if (!businessId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await getMyBusinessBookings(businessId, pageNum);
      setBookings(data.content || []);
      setPagination({
        totalPages: data.totalPages || 0,
        totalElements: data.totalElements || 0,
        isFirst: data.first ?? true,
        isLast: data.last ?? true,
        currentPage: data.number || 0,
        pageSize: data.size || 20,
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

  return {
    bookings,
    loading,
    error,
    pagination,
    nextPage,
    prevPage,
    goToPage,
    refetch: () => fetchBookings(page),
  };
};
