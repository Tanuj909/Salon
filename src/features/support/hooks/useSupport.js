"use client";

import { useState, useCallback } from "react";
import { fetchMyQueries, submitContactQuery } from "../services/supportService";

export const useSupport = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState(null);

  const loadQueries = useCallback(async (page = 0, isLoadMore = false) => {
    try {
      setLoading(true);
      const data = await fetchMyQueries(page, 10);
      
      const newQueries = data.content || [];
      setQueries(prev => isLoadMore ? [...prev, ...newQueries] : newQueries);
      setHasMore(!data.last);
      setCurrentPage(data.pageable?.pageNumber ?? page);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch support queries:", err);
      setError(err.response?.data?.message || "Failed to load queries");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = () => {
    if (hasMore && !loading) {
      loadQueries(currentPage + 1, true);
    }
  };

  const submitQuery = async (queryData) => {
    try {
      setSubmitting(true);
      const newQuery = await submitContactQuery(queryData);
      setQueries(prev => [newQuery, ...prev]);
      setError(null);
      return newQuery;
    } catch (err) {
      console.error("Failed to submit support query:", err);
      setError(err.response?.data?.message || "Failed to submit query");
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  const resetQueries = () => {
    setQueries([]);
    setCurrentPage(0);
    setHasMore(false);
  };

  return {
    queries,
    loading,
    submitting,
    hasMore,
    error,
    loadQueries,
    loadMore,
    submitQuery,
    resetQueries,
  };
};
