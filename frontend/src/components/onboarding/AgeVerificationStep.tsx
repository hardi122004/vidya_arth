import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Lock, Mail, Phone, ShieldCheck, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";

interface AdultFields {
  email: string;
  phoneNumber: string;
  password: string;
}

interface MinorFields {
  guardianName: string;
  guardianEmail: string;
  guardianPhone: string;
}

interface AgeVerificationStepProps {
  age: number;
  fullName: string;
  initialAdult: AdultFields;
  initialMinor: MinorFields;
  onBack: () => void;
  onNext: (data: Partial<AdultFields & MinorFields>) => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s()-]{7,20}$/;

export function AgeVerificationStep({
  age,
  fullName,
  initialAdult,
  initialMinor,
  onBack,
  onNext,
}: AgeVerificationStepProps) {
  const { t } = useLanguage();
  const isMinor = age < 18;
  const firstName = fullName.trim().split(" ")[0] || "there";

  const [adult, setAdult] = useState<AdultFields>(initialAdult);
  const [minor, setMinor] = useState<MinorFields>(initialMinor);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};

    if (isMinor) {
      if (minor.guardianName.trim().length < 2) nextErrors.guardianName = t("ageVerification.errorGuardianName");
      if (!EMAIL_RE.test(minor.guardianEmail)) nextErrors.guardianEmail = t("ageVerification.errorEmail");
      if (!PHONE_RE.test(minor.guardianPhone)) nextErrors.guardianPhone = t("ageVerification.errorPhone");
    } else {
      if (!EMAIL_RE.test(adult.email)) nextErrors.email = t("ageVerification.errorEmail");
      if (!PHONE_RE.test(adult.phoneNumber)) nextErrors.phoneNumber = t("ageVerification.errorPhone");
      if (adult.password.length < 8) nextErrors.password = t("ageVerification.errorPassword");
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onNext(isMinor ? minor : adult);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{t("ageVerification.title")}</CardTitle>
        <CardDescription>{t("ageVerification.description", { name: firstName })}</CardDescription>
      </CardHeader>

      <AnimatePresence mode="wait">
        <motion.div
          key={isMinor ? "minor" : "adult"}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <div
            className={`glass mb-6 flex items-start gap-3 rounded-xl px-4 py-3 text-sm font-medium ${
              isMinor ? "text-brand-purple-600 dark:text-brand-purple-300" : "text-primary"
            }`}
          >
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
            {isMinor ? (
              <span>{t("ageVerification.minorNotice")}</span>
            ) : (
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" /> {t("ageVerification.adultNotice")}
              </span>
            )}
          </div>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            {isMinor ? (
              <>
                <div>
                  <Label htmlFor="guardianName">{t("ageVerification.guardianNameLabel")}</Label>
                  <Input
                    id="guardianName"
                    icon={<User className="h-4 w-4" />}
                    placeholder={t("ageVerification.guardianNamePlaceholder")}
                    value={minor.guardianName}
                    onChange={(e) => setMinor((m) => ({ ...m, guardianName: e.target.value }))}
                    error={errors.guardianName}
                    autoComplete="name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="guardianEmail">{t("ageVerification.guardianEmailLabel")}</Label>
                  <Input
                    id="guardianEmail"
                    type="email"
                    icon={<Mail className="h-4 w-4" />}
                    placeholder={t("ageVerification.guardianEmailPlaceholder")}
                    value={minor.guardianEmail}
                    onChange={(e) => setMinor((m) => ({ ...m, guardianEmail: e.target.value }))}
                    error={errors.guardianEmail}
                    autoComplete="email"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="guardianPhone">{t("ageVerification.guardianPhoneLabel")}</Label>
                  <Input
                    id="guardianPhone"
                    type="tel"
                    icon={<Phone className="h-4 w-4" />}
                    placeholder={t("ageVerification.phonePlaceholder")}
                    value={minor.guardianPhone}
                    onChange={(e) => setMinor((m) => ({ ...m, guardianPhone: e.target.value }))}
                    error={errors.guardianPhone}
                    autoComplete="tel"
                    required
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <Label htmlFor="email">{t("ageVerification.emailLabel")}</Label>
                  <Input
                    id="email"
                    type="email"
                    icon={<Mail className="h-4 w-4" />}
                    placeholder={t("ageVerification.emailPlaceholder")}
                    value={adult.email}
                    onChange={(e) => setAdult((a) => ({ ...a, email: e.target.value }))}
                    error={errors.email}
                    autoComplete="email"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phoneNumber">{t("ageVerification.phoneLabel")}</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    icon={<Phone className="h-4 w-4" />}
                    placeholder={t("ageVerification.phonePlaceholder")}
                    value={adult.phoneNumber}
                    onChange={(e) => setAdult((a) => ({ ...a, phoneNumber: e.target.value }))}
                    error={errors.phoneNumber}
                    autoComplete="tel"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">{t("ageVerification.passwordLabel")}</Label>
                  <Input
                    id="password"
                    type="password"
                    icon={<Lock className="h-4 w-4" />}
                    placeholder={t("ageVerification.passwordPlaceholder")}
                    value={adult.password}
                    onChange={(e) => setAdult((a) => ({ ...a, password: e.target.value }))}
                    error={errors.password}
                    autoComplete="new-password"
                    required
                  />
                </div>
              </>
            )}

            <div className="mt-2 flex gap-3">
              <Button type="button" variant="secondary" size="lg" onClick={onBack} className="w-1/3">
                <ArrowLeft className="h-4 w-4" />
                {t("ageVerification.back")}
              </Button>
              <Button type="submit" size="lg" className="group flex-1">
                {t("ageVerification.continue")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </form>
        </motion.div>
      </AnimatePresence>
    </Card>
  );
}
