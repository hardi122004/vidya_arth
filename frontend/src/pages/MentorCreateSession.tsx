import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { MentorNavbar } from "@/components/mentor/MentorNavbar";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "@/components/ui/progress";
import { CreateSessionForm, type SessionDetails } from "@/components/mentor-module/CreateSessionForm";
import { SessionDeliveryStep, type DeliveryDetails } from "@/components/mentor-module/SessionDeliveryStep";
import { PublishPreview } from "@/components/mentor-module/PublishPreview";
import { getAuthorizedDomains, getMentorRegistration } from "@/lib/mentorAuth";
import { publishSession } from "@/lib/mentorSessions";

type Step = "create" | "delivery" | "publish" | "published";

const STEP_LABELS = ["Details", "Delivery", "Publish"];
const STEP_NUMBER: Record<Step, number> = { create: 1, delivery: 2, publish: 3, published: 3 };

export function MentorCreateSessionPage() {
  const { user, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("create");
  const [sessionDetails, setSessionDetails] = useState<SessionDetails | null>(null);
  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);

  if (isLoading) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "teacher") return <Navigate to="/dashboard" replace />;

  const authorizedDomains = getAuthorizedDomains();
  if (authorizedDomains.length === 0) return <Navigate to="/mentor/authorize" replace />;

  const registration = getMentorRegistration();
  const mentorName = registration?.fullName ?? user.full_name;
  const mentorExperience = registration?.experienceRange ?? "";

  const handlePublish = () => {
    if (!sessionDetails || !deliveryDetails) return;
    setIsPublishing(true);
    window.setTimeout(() => {
      publishSession({
        mentorName,
        mentorExperience,
        domain: sessionDetails.domain,
        skill: sessionDetails.skill,
        title: sessionDetails.title,
        description: sessionDetails.description,
        language: sessionDetails.language,
        difficulty: sessionDetails.difficulty,
        date: sessionDetails.date,
        time: sessionDetails.time,
        duration: sessionDetails.duration,
        maxParticipants: sessionDetails.maxParticipants,
        deliveryType: deliveryDetails.type,
        meetingPlatform: deliveryDetails.platform,
        meetingUrl: deliveryDetails.url,
      });
      setIsPublishing(false);
      setStep("published");
      toast({ title: "Session published!", description: "Learners can now discover and register.", variant: "success" });
    }, 900);
  };

  return (
    <div className="min-h-svh w-full">
      <MentorNavbar />

      <main className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigate("/mentor-dashboard")}
          className="flex w-fit items-center gap-1.5 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Mentor Dashboard
        </button>

        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">Create a Session</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">Share your expertise with learners looking for guidance.</p>
        </div>

        {step !== "published" && <StepIndicator steps={STEP_LABELS} currentStep={STEP_NUMBER[step]} />}

        <AnimatePresence mode="wait">
          {step === "create" && (
            <motion.div key="create" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
              <CreateSessionForm
                authorizedDomains={authorizedDomains}
                onSubmit={(details) => {
                  setSessionDetails(details);
                  setStep("delivery");
                }}
              />
            </motion.div>
          )}

          {step === "delivery" && (
            <motion.div key="delivery" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
              <SessionDeliveryStep
                onSubmit={(details) => {
                  setDeliveryDetails(details);
                  setStep("publish");
                }}
              />
            </motion.div>
          )}

          {step === "publish" && sessionDetails && deliveryDetails && (
            <motion.div key="publish" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
              <PublishPreview
                mentorName={mentorName}
                session={sessionDetails}
                delivery={deliveryDetails}
                onPublish={handlePublish}
                isPublishing={isPublishing}
              />
            </motion.div>
          )}

          {step === "published" && sessionDetails && (
            <motion.div
              key="published"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card flex flex-col items-center gap-4 p-10 text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h2 className="text-xl font-extrabold text-foreground">Session Published!</h2>
              <p className="max-w-sm text-sm text-muted-foreground">
                "{sessionDetails.title}" is now live for learners to discover and register.
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                <Button onClick={() => navigate("/sessions")} className="group">
                  <Sparkles className="h-4 w-4" />
                  View in Sessions
                </Button>
                <Button variant="secondary" onClick={() => navigate("/mentor-dashboard")}>
                  Back to Dashboard
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
