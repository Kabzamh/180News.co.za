import { db } from "@/db";
import { comments } from "@/db/schema";
import { hasFullAccess } from "@/lib/access";
import { ensureSeeded } from "@/lib/seed";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    if (!(await hasFullAccess())) {
      return Response.json({ ok: false, error: "Subscribe to join the discussion." }, { status: 403 });
    }
    await ensureSeeded();
    const body = (await request.json()) as {
      articleId?: number;
      name?: string;
      email?: string;
      body?: string;
    };

    const articleId = Number(body.articleId);
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const text = body.body?.trim() ?? "";

    if (!Number.isInteger(articleId) || articleId < 1) {
      return Response.json({ ok: false, error: "Invalid article." }, { status: 400 });
    }
    if (name.length < 2 || text.length < 4) {
      return Response.json({ ok: false, error: "Name and comment are required." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
    }

    await db.insert(comments).values({
      articleId,
      name,
      email,
      body: text,
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "Could not publish the comment." }, { status: 500 });
  }
}
