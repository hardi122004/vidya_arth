import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarClock, Radio, Sparkles, Users2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { getDomainIcon } from "@/data/skillsData";
import { getPublishedSessions } from "@/lib/mentorSessions";

export function MentorSessionsPage() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  const sessions = getPublishedSessions();

  return (
    <div className="min-h-svh w-full">
      <DashboardNavbar />

      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Learn from real mentors
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">Mentor Sessions</h1>
          <p className="mt-1.5 text-sm text-muted-foreground sm:text-base">
            Live sessions hosted by authorized mentors across every domain.
          </p>
        </motion.div>

        {sessions.length === 0 ? (
          <div className="glass-card flex flex-col items-center gap-3 py-16 text-center">
            <CalendarClock className="h-8 w-8 text-muted-foreground" />
            <h2 className="text-lg font-bold text-foreground">No sessions published yet</h2>
            <p className="max-w-sm text-sm text-muted-foreground">
              Check back soon — mentors are getting authorized and setting up sessions.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sessions.map((session, idx) => {
              const Icon = getDomainIcon(session.domain);
              return (
                <motion.button
                  key={session.id}
                  type="button"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.35 }}
                  whileHover={{ y: -4 }}
                  onClick={() => navigate(`/sessions/${session.id}`)}
                  className="glass-card flex flex-col gap-4 p-5 text-left"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl gradient-brand text-white">
                      <Icon className="h-5.5 w-5.5" />
                    </div>
                    {session.deliveryType === "live" && (
                      <span className="flex items-center gap-1 rounded-full bg-destructive/10 px-2.5 py-1 text-[11px] font-bold text-destructive">
                        <Radio className="h-3 w-3" />
                        LIVE
                      </span>
                    )}
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary">{session.domain}</p>
                    <h3 className="mt-1 text-sm font-bold leading-snug text-foreground">{session.title}</h3>
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Users2 className="h-3.5 w-3.5" />
                      {session.mentorName} &middot; {session.mentorExperience}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CalendarClock className="h-3.5 w-3.5" />
                      {session.date} &middot; {session.time}
                    </p>
                  </div>

                  <span className="mt-auto w-fit rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary">
                    {session.difficulty}
                  </span>
                </motion.button>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
