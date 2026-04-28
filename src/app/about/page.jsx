import AboutSection from "@/features/home/components/AboutSection";

export const metadata = {
  title: "About Us | Fast Booking Service",
  description: "Learn more about Fast Booking Service, our story, expertise, and the elevated experiences we bring to our clients.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24 md:pt-32">
      <AboutSection />
    </main>
  );
}
