import { MapPin } from "lucide-react";

interface RouteSelectionStepProps {
  onSelect: (routeId: string) => void;
}

export function RouteSelectionStep({ onSelect }: RouteSelectionStepProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
        <MapPin className="w-10 h-10 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-semibold text-foreground mb-2">
        Route selection coming soon
      </h2>
      <p className="text-muted-foreground max-w-md">
        Here you'll be able to browse and select from your saved routes or discover new ones for your group adventure.
      </p>
    </div>
  );
}
