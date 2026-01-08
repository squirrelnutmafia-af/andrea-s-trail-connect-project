import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SortOption } from '@/types/route';
import { ArrowUpDown } from 'lucide-react';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortLabels: Record<SortOption, string> = {
  popular: 'Most popular',
  rating: 'Best rated',
  'distance-asc': 'Shortest distance',
  'distance-desc': 'Longest distance',
  'duration-asc': 'Shortest duration',
  elevation: 'Highest elevation gain',
};

export const SortDropdown = ({ value, onChange }: SortDropdownProps) => {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
      <span className="text-sm text-muted-foreground hidden sm:block">Sort by:</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent>
          {(Object.keys(sortLabels) as SortOption[]).map((option) => (
            <SelectItem key={option} value={option}>
              {sortLabels[option]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
