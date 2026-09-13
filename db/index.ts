import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

export const isDatabaseConfigured = Boolean(process.env.DATABASE_URL);

// Next.js imports server modules while collecting route metadata during a
// production build. Vercel secrets may not be available in that phase, so the
// module must remain importable. No connection is opened until a query runs.
const databaseUrl =
  process.env.DATABASE_URL ??
  "postgresql://build:build@127.0.0.1:1/build_only";

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

export const pool =
  globalForDb.__arenaNextJsPostgresqlPool ??
  new Pool({
    connectionString: databaseUrl,
    max: process.env.NODE_ENV === "production" ? 5 : 10,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 5_000,
    allowExitOnIdle: true,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__arenaNextJsPostgresqlPool = pool;
}

export const db = drizzle(pool, { schema });
