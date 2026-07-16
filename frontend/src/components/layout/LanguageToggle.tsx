import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { LANGUAGES } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const current = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("language.selectorLabel")}
        aria-expanded={open}
        className="glass flex h-11 items-center gap-1.5 rounded-full px-3.5 text-xs font-semibold text-foreground transition hover:scale-105 active:scale-95"
      >
        <Globe className="h-4 w-4 text-primary" />
        {current.code.toUpperCase()}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="glass-card absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-2xl p-1.5"
          >
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  setLanguage(lang.code);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-medium transition hover:bg-accent",
                  lang.code === language ? "text-primary" : "text-foreground/80",
                )}
              >
                {lang.nativeLabel}
                {lang.code === language && <Check className="h-3.5 w-3.5" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
