import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Award,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Briefcase,
  CheckCircle2,
  Clock,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SkillCard } from "@/components/skills/SkillCard";
import { AIDomainExpert } from "@/components/skills/AIDomainExpert";
import { LearningResourcesSection } from "@/components/skills/LearningResourcesSection";
import { getDomainIcon, getRelatedSkills, getSkillById } from "@/data/skillsData";
import { isSkillBookmarked, toggleSkillBookmark } from "@/lib/bookmarks";
import {
  isSkillLearningComplete,
  isSkillStarted,
  markSkillLearningComplete,
  startLearningSkill,
} from "@/lib/learningProgress";
import { isSkillCertified } from "@/lib/certifications";
import { cn } from "@/lib/utils";

function formatLearners(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(count);
}

export function SkillDetailPage() {
  const { skillId } = useParams<{ skillId: string }>();
  const { user, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const skill = skillId ? getSkillById(skillId) : undefined;

  const [bookmarked, setBookmarked] = useState(false);
  const [started, setStarted] = useState(false);
  const [learningComplete, setLearningComplete] = useState(false);
  const [certified, setCertified] = useState(false);

  useEffect(() => {
    if (!skill) return;
    setBookmarked(isSkillBookmarked(skill.id));
    setStarted(isSkillStarted(skill.id));
    setLearningComplete(isSkillLearningComplete(skill.id));
    setCertified(isSkillCertified(skill.id));
    window.scrollTo(0, 0);
  }, [skill]);

  if (isLoading) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (!skill) return <Navigate to="/skills" replace />;

  const Icon = getDomainIcon(skill.domain);
  const relatedSkills = getRelatedSkills(skill);

  const handleToggleBookmark = () => {
    const next = toggleSkillBookmark(skill.id);
    setBookmarked(next);
    toast({
      title: next ? "Added to wishlist" : "Removed from wishlist",
      variant: "info",
    });
  };

  const handleStartLearning = () => {
    startLearningSkill(skill.id);
    setStarted(true);
    toast({
      title: "You're on your way!",
      description: `${skill.name} has been added to Continue Learning on your dashboard.`,
      variant: "success",
    });
  };

  const handleMarkComplete = () => {
    markSkillLearningComplete(skill.id);
    setLearningComplete(true);
    toast({
      title: "Learning path complete!",
      description: "You're ready to prove it with a project-based assessment.",
      variant: "success",
    });
  };

  const handlePrimaryAction = () => {
    if (certified) {
      navigate("/profile");
    } else if (learningComplete) {
      navigate(`/assessment/${skill.id}`);
    } else if (started) {
      handleMarkComplete();
    } else {
      handleStartLearning();
    }
  };

  const primaryLabel = certified
    ? "View Certificate"
    : learningComplete
      ? "Start Assessment"
      : started
        ? "Mark Learning Complete"
        : "Start Learning";

  return (
    <div className="min-h-svh w-full">
      <DashboardNavbar />

      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigate("/skills")}
          className="flex w-fit items-center gap-1.5 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Skills
        </button>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-card relative overflow-hidden p-6 sm:p-8"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-purple-400/20 blur-3xl" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl gradient-brand text-white shadow-lg shadow-primary/25">
                <Icon className="h-8 w-8" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-primary">
                  {skill.domain}
                  {skill.trending && <span className="ml-1.5 text-brand-purple-500">&middot; Trending</span>}
                </p>
                <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                  {skill.name}
                </h1>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  {formatLearners(skill.learners)} Learners
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleToggleBookmark}
              aria-pressed={bookmarked}
              className={cn(
                "flex shrink-0 items-center gap-2 self-start rounded-full border px-4 py-2 text-sm font-semibold transition",
                bookmarked
                  ? "border-primary/30 bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:bg-accent",
              )}
            >
              <Bookmark className={cn("h-4 w-4", bookmarked && "fill-current")} />
              {bookmarked ? "Wishlisted" : "Wishlist"}
            </button>
          </div>

          <div className="relative mt-6 flex flex-wrap items-center gap-3">
            <Button size="lg" onClick={handlePrimaryAction} className="group w-full sm:w-auto">
              {primaryLabel}
              {certified ? (
                <Award className="h-4 w-4" />
              ) : (
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              )}
            </Button>
            {started && !learningComplete && (
              <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                Enrolled — mark complete once you've worked through the resources below
              </span>
            )}
            {certified && (
              <span className="flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-bold text-success">
                <Award className="h-3.5 w-3.5" />
                Certified
              </span>
            )}
          </div>
        </motion.div>

        {/* Overview */}
        <Card>
          <h2 className="mb-4 text-lg font-bold text-foreground">Overview</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <p className="mb-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                What is this skill?
              </p>
              <p className="text-sm leading-relaxed text-foreground">{skill.description}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="mb-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Why is it important?
              </p>
              <p className="text-sm leading-relaxed text-foreground">{skill.whyItMatters}</p>
            </div>

            <div>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                <Briefcase className="h-3.5 w-3.5" />
                Career Opportunities
              </p>
              <div className="flex flex-wrap gap-1.5">
                {skill.careerOpportunities.map((role) => (
                  <span
                    key={role}
                    className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                <TrendingUp className="h-3.5 w-3.5" />
                Industry Demand
              </p>
              <span className="rounded-full bg-success/10 px-2.5 py-1 text-xs font-bold text-success">
                {skill.industryDemand}
              </span>
            </div>

            <div>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                Estimated Learning Time
              </p>
              <p className="text-sm font-semibold text-foreground">{skill.estimatedWeeks} weeks</p>
            </div>
          </div>
        </Card>

        {/* AI Domain Expert */}
        <Card>
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">AI Domain Expert</h2>
          </div>
          <AIDomainExpert skillName={skill.name} />
        </Card>

        {/* Learning Resources */}
        <Card>
          <h2 className="mb-5 text-lg font-bold text-foreground">Learning Resources</h2>
          <LearningResourcesSection skillName={skill.name} />
        </Card>

        {/* Related Skills */}
        {relatedSkills.length > 0 && (
          <section>
            <h2 className="mb-4 text-lg font-bold text-foreground">Related Skills</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {relatedSkills.map((related, idx) => (
                <SkillCard
                  key={related.id}
                  skill={related}
                  isBookmarked={isSkillBookmarked(related.id)}
                  onToggleBookmark={(id) => toggleSkillBookmark(id)}
                  index={idx}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
