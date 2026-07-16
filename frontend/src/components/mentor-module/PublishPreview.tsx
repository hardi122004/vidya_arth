import { motion } from "framer-motion";
import { Calendar, Globe, Link2, Rocket, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDomainIcon } from "@/data/skillsData";
import type { SessionDetails } from "@/components/mentor-module/CreateSessionForm";
import type { DeliveryDetails } from "@/components/mentor-module/SessionDeliveryStep";

interface PublishPreviewProps {
  mentorName: string;
  session: SessionDetails;
  delivery: DeliveryDetails;
  onPublish: () => void;
  isPublishing?: boolean;
}

export function PublishPreview({ mentorName, session, delivery, onPublish, isPublishing }: PublishPreviewProps) {
  const Icon = getDomainIcon(session.domain);
  const formattedDate = new Date(`${session.date}T${session.time || "00:00"}`).toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-5">
      <div className="glass-card relative overflow-hidden p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-purple-400/20 blur-3xl" />

        <p className="relative mb-4 text-xs font-bold uppercase tracking-wide text-primary">Session Preview</p>

        <div className="relative flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl gradient-brand text-white shadow-lg shadow-primary/25">
            <Icon className="h-7 w-7" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-foreground">{session.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{session.description}</p>
          </div>
        </div>

        <div className="relative mt-6 grid gap-4 sm:grid-cols-2">
          <div className="glass flex items-center gap-3 rounded-2xl p-4">
            <User className="h-4 w-4 shrink-0 text-primary" />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Mentor</p>
              <p className="text-sm font-semibold text-foreground">{mentorName}</p>
            </div>
          </div>
          <div className="glass flex items-center gap-3 rounded-2xl p-4">
            <Icon className="h-4 w-4 shrink-0 text-primary" />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Domain</p>
              <p className="text-sm font-semibold text-foreground">{session.domain}</p>
            </div>
          </div>
          <div className="glass flex items-center gap-3 rounded-2xl p-4">
            <Globe className="h-4 w-4 shrink-0 text-primary" />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Language</p>
              <p className="text-sm font-semibold text-foreground">{session.language}</p>
            </div>
          </div>
          <div className="glass flex items-center gap-3 rounded-2xl p-4">
            <Calendar className="h-4 w-4 shrink-0 text-primary" />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Date &amp; Time</p>
              <p className="text-sm font-semibold text-foreground">
                {formattedDate} &middot; {session.time}
              </p>
            </div>
          </div>
          <div className="glass flex items-center gap-3 rounded-2xl p-4 sm:col-span-2">
            <Link2 className="h-4 w-4 shrink-0 text-primary" />
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                {delivery.platform} Link
              </p>
              <p className="truncate text-sm font-semibold text-foreground">{delivery.url}</p>
            </div>
          </div>
        </div>
      </div>

      <Button size="lg" onClick={onPublish} isLoading={isPublishing} className="group w-full sm:w-auto sm:self-end">
        <Rocket className="h-4 w-4" />
        Publish Session
      </Button>
    </motion.div>
  );
}
