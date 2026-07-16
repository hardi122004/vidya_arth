import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, GraduationCap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { UserRole } from "@/types/onboarding";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import type { TranslationKey } from "@/lib/i18n";

interface RoleSelectionStepProps {
  initialRole: UserRole | null;
  isMinor: boolean;
  onBack: () => void;
  onSubmit: (role: UserRole) => void;
  isSubmitting?: boolean;
}

const ROLES: { value: UserRole; titleKey: TranslationKey; descriptionKey: TranslationKey; icon: typeof GraduationCap }[] = [
  {
    value: "student",
    titleKey: "roleSelection.studentTitle",
    descriptionKey: "roleSelection.studentDescription",
    icon: GraduationCap,
  },
  {
    value: "teacher",
    titleKey: "roleSelection.teacherTitle",
    descriptionKey: "roleSelection.teacherDescription",
    icon: Users,
  },
];

export function RoleSelectionStep({ initialRole, onBack, onSubmit, isSubmitting }: RoleSelectionStepProps) {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<UserRole | null>(initialRole);

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>{t("roleSelection.title")}</CardTitle>
        <CardDescription>{t("roleSelection.description", { brand: "Vidyaअर्थ" })}</CardDescription>
      </CardHeader>

      <div role="radiogroup" aria-label="Select your role" className="grid gap-4 sm:grid-cols-2">
        {ROLES.map(({ value, titleKey, descriptionKey, icon: Icon }, idx) => {
          const isActive = selected === value;
          return (
            <motion.button
              key={value}
              type="button"
              role="radio"
              aria-checked={isActive}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelected(value)}
              className={cn(
                "group relative flex flex-col items-center gap-3 rounded-2xl border-2 p-5 text-center transition-all duration-200",
                isActive
                  ? "border-primary bg-primary/5 shadow-lg shadow-primary/10 dark:bg-primary/10"
                  : "border-border bg-surface/50 hover:border-primary/40 hover:bg-accent",
              )}
            >
              <div
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-200",
                  isActive
                    ? "gradient-brand text-white shadow-md shadow-primary/30"
                    : "bg-muted text-muted-foreground group-hover:text-primary",
                )}
              >
                <Icon className="h-7 w-7" />
              </div>
              <span className="text-sm font-bold text-foreground">{t(titleKey)}</span>
              <span className="text-xs leading-relaxed text-muted-foreground">{t(descriptionKey)}</span>

              {isActive && (
                <motion.div
                  layoutId="role-check"
                  className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full gradient-brand text-white shadow-md"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="mt-8 flex gap-3">
        <Button type="button" variant="secondary" size="lg" onClick={onBack} className="w-1/3">
          <ArrowLeft className="h-4 w-4" />
          {t("roleSelection.back")}
        </Button>
        <Button
          type="button"
          size="lg"
          className="group flex-1"
          disabled={!selected}
          isLoading={isSubmitting}
          onClick={() => selected && onSubmit(selected)}
        >
          {t("roleSelection.createAccount")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </Card>
  );
}
