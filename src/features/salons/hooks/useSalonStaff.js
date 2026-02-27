"use client";

import { useEffect, useState } from "react";
import { getAllSalonStaff } from "../services/salonService";

export const useSalonStaff = ({ id }) => {
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const handleStaff = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllSalonStaff(id);
        setStaff(data);
      } catch (err) {
        console.error("Error fetching salon staff:", err?.response?.status, err?.response?.data || err.message);
        setError("Failed to fetch Salon Staff!");
      } finally {
        setLoading(false);
      }
    };

    handleStaff();
  }, [id]);

  return { staff, loading, error };
};