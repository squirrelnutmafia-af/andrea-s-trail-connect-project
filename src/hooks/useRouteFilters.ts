import { useState, useMemo, useCallback } from 'react';
import { HikingRoute, RouteFilters, SortOption } from '@/types/route';

const DEFAULT_FILTERS: RouteFilters = {
  difficulty: [],
  technicalGrade: [],
  distanceMin: 0,
  distanceMax: 100,
  durationMin: 0,
  durationMax: 24,
  highlights: [],
  features: [],
  facilities: [],
};

export const useRouteFilters = (routes: HikingRoute[]) => {
  const [filters, setFilters] = useState<RouteFilters>(DEFAULT_FILTERS);
  const [sortOption, setSortOption] = useState<SortOption>('popular');

  const activeFilterCount = useMemo(() => {
    let count = 0;
    count += filters.difficulty.length;
    count += filters.technicalGrade.length;
    count += filters.highlights.length;
    count += filters.features.length;
    count += filters.facilities.length;
    if (filters.distanceMin !== DEFAULT_FILTERS.distanceMin || filters.distanceMax !== DEFAULT_FILTERS.distanceMax) {
      count++;
    }
    if (filters.durationMin !== DEFAULT_FILTERS.durationMin || filters.durationMax !== DEFAULT_FILTERS.durationMax) {
      count++;
    }
    return count;
  }, [filters]);

  const filteredRoutes = useMemo(() => {
    return routes.filter((route) => {
      // Difficulty filter
      if (filters.difficulty.length > 0 && !filters.difficulty.includes(route.difficulty)) {
        return false;
      }

      // Technical grade filter
      if (filters.technicalGrade.length > 0 && !filters.technicalGrade.includes(route.technicalGrade)) {
        return false;
      }

      // Distance filter
      if (route.distance < filters.distanceMin || route.distance > filters.distanceMax) {
        return false;
      }

      // Duration filter
      if (route.duration < filters.durationMin || route.duration > filters.durationMax) {
        return false;
      }

      // Highlights filter (any match)
      if (filters.highlights.length > 0 && !filters.highlights.some((h) => route.highlights.includes(h))) {
        return false;
      }

      // Features filter (any match)
      if (filters.features.length > 0 && !filters.features.some((f) => route.features.includes(f))) {
        return false;
      }

      // Facilities filter (any match)
      if (filters.facilities.length > 0 && !filters.facilities.some((f) => route.facilities.includes(f))) {
        return false;
      }

      return true;
    });
  }, [routes, filters]);

  const sortedRoutes = useMemo(() => {
    const sorted = [...filteredRoutes];

    switch (sortOption) {
      case 'popular':
        sorted.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'distance-asc':
        sorted.sort((a, b) => a.distance - b.distance);
        break;
      case 'distance-desc':
        sorted.sort((a, b) => b.distance - a.distance);
        break;
      case 'duration-asc':
        sorted.sort((a, b) => a.duration - b.duration);
        break;
      case 'elevation':
        sorted.sort((a, b) => b.elevationGain - a.elevationGain);
        break;
    }

    return sorted;
  }, [filteredRoutes, sortOption]);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  return {
    filters,
    setFilters,
    sortOption,
    setSortOption,
    filteredRoutes: sortedRoutes,
    activeFilterCount,
    resetFilters,
    defaultFilters: DEFAULT_FILTERS,
  };
};
