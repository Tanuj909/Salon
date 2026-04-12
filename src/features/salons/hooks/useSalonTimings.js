import { useState, useEffect } from 'react';
import { getSalonTimings } from '../services/salonService';

export const useSalonTimings = ({ id }) => {
    const [timings, setTimings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        const fetchTimings = async () => {
            try {
                setLoading(true);
                const data = await getSalonTimings(id);
                setTimings(data);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch salon timings:", err);
                setError(err.response?.data?.message || err.message || "Failed to load timings");
            } finally {
                setLoading(false);
            }
        };

        fetchTimings();
    }, [id]);

    return { timings, loading, error };
};
