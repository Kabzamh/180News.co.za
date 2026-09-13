import { NextResponse } from "next/server";
import { hasFullAccess } from "@/lib/access";
import { getAdmin } from "@/lib/admin";
import { addArticleMedia, getArticleMedia, removeArticleMedia, type MediaKind } from "@/lib/media";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const articleId = Number(searchParams.get("articleId"));
  if (!Number.isInteger(articleId) || articleId < 1) {
    return NextResponse.json({ ok: false, error: "Invalid article." }, { status: 400 });
  }
  const items = await getArticleMedia(articleId);
  if (!(await hasFullAccess())) {
    return NextResponse.json({
      ok: true,
      items: items.map((item) => ({
        id: item.id,
        kind: item.kind,
        title: item.title,
        caption: item.caption,
      })),
    });
  }
  return NextResponse.json({ ok: true, items });
}

export async function POST(request: Request) {
  if (!(await getAdmin())) {
    return NextResponse.json({ ok: false, error: "Staff sign-in required." }, { status: 401 });
  }
  try {
    const body = (await request.json()) as {
      articleId?: number;
      kind?: string;
      title?: string;
      url?: string;
      caption?: string;
      mimeType?: string;
    };
    const articleId = Number(body.articleId);
    const kind = body.kind === "audio" ? "audio" : body.kind === "video" ? "video" : null;
    const title = body.title?.trim() ?? "";
    const url = body.url?.trim() ?? "";
    if (!Number.isInteger(articleId) || articleId < 1 || !kind || title.length < 2 || url.length < 8) {
      return NextResponse.json({ ok: false, error: "Article, type, title and URL are required." }, { status: 400 });
    }
    const item = await addArticleMedia({
      articleId,
      kind: kind as MediaKind,
      title,
      url,
      caption: body.caption?.trim() ?? "",
      mimeType: body.mimeType?.trim() ?? "",
    });
    return NextResponse.json({ ok: true, item });
  } catch {
    return NextResponse.json({ ok: false, error: "Could not attach media." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await getAdmin())) {
    return NextResponse.json({ ok: false, error: "Staff sign-in required." }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));
  if (!Number.isInteger(id) || id < 1) {
    return NextResponse.json({ ok: false, error: "Invalid media." }, { status: 400 });
  }
  await removeArticleMedia(id);
  return NextResponse.json({ ok: true });
}
