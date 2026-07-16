export type SubmissionType =
  | "pdf"
  | "word"
  | "ppt"
  | "image"
  | "video"
  | "audio"
  | "zip"
  | "github"
  | "drive"
  | "website"
  | "youtube"
  | "figma"
  | "url";

export interface Submission {
  type: SubmissionType;
  fileName?: string;
  url?: string;
  notes: string;
}

export interface CriterionScore {
  label: string;
  score: number;
}

export interface EvaluationResult {
  overallScore: number;
  criteria: CriterionScore[];
  strengths: string[];
  improvements: string[];
  aiFeedback: string;
  certified: boolean;
}

const CRITERIA_LABELS = [
  "Problem Understanding",
  "Technical Knowledge",
  "Creativity",
  "Implementation",
  "Presentation",
  "Practical Impact",
];

const CERTIFICATION_THRESHOLD = 70;

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) % 1000000;
  }
  return hash;
}

/**
 * Simulates a rubric-based AI Domain Expert evaluation. This is a
 * deterministic-but-content-aware prototype stand-in — it is not a real LLM
 * call (no evaluation API is wired into this app). It scores based on how
 * complete the submission actually is, so effort is meaningfully rewarded,
 * but the specific numbers and phrasing are templated, not model-generated.
 */
export function evaluateSubmission(
  skillName: string,
  challengeTitle: string,
  submission: Submission,
): EvaluationResult {
  const seed = hashString(`${skillName}|${challengeTitle}|${submission.notes}|${submission.url ?? submission.fileName ?? ""}`);

  const notesLength = submission.notes.trim().length;
  const hasArtifact = Boolean(submission.url?.trim() || submission.fileName?.trim());

  // Base quality signal: how much real substance was provided.
  let baseScore = 58;
  if (notesLength > 40) baseScore += 8;
  if (notesLength > 150) baseScore += 8;
  if (notesLength > 400) baseScore += 6;
  if (hasArtifact) baseScore += 12;

  const variance = Math.floor(seededRandom(seed) * 14) - 4; // -4..+9
  const overallScore = Math.min(98, Math.max(35, baseScore + variance));

  const criteria: CriterionScore[] = CRITERIA_LABELS.map((label, idx) => {
    const drift = Math.floor(seededRandom(seed + idx * 7.13) * 16) - 8;
    return { label, score: Math.min(100, Math.max(20, overallScore + drift)) };
  });

  const sorted = [...criteria].sort((a, b) => b.score - a.score);
  const topCriteria = sorted.slice(0, 2);
  const weakCriteria = sorted.slice(-2);

  const strengths = topCriteria.map((c) => strengthText(c.label, skillName));
  const improvements = weakCriteria.map((c) => improvementText(c.label, skillName));

  const certified = overallScore >= CERTIFICATION_THRESHOLD;

  const aiFeedback = buildFeedback({
    skillName,
    overallScore,
    certified,
    topCriteria,
    weakCriteria,
  });

  return { overallScore, criteria, strengths, improvements, aiFeedback, certified };
}

function strengthText(criterion: string, skillName: string): string {
  const map: Record<string, string> = {
    "Problem Understanding": `You clearly grasped what the ${skillName} challenge actually required before jumping into a solution.`,
    "Technical Knowledge": `Your submission shows a solid working knowledge of core ${skillName} techniques.`,
    Creativity: `You brought a genuinely original angle to this ${skillName} problem instead of the obvious approach.`,
    Implementation: `The execution is practical and could realistically be put to use, not just theoretical.`,
    Presentation: `Your submission was clear and easy to follow — that matters as much as the work itself.`,
    "Practical Impact": `This solution addresses a real constraint (time, budget, or resources) rather than an idealized scenario.`,
  };
  return map[criterion] ?? `Strong performance in ${criterion}.`;
}

function improvementText(criterion: string, skillName: string): string {
  const map: Record<string, string> = {
    "Problem Understanding": `Spend more time up front restating the problem in your own words — it sharpens everything that follows.`,
    "Technical Knowledge": `Deepen your grasp of core ${skillName} fundamentals; a few technique choices could be stronger.`,
    Creativity: `Push past the first idea that comes to mind — try sketching two or three directions before committing.`,
    Implementation: `Take the solution further toward something genuinely usable rather than a rough draft.`,
    Presentation: `Structure your submission more clearly so a reviewer can follow your reasoning at a glance.`,
    "Practical Impact": `Ground the solution more explicitly in real-world constraints like budget, time, or audience.`,
  };
  return map[criterion] ?? `There's room to grow in ${criterion}.`;
}

function buildFeedback({
  skillName,
  overallScore,
  certified,
  topCriteria,
  weakCriteria,
}: {
  skillName: string;
  overallScore: number;
  certified: boolean;
  topCriteria: CriterionScore[];
  weakCriteria: CriterionScore[];
}): string {
  const topLabel = topCriteria[0]?.label ?? "your approach";
  const weakLabel = weakCriteria[0]?.label ?? "a few areas";

  if (certified) {
    return `Nice work — this submission demonstrates real, usable competency in ${skillName}. ${topLabel} stood out as your strongest area. To keep growing, focus next on ${weakLabel.toLowerCase()}: it's the biggest lever for taking your next project from good to excellent. Consider revisiting the Learning Resources for ${skillName} to go deeper, and look for a slightly harder real-world problem to tackle next.`;
  }

  return `You're not far off — a score of ${overallScore}/100 means the fundamentals are there, but this submission isn't quite ready to certify yet. Your strongest area was ${topLabel.toLowerCase()}, which is a good foundation. The clearest opportunity is ${weakLabel.toLowerCase()} — revisit the Learning Resources and AI Domain Expert chat for ${skillName}, strengthen that part of your solution, and resubmit. There's no penalty for another attempt.`;
}
