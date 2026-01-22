import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Train, 
  Car, 
  Mountain, 
  FileText,
  AlertTriangle
} from "lucide-react";
import { CreateEventFormData, ActivityType } from "../CreateEventModal";
import { TransportOption } from "./TransportOptionsStep";

interface EventPreviewStepProps {
  formData: CreateEventFormData;
  onPublish: () => void;
  isPublishing?: boolean;
}

export function EventPreviewStep({ formData, onPublish, isPublishing }: EventPreviewStepProps) {
  const getActivityIcon = (activity: ActivityType | null) => {
    return <Mountain className="h-5 w-5" />;
  };

  const getTransportLabel = (transport: TransportOption | null) => {
    switch (transport) {
      case "public":
        return "Public transport";
      case "car":
        return "By car";
      case "none":
        return "Meet at location";
      default:
        return "Not specified";
    }
  };

  const getTransportIcon = (transport: TransportOption | null) => {
    switch (transport) {
      case "public":
        return <Train className="h-5 w-5" />;
      case "car":
        return <Car className="h-5 w-5" />;
      default:
        return <MapPin className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-8">
      <p className="text-lg text-muted-foreground">
        Looking good! Review your event details before publishing 🎉
      </p>

      <div className="space-y-6">
        {/* Event Name & Activity */}
        <div className="p-6 rounded-xl bg-card border border-border">
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
              {getActivityIcon(formData.activityType)}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">
                {formData.eventName || "Untitled Event"}
              </h2>
              <p className="text-muted-foreground">{formData.activityType}</p>
            </div>
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border border-border">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium text-foreground">
                {formData.date ? format(formData.date, "EEEE, MMMM do, yyyy") : "Not set"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border border-border">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Time</p>
              <p className="font-medium text-foreground">{formData.time || "Not set"}</p>
            </div>
          </div>
        </div>

        {/* Participants */}
        <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border border-border">
          <Users className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Participants</p>
            <p className="font-medium text-foreground">
              {formData.participants ? `Up to ${formData.participants} people` : "Not specified"}
            </p>
          </div>
        </div>

        {/* Description */}
        {formData.description && (
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">Description</p>
                <p className="text-foreground whitespace-pre-wrap">{formData.description}</p>
              </div>
            </div>
          </div>
        )}

        {/* Transport */}
        <div className="p-4 rounded-lg bg-muted/50 border border-border">
          <div className="flex items-start gap-3">
            {getTransportIcon(formData.transportOption)}
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">Transport</p>
              <p className="font-medium text-foreground">{getTransportLabel(formData.transportOption)}</p>
              
              {formData.transportOption === "public" && formData.publicTransport && (
                <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {formData.publicTransport.meetingPoint && (
                    <p>📍 {formData.publicTransport.meetingPoint}</p>
                  )}
                  {formData.publicTransport.ticketCost && (
                    <p>💰 {formData.publicTransport.ticketCost}</p>
                  )}
                  {formData.publicTransport.instructions && (
                    <p>📝 {formData.publicTransport.instructions}</p>
                  )}
                </div>
              )}
              
              {formData.transportOption === "car" && formData.carTransport && (
                <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {formData.carTransport.pickupLocation && (
                    <p>📍 {formData.carTransport.pickupLocation}</p>
                  )}
                  {formData.carTransport.fuelCost && (
                    <p>⛽ {formData.carTransport.fuelCost}</p>
                  )}
                  {formData.carTransport.carDescription && (
                    <p>🚗 {formData.carTransport.carDescription}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Disclaimer Warning */}
        {formData.hasDisclaimer && (
          <div className="flex items-start gap-3 p-4 rounded-lg bg-accent/50 border border-accent">
            <AlertTriangle className="h-5 w-5 text-accent-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium text-accent-foreground">Safety disclaimer included</p>
              <p className="text-sm text-muted-foreground">
                Participants will be informed they join at their own risk
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Publish Button */}
      <div className="pt-4">
        <Button 
          onClick={onPublish} 
          disabled={isPublishing}
          className="w-full h-14 text-lg font-semibold"
          size="lg"
        >
          {isPublishing ? "Publishing..." : "Publish event 🚀"}
        </Button>
        <p className="text-center text-sm text-muted-foreground mt-3">
          Your event will be visible to other adventurers once published
        </p>
      </div>
    </div>
  );
}
