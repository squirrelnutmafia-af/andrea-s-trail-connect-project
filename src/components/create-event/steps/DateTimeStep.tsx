import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DateTimeStepProps {
  date: Date | null;
  time: string | null;
  onChange: (date: Date | null, time: string | null) => void;
}

// Generate time slots from 5:00 to 22:00 in 30-minute intervals
const timeSlots = Array.from({ length: 35 }, (_, i) => {
  const hour = Math.floor(i / 2) + 5;
  const minute = (i % 2) * 30;
  return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
});

export function DateTimeStep({ date, time, onChange }: DateTimeStepProps) {
  return (
    <div className="space-y-8">
      <p className="text-lg text-muted-foreground">
        Pick a date and time that works for you and your crew. Don't worry, you can always adjust later! 🗓️
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Date Picker */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">
            Date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal h-12",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-3 h-5 w-5" />
                {date ? format(date, "EEEE, MMMM do, yyyy") : "Choose a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date || undefined}
                onSelect={(newDate) => onChange(newDate || null, time)}
                disabled={(date) => date < new Date()}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Time Picker */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">
            Start time
          </label>
          <Select
            value={time || ""}
            onValueChange={(value) => onChange(date, value)}
          >
            <SelectTrigger className="w-full h-12">
              <div className="flex items-center">
                <Clock className="mr-3 h-5 w-5 text-muted-foreground" />
                <SelectValue placeholder="Choose a time" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((slot) => (
                <SelectItem key={slot} value={slot}>
                  {slot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {date && time && (
        <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
          <p className="text-primary font-medium">
            🎉 Awesome! Your adventure is set for {format(date, "EEEE, MMMM do")} at {time}
          </p>
        </div>
      )}
    </div>
  );
}
