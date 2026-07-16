import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Award } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { MentorNavbar } from "@/components/mentor/MentorNavbar";
import { Button } from "@/components/ui/button";
import { MentorRegistrationForm } from "@/components/mentor-module/MentorRegistrationForm";
import { CompetencyTest, type CompetencyTestOutcome } from "@/components/mentor-module/CompetencyTest";
import { CompetencyResults } from "@/components/mentor-module/CompetencyResults";
import {
  getAuthorizedDomains,
  recordDomainAttempt,
  saveMentorRegistration,
  type MentorRegistration,
} from "@/lib/mentorAuth";

type Step = "register" | "test" | "results";

export function MentorAuthorizePage() {
  const { user, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("register");
  const [registration, setRegistration] = useState<MentorRegistration | null>(null);
  const [domainIndex, setDomainIndex] = useState(0);
  const [lastOutcome, setLastOutcome] = useState<CompetencyTestOutcome | null>(null);
  const [testKey, setTestKey] = useState(0);

  if (isLoading) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "teacher") return <Navigate to="/dashboard" replace />;

  const handleRegistrationSubmit = (reg: MentorRegistration) => {
    saveMentorRegistration(reg);
    setRegistration(reg);
    setDomainIndex(0);
    setStep("test");
  };

  const currentDomain = registration?.domains[domainIndex];

  const handleTestComplete = (outcome: CompetencyTestOutcome) => {
    if (!currentDomain) return;
    recordDomainAttempt(currentDomain, outcome.score);
    setLastOutcome(outcome);
    setStep("results");

    if (outcome.score >= 65) {
      toast({
        title: "Domain authorized!",
        description: `You're now an authorized mentor for ${currentDomain}.`,
        variant: "success",
      });
    }
  };

  const isLastDomain = registration ? domainIndex === registration.domains.length - 1 : true;

  const handleRetake = () => {
    setTestKey((k) => k + 1);
    setStep("test");
  };

  const handleContinue = () => {
    if (!registration) return;
    if (isLastDomain) {
      const authorized = getAuthorizedDomains();
      if (authorized.length > 0) {
        navigate("/mentor/create-session");
      } else {
        toast({
          title: "No domains authorized yet",
          description: "Retake a test above to unlock session creation.",
          variant: "info",
        });
      }
    } else {
      setDomainIndex((i) => i + 1);
      setTestKey((k) => k + 1);
      setStep("test");
    }
  };

  return (
    <div className="min-h-svh w-full">
      <MentorNavbar />

      <main className="mx-auto flex max-w-2xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigate("/mentor-dashboard")}
          className="flex w-fit items-center gap-1.5 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Mentor Dashboard
        </button>

        <div>
          <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary">
            <Award className="h-3.5 w-3.5" />
            Mentor Authorization
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Become an Authorized Mentor
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Register your expertise, then pass a short AI competency test for each domain you want to teach.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {step === "register" && (
            <motion.div key="register" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
              <MentorRegistrationForm initialFullName={user.full_name} onSubmit={handleRegistrationSubmit} />
            </motion.div>
          )}

          {step === "test" && currentDomain && registration && (
            <motion.div key={`test-${testKey}`} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
              <CompetencyTest
                key={testKey}
                domain={currentDomain}
                domainIndex={domainIndex}
                totalDomains={registration.domains.length}
                onComplete={handleTestComplete}
              />
            </motion.div>
          )}

          {step === "results" && currentDomain && lastOutcome && (
            <motion.div key="results" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <CompetencyResults
                domain={currentDomain}
                outcome={lastOutcome}
                onRetake={handleRetake}
                onContinue={handleContinue}
                isLastDomain={isLastDomain}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
