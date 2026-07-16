import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Logo } from "@/components/layout/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { authApi, extractErrorMessage } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { useLanguage } from "@/context/LanguageContext";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { setSession } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: typeof errors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = t("login.errorEmail");
    if (password.length === 0) nextErrors.password = t("login.errorPassword");
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const res = await authApi.login({ email, password });
      setSession(res.data.access_token, res.data.user);
      toast({ title: "Welcome back!", variant: "success" });
      navigate("/dashboard");
    } catch (error) {
      toast({ title: "Login failed", description: extractErrorMessage(error), variant: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-svh w-full flex-col items-center px-4 py-10 sm:py-16">
      <div className="mb-8 flex w-full max-w-md items-center justify-between">
        <Logo />
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex w-full flex-1 items-center justify-center"
      >
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{t("login.welcomeBack")}</CardTitle>
            <CardDescription>{t("login.description")}</CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <div>
              <Label htmlFor="email">{t("login.emailLabel")}</Label>
              <Input
                id="email"
                type="email"
                icon={<Mail className="h-4 w-4" />}
                placeholder={t("login.emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                autoComplete="email"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">{t("login.passwordLabel")}</Label>
              <Input
                id="password"
                type="password"
                icon={<Lock className="h-4 w-4" />}
                placeholder={t("login.passwordPlaceholder")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                autoComplete="current-password"
                required
              />
            </div>

            <Button type="submit" size="lg" className="group mt-2 w-full" isLoading={isSubmitting}>
              {t("login.signIn")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t("login.newToVidyaarth", { brand: "Vidyaअर्थ" })}{" "}
            <Link to="/" className="font-semibold text-primary hover:underline">
              {t("login.createAccount")}
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
