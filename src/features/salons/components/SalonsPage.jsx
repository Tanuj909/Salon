"use client";

import { useNearbySalons } from "../hooks/useNearbySalons";
import SalonList from "./SalonList";

export default function SalonsPage() {
    const { salons, loading, isFallback } = useNearbySalons();

    if (loading) return <p>Loading nearby salons...</p>;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Nearby Salons</h1>

            {isFallback && (
                <p className="text-sm text-yellow-600 mb-4">
                    Showing popular salons in your city
                </p>
            )}

            <SalonList salons={salons} />
        </div>
    );
}