import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MissionSection from "@/components/MissionSection";
import EventsSection from "@/components/EventsSection";
import PopularRoutes from "@/components/PopularRoutes";
import Footer from "@/components/Footer";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <div className="flex items-center justify-center pt-6">
          <div
            className={cn(
              "group rounded-full border border-border/40 bg-muted/30 text-base transition-all ease-in hover:cursor-pointer hover:bg-muted/50"
            )}
          >
            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1.5 transition ease-out hover:text-foreground hover:duration-300">
              <span>✨ Now booking summer adventures</span>
              <ArrowRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedShinyText>
          </div>
        </div>
        <HeroSection />
        <MissionSection />
        <EventsSection />
        <PopularRoutes />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
