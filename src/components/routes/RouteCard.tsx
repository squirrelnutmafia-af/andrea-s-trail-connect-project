import { 
  Clock, 
  Mountain, 
  TrendingUp, 
  Star,
  Droplets,
  TreePine,
  Waves,
  Landmark,
  Eye,
  UtensilsCrossed,
  Home,
  Droplet,
  CableCar,
  Check
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  HikingRoute, 
  Difficulty, 
  TechnicalGrade, 
  Highlight, 
  Facility,
  TECHNICAL_GRADE_LABELS 
} from '@/types/route';
import { cn } from '@/lib/utils';

interface RouteCardProps {
  route: HikingRoute;
  isSelected?: boolean;
  onSelect?: (route: HikingRoute) => void;
  onViewDetails?: (route: HikingRoute) => void;
}

const difficultyColors: Record<Difficulty, string> = {
  beginner: 'bg-green-100 text-green-700 border-green-200',
  intermediate: 'bg-blue-100 text-blue-700 border-blue-200',
  advanced: 'bg-orange-100 text-orange-700 border-orange-200',
  expert: 'bg-red-100 text-red-700 border-red-200',
};

const technicalGradeColors: Record<TechnicalGrade, string> = {
  T1: 'bg-emerald-500',
  T2: 'bg-emerald-600',
  T3: 'bg-amber-500',
  T4: 'bg-orange-500',
  T5: 'bg-red-500',
  T6: 'bg-red-700',
};

const highlightIcons: Record<Highlight, React.ReactNode> = {
  lake: <Droplets className="h-4 w-4" />,
  river: <Waves className="h-4 w-4" />,
  waterfall: <Droplet className="h-4 w-4" />,
  coastline: <Waves className="h-4 w-4" />,
  forest: <TreePine className="h-4 w-4" />,
  historical: <Landmark className="h-4 w-4" />,
  ruins: <Landmark className="h-4 w-4" />,
  viewpoint: <Eye className="h-4 w-4" />,
};

const facilityIcons: Record<Facility, React.ReactNode> = {
  restaurant: <UtensilsCrossed className="h-3.5 w-3.5" />,
  'mountain-hut': <Home className="h-3.5 w-3.5" />,
  refuge: <Home className="h-3.5 w-3.5" />,
  'water-source': <Droplet className="h-3.5 w-3.5" />,
  'cable-car': <CableCar className="h-3.5 w-3.5" />,
};

const formatDuration = (hours: number): string => {
  if (hours < 1) {
    return `${Math.round(hours * 60)}min`;
  }
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  if (m === 0) return `${h}h`;
  return `${h}h ${m}min`;
};

export const RouteCard = ({ route, isSelected, onSelect, onViewDetails }: RouteCardProps) => {
  return (
    <Card 
      className={cn(
        "group overflow-hidden card-hover border transition-all duration-300",
        isSelected && "ring-2 ring-primary border-primary"
      )}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={route.imageUrl}
          alt={route.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Technical Grade Badge */}
        <div 
          className={cn(
            "absolute top-3 left-3 px-2.5 py-1 rounded-md text-white font-bold text-sm",
            technicalGradeColors[route.technicalGrade]
          )}
          title={TECHNICAL_GRADE_LABELS[route.technicalGrade]}
        >
          {route.technicalGrade}
        </div>

        {/* Rating */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span className="font-semibold text-sm">{route.rating}</span>
          <span className="text-muted-foreground text-xs">({route.reviewCount})</span>
        </div>

        {/* Selected Indicator */}
        {isSelected && (
          <div className="absolute bottom-3 right-3 bg-primary text-primary-foreground rounded-full p-1.5">
            <Check className="h-4 w-4" />
          </div>
        )}
      </div>

      <CardContent className="p-4">
        {/* Title & Region */}
        <div className="mb-3">
          <h3 className="font-bold text-lg text-heading line-clamp-1 mb-1">
            {route.name}
          </h3>
          <p className="text-sm text-muted-foreground">{route.region}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="flex flex-col items-center p-2 bg-muted/50 rounded-lg">
            <Mountain className="h-4 w-4 text-muted-foreground mb-1" />
            <span className="font-semibold text-sm">{route.distance} km</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-muted/50 rounded-lg">
            <Clock className="h-4 w-4 text-muted-foreground mb-1" />
            <span className="font-semibold text-sm">{formatDuration(route.duration)}</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-muted/50 rounded-lg">
            <TrendingUp className="h-4 w-4 text-muted-foreground mb-1" />
            <span className="font-semibold text-sm">{route.elevationGain}m</span>
          </div>
        </div>

        {/* Difficulty */}
        <div className="mb-4">
          <Badge 
            variant="outline" 
            className={cn("capitalize text-xs", difficultyColors[route.difficulty])}
          >
            {route.difficulty}
          </Badge>
        </div>

        {/* Highlights Icons */}
        {route.highlights.length > 0 && (
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-muted-foreground">Highlights:</span>
            <div className="flex gap-1.5">
              {route.highlights.slice(0, 4).map((highlight) => (
                <span 
                  key={highlight} 
                  className="p-1.5 bg-secondary rounded-md text-secondary-foreground"
                  title={highlight.replace('-', ' ')}
                >
                  {highlightIcons[highlight]}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Facilities Icons */}
        {route.facilities.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-muted-foreground">Facilities:</span>
            <div className="flex gap-1.5">
              {route.facilities.slice(0, 4).map((facility) => (
                <span 
                  key={facility} 
                  className="p-1 bg-accent rounded text-accent-foreground"
                  title={facility.replace('-', ' ')}
                >
                  {facilityIcons[facility]}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => onViewDetails?.(route)}
          >
            View details
          </Button>
          <Button 
            className={cn(
              "flex-1",
              isSelected && "bg-primary-hover"
            )}
            onClick={() => onSelect?.(route)}
          >
            {isSelected ? 'Selected' : 'Select route'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
