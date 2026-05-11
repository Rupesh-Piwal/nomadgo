import { ImageAssetData } from "./types";

export async function fetchUnsplashImage(
  query: string,
  orientation: "landscape" | "portrait" | "squarish" = "landscape"
): Promise<ImageAssetData | null> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) return null;

  try {
    const url = new URL("https://api.unsplash.com/search/photos");
    url.searchParams.append("query", query);
    url.searchParams.append("orientation", orientation);
    url.searchParams.append("per_page", "5");
    url.searchParams.append("order_by", "relevant");

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    });

    if (!response.ok) return null;

    const data = await response.json();
    const results = data.results || [];
    if (results.length === 0) return null;

    // Pick a random one from top results for variety
    const photo = results[Math.floor(Math.random() * Math.min(results.length, 3))];

    return {
      url: photo.urls.regular,
      source: "unsplash",
      originalUrl: photo.links.html,
      author: photo.user.name,
      attribution: `Photo by ${photo.user.name} on Unsplash`,
      license: "Unsplash License",
      width: photo.width,
      height: photo.height,
    };
  } catch (error) {
    console.error("Unsplash API error:", error);
    return null;
  }
}
