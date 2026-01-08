import { useState, useEffect } from 'react';
import { Map } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { RouteCard } from '@/components/routes/RouteCard';
import { RouteCardSkeleton } from '@/components/routes/RouteCardSkeleton';
import { RouteFiltersComponent } from '@/components/routes/RouteFilters';
import { ActiveFilters } from '@/components/routes/ActiveFilters';
import { SortDropdown } from '@/components/routes/SortDropdown';
import { EmptyState } from '@/components/routes/EmptyState';
import { MobileFilterDrawer } from '@/components/routes/MobileFilterDrawer';
import { useRouteFilters } from '@/hooks/useRouteFilters';
import { mockRoutes } from '@/data/mockRoutes';
import { HikingRoute } from '@/types/route';

const Routes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRoute, setSelectedRoute] = useState<HikingRoute | null>(null);

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
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectRoute = (route: HikingRoute) => {
    setSelectedRoute(selectedRoute?.id === route.id ? null : route);
  };

  const handleViewDetails = (route: HikingRoute) => {
    // In the future, this could navigate to a route detail page
    console.log('View details for:', route.name);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="section-container py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Map className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Explore Routes</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Discover hiking trails tailored to your preferences. Use filters to find your perfect adventure.
          </p>
        </div>

        {/* Selected Route Banner */}
        {selectedRoute && (
          <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-sm text-muted-foreground">Selected route:</span>
              <p className="font-semibold text-primary">{selectedRoute.name}</p>
            </div>
            <button
              onClick={() => setSelectedRoute(null)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear selection
            </button>
          </div>
        )}

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-8 bg-card border border-border rounded-xl p-5">
              <RouteFiltersComponent
                filters={filters}
                onChange={setFilters}
                onReset={resetFilters}
                activeFilterCount={activeFilterCount}
              />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
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
              <div className="mb-6">
                <ActiveFilters
                  filters={filters}
                  defaultFilters={defaultFilters}
                  onChange={setFilters}
                  onReset={resetFilters}
                />
              </div>
            )}

            {/* Routes Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <RouteCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredRoutes.length === 0 ? (
              <EmptyState onReset={resetFilters} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredRoutes.map((route) => (
                  <RouteCard
                    key={route.id}
                    route={route}
                    isSelected={selectedRoute?.id === route.id}
                    onSelect={handleSelectRoute}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Routes;
