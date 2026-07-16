import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { LANGUAGES, translations, type Language, type TranslationKey } from "@/lib/i18n";

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const SUPPORTED = LANGUAGES.map((l) => l.code);

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem("techtrek-language");
  if (stored && SUPPORTED.includes(stored as Language)) return stored as Language;
  const browserLang = window.navigator.language.slice(0, 2);
  if (SUPPORTED.includes(browserLang as Language)) return browserLang as Language;
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    window.document.documentElement.lang = language;
    window.localStorage.setItem("techtrek-language", language);
  }, [language]);

  const setLanguage = (next: Language) => setLanguageState(next);

  const t = (key: TranslationKey, vars?: Record<string, string | number>) => {
    let str = translations[language][key] ?? translations.en[key];
    if (vars) {
      for (const [name, value] of Object.entries(vars)) {
        str = str.replaceAll(`{${name}}`, String(value));
      }
    }
    return str;
  };

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
