import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Fuel, Car } from "lucide-react";

interface CarTransportStepProps {
  pickupLocation: string;
  fuelCost: string;
  carDescription: string;
  onChange: (pickupLocation: string, fuelCost: string, carDescription: string) => void;
}

export function CarTransportStep({ pickupLocation, fuelCost, carDescription, onChange }: CarTransportStepProps) {
  return (
    <div className="space-y-8">
      <p className="text-lg text-muted-foreground">
        Let's organize the carpool! 🚗
      </p>

      <div className="space-y-6">
        {/* Pickup Location */}
        <div className="space-y-3">
          <Label htmlFor="pickupLocation" className="text-sm font-medium text-foreground">
            Pick up location
          </Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="pickupLocation"
              placeholder="e.g., Parking lot behind the mall, Main Street 42"
              value={pickupLocation}
              onChange={(e) => onChange(e.target.value, fuelCost, carDescription)}
              className="h-12 pl-10"
            />
          </div>
        </div>

        {/* Fuel Cost */}
        <div className="space-y-3">
          <Label htmlFor="fuelCost" className="text-sm font-medium text-foreground">
            Fuel cost contribution
          </Label>
          <div className="relative">
            <Fuel className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="fuelCost"
              placeholder="e.g., €10 per person"
              value={fuelCost}
              onChange={(e) => onChange(pickupLocation, e.target.value, carDescription)}
              className="h-12 pl-10"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Suggest a fair contribution to share the fuel costs
          </p>
        </div>

        {/* Car Description */}
        <div className="space-y-3">
          <Label htmlFor="carDescription" className="text-sm font-medium text-foreground">
            Car description
          </Label>
          <div className="relative">
            <Car className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Textarea
              id="carDescription"
              placeholder="e.g., Blue VW Golf, 4 seats available. I'll be wearing a red jacket!"
              value={carDescription}
              onChange={(e) => onChange(pickupLocation, fuelCost, e.target.value)}
              className="min-h-[120px] resize-none pl-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
