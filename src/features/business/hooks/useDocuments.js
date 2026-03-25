"use client";

import { useState, useEffect, useCallback } from "react";
import { getDocuments } from "../services/businessService";

export const useDocuments = (businessId) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDocuments = useCallback(async () => {
    if (!businessId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await getDocuments(businessId);
      setDocuments(data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch documents:", err);
      // Don't set error if it's a 404 (just means no documents yet)
      if (err.response?.status !== 404) {
        setError(err.response?.data?.message || "Failed to fetch documents");
      } else {
        setDocuments([]);
      }
    } finally {
      setLoading(false);
    }
  }, [businessId]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  return {
    documents,
    loading,
    error,
    refreshDocuments: fetchDocuments,
  };
};
