import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const RouteCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      {/* Image skeleton */}
      <Skeleton className="h-48 w-full rounded-none" />
      
      <CardContent className="p-4">
        {/* Title & Region */}
        <div className="mb-3">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/3" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <Skeleton className="h-14 rounded-lg" />
          <Skeleton className="h-14 rounded-lg" />
          <Skeleton className="h-14 rounded-lg" />
        </div>

        {/* Difficulty */}
        <div className="mb-4">
          <Skeleton className="h-6 w-24" />
        </div>

        {/* Highlights */}
        <div className="flex items-center gap-2 mb-3">
          <Skeleton className="h-4 w-16" />
          <div className="flex gap-1.5">
            <Skeleton className="h-7 w-7 rounded-md" />
            <Skeleton className="h-7 w-7 rounded-md" />
            <Skeleton className="h-7 w-7 rounded-md" />
          </div>
        </div>

        {/* Facilities */}
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-4 w-16" />
          <div className="flex gap-1.5">
            <Skeleton className="h-6 w-6 rounded" />
            <Skeleton className="h-6 w-6 rounded" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </div>
      </CardContent>
    </Card>
  );
};
