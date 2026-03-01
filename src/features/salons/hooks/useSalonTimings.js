import { useState, useEffect } from 'react';
import axios from 'axios';

export const useSalonTimings = ({ id }) => {
    const [timings, setTimings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        const fetchTimings = async () => {
            try {
                setLoading(true);
                // The API endpoint from the user request
                const response = await axios.get(`http://72.62.231.235:8080/api/business-timings/business/${id}`);
                setTimings(response.data);
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
