import { createClient } from "contentful";
import { type EntryCollection, type EntrySkeletonType } from "contentful";
import { config, validateConfig } from "./config";

// Validate environment variables
validateConfig();

// After validation, we know these values exist
const space = config.contentful.spaceId!;
const accessToken = config.contentful.accessToken!;

export const contentfulClient = createClient({
  space,
  accessToken,
  environment: config.contentful.environment,
});

type ContentfulQueryOptions = {
  limit?: number;
  skip?: number;
  order?: string;
  [key: string]: unknown; // More type-safe than 'any'
};

// Generic type for fetching entries with proper typing
export async function fetchEntries<T extends EntrySkeletonType>(
  contentType: string,
  query: ContentfulQueryOptions = {}
): Promise<EntryCollection<T>> {
  try {
    return await contentfulClient.getEntries<T>({
      content_type: contentType,
      ...query,
    });
  } catch (error) {
    console.error("Error fetching entries from Contentful:", error);
    throw error;
  }
}

// Example usage:
// interface BlogPost extends EntrySkeletonType {
//   fields: {
//     title: string;
//     content: string;
//     // ... other fields
//   };
// }
// const posts = await fetchEntries<BlogPost>('blogPost', { limit: 10 });
