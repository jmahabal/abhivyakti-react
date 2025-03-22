import { config as dotenvConfig } from "dotenv";
import {
  createClient,
  type Entry,
  type Asset,
  type EntrySkeletonType,
} from "contentful";
import { config, validateConfig } from "../src/lib/config";
import fs from "fs";
import path from "path";

// Load environment variables from .env.local
dotenvConfig({ path: ".env.local" });

// Validate environment variables
validateConfig();

// Types based on your content model
interface CastMemberFields {
  name: string;
  hometown?: string;
  description?: string;
  contactInformation?: string;
  photo?: Asset;
}

interface PlayFields {
  title?: string;
  playwright?: string;
  director?: Entry<{ fields: CastMemberFields }>[];
  description?: string;
  date?: string;
  cast?: Entry<{ fields: CastMemberFields }>[];
  location?: string;
  youtubeUrl?: string;
  photo?: Asset;
  backstage?: Entry<{ fields: CastMemberFields }>[];
}

interface HomePageFields {
  heroVideo?: Asset;
}

interface CastMember extends EntrySkeletonType {
  contentTypeId: "castMember";
  fields: CastMemberFields;
}

interface Play extends EntrySkeletonType {
  contentTypeId: "play";
  fields: PlayFields;
}

interface HomePage extends EntrySkeletonType {
  contentTypeId: "homePage";
  fields: HomePageFields;
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
});

async function fetchAllContentfulData() {
  try {
    // Fetch all plays with linked entries (cast, director, etc.)
    const plays = await client.getEntries<Play>({
      content_type: "play",
      include: 2, // include linked entries 2 levels deep
      order: ["-fields.date"], // newest first
    });

    // Fetch all cast members
    const castMembers = await client.getEntries<CastMember>({
      content_type: "castMember",
      include: 1, // include linked assets (photos)
    });

    // Fetch homepage data
    const homePage = await client.getEntries<HomePage>({
      content_type: "homePage",
      include: 1,
      limit: 1,
    });

    const data = {
      plays: plays.items,
      castMembers: castMembers.items,
      homePage: homePage.items[0] || null,
      metadata: {
        timestamp: new Date().toISOString(),
        totalPlays: plays.total,
        totalCastMembers: castMembers.total,
      },
    };

    // Save the data to a file that will be used at build time
    const dataPath = path.join(process.cwd(), "src/data/contentful-data.json");
    fs.mkdirSync(path.dirname(dataPath), { recursive: true });
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    console.log("Data fetched successfully:");
    console.log(`- Plays: ${plays.total}`);
    console.log(`- Cast Members: ${castMembers.total}`);
    console.log(`- Homepage: ${homePage.total}`);
    console.log("\nData saved to:", dataPath);
  } catch (error) {
    console.error("Error fetching Contentful data:", error);
    process.exit(1);
  }
}

fetchAllContentfulData();
