import { Briefcase, Camera, FolderGit2, Globe, Share2, Video, type LucideIcon } from "lucide-react";
import { SectionCard } from "@/components/profile/SectionCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SOCIAL_PLATFORMS } from "@/data/taxonomy";

const PLATFORM_ICONS: Record<string, LucideIcon> = {
  linkedin: Briefcase,
  github: FolderGit2,
  instagram: Camera,
  youtube: Video,
  portfolio: Globe,
};

interface SocialLinksSectionProps {
  links: Record<string, string>;
  onChange: (next: Record<string, string>) => void;
}

export function SocialLinksSection({ links, onChange }: SocialLinksSectionProps) {
  const updateLink = (key: string, value: string) => {
    onChange({ ...links, [key]: value });
  };

  return (
    <SectionCard
      icon={Share2}
      title="Social Links"
      description="Connect your presence across the web."
      badge="Optional"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {SOCIAL_PLATFORMS.map((platform) => {
          const Icon = PLATFORM_ICONS[platform.key] ?? Globe;
          return (
            <div key={platform.key}>
              <Label htmlFor={`social-${platform.key}`}>{platform.label}</Label>
              <Input
                id={`social-${platform.key}`}
                icon={<Icon className="h-4 w-4" />}
                value={links[platform.key] ?? ""}
                onChange={(e) => updateLink(platform.key, e.target.value)}
                placeholder={platform.placeholder}
              />
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}
