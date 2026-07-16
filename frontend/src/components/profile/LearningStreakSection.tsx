import { useMemo, useState } from "react";
import { Flame, Trophy, CalendarCheck2, BarChart3 } from "lucide-react";
import { SectionCard } from "@/components/profile/SectionCard";
import { buildContributionGrid, computeStreakStats, type ContributionDay } from "@/data/streakMockData";
import { cn } from "@/lib/utils";

const LEVEL_STYLES = [
  "bg-muted",
  "bg-brand-blue-200 dark:bg-brand-blue-900/60",
  "bg-brand-blue-400 dark:bg-brand-blue-600",
  "bg-brand-purple-500 dark:bg-brand-purple-500",
  "bg-brand-purple-700 dark:bg-brand-purple-300",
];

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function LearningStreakSection() {
  const [hovered, setHovered] = useState<string | null>(null);
  const contributionDays = useMemo(() => buildContributionGrid(53), []);
  const stats = useMemo(() => computeStreakStats(contributionDays), [contributionDays]);

  const weeks = useMemo(() => {
    const result: ContributionDay[][] = [];
    for (let i = 0; i < contributionDays.length; i += 7) {
      result.push(contributionDays.slice(i, i + 7));
    }
    return result;
  }, [contributionDays]);

  const monthMarkers = useMemo(() => {
    const markers: { label: string; weekIndex: number }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, idx) => {
      const firstDay = new Date(week[0].date);
      const month = firstDay.getMonth();
      if (month !== lastMonth) {
        markers.push({ label: MONTH_LABELS[month], weekIndex: idx });
        lastMonth = month;
      }
    });
    return markers;
  }, [weeks]);

  return (
    <SectionCard
      icon={Flame}
      title="Learning Streak"
      description="Your daily learning activity, GitHub-style."
      badge="Optional"
    >
      <div className="mb-6 grid grid-cols-3 gap-3">
        <div className="glass flex flex-col items-center gap-1 rounded-2xl p-4 text-center">
          <Flame className="h-5 w-5 text-orange-500" />
          <span className="text-xl font-extrabold text-foreground">{stats.current}</span>
          <span className="text-[11px] font-medium text-muted-foreground">Current streak</span>
        </div>
        <div className="glass flex flex-col items-center gap-1 rounded-2xl p-4 text-center">
          <Trophy className="h-5 w-5 text-brand-purple-500" />
          <span className="text-xl font-extrabold text-foreground">{stats.longest}</span>
          <span className="text-[11px] font-medium text-muted-foreground">Longest streak</span>
        </div>
        <div className="glass flex flex-col items-center gap-1 rounded-2xl p-4 text-center">
          <CalendarCheck2 className="h-5 w-5 text-primary" />
          <span className="text-xl font-extrabold text-foreground">{stats.totalActiveDays}</span>
          <span className="text-[11px] font-medium text-muted-foreground">Total learning days</span>
        </div>
      </div>

      <div className="scrollbar-hide overflow-x-auto">
        <div className="min-w-[640px]">
          <div className="mb-1.5 flex gap-[3px] pl-8 text-[10px] font-medium text-muted-foreground">
            {monthMarkers.map((m) => (
              <span key={`${m.label}-${m.weekIndex}`} style={{ marginLeft: m.weekIndex === 0 ? 0 : undefined }}>
                {m.label}
              </span>
            ))}
          </div>
          <div className="flex gap-[3px]">
            <div className="flex flex-col justify-between gap-[3px] pr-1.5 text-[10px] font-medium text-muted-foreground">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>
            <div className="flex gap-[3px]">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[3px]">
                  {week.map((day) => (
                    <div
                      key={day.date}
                      onMouseEnter={() => setHovered(day.date)}
                      onMouseLeave={() => setHovered(null)}
                      className={cn(
                        "h-3 w-3 rounded-[3px] transition-transform",
                        LEVEL_STYLES[day.level],
                        hovered === day.date && "scale-125",
                      )}
                      title={`${day.date}: ${day.level > 0 ? `${day.level}/4 activity` : "No activity"}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <BarChart3 className="h-3.5 w-3.5" />
          Monthly activity heatmap
        </span>
        <div className="flex items-center gap-1">
          <span>Less</span>
          {LEVEL_STYLES.map((style, idx) => (
            <div key={idx} className={cn("h-3 w-3 rounded-[3px]", style)} />
          ))}
          <span>More</span>
        </div>
      </div>
    </SectionCard>
  );
}
