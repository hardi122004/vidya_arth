import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Cake, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { calculateAge } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface BasicInfoStepProps {
  fullName: string;
  dateOfBirth: string;
  onNext: (data: { fullName: string; dateOfBirth: string; age: number }) => void;
}

const today = new Date().toISOString().split("T")[0];

export function BasicInfoStep({ fullName: initialName, dateOfBirth: initialDob, onNext }: BasicInfoStepProps) {
  const { t } = useLanguage();
  const [fullName, setFullName] = useState(initialName);
  const [dateOfBirth, setDateOfBirth] = useState(initialDob);
  const [errors, setErrors] = useState<{ fullName?: string; dateOfBirth?: string }>({});

  const age = useMemo(() => (dateOfBirth ? calculateAge(dateOfBirth) : null), [dateOfBirth]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: typeof errors = {};

    if (fullName.trim().length < 2) {
      nextErrors.fullName = t("basicInfo.errorFullName");
    }
    if (!dateOfBirth) {
      nextErrors.dateOfBirth = t("basicInfo.errorDobRequired");
    } else if (age !== null && (age < 5 || age > 100)) {
      nextErrors.dateOfBirth = t("basicInfo.errorDobInvalid");
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onNext({ fullName: fullName.trim(), dateOfBirth, age: age ?? 0 });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{t("basicInfo.title")}</CardTitle>
        <CardDescription>{t("basicInfo.description")}</CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <div>
          <Label htmlFor="fullName">{t("basicInfo.fullNameLabel")}</Label>
          <Input
            id="fullName"
            name="fullName"
            placeholder={t("basicInfo.fullNamePlaceholder")}
            icon={<User className="h-4 w-4" />}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            error={errors.fullName}
            autoComplete="name"
            required
          />
        </div>

        <div>
          <Label htmlFor="dateOfBirth">{t("basicInfo.dobLabel")}</Label>
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            max={today}
            icon={<Cake className="h-4 w-4" />}
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            error={errors.dateOfBirth}
            required
          />
        </div>

        <AnimatePresence>
          {age !== null && !errors.dateOfBirth && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: -8 }}
              animate={{ opacity: 1, height: "auto", marginTop: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="glass flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-primary">
                <Cake className="h-4 w-4" />
                {t("basicInfo.ageDetected", { age, unit: t(age === 1 ? "basicInfo.year" : "basicInfo.years") })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Button type="submit" size="lg" className="group mt-2 w-full">
          {t("basicInfo.continue")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </form>
    </Card>
  );
}
