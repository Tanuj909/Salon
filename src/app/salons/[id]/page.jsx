import SalonDetailsPage from "@/features/salons/components/SalonDetailsPage";

export default async function Page({ params }) {
  const { id } = await params;
  return <SalonDetailsPage id={id} />;
}
