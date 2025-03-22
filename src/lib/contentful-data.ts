import fs from "fs";
import path from "path";
import type { ContentfulData } from "@/types/contentful";

export function getContentfulData(): ContentfulData {
  const dataPath = path.join(process.cwd(), "src/data/contentful-data.json");
  const rawData = fs.readFileSync(dataPath, "utf8");
  return JSON.parse(rawData) as ContentfulData;
}

export function getLatestPlays(limit = 3) {
  const data = getContentfulData();
  return data.plays.slice(0, limit);
}

export function getAllPlays() {
  const data = getContentfulData();
  return data.plays;
}

export function getAllCastMembers() {
  const data = getContentfulData();
  return data.castMembers;
}

export function getHomePage() {
  const data = getContentfulData();
  return data.homePage;
}
