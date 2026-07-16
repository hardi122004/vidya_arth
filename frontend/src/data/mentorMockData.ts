import {
  Bot,
  Camera,
  Megaphone,
  Music,
  PenTool,
  Rocket,
  Sparkles,
  Trophy,
  type LucideIcon,
} from "lucide-react";

export interface MentorImpactStat {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
}

export const MENTOR_IMPACT_STATS: MentorImpactStat[] = [
  { label: "Learners Guided", value: "2,340", change: "+18%", icon: Sparkles },
  { label: "Active Mentorship Programs", value: "12", change: "+4%", icon: Rocket },
  { label: "Sessions Conducted", value: "48", change: "+9%", icon: Trophy },
  { label: "Mentor Rating", value: "4.9", change: "+0.2", icon: Sparkles },
];

export interface EmergingDomain {
  name: string;
  icon: LucideIcon;
  growth: string;
  demand: "Very High" | "High" | "Growing" | "Moderate";
}

export const EMERGING_DOMAINS: EmergingDomain[] = [
  { name: "Artificial Intelligence", icon: Bot, growth: "+42%", demand: "Very High" },
  { name: "Entrepreneurship", icon: Rocket, growth: "+27%", demand: "High" },
  { name: "Sports Analytics", icon: Trophy, growth: "+22%", demand: "Growing" },
  { name: "Product Design", icon: PenTool, growth: "+19%", demand: "High" },
  { name: "Music Production", icon: Music, growth: "+16%", demand: "Moderate" },
  { name: "Content Creation", icon: Megaphone, growth: "+31%", demand: "High" },
  { name: "Photography", icon: Camera, growth: "+12%", demand: "Moderate" },
  { name: "Robotics", icon: Bot, growth: "+24%", demand: "Very High" },
];

export interface MentorSession {
  title: string;
  registered: number;
  datetime: string;
  type: "Workshop" | "AMA" | "Discussion";
}

export const MENTOR_SESSIONS: MentorSession[] = [
  { title: "Building AI Products", registered: 86, datetime: "Today, 6:00 PM", type: "Workshop" },
  { title: "Sports Data Analytics", registered: 42, datetime: "Tomorrow, 11:00 AM", type: "Discussion" },
  { title: "Startup Fundamentals", registered: 64, datetime: "Fri, 4:30 PM", type: "AMA" },
  { title: "Creative Storytelling", registered: 38, datetime: "Sat, 10:00 AM", type: "Workshop" },
];

export interface LearnerRequest {
  name: string;
  request: string;
  progress: "Beginner" | "Intermediate" | "Advanced";
}

export const LEARNER_REQUESTS: LearnerRequest[] = [
  { name: "Ananya Rao", request: "AI Career Guidance", progress: "Intermediate" },
  { name: "Karan Mehta", request: "Portfolio Review", progress: "Advanced" },
  { name: "Priya Nair", request: "Startup Mentorship", progress: "Beginner" },
  { name: "Rahul Verma", request: "Creative Feedback", progress: "Intermediate" },
];

export const COMMUNITY_INSIGHTS = {
  weeklyEngagement: [
    { day: "Mon", value: 62 },
    { day: "Tue", value: 78 },
    { day: "Wed", value: 54 },
    { day: "Thu", value: 91 },
    { day: "Fri", value: 70 },
    { day: "Sat", value: 88 },
    { day: "Sun", value: 45 },
  ],
  questionsAsked: 214,
  discussionsStarted: 37,
  communityGrowth: "+12%",
  responseRate: "96%",
};

export const MENTOR_STREAK = {
  currentStreakDays: 15,
  xpEarned: 8420,
  weeklyActivity: [true, true, true, true, false, true, true],
  milestones: ["500+ Hours Guided", "Top Mentor Badge", "50 Sessions Hosted"],
};

export interface MentoringProgram {
  name: string;
  learnerProgress: number;
  completionRate: number;
}

export const CONTINUE_MENTORING: MentoringProgram[] = [
  { name: "AI Career Accelerator", learnerProgress: 72, completionRate: 64 },
  { name: "Startup Incubator", learnerProgress: 55, completionRate: 48 },
  { name: "Sports Analytics Lab", learnerProgress: 38, completionRate: 30 },
  { name: "Creator Bootcamp", learnerProgress: 81, completionRate: 75 },
];
