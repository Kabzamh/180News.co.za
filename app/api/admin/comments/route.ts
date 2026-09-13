import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { comments } from "@/db/schema";
import { getAdmin } from "@/lib/admin";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!(await getAdmin())) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  const form = await request.formData();
  const id = Number(form.get("id"));
  await db.delete(comments).where(eq(comments.id, id));
  return NextResponse.redirect(new URL("/admin/comments", request.url));
}
