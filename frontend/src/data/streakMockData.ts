import { getVisitedDates } from "@/lib/activityLog";

export interface ContributionDay {
  date: string;
  level: 0 | 1 | 2 | 3 | 4;
}

/**
 * Builds the last `weeks` weeks of the contribution grid from real recorded
 * visits (see lib/activityLog.ts) — every cell starts empty and only lights
 * up for a day the learner actually opened the app.
 */
export function buildContributionGrid(weeks: number): ContributionDay[] {
  const visited = getVisitedDates();
  const days: ContributionDay[] = [];
  const today = new Date();
  const totalDays = weeks * 7;

  for (let i = totalDays - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateKey = date.toISOString().split("T")[0];
    days.push({ date: dateKey, level: visited.has(dateKey) ? 4 : 0 });
  }

  return days;
}

export function computeStreakStats(days: ContributionDay[]) {
  let current = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].level > 0) current++;
    else break;
  }

  let longest = 0;
  let running = 0;
  for (const day of days) {
    if (day.level > 0) {
      running++;
      longest = Math.max(longest, running);
    } else {
      running = 0;
    }
  }

  const totalActiveDays = days.filter((d) => d.level > 0).length;

  return { current, longest, totalActiveDays };
}
