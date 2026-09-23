import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

export const MAX_UPLOAD_BYTES = 60 * 1024 * 1024; // 60 MB

export const ALLOWED_UPLOAD_TYPES: Record<
  string,
  { ext: string; bucket: "images" | "audio" | "video"; kind: "image" | "audio" | "video" }
> = {
  "image/jpeg": { ext: "jpg", bucket: "images", kind: "image" },
  "image/png": { ext: "png", bucket: "images", kind: "image" },
  "image/webp": { ext: "webp", bucket: "images", kind: "image" },
  "image/gif": { ext: "gif", bucket: "images", kind: "image" },
  "audio/mpeg": { ext: "mp3", bucket: "audio", kind: "audio" },
  "audio/mp4": { ext: "m4a", bucket: "audio", kind: "audio" },
  "audio/x-m4a": { ext: "m4a", bucket: "audio", kind: "audio" },
  "audio/ogg": { ext: "ogg", bucket: "audio", kind: "audio" },
  "video/mp4": { ext: "mp4", bucket: "video", kind: "video" },
  "video/webm": { ext: "webm", bucket: "video", kind: "video" },
  "video/quicktime": { ext: "mov", bucket: "video", kind: "video" },
};

/** Absolute on-disk directory that holds uploaded media. */
export function uploadsDir(): string {
  // Files are stored outside the bundle and served via /uploads/[...path].
  return (
    process.env.UPLOAD_DIR ||
    path.join(process.cwd(), ".media", "uploads")
  );
}

export type SavedFile = {
  url: string; // public URL
  path: string; // on-disk absolute path
  bucket: "images" | "audio" | "video";
  kind: "image" | "audio" | "video";
};

export function uploadFilename(ext: string): string {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const rand = crypto.randomBytes(5).toString("hex");
  return `${stamp}-${rand}.${ext}`;
}

export async function saveUpload(
  bytes: ArrayBuffer,
  contentType: string,
): Promise<SavedFile> {
  const meta = ALLOWED_UPLOAD_TYPES[contentType];
  if (!meta) {
    throw new Error(`Unsupported file type: ${contentType}`);
  }
  if (bytes.byteLength === 0) throw new Error("Empty file");
  if (bytes.byteLength > MAX_UPLOAD_BYTES) {
    throw new Error(
      `File too large (max ${Math.round(MAX_UPLOAD_BYTES / 1024 / 1024)}MB)`,
    );
  }

  const dir = path.join(uploadsDir(), meta.bucket);
  await mkdir(dir, { recursive: true });
  const name = uploadFilename(meta.ext);
  const fullPath = path.join(dir, name);
  await writeFile(fullPath, Buffer.from(bytes));

  return {
    url: `/uploads/${meta.bucket}/${name}`,
    path: fullPath,
    bucket: meta.bucket,
    kind: meta.kind,
  };
}
