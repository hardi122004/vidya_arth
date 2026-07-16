export type SessionDifficulty = "Beginner" | "Intermediate" | "Advanced";
export type DeliveryType = "live" | "ai-avatar";
export type MeetingPlatform = "Google Meet" | "Zoom" | "Microsoft Teams" | "Other";

export interface MentorSession {
  id: string;
  mentorName: string;
  mentorExperience: string;
  domain: string;
  skill: string;
  title: string;
  description: string;
  language: string;
  difficulty: SessionDifficulty;
  date: string;
  time: string;
  duration: string;
  maxParticipants: number;
  deliveryType: DeliveryType;
  meetingPlatform?: MeetingPlatform;
  meetingUrl?: string;
  publishedAt: string;
}

const STORAGE_KEY = "techtrek-mentor-sessions";

function readSessions(): MentorSession[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as MentorSession[]) : [];
  } catch {
    return [];
  }
}

function writeSessions(entries: MentorSession[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function getPublishedSessions(): MentorSession[] {
  return readSessions().sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getSessionById(id: string): MentorSession | undefined {
  return readSessions().find((s) => s.id === id);
}

export function publishSession(session: Omit<MentorSession, "id" | "publishedAt">): MentorSession {
  const entries = readSessions();
  const full: MentorSession = {
    ...session,
    id: crypto.randomUUID(),
    publishedAt: new Date().toISOString(),
  };
  entries.push(full);
  writeSessions(entries);
  return full;
}
