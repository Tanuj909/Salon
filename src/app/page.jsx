import HeroSection from "@/features/home/components/HeroSection";
import HomeCategories from "@/features/home/components/HomeCategories";
import Categories from "@/features/home/components/Categories";
import ServicesSection from "@/features/home/components/ServicesSection";
import RecomendedSallon from "@/features/home/components/RecomendedSallon";

import ClientReviews from "@/features/home/components/ClientReviews";
import GallerySection from "@/features/home/components/GallerySection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <HomeCategories />
      {/* <ServicesSection />s */}
      <RecomendedSallon />
      <Categories />
      {/* <GallerySection/> */}

      {/* <ClientReviews/> */}
    </main>
  );
}

