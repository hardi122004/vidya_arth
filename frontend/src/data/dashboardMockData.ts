import {
  Bot,
  Camera,
  Clapperboard,
  Compass,
  Database,
  HeartPulse,
  Megaphone,
  MessageSquareText,
  Music,
  Music2,
  PenTool,
  Plane,
  Rocket,
  Sparkles,
  Trophy,
  type LucideIcon,
} from "lucide-react";

export interface TrendingSkill {
  name: string;
  icon: LucideIcon;
  growth: string;
  learners: string;
}

export const TRENDING_SKILLS: TrendingSkill[] = [
  { name: "Artificial Intelligence", icon: Sparkles, growth: "+18%", learners: "12.4K" },
  { name: "Prompt Engineering", icon: MessageSquareText, growth: "+34%", learners: "9.8K" },
  { name: "Music Production", icon: Music, growth: "+12%", learners: "6.2K" },
  { name: "Photography", icon: Camera, growth: "+9%", learners: "5.1K" },
  { name: "Sports Analytics", icon: Trophy, growth: "+22%", learners: "3.4K" },
  { name: "Entrepreneurship", icon: Rocket, growth: "+15%", learners: "8.7K" },
  { name: "Video Editing", icon: Clapperboard, growth: "+11%", learners: "7.3K" },
  { name: "Content Creation", icon: Megaphone, growth: "+27%", learners: "10.1K" },
];

export interface EmergingCareer {
  name: string;
  icon: LucideIcon;
  growth: string;
  demand: "Very High" | "High" | "Growing" | "Moderate";
}

export const EMERGING_CAREERS: EmergingCareer[] = [
  { name: "AI Engineer", icon: Bot, growth: "+42%", demand: "Very High" },
  { name: "Sports Scientist", icon: HeartPulse, growth: "+21%", demand: "High" },
  { name: "Product Designer", icon: PenTool, growth: "+19%", demand: "High" },
  { name: "Travel Creator", icon: Plane, growth: "+31%", demand: "Growing" },
  { name: "Robotics Engineer", icon: Bot, growth: "+27%", demand: "Very High" },
  { name: "Music Producer", icon: Music2, growth: "+16%", demand: "Moderate" },
  { name: "Data Scientist", icon: Database, growth: "+24%", demand: "Very High" },
];

export interface UpcomingSession {
  title: string;
  mentor: string;
  datetime: string;
  type: "Live" | "Workshop";
}

export const UPCOMING_SESSIONS: UpcomingSession[] = [
  { title: "Mastering Prompt Engineering", mentor: "Ananya Rao", datetime: "Today, 6:00 PM", type: "Live" },
  { title: "Intro to Robotics", mentor: "Karan Mehta", datetime: "Tomorrow, 11:00 AM", type: "Workshop" },
  { title: "Building Your AI Portfolio", mentor: "Priya Nair", datetime: "Fri, 4:30 PM", type: "Live" },
  { title: "Sports Analytics 101", mentor: "Rahul Verma", datetime: "Sat, 10:00 AM", type: "Workshop" },
];

export interface ContinueLearningItem {
  name: string;
  category: string;
  progress: number;
}

export const CONTINUE_LEARNING: ContinueLearningItem[] = [
  { name: "Generative AI Fundamentals", category: "Artificial Intelligence", progress: 68 },
  { name: "UI/UX Design Basics", category: "Product Design", progress: 42 },
  { name: "Python for Data Science", category: "Data Science", progress: 85 },
];

export const TODAY_TASKS = [
  { label: "Finish Prompt Engineering Module 3", done: true },
  { label: "Watch: Intro to Neural Networks", done: true },
  { label: "Practice quiz — Data Structures", done: false },
  { label: "Submit portfolio draft", done: false },
];

export const UPCOMING_GOALS = [
  { label: "Complete AI Fundamentals path", due: "in 5 days" },
  { label: "Finish 2 mock interviews", due: "in 1 week" },
];

export const WEEKLY_SCHEDULE = [
  { day: "Mon", hours: 1.5 },
  { day: "Tue", hours: 2 },
  { day: "Wed", hours: 0.5 },
  { day: "Thu", hours: 2.5 },
  { day: "Fri", hours: 1 },
  { day: "Sat", hours: 3 },
  { day: "Sun", hours: 0 },
];

export const LEARNING_STREAK = {
  currentStreakDays: 12,
  dailyGoalMinutes: 30,
  xpEarned: 2450,
  weeklyActivity: [true, true, true, false, true, true, false],
};

export const EXPLORE_DOMAINS_TAGS = [
  "AI & Machine Learning",
  "Design",
  "Business",
  "Sports Science",
  "Media",
  "Robotics",
];
