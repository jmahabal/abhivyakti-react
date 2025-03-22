import sharp from "sharp";
import path from "path";
import fs from "fs";

const sizes = [16, 32, 48, 64, 72, 96, 120, 128, 144, 152, 180, 192, 384, 512];
const inputFile = path.join(process.cwd(), "public", "abhivyakti-logo.png");
const outputDir = path.join(process.cwd(), "public");

async function generateFavicons() {
  try {
    // Create favicon.ico (multi-size ico file)
    await sharp(inputFile)
      .resize(64, 64)
      .toFile(path.join(outputDir, "favicon.ico"));

    // Generate PNG icons
    for (const size of sizes) {
      await sharp(inputFile)
        .resize(size, size)
        .toFile(path.join(outputDir, `icon-${size}x${size}.png`));
    }

    // Generate manifest.json
    const manifest = {
      name: "अभिव्यक्ति / Abhivyakti",
      short_name: "अभिव्यक्ति",
      description: "Los Angeles' premier Marathi theater group",
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#ffffff",
      icons: sizes.map((size) => ({
        src: `/icon-${size}x${size}.png`,
        sizes: `${size}x${size}`,
        type: "image/png",
      })),
    };

    fs.writeFileSync(
      path.join(outputDir, "manifest.json"),
      JSON.stringify(manifest, null, 2)
    );

    console.log("✅ Generated all favicon assets");
  } catch (error) {
    console.error("Error generating favicons:", error);
    process.exit(1);
  }
}

generateFavicons();
