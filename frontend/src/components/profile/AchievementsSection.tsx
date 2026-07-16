import { motion } from "framer-motion";
import { Plus, Trash2, Trophy } from "lucide-react";
import { SectionCard } from "@/components/profile/SectionCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { AchievementEntry } from "@/types/profile";

const CATEGORIES = ["Hackathon", "Competition", "Award", "Scholarship", "Sports Achievement", "Certification"];

interface AchievementsSectionProps {
  achievements: AchievementEntry[];
  onChange: (next: AchievementEntry[]) => void;
}

function emptyAchievement(): AchievementEntry {
  return { id: crypto.randomUUID(), title: "", category: "", description: "" };
}

export function AchievementsSection({ achievements, onChange }: AchievementsSectionProps) {
  const addAchievement = () => onChange([...achievements, emptyAchievement()]);
  const removeAchievement = (id: string) => onChange(achievements.filter((a) => a.id !== id));
  const updateAchievement = (id: string, patch: Partial<AchievementEntry>) =>
    onChange(achievements.map((a) => (a.id === id ? { ...a, ...patch } : a)));

  return (
    <SectionCard
      icon={Trophy}
      title="Achievements"
      description="Hackathons, competitions, awards, and more."
      badge="Optional"
      action={
        <button
          type="button"
          onClick={addAchievement}
          className="flex items-center gap-1.5 rounded-xl border border-primary/25 px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary/5"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Achievement
        </button>
      }
    >
      {achievements.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No achievements added yet. Click "Add Achievement" to showcase your wins.
        </p>
      ) : (
        <div className="space-y-4">
          {achievements.map((achievement, idx) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-4 sm:p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Achievement {idx + 1}
                </p>
                <button
                  type="button"
                  onClick={() => removeAchievement(achievement.id)}
                  aria-label="Remove achievement"
                  className="rounded-lg p-1.5 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor={`ach-title-${achievement.id}`}>Title</Label>
                  <Input
                    id={`ach-title-${achievement.id}`}
                    value={achievement.title}
                    onChange={(e) => updateAchievement(achievement.id, { title: e.target.value })}
                    placeholder="Winner — Smart India Hackathon"
                  />
                </div>
                <div>
                  <Label htmlFor={`ach-category-${achievement.id}`}>Category</Label>
                  <Select
                    id={`ach-category-${achievement.id}`}
                    placeholder="Select category"
                    value={achievement.category}
                    onChange={(e) => updateAchievement(achievement.id, { category: e.target.value })}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor={`ach-desc-${achievement.id}`}>Description (Optional)</Label>
                  <Input
                    id={`ach-desc-${achievement.id}`}
                    value={achievement.description}
                    onChange={(e) => updateAchievement(achievement.id, { description: e.target.value })}
                    placeholder="Built an AI-powered education platform for 500K students"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {achievements.length > 0 && (
        <Button type="button" variant="secondary" size="sm" onClick={addAchievement} className="mt-4">
          <Plus className="h-3.5 w-3.5" />
          Add another achievement
        </Button>
      )}
    </SectionCard>
  );
}
