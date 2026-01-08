import { Footprints, Bike } from "lucide-react";
import StatsBar from "./StatsBar";

interface StatsData {
  hiking: number;
  cycling: number;
  viaFerrata: number;
  other: number;
  distance: string;
  elevation: string;
}

interface DifficultyStatItem {
  level: string;
  count: number;
}

interface StatsSectionProps {
  statsTab: string;
  setStatsTab: (tab: string) => void;
  currentStats: StatsData;
  difficultyStats: DifficultyStatItem[];
}

const StatsSection = ({ statsTab, setStatsTab, currentStats, difficultyStats }: StatsSectionProps) => {
  const maxDifficultyCount = Math.max(...difficultyStats.map((d) => d.count));

  return (
    <div className="bg-card rounded-xl border border-border p-4 mb-6">
      <div className="flex items-center gap-6 mb-4 text-sm">
        <button
          onClick={() => setStatsTab("last-month")}
          className={`${statsTab === "last-month" ? "text-foreground font-semibold" : "text-muted-foreground"}`}
        >
          LAST MONTH | 9
        </button>
        <button
          onClick={() => setStatsTab("all-time")}
          className={`${statsTab === "all-time" ? "text-foreground font-semibold" : "text-muted-foreground"}`}
        >
          ALL TIME | 49
        </button>
        <button
          onClick={() => setStatsTab("last-year")}
          className={`${statsTab === "last-year" ? "text-foreground font-semibold" : "text-muted-foreground"}`}
        >
          LAST YEAR | 43
        </button>
      </div>

      <div className="flex items-center gap-4 mb-4 text-sm">
        <div className="flex items-center gap-1">
          <Footprints className="w-4 h-4 text-muted-foreground" />
          <span>Hiking | {currentStats.hiking}</span>
        </div>
        <div className="flex items-center gap-1">
          <Bike className="w-4 h-4 text-muted-foreground" />
          <span>{currentStats.cycling}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>⛏️</span>
          <span>{currentStats.viaFerrata}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>🔄</span>
          <span>{currentStats.other}</span>
        </div>
      </div>

      <div className="flex items-center gap-6 mb-6 text-sm">
        <div>
          <span className="text-muted-foreground">Distance: </span>
          <span className="font-semibold">{currentStats.distance}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Elevation: </span>
          <span className="font-semibold">{currentStats.elevation}</span>
        </div>
      </div>

      <div className="flex items-end gap-3">
        {difficultyStats.map((stat) => (
          <StatsBar key={stat.level} level={stat.level} count={stat.count} maxCount={maxDifficultyCount} />
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
