import DifficultyBadge from "./DifficultyBadge";

interface StatsBarProps {
  level: string;
  count: number;
  maxCount: number;
}

const StatsBar = ({ level, count, maxCount }: StatsBarProps) => {
  const height = maxCount > 0 ? (count / maxCount) * 80 : 0;
  const colors: Record<string, string> = {
    T1: "bg-emerald-400",
    T2: "bg-emerald-500",
    T3: "bg-yellow-400",
    T4: "bg-orange-400",
    T5: "bg-red-400",
    T6: "bg-red-600"
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="h-20 w-8 flex items-end">
        <div
          className={`w-full rounded-t-md ${colors[level]} transition-all duration-300`}
          style={{ height: `${height}px` }}
        />
      </div>
      <DifficultyBadge level={level} />
      <span className="text-xs text-muted-foreground">{count}</span>
    </div>
  );
};

export default StatsBar;
