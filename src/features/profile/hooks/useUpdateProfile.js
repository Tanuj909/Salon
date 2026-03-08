import { useState } from 'react';
import { updateCustomerProfile } from '../services/profileService';

export const useUpdateProfile = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const updateProfile = async (profileData) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const data = await updateCustomerProfile(profileData);
            setSuccess(true);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Failed to update profile");
            return null;
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setLoading(false);
        setError(null);
        setSuccess(false);
    };

    return { updateProfile, loading, error, success, reset };
};
