import { motion } from "framer-motion";
import { Flame, Target, Zap } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LEARNING_STREAK } from "@/data/dashboardMockData";
import { cn } from "@/lib/utils";

const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

export function LearningStreakCard() {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">Learning Streak</CardTitle>
          <CardDescription>Keep the momentum going</CardDescription>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
          <Flame className="h-5 w-5" />
        </div>
      </CardHeader>

      <div className="mb-6 flex items-center gap-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="flex flex-col items-center justify-center"
        >
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-brand-purple-500 text-white shadow-lg shadow-orange-500/25">
            <Flame className="h-8 w-8" />
          </div>
        </motion.div>
        <div>
          <p className="text-3xl font-extrabold text-foreground">
            {LEARNING_STREAK.currentStreakDays}
            <span className="ml-1 text-base font-semibold text-muted-foreground">days</span>
          </p>
          <p className="text-xs font-medium text-muted-foreground">Current streak</p>
        </div>
      </div>

      <div className="mb-6">
        <p className="mb-2.5 text-xs font-semibold text-muted-foreground">This week's activity</p>
        <div className="flex items-center justify-between gap-1.5">
          {LEARNING_STREAK.weeklyActivity.map((active, idx) => (
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

      <div className="mt-auto grid grid-cols-2 gap-3">
        <div className="glass flex flex-col gap-1 rounded-xl p-3">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <Target className="h-3.5 w-3.5" />
            Daily goal
          </span>
          <span className="text-sm font-bold text-foreground">{LEARNING_STREAK.dailyGoalMinutes} min</span>
        </div>
        <div className="glass flex flex-col gap-1 rounded-xl p-3">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <Zap className="h-3.5 w-3.5" />
            XP earned
          </span>
          <span className="text-sm font-bold text-foreground">{LEARNING_STREAK.xpEarned.toLocaleString()}</span>
        </div>
      </div>
    </Card>
  );
}
