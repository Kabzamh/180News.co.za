import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { subscribers } from "@/db/schema";
import { getCurrentUser, initialsFromName } from "@/lib/auth";
import { cancelAutoRenew } from "@/lib/billing";

export const dynamic = "force-dynamic";

export async function PATCH(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ ok: false, error: "Sign in to edit your profile." }, { status: 401 });
  }
  const body = (await request.json()) as {
    name?: string;
    phone?: string;
    city?: string;
    province?: string;
    bio?: string;
    cancel?: boolean;
  };

  if (body.cancel) {
    await cancelAutoRenew(user.id);
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim() ?? user.name;
  if (name.length < 2) {
    return NextResponse.json({ ok: false, error: "Enter your name." }, { status: 400 });
  }

  await db
    .update(subscribers)
    .set({
      name,
      phone: body.phone?.trim() ?? user.phone,
      city: body.city?.trim() || user.city,
      province: body.province?.trim() || user.province,
      bio: body.bio?.trim() ?? user.bio,
      avatarInitials: initialsFromName(name),
    })
    .where(eq(subscribers.id, user.id));

  return NextResponse.json({ ok: true });
}
