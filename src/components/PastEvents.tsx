import { useRef } from "react";
import { ChevronLeft, ChevronRight, Calendar, MapPin, Users } from "lucide-react";
import eventSummit from "@/assets/event-summit.jpg";
import eventClimbing from "@/assets/event-climbing.jpg";
import eventKayaking from "@/assets/event-kayaking.jpg";
import eventCycling from "@/assets/event-cycling.jpg";

const events = [
  {
    title: "Sunrise Summit Hike",
    location: "Swiss Alps",
    date: "Dec 15, 2025",
    attendees: 24,
    image: eventSummit,
  },
  {
    title: "Rock Climbing Weekend",
    location: "Red Rocks, Nevada",
    date: "Dec 20, 2025",
    attendees: 16,
    image: eventClimbing,
  },
  {
    title: "Alpine Lake Kayaking",
    location: "Lake Louise, Canada",
    date: "Jan 5, 2026",
    attendees: 12,
    image: eventKayaking,
  },
  {
    title: "Mountain Bike Trail Day",
    location: "Black Forest, Germany",
    date: "Jan 12, 2026",
    attendees: 32,
    image: eventCycling,
  },
];

const PastEvents = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="section-padding bg-secondary/20">
      <div className="section-container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-heading mb-2">
              Upcoming Events
            </h2>
            <p className="text-body">
              Join fellow adventurers on exciting group expeditions
            </p>
          </div>
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-3 rounded-full bg-card border border-border hover:bg-accent transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-body" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3 rounded-full bg-card border border-border hover:bg-accent transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-body" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
        >
          {events.map((event, index) => (
            <article
              key={event.title}
              className="flex-shrink-0 w-80 group bg-card rounded-2xl overflow-hidden border border-border card-hover animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-primary-foreground/90 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-bold text-lg text-heading group-hover:text-primary transition-colors">
                  {event.title}
                </h3>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{event.attendees} going</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PastEvents;
