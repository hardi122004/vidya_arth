import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Users } from "lucide-react";
import { ScrollRow } from "@/components/dashboard/ScrollRow";
import { TRENDING_SKILLS } from "@/data/dashboardMockData";

export function TrendingSkillsSection() {
  return (
    <ScrollRow title="Trending Skills" subtitle="Real-time skills gaining momentum right now">
      {TRENDING_SKILLS.map(({ name, icon: Icon, growth, learners }, idx) => (
        <motion.div
          key={name}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.04, duration: 0.35 }}
          whileHover={{ y: -4 }}
          className="glass-card group flex w-60 shrink-0 snap-start flex-col gap-4 p-5"
        >
          <div className="flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Icon className="h-5.5 w-5.5" />
            </div>
            <span className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-1 text-xs font-bold text-success">
              <TrendingUp className="h-3 w-3" />
              {growth}
            </span>
          </div>

          <div>
            <h3 className="text-sm font-bold leading-snug text-foreground">{name}</h3>
            <p className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="h-3 w-3" />
              {learners} active learners
            </p>
          </div>

          <button
            type="button"
            className="mt-auto flex items-center justify-center gap-1.5 rounded-xl border border-primary/25 py-2 text-xs font-semibold text-primary transition group-hover:bg-primary/5"
          >
            Explore
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </motion.div>
      ))}
    </ScrollRow>
  );
}
