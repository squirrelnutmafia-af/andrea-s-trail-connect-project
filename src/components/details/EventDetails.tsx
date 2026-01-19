import { DetailViewLayout } from './DetailViewLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  MoveHorizontal, 
  TrendingUp, 
  TrendingDown, 
  Mountain, 
  Clock, 
  Star,
  Plus 
} from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  avatarUrl?: string;
}

interface TransportInfo {
  meetingLocation: string;
  meetingTime: string;
  transport: string;
  ticketPrice: string;
}

interface EventDetailsProps {
  id: string;
  date: string;
  time: string;
  title: string;
  activity: string;
  difficulty: string;
  departsFrom: string;
  transportType: string;
  imageUrl: string;
  galleryImages?: { src: string; alt: string }[];
  description: string;
  transportInfo: TransportInfo;
  equipment: string[];
  routeStats: {
    distance: number;
    ascent: number;
    descent: number;
    highestPoint: number;
    duration: string;
    rating: number;
  };
  organizer: {
    name: string;
    badge?: string;
    avatarUrl?: string;
  };
  participants: Participant[];
  maxParticipants: number;
  discussion: {
    id: string;
    author: string;
    authorAvatarUrl?: string;
    content: string;
    timeAgo: string;
  }[];
  totalComments?: number;
  onBack?: () => void;
  onJoinEvent?: () => void;
}

export const EventDetails = ({
  date,
  time,
  title,
  activity,
  difficulty,
  departsFrom,
  transportType,
  imageUrl,
  galleryImages,
  description,
  transportInfo,
  equipment,
  routeStats,
  organizer,
  participants,
  maxParticipants,
  discussion,
  totalComments,
  onBack,
  onJoinEvent,
}: EventDetailsProps) => {
  const spotsLeft = maxParticipants - participants.length;
  
  const quickStats = [
    { label: 'Activity', value: activity },
    { label: 'Difficulty', value: difficulty },
    { label: 'Departs from', value: departsFrom },
    { label: 'Transport', value: transportType },
  ];

  const routeStatsItems = [
    { icon: <MoveHorizontal className="h-5 w-5" />, label: 'Distance', value: `${routeStats.distance}km` },
    { icon: <TrendingUp className="h-5 w-5" />, label: 'Ascent', value: `${routeStats.ascent}` },
    { icon: <TrendingDown className="h-5 w-5" />, label: 'Descent', value: `${routeStats.descent}` },
    { icon: <Mountain className="h-5 w-5" />, label: 'Highest point', value: `${routeStats.highestPoint}` },
    { icon: <Clock className="h-5 w-5" />, label: 'Duration', value: routeStats.duration },
    { icon: <Star className="h-5 w-5" />, label: 'Rating', value: `${routeStats.rating}` },
  ];

  const mainContent = (
    <>
      <Separator />
      
      {/* Meeting and transport */}
      <section>
        <h2 className="text-lg font-semibold mb-3">Meeting and transport</h2>
        <p className="text-muted-foreground mb-4">{transportInfo.meetingLocation}</p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Meeting location</span>
            <p className="font-medium text-foreground">{transportInfo.meetingLocation}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Meeting time</span>
            <p className="font-medium text-foreground">{transportInfo.meetingTime}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Transport</span>
            <p className="font-medium text-foreground">{transportInfo.transport}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Ticket price</span>
            <p className="font-medium text-foreground">{transportInfo.ticketPrice}</p>
          </div>
        </div>
      </section>

      <Separator />

      {/* Equipment */}
      <section>
        <h2 className="text-lg font-semibold mb-3">Equipment</h2>
        <div className="grid grid-cols-2 gap-2 text-sm text-foreground">
          {equipment.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      </section>

      <Separator />
    </>
  );

  const sidebarListSection = (
    <div className="bg-card border border-border rounded-lg p-5">
      <h3 className="text-base font-semibold mb-2">Participants</h3>
      <p className="text-sm text-muted-foreground mb-4">
        {participants.length} out of {maxParticipants} / <span className="font-medium text-primary">{spotsLeft} spots left</span>
      </p>
      <div className="flex items-center gap-1">
        {participants.slice(0, 6).map((participant) => (
          <Avatar key={participant.id} className="h-10 w-10 border-2 border-background -ml-2 first:ml-0">
            <AvatarImage src={participant.avatarUrl} alt={participant.name} />
            <AvatarFallback className="text-xs">
              {participant.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        ))}
        {participants.length > 6 && (
          <div className="h-10 w-10 rounded-full bg-muted border-2 border-background -ml-2 flex items-center justify-center text-xs font-medium text-muted-foreground">
            +{participants.length - 6}
          </div>
        )}
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full ml-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <DetailViewLayout
      dateLabel={date}
      timeLabel={time}
      title={title}
      quickStats={quickStats}
      primaryActionLabel="Join event"
      onPrimaryAction={onJoinEvent}
      mainImage={imageUrl}
      galleryImages={galleryImages}
      description={description}
      mainContent={mainContent}
      routeStats={routeStatsItems}
      personLabel="Organizer"
      person={organizer}
      sidebarListSection={sidebarListSection}
      discussion={discussion}
      totalComments={totalComments}
      onBack={onBack}
      backLabel="Back to events"
    />
  );
};
