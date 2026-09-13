import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_COOKIE_OPTIONS,
  createSession,
  findSubscriberByEmail,
  verifyPassword,
} from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; password?: string };
    const email = body.email?.trim().toLowerCase() ?? "";
    const password = body.password ?? "";
    const subscriber = await findSubscriberByEmail(email);
    if (!subscriber || !verifyPassword(password, subscriber.passwordHash)) {
      return NextResponse.json({ ok: false, error: "Email or password is incorrect." }, { status: 401 });
    }
    const session = await createSession(subscriber.id);
    const response = NextResponse.json({ ok: true });
    response.cookies.set(SESSION_COOKIE, session.token, SESSION_COOKIE_OPTIONS);
    return response;
  } catch {
    return NextResponse.json({ ok: false, error: "Could not sign you in." }, { status: 500 });
  }
}
