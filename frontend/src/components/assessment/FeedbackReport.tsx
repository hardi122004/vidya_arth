import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Award,
  CheckCircle2,
  PartyPopper,
  RotateCcw,
  Sparkles,
  ThumbsUp,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { EvaluationResult } from "@/lib/aiEvaluator";
import { cn } from "@/lib/utils";

interface FeedbackReportProps {
  skillName: string;
  evaluation: EvaluationResult;
  attemptNumber: number;
  onResubmit: () => void;
}

function ScoreRing({ score }: { score: number }) {
  const size = 120;
  const strokeWidth = 9;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} className="stroke-muted" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          stroke="url(#score-gradient)"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-brand-blue-500)" />
            <stop offset="100%" stopColor="var(--color-brand-purple-500)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-extrabold text-foreground">{score}</span>
        <span className="text-[11px] font-medium text-muted-foreground">/ 100</span>
      </div>
    </div>
  );
}

export function FeedbackReport({ skillName, evaluation, attemptNumber, onResubmit }: FeedbackReportProps) {
  const navigate = useNavigate();
  const { overallScore, criteria, strengths, improvements, aiFeedback, certified } = evaluation;

  return (
    <div className="flex flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card flex flex-col items-center gap-4 p-6 text-center sm:flex-row sm:items-center sm:text-left"
      >
        <ScoreRing score={overallScore} />
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Overall Score</p>
          <h2 className="text-xl font-extrabold text-foreground">
            {overallScore} / 100 {attemptNumber > 1 && <span className="text-sm font-medium text-muted-foreground">(Attempt {attemptNumber})</span>}
          </h2>
        </div>
      </motion.div>

      <div className="glass-card p-6">
        <h3 className="mb-4 text-sm font-bold text-foreground">Skill Performance</h3>
        <div className="flex flex-col gap-3.5">
          {criteria.map((c, idx) => (
            <div key={c.label}>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="font-medium text-foreground">{c.label}</span>
                <span className="font-semibold text-muted-foreground">{c.score}/100</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${c.score}%` }}
                  transition={{ delay: idx * 0.06, duration: 0.6, ease: "easeOut" }}
                  className="h-full rounded-full gradient-brand"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="glass-card p-5">
          <h3 className="mb-3 flex items-center gap-1.5 text-sm font-bold text-foreground">
            <ThumbsUp className="h-4 w-4 text-success" />
            Strengths
          </h3>
          <ul className="flex flex-col gap-2.5">
            {strengths.map((s) => (
              <li key={s} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="glass-card p-5">
          <h3 className="mb-3 flex items-center gap-1.5 text-sm font-bold text-foreground">
            <TrendingUp className="h-4 w-4 text-primary" />
            Areas for Improvement
          </h3>
          <ul className="flex flex-col gap-2.5">
            {improvements.map((s) => (
              <li key={s} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="glass-card p-5">
        <h3 className="mb-3 flex items-center gap-1.5 text-sm font-bold text-foreground">
          <Sparkles className="h-4 w-4 text-primary" />
          AI Feedback
        </h3>
        <p className="text-sm leading-relaxed text-foreground">{aiFeedback}</p>
        <p className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <Sparkles className="h-3 w-3" />
          Prototype simulation — evaluation logic mirrors a rubric-based AI review, not a live model call.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "glass-card flex flex-col items-center gap-3 p-8 text-center",
          certified && "border-success/30",
        )}
      >
        {certified ? (
          <>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success">
              <PartyPopper className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-extrabold text-foreground">Congratulations!</h2>
            <p className="max-w-md text-sm text-muted-foreground">
              You have successfully demonstrated practical competency in {skillName}.
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
              <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary">
                <Award className="h-3.5 w-3.5" />
                Skill Certificate
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Completion Badge
              </span>
              <span className="rounded-full bg-muted px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                {new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
              </span>
            </div>
            <Button size="lg" className="mt-4" onClick={() => navigate("/profile")}>
              View in Your Portfolio
            </Button>
          </>
        ) : (
          <>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <Sparkles className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-extrabold text-foreground">Not Yet Certified</h2>
            <p className="max-w-md text-sm text-muted-foreground">
              You're close — review the feedback above, strengthen your solution, and resubmit whenever you're
              ready. There's no penalty for multiple attempts.
            </p>
            <Button size="lg" className="group mt-4" onClick={onResubmit}>
              <RotateCcw className="h-4 w-4 transition-transform group-hover:-rotate-180" />
              Try Again
            </Button>
          </>
        )}
      </motion.div>
    </div>
  );
}
