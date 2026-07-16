import type { EvaluationResult, Submission } from "@/lib/aiEvaluator";

export interface AssessmentAttempt {
  skillId: string;
  challengeTitle: string;
  challengeDescription: string;
  submission: Submission;
  evaluation: EvaluationResult;
  attemptNumber: number;
  submittedAt: string;
}

const STORAGE_KEY = "techtrek-assessment-attempts";

function readAttempts(): AssessmentAttempt[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AssessmentAttempt[]) : [];
  } catch {
    return [];
  }
}

function writeAttempts(entries: AssessmentAttempt[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function getAttemptsForSkill(skillId: string): AssessmentAttempt[] {
  return readAttempts()
    .filter((a) => a.skillId === skillId)
    .sort((a, b) => a.attemptNumber - b.attemptNumber);
}

export function getLatestAttempt(skillId: string): AssessmentAttempt | undefined {
  const attempts = getAttemptsForSkill(skillId);
  return attempts[attempts.length - 1];
}

export function saveAttempt(attempt: Omit<AssessmentAttempt, "attemptNumber" | "submittedAt">): AssessmentAttempt {
  const entries = readAttempts();
  const priorAttempts = entries.filter((a) => a.skillId === attempt.skillId).length;
  const full: AssessmentAttempt = {
    ...attempt,
    attemptNumber: priorAttempts + 1,
    submittedAt: new Date().toISOString(),
  };
  entries.push(full);
  writeAttempts(entries);
  return full;
}
