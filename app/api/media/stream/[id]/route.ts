import { readFile } from "node:fs/promises";
import path from "node:path";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { articleMedia } from "@/db/schema";
import { hasFullAccess } from "@/lib/access";

export const dynamic = "force-dynamic";

function storagePath(filename: string) {
  const safe = path.basename(filename);
  return path.join(process.cwd(), "storage", "uploads", safe);
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await hasFullAccess())) {
    return new Response("Paid subscribers only.", { status: 403 });
  }

  const id = Number((await params).id);
  if (!Number.isInteger(id) || id < 1) {
    return new Response("Not found.", { status: 404 });
  }

  const [item] = await db.select().from(articleMedia).where(eq(articleMedia.id, id)).limit(1);
  if (!item) {
    return new Response("Not found.", { status: 404 });
  }

  const localName = item.url.startsWith("/uploads/") ? item.url.replace("/uploads/", "") : "";

  if (localName) {
    try {
      const data = await readFile(storagePath(localName));
      return new Response(data, {
        headers: {
          "Content-Type": item.mimeType || (item.kind === "audio" ? "audio/mpeg" : "video/mp4"),
          "Cache-Control": "private, no-store",
        },
      });
    } catch {
      return new Response("File missing.", { status: 404 });
    }
  }

  return Response.redirect(item.url, 302);
}
