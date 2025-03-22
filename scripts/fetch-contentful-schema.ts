import { config as dotenvConfig } from "dotenv";
import { createClient } from "contentful";
import { validateConfig } from "../src/lib/config";
import fs from "fs";
import path from "path";

// Load environment variables from .env.local
dotenvConfig({ path: ".env.local" });

// Validate environment variables
validateConfig();

console.log("Creating Contentful client...");

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
});

async function fetchContentTypes() {
  try {
    const contentTypes = await client.getContentTypes();
    const schema: Record<string, unknown> = {};

    for (const type of contentTypes.items) {
      const entries = await client.getEntries({
        content_type: type.sys.id,
        limit: 1,
      });
      schema[type.sys.id] = {
        name: type.name,
        description: type.description,
        fields: type.fields.map((field) => ({
          id: field.id,
          name: field.name,
          type: field.type,
          required: field.required,
          localized: field.localized,
          // Include a sample value if we have one
          sampleValue: entries.items[0]?.fields[field.id],
        })),
      };
    }

    // Save the schema to a file
    const schemaPath = path.join(
      process.cwd(),
      "src/types/contentful-schema.json"
    );
    fs.mkdirSync(path.dirname(schemaPath), { recursive: true });
    fs.writeFileSync(schemaPath, JSON.stringify(schema, null, 2));

    console.log("Content Types:");
    console.log(JSON.stringify(schema, null, 2));
    console.log("\nSchema saved to:", schemaPath);
  } catch (error) {
    console.error("Error fetching content types:", error);
    process.exit(1);
  }
}

fetchContentTypes();
