import { useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { StepIndicator } from "@/components/ui/progress";
import { ChallengeSelection } from "@/components/assessment/ChallengeSelection";
import { SubmissionForm } from "@/components/assessment/SubmissionForm";
import { EvaluatingState } from "@/components/assessment/EvaluatingState";
import { FeedbackReport } from "@/components/assessment/FeedbackReport";
import { getSkillById } from "@/data/skillsData";
import { generateIndustryChallenge, type IndustryChallenge } from "@/data/assessmentChallenges";
import { evaluateSubmission, type EvaluationResult, type Submission } from "@/lib/aiEvaluator";
import { saveAttempt } from "@/lib/assessmentAttempts";
import { addCertification } from "@/lib/certifications";

type Step = "choose" | "submit" | "evaluating" | "report";

const STEP_LABELS = ["Challenge", "Submit", "Report"];
const STEP_NUMBER: Record<Step, number> = { choose: 1, submit: 2, evaluating: 2, report: 3 };

export function AssessmentPage() {
  const { skillId } = useParams<{ skillId: string }>();
  const { user, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const skill = skillId ? getSkillById(skillId) : undefined;

  const [step, setStep] = useState<Step>("choose");
  const [challenge, setChallenge] = useState<IndustryChallenge | null>(null);
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [attemptNumber, setAttemptNumber] = useState(1);

  const industryChallenge = useMemo(() => (skill ? generateIndustryChallenge(skill) : null), [skill]);

  if (isLoading) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (!skill || !industryChallenge) return <Navigate to="/assessments" replace />;

  const handleChallengeChosen = (chosen: IndustryChallenge) => {
    setChallenge(chosen);
    setStep("submit");
  };

  const handleSubmission = (submission: Submission) => {
    if (!challenge) return;
    setStep("evaluating");

    window.setTimeout(() => {
      const result = evaluateSubmission(skill.name, challenge.title, submission);
      setEvaluation(result);

      const saved = saveAttempt({
        skillId: skill.id,
        challengeTitle: challenge.title,
        challengeDescription: challenge.description,
        submission,
        evaluation: result,
      });
      setAttemptNumber(saved.attemptNumber);

      if (result.certified) {
        addCertification({
          skillId: skill.id,
          skillName: skill.name,
          projectTitle: challenge.title,
          score: result.overallScore,
          completedAt: new Date().toISOString(),
        });
        toast({
          title: "Certified!",
          description: `${skill.name} has been added to your portfolio.`,
          variant: "success",
        });
      }

      setStep("report");
    }, 2600);
  };

  const handleResubmit = () => {
    setEvaluation(null);
    setChallenge(null);
    setStep("choose");
  };

  return (
    <div className="min-h-svh w-full">
      <DashboardNavbar />

      <main className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigate("/assessments")}
          className="flex w-fit items-center gap-1.5 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Assessments
        </button>

        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-wide text-primary">{skill.domain}</p>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            {skill.name} Assessment
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Demonstrate real-world competency through a project — not a quiz.
          </p>
        </div>

        {step !== "report" && (
          <StepIndicator steps={STEP_LABELS} currentStep={STEP_NUMBER[step]} />
        )}

        <AnimatePresence mode="wait">
          {step === "choose" && (
            <motion.div key="choose" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
              <ChallengeSelection
                skillName={skill.name}
                industryChallenge={industryChallenge}
                onAcceptChallenge={handleChallengeChosen}
                onSubmitOwnProblem={handleChallengeChosen}
              />
            </motion.div>
          )}

          {step === "submit" && challenge && (
            <motion.div key="submit" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} className="flex flex-col gap-5">
              <div className="glass rounded-2xl p-5">
                <p className="mb-1 text-xs font-bold uppercase tracking-wide text-primary">Your Challenge</p>
                <h3 className="text-sm font-bold text-foreground">{challenge.title}</h3>
              </div>
              <SubmissionForm onSubmit={handleSubmission} />
            </motion.div>
          )}

          {step === "evaluating" && (
            <motion.div key="evaluating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <EvaluatingState skillName={skill.name} />
            </motion.div>
          )}

          {step === "report" && evaluation && (
            <motion.div key="report" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <FeedbackReport
                skillName={skill.name}
                evaluation={evaluation}
                attemptNumber={attemptNumber}
                onResubmit={handleResubmit}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
