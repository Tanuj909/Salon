"use client";

import { useEffect, useState } from "react";
import { getCustomerProfile } from "../services/customerService";

export const useCurrentCustomer = () => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCustomer() {
      try {
        const data = await getCustomerProfile();
        setCustomer(data);
      } catch (err) {
        setError("Failed to fetch customer profile");
      } finally {
        setLoading(false);
      }
    }

    loadCustomer();
  }, []);

  return { customer, loading, error };
};