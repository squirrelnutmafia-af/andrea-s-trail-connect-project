import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { RouteFiltersComponent } from './RouteFilters';
import { RouteFilters } from '@/types/route';
import { Badge } from '@/components/ui/badge';

interface MobileFilterDrawerProps {
  filters: RouteFilters;
  onChange: (filters: RouteFilters) => void;
  onReset: () => void;
  activeFilterCount: number;
}

export const MobileFilterDrawer = ({
  filters,
  onChange,
  onReset,
  activeFilterCount,
}: MobileFilterDrawerProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2 lg:hidden">
          <Filter className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <Badge variant="default" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[85vh] overflow-y-auto">
        <SheetHeader className="pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <SheetTitle>Filter Routes</SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-5 w-5" />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>
        <div className="py-4">
          <RouteFiltersComponent
            filters={filters}
            onChange={onChange}
            onReset={onReset}
            activeFilterCount={activeFilterCount}
          />
        </div>
        <div className="sticky bottom-0 bg-background pt-4 pb-2 border-t border-border">
          <SheetClose asChild>
            <Button className="w-full">Apply filters</Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};
