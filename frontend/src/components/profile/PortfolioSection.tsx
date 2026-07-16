import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Award, Calendar, Trophy } from "lucide-react";
import { SectionCard } from "@/components/profile/SectionCard";
import { getDomainIcon, getSkillById } from "@/data/skillsData";
import type { Certification } from "@/lib/certifications";

interface PortfolioSectionProps {
  certifications: Certification[];
}

export function PortfolioSection({ certifications }: PortfolioSectionProps) {
  const navigate = useNavigate();

  return (
    <SectionCard
      icon={Trophy}
      title="Verified Portfolio"
      description="Skills you've demonstrated through real project-based assessments."
      badge="Optional"
    >
      {certifications.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Complete a project-based assessment on any skill to earn a verified certificate here.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {certifications.map((cert, idx) => {
            const skill = getSkillById(cert.skillId);
            const Icon = skill ? getDomainIcon(skill.domain) : Award;

            return (
              <motion.button
                key={cert.id}
                type="button"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => skill && navigate(`/skills/${skill.id}`)}
                className="glass flex flex-col gap-3 rounded-2xl p-4 text-left transition hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-brand text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-1 text-[11px] font-bold text-success">
                    <Award className="h-3 w-3" />
                    Certified
                  </span>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">{cert.skillName}</p>
                  <h3 className="mt-0.5 text-sm font-bold leading-snug text-foreground">{cert.projectTitle}</h3>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(cert.completedAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="font-semibold text-foreground">{cert.score}/100</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      )}
    </SectionCard>
  );
}
