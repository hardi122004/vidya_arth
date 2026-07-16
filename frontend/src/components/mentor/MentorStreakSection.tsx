import { Award, Flame, Zap } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MENTOR_STREAK } from "@/data/mentorMockData";
import { cn } from "@/lib/utils";

const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

export function MentorStreakSection() {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">Mentor Streak &amp; Achievements</CardTitle>
          <CardDescription>Your mentoring milestones</CardDescription>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
          <Flame className="h-5 w-5" />
        </div>
      </CardHeader>

      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-brand-purple-500 text-white shadow-lg shadow-orange-500/25">
          <Flame className="h-8 w-8" />
        </div>
        <div>
          <p className="text-3xl font-extrabold text-foreground">
            {MENTOR_STREAK.currentStreakDays}
            <span className="ml-1 text-base font-semibold text-muted-foreground">days</span>
          </p>
          <p className="text-xs font-medium text-muted-foreground">Current streak</p>
        </div>
      </div>

      <div className="mb-6">
        <p className="mb-2.5 text-xs font-semibold text-muted-foreground">This week's activity</p>
        <div className="flex items-center justify-between gap-1.5">
          {MENTOR_STREAK.weeklyActivity.map((active, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold",
                  active ? "gradient-brand text-white" : "bg-muted text-muted-foreground/50",
                )}
              >
                {active && <Flame className="h-3.5 w-3.5" />}
              </div>
              <span className="text-[10px] font-medium text-muted-foreground">{DAY_LABELS[idx]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <p className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
          <Award className="h-3.5 w-3.5" />
          Milestones &amp; Badges
        </p>
        <div className="flex flex-wrap gap-1.5">
          {MENTOR_STREAK.milestones.map((m) => (
            <span
              key={m}
              className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary"
            >
              {m}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto glass flex items-center justify-between rounded-xl p-3">
        <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
          <Zap className="h-3.5 w-3.5" />
          XP Earned
        </span>
        <span className="text-sm font-bold text-foreground">{MENTOR_STREAK.xpEarned.toLocaleString()}</span>
      </div>
    </Card>
  );
}
