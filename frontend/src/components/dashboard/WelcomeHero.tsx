import { motion } from "framer-motion";
import { ArrowRight, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LEARNING_STREAK } from "@/data/dashboardMockData";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

export function WelcomeHero({ firstName }: { firstName: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card relative overflow-hidden p-6 sm:p-8"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-purple-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-brand-blue-400/20 blur-3xl" />

      <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            {getGreeting()}, {firstName} <span aria-hidden="true">👋</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Let's continue your learning journey.
          </p>

          <div className="mt-4 flex items-center gap-2">
            <span className="glass flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-foreground/80">
              <Flame className="h-3.5 w-3.5 text-orange-500" />
              {LEARNING_STREAK.currentStreakDays}-day streak
            </span>
          </div>
        </div>

        <Button size="lg" className="group w-full shrink-0 sm:w-auto">
          Continue Learning
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </motion.section>
  );
}
