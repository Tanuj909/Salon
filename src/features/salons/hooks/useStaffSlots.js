import { useState, useEffect, useCallback } from 'react';
import { fetchStaffSlots, fetchBusinessSlots } from '../services/salonService';

export const useStaffSlots = ({ staffId, businessId, startDate, endDate }) => {
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadSlots = useCallback(async () => {
        if ((!staffId && !businessId) || !startDate || !endDate) {
            setSlots([]);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            let data;
            if (staffId) {
                data = await fetchStaffSlots(staffId, startDate, endDate);
            } else {
                data = await fetchBusinessSlots(businessId, startDate, endDate);
            }
            setSlots(data || []);
        } catch (err) {
            console.error("Failed to fetch slots:", err);
            setError(err.response?.data?.message || err.message || "Failed to load available slots");
            setSlots([]);
        } finally {
            setLoading(false);
        }
    }, [staffId, businessId, startDate, endDate]);

    useEffect(() => {
        loadSlots();
    }, [loadSlots]);

    return { slots, loading, error, refetch: loadSlots };
};
