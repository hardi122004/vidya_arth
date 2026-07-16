import { motion } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EXPLORE_DOMAINS_TAGS } from "@/data/dashboardMockData";

export function ExploreDomainsBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="gradient-animated relative overflow-hidden rounded-3xl p-8 text-center text-white sm:p-12"
    >
      <div className="pointer-events-none absolute inset-0 noise-overlay opacity-20" />

      <div className="relative flex flex-col items-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
          <Compass className="h-7 w-7" />
        </div>

        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Not sure what to learn?</h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-white/85 sm:text-base">
          Explore every domain and discover new skills based on your interests.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {EXPLORE_DOMAINS_TAGS.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold backdrop-blur"
            >
              {tag}
            </span>
          ))}
        </div>

        <Button
          size="lg"
          variant="secondary"
          className="group mt-8 border-0 bg-white px-8 text-primary hover:bg-white/90"
        >
          Explore All Domains
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </motion.section>
  );
}
