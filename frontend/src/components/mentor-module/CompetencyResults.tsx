import { motion } from "framer-motion";
import { Award, CheckCircle2, RotateCcw, Sparkles, TrendingUp, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PASSING_SCORE } from "@/lib/mentorAuth";
import type { CompetencyTestOutcome } from "@/components/mentor-module/CompetencyTest";

interface CompetencyResultsProps {
  domain: string;
  outcome: CompetencyTestOutcome;
  onRetake: () => void;
  onContinue: () => void;
  isLastDomain: boolean;
}

export function CompetencyResults({ domain, outcome, onRetake, onContinue, isLastDomain }: CompetencyResultsProps) {
  const { score, strongTopics, weakTopics } = outcome;
  const passed = score >= PASSING_SCORE;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card flex flex-col items-center gap-5 p-8 text-center"
    >
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-full ${
          passed ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"
        }`}
      >
        {passed ? <Award className="h-8 w-8" /> : <Sparkles className="h-8 w-8" />}
      </div>

      <div>
        <h2 className="text-xl font-extrabold text-foreground">
          {passed ? "Authorized Mentor" : "Not Yet Authorized"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{domain} competency assessment</p>
      </div>

      <div className="text-4xl font-extrabold text-foreground">
        {score}<span className="text-lg font-semibold text-muted-foreground">%</span>
      </div>
      <p className="text-xs text-muted-foreground">Passing score is {PASSING_SCORE}%</p>

      <div className="grid w-full gap-4 text-left sm:grid-cols-2">
        {strongTopics.length > 0 && (
          <div className="glass rounded-2xl p-4">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-bold text-success">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Strengths
            </p>
            <ul className="flex flex-col gap-1.5 text-xs text-muted-foreground">
              {[...new Set(strongTopics)].map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        )}
        {weakTopics.length > 0 && (
          <div className="glass rounded-2xl p-4">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-bold text-primary">
              <TrendingUp className="h-3.5 w-3.5" />
              Areas to Improve
            </p>
            <ul className="flex flex-col gap-1.5 text-xs text-muted-foreground">
              {[...new Set(weakTopics)].map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {passed ? (
        <Button size="lg" onClick={onContinue} className="mt-2">
          {isLastDomain ? "Continue" : "Next Domain"}
        </Button>
      ) : (
        <div className="mt-2 flex flex-col items-center gap-3">
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <XCircle className="h-3.5 w-3.5 text-destructive" />
            You can retake this domain's test as many times as you need.
          </p>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={onRetake} className="group">
              <RotateCcw className="h-4 w-4 transition-transform group-hover:-rotate-180" />
              Retake Test
            </Button>
            {!isLastDomain && (
              <Button variant="secondary" onClick={onContinue}>
                Skip to Next Domain
              </Button>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
