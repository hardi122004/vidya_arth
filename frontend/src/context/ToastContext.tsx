import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastVariant = "success" | "error" | "info";

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  toast: (toast: Omit<Toast, "id">) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const VARIANT_STYLES: Record<ToastVariant, { icon: typeof CheckCircle2; accent: string }> = {
  success: { icon: CheckCircle2, accent: "text-success" },
  error: { icon: XCircle, accent: "text-destructive" },
  info: { icon: Info, accent: "text-primary" },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({ title, description, variant = "info" }: Omit<Toast, "id">) => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { id, title, description, variant }]);
      window.setTimeout(() => dismiss(id), 4500);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-2 px-4 sm:top-6 sm:items-end sm:right-6 sm:left-auto">
        <AnimatePresence>
          {toasts.map((t) => {
            const { icon: Icon, accent } = VARIANT_STYLES[t.variant];
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: -24, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 60, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="glass-card pointer-events-auto flex w-full max-w-sm items-start gap-3 p-4 sm:w-96"
                role="status"
              >
                <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", accent)} aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{t.title}</p>
                  {t.description && (
                    <p className="mt-0.5 text-sm text-muted-foreground">{t.description}</p>
                  )}
                </div>
                <button
                  onClick={() => dismiss(t.id)}
                  className="rounded-full p-1 text-muted-foreground/70 transition hover:bg-muted hover:text-foreground"
                  aria-label="Dismiss notification"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}
