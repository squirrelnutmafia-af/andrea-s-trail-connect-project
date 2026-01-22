import { cn } from "@/lib/utils";
import { Train, Car, MapPin } from "lucide-react";

export type TransportOption = "public" | "car" | "none";

interface TransportOptionsStepProps {
  selected: TransportOption | null;
  onSelect: (option: TransportOption) => void;
}

const transportOptions: { id: TransportOption; label: string; description: string; icon: React.ElementType }[] = [
  {
    id: "public",
    label: "Public transport",
    description: "Meet at a station and travel together",
    icon: Train,
  },
  {
    id: "car",
    label: "By car",
    description: "Offer rides or organize carpooling",
    icon: Car,
  },
  {
    id: "none",
    label: "No transport needed",
    description: "Meet directly at the activity location",
    icon: MapPin,
  },
];

export function TransportOptionsStep({ selected, onSelect }: TransportOptionsStepProps) {
  return (
    <div className="space-y-8">
      <p className="text-lg text-muted-foreground">
        How will your group get to the adventure? 🚗🚃
      </p>

      <div className="grid gap-4">
        {transportOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = selected === option.id;

          return (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={cn(
                "flex items-center gap-4 p-5 rounded-xl border-2 text-left transition-all",
                "hover:border-primary/50 hover:bg-primary/5",
                isSelected
                  ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                  : "border-border bg-card"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center w-12 h-12 rounded-full",
                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}
              >
                <Icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className={cn(
                  "font-semibold text-lg",
                  isSelected ? "text-primary" : "text-foreground"
                )}>
                  {option.label}
                </h3>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
