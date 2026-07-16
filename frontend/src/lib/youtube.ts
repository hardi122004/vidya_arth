export interface YoutubeVideoResult {
  id: string;
  title: string;
  channelTitle: string;
  thumbnailUrl: string;
  videoUrl: string;
}

/**
 * Fetches real YouTube search results via the YouTube Data API v3 when
 * VITE_YOUTUBE_API_KEY is configured. Returns null (rather than fabricated
 * placeholder videos) when no key is set or the request fails, so the UI can
 * fall back to an honest "search on YouTube" link instead of fake results.
 */
export async function fetchYoutubeVideos(query: string, maxResults = 6): Promise<YoutubeVideoResult[] | null> {
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
  if (!apiKey) return null;

  try {
    const url = new URL("https://www.googleapis.com/youtube/v3/search");
    url.searchParams.set("part", "snippet");
    url.searchParams.set("type", "video");
    url.searchParams.set("maxResults", String(maxResults));
    url.searchParams.set("q", query);
    url.searchParams.set("key", apiKey);

    const res = await fetch(url.toString());
    if (!res.ok) return null;

    const data = await res.json();
    interface RawItem {
      id: { videoId: string };
      snippet: {
        title: string;
        channelTitle: string;
        thumbnails: { medium?: { url: string }; default?: { url: string } };
      };
    }

    return ((data.items ?? []) as RawItem[])
      .filter((item) => item.id?.videoId)
      .map((item) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        channelTitle: item.snippet.channelTitle,
        thumbnailUrl: item.snippet.thumbnails.medium?.url ?? item.snippet.thumbnails.default?.url ?? "",
        videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      }));
  } catch {
    return null;
  }
}

export function getYoutubeSearchUrl(query: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}
