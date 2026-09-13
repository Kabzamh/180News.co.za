import { NextResponse } from "next/server";
import { deviceFromUa, recordPageView, recordVital, shouldTrack } from "@/lib/analytics";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      type?: string;
      path?: string;
      referrer?: string;
      name?: string;
      value?: number;
      session?: string;
    };
    const path = body.path?.trim() || "/";
    if (!shouldTrack(path)) return NextResponse.json({ ok: true, skipped: true });
    const ua = request.headers.get("user-agent") || "";
    const device = deviceFromUa(ua);
    const session = (body.session || "anon").slice(0, 64);

    if (body.type === "vital" && body.name && typeof body.value === "number") {
      await recordVital({ name: body.name, value: body.value, path, device });
    } else {
      await recordPageView({
        path,
        referrer: body.referrer,
        device,
        session,
      });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
