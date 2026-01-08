interface DifficultyBadgeProps {
  level: string;
  className?: string;
}

const DifficultyBadge = ({ level, className = "" }: DifficultyBadgeProps) => {
  const colors: Record<string, string> = {
    T1: "bg-emerald-400",
    T2: "bg-emerald-500",
    T3: "bg-yellow-400",
    T4: "bg-orange-400",
    T5: "bg-red-400",
    T6: "bg-red-600"
  };

  return (
    <span className={`${colors[level] || "bg-muted"} text-white text-xs font-bold px-1.5 py-0.5 rounded ${className}`}>
      {level}
    </span>
  );
};

export default DifficultyBadge;
