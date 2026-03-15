import { Suspense } from "react";
import SalonsPage from "@/features/salons/components/SalonsPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading salons...</div>}>
      <SalonsPage />
    </Suspense>
  );
}