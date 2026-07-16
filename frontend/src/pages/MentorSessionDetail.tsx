import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Globe,
  Radio,
  Sparkles,
  Users2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getDomainIcon } from "@/data/skillsData";
import { getSessionById } from "@/lib/mentorSessions";

export function MentorSessionDetailPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { user, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [registered, setRegistered] = useState(false);

  if (isLoading) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  const session = sessionId ? getSessionById(sessionId) : undefined;
  if (!session) return <Navigate to="/sessions" replace />;

  const Icon = getDomainIcon(session.domain);

  const handleRegister = () => {
    setRegistered(true);
    toast({ title: "You're registered!", description: "Opening the meeting link...", variant: "success" });
    if (session.meetingUrl) {
      window.open(session.meetingUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="min-h-svh w-full">
      <DashboardNavbar />

      <main className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigate("/sessions")}
          className="flex w-fit items-center gap-1.5 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Sessions
        </button>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card relative overflow-hidden p-6 sm:p-8"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-purple-400/20 blur-3xl" />

          <div className="relative flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl gradient-brand text-white shadow-lg shadow-primary/25">
              <Icon className="h-7 w-7" />
            </div>
            <div>
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-primary">
                {session.domain}
                {session.deliveryType === "live" && (
                  <span className="ml-1.5 flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] text-destructive">
                    <Radio className="h-2.5 w-2.5" />
                    LIVE
                  </span>
                )}
              </p>
              <h1 className="mt-1 text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
                {session.title}
              </h1>
            </div>
          </div>
        </motion.div>

        <Card>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-muted-foreground">Mentor Profile</h2>
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl gradient-brand text-lg font-bold text-white">
              {session.mentorName.charAt(0)}
            </div>
            <div>
              <p className="text-base font-bold text-foreground">{session.mentorName}</p>
              <p className="text-sm text-muted-foreground">{session.mentorExperience} of experience</p>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-muted-foreground">Session Details</h2>
          <p className="mb-5 text-sm leading-relaxed text-foreground">{session.description}</p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="glass flex items-center gap-3 rounded-2xl p-4">
              <Globe className="h-4 w-4 shrink-0 text-primary" />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Language</p>
                <p className="text-sm font-semibold text-foreground">{session.language}</p>
              </div>
            </div>
            <div className="glass flex items-center gap-3 rounded-2xl p-4">
              <Sparkles className="h-4 w-4 shrink-0 text-primary" />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Skill</p>
                <p className="text-sm font-semibold text-foreground">{session.skill}</p>
              </div>
            </div>
            <div className="glass flex items-center gap-3 rounded-2xl p-4">
              <Calendar className="h-4 w-4 shrink-0 text-primary" />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Date &amp; Time</p>
                <p className="text-sm font-semibold text-foreground">
                  {session.date} &middot; {session.time}
                </p>
              </div>
            </div>
            <div className="glass flex items-center gap-3 rounded-2xl p-4">
              <Clock className="h-4 w-4 shrink-0 text-primary" />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Duration</p>
                <p className="text-sm font-semibold text-foreground">{session.duration}</p>
              </div>
            </div>
            <div className="glass flex items-center gap-3 rounded-2xl p-4 sm:col-span-2">
              <Users2 className="h-4 w-4 shrink-0 text-primary" />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                  Difficulty &amp; Capacity
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {session.difficulty} &middot; Up to {session.maxParticipants} participants
                </p>
              </div>
            </div>
          </div>

          <Button
            size="lg"
            onClick={handleRegister}
            disabled={registered}
            className="group mt-6 w-full sm:w-auto"
          >
            {registered ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Registered
              </>
            ) : (
              <>
                Register
                <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </Button>
        </Card>
      </main>
    </div>
  );
}
