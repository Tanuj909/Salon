"use client";

import { useState, useEffect } from 'react';
import { fetchActiveCategories } from '../../../features/salons/services/salonService';

const useActiveCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const data = await fetchActiveCategories();
        setCategories(data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching active categories:', err);
        setError(err.message || 'Failed to load categories');
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return { categories, loading, error };
};

export default useActiveCategories;