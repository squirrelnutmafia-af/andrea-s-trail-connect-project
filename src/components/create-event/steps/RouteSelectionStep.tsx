import { useState, useEffect } from "react";
import { RouteCard } from "@/components/routes/RouteCard";
import { RouteCardSkeleton } from "@/components/routes/RouteCardSkeleton";
import { RouteFiltersComponent } from "@/components/routes/RouteFilters";
import { ActiveFilters } from "@/components/routes/ActiveFilters";
import { SortDropdown } from "@/components/routes/SortDropdown";
import { EmptyState } from "@/components/routes/EmptyState";
import { MobileFilterDrawer } from "@/components/routes/MobileFilterDrawer";
import { useRouteFilters } from "@/hooks/useRouteFilters";
import { mockRoutes } from "@/data/mockRoutes";
import { HikingRoute } from "@/types/route";
import { ScrollArea } from "@/components/ui/scroll-area";

interface RouteSelectionStepProps {
  onSelect: (routeId: string) => void;
  selectedRouteId?: string;
}

export function RouteSelectionStep({ onSelect, selectedRouteId }: RouteSelectionStepProps) {
  const [isLoading, setIsLoading] = useState(true);

  const {
    filters,
    setFilters,
    sortOption,
    setSortOption,
    filteredRoutes,
    activeFilterCount,
    resetFilters,
    defaultFilters,
  } = useRouteFilters(mockRoutes);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectRoute = (route: HikingRoute) => {
    onSelect(route.id);
  };

  const handleViewDetails = (route: HikingRoute) => {
    // For now, just select the route
    onSelect(route.id);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-foreground mb-1">
          Pick a route for your group
        </h2>
        <p className="text-muted-foreground text-sm">
          Find the perfect trail for your next adventure together
        </p>
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <ScrollArea className="h-[calc(100vh-320px)]">
            <div className="bg-card border border-border rounded-xl p-4">
              <RouteFiltersComponent
                filters={filters}
                onChange={setFilters}
                onReset={resetFilters}
                activeFilterCount={activeFilterCount}
              />
            </div>
          </ScrollArea>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <MobileFilterDrawer
                filters={filters}
                onChange={setFilters}
                onReset={resetFilters}
                activeFilterCount={activeFilterCount}
              />
              <p className="text-sm text-muted-foreground">
                {isLoading ? (
                  'Loading routes...'
                ) : (
                  <>
                    <span className="font-semibold text-foreground">{filteredRoutes.length}</span> routes found
                  </>
                )}
              </p>
            </div>
            <SortDropdown value={sortOption} onChange={setSortOption} />
          </div>

          {/* Active Filters */}
          {activeFilterCount > 0 && !isLoading && (
            <div className="mb-4">
              <ActiveFilters
                filters={filters}
                defaultFilters={defaultFilters}
                onChange={setFilters}
                onReset={resetFilters}
              />
            </div>
          )}

          {/* Routes Grid */}
          <ScrollArea className="flex-1 pr-2">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <RouteCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredRoutes.length === 0 ? (
              <EmptyState onReset={resetFilters} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredRoutes.map((route) => (
                  <RouteCard
                    key={route.id}
                    route={route}
                    isSelected={selectedRouteId === route.id}
                    onSelect={handleSelectRoute}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
