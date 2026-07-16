import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Award, ClipboardCheck, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getDomainIcon, getSkillById } from "@/data/skillsData";
import { getEnrolledSkills } from "@/lib/learningProgress";
import { isSkillCertified } from "@/lib/certifications";
import { cn } from "@/lib/utils";

export function AssessmentDashboardPage() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  const enrolled = getEnrolledSkills()
    .map((e) => ({ enrollment: e, skill: getSkillById(e.skillId) }))
    .filter((e): e is { enrollment: typeof e.enrollment; skill: NonNullable<typeof e.skill> } => Boolean(e.skill));

  return (
    <div className="min-h-svh w-full">
      <DashboardNavbar />

      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Prove it, don't just study it
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Assessment &amp; Certification
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Knowledge is learned through study, but competency is demonstrated through real-world application.
            Complete a skill's learning path to unlock a project-based assessment.
          </p>
        </motion.div>

        <div>
          <h2 className="mb-4 text-lg font-bold text-foreground">Completed Learning</h2>

          {enrolled.length === 0 ? (
            <div className="glass-card flex flex-col items-center gap-3 py-16 text-center">
              <ClipboardCheck className="h-8 w-8 text-muted-foreground" />
              <h3 className="text-base font-bold text-foreground">Nothing here yet</h3>
              <p className="max-w-sm text-sm text-muted-foreground">
                Start learning a skill to see it show up here once you're ready for assessment.
              </p>
              <Button onClick={() => navigate("/skills")} className="mt-2">
                Explore Skills
              </Button>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2">
              {enrolled.map(({ enrollment, skill }, idx) => {
                const Icon = getDomainIcon(skill.domain);
                const certified = isSkillCertified(skill.id);
                const ready = enrollment.progress >= 100;

                return (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.35 }}
                    className="glass-card flex flex-col gap-4 p-5"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                          <Icon className="h-5.5 w-5.5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-foreground">{skill.name}</h3>
                          <p className="text-xs text-muted-foreground">{skill.domain}</p>
                        </div>
                      </div>
                      {certified && (
                        <span className="flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-[11px] font-bold text-success">
                          <Award className="h-3 w-3" />
                          Certified
                        </span>
                      )}
                    </div>

                    <div>
                      <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span className="font-semibold text-foreground">{enrollment.progress}%</span>
                      </div>
                      <Progress value={enrollment.progress} />
                    </div>

                    <span
                      className={cn(
                        "w-fit rounded-full px-2.5 py-1 text-[11px] font-bold",
                        certified
                          ? "bg-success/10 text-success"
                          : ready
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground",
                      )}
                    >
                      {certified ? "Certified" : ready ? "Ready for Assessment" : "In Progress"}
                    </span>

                    {certified ? (
                      <Button variant="secondary" onClick={() => navigate("/profile")} className="mt-auto">
                        View in Portfolio
                      </Button>
                    ) : ready ? (
                      <Button onClick={() => navigate(`/assessment/${skill.id}`)} className="mt-auto">
                        Start Assessment
                      </Button>
                    ) : (
                      <Button
                        variant="secondary"
                        onClick={() => navigate(`/skills/${skill.id}`)}
                        className="mt-auto"
                      >
                        Continue Learning
                      </Button>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
