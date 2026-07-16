export interface MentorCertificate {
  id: string;
  name: string;
  fileName: string;
}

export interface MentorRegistration {
  fullName: string;
  experienceRange: string;
  languages: string[];
  domains: string[];
  certificates: MentorCertificate[];
  achievements: string;
}

export interface DomainAuthorization {
  domain: string;
  score: number;
  authorized: boolean;
  attempts: number;
  lastAttemptAt: string;
}

const REGISTRATION_KEY = "techtrek-mentor-registration";
const AUTHORIZATIONS_KEY = "techtrek-mentor-authorizations";

const PASSING_SCORE = 65;

export function getMentorRegistration(): MentorRegistration | null {
  try {
    const raw = window.localStorage.getItem(REGISTRATION_KEY);
    return raw ? (JSON.parse(raw) as MentorRegistration) : null;
  } catch {
    return null;
  }
}

export function saveMentorRegistration(registration: MentorRegistration): void {
  window.localStorage.setItem(REGISTRATION_KEY, JSON.stringify(registration));
}

function readAuthorizations(): DomainAuthorization[] {
  try {
    const raw = window.localStorage.getItem(AUTHORIZATIONS_KEY);
    return raw ? (JSON.parse(raw) as DomainAuthorization[]) : [];
  } catch {
    return [];
  }
}

function writeAuthorizations(entries: DomainAuthorization[]) {
  window.localStorage.setItem(AUTHORIZATIONS_KEY, JSON.stringify(entries));
}

export function getDomainAuthorizations(): DomainAuthorization[] {
  return readAuthorizations();
}

export function getDomainAuthorization(domain: string): DomainAuthorization | undefined {
  return readAuthorizations().find((a) => a.domain === domain);
}

export function isDomainAuthorized(domain: string): boolean {
  return getDomainAuthorization(domain)?.authorized ?? false;
}

export function getAuthorizedDomains(): string[] {
  return readAuthorizations()
    .filter((a) => a.authorized)
    .map((a) => a.domain);
}

export function isAnyDomainAuthorized(): boolean {
  return getAuthorizedDomains().length > 0;
}

export function recordDomainAttempt(domain: string, score: number): DomainAuthorization {
  const entries = readAuthorizations();
  const existing = entries.find((a) => a.domain === domain);
  const authorized = score >= PASSING_SCORE || Boolean(existing?.authorized);

  if (existing) {
    existing.score = score;
    existing.authorized = authorized;
    existing.attempts += 1;
    existing.lastAttemptAt = new Date().toISOString();
    writeAuthorizations(entries);
    return existing;
  }

  const created: DomainAuthorization = {
    domain,
    score,
    authorized,
    attempts: 1,
    lastAttemptAt: new Date().toISOString(),
  };
  entries.push(created);
  writeAuthorizations(entries);
  return created;
}

export { PASSING_SCORE };
