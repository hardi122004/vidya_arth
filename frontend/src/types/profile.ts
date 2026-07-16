export interface ProjectEntry {
  id: string;
  title: string;
  description: string;
  skillsUsed: string;
  githubUrl: string;
  demoUrl: string;
}

export interface AchievementEntry {
  id: string;
  title: string;
  category: string;
  description: string;
}

export interface CertificateEntry {
  id: string;
  name: string;
  fileName: string;
}

export interface ProfileFormState {
  // Personal Information (required)
  fullName: string;
  username: string;
  dateOfBirth: string;
  gender: string;
  country: string;
  state: string;
  city: string;
  preferredLanguage: string;
  currentRole: string;
  bio: string;

  // Educational Details (optional)
  hasEducation: boolean;
  institutionName: string;
  gradeOrYear: string;
  degree: string;
  branch: string;
  score: string;

  // Skills & interests
  skillsHave: string[];
  skillsWant: string[];
  interests: string[];

  // Future goals (required)
  futureGoals: string;

  // Optional extras
  certificates: CertificateEntry[];
  projects: ProjectEntry[];
  achievements: AchievementEntry[];
  socialLinks: Record<string, string>;
}

export function createInitialProfileState(overrides?: Partial<ProfileFormState>): ProfileFormState {
  return {
    fullName: "",
    username: "",
    dateOfBirth: "",
    gender: "",
    country: "",
    state: "",
    city: "",
    preferredLanguage: "",
    currentRole: "",
    bio: "",

    hasEducation: false,
    institutionName: "",
    gradeOrYear: "",
    degree: "",
    branch: "",
    score: "",

    skillsHave: [],
    skillsWant: [],
    interests: [],

    futureGoals: "",

    certificates: [],
    projects: [],
    achievements: [],
    socialLinks: {},

    ...overrides,
  };
}

interface CompletionCheck {
  label: string;
  done: boolean;
  weight: number;
}

export function getCompletionChecks(profile: ProfileFormState): CompletionCheck[] {
  return [
    { label: "Full name", done: profile.fullName.trim().length > 0, weight: 1 },
    { label: "Username", done: profile.username.trim().length > 0, weight: 1 },
    { label: "Date of birth", done: profile.dateOfBirth.trim().length > 0, weight: 1 },
    { label: "Location", done: profile.country.trim().length > 0, weight: 1 },
    { label: "Preferred language", done: profile.preferredLanguage.trim().length > 0, weight: 1 },
    { label: "Current role", done: profile.currentRole.trim().length > 0, weight: 1 },
    { label: "Short bio", done: profile.bio.trim().length > 0, weight: 1 },
    { label: "Educational details", done: profile.hasEducation && profile.institutionName.trim().length > 0, weight: 1 },
    { label: "Skills you have", done: profile.skillsHave.length > 0, weight: 2 },
    { label: "Skills you want to learn", done: profile.skillsWant.length > 0, weight: 2 },
    { label: "Interests", done: profile.interests.length > 0, weight: 1 },
    { label: "Future goals", done: profile.futureGoals.trim().length > 0, weight: 2 },
    { label: "Certificates", done: profile.certificates.length > 0, weight: 1 },
    { label: "Projects", done: profile.projects.length > 0, weight: 1 },
    { label: "Achievements", done: profile.achievements.length > 0, weight: 1 },
    { label: "Social links", done: Object.values(profile.socialLinks).some((v) => v.trim().length > 0), weight: 1 },
  ];
}

export function computeProfileCompletion(profile: ProfileFormState): number {
  const checks = getCompletionChecks(profile);
  const totalWeight = checks.reduce((sum, c) => sum + c.weight, 0);
  const doneWeight = checks.reduce((sum, c) => sum + (c.done ? c.weight : 0), 0);
  return Math.round((doneWeight / totalWeight) * 100);
}

export function isCoreProfileComplete(profile: ProfileFormState): boolean {
  return profile.skillsWant.length > 0 && profile.futureGoals.trim().length > 0;
}
