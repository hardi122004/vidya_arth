export function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-brand-blue-400/30 blur-[120px] animate-float dark:bg-brand-blue-500/20" />
      <div className="absolute top-1/3 -right-40 h-[36rem] w-[36rem] rounded-full bg-brand-purple-400/30 blur-[130px] animate-float-delayed dark:bg-brand-purple-500/20" />
      <div className="absolute bottom-0 left-1/4 h-[28rem] w-[28rem] rounded-full bg-brand-blue-300/20 blur-[110px] animate-glow dark:bg-brand-purple-400/10" />

      <svg
        className="absolute inset-0 h-full w-full opacity-[0.35] dark:opacity-[0.15]"
        aria-hidden="true"
      >
        <defs>
          <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-brand-blue-500/40 dark:text-brand-blue-300/20"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div className="noise-overlay absolute inset-0" />
    </div>
  );
}
