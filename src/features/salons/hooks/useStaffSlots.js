import { useState, useEffect, useCallback } from 'react';
import { fetchStaffSlots } from '../services/salonService';

export const useStaffSlots = ({ staffId, startDate, endDate }) => {
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadSlots = useCallback(async () => {
        if (!staffId || !startDate || !endDate) {
            setSlots([]);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const data = await fetchStaffSlots(staffId, startDate, endDate);
            setSlots(data || []);
        } catch (err) {
            console.error("Failed to fetch staff slots:", err);
            setError(err.response?.data?.message || err.message || "Failed to load available slots");
            setSlots([]);
        } finally {
            setLoading(false);
        }
    }, [staffId, startDate, endDate]);

    useEffect(() => {
        loadSlots();
    }, [loadSlots]);

    return { slots, loading, error, refetch: loadSlots };
};
