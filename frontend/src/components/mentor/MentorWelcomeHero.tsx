import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BarChart3, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MENTOR_STREAK } from "@/data/mentorMockData";
import { isAnyDomainAuthorized } from "@/lib/mentorAuth";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

export function MentorWelcomeHero({ firstName }: { firstName: string }) {
  const navigate = useNavigate();

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
            Inspire, guide, and shape the next generation of learners.
          </p>

          <div className="mt-4 flex items-center gap-2">
            <span className="glass flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-foreground/80">
              <Flame className="h-3.5 w-3.5 text-orange-500" />
              {MENTOR_STREAK.currentStreakDays}-day mentoring streak
            </span>
          </div>
        </div>

        <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row">
          <Button
            size="lg"
            className="group w-full shrink-0 sm:w-auto"
            onClick={() => navigate(isAnyDomainAuthorized() ? "/mentor/create-session" : "/mentor/authorize")}
          >
            Create Session
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="w-full shrink-0 sm:w-auto"
            onClick={() => navigate("/mentor-dashboard#community-insights")}
          >
            <BarChart3 className="h-4 w-4" />
            View Analytics
          </Button>
        </div>
      </div>
    </motion.section>
  );
}
