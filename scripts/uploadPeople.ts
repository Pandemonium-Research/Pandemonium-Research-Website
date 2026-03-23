/**
 * Upload team-member portraits to Cloudinary.
 *
 * Usage:
 *   1. Place images (jpg/jpeg/png/webp) in  public/people/
 *   2. Copy .env.local.example → .env.local and fill in your Cloudinary credentials
 *   3. npm run upload:people
 *
 * The script prints a ready-to-paste TypeScript snippet for src/data/people.ts.
 */

import { v2 as cloudinary } from "cloudinary";
import { readdirSync } from "fs";
import { join, basename, extname } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const CLOUDINARY_FOLDER = "pandemonium/people";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface UploadResult {
  filename: string;
  slug: string;
  url: string;
  publicId: string;
}

async function uploadPeopleImages(): Promise<void> {
  const peoplePath = join(__dirname, "../public/people");

  let files: string[];
  try {
    files = readdirSync(peoplePath).filter((f) =>
      SUPPORTED_EXTENSIONS.has(extname(f).toLowerCase())
    );
  } catch {
    console.error(
      `\n✗ Could not read directory: ${peoplePath}\n  Make sure you have created public/people/ and placed images there.\n`
    );
    process.exit(1);
  }

  if (files.length === 0) {
    console.warn(`\n⚠ No supported images found in ${peoplePath}\n`);
    process.exit(0);
  }

  console.log(`\nFound ${files.length} image(s) to upload...\n`);

  const results: UploadResult[] = [];

  for (const file of files) {
    const filePath = join(peoplePath, file);
    const slug = basename(file, extname(file));
    const publicId = `${CLOUDINARY_FOLDER}/${slug}`;

    process.stdout.write(`Uploading ${file}...`);

    try {
      const result = await cloudinary.uploader.upload(filePath, {
        public_id: publicId,
        overwrite: true,
        invalidate: true,
      });

      // Auto-optimised portrait URL — 400 px wide, auto format & quality
      const url = cloudinary.url(result.public_id, {
        fetch_format: "auto",
        quality: "auto",
        width: 400,
        crop: "limit",
        secure: true,
      });

      results.push({ filename: file, slug, url, publicId: result.public_id });
      console.log(` ✓`);
      console.log(`  public_id : ${result.public_id}`);
      console.log(`  url       : ${url}\n`);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.log(` ✗\n  Error: ${message}\n`);
    }
  }

  if (results.length === 0) {
    console.error("No images were uploaded successfully.\n");
    process.exit(1);
  }

  // ── Print ready-to-paste data snippet ──────────────────────────────────────
  console.log("=".repeat(60));
  console.log("Copy the imageUrl values into src/data/people.ts:\n");

  for (const { slug, url } of results) {
    console.log(`  // ${slug}`);
    console.log(`  imageUrl: "${url}",\n`);
  }

  console.log("=".repeat(60));
  console.log(`\n✓ ${results.length} image(s) uploaded to Cloudinary.\n`);
}

uploadPeopleImages().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
