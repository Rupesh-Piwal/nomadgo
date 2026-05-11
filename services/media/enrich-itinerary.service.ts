import { fetchWikimediaImage } from "./wikimedia.service";
import { fetchPexelsImage } from "./pexels.service";
import { fetchUnsplashImage } from "./unsplash.service";
import { ImageAssetData } from "./types";
import { uploadImageToR2, checkFileExists } from "./r2.service";
import crypto from "crypto";
import pLimit from "p-limit";

function cleanUrl(url: string): string {
  try {
    const u = new URL(url);
    const params = u.searchParams;
    const toDelete = [];
    for (const [key] of params.entries()) {
      if (key.startsWith("utm_") || key === "source" || key === "campaign") {
        toDelete.push(key);
      }
    }
    toDelete.forEach(k => params.delete(k));
    return u.toString();
  } catch (e) {
    return url;
  }
}

async function fetchAndCacheImage(
  url: string,
  fileName: string
): Promise<string | null> {
  try {
    const existingUrl = await checkFileExists(fileName);
    if (existingUrl) return existingUrl;

    const res = await fetch(url);
    if (!res.ok) return null;
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const r2Url = await uploadImageToR2(buffer, fileName, res.headers.get("content-type") || "image/jpeg");
    return r2Url || url;
  } catch (error) {
    console.error("Error caching image:", error);
    return url;
  }
}

export async function resolveImage(
  query: string,
  category: string,
  destination: string
): Promise<ImageAssetData | null> {
  let asset: ImageAssetData | null = null;
  const categoryUpper = category.toUpperCase();
  const queryLower = query.toLowerCase();

  const isLandmark = ["LANDMARK", "MUSEUM", "MONUMENT", "ATTRACTION"].includes(categoryUpper);
  const isFood = ["RESTAURANT", "CAFE", "FOOD", "DINING", "MEAL"].includes(categoryUpper) || 
                 queryLower.includes("restaurant") || queryLower.includes("cafe") || 
                 queryLower.includes("bistro") || queryLower.includes("eatery");

  // --- 1. PRIMARY SOURCE: UNSPLASH (Modern & Aesthetic) ---
  if (isLandmark) {
    asset = await fetchUnsplashImage(`${query} ${destination}`, "landscape");
  } else if (isFood) {
    const foodType = queryLower.includes("cafe") ? "cafe" : "restaurant";
    asset = await fetchUnsplashImage(`aesthetic ${foodType} interior food`, "landscape");
  } else {
    asset = await fetchUnsplashImage(`${query} ${destination}`, "landscape");
  }

  // --- 2. SECONDARY SOURCE: WIKIMEDIA (For Specific Landmarks) ---
  if (!asset && isLandmark) {
    asset = await fetchWikimediaImage(query, "landmark");
  }

  // --- 3. TERTIARY SOURCE: PEXELS (General Fallback) ---
  if (!asset) {
    let pexelsQuery: string;
    let fallback: string;

    if (isFood) {
      const foodType = queryLower.includes("cafe") ? "cafe" : "restaurant";
      pexelsQuery = `aesthetic ${foodType} interior food`;
      fallback = `fine dining food`;
    } else {
      pexelsQuery = `${query} ${destination}`;
      fallback = destination;
    }
    asset = await fetchPexelsImage(pexelsQuery, "landscape", fallback);
  }

  if (!asset) return null;

  // --- POST-PROCESSING ---
  asset.url = cleanUrl(asset.url);
  const hash = crypto.createHash("md5").update(asset.url).digest("hex");
  const pathOnly = asset.url.split('?')[0];
  const ext = pathOnly.split('.').pop()?.toLowerCase() || "jpg";
  const safeExt = (ext.length > 4 || ext.includes('/') || ext.includes('&')) ? "jpg" : ext;
  const fileName = `assets/${hash}.${safeExt}`;

  const cachedUrl = await fetchAndCacheImage(asset.url, fileName);
  if (cachedUrl) {
    asset.cachedPath = cachedUrl;
  }

  return asset;
}

export async function enrichItineraryWithImages(itineraryData: any, destination: string) {
  const limit = pLimit(5);
  const cache = new Map<string, ImageAssetData>();

  const resolveWithCache = async (q: string, cat: string, dest: string) => {
    const cacheKey = `${q}-${cat}`.toLowerCase();
    if (cache.has(cacheKey)) return cache.get(cacheKey);
    try {
      const result = await resolveImage(q, cat, dest);
      if (result) cache.set(cacheKey, result);
      return result;
    } catch (e) {
      return null;
    }
  };

  if (!itineraryData.heroImage) {
    const heroAsset = await resolveWithCache(destination, "LANDMARK", destination);
    if (heroAsset) itineraryData.heroImage = heroAsset;
  }

  const tasks = [];
  for (const day of itineraryData.days) {
    for (const activity of day.activities) {
      if (!activity.image) {
        tasks.push(limit(async () => {
          const query = activity.title;
          const category = activity.category || (activity.mealType !== "NONE" ? "RESTAURANT" : "ACTIVITY");
          const asset = await resolveWithCache(query, category, destination);
          if (asset) activity.image = asset;
        }));
      }
    }
  }

  if (tasks.length > 0) {
    await Promise.allSettled(tasks);
  }

  return itineraryData;
}
