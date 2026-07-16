import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, LogOut, Settings, UserCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const NAV_LINKS = ["Home", "Skills", "Career", "Mentors"];

export function DashboardNavbar() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const activeLink = location.pathname === "/dashboard"
    ? "Home"
    : location.pathname.startsWith("/skills")
      ? "Skills"
      : "";
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleComingSoon = (label: string) => {
    setProfileOpen(false);
    toast({ title: label, description: "This section is coming soon.", variant: "info" });
  };

  const handleLogout = async () => {
    setProfileOpen(false);
    await logout();
    navigate("/login");
  };

  const initial = user?.full_name?.charAt(0).toUpperCase() ?? "U";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex shrink-0 items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl shadow-md shadow-brand-purple-500/20">
            <img src="/logo-mark.png" alt="Vidyaअर्थ" className="h-full w-full object-cover" />
          </div>
          <span className="hidden text-lg font-extrabold tracking-tight text-foreground sm:inline">
            Vidya<span className="gradient-brand-text">अर्थ</span>
          </span>
        </div>

        <nav className="hidden items-center gap-1 rounded-full border border-border/60 bg-surface/60 p-1 md:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              type="button"
              onClick={() => {
                if (link === "Home") navigate("/dashboard");
                else if (link === "Skills") navigate("/skills");
                else handleComingSoon(link);
              }}
              className={cn(
                "relative rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
                activeLink === link ? "text-white" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {activeLink === link && (
                <motion.span
                  layoutId="nav-pill"
                  className="gradient-brand absolute inset-0 rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative">{link}</span>
            </button>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <ThemeToggle />

          <div className="relative" ref={notificationsRef}>
            <button
              type="button"
              aria-label="Notifications"
              onClick={() => setNotificationsOpen((o) => !o)}
              className="glass relative flex h-11 w-11 items-center justify-center rounded-full text-foreground transition hover:scale-105 active:scale-95"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-brand-purple-500 ring-2 ring-background" />
            </button>

            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-72 overflow-hidden rounded-3xl border border-border bg-popover p-4 shadow-2xl shadow-black/10"
                >
                  <p className="text-sm font-semibold text-foreground">Notifications</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    You're all caught up! New mentor sessions and skill recommendations will show up here.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative" ref={profileRef}>
            <button
              type="button"
              aria-label="Profile menu"
              onClick={() => setProfileOpen((o) => !o)}
              className="gradient-brand flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white shadow-md shadow-primary/25 transition hover:scale-105 active:scale-95"
            >
              {initial}
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-64 overflow-hidden rounded-3xl border border-border bg-popover p-2 shadow-2xl shadow-black/10"
                >
                  <div className="mb-1 border-b border-border/60 px-3 py-2.5">
                    <p className="truncate text-sm font-semibold text-foreground">{user?.full_name}</p>
                    <p className="truncate text-xs text-muted-foreground">{user?.email ?? "No email on file"}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/profile");
                    }}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-foreground transition hover:bg-accent"
                  >
                    <UserCircle2 className="h-4 w-4 text-muted-foreground" />
                    My Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => handleComingSoon("Settings")}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-foreground transition hover:bg-accent"
                  >
                    <Settings className="h-4 w-4 text-muted-foreground" />
                    Settings
                  </button>

                  <div className="my-1 border-t border-border/60" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-destructive transition hover:bg-destructive/10"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
