import { type NextConfig } from "next";

// Define the env object type explicitly
type EnvConfig = {
  [key: string]: string;
};

const envConfig: EnvConfig = {
  ["CONTENTFUL_SPACE_ID"]: process.env["CONTENTFUL_SPACE_ID"] || "",
  ["CONTENTFUL_ACCESS_TOKEN"]: process.env["CONTENTFUL_ACCESS_TOKEN"] || "",
  ["CONTENTFUL_PREVIEW_ACCESS_TOKEN"]:
    process.env["CONTENTFUL_PREVIEW_ACCESS_TOKEN"] || "",
  ["CONTENTFUL_ENVIRONMENT"]: process.env["CONTENTFUL_ENVIRONMENT"] || "master",
};

const config: NextConfig = {
  env: envConfig,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
        pathname: "/**",
      },
    ],
  },
};

export default config;
