"use client";

import { useSalonDetails } from "../hooks/useSalonDetails";

export default function SalonDetailsPage({ id }) {
  const { salon, loading, error } = useSalonDetails(id);

  if (loading) return <p>Loading salon details...</p>;
  if (error) return <p>{error}</p>;
  if (!salon) return <p>Salon not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{salon.name}</h1>

      <p className="text-gray-600 mb-4">
        {salon.description}
      </p>

      <div className="space-y-2">
        <p><strong>Phone:</strong> {salon.phoneNumber}</p>
        <p><strong>Email:</strong> {salon.email}</p>
        <p>
          <strong>Address:</strong> {salon.address}, {salon.city},{" "}
          {salon.country}
        </p>
        <p><strong>Status:</strong> {salon.verificationStatus}</p>
        <p><strong>Open:</strong> {salon.isOpen ? "Yes" : "No"}</p>
        <p><strong>Rating:</strong> {salon.averageRating}</p>
        <p><strong>Total Reviews:</strong> {salon.totalReviews}</p>
      </div>

      {salon.categories?.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Categories:</h3>
          <ul className="list-disc ml-6">
            {salon.categories.map((cat) => (
              <li key={cat.id}>{cat.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}