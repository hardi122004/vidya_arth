import type { Skill } from "@/data/skillsData";

export interface IndustryChallenge {
  title: string;
  description: string;
}

const CHALLENGE_TEMPLATES: ((skill: Skill) => IndustryChallenge)[] = [
  (skill) => ({
    title: `30-Day ${skill.name} Plan for a Local Business`,
    description: `A local small business wants to grow using ${skill.name}, but has never done it before and has a limited budget. Create a complete, actionable 30-day plan they could realistically execute — including goals, weekly milestones, and how you'd measure success.`,
  }),
  (skill) => ({
    title: `${skill.name} Project for a Budget-Constrained Startup`,
    description: `A very early-stage startup needs a real ${skill.name} deliverable but can't afford an agency or consultant. Design and produce a complete, practical solution they could use immediately, explaining every decision you made and why.`,
  }),
  (skill) => ({
    title: `Improve an Existing ${skill.name} Effort`,
    description: `Find (or imagine) an existing example of ${skill.name} that's underperforming. Diagnose what's not working, propose specific improvements, and produce an improved version or a clear implementation plan — with reasoning for each change.`,
  }),
];

function pickTemplateIndex(skillId: string): number {
  let hash = 0;
  for (let i = 0; i < skillId.length; i++) {
    hash = (hash * 31 + skillId.charCodeAt(i)) % CHALLENGE_TEMPLATES.length;
  }
  return hash;
}

export function generateIndustryChallenge(skill: Skill): IndustryChallenge {
  return CHALLENGE_TEMPLATES[pickTemplateIndex(skill.id)](skill);
}

export function getAllChallengeOptions(skill: Skill): IndustryChallenge[] {
  return CHALLENGE_TEMPLATES.map((template) => template(skill));
}
