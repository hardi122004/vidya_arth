import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { WelcomeScreen } from "@/components/onboarding/WelcomeScreen";
import { BasicInfoStep } from "@/components/onboarding/BasicInfoStep";
import { AgeVerificationStep } from "@/components/onboarding/AgeVerificationStep";
import { RoleSelectionStep } from "@/components/onboarding/RoleSelectionStep";
import { SuccessScreen } from "@/components/onboarding/SuccessScreen";
import { StepIndicator } from "@/components/ui/progress";
import { Logo } from "@/components/layout/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { initialOnboardingData, type OnboardingData } from "@/types/onboarding";
import { authApi, extractErrorMessage, type SignupPayload } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { useLanguage } from "@/context/LanguageContext";

type FlowStage = "welcome" | 1 | 2 | 3 | "success";

export function OnboardingPage() {
  const [stage, setStage] = useState<FlowStage>("welcome");
  const [data, setData] = useState<OnboardingData>(initialOnboardingData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { setSession } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();
  const STEP_LABELS = [t("steps.basicInfo"), t("steps.verification"), t("steps.role")];

  const handleRoleSubmit = async (role: OnboardingData["role"]) => {
    if (!role) return;
    setIsSubmitting(true);

    const payload: SignupPayload = {
      full_name: data.fullName,
      date_of_birth: data.dateOfBirth,
      role,
      ...(data.isMinor
        ? {
            guardian_name: data.guardianName,
            guardian_email: data.guardianEmail,
            guardian_phone: data.guardianPhone,
          }
        : {
            email: data.email,
            phone_number: data.phoneNumber,
            password: data.password,
          }),
    };

    try {
      const res = await authApi.signup(payload);
      setSession(res.data.access_token, res.data.user);
      setData((d) => ({ ...d, role }));
      setStage("success");
      toast({ title: "Account created!", description: "Welcome to Vidyaअर्थ.", variant: "success" });
    } catch (error) {
      toast({ title: "Sign up failed", description: extractErrorMessage(error), variant: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStepNumber = typeof stage === "number" ? stage : stage === "success" ? 3 : 1;

  return (
    <div className="flex min-h-svh w-full flex-col items-center px-4 py-6 sm:py-8">
      <div className="mb-8 flex w-full items-center justify-between">
        <Logo />
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>

      {typeof stage === "number" && (
        <div className="mb-10 w-full max-w-lg">
          <StepIndicator steps={STEP_LABELS} currentStep={currentStepNumber} />
        </div>
      )}

      <div className="flex w-full flex-1 flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {stage === "welcome" && (
            <motion.div key="welcome" exit={{ opacity: 0, y: -20 }} className="flex w-full justify-center">
              <WelcomeScreen onGetStarted={() => setStage(1)} />
            </motion.div>
          )}

          {stage === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex w-full justify-center"
            >
              <BasicInfoStep
                fullName={data.fullName}
                dateOfBirth={data.dateOfBirth}
                onNext={({ fullName, dateOfBirth, age }) => {
                  setData((d) => ({ ...d, fullName, dateOfBirth, age, isMinor: age < 18 }));
                  setStage(2);
                }}
              />
            </motion.div>
          )}

          {stage === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex w-full justify-center"
            >
              <AgeVerificationStep
                age={data.age}
                fullName={data.fullName}
                initialAdult={{ email: data.email, phoneNumber: data.phoneNumber, password: data.password }}
                initialMinor={{
                  guardianName: data.guardianName,
                  guardianEmail: data.guardianEmail,
                  guardianPhone: data.guardianPhone,
                }}
                onBack={() => setStage(1)}
                onNext={(fields) => {
                  setData((d) => ({ ...d, ...fields }));
                  setStage(3);
                }}
              />
            </motion.div>
          )}

          {stage === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex w-full justify-center"
            >
              <RoleSelectionStep
                initialRole={data.role}
                isMinor={data.isMinor}
                onBack={() => setStage(2)}
                onSubmit={handleRoleSubmit}
                isSubmitting={isSubmitting}
              />
            </motion.div>
          )}

          {stage === "success" && (
            <motion.div key="success" className="flex w-full justify-center">
              <SuccessScreen fullName={data.fullName} onContinue={() => navigate("/dashboard")} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
