"use client";

import { useEffect, useState, useCallback } from "react";
import { getBusinessReviews } from "../services/reviewService";

export const useSalonReviews = (businessId) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(0);
    const [pagination, setPagination] = useState({
        totalPages: 0,
        totalElements: 0,
        isFirst: true,
        isLast: true,
        currentPage: 0,
        pageSize: 10,
    });

    const fetchReviews = useCallback(async (pageNum = 0) => {
        if (!businessId) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const data = await getBusinessReviews(businessId, pageNum);
            setReviews(data.content || []);
            setPagination({
                totalPages: data.totalPages || 0,
                totalElements: data.totalElements || 0,
                isFirst: data.first ?? true,
                isLast: data.last ?? true,
                currentPage: data.number || 0,
                pageSize: data.size || 10,
            });
            setPage(pageNum);
        } catch (err) {
            setError("Failed to fetch reviews.");
            setReviews([]);
        } finally {
            setLoading(false);
        }
    }, [businessId]);

    useEffect(() => {
        fetchReviews(0);
    }, [fetchReviews]);

    const nextPage = () => {
        if (!pagination.isLast) {
            fetchReviews(page + 1);
        }
    };

    const prevPage = () => {
        if (!pagination.isFirst) {
            fetchReviews(page - 1);
        }
    };

    return {
        reviews,
        loading,
        error,
        pagination,
        nextPage,
        prevPage,
        refetch: () => fetchReviews(page),
    };
};
