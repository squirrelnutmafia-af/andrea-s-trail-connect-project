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

const ActivityTags = () => {
  return (
    <section className="py-8">
      <div className="section-container">
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

export default ActivityTags;
