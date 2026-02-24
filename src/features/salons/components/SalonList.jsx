import Link from "next/link";

export default function SalonList({ salons }) {
  if (!salons || salons.length === 0) {
    return <p>No salons found nearby.</p>;
  }

  return (
    <div className="grid gap-4">
      {salons.map((salon) => (
        <div key={salon.id} className="border p-4 rounded">
          <h3 className="font-semibold">{salon.name}</h3>
          <p>{salon.location}</p>
        </div>
      ))}
    </div>
  );
}