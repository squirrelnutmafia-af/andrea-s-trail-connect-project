import { useState } from "react";
import { Settings, Camera, MapPin, Clock, ArrowUpDown, Mountain, MessageSquare, Share2, MessageCircle, Bike, Footprints } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import activityHiking from "@/assets/activity-hiking.jpg";
import activityClimbing from "@/assets/activity-climbing.jpg";
import activityCycling from "@/assets/activity-cycling.jpg";
import activityWater from "@/assets/activity-water.jpg";

const activityTypes = [
  { name: "Hiking", image: activityHiking },
  { name: "Climbing", image: activityClimbing },
  { name: "Cycling", image: activityCycling },
  { name: "Water sports", image: activityWater },
];

// Trail difficulty badge component
const DifficultyBadge = ({ level, className = "" }: { level: string; className?: string }) => {
  const colors: Record<string, string> = {
    T1: "bg-emerald-400",
    T2: "bg-emerald-500",
    T3: "bg-yellow-400",
    T4: "bg-orange-400",
    T5: "bg-red-400",
    T6: "bg-red-600",
  };
  
  return (
    <span className={`${colors[level] || "bg-muted"} text-white text-xs font-bold px-1.5 py-0.5 rounded ${className}`}>
      {level}
    </span>
  );
};

// Stats bar component for difficulty breakdown
const StatsBar = ({ level, count, maxCount }: { level: string; count: number; maxCount: number }) => {
  const height = maxCount > 0 ? (count / maxCount) * 80 : 0;
  const colors: Record<string, string> = {
    T1: "bg-emerald-400",
    T2: "bg-emerald-500",
    T3: "bg-yellow-400",
    T4: "bg-orange-400",
    T5: "bg-red-400",
    T6: "bg-red-600",
  };
  
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="h-20 w-8 flex items-end">
        <div 
          className={`w-full rounded-t-md ${colors[level]} transition-all duration-300`}
          style={{ height: `${height}px` }}
        />
      </div>
      <DifficultyBadge level={level} />
      <span className="text-xs text-muted-foreground">{count}</span>
    </div>
  );
};

// Review card component
const ReviewCard = ({ review }: { review: { text: string; author: string; location: string; date: string } }) => (
  <div className="min-w-[280px] p-4 bg-card rounded-xl border border-border">
    <p className="text-sm text-foreground mb-4 line-clamp-4">{review.text}</p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-muted" />
      <div>
        <p className="text-sm font-semibold text-foreground">{review.author}</p>
        <p className="text-xs text-muted-foreground">{review.location}, {review.date}</p>
      </div>
    </div>
  </div>
);

// Activity card component
const ActivityCard = ({ activity }: { 
  activity: { 
    organizer: string; 
    attendees: number; 
    status: string; 
    statusType: "closed" | "available" | "organiser"; 
    title: string; 
    userRole: string; 
    time: string; 
    from: string; 
    transport: string; 
    type: string; 
    distance: string; 
    elevation: string; 
    duration: string; 
    difficulty: string;
  } 
}) => {
  const statusStyles = {
    closed: "bg-muted text-muted-foreground",
    available: "bg-primary/10 text-primary",
    organiser: "bg-primary/10 text-primary",
  };
  
  const roleStyles = {
    going: "bg-primary text-primary-foreground",
    organiser: "bg-orange-100 text-orange-700",
  };

  return (
    <div className="p-4 bg-card rounded-xl border border-border">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-muted" />
        <span className="text-sm font-medium text-foreground">{activity.organizer}</span>
        <span className="text-xs text-muted-foreground">+{activity.attendees}</span>
        <Badge variant="secondary" className={`text-xs ${statusStyles[activity.statusType]}`}>
          {activity.status}
        </Badge>
      </div>
      
      <h4 className="font-semibold text-foreground mb-2">{activity.title}</h4>
      
      <div className="flex items-center gap-2 mb-3">
        <Badge className={`text-xs ${activity.userRole === "You are going" ? roleStyles.going : roleStyles.organiser}`}>
          {activity.userRole}
        </Badge>
        <span className="text-xs text-muted-foreground">at {activity.time} · from {activity.from} · by {activity.transport}</span>
      </div>
      
      <div className="flex items-center gap-3 mb-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <DifficultyBadge level={activity.difficulty} />
          <Footprints className="w-3.5 h-3.5" />
          <span>{activity.type}</span>
        </div>
        <div className="flex items-center gap-1">
          <ArrowUpDown className="w-3.5 h-3.5" />
          <span>{activity.distance}</span>
        </div>
        <div className="flex items-center gap-1">
          <Mountain className="w-3.5 h-3.5" />
          <span>{activity.elevation}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          <span>{activity.duration}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Share2 className="w-4 h-4" />
            Share
          </button>
          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <MessageCircle className="w-4 h-4" />
            Comment
          </button>
        </div>
        <Button 
          variant="ghost" 
          className={`text-sm ${activity.userRole === "You're the organiser" ? "text-primary hover:text-primary" : "text-destructive hover:text-destructive"}`}
        >
          {activity.userRole === "You're the organiser" ? "Edit" : "Unjoin"}
        </Button>
      </div>
    </div>
  );
};

