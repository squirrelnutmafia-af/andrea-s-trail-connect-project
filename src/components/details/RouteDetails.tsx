import { DetailViewLayout } from './DetailViewLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  MoveHorizontal, 
  TrendingUp, 
  TrendingDown, 
  Mountain, 
  Clock, 
  Star,
  Calendar,
  Users
} from 'lucide-react';
import { HikingRoute, TECHNICAL_GRADE_LABELS, DIFFICULTY_LABELS, HIGHLIGHT_LABELS, FACILITY_LABELS } from '@/types/route';

interface PastEvent {
  id: string;
  date: string;
  participantCount: number;
  organizerName: string;
  organizerAvatarUrl?: string;
}

interface RouteDetailsProps {
  route: HikingRoute;
  galleryImages?: { src: string; alt: string }[];
  creator: {
    name: string;
    badge?: string;
    avatarUrl?: string;
  };
  pastEvents: PastEvent[];
  discussion: {
    id: string;
    author: string;
    authorAvatarUrl?: string;
    content: string;
    timeAgo: string;
  }[];
  totalComments?: number;
  open: boolean;
  onClose: () => void;
  onCreateEvent?: () => void;
}

export const RouteDetails = ({
  route,
  galleryImages,
  creator,
  pastEvents,
  discussion,
  totalComments,
  open,
  onClose,
  onCreateEvent,
}: RouteDetailsProps) => {
  const quickStats = [
    { label: 'Region', value: route.region },
    { label: 'Difficulty', value: DIFFICULTY_LABELS[route.difficulty] },
    { label: 'Technical Grade', value: `${route.technicalGrade} - ${TECHNICAL_GRADE_LABELS[route.technicalGrade]}` },
    { label: 'Rating', value: `${route.rating} (${route.reviewCount} reviews)` },
  ];

  const formatDuration = (hours: number): string => {
    if (hours < 1) {
      return `${Math.round(hours * 60)}min`;
    }
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    if (m === 0) return `${h}h`;
    return `${h}h ${m}min`;
  };

  const routeStatsItems = [
    { icon: <MoveHorizontal className="h-5 w-5" />, label: 'Distance', value: `${route.distance}km` },
    { icon: <TrendingUp className="h-5 w-5" />, label: 'Ascent', value: `${route.elevationGain}m` },
    { icon: <TrendingDown className="h-5 w-5" />, label: 'Descent', value: `${route.elevationGain}m` },
    { icon: <Mountain className="h-5 w-5" />, label: 'Highest point', value: `${route.elevationGain + 500}m` },
    { icon: <Clock className="h-5 w-5" />, label: 'Duration', value: formatDuration(route.duration) },
    { icon: <Star className="h-5 w-5" />, label: 'Rating', value: `${route.rating}` },
  ];

  const mainContent = (
    <>
      <Separator />
      
      {/* Highlights */}
      {route.highlights.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-3">Highlights</h2>
          <div className="flex flex-wrap gap-2">
            {route.highlights.map((highlight) => (
              <Badge key={highlight} variant="secondary" className="capitalize">
                {HIGHLIGHT_LABELS[highlight]}
              </Badge>
            ))}
          </div>
        </section>
      )}

      {/* Features */}
      {route.features.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-3">Route Features</h2>
          <div className="flex flex-wrap gap-2">
            {route.features.map((feature) => (
              <Badge key={feature} variant="outline" className="capitalize">
                {feature.split('-').join(' ')}
              </Badge>
            ))}
          </div>
        </section>
      )}

      {/* Facilities */}
      {route.facilities.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-3">Facilities</h2>
          <div className="flex flex-wrap gap-2">
            {route.facilities.map((facility) => (
              <Badge key={facility} variant="secondary" className="capitalize">
                {FACILITY_LABELS[facility]}
              </Badge>
            ))}
          </div>
        </section>
      )}

      <Separator />
    </>
  );

  const sidebarListSection = (
    <div className="bg-card border border-border rounded-lg p-5">
      <h3 className="text-base font-semibold mb-2">Past Events</h3>
      <p className="text-sm text-muted-foreground mb-4">
        {pastEvents.length} events organized on this route
      </p>
      {pastEvents.length > 0 ? (
        <div className="space-y-3">
          {pastEvents.slice(0, 3).map((event) => (
            <div 
              key={event.id} 
              className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={event.organizerAvatarUrl} alt={event.organizerName} />
                <AvatarFallback className="text-xs">
                  {event.organizerName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-foreground font-medium">{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" />
                  <span>{event.participantCount} participants</span>
                </div>
              </div>
            </div>
          ))}
          {pastEvents.length > 3 && (
            <button className="text-sm text-primary hover:text-primary/80 transition-colors">
              View all {pastEvents.length} events
            </button>
          )}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No events yet on this route.</p>
      )}
    </div>
  );

  return (
    <DetailViewLayout
      title={route.name}
      quickStats={quickStats}
      primaryActionLabel="Create event"
      onPrimaryAction={onCreateEvent}
      mainImage={route.imageUrl}
      galleryImages={galleryImages}
      onAddPhotos={() => console.log('Add photos')}
      description={route.description}
      mainContent={mainContent}
      routeStats={routeStatsItems}
      personLabel="Route Creator"
      person={creator}
      sidebarListSection={sidebarListSection}
      discussion={discussion}
      totalComments={totalComments}
      open={open}
      onClose={onClose}
    />
  );
};
