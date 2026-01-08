import { SearchX, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onReset: () => void;
}

export const EmptyState = ({ onReset }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <SearchX className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-bold mb-2">No routes found</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        We couldn't find any routes matching your current filters. Try adjusting your criteria or reset the filters to see all available routes.
      </p>
      <Button onClick={onReset} className="gap-2">
        <RefreshCcw className="h-4 w-4" />
        Reset all filters
      </Button>
    </div>
  );
};
