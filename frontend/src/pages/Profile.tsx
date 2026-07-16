import { useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { PersonalInfoSection } from "@/components/profile/PersonalInfoSection";
import { EducationSection } from "@/components/profile/EducationSection";
import {
  InterestsSection,
  SkillsHaveSection,
  SkillsWantSection,
} from "@/components/profile/SkillsInterestsSections";
import { FutureGoalsSection } from "@/components/profile/FutureGoalsSection";
import { CertificatesSection } from "@/components/profile/CertificatesSection";
import { ProjectsSection } from "@/components/profile/ProjectsSection";
import { AchievementsSection } from "@/components/profile/AchievementsSection";
import { SocialLinksSection } from "@/components/profile/SocialLinksSection";
import { PortfolioSection } from "@/components/profile/PortfolioSection";
import { LearningStreakSection } from "@/components/profile/LearningStreakSection";
import { Button } from "@/components/ui/button";
import { computeProfileCompletion, createInitialProfileState, type ProfileFormState } from "@/types/profile";
import { getCertifications } from "@/lib/certifications";

export function ProfilePage() {
  const { user, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const personalInfoRef = useRef<HTMLDivElement>(null);

  const [profile, setProfile] = useState<ProfileFormState>(() =>
    createInitialProfileState({
      fullName: user?.full_name ?? "",
      username: user?.email ? user.email.split("@")[0] : "",
    }),
  );
  const [isSaving, setIsSaving] = useState(false);
  const certifications = getCertifications();

  if (isLoading) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  const updateField = <K extends keyof ProfileFormState>(key: K, value: ProfileFormState[K]) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const completion = computeProfileCompletion(profile);

  const handleSave = () => {
    const missing: string[] = [];
    if (profile.skillsWant.length === 0) missing.push("Skills You Want to Learn");
    if (profile.interests.length === 0) missing.push("Interests");
    if (!profile.futureGoals.trim()) missing.push("Future Goals");

    if (missing.length > 0) {
      toast({
        title: "A few required sections are missing",
        description: missing.join(", "),
        variant: "error",
      });
      return;
    }

    setIsSaving(true);
    window.setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Profile saved!",
        description: "Personalizing your learning experience with your new Learning Identity.",
        variant: "success",
      });
      navigate("/skills");
    }, 900);
  };

  return (
    <div className="min-h-svh w-full">
      <DashboardNavbar />

      <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div ref={personalInfoRef}>
          <ProfileHeader
            fullName={profile.fullName}
            username={profile.username}
            email={user.email ?? ""}
            completion={completion}
            onEdit={() => personalInfoRef.current?.scrollIntoView({ behavior: "smooth" })}
          />
        </div>

        <PersonalInfoSection profile={profile} onChange={updateField} />
        <EducationSection profile={profile} onChange={updateField} />

        <SkillsHaveSection value={profile.skillsHave} onChange={(v) => updateField("skillsHave", v)} />
        <SkillsWantSection value={profile.skillsWant} onChange={(v) => updateField("skillsWant", v)} />
        <InterestsSection value={profile.interests} onChange={(v) => updateField("interests", v)} />

        <FutureGoalsSection value={profile.futureGoals} onChange={(v) => updateField("futureGoals", v)} />

        <CertificatesSection
          certificates={profile.certificates}
          onChange={(v) => updateField("certificates", v)}
        />
        <ProjectsSection projects={profile.projects} onChange={(v) => updateField("projects", v)} />
        <AchievementsSection achievements={profile.achievements} onChange={(v) => updateField("achievements", v)} />
        <PortfolioSection certifications={certifications} />
        <SocialLinksSection links={profile.socialLinks} onChange={(v) => updateField("socialLinks", v)} />

        <LearningStreakSection />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          className="glass-card flex flex-col items-center gap-3 p-8 text-center"
        >
          <Sparkles className="h-7 w-7 text-primary" />
          <h2 className="text-lg font-bold text-foreground">Ready to personalize your journey?</h2>
          <p className="max-w-md text-sm text-muted-foreground">
            Your AI tutor uses this profile to build your roadmap, recommend skills, careers, mentors,
            projects, and resources tailored to you.
          </p>
          <Button size="lg" onClick={handleSave} isLoading={isSaving} className="mt-2 px-8">
            Save &amp; Personalize My Learning
          </Button>
        </motion.div>
      </main>
    </div>
  );
}
