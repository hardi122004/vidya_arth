import { Target } from "lucide-react";
import { SectionCard } from "@/components/profile/SectionCard";

const EXAMPLES = [
  "Become an AI Engineer",
  "Start my own company",
  "Become a Music Producer",
  "Crack GATE",
  "Build my own startup",
  "Become a Wildlife Photographer",
];

interface FutureGoalsSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export function FutureGoalsSection({ value, onChange }: FutureGoalsSectionProps) {
  return (
    <SectionCard
      icon={Target}
      title="Future Goals"
      description="What do you want to become or achieve in the future?"
      badge="Required"
    >
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. I want to become an AI engineer who builds tools that make education accessible..."
        rows={4}
        className="w-full resize-none rounded-2xl border border-input bg-surface/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/50"
      />
      <div className="mt-3 flex flex-wrap gap-1.5">
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            type="button"
            onClick={() => onChange(value ? `${value}\n${ex}` : ex)}
            className="rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground transition hover:border-primary/40 hover:text-primary"
          >
            + {ex}
          </button>
        ))}
      </div>
    </SectionCard>
  );
}
