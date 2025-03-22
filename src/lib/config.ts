import { config as dotenvConfig } from "dotenv";

// Load environment variables
dotenvConfig({ path: ".env.local" });

export function validateConfig() {
  if (!process.env.CONTENTFUL_SPACE_ID) {
    throw new Error(
      'Required environment variable "CONTENTFUL_SPACE_ID" is not set.'
    );
  }

  if (!process.env.CONTENTFUL_ACCESS_TOKEN) {
    throw new Error(
      'Required environment variable "CONTENTFUL_ACCESS_TOKEN" is not set.'
    );
  }
}

export const config = {
  contentful: {
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    previewAccessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
    environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
  },
} as const;
