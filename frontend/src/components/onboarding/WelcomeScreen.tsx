import { motion } from "framer-motion";
import { ArrowRight, Briefcase, GraduationCap, Puzzle, Sparkles, Users2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import type { TranslationKey } from "@/lib/i18n";

const highlights: { icon: typeof Sparkles; key: TranslationKey }[] = [
  { icon: Sparkles, key: "welcome.highlight.skills" },
  { icon: Briefcase, key: "welcome.highlight.career" },
  { icon: Users2, key: "welcome.highlight.mentor" },
  { icon: GraduationCap, key: "welcome.highlight.noDegree" },
  { icon: Puzzle, key: "welcome.highlight.realWorld" },
];

export function WelcomeScreen({ onGetStarted }: { onGetStarted: () => void }) {
  const { t } = useLanguage();
  const [titleBefore, titleAfter] = t("welcome.title").split("{brand}");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex w-full max-w-2xl flex-col items-center text-center"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        className="font-display text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl"
      >
        {titleBefore}Vidya<span className="gradient-brand-text">अर्थ</span>
        {titleAfter}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32, duration: 0.6, ease: "easeOut" }}
        className="mt-5 text-lg font-medium text-foreground/80"
      >
        {t("welcome.tagline")}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.44, duration: 0.6, ease: "easeOut" }}
        className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base"
      >
        {t("welcome.subtitle")}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.56, duration: 0.6 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-3"
      >
        {highlights.map(({ icon: Icon, key }) => (
          <span
            key={key}
            className="glass flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold text-foreground/80"
          >
            <Icon className="h-3.5 w-3.5 shrink-0 text-primary" />
            {t(key)}
          </span>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="mt-10"
      >
        <Button size="lg" onClick={onGetStarted} className="group px-10">
          {t("welcome.getStarted")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
