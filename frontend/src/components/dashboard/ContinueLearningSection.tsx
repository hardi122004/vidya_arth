import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import { ScrollRow } from "@/components/dashboard/ScrollRow";
import { Progress } from "@/components/ui/progress";
import { CONTINUE_LEARNING } from "@/data/dashboardMockData";

export function ContinueLearningSection() {
  return (
    <ScrollRow title="Continue Learning" subtitle="Pick up right where you left off">
      {CONTINUE_LEARNING.map(({ name, category, progress }, idx) => (
        <motion.div
          key={name}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05, duration: 0.35 }}
          whileHover={{ y: -4 }}
          className="glass-card group flex w-72 shrink-0 snap-start flex-col gap-4 p-5"
        >
          <div className="flex h-24 items-center justify-center rounded-2xl gradient-brand text-white">
            <PlayCircle className="h-10 w-10" strokeWidth={1.5} />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">{category}</p>
            <h3 className="mt-1 text-sm font-bold leading-snug text-foreground">{name}</h3>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span className="font-semibold text-foreground">{progress}%</span>
            </div>
            <Progress value={progress} />
          </div>

          <button
            type="button"
            className="gradient-brand mt-auto rounded-xl py-2 text-xs font-semibold text-white shadow-sm transition hover:brightness-110"
          >
            Continue
          </button>
        </motion.div>
      ))}
    </ScrollRow>
  );
}
