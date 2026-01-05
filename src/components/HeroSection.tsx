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
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-8">
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

        {/* Activity Tags */}
        <div className="grid grid-cols-5 gap-4">
          {activities.map((activity) => (
            <a
              key={activity.name}
              href="#"
              className="group"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
                {activity.image ? (
                  <img
                    src={activity.image}
                    alt={activity.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-muted to-accent" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <span className="text-white font-semibold text-sm">{activity.name}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
