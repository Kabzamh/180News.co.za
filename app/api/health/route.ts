import { db, isDatabaseConfigured } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isDatabaseConfigured) {
    return Response.json(
      {
        ok: false,
        database: "not_configured",
        message: "Set DATABASE_URL in the deployment environment.",
      },
      { status: 503 },
    );
  }

  try {
    await db.execute(sql`select 1`);
    return Response.json({ ok: true, database: "connected" });
  } catch {
    return Response.json(
      {
        ok: false,
        database: "unreachable",
        message: "DATABASE_URL is set but PostgreSQL could not be reached.",
      },
      { status: 503 },
    );
  }
}
