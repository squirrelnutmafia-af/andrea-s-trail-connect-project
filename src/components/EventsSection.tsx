import { useRef } from "react";
import { ChevronLeft, ChevronRight, Bookmark, Star, Users } from "lucide-react";
import eventSummit from "@/assets/event-summit.jpg";
import eventClimbing from "@/assets/event-climbing.jpg";
import eventKayaking from "@/assets/event-kayaking.jpg";
import eventCycling from "@/assets/event-cycling.jpg";

const events = [
  {
    title: "Munich Co-Founder Matching / Find your Co-Founder",
    organizer: "Munich Co-Founder Matching / Fin...",
    rating: 4.6,
    date: "Tue, Jan 13, 2026 · 4:45 PM CET",
    attendees: 62,
    image: eventSummit,
    soldOut: false,
  },
  {
    title: "Entrepreneur Meetup / Unternehmertreffen in München",
    organizer: "Munich's Entrepreneurs",
    rating: 4.5,
    date: "Tue, Jan 13, 2026 · 6:00 PM CET",
    attendees: 76,
    image: eventClimbing,
    soldOut: false,
  },
  {
    title: "AI Product Managers' Work & Wine Session",
    organizer: "Becoming AI Product Manager Gro...",
    rating: 4.4,
    date: "Wed, Jan 7, 2026 · 6:00 PM CET",
    attendees: 6,
    image: eventKayaking,
    soldOut: true,
  },
  {
    title: "Munich Bar Crawl",
    organizer: "The Munich Connection",
    rating: null,
    date: "Fri, Jan 9, 2026 · 7:00 PM CET",
    attendees: 37,
    image: eventCycling,
    soldOut: false,
  },
];

const EventsSection = () => {
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
    <section className="section-padding bg-background">
      <div className="section-container">
        <div className="flex items-center justify-between mb-8">
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
          className="flex gap-5 overflow-x-auto scrollbar-hide pb-4"
        >
          {events.map((event, index) => (
            <article
              key={event.title}
              className="flex-shrink-0 w-72 group bg-card rounded-2xl overflow-hidden border border-border card-hover animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {event.soldOut && (
                  <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded">
                    Sold out - Join waiting list
                  </div>
                )}
                <button 
                  className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-lg flex items-center justify-center hover:bg-white transition-colors"
                  aria-label="Bookmark event"
                >
                  <Bookmark className="w-4 h-4 text-heading" />
                </button>
              </div>

              <div className="p-4 space-y-2">
                <p className="text-xs text-muted-foreground">{event.date}</p>
                <h3 className="font-bold text-heading text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span>by {event.organizer}</span>
                  {event.rating && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-0.5">
                        {event.rating}
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      </span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground pt-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>{event.attendees} attendees</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
