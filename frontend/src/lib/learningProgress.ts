const STORAGE_KEY = "techtrek-enrolled-skills";

export interface EnrolledSkill {
  skillId: string;
  startedAt: string;
  progress: number;
  completedAt?: string;
}

function readEnrolled(): EnrolledSkill[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as EnrolledSkill[]) : [];
  } catch {
    return [];
  }
}

function writeEnrolled(entries: EnrolledSkill[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function getEnrolledSkills(): EnrolledSkill[] {
  return readEnrolled();
}

export function getEnrolledSkill(skillId: string): EnrolledSkill | undefined {
  return readEnrolled().find((e) => e.skillId === skillId);
}

export function isSkillStarted(skillId: string): boolean {
  return readEnrolled().some((e) => e.skillId === skillId);
}

export function isSkillLearningComplete(skillId: string): boolean {
  const entry = readEnrolled().find((e) => e.skillId === skillId);
  return entry ? entry.progress >= 100 : false;
}

export function startLearningSkill(skillId: string): void {
  const entries = readEnrolled();
  if (entries.some((e) => e.skillId === skillId)) return;
  entries.push({ skillId, startedAt: new Date().toISOString(), progress: 0 });
  writeEnrolled(entries);
}

export function markSkillLearningComplete(skillId: string): void {
  const entries = readEnrolled();
  const existing = entries.find((e) => e.skillId === skillId);
  if (existing) {
    existing.progress = 100;
    existing.completedAt = new Date().toISOString();
  } else {
    entries.push({
      skillId,
      startedAt: new Date().toISOString(),
      progress: 100,
      completedAt: new Date().toISOString(),
    });
  }
  writeEnrolled(entries);
}
