import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users } from "lucide-react";

interface EventDetailsStepProps {
  eventName: string;
  participants: number | null;
  onChange: (eventName: string, participants: number | null) => void;
}

export function EventDetailsStep({ eventName, participants, onChange }: EventDetailsStepProps) {
  return (
    <div className="space-y-8">
      <p className="text-lg text-muted-foreground">
        Give your event a catchy name and let people know how many spots are available! 🎯
      </p>

      <div className="space-y-6">
        {/* Event Name */}
        <div className="space-y-3">
          <Label htmlFor="eventName" className="text-sm font-medium text-foreground">
            Event name
          </Label>
          <Input
            id="eventName"
            placeholder="e.g., Sunday Morning Summit Hike"
            value={eventName}
            onChange={(e) => onChange(e.target.value, participants)}
            className="h-12"
          />
        </div>

        {/* Number of Participants */}
        <div className="space-y-3">
          <Label htmlFor="participants" className="text-sm font-medium text-foreground">
            Number of participants
          </Label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="participants"
              type="number"
              min={1}
              max={100}
              placeholder="How many people can join?"
              value={participants || ""}
              onChange={(e) => onChange(eventName, e.target.value ? parseInt(e.target.value) : null)}
              className="h-12 pl-10"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            This helps others know if there's still room in your group
          </p>
        </div>
      </div>
    </div>
  );
}
