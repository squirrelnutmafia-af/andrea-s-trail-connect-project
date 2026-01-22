import { 
  Mountain, 
  Bike, 
  MountainSnow, 
  Snowflake, 
  CircleDot, 
  Users 
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ActivityType } from "../CreateEventModal";

interface ActivityOption {
  type: ActivityType;
  label: string;
  icon: React.ReactNode;
}

const activities: ActivityOption[] = [
  { type: "Hiking", label: "Hiking", icon: <Mountain className="w-8 h-8" /> },
  { type: "Cycling", label: "Cycling", icon: <Bike className="w-8 h-8" /> },
  { type: "Climbing", label: "Climbing", icon: <MountainSnow className="w-8 h-8" /> },
  { type: "Skiing", label: "Skiing", icon: <Snowflake className="w-8 h-8" /> },
  { type: "Bouldering", label: "Bouldering", icon: <CircleDot className="w-8 h-8" /> },
  { type: "Social", label: "Social", icon: <Users className="w-8 h-8" /> },
];

interface ActivityTypeStepProps {
  selectedActivity: ActivityType | null;
  onSelect: (activity: ActivityType) => void;
}

export function ActivityTypeStep({ selectedActivity, onSelect }: ActivityTypeStepProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {activities.map((activity) => (
        <button
          key={activity.type}
          onClick={() => onSelect(activity.type)}
          className={cn(
            "flex flex-col items-center justify-center gap-4 p-8 rounded-lg border-2 transition-all duration-200",
            "hover:border-primary hover:bg-primary/5",
            selectedActivity === activity.type
              ? "border-primary bg-primary/10"
              : "border-border bg-card"
          )}
        >
          <div className={cn(
            "text-muted-foreground transition-colors",
            selectedActivity === activity.type && "text-primary"
          )}>
            {activity.icon}
          </div>
          <span className={cn(
            "font-semibold text-lg",
            selectedActivity === activity.type ? "text-primary" : "text-foreground"
          )}>
            {activity.label}
          </span>
        </button>
      ))}
    </div>
  );
}
