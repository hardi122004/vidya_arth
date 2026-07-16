import { Compass, Heart, Sparkles } from "lucide-react";
import { SectionCard } from "@/components/profile/SectionCard";
import { MultiSelectSearch } from "@/components/profile/MultiSelectSearch";
import { ALL_SKILLS, INTEREST_TAGS, TRENDING_SKILL_TAGS } from "@/data/taxonomy";

interface SkillsSectionProps {
  value: string[];
  onChange: (next: string[]) => void;
}

export function SkillsHaveSection({ value, onChange }: SkillsSectionProps) {
  return (
    <SectionCard
      icon={Sparkles}
      title="Skills You Have"
      description="What can you already do? Totally optional, but it helps your AI tutor calibrate."
      badge="Optional"
    >
      <MultiSelectSearch
        options={ALL_SKILLS}
        selected={value}
        onChange={onChange}
        placeholder="Search skills — Python, Photography, Public Speaking..."
        suggested={TRENDING_SKILL_TAGS}
        suggestedLabel="Popular skills"
        allowCustom
      />
    </SectionCard>
  );
}

export function SkillsWantSection({ value, onChange }: SkillsSectionProps) {
  return (
    <SectionCard
      icon={Compass}
      title="Skills You Want to Learn"
      description="Where do you want to grow? Select as many as you like."
      badge="Required"
    >
      <MultiSelectSearch
        options={ALL_SKILLS}
        selected={value}
        onChange={onChange}
        placeholder="Search skills — AI, Piano, Digital Marketing..."
        suggested={TRENDING_SKILL_TAGS}
        suggestedLabel="Trending skills"
        allowCustom
      />
    </SectionCard>
  );
}

export function InterestsSection({ value, onChange }: SkillsSectionProps) {
  return (
    <SectionCard
      icon={Heart}
      title="Interests"
      description="What do you love learning or talking about?"
      badge="Required"
    >
      <MultiSelectSearch
        options={INTEREST_TAGS}
        selected={value}
        onChange={onChange}
        placeholder="Search interests — Space, Cricket, Startups..."
        suggested={INTEREST_TAGS.slice(0, 6)}
        suggestedLabel="Popular interests"
        allowCustom
      />
    </SectionCard>
  );
}
