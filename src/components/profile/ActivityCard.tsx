import { Clock, ArrowUpDown, Mountain, Share2, MessageCircle, Footprints } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DifficultyBadge from "./DifficultyBadge";

export interface Activity {
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

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard = ({ activity }: ActivityCardProps) => {
  const statusStyles = {
    closed: "bg-muted text-muted-foreground",
    available: "bg-primary/10 text-primary",
    organiser: "bg-primary/10 text-primary"
  };

  const roleStyles = {
    going: "bg-primary text-primary-foreground",
    organiser: "bg-orange-100 text-orange-700"
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
        <span className="text-xs text-muted-foreground">
          at {activity.time} · from {activity.from} · by {activity.transport}
        </span>
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

export default ActivityCard;
