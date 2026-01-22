import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface EventDescriptionStepProps {
  description: string;
  hasDisclaimer: boolean;
  onChange: (description: string, hasDisclaimer: boolean) => void;
}

export function EventDescriptionStep({ description, hasDisclaimer, onChange }: EventDescriptionStepProps) {
  return (
    <div className="space-y-8">
      <p className="text-lg text-muted-foreground">
        Tell potential adventurers what makes this trip special! 📝
      </p>

      <div className="space-y-6">
        {/* Description */}
        <div className="space-y-3">
          <Label htmlFor="description" className="text-sm font-medium text-foreground">
            Event description
          </Label>
          <Textarea
            id="description"
            placeholder="Describe the adventure, what to expect, what to bring, difficulty level, etc."
            value={description}
            onChange={(e) => onChange(e.target.value, hasDisclaimer)}
            className="min-h-[160px] resize-none"
          />
          <p className="text-sm text-muted-foreground">
            Pro tip: Include details about fitness level, gear requirements, and meeting point!
          </p>
        </div>

        {/* Disclaimer Checkbox */}
        <div className="flex items-start space-x-3 p-4 rounded-lg bg-muted/50 border border-border">
          <Checkbox
            id="disclaimer"
            checked={hasDisclaimer}
            onCheckedChange={(checked) => onChange(description, checked === true)}
            className="mt-0.5"
          />
          <div className="space-y-1">
            <Label 
              htmlFor="disclaimer" 
              className="text-sm font-medium text-foreground cursor-pointer"
            >
              Add safety disclaimer
            </Label>
            <p className="text-sm text-muted-foreground">
              Include a standard disclaimer that participants join at their own risk and should have appropriate insurance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
