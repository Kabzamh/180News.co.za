import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getAdmin } from "@/lib/admin";
import { addArticleMedia, type MediaKind } from "@/lib/media";

export const dynamic = "force-dynamic";

const ALLOWED: Record<string, { kind: MediaKind; ext: string }> = {
  "video/mp4": { kind: "video", ext: "mp4" },
  "video/webm": { kind: "video", ext: "webm" },
  "audio/mpeg": { kind: "audio", ext: "mp3" },
  "audio/mp3": { kind: "audio", ext: "mp3" },
  "audio/wav": { kind: "audio", ext: "wav" },
  "audio/x-wav": { kind: "audio", ext: "wav" },
};

export async function POST(request: Request) {
  if (!(await getAdmin())) {
    return NextResponse.json({ ok: false, error: "Staff sign-in required." }, { status: 401 });
  }
  try {
    const form = await request.formData();
    const file = form.get("file");
    const articleId = Number(form.get("articleId"));
    const title = String(form.get("title") ?? "").trim();
    const caption = String(form.get("caption") ?? "").trim();

    if (!(file instanceof File) || !Number.isInteger(articleId) || articleId < 1 || title.length < 2) {
      return NextResponse.json({ ok: false, error: "File, article and title are required." }, { status: 400 });
    }
    if (file.size > 25 * 1024 * 1024) {
      return NextResponse.json({ ok: false, error: "File must be 25MB or smaller." }, { status: 400 });
    }

    const type = file.type || "";
    const allowed = ALLOWED[type];
    if (!allowed) {
      return NextResponse.json(
        { ok: false, error: "Use an MP4/WebM video or an MP3/WAV audio file." },
        { status: 400 },
      );
    }

    const folder = path.join(process.cwd(), "storage", "uploads");
    await mkdir(folder, { recursive: true });
    const filename = `${Date.now()}-${articleId}.${allowed.ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(folder, filename), buffer);

    const item = await addArticleMedia({
      articleId,
      kind: allowed.kind,
      title,
      url: `/uploads/${filename}`,
      caption,
      mimeType: type,
    });

    return NextResponse.json({ ok: true, item });
  } catch {
    return NextResponse.json({ ok: false, error: "Upload failed." }, { status: 500 });
  }
}
