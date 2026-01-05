import { useRef } from "react";
import { ChevronLeft, ChevronRight, Mountain, Bike, Waves, Wind, Snowflake, Tent, Compass, Trees } from "lucide-react";

const activities = [
  { name: "Hiking", icon: Mountain, color: "bg-emerald-100 text-emerald-600" },
  { name: "Climbing", icon: Compass, color: "bg-orange-100 text-orange-600" },
  { name: "Cycling", icon: Bike, color: "bg-blue-100 text-blue-600" },
  { name: "Water Sports", icon: Waves, color: "bg-cyan-100 text-cyan-600" },
  { name: "Paragliding", icon: Wind, color: "bg-purple-100 text-purple-600" },
  { name: "Skiing", icon: Snowflake, color: "bg-slate-100 text-slate-600" },
  { name: "Camping", icon: Tent, color: "bg-amber-100 text-amber-600" },
  { name: "Trail Running", icon: Trees, color: "bg-green-100 text-green-600" },
];

const ActivityTags = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-12 bg-secondary/30">
      <div className="section-container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-heading">Explore Activities</h2>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full bg-card border border-border hover:bg-accent transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-body" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full bg-card border border-border hover:bg-accent transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-body" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
        >
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <button
                key={activity.name}
                className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-card border border-border hover:border-primary hover:shadow-soft transition-all duration-200 flex-shrink-0 group"
              >
                <div className={`w-10 h-10 rounded-xl ${activity.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-medium text-heading whitespace-nowrap">{activity.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ActivityTags;
