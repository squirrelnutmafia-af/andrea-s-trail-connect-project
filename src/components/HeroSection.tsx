import heroImage from "@/assets/hero-hiking.jpg";

const HeroSection = () => {
  return (
    <section className="pt-28 md:pt-32 pb-12 md:pb-16">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-heading leading-tight">
              Adventures are better with buddies
            </h1>
            <p className="text-lg text-body max-w-lg leading-relaxed">
              Hiking Buddies is a non-profit community of outdoor and sport lovers. Join an upcoming hiking, climbing, cycling - you name it - event or organise your own and enjoy your adventures with like-minded people!
            </p>
          </div>

          {/* Right Image */}
          <div className="relative lg:h-[420px] h-[300px] animate-slide-in-right" style={{ animationDelay: "0.2s" }}>
            <div className="absolute inset-0 rounded-3xl overflow-hidden bg-muted">
              <img
                src={heroImage}
                alt="Hikers on a mountain trail at sunrise"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
