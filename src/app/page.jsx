import HeroSection from "@/features/home/components/HeroSection";
import Categories from "@/features/home/components/Categories";
import ServicesSection from "@/features/home/components/ServicesSection";
import RecomendedSallon from "@/features/home/components/RecomendedSallon";
import AboutSection from "@/features/home/components/AboutSection";
import ClientReviews from "@/features/home/components/ClientReviews";
import GallerySection from "@/features/home/components/GallerySection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <RecomendedSallon />
      <Categories />
      {/* <GallerySection/> */}
      <AboutSection />
      <ClientReviews/>
    </main>
  );
}

