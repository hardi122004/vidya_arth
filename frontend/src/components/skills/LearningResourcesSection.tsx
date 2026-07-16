import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  ExternalLink,
  FileText,
  GraduationCap,
  Newspaper,
  PlayCircle,
  Rss,
} from "lucide-react";
import {
  FREE_COURSE_PLATFORMS,
  getArticleSearchUrl,
  getBlogSearchUrl,
  getBookSearchUrl,
  getResearchPaperSearchUrl,
} from "@/data/resourceLinks";
import { fetchYoutubeVideos, getYoutubeSearchUrl, type YoutubeVideoResult } from "@/lib/youtube";

function ResourceLinkCard({
  icon: Icon,
  title,
  subtitle,
  href,
}: {
  icon: typeof BookOpen;
  title: string;
  subtitle: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="glass group flex items-center gap-3 rounded-2xl p-4 transition hover:-translate-y-0.5"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">{title}</p>
        <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
      </div>
      <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:text-primary" />
    </a>
  );
}

function ResourceGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-bold text-foreground">{title}</h3>
      <div className="grid gap-3 sm:grid-cols-2">{children}</div>
    </div>
  );
}

export function LearningResourcesSection({ skillName }: { skillName: string }) {
  const [videos, setVideos] = useState<YoutubeVideoResult[] | null>(null);
  const [videosLoading, setVideosLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setVideosLoading(true);
    fetchYoutubeVideos(`${skillName} tutorial`).then((result) => {
      if (!cancelled) {
        setVideos(result);
        setVideosLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [skillName]);

  return (
    <div className="flex flex-col gap-7">
      <ResourceGroup title="Blogs">
        <ResourceLinkCard
          icon={Rss}
          title={`${skillName} blogs`}
          subtitle="Search for community write-ups and tutorials"
          href={getBlogSearchUrl(skillName)}
        />
      </ResourceGroup>

      <ResourceGroup title="Books">
        <ResourceLinkCard
          icon={BookOpen}
          title={`Books on ${skillName}`}
          subtitle="Browse beginner and advanced picks on Goodreads"
          href={getBookSearchUrl(skillName)}
        />
      </ResourceGroup>

      <ResourceGroup title="Research Papers">
        <ResourceLinkCard
          icon={FileText}
          title={`${skillName} research`}
          subtitle="Explore academic papers on Google Scholar"
          href={getResearchPaperSearchUrl(skillName)}
        />
      </ResourceGroup>

      <ResourceGroup title="Articles">
        <ResourceLinkCard
          icon={Newspaper}
          title={`${skillName} articles`}
          subtitle="Recent write-ups and explainers"
          href={getArticleSearchUrl(skillName)}
        />
      </ResourceGroup>

      <ResourceGroup title="Free Courses">
        {FREE_COURSE_PLATFORMS.map((platform) => (
          <ResourceLinkCard
            key={platform.name}
            icon={GraduationCap}
            title={platform.name}
            subtitle={`Explore ${skillName} content`}
            href={platform.getUrl(skillName)}
          />
        ))}
      </ResourceGroup>

      <div>
        <h3 className="mb-3 text-sm font-bold text-foreground">YouTube Videos</h3>
        {videosLoading ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="glass h-48 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : videos && videos.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video, idx) => (
              <motion.a
                key={video.id}
                href={video.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="glass-card group overflow-hidden p-0"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                  {video.thumbnailUrl && (
                    <img src={video.thumbnailUrl} alt={video.title} className="h-full w-full object-cover" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition group-hover:opacity-100">
                    <PlayCircle className="h-10 w-10 text-white" />
                  </div>
                </div>
                <div className="p-4">
                  <p className="line-clamp-2 text-sm font-semibold text-foreground">{video.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{video.channelTitle}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                    Watch on YouTube
                    <ExternalLink className="h-3 w-3" />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        ) : (
          <ResourceLinkCard
            icon={PlayCircle}
            title={`Search "${skillName} tutorial" on YouTube`}
            subtitle="Live video results require a YouTube API key to be configured"
            href={getYoutubeSearchUrl(`${skillName} tutorial`)}
          />
        )}
      </div>
    </div>
  );
}
