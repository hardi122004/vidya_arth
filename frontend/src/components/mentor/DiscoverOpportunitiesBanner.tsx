import { motion } from "framer-motion";
import { ArrowRight, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DiscoverOpportunitiesBanner() {
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
          <Rocket className="h-7 w-7" />
        </div>

        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Expand your impact</h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-white/85 sm:text-base">
          Discover new communities, emerging domains, and ambitious learners looking for guidance.
        </p>

        <Button
          size="lg"
          variant="secondary"
          className="group mt-8 border-0 bg-white px-8 text-primary hover:bg-white/90"
        >
          Explore Opportunities
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </motion.section>
  );
}
