import { motion } from "framer-motion";
import { CalendarDays, CheckCircle2, Circle, Target } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TODAY_TASKS, UPCOMING_GOALS, WEEKLY_SCHEDULE } from "@/data/dashboardMockData";
import { cn } from "@/lib/utils";

export function StudyPlannerCard() {
  const completedCount = TODAY_TASKS.filter((t) => t.done).length;
  const progressPct = Math.round((completedCount / TODAY_TASKS.length) * 100);
  const maxHours = Math.max(...WEEKLY_SCHEDULE.map((d) => d.hours), 1);

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">Study Planner</CardTitle>
          <CardDescription>Stay on top of your goals</CardDescription>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <CalendarDays className="h-5 w-5" />
        </div>
      </CardHeader>

      <div className="mb-5">
        <div className="mb-2 flex items-center justify-between text-xs font-semibold text-muted-foreground">
          <span>Today's progress</span>
          <span>{completedCount}/{TODAY_TASKS.length} done</span>
        </div>
        <Progress value={progressPct} />
      </div>

      <div className="mb-5 space-y-2">
        {TODAY_TASKS.map((task) => (
          <div key={task.label} className="flex items-center gap-2.5 text-sm">
            {task.done ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
            ) : (
              <Circle className="h-4 w-4 shrink-0 text-muted-foreground/40" />
            )}
            <span className={cn(task.done ? "text-muted-foreground line-through" : "text-foreground")}>
              {task.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mb-5">
        <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
          <Target className="h-3.5 w-3.5" />
          Upcoming goals
        </p>
        <div className="space-y-1.5">
          {UPCOMING_GOALS.map((goal) => (
            <div key={goal.label} className="flex items-center justify-between text-xs">
              <span className="text-foreground">{goal.label}</span>
              <span className="text-muted-foreground">{goal.due}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto">
        <p className="mb-2 text-xs font-semibold text-muted-foreground">This week</p>
        <div className="flex items-end justify-between gap-1.5">
          {WEEKLY_SCHEDULE.map((d, idx) => (
            <div key={d.day} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="flex h-16 w-full items-end overflow-hidden rounded-md bg-muted">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.hours / maxHours) * 100}%` }}
                  transition={{ delay: idx * 0.05, duration: 0.5, ease: "easeOut" }}
                  className="w-full gradient-brand"
                />
              </div>
              <span className="text-[10px] font-medium text-muted-foreground">{d.day}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
