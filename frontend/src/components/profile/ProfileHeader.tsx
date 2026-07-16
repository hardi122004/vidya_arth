import { motion } from "framer-motion";
import { Pencil, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CompletionRing } from "@/components/profile/CompletionRing";

interface ProfileHeaderProps {
  fullName: string;
  username: string;
  email: string;
  completion: number;
  onEdit: () => void;
}

export function ProfileHeader({ fullName, username, email, completion, onEdit }: ProfileHeaderProps) {
  const initial = fullName.trim().charAt(0).toUpperCase() || "U";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card relative overflow-hidden p-6 sm:p-8"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-purple-400/20 blur-3xl" />

      <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-5">
          <div className="gradient-brand flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl text-2xl font-bold text-white shadow-lg shadow-primary/25">
            {initial}
          </div>
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary">
                <Sparkles className="h-3 w-3" />
                Learning Identity
              </span>
            </div>
            <h1 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
              {fullName || "Your Name"}
            </h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              @{username || "username"} &middot; {email}
            </p>
          </div>
        </div>

        <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:justify-end">
          <div className="flex items-center gap-3">
            <CompletionRing percent={completion} />
            <div className="text-xs">
              <p className="font-semibold text-foreground">Profile strength</p>
              <p className="text-muted-foreground">Helps your AI tutor personalize better</p>
            </div>
          </div>
          <Button variant="secondary" size="sm" onClick={onEdit} className="shrink-0">
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
