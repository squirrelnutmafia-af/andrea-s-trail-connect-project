import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  RouteFilters,
  Difficulty,
  TechnicalGrade,
  Highlight,
  RouteFeature,
  Facility,
  DIFFICULTY_LABELS,
  HIGHLIGHT_LABELS,
  FEATURE_LABELS,
  FACILITY_LABELS,
} from '@/types/route';

interface ActiveFiltersProps {
  filters: RouteFilters;
  defaultFilters: RouteFilters;
  onChange: (filters: RouteFilters) => void;
  onReset: () => void;
}

export const ActiveFilters = ({ 
  filters, 
  defaultFilters, 
  onChange, 
  onReset 
}: ActiveFiltersProps) => {
  const chips: { key: string; label: string; onRemove: () => void }[] = [];

  // Difficulty chips
  filters.difficulty.forEach((d) => {
    chips.push({
      key: `difficulty-${d}`,
      label: DIFFICULTY_LABELS[d],
      onRemove: () => onChange({
        ...filters,
        difficulty: filters.difficulty.filter((x) => x !== d),
      }),
    });
  });

  // Technical grade chips
  filters.technicalGrade.forEach((g) => {
    chips.push({
      key: `grade-${g}`,
      label: g,
      onRemove: () => onChange({
        ...filters,
        technicalGrade: filters.technicalGrade.filter((x) => x !== g),
      }),
    });
  });

  // Distance chip (only if changed from default)
  if (
    filters.distanceMin !== defaultFilters.distanceMin ||
    filters.distanceMax !== defaultFilters.distanceMax
  ) {
    chips.push({
      key: 'distance',
      label: `${filters.distanceMin}-${filters.distanceMax} km`,
      onRemove: () => onChange({
        ...filters,
        distanceMin: defaultFilters.distanceMin,
        distanceMax: defaultFilters.distanceMax,
      }),
    });
  }

  // Duration chip (only if changed from default)
  if (
    filters.durationMin !== defaultFilters.durationMin ||
    filters.durationMax !== defaultFilters.durationMax
  ) {
    chips.push({
      key: 'duration',
      label: `${filters.durationMin}-${filters.durationMax}h`,
      onRemove: () => onChange({
        ...filters,
        durationMin: defaultFilters.durationMin,
        durationMax: defaultFilters.durationMax,
      }),
    });
  }

  // Highlight chips
  filters.highlights.forEach((h) => {
    chips.push({
      key: `highlight-${h}`,
      label: HIGHLIGHT_LABELS[h],
      onRemove: () => onChange({
        ...filters,
        highlights: filters.highlights.filter((x) => x !== h),
      }),
    });
  });

  // Feature chips
  filters.features.forEach((f) => {
    chips.push({
      key: `feature-${f}`,
      label: FEATURE_LABELS[f],
      onRemove: () => onChange({
        ...filters,
        features: filters.features.filter((x) => x !== f),
      }),
    });
  });

  // Facility chips
  filters.facilities.forEach((f) => {
    chips.push({
      key: `facility-${f}`,
      label: FACILITY_LABELS[f],
      onRemove: () => onChange({
        ...filters,
        facilities: filters.facilities.filter((x) => x !== f),
      }),
    });
  });

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted-foreground">Active filters:</span>
      {chips.map((chip) => (
        <Badge
          key={chip.key}
          variant="secondary"
          className="flex items-center gap-1 pr-1"
        >
          {chip.label}
          <button
            onClick={chip.onRemove}
            className="ml-1 hover:bg-muted rounded-full p-0.5 transition-colors"
            aria-label={`Remove ${chip.label} filter`}
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      {chips.length > 2 && (
        <Button variant="ghost" size="sm" onClick={onReset} className="text-primary text-xs">
          Clear all
        </Button>
      )}
    </div>
  );
};
