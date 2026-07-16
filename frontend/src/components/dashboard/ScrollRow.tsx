import { useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScrollRowProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}

export function ScrollRow({ title, subtitle, action, children }: ScrollRowProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  const scrollBy = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section>
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-foreground sm:text-xl">{title}</h2>
          {subtitle && <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          {action}
          <div className="hidden items-center gap-1.5 sm:flex">
            <button
              type="button"
              aria-label="Scroll left"
              disabled={!canScrollLeft}
              onClick={() => scrollBy(-1)}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-foreground transition hover:bg-accent",
                !canScrollLeft && "opacity-30",
              )}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Scroll right"
              disabled={!canScrollRight}
              onClick={() => scrollBy(1)}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-foreground transition hover:bg-accent",
                !canScrollRight && "opacity-30",
              )}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollerRef}
        onScroll={updateScrollState}
        className="scrollbar-hide flex snap-x gap-4 overflow-x-auto pb-2"
      >
        {children}
      </div>
    </section>
  );
}
