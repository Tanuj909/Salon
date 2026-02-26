"use client";

import { useEffect, useState } from "react";
import { fetchSalonById } from "../services/salonService";

export const useSalonDetails = (id) => {
  const [salon, setSalon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadSalon() {
      try {
        const data = await fetchSalonById(id);
        setSalon(data);
      } catch (err) {
        setError("Failed to fetch salon details");
      } finally {
        setLoading(false);
      }
    }

    if (id) loadSalon();
  }, [id]);

  return { salon, loading, error };
};
