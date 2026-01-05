import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ActivityTags from "@/components/ActivityTags";
import MissionSection from "@/components/MissionSection";
import EventsSection from "@/components/EventsSection";
import PopularRoutes from "@/components/PopularRoutes";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ActivityTags />
        <MissionSection />
        <EventsSection />
        <PopularRoutes />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
