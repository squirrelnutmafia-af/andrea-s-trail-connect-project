import { useState } from 'react';
import { 
  Mountain, 
  Clock, 
  Gauge, 
  MapPin, 
  Sparkles, 
  Building,
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { 
  RouteFilters as IRouteFilters,
  Difficulty,
  TechnicalGrade,
  Highlight,
  RouteFeature,
  Facility,
  DIFFICULTY_LABELS,
  TECHNICAL_GRADE_LABELS,
  HIGHLIGHT_LABELS,
  FEATURE_LABELS,
  FACILITY_LABELS,
} from '@/types/route';
import { cn } from '@/lib/utils';

interface RouteFiltersProps {
  filters: IRouteFilters;
  onChange: (filters: IRouteFilters) => void;
  onReset: () => void;
  activeFilterCount: number;
}

interface FilterSectionProps {
  title: string;
  icon: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

const FilterSection = ({ title, icon, defaultOpen = true, children }: FilterSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border-b border-border pb-4">
      <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:text-primary transition-colors">
        <div className="flex items-center gap-2 font-semibold">
          {icon}
          <span>{title}</span>
        </div>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-3">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

export const RouteFiltersComponent = ({ 
  filters, 
  onChange, 
  onReset, 
  activeFilterCount 
}: RouteFiltersProps) => {
  const toggleDifficulty = (difficulty: Difficulty) => {
    const updated = filters.difficulty.includes(difficulty)
      ? filters.difficulty.filter(d => d !== difficulty)
      : [...filters.difficulty, difficulty];
    onChange({ ...filters, difficulty: updated });
  };

  const toggleTechnicalGrade = (grade: TechnicalGrade) => {
    const updated = filters.technicalGrade.includes(grade)
      ? filters.technicalGrade.filter(g => g !== grade)
      : [...filters.technicalGrade, grade];
    onChange({ ...filters, technicalGrade: updated });
  };

  const toggleHighlight = (highlight: Highlight) => {
    const updated = filters.highlights.includes(highlight)
      ? filters.highlights.filter(h => h !== highlight)
      : [...filters.highlights, highlight];
    onChange({ ...filters, highlights: updated });
  };

  const toggleFeature = (feature: RouteFeature) => {
    const updated = filters.features.includes(feature)
      ? filters.features.filter(f => f !== feature)
      : [...filters.features, feature];
    onChange({ ...filters, features: updated });
  };

  const toggleFacility = (facility: Facility) => {
    const updated = filters.facilities.includes(facility)
      ? filters.facilities.filter(f => f !== facility)
      : [...filters.facilities, facility];
    onChange({ ...filters, facilities: updated });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <h2 className="font-bold text-lg">Filters</h2>
        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onReset} className="text-primary hover:text-primary-hover">
            Reset all ({activeFilterCount})
          </Button>
        )}
      </div>

      {/* Difficulty */}
      <FilterSection title="Difficulty" icon={<Gauge className="h-4 w-4" />}>
        <div className="space-y-3">
          {(Object.keys(DIFFICULTY_LABELS) as Difficulty[]).map((difficulty) => (
            <div key={difficulty} className="flex items-center gap-3">
              <Checkbox
                id={`difficulty-${difficulty}`}
                checked={filters.difficulty.includes(difficulty)}
                onCheckedChange={() => toggleDifficulty(difficulty)}
              />
              <Label 
                htmlFor={`difficulty-${difficulty}`} 
                className="cursor-pointer text-sm font-normal"
              >
                {DIFFICULTY_LABELS[difficulty]}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Distance */}
      <FilterSection title="Distance" icon={<Mountain className="h-4 w-4" />}>
        <div className="px-2">
          <div className="flex justify-between text-sm text-muted-foreground mb-3">
            <span>{filters.distanceMin} km</span>
            <span>{filters.distanceMax} km</span>
          </div>
          <Slider
            min={0}
            max={100}
            step={1}
            value={[filters.distanceMin, filters.distanceMax]}
            onValueChange={([min, max]) => onChange({ ...filters, distanceMin: min, distanceMax: max })}
            className="mb-2"
          />
          <div className="flex gap-2 mt-4 flex-wrap">
            {[
              { label: '< 5 km', min: 0, max: 5 },
              { label: '5-10 km', min: 5, max: 10 },
              { label: '10-20 km', min: 10, max: 20 },
              { label: '20+ km', min: 20, max: 100 },
            ].map((preset) => (
              <Button
                key={preset.label}
                variant="outline"
                size="sm"
                className={cn(
                  "text-xs",
                  filters.distanceMin === preset.min && filters.distanceMax === preset.max && "bg-primary text-primary-foreground"
                )}
                onClick={() => onChange({ ...filters, distanceMin: preset.min, distanceMax: preset.max })}
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </div>
      </FilterSection>

      {/* Duration */}
      <FilterSection title="Duration" icon={<Clock className="h-4 w-4" />}>
        <div className="px-2">
          <div className="flex justify-between text-sm text-muted-foreground mb-3">
            <span>{filters.durationMin}h</span>
            <span>{filters.durationMax}h+</span>
          </div>
          <Slider
            min={0}
            max={24}
            step={0.5}
            value={[filters.durationMin, filters.durationMax]}
            onValueChange={([min, max]) => onChange({ ...filters, durationMin: min, durationMax: max })}
            className="mb-2"
          />
          <div className="flex gap-2 mt-4 flex-wrap">
            {[
              { label: '< 2h', min: 0, max: 2 },
              { label: '2-4h', min: 2, max: 4 },
              { label: '4-6h', min: 4, max: 6 },
              { label: '6h+', min: 6, max: 24 },
            ].map((preset) => (
              <Button
                key={preset.label}
                variant="outline"
                size="sm"
                className={cn(
                  "text-xs",
                  filters.durationMin === preset.min && filters.durationMax === preset.max && "bg-primary text-primary-foreground"
                )}
                onClick={() => onChange({ ...filters, durationMin: preset.min, durationMax: preset.max })}
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </div>
      </FilterSection>

      {/* Technical Grade */}
      <FilterSection title="Technical Grade (T-Scale)" icon={<MapPin className="h-4 w-4" />} defaultOpen={false}>
        <div className="space-y-3">
          {(Object.keys(TECHNICAL_GRADE_LABELS) as TechnicalGrade[]).map((grade) => (
            <div key={grade} className="flex items-center gap-3">
              <Checkbox
                id={`grade-${grade}`}
                checked={filters.technicalGrade.includes(grade)}
                onCheckedChange={() => toggleTechnicalGrade(grade)}
              />
              <Label 
                htmlFor={`grade-${grade}`} 
                className="cursor-pointer text-sm font-normal flex items-center gap-2"
              >
                <span className="font-semibold">{grade}</span>
                <span className="text-muted-foreground">–</span>
                <span>{TECHNICAL_GRADE_LABELS[grade]}</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3.5 w-3.5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs">
                    {grade === 'T1' && 'Well-marked trails, no risk of falling'}
                    {grade === 'T2' && 'Steep sections possible, some sure-footedness required'}
                    {grade === 'T3' && 'Exposed sections, hands needed for balance'}
                    {grade === 'T4' && 'Familiarity with alpine terrain required'}
                    {grade === 'T5' && 'Often pathless, climbing sections'}
                    {grade === 'T6' && 'Mostly pathless, sustained climbing'}
                  </TooltipContent>
                </Tooltip>
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Highlights */}
      <FilterSection title="Highlights" icon={<Sparkles className="h-4 w-4" />} defaultOpen={false}>
        <div className="grid grid-cols-2 gap-3">
          {(Object.keys(HIGHLIGHT_LABELS) as Highlight[]).map((highlight) => (
            <div key={highlight} className="flex items-center gap-2">
              <Checkbox
                id={`highlight-${highlight}`}
                checked={filters.highlights.includes(highlight)}
                onCheckedChange={() => toggleHighlight(highlight)}
              />
              <Label 
                htmlFor={`highlight-${highlight}`} 
                className="cursor-pointer text-sm font-normal"
              >
                {HIGHLIGHT_LABELS[highlight]}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Route Features */}
      <FilterSection title="Route Features" icon={<Mountain className="h-4 w-4" />} defaultOpen={false}>
        <div className="space-y-3">
          {(Object.keys(FEATURE_LABELS) as RouteFeature[]).map((feature) => (
            <div key={feature} className="flex items-center gap-3">
              <Checkbox
                id={`feature-${feature}`}
                checked={filters.features.includes(feature)}
                onCheckedChange={() => toggleFeature(feature)}
              />
              <Label 
                htmlFor={`feature-${feature}`} 
                className="cursor-pointer text-sm font-normal"
              >
                {FEATURE_LABELS[feature]}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Facilities */}
      <FilterSection title="Facilities" icon={<Building className="h-4 w-4" />} defaultOpen={false}>
        <div className="space-y-3">
          {(Object.keys(FACILITY_LABELS) as Facility[]).map((facility) => (
            <div key={facility} className="flex items-center gap-3">
              <Checkbox
                id={`facility-${facility}`}
                checked={filters.facilities.includes(facility)}
                onCheckedChange={() => toggleFacility(facility)}
              />
              <Label 
                htmlFor={`facility-${facility}`} 
                className="cursor-pointer text-sm font-normal"
              >
                {FACILITY_LABELS[facility]}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>
    </div>
  );
};
