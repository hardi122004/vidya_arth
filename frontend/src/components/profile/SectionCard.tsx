import type { ReactNode } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: "Required" | "Optional";
  action?: ReactNode;
  children: ReactNode;
}

export function SectionCard({ icon: Icon, title, description, badge, action, children }: SectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4 }}
    >
      <Card>
        <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Icon className="h-5.5 w-5.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-foreground sm:text-lg">{title}</h2>
                {badge && (
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                      badge === "Required"
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {badge}
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
          {action}
        </div>

        {children}
      </Card>
    </motion.div>
  );
}
