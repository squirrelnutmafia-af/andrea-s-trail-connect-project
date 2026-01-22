import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, isToday, isTomorrow, parseISO } from "date-fns";

export interface Event {
  id: string;
  time: string;
  duration: string;
  title: string;
  organizer: string;
  organizerAvatar: string;
  image: string;
  departureLocation: string;
  transportMethod: string;
  activityType: "Hiking" | "Cycling";
  difficulty: string;
  distance: string;
  elevation: string;
  totalHeight: string;
  heightType: "height" | "descent";
  coming: number;
  available?: number;
  waitlist?: number;
  participants: string[];
}

export interface EventGroup {
  date: string;
  events: Event[];
}

interface DbEvent {
  id: string;
  title: string;
  event_date: string;
  time: string;
  duration: string;
  organizer: string;
  organizer_avatar: string | null;
  image: string | null;
  departure_location: string;
  transport_method: string;
  activity_type: "Hiking" | "Cycling";
  difficulty: string;
  distance: string;
  elevation: string;
  total_height: string;
  height_type: "height" | "descent";
  coming: number;
  available: number | null;
  waitlist: number | null;
  participants: string[] | null;
}

const formatEventDate = (dateString: string): string => {
  const date = parseISO(dateString);
  
  if (isToday(date)) {
    return `Today, ${format(date, "EEEE")}`;
  }
  if (isTomorrow(date)) {
    return `Tomorrow, ${format(date, "EEEE")}`;
  }
  return format(date, "MMM d, EEEE");
};

const transformEvent = (dbEvent: DbEvent): Event => ({
  id: dbEvent.id,
  time: dbEvent.time,
  duration: dbEvent.duration,
  title: dbEvent.title,
  organizer: dbEvent.organizer,
  organizerAvatar: dbEvent.organizer_avatar || "",
  image: dbEvent.image || "",
  departureLocation: dbEvent.departure_location,
  transportMethod: dbEvent.transport_method,
  activityType: dbEvent.activity_type,
  difficulty: dbEvent.difficulty,
  distance: dbEvent.distance,
  elevation: dbEvent.elevation,
  totalHeight: dbEvent.total_height,
  heightType: dbEvent.height_type,
  coming: dbEvent.coming,
  available: dbEvent.available ?? undefined,
  waitlist: dbEvent.waitlist ?? undefined,
  participants: dbEvent.participants || [],
});

const groupEventsByDate = (events: DbEvent[]): EventGroup[] => {
  const grouped: Record<string, Event[]> = {};

  events.forEach((dbEvent) => {
    const dateKey = dbEvent.event_date;
    const formattedDate = formatEventDate(dateKey);

    if (!grouped[formattedDate]) {
      grouped[formattedDate] = [];
    }
    grouped[formattedDate].push(transformEvent(dbEvent));
  });

  return Object.entries(grouped).map(([date, events]) => ({
    date,
    events,
  }));
};

export const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .gte("event_date", new Date().toISOString().split("T")[0])
        .order("event_date", { ascending: true })
        .order("time", { ascending: true });

      if (error) {
        throw error;
      }

      return groupEventsByDate(data as DbEvent[]);
    },
  });
};
