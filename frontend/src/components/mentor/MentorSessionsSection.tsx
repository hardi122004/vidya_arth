import { motion } from "framer-motion";
import { CalendarClock, Radio, Users2 } from "lucide-react";
import { ScrollRow } from "@/components/dashboard/ScrollRow";
import { MENTOR_SESSIONS, type MentorSession } from "@/data/mentorMockData";
import { cn } from "@/lib/utils";

const TYPE_STYLES: Record<MentorSession["type"], string> = {
  Workshop: "bg-primary/10 text-primary",
  AMA: "bg-brand-purple-500/10 text-brand-purple-600 dark:text-brand-purple-300",
  Discussion: "bg-success/10 text-success",
};

export function MentorSessionsSection() {
  return (
    <ScrollRow title="Upcoming Sessions" subtitle="Workshops, AMAs, and discussions you're hosting">
      {MENTOR_SESSIONS.map(({ title, registered, datetime, type }, idx) => (
        <motion.div
          key={title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.04, duration: 0.35 }}
          whileHover={{ y: -4 }}
          className="glass-card flex w-72 shrink-0 snap-start flex-col gap-4 p-5"
        >
          <span
            className={cn(
              "inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold",
              TYPE_STYLES[type],
            )}
          >
            {type === "Workshop" && <Radio className="h-3 w-3" />}
            {type.toUpperCase()}
          </span>

          <div>
            <h3 className="text-sm font-bold leading-snug text-foreground">{title}</h3>
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Users2 className="h-3.5 w-3.5" />
              {registered} learners registered
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <CalendarClock className="h-3.5 w-3.5" />
              {datetime}
            </p>
          </div>

          <button
            type="button"
            className="gradient-brand mt-auto rounded-xl py-2 text-xs font-semibold text-white shadow-sm transition hover:brightness-110"
          >
            Manage Session
          </button>
        </motion.div>
      ))}
    </ScrollRow>
  );
}
