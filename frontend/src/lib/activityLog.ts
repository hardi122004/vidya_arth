const STORAGE_KEY = "techtrek-activity-log";

function readLog(): Set<string> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

function writeLog(log: Set<string>) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...log]));
}

function todayKey(): string {
  return new Date().toISOString().split("T")[0];
}

export function recordTodayVisit(): void {
  const log = readLog();
  const today = todayKey();
  if (!log.has(today)) {
    log.add(today);
    writeLog(log);
  }
}

export function getVisitedDates(): Set<string> {
  return readLog();
}
