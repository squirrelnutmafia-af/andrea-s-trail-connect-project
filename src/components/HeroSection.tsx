import heroImage from "@/assets/hero-hiking.jpg";
import activityHiking from "@/assets/activity-hiking.jpg";
import activityClimbing from "@/assets/activity-climbing.jpg";
import activityCycling from "@/assets/activity-cycling.jpg";
import activityWater from "@/assets/activity-water.jpg";

const activities = [
  { name: "Hiking", image: activityHiking },
  { name: "Climbing", image: activityClimbing },
  { name: "Cycling", image: activityCycling },
  { name: "Water sports", image: activityWater },
  { name: "All activities", image: null },
];

const HeroSection = () => {
  return (
    <section className="pt-28 md:pt-32 pb-8">
      <div className="section-container">
        {/* Combined Hero Card */}
        <div className="relative rounded-3xl overflow-hidden bg-muted h-[400px] md:h-[480px]">
          {/* Background Image */}
          <img
            src={heroImage}
            alt="Hikers on a mountain trail at sunrise"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          
          {/* Content */}
          <div className="relative h-full flex flex-col justify-between p-6 md:p-10">
            {/* Top: Headline */}
            <div className="max-w-xl space-y-4 animate-fade-in">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                Adventures are better with buddies
              </h1>
              <p className="text-base md:text-lg text-white/90 max-w-md leading-relaxed">
                Join a non-profit community of outdoor lovers. Find hiking, climbing, cycling events or organise your own!
              </p>
            </div>

            {/* Bottom: Activity Tags */}
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
              {activities.map((activity) => (
                <a
                  key={activity.name}
                  href="#"
                  className="group flex-shrink-0"
                >
                  <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden bg-muted/50 backdrop-blur-sm border border-white/10">
                    {activity.image ? (
                      <img
                        src={activity.image}
                        alt={activity.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-white/20 to-white/5" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3">
                      <span className="text-white font-semibold text-xs md:text-sm">{activity.name}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
