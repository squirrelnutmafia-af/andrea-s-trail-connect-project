import { Search, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-hiking.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-20 flex items-center overflow-hidden">
      <div className="section-container w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-heading leading-tight">
                Let the Adventure
                <span className="block text-primary">Begin</span>
              </h1>
              <p className="text-lg md:text-xl text-body max-w-lg">
                Connect with outdoor enthusiasts worldwide. Discover trails, join events, and make friends who share your passion for adventure.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-xl">
              <div className="flex items-center bg-card rounded-2xl shadow-soft border border-border overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-4 flex-1">
                  <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search routes, events, or communities..."
                    className="w-full bg-transparent outline-none text-heading placeholder:text-muted-foreground"
                  />
                </div>
                <button className="bg-primary hover:bg-primary-hover text-primary-foreground px-6 py-4 transition-colors flex items-center gap-2 font-semibold">
                  <Search className="w-5 h-5" />
                  <span className="hidden sm:inline">Search</span>
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              <div>
                <p className="text-3xl font-bold text-heading">50K+</p>
                <p className="text-sm text-muted-foreground">Active Members</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-heading">2,500+</p>
                <p className="text-sm text-muted-foreground">Routes Shared</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-heading">180+</p>
                <p className="text-sm text-muted-foreground">Communities</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative lg:h-[600px] h-[400px] animate-slide-in-right" style={{ animationDelay: "0.2s" }}>
            <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-hover">
              <img
                src={heroImage}
                alt="Hikers on a mountain trail at sunrise"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-4 -left-4 bg-card rounded-2xl shadow-soft p-4 border border-border animate-scale-in" style={{ animationDelay: "0.5s" }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-heading">Next Adventure</p>
                  <p className="text-sm text-muted-foreground">Dolomites, Italy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
