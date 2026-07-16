import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Lightbulb, Sparkles, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { IndustryChallenge } from "@/data/assessmentChallenges";
import { cn } from "@/lib/utils";

interface ChallengeSelectionProps {
  skillName: string;
  industryChallenge: IndustryChallenge;
  onAcceptChallenge: (challenge: IndustryChallenge) => void;
  onSubmitOwnProblem: (challenge: IndustryChallenge) => void;
}

type Option = "industry" | "self" | null;

export function ChallengeSelection({
  skillName,
  industryChallenge,
  onAcceptChallenge,
  onSubmitOwnProblem,
}: ChallengeSelectionProps) {
  const [option, setOption] = useState<Option>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [importance, setImportance] = useState("");
  const [proposedSolution, setProposedSolution] = useState("");
  const [error, setError] = useState("");

  const handleSelfSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !importance.trim() || !proposedSolution.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    onSubmitOwnProblem({
      title: title.trim(),
      description: `${description.trim()}\n\nWhy it matters: ${importance.trim()}\n\nProposed solution: ${proposedSolution.trim()}`,
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => setOption("industry")}
          className={cn(
            "flex flex-col items-start gap-2 rounded-2xl border-2 p-5 text-left transition",
            option === "industry"
              ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
              : "border-border hover:border-primary/40 hover:bg-accent",
          )}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl gradient-brand text-white">
            <Sparkles className="h-5.5 w-5.5" />
          </div>
          <h3 className="text-sm font-bold text-foreground">Option 1 — Industry Challenge</h3>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Your AI Domain Expert generates a real-world {skillName} problem to solve.
          </p>
        </button>

        <button
          type="button"
          onClick={() => setOption("self")}
          className={cn(
            "flex flex-col items-start gap-2 rounded-2xl border-2 p-5 text-left transition",
            option === "self"
              ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
              : "border-border hover:border-primary/40 hover:bg-accent",
          )}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Lightbulb className="h-5.5 w-5.5" />
          </div>
          <h3 className="text-sm font-bold text-foreground">Option 2 — Self-Identified Problem</h3>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Bring your own real-world problem you've personally identified.
          </p>
        </button>
      </div>

      {option === "industry" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-5"
        >
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary">
            <Target className="h-3.5 w-3.5" />
            AI-Generated Industry Challenge
          </div>
          <h4 className="text-sm font-bold text-foreground">{industryChallenge.title}</h4>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{industryChallenge.description}</p>
          <Button className="group mt-4" onClick={() => onAcceptChallenge(industryChallenge)}>
            Accept Challenge
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      )}

      {option === "self" && (
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSelfSubmit}
          className="glass flex flex-col gap-4 rounded-2xl p-5"
        >
          <div>
            <Label htmlFor="problem-title">Problem Title</Label>
            <Input
              id="problem-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Low newsletter signup conversion for a campus club"
            />
          </div>
          <div>
            <Label htmlFor="problem-description">Problem Description</Label>
            <textarea
              id="problem-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="What's the problem, specifically?"
              className="w-full resize-none rounded-2xl border border-input bg-surface/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/50"
            />
          </div>
          <div>
            <Label htmlFor="problem-importance">Why This Problem Is Important</Label>
            <textarea
              id="problem-importance"
              value={importance}
              onChange={(e) => setImportance(e.target.value)}
              rows={2}
              placeholder="Who does this affect, and why does it matter?"
              className="w-full resize-none rounded-2xl border border-input bg-surface/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/50"
            />
          </div>
          <div>
            <Label htmlFor="problem-solution">Proposed Solution</Label>
            <textarea
              id="problem-solution"
              value={proposedSolution}
              onChange={(e) => setProposedSolution(e.target.value)}
              rows={3}
              placeholder="What's your plan to solve it?"
              className="w-full resize-none rounded-2xl border border-input bg-surface/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/50"
            />
          </div>

          {error && (
            <p role="alert" className="text-xs font-medium text-destructive">
              {error}
            </p>
          )}

          <Button type="submit" className="group w-fit">
            Continue to Submission
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.form>
      )}
    </div>
  );
}
