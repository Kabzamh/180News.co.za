import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { ensureSeeded } from "@/lib/seed";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    await ensureSeeded();
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
    };

    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const subject = body.subject?.trim() ?? "";
    const message = body.message?.trim() ?? "";

    if (name.length < 2 || subject.length < 3 || message.length < 10) {
      return Response.json({ ok: false, error: "Please complete all fields." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
    }

    await db.insert(contactMessages).values({ name, email, subject, message });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "Could not send the message." }, { status: 500 });
  }
}
