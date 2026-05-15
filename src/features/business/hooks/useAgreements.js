"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchAgreements } from "../services/agreementService";

export const useAgreements = (businessId) => {
  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchAgreementsCallback = useCallback(async (page = 0, isLoadMore = false) => {
    if (!businessId) return;

    try {
      if (page === 0) setLoading(true);
      const data = await fetchAgreements(businessId, page);
      
      const newAgreements = data.content;
      setAgreements(prev => isLoadMore ? [...prev, ...newAgreements] : newAgreements);
      setHasMore(!data.last);
      setCurrentPage(data.number);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch agreements:", err);
      setError(err.response?.data?.message || "Failed to fetch agreements");
    } finally {
      if (page === 0) setLoading(false);
    }
  }, [businessId]);

  useEffect(() => {
    fetchAgreementsCallback(0);
  }, [fetchAgreementsCallback]);

  const loadMore = () => {
    if (hasMore && !loading) {
      fetchAgreementsCallback(currentPage + 1, true);
    }
  };

  const refreshAgreements = () => {
    fetchAgreementsCallback(0);
  };

  return {
    agreements,
    loading,
    error,
    hasMore,
    loadMore,
    refreshAgreements,
  };
};
