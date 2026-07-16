import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Award, Bookmark, Compass, Sparkles, Users2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { SkillCard } from "@/components/skills/SkillCard";
import { SkillFilters, type FilterTab, type SortOption } from "@/components/skills/SkillFilters";
import { Button } from "@/components/ui/button";
import { SKILLS } from "@/data/skillsData";
import { getBookmarkedSkillIds, toggleSkillBookmark } from "@/lib/bookmarks";
import { cn } from "@/lib/utils";

type View = "browse" | "wishlist";

export function SkillsPage() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  const [view, setView] = useState<View>("browse");
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [domain, setDomain] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  useEffect(() => {
    setBookmarkedIds(getBookmarkedSkillIds());
  }, []);

  const handleToggleBookmark = (skillId: string) => {
    toggleSkillBookmark(skillId);
    setBookmarkedIds(getBookmarkedSkillIds());
  };

  const filteredSkills = useMemo(() => {
    let result = SKILLS;

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        (s) => s.name.toLowerCase().includes(q) || s.domain.toLowerCase().includes(q),
      );
    }

    if (domain) {
      result = result.filter((s) => s.domain === domain);
    }

    if (activeTab === "trending") result = result.filter((s) => s.trending);
    if (activeTab === "recommended") result = result.filter((s) => s.recommended);

    const sorted = [...result];
    if (activeTab === "az" || sortBy === "alphabetical") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      sorted.sort((a, b) => b.learners - a.learners);
    }

    return sorted;
  }, [query, domain, activeTab, sortBy]);

  const wishlistSkills = useMemo(
    () => SKILLS.filter((s) => bookmarkedIds.includes(s.id)),
    [bookmarkedIds],
  );

  if (isLoading) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  const activeSkills = view === "browse" ? filteredSkills : wishlistSkills;

  return (
    <div className="min-h-svh w-full">
      <DashboardNavbar />

      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Marketplace of Knowledge
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">Explore Skills</h1>
            <p className="mt-1.5 text-sm text-muted-foreground sm:text-base">
              Discover skills based on current industry trends and your interests.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="secondary" onClick={() => navigate("/sessions")}>
              <Users2 className="h-4 w-4" />
              Mentor Sessions
            </Button>
            <Button variant="secondary" onClick={() => navigate("/assessments")}>
              <Award className="h-4 w-4" />
              My Assessments
            </Button>
          </div>
        </motion.div>

        <div className="flex items-center gap-2 rounded-full border border-border/60 bg-surface/60 p-1 w-fit">
          <button
            type="button"
            onClick={() => setView("browse")}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              view === "browse" ? "gradient-brand text-white" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Compass className="h-4 w-4" />
            Explore Skills
          </button>
          <button
            type="button"
            onClick={() => setView("wishlist")}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              view === "wishlist" ? "gradient-brand text-white" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Bookmark className="h-4 w-4" />
            My Wishlist {wishlistSkills.length > 0 && `(${wishlistSkills.length})`}
          </button>
        </div>

        {view === "browse" && (
          <SkillFilters
            query={query}
            onQueryChange={setQuery}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            domain={domain}
            onDomainChange={setDomain}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        )}

        {activeSkills.length === 0 ? (
          <div className="glass-card flex flex-col items-center gap-3 py-16 text-center">
            {view === "wishlist" ? (
              <>
                <Bookmark className="h-8 w-8 text-muted-foreground" />
                <h2 className="text-lg font-bold text-foreground">Your wishlist is empty</h2>
                <p className="max-w-sm text-sm text-muted-foreground">
                  Bookmark skills you're curious about and they'll show up here.
                </p>
              </>
            ) : (
              <>
                <Compass className="h-8 w-8 text-muted-foreground" />
                <h2 className="text-lg font-bold text-foreground">No skills match your search</h2>
                <p className="max-w-sm text-sm text-muted-foreground">Try a different keyword or filter.</p>
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {activeSkills.map((skill, idx) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                isBookmarked={bookmarkedIds.includes(skill.id)}
                onToggleBookmark={handleToggleBookmark}
                index={idx}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
