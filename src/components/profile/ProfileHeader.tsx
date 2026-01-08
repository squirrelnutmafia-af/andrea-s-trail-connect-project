import { Settings, Camera, MessageSquare, Footprints, Bike } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import DifficultyBadge from "./DifficultyBadge";

interface UserData {
  name: string;
  badge: string;
  reviews: number;
  age: number;
  membership: string;
  location: string;
  experience: string;
  eventsOrganised: number;
  hikesCompleted: number;
  cyclingActivities: number;
  routesCreated: number;
  viaFerrataActivities: number;
  difficulties: string[];
}

interface ProfileHeaderProps {
  user: UserData;
}

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  return (
    <div className="gap-8 mb-6 p-6 border border-border rounded-xl flex items-end justify-start">
      {/* Profile Header */}
      <div className="w-1/4">
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

      {/* User Tags */}
      <div className="flex-wrap w-3/4 content-start gap-[8px] flex-row flex items-center justify-start">
        <Badge variant="secondary" className="text-sm">{user.age} y.o.</Badge>
        <Badge variant="secondary" className="text-sm">🌿 {user.membership}</Badge>
        <Badge variant="secondary" className="text-sm">🇩🇪 {user.location}</Badge>
        <Badge variant="secondary" className="text-sm">{user.experience}</Badge>
        <Badge variant="secondary" className="text-sm">⛰️ {user.eventsOrganised} events organised</Badge>
        <div className="flex items-center gap-1">
          {user.difficulties.map((d) => (
            <DifficultyBadge key={d} level={d} />
          ))}
          <Badge variant="secondary" className="text-sm">{user.hikesCompleted} hikes completed</Badge>
        </div>
        <Badge variant="secondary" className="text-sm flex items-center gap-1">
          <Bike className="w-3.5 h-3.5" />
          {user.cyclingActivities} Cycling activities
        </Badge>
        <Badge variant="secondary" className="text-sm">🛤️ {user.routesCreated} routes created</Badge>
        <Badge variant="secondary" className="text-sm">⛏️ {user.viaFerrataActivities} Via Ferrata activities</Badge>
      </div>
    </div>
  );
};

export default ProfileHeader;
