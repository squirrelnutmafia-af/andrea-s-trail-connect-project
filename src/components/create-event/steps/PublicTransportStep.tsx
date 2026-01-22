import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Banknote, FileText } from "lucide-react";

interface PublicTransportStepProps {
  meetingPoint: string;
  ticketCost: string;
  instructions: string;
  onChange: (meetingPoint: string, ticketCost: string, instructions: string) => void;
}

export function PublicTransportStep({ meetingPoint, ticketCost, instructions, onChange }: PublicTransportStepProps) {
  return (
    <div className="space-y-8">
      <p className="text-lg text-muted-foreground">
        Help everyone find you at the station! 🚉
      </p>

      <div className="space-y-6">
        {/* Meeting Point */}
        <div className="space-y-3">
          <Label htmlFor="meetingPoint" className="text-sm font-medium text-foreground">
            Meeting point
          </Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="meetingPoint"
              placeholder="e.g., Platform 5, Central Station"
              value={meetingPoint}
              onChange={(e) => onChange(e.target.value, ticketCost, instructions)}
              className="h-12 pl-10"
            />
          </div>
        </div>

        {/* Ticket Cost */}
        <div className="space-y-3">
          <Label htmlFor="ticketCost" className="text-sm font-medium text-foreground">
            Estimated ticket cost
          </Label>
          <div className="relative">
            <Banknote className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="ticketCost"
              placeholder="e.g., €15 return ticket"
              value={ticketCost}
              onChange={(e) => onChange(meetingPoint, e.target.value, instructions)}
              className="h-12 pl-10"
            />
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-3">
          <Label htmlFor="instructions" className="text-sm font-medium text-foreground">
            Travel instructions
          </Label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Textarea
              id="instructions"
              placeholder="Any specific instructions for the journey? Train times, connections, etc."
              value={instructions}
              onChange={(e) => onChange(meetingPoint, ticketCost, e.target.value)}
              className="min-h-[120px] resize-none pl-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
