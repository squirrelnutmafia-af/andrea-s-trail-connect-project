import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ActivityTags from "@/components/ActivityTags";
import MissionSection from "@/components/MissionSection";
import PopularRoutes from "@/components/PopularRoutes";
import CommunitiesSection from "@/components/CommunitiesSection";
import PastEvents from "@/components/PastEvents";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ActivityTags />
        <MissionSection />
        <PopularRoutes />
        <CommunitiesSection />
        <PastEvents />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
