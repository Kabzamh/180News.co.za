import { NextResponse } from "next/server";
import { db } from "@/db";
import { subscribers } from "@/db/schema";
import {
  SESSION_COOKIE,
  SESSION_COOKIE_OPTIONS,
  createSession,
  findSubscriberByEmail,
  hashPassword,
  initialsFromName,
} from "@/lib/auth";
import { startFreeTrial } from "@/lib/billing";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      password?: string;
      phone?: string;
      city?: string;
      province?: string;
    };
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim().toLowerCase() ?? "";
    const password = body.password ?? "";
    const phone = body.phone?.trim() ?? "";
    const city = body.city?.trim() || "Johannesburg";
    const province = body.province?.trim() || "Gauteng";

    if (name.length < 2) {
      return NextResponse.json({ ok: false, error: "Enter your name." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ ok: false, error: "Password must be at least 8 characters." }, { status: 400 });
    }
    if (await findSubscriberByEmail(email)) {
      return NextResponse.json({ ok: false, error: "That email already has a profile. Sign in instead." }, { status: 409 });
    }

    const [subscriber] = await db
      .insert(subscribers)
      .values({
        name,
        email,
        passwordHash: hashPassword(password),
        phone,
        city,
        province,
        avatarInitials: initialsFromName(name),
      })
      .returning();

    await startFreeTrial(subscriber.id);
    const session = await createSession(subscriber.id);
    const response = NextResponse.json({ ok: true, next: "/account?trial=1" });
    response.cookies.set(SESSION_COOKIE, session.token, SESSION_COOKIE_OPTIONS);
    return response;
  } catch {
    return NextResponse.json({ ok: false, error: "Could not create your profile." }, { status: 500 });
  }
}
