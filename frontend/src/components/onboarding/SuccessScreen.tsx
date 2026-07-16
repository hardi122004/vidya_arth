import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

export function SuccessScreen({ fullName, onContinue }: { fullName: string; onContinue: () => void }) {
  const { t } = useLanguage();
  const firstName = fullName.trim().split(" ")[0] || "there";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="glass-card flex w-full max-w-md flex-col items-center p-10 text-center"
    >
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 18 }}
        className="gradient-brand mb-6 flex h-20 w-20 items-center justify-center rounded-full shadow-lg shadow-primary/30"
      >
        <CheckCircle2 className="h-10 w-10 text-white" strokeWidth={2.5} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-2 flex items-center gap-2 text-2xl font-extrabold text-foreground"
      >
        {t("success.welcomeAboard", { name: firstName })}
        <PartyPopper className="h-6 w-6 text-brand-purple-500" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-8 text-sm leading-relaxed text-muted-foreground"
      >
        {t("success.description", { brand: "Vidyaअर्थ" })}
      </motion.p>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <Button size="lg" onClick={onContinue} className="group px-8">
          {t("success.goToDashboard")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