const UserProfile = () => {
  const [statsTab, setStatsTab] = useState("all-time");
  const [activitiesTab, setActivitiesTab] = useState("upcoming");
  
  const user = {
    name: "Anna",
    badge: "Trail Rookie",
    reviews: 34,
    age: 32,
    membership: "Sustainer",
    location: "Based in Germany",
    experience: "5 years hiking",
    eventsOrganised: 43,
    hikesCompleted: 61,
    cyclingActivities: 4,
    routesCreated: 52,
    viaFerrataActivities: 8,
    difficulties: ["T3", "T4", "T6"],
  };
  
  const stats = {
    lastMonth: { hiking: 9, cycling: 1, viaFerrata: 0, other: 0, distance: "12km", elevation: "982m" },
    allTime: { hiking: 43, cycling: 4, viaFerrata: 1, other: 1, distance: "34km", elevation: "3.982m" },
    lastYear: { hiking: 43, cycling: 3, viaFerrata: 1, other: 0, distance: "28km", elevation: "3.100m" },
  };
  
  const difficultyStats = [
    { level: "T1", count: 0 },
    { level: "T2", count: 34 },
    { level: "T3", count: 23 },
    { level: "T4", count: 3 },
    { level: "T5", count: 15 },
    { level: "T6", count: 4 },
  ];
  
  const maxDifficultyCount = Math.max(...difficultyStats.map(d => d.count));
  
  const reviews = [
    { 
      text: "Anna, thank you for organising an excellent \"tramping trip\". Certainly a fit and furious hike. See you on the next one", 
      author: "Karina", 
      location: "Hochstaufen (1771m)", 
      date: "June 2024" 
    },
    { 
      text: "Anna, thank you for organising an excellent \"tramping trip\". Certainly a fit and furious hike. See you on the next one", 
      author: "Karina", 
      location: "Hochstaufen (1771m)", 
      date: "June 2024" 
    },
    { 
      text: "Great experience hiking with Anna! Very well organized and she always makes sure everyone is safe. Highly recommend!", 
      author: "Marcus", 
      location: "Wendelstein (1838m)", 
      date: "May 2024" 
    },
  ];
  
  const activities = [
    {
      organizer: "Vera",
      attendees: 14,
      status: "Closed",
      statusType: "closed" as const,
      title: "Jochberg hike and swim",
      userRole: "You are going",
      time: "6:45",
      from: "Munich",
      transport: "Train",
      type: "Hiking",
      distance: "18km",
      elevation: "1982 elevation",
      duration: "4h 30min",
      difficulty: "T3",
    },
    {
      organizer: "Anna",
      attendees: 14,
      status: "1 spot available",
      statusType: "available" as const,
      title: "Jochberg hike and swim",
      userRole: "You're the organiser",
      time: "6:45",
      from: "Munich",
      transport: "Train",
      type: "Hiking",
      distance: "18km",
      elevation: "1982 elevation",
      duration: "4h 30min",
      difficulty: "T3",
    },
  ];

  const currentStats = statsTab === "last-month" ? stats.lastMonth : statsTab === "all-time" ? stats.allTime : stats.lastYear;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="section-container">
          {/* Profile Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 rounded-full bg-muted overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face" 
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center border-2 border-background">
                  <Camera className="w-4 h-4 text-white" />
                </div>
                <button className="absolute -top-2 -right-8 p-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
              
              <h1 className="text-2xl font-bold text-foreground mb-1">{user.name}</h1>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-primary flex items-center gap-1">
                  <Footprints className="w-4 h-4" />
                  {user.badge}
                </span>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  {user.reviews} reviews
                </span>
              </div>
            </div>

            {/* Activity Tags */}
            <div className="grid grid-cols-4 gap-3">
              {activityTypes.map((activity) => (
                <a
                  key={activity.name}
                  href="#"
                  className="group"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-muted">
                    <img
                      src={activity.image}
                      alt={activity.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-1.5">
                      <span className="text-white font-medium text-xs">{activity.name}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          {/* User Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="secondary" className="text-sm">{user.age} y.o.</Badge>
            <Badge variant="secondary" className="text-sm">🌿 {user.membership}</Badge>
            <Badge variant="secondary" className="text-sm">🇩🇪 {user.location}</Badge>
            <Badge variant="secondary" className="text-sm">{user.experience}</Badge>
            <Badge variant="secondary" className="text-sm">⛰️ {user.eventsOrganised} events organised</Badge>
            <div className="flex items-center gap-1">
              {user.difficulties.map(d => <DifficultyBadge key={d} level={d} />)}
              <Badge variant="secondary" className="text-sm">{user.hikesCompleted} hikes completed</Badge>
            </div>
            <Badge variant="secondary" className="text-sm flex items-center gap-1">
              <Bike className="w-3.5 h-3.5" />
              {user.cyclingActivities} Cycling activities
            </Badge>
            <Badge variant="secondary" className="text-sm">🛤️ {user.routesCreated} routes created</Badge>
            <Badge variant="secondary" className="text-sm">⛏️ {user.viaFerrataActivities} Via Ferrata activities</Badge>
          </div>
          
          {/* Stats Section */}
          <div className="bg-card rounded-xl border border-border p-4 mb-6">
            <div className="flex items-center gap-6 mb-4 text-sm">
              <button 
                onClick={() => setStatsTab("last-month")}
                className={`${statsTab === "last-month" ? "text-foreground font-semibold" : "text-muted-foreground"}`}
              >
                LAST MONTH | 9
              </button>
              <button 
                onClick={() => setStatsTab("all-time")}
                className={`${statsTab === "all-time" ? "text-foreground font-semibold" : "text-muted-foreground"}`}
              >
                ALL TIME | 49
              </button>
              <button 
                onClick={() => setStatsTab("last-year")}
                className={`${statsTab === "last-year" ? "text-foreground font-semibold" : "text-muted-foreground"}`}
              >
                LAST YEAR | 43
              </button>
            </div>
            
            <div className="flex items-center gap-4 mb-4 text-sm">
              <div className="flex items-center gap-1">
                <Footprints className="w-4 h-4 text-muted-foreground" />
                <span>Hiking | {currentStats.hiking}</span>
              </div>
              <div className="flex items-center gap-1">
                <Bike className="w-4 h-4 text-muted-foreground" />
                <span>{currentStats.cycling}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>⛏️</span>
                <span>{currentStats.viaFerrata}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>🔄</span>
                <span>{currentStats.other}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6 mb-6 text-sm">
              <div>
                <span className="text-muted-foreground">Distance: </span>
                <span className="font-semibold">{currentStats.distance}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Elevation: </span>
                <span className="font-semibold">{currentStats.elevation}</span>
              </div>
            </div>
            
            <div className="flex items-end gap-3">
              {difficultyStats.map((stat) => (
                <StatsBar key={stat.level} level={stat.level} count={stat.count} maxCount={maxDifficultyCount} />
              ))}
            </div>
          </div>
          
          {/* Reviews Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground uppercase text-sm">ANNA'S REVIEWS ({user.reviews})</h3>
              <button className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
                Show all →
              </button>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {reviews.map((review, index) => (
                <ReviewCard key={index} review={review} />
              ))}
            </div>
          </div>
          
          {/* Activities Section */}
          <div>
            <h3 className="font-semibold text-foreground uppercase text-sm mb-4">ANNA'S ACTIVITIES</h3>
            
            <Tabs value={activitiesTab} onValueChange={setActivitiesTab} className="mb-4">
              <TabsList className="bg-transparent p-0 h-auto gap-4">
                <TabsTrigger 
                  value="upcoming" 
                  className="px-0 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  Upcoming | 2
                </TabsTrigger>
                <TabsTrigger 
                  value="recent" 
                  className="px-0 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  Recent | 1
                </TabsTrigger>
                <TabsTrigger 
                  value="past" 
                  className="px-0 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  Past | 60
                </TabsTrigger>
                <TabsTrigger 
                  value="organised" 
                  className="px-0 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  Organised | 43
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <ActivityCard key={index} activity={activity} />
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserProfile;
