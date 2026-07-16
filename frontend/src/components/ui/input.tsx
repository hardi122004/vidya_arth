import { forwardRef, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, error, id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="w-full">
        <div className="relative">
          {icon && (
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              {icon}
            </span>
          )}
          <input
            id={id}
            type={resolvedType}
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            className={cn(
              "flex h-13 w-full rounded-2xl border bg-surface/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary",
              "disabled:cursor-not-allowed disabled:opacity-50",
              icon && "pl-11",
              isPassword && "pr-11",
              error ? "border-destructive focus:ring-destructive/40" : "border-input hover:border-primary/40",
              className,
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}
        </div>
        {error && (
          <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs font-medium text-destructive">
            {error}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";
