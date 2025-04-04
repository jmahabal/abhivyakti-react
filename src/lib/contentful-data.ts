import fs from "fs";
import path from "path";
import type { ContentfulData } from "@/types/contentful";

export function getContentfulData(): ContentfulData {
  const dataPath = path.join(process.cwd(), "src/data/contentful-data.json");
  const rawData = fs.readFileSync(dataPath, "utf8");
  return JSON.parse(rawData) as ContentfulData;
}

export function getAllPlays() {
  const data = getContentfulData();
  return data.plays.sort((a, b) => {
    const dateA = a.fields.date ? new Date(String(a.fields.date)).getTime() : 0;
    const dateB = b.fields.date ? new Date(String(b.fields.date)).getTime() : 0;
    return dateB - dateA; // Sort in descending order (newest first)
  });
}

export function getLatestPlays(limit = 3) {
  const sortedPlays = getAllPlays();
  return sortedPlays.slice(0, limit);
}

export function getAllCastMembers() {
  const data = getContentfulData();
  return data.castMembers;
}

export function getHomePage() {
  const data = getContentfulData();
  return data.homePage;
}
