import { AnimatePresence, motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { SectionCard } from "@/components/profile/SectionCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ProfileFormState } from "@/types/profile";

interface EducationSectionProps {
  profile: ProfileFormState;
  onChange: <K extends keyof ProfileFormState>(key: K, value: ProfileFormState[K]) => void;
}

export function EducationSection({ profile, onChange }: EducationSectionProps) {
  return (
    <SectionCard
      icon={GraduationCap}
      title="Educational Details"
      description="Add your academic background, if you'd like."
      badge="Optional"
      action={
        <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-foreground">
          <input
            type="checkbox"
            checked={profile.hasEducation}
            onChange={(e) => onChange("hasEducation", e.target.checked)}
            className="h-4 w-4 rounded border-input accent-[var(--color-primary)]"
          />
          Add education
        </label>
      }
    >
      <AnimatePresence>
        {profile.hasEducation ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="grid gap-5 pt-1 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="edu-institution">School / College Name</Label>
                <Input
                  id="edu-institution"
                  value={profile.institutionName}
                  onChange={(e) => onChange("institutionName", e.target.value)}
                  placeholder="Indian Institute of Technology, Bombay"
                />
              </div>
              <div>
                <Label htmlFor="edu-grade">Current Grade / Year</Label>
                <Input
                  id="edu-grade"
                  value={profile.gradeOrYear}
                  onChange={(e) => onChange("gradeOrYear", e.target.value)}
                  placeholder="3rd Year"
                />
              </div>
              <div>
                <Label htmlFor="edu-degree">Degree (if applicable)</Label>
                <Input
                  id="edu-degree"
                  value={profile.degree}
                  onChange={(e) => onChange("degree", e.target.value)}
                  placeholder="B.Tech"
                />
              </div>
              <div>
                <Label htmlFor="edu-branch">Branch / Stream</Label>
                <Input
                  id="edu-branch"
                  value={profile.branch}
                  onChange={(e) => onChange("branch", e.target.value)}
                  placeholder="Computer Science"
                />
              </div>
              <div>
                <Label htmlFor="edu-score">CGPA / Percentage (Optional)</Label>
                <Input
                  id="edu-score"
                  value={profile.score}
                  onChange={(e) => onChange("score", e.target.value)}
                  placeholder="8.7 CGPA"
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Toggle "Add education" above if you'd like this to shape your recommendations.
          </p>
        )}
      </AnimatePresence>
    </SectionCard>
  );
}
