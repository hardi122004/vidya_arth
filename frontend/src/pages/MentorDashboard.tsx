import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { MentorNavbar } from "@/components/mentor/MentorNavbar";
import { MentorWelcomeHero } from "@/components/mentor/MentorWelcomeHero";
import { MentorImpactSection } from "@/components/mentor/MentorImpactSection";
import { EmergingDomainsSection } from "@/components/mentor/EmergingDomainsSection";
import { MentorSessionsSection } from "@/components/mentor/MentorSessionsSection";
import { LearnerRequestsSection } from "@/components/mentor/LearnerRequestsSection";
import { CommunityInsightsSection } from "@/components/mentor/CommunityInsightsSection";
import { MentorStreakSection } from "@/components/mentor/MentorStreakSection";
import { ContinueMentoringSection } from "@/components/mentor/ContinueMentoringSection";
import { DiscoverOpportunitiesBanner } from "@/components/mentor/DiscoverOpportunitiesBanner";

export function MentorDashboardPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "teacher") return <Navigate to="/dashboard" replace />;

  const firstName = user.full_name.split(" ")[0];

  return (
    <div className="min-h-svh w-full">
      <MentorNavbar />

      <main className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8">
        <MentorWelcomeHero firstName={firstName} />
        <MentorImpactSection />
        <EmergingDomainsSection />
        <MentorSessionsSection />
        <LearnerRequestsSection />

        <section className="grid gap-6 md:grid-cols-2">
          <CommunityInsightsSection />
          <MentorStreakSection />
        </section>

        <ContinueMentoringSection />
        <DiscoverOpportunitiesBanner />
      </main>
    </div>
  );
}
