import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Bookmark, Users } from "lucide-react";
import { getDomainIcon, type Skill } from "@/data/skillsData";
import { cn } from "@/lib/utils";

interface SkillCardProps {
  skill: Skill;
  isBookmarked: boolean;
  onToggleBookmark: (skillId: string) => void;
  index?: number;
}

function formatLearners(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(count);
}

export function SkillCard({ skill, isBookmarked, onToggleBookmark, index = 0 }: SkillCardProps) {
  const navigate = useNavigate();
  const Icon = getDomainIcon(skill.domain);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.4), duration: 0.35 }}
      whileHover={{ y: -4 }}
      className="glass-card group flex flex-col gap-4 p-5"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="h-6 w-6" />
        </div>
        <button
          type="button"
          onClick={() => onToggleBookmark(skill.id)}
          aria-label={isBookmarked ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isBookmarked}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full transition hover:scale-105 active:scale-95",
            isBookmarked ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent",
          )}
        >
          <Bookmark className={cn("h-4.5 w-4.5", isBookmarked && "fill-current")} />
        </button>
      </div>

      <button type="button" onClick={() => navigate(`/skills/${skill.id}`)} className="flex-1 text-left">
        <h3 className="text-sm font-bold leading-snug text-foreground">{skill.name}</h3>
        <p className="mt-1 text-xs font-medium text-muted-foreground">
          {skill.domain}
          {skill.trending && <span className="ml-1.5 text-primary">&middot; Trending</span>}
        </p>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Users className="h-3.5 w-3.5" />
          {formatLearners(skill.learners)} Learners
        </p>
      </button>

      <button
        type="button"
        onClick={() => navigate(`/skills/${skill.id}`)}
        className="group/btn mt-auto flex items-center justify-center gap-1.5 rounded-xl border border-primary/25 py-2 text-xs font-semibold text-primary transition hover:bg-primary/5"
      >
        Explore
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
      </button>
    </motion.div>
  );
}
