import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { DOMAINS } from "@/data/skillsData";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type FilterTab = "all" | "trending" | "recommended" | "az";
export type SortOption = "popular" | "enrolled" | "alphabetical";

interface SkillFiltersProps {
  query: string;
  onQueryChange: (value: string) => void;
  activeTab: FilterTab;
  onTabChange: (tab: FilterTab) => void;
  domain: string;
  onDomainChange: (domain: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const TABS: { value: FilterTab; label: string }[] = [
  { value: "all", label: "All" },
  { value: "trending", label: "Trending" },
  { value: "recommended", label: "Recommended" },
  { value: "az", label: "A–Z" },
];

export function SkillFilters({
  query,
  onQueryChange,
  activeTab,
  onTabChange,
  domain,
  onDomainChange,
  sortBy,
  onSortChange,
}: SkillFiltersProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search any skill..."
          className="h-13 w-full rounded-2xl border border-input bg-surface/80 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground/70 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/50"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex items-center gap-1 rounded-full border border-border/60 bg-surface/60 p-1">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => onTabChange(tab.value)}
              className={cn(
                "relative rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
                activeTab === tab.value ? "text-white" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {activeTab === tab.value && (
                <motion.span
                  layoutId="skill-filter-pill"
                  className="gradient-brand absolute inset-0 rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={domain}
            onChange={(e) => onDomainChange(e.target.value)}
            className="h-10 w-44 text-xs"
          >
            <option value="">All Domains</option>
            {DOMAINS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </Select>

          <Select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="h-10 w-44 text-xs"
          >
            <option value="popular">Sort: Most Popular</option>
            <option value="enrolled">Sort: Most Enrolled</option>
            <option value="alphabetical">Sort: Alphabetical</option>
          </Select>
        </div>
      </div>
    </div>
  );
}
