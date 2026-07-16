const STORAGE_KEY = "techtrek-certifications";

export interface Certification {
  id: string;
  skillId: string;
  skillName: string;
  projectTitle: string;
  score: number;
  completedAt: string;
}

function readCertifications(): Certification[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Certification[]) : [];
  } catch {
    return [];
  }
}

function writeCertifications(entries: Certification[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function getCertifications(): Certification[] {
  return readCertifications();
}

export function isSkillCertified(skillId: string): boolean {
  return readCertifications().some((c) => c.skillId === skillId);
}

export function getCertificationForSkill(skillId: string): Certification | undefined {
  return readCertifications().find((c) => c.skillId === skillId);
}

export function addCertification(entry: Omit<Certification, "id">): Certification {
  const entries = readCertifications();
  const existingIndex = entries.findIndex((c) => c.skillId === entry.skillId);
  const certification: Certification = { ...entry, id: crypto.randomUUID() };
  if (existingIndex >= 0) {
    entries[existingIndex] = certification;
  } else {
    entries.push(certification);
  }
  writeCertifications(entries);
  return certification;
}
