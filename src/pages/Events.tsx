import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronDown, Mountain, Bike, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Event {
  id: string;
  time: string;
  duration: string;
  title: string;
  organizer: string;
  organizerAvatar: string;
  image: string;
  departureLocation: string;
  transportMethod: string;
  activityType: "Hiking" | "Cycling";
  difficulty: string;
  distance: string;
  elevation: string;
  totalHeight: string;
  heightType: "height" | "descent";
  coming: number;
  available?: number;
  waitlist?: number;
  participants: string[];
}

interface EventGroup {
  date: string;
  events: Event[];
}

const eventGroups: EventGroup[] = [
  {
    date: "Tomorrow, Saturday",
    events: [
      {
        id: "1",
        time: "6:45",
        duration: "3 days",
        title: "A very long event name bla second line",
        organizer: "Jessica",
        organizerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200&h=150&fit=crop",
        departureLocation: "Munich Hbf, pl 29",
        transportMethod: "Train",
        activityType: "Hiking",
        difficulty: "T3",
        distance: "18km",
        elevation: "1982 elevation",
        totalHeight: "1800 total height",
        heightType: "height",
        coming: 12,
        available: 4,
        participants: [
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face",
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&h=50&fit=crop&crop=face",
          "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=50&h=50&fit=crop&crop=face",
        ],
      },
      {
        id: "2",
        time: "6:45",
        duration: "12 hours",
        title: "Rofanspitze",
        organizer: "Helena",
        organizerAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
        image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=200&h=150&fit=crop",
        departureLocation: "Munich",
        transportMethod: "Carpool",
        activityType: "Cycling",
        difficulty: "T3",
        distance: "18km",
        elevation: "1982 elevation",
        totalHeight: "1800 descent",
        heightType: "descent",
        coming: 20,
        waitlist: 20,
        participants: [
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&h=50&fit=crop&crop=face",
          "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=50&h=50&fit=crop&crop=face",
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=face",
        ],
      },
      {
        id: "3",
        time: "6:45",
        duration: "1 day",
        title: "Tannheimer Berge",
        organizer: "John Doe",
        organizerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
        image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=200&h=150&fit=crop",
        departureLocation: "Munich",
        transportMethod: "Bus",
        activityType: "Hiking",
        difficulty: "T3",
        distance: "18km",
        elevation: "1982 elevation",
        totalHeight: "2234 total height",
        heightType: "height",
        coming: 12,
        available: 4,
        participants: [
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face",
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&h=50&fit=crop&crop=face",
          "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=50&h=50&fit=crop&crop=face",
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=face",
        ],
      },
      {
        id: "4",
        time: "8:00",
        duration: "12 days",
        title: "Event name bla second line",
        organizer: "Freddy",
        organizerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
        image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=200&h=150&fit=crop",
        departureLocation: "Munich Hbf",
        transportMethod: "No transport",
        activityType: "Hiking",
        difficulty: "T3",
        distance: "18km",
        elevation: "1982 elevation",
        totalHeight: "1800 descent",
        heightType: "descent",
        coming: 20,
        waitlist: 20,
        participants: [
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face",
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&h=50&fit=crop&crop=face",
          "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=50&h=50&fit=crop&crop=face",
        ],
      },
    ],
  },
  {
    date: "Jun 23, Sunday",
    events: [
      {
        id: "5",
        time: "6:45",
        duration: "12 hours",
        title: "Event name bla second line",
        organizer: "Larissa",
        organizerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=face",
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=200&h=150&fit=crop",
        departureLocation: "Zurich Hbf",
        transportMethod: "Bus",
        activityType: "Hiking",
        difficulty: "T3",
        distance: "18km",
        elevation: "1982 elevation",
        totalHeight: "2234 total height",
        heightType: "height",
        coming: 12,
        available: 4,
        participants: [
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face",
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&h=50&fit=crop&crop=face",
          "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=50&h=50&fit=crop&crop=face",
        ],
      },
      {
        id: "6",
        time: "6:45",
        duration: "1 day",
        title: "Hiking the highest peak",
        organizer: "Laurence",
        organizerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200&h=150&fit=crop",
        departureLocation: "Munich deutsche...",
        transportMethod: "No transport",
        activityType: "Hiking",
        difficulty: "T3",
        distance: "18km",
        elevation: "1982 elevation",
        totalHeight: "1800 decent",
        heightType: "descent",
        coming: 20,
        waitlist: 20,
        participants: [
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face",
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&h=50&fit=crop&crop=face",
          "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=50&h=50&fit=crop&crop=face",
        ],
      },
    ],
  },
];

