"use client";

import { useEffect, useState } from "react";
import { getSalonServices } from "../services/salonService";

export const useSalonServices = ({ id }) => {
    const [services, setServices] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }

        const handleServices = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getSalonServices(id);
                setServices(data);
            } catch (err) {
                console.error("Error fetching salon services:", err?.response?.status, err?.response?.data || err.message);
                setError("Failed to fetch Salon Services!");
            } finally {
                setLoading(false);
            }
        };

        handleServices();
    }, [id]);

    return { services, loading, error };
};
