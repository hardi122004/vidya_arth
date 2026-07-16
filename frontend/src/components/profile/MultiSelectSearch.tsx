import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Search, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MultiSelectSearchProps {
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  suggested?: string[];
  suggestedLabel?: string;
  allowCustom?: boolean;
  maxSelections?: number;
}

export function MultiSelectSearch({
  options,
  selected,
  onChange,
  placeholder = "Search...",
  suggested,
  suggestedLabel = "Suggested",
  allowCustom = true,
  maxSelections,
}: MultiSelectSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const atLimit = maxSelections !== undefined && selected.length >= maxSelections;

  const filteredOptions = useMemo(() => {
    if (!query.trim()) {
      return options.filter((opt) => !selected.includes(opt)).slice(0, 8);
    }
    const q = query.toLowerCase();
    return options.filter((opt) => opt.toLowerCase().includes(q) && !selected.includes(opt)).slice(0, 8);
  }, [options, query, selected]);

  const exactMatchExists = options.some((opt) => opt.toLowerCase() === query.trim().toLowerCase());
  const alreadySelected = selected.some((s) => s.toLowerCase() === query.trim().toLowerCase());

  const addValue = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed || atLimit) return;
    if (selected.some((s) => s.toLowerCase() === trimmed.toLowerCase())) return;
    onChange([...selected, trimmed]);
    setQuery("");
  };

  const removeValue = (value: string) => {
    onChange(selected.filter((s) => s !== value));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (filteredOptions.length > 0) {
        addValue(filteredOptions[0]);
      } else if (allowCustom && query.trim() && !alreadySelected) {
        addValue(query);
      }
    } else if (e.key === "Backspace" && !query && selected.length > 0) {
      removeValue(selected[selected.length - 1]);
    }
  };

  const suggestionsToShow = (suggested ?? []).filter((s) => !selected.includes(s)).slice(0, 6);

  return (
    <div ref={containerRef} className="relative">
      {selected.length > 0 && (
        <div className="mb-2.5 flex flex-wrap gap-2">
          {selected.map((value) => (
            <span
              key={value}
              className="inline-flex items-center gap-1.5 rounded-full gradient-brand py-1 pl-3 pr-1.5 text-xs font-semibold text-white"
            >
              {value}
              <button
                type="button"
                onClick={() => removeValue(value)}
                aria-label={`Remove ${value}`}
                className="flex h-4 w-4 items-center justify-center rounded-full transition hover:bg-white/25"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          disabled={atLimit}
          placeholder={atLimit ? "Maximum reached" : placeholder}
          className="h-12 w-full rounded-2xl border border-input bg-surface/80 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground/70 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/50 disabled:opacity-50"
        />
      </div>

      <AnimatePresence>
        {isOpen && !atLimit && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute z-20 mt-2 w-full overflow-hidden rounded-3xl border border-border bg-popover p-2 shadow-2xl shadow-black/10"
          >
            {!query && suggestionsToShow.length > 0 && (
              <div className="mb-2 px-2 pt-1">
                <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                  <Sparkles className="h-3 w-3" />
                  {suggestedLabel}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {suggestionsToShow.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => addValue(s)}
                      className="rounded-full border border-primary/25 px-2.5 py-1 text-xs font-semibold text-primary transition hover:bg-primary/5"
                    >
                      + {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="max-h-56 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => addValue(opt)}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-medium text-foreground transition hover:bg-accent"
                  >
                    {opt}
                    <Plus className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                ))
              ) : query && !exactMatchExists ? (
                allowCustom ? (
                  <button
                    type="button"
                    onClick={() => addValue(query)}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-primary transition hover:bg-accent"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add "{query}"
                  </button>
                ) : (
                  <p className="px-3 py-2.5 text-sm text-muted-foreground">No matches found.</p>
                )
              ) : (
                <p className="px-3 py-2.5 text-sm text-muted-foreground">
                  {query ? "Already added." : "Start typing to search."}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
