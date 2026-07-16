import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { ScrollRow } from "@/components/dashboard/ScrollRow";
import { MENTOR_IMPACT_STATS } from "@/data/mentorMockData";

export function MentorImpactSection() {
  return (
    <ScrollRow title="Mentor Impact" subtitle="Your achievements and activity at a glance">
      {MENTOR_IMPACT_STATS.map(({ label, value, change, icon: Icon }, idx) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05, duration: 0.35 }}
          whileHover={{ y: -4 }}
          className="glass-card flex w-56 shrink-0 snap-start flex-col gap-4 p-5"
        >
          <div className="flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl gradient-brand text-white shadow-md shadow-primary/25">
              <Icon className="h-5.5 w-5.5" />
            </div>
            <span className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-1 text-xs font-bold text-success">
              <TrendingUp className="h-3 w-3" />
              {change}
            </span>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-foreground">{value}</p>
            <p className="mt-1 text-xs font-medium text-muted-foreground">{label}</p>
          </div>
        </motion.div>
      ))}
    </ScrollRow>
  );
}
