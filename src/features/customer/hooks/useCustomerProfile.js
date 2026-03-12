import { useState, useEffect } from 'react';
import { getCustomerProfile } from '../services/customerService';

export const useCustomerProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProfile = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getCustomerProfile();
            setProfile(data);
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Failed to fetch profile");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return { profile, loading, error, refetch: fetchProfile };
};
