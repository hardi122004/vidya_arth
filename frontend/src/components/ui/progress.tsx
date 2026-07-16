import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  className?: string;
}

export function Progress({ value, className }: ProgressProps) {
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("h-2 w-full overflow-hidden rounded-full bg-muted", className)}
    >
      <motion.div
        className="h-full rounded-full gradient-brand"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      />
    </div>
  );
}

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between">
        {steps.map((label, idx) => {
          const stepNum = idx + 1;
          const isComplete = stepNum < currentStep;
          const isActive = stepNum === currentStep;
          return (
            <div key={label} className="flex flex-1 flex-col items-center gap-1.5 last:flex-none">
              <div className="flex w-full items-center">
                {idx > 0 && (
                  <div
                    className={cn(
                      "h-0.5 flex-1 transition-colors duration-500",
                      isComplete || isActive ? "bg-primary" : "bg-border",
                    )}
                  />
                )}
                <motion.div
                  animate={{ scale: isActive ? 1.15 : 1 }}
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors duration-300",
                    isComplete
                      ? "gradient-brand border-transparent text-white"
                      : isActive
                        ? "border-primary text-primary bg-primary/10"
                        : "border-border text-muted-foreground",
                  )}
                >
                  {stepNum}
                </motion.div>
              </div>
              <span
                className={cn(
                  "hidden text-center text-[11px] font-medium sm:block",
                  isActive ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