interface SidebarEvent {
  date: string;
  day: string;
  title: string;
  time: string;
  location: string;
  transport: string;
  difficulty: string;
  activity: string;
  distance: string;
  elevation: string;
  participants: string[];
  additionalCount: number;
  organizer: string;
  isFull?: boolean;
  isPast?: boolean;
}

const upcomingEvents: SidebarEvent[] = [
  {
    date: "Jun 30",
    day: "Sat",
    title: "Full-carpool After Work hike to Kampenwand",
    time: "6:45",
    location: "Munich",
    transport: "Train",
    difficulty: "Medium",
    activity: "Cycling",
    distance: "18km",
    elevation: "560m",
    participants: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    ],
    additionalCount: 14,
    organizer: "Jean-Chrisian",
    isFull: true,
  },
  {
    date: "Jun 30",
    day: "Sat",
    title: "Full-carpool After Work hike to Kampenwand",
    time: "6:45",
    location: "Munich",
    transport: "Train",
    difficulty: "Medium",
    activity: "Cycling",
    distance: "18km",
    elevation: "560m",
    participants: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    ],
    additionalCount: 14,
    organizer: "Jean-Chrisian",
    isFull: true,
  },
];

const pastEvents: SidebarEvent[] = [
  {
    date: "Jun 30",
    day: "Sat",
    title: "Full-carpool After Work hike to Kampenwand",
    time: "6:45",
    location: "Munich",
    transport: "Train",
    difficulty: "Medium",
    activity: "Cycling",
    distance: "18km",
    elevation: "560m",
    participants: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    ],
    additionalCount: 14,
    organizer: "Jean-Chrisian",
    isPast: true,
  },
];

const ActivityIcon = ({ type }: { type: "Hiking" | "Cycling" }) => {
  if (type === "Cycling") {
    return <Bike className="w-4 h-4" />;
  }
  return <Mountain className="w-4 h-4" />;
};

const AvatarStack = ({ avatars, max = 4 }: { avatars: string[]; max?: number }) => {
  const displayed = avatars.slice(0, max);
  return (
    <div className="flex -space-x-2">
      {displayed.map((avatar, i) => (
        <img
          key={i}
          src={avatar}
          alt=""
          className="w-7 h-7 rounded-full border-2 border-white object-cover"
        />
      ))}
    </div>
  );
};

