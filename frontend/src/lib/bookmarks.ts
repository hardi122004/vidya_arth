const STORAGE_KEY = "techtrek-bookmarked-skills";

function readBookmarks(): Set<string> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

function writeBookmarks(ids: Set<string>) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
}

export function getBookmarkedSkillIds(): string[] {
  return [...readBookmarks()];
}

export function isSkillBookmarked(skillId: string): boolean {
  return readBookmarks().has(skillId);
}

export function toggleSkillBookmark(skillId: string): boolean {
  const bookmarks = readBookmarks();
  let nowBookmarked: boolean;
  if (bookmarks.has(skillId)) {
    bookmarks.delete(skillId);
    nowBookmarked = false;
  } else {
    bookmarks.add(skillId);
    nowBookmarked = true;
  }
  writeBookmarks(bookmarks);
  return nowBookmarked;
}
