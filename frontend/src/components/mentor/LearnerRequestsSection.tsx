import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, GraduationCap } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LEARNER_REQUESTS, type LearnerRequest } from "@/data/mentorMockData";
import { cn } from "@/lib/utils";

const PROGRESS_STYLES: Record<LearnerRequest["progress"], string> = {
  Beginner: "bg-muted text-muted-foreground",
  Intermediate: "bg-primary/10 text-primary",
  Advanced: "bg-success/10 text-success",
};

export function LearnerRequestsSection() {
  const [accepted, setAccepted] = useState<string[]>([]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Learner Requests</CardTitle>
        <CardDescription>Pending learners waiting for your guidance</CardDescription>
      </CardHeader>

      <div className="grid gap-4 sm:grid-cols-2">
        {LEARNER_REQUESTS.map((req, idx) => {
          const isAccepted = accepted.includes(req.name);
          return (
            <motion.div
              key={req.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="glass flex items-center gap-3 rounded-2xl p-4"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl gradient-brand text-sm font-bold text-white">
                {req.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-foreground">{req.name}</p>
                <p className="flex items-center gap-1.5 truncate text-xs text-muted-foreground">
                  <GraduationCap className="h-3.5 w-3.5 shrink-0" />
                  {req.request}
                </p>
                <span
                  className={cn(
                    "mt-1.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold",
                    PROGRESS_STYLES[req.progress],
                  )}
                >
                  {req.progress}
                </span>
              </div>
              <Button
                size="sm"
                variant={isAccepted ? "secondary" : "primary"}
                disabled={isAccepted}
                onClick={() => setAccepted((prev) => [...prev, req.name])}
                className="shrink-0"
              >
                {isAccepted ? (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Accepted
                  </>
                ) : (
                  "Accept"
                )}
              </Button>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
}
