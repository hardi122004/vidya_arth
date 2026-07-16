import { cn } from "@/lib/utils";

export function Logo({ className, iconOnly = false }: { className?: string; iconOnly?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-2xl shadow-lg shadow-brand-purple-500/20">
        <img src="/logo-mark.png" alt="Vidyaअर्थ" className="h-full w-full object-cover" />
      </div>
      {!iconOnly && (
        <span className="text-xl font-extrabold tracking-tight text-foreground">
          Vidya<span className="gradient-brand-text">अर्थ</span>
        </span>
      )}
    </div>
  );
}