const EventRow = ({ event }: { event: Event }) => (
  <article className="grid grid-cols-[80px_1fr_160px_200px_180px] gap-4 py-4 border-b border-border/50 items-start hover:bg-muted/30 transition-colors cursor-pointer">
    {/* Time & Duration */}
    <div>
      <div className="font-semibold text-heading">{event.time}</div>
      <div className="text-sm text-muted-foreground">{event.duration}</div>
    </div>

    {/* Event Info */}
    <div className="flex gap-3">
      <img
        src={event.image}
        alt={event.title}
        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
      />
      <div className="min-w-0">
        <h3 className="font-medium text-heading leading-tight line-clamp-2">{event.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <img
            src={event.organizerAvatar}
            alt={event.organizer}
            className="w-5 h-5 rounded-full object-cover"
          />
          <span className="text-sm text-muted-foreground">by {event.organizer}</span>
        </div>
      </div>
    </div>

    {/* Departure */}
    <div>
      <div className="text-sm text-heading">{event.departureLocation}</div>
      <div className="text-sm text-muted-foreground">by {event.transportMethod}</div>
    </div>

    {/* Activity */}
    <div>
      <div className="flex items-center gap-2">
        <ActivityIcon type={event.activityType} />
        <span className="text-sm">{event.activityType}</span>
        <Badge variant="outline" className="text-xs px-1.5 py-0 h-5 bg-primary/10 text-primary border-primary/20">
          {event.difficulty}
        </Badge>
      </div>
      <div className="text-sm text-muted-foreground mt-1">
        {event.distance} • {event.elevation} • {event.totalHeight}
      </div>
    </div>

    {/* Participants */}
    <div className="text-right">
      <div className="text-sm">
        <span className="text-heading">{event.coming} coming</span>
        {event.available && (
          <span className="text-primary"> / {event.available} available</span>
        )}
        {event.waitlist && (
          <span className="text-muted-foreground"> / {event.waitlist} in waitlist</span>
        )}
      </div>
      <div className="flex justify-end mt-2">
        <AvatarStack avatars={event.participants} />
      </div>
    </div>
  </article>
);

const SidebarEventCard = ({ event }: { event: SidebarEvent }) => (
  <div className="flex gap-3 py-4 border-b border-border/50 last:border-0">
    <div className="text-center flex-shrink-0 w-12">
      <div className="text-sm font-medium text-heading">{event.date}</div>
      <div className="text-xs text-muted-foreground">{event.day}</div>
    </div>
    <div className="min-w-0 flex-1">
      <h4 className="font-medium text-heading text-sm leading-tight line-clamp-2">
        {event.title}
      </h4>
      <div className="text-xs text-muted-foreground mt-1">
        at {event.time} · from {event.location} · by {event.transport}
      </div>
      <div className="flex items-center gap-2 mt-2 flex-wrap">
        <Badge variant="outline" className="text-xs px-2 py-0.5 bg-muted">
          {event.difficulty}
        </Badge>
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Bike className="w-3 h-3" /> {event.activity}
        </span>
        <span className="text-xs text-muted-foreground">↔ {event.distance}</span>
        <span className="text-xs text-muted-foreground">↗ {event.elevation}</span>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <div className="flex -space-x-1.5">
          {event.participants.map((avatar, i) => (
            <img
              key={i}
              src={avatar}
              alt=""
              className="w-5 h-5 rounded-full border border-white object-cover"
            />
          ))}
        </div>
        <span className="text-xs text-muted-foreground">
          +{event.additionalCount}, by {event.organizer}
        </span>
        {event.isFull && (
          <span className="text-xs text-muted-foreground ml-auto">full</span>
        )}
        {event.isPast && (
          <Button variant="outline" size="sm" className="ml-auto h-6 text-xs px-2">
            Write reviews
          </Button>
        )}
      </div>
    </div>
  </div>
);

const Events = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="section-container">
          <div className="flex gap-8">
            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <h1 className="text-4xl font-bold text-heading mb-6">Events</h1>
              
              {/* Filters */}
              <div className="flex items-center gap-2 mb-8">
                <div className="flex items-center border border-border rounded-full overflow-hidden">
                  <button className="px-4 py-2 text-sm font-medium text-heading bg-background hover:bg-muted transition-colors">
                    Upcoming events
                  </button>
                  <div className="w-px h-5 bg-border" />
                  <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-heading hover:bg-muted transition-colors">
                    From Munich
                  </button>
                  <div className="w-px h-5 bg-border" />
                  <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-heading hover:bg-muted transition-colors flex items-center gap-1">
                    All activities
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Events List */}
              {eventGroups.map((group) => (
                <div key={group.date} className="mb-8">
                  {/* Date Header */}
                  <div className="grid grid-cols-[80px_1fr_160px_200px_180px] gap-4 py-3 border-b border-border">
                    <div className="font-semibold text-heading">{group.date}</div>
                    <div />
                    <div className="text-sm text-muted-foreground">Departing from</div>
                    <div className="text-sm text-muted-foreground">Activity</div>
                    <div className="text-sm text-muted-foreground text-right">Participants</div>
                  </div>
                  
                  {/* Event Rows */}
                  {group.events.map((event) => (
                    <EventRow key={event.id} event={event} />
                  ))}
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <aside className="w-80 flex-shrink-0">
              <div className="bg-muted/30 rounded-2xl p-5">
                <h2 className="font-semibold text-heading mb-4">Your upcoming events</h2>
                {upcomingEvents.map((event, i) => (
                  <SidebarEventCard key={i} event={event} />
                ))}
              </div>
              
              <div className="bg-muted/30 rounded-2xl p-5 mt-6">
                <h2 className="font-semibold text-heading mb-4">Your past events</h2>
                {pastEvents.map((event, i) => (
                  <SidebarEventCard key={i} event={event} />
                ))}
                {/* Past event photos */}
                <div className="flex gap-2 mt-4">
                  <img
                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=100&h=80&fit=crop"
                    alt=""
                    className="w-20 h-16 rounded-lg object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=100&h=80&fit=crop"
                    alt=""
                    className="w-20 h-16 rounded-lg object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=100&h=80&fit=crop"
                    alt=""
                    className="w-20 h-16 rounded-lg object-cover"
                  />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Events;
