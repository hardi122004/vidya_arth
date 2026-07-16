import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { WelcomeHero } from "@/components/dashboard/WelcomeHero";
import { TrendingSkillsSection } from "@/components/dashboard/TrendingSkillsSection";
import { EmergingCareersSection } from "@/components/dashboard/EmergingCareersSection";
import { UpcomingSessionsSection } from "@/components/dashboard/UpcomingSessionsSection";
import { StudyPlannerCard } from "@/components/dashboard/StudyPlannerCard";
import { LearningStreakCard } from "@/components/dashboard/LearningStreakCard";
import { ContinueLearningSection } from "@/components/dashboard/ContinueLearningSection";
import { ExploreDomainsBanner } from "@/components/dashboard/ExploreDomainsBanner";

export function DashboardPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (user.role === "teacher") return <Navigate to="/mentor-dashboard" replace />;

  const firstName = user.full_name.split(" ")[0];

  return (
    <div className="min-h-svh w-full">
      <DashboardNavbar />

      <main className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8">
        <WelcomeHero firstName={firstName} />
        <TrendingSkillsSection />
        <EmergingCareersSection />
        <UpcomingSessionsSection />

        <section className="grid gap-6 md:grid-cols-2">
          <StudyPlannerCard />
          <LearningStreakCard />
        </section>

        <ContinueLearningSection />
        <ExploreDomainsBanner />
      </main>
    </div>
  );
}
