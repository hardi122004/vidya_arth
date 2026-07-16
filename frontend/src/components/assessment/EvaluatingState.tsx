import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Sparkles } from "lucide-react";

const STEPS = [
  "Reviewing your submission",
  "Checking against the rubric",
  "Scoring practical impact",
  "Preparing your feedback report",
];

export function EvaluatingState({ skillName }: { skillName: string }) {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
    }, 700);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="glass-card flex flex-col items-center gap-5 p-10 text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="flex h-16 w-16 items-center justify-center rounded-3xl gradient-brand text-white shadow-lg shadow-primary/25"
      >
        <Sparkles className="h-8 w-8" />
      </motion.div>
      <div>
        <h3 className="text-base font-bold text-foreground">
          Your AI Domain Expert is evaluating your {skillName} submission
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">This usually takes a few moments.</p>
      </div>

      <div className="flex w-full max-w-xs flex-col gap-2.5 text-left">
        {STEPS.map((step, idx) => (
          <div key={step} className="flex items-center gap-2.5 text-sm">
            {idx < stepIndex ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
            ) : idx === stepIndex ? (
              <Loader2 className="h-4 w-4 shrink-0 animate-spin text-primary" />
            ) : (
              <div className="h-4 w-4 shrink-0 rounded-full border-2 border-muted" />
            )}
            <span className={idx <= stepIndex ? "text-foreground" : "text-muted-foreground"}>{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
