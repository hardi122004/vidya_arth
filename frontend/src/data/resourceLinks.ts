// Resource links are built as real, honest search queries against real
// platforms rather than fabricated article/book titles — this keeps the
// prototype's "Learning Resources" section functional without inventing
// sources that don't actually exist.

export function getBlogSearchUrl(skillName: string): string {
  return `https://www.google.com/search?q=${encodeURIComponent(`${skillName} blog`)}`;
}

export function getBookSearchUrl(skillName: string): string {
  return `https://www.goodreads.com/search?q=${encodeURIComponent(skillName)}`;
}

export function getResearchPaperSearchUrl(skillName: string): string {
  return `https://scholar.google.com/scholar?q=${encodeURIComponent(skillName)}`;
}

export function getArticleSearchUrl(skillName: string): string {
  return `https://www.google.com/search?q=${encodeURIComponent(`${skillName} articles`)}&tbm=nws`;
}

export interface FreeCoursePlatform {
  name: string;
  getUrl: (skillName: string) => string;
}

export const FREE_COURSE_PLATFORMS: FreeCoursePlatform[] = [
  {
    name: "freeCodeCamp",
    getUrl: (skillName) => `https://www.freecodecamp.org/news/search/?query=${encodeURIComponent(skillName)}`,
  },
  {
    name: "Harvard OpenCourseWare",
    getUrl: (skillName) => `https://pll.harvard.edu/catalog?keywords=${encodeURIComponent(skillName)}`,
  },
  {
    name: "MIT OpenCourseWare",
    getUrl: (skillName) => `https://ocw.mit.edu/search/?q=${encodeURIComponent(skillName)}`,
  },
  {
    name: "Khan Academy",
    getUrl: (skillName) => `https://www.khanacademy.org/search?search_again=1&page_search_query=${encodeURIComponent(skillName)}`,
  },
  {
    name: "Google Learning Resources",
    getUrl: () => "https://learndigital.withgoogle.com/",
  },
];
