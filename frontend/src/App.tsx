import { Route, Routes } from "react-router-dom";
import { AuroraBackground } from "@/components/layout/AuroraBackground";
import { OnboardingPage } from "@/pages/Onboarding";
import { LoginPage } from "@/pages/Login";
import { DashboardPage } from "@/pages/Dashboard";
import { ProfilePage } from "@/pages/Profile";
import { SkillsPage } from "@/pages/Skills";
import { SkillDetailPage } from "@/pages/SkillDetail";
import { AssessmentDashboardPage } from "@/pages/AssessmentDashboard";
import { AssessmentPage } from "@/pages/Assessment";
import { MentorDashboardPage } from "@/pages/MentorDashboard";
import { MentorAuthorizePage } from "@/pages/MentorAuthorize";
import { MentorCreateSessionPage } from "@/pages/MentorCreateSession";
import { MentorSessionsPage } from "@/pages/MentorSessions";
import { MentorSessionDetailPage } from "@/pages/MentorSessionDetail";

function App() {
  return (
    <>
      <AuroraBackground />
      <Routes>
        <Route path="/" element={<OnboardingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/mentor-dashboard" element={<MentorDashboardPage />} />
        <Route path="/mentor/authorize" element={<MentorAuthorizePage />} />
        <Route path="/mentor/create-session" element={<MentorCreateSessionPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/skills/:skillId" element={<SkillDetailPage />} />
        <Route path="/assessments" element={<AssessmentDashboardPage />} />
        <Route path="/assessment/:skillId" element={<AssessmentPage />} />
        <Route path="/sessions" element={<MentorSessionsPage />} />
        <Route path="/sessions/:sessionId" element={<MentorSessionDetailPage />} />
      </Routes>
    </>
  );
}

export default App;
