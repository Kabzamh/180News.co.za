import crypto from "node:crypto";
import { cookies, headers } from "next/headers";
import { SITE } from "@/lib/constants";

export const ADMIN_COOKIE = "180_newsroom_session";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

function secret(): string {
  return (
    process.env.SUBSCRIPTION_SECRET ||
    process.env.CRON_SECRET ||
    SITE.adminKey ||
    "180degrees-newsroom-secret"
  );
}

/** Constant-time check of the newsroom access key. */
export function isValidKey(key: string | null | undefined): boolean {
  if (!key) return false;
  const expected = process.env.CRON_SECRET || SITE.adminKey;
  const a = Buffer.from(String(key));
  const b = Buffer.from(String(expected));
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function sign(payload: string): string {
  return crypto
    .createHmac("sha256", secret())
    .update(payload)
    .digest("hex")
    .slice(0, 28);
}

export function createSessionToken(): string {
  const issued = Date.now();
  const body = Buffer.from(
    JSON.stringify({ role: "newsroom", iat: issued }),
  ).toString("base64url");
  return `${body}.${sign(body + ":" + issued)}`;
}

export function verifySession(token: string | undefined | null): boolean {
  if (!token) return false;
  const dot = token.lastIndexOf(".");
  if (dot < 1) return false;
  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  let payload: { iat?: number };
  try {
    payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
  } catch {
    return false;
  }
  const issued = payload.iat ?? 0;
  const expected = sign(body + ":" + issued);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  if (Date.now() - issued > SESSION_TTL_MS) return false;
  return true;
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return verifySession(store.get(ADMIN_COOKIE)?.value);
}

/**
 * Whether the current request arrived over HTTPS (respecting proxy headers).
 * Secure cookies are silently dropped on plain-http origins, so the flag must
 * follow the real protocol the browser uses.
 */
export async function isSecureRequest(): Promise<boolean> {
  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "";
  if (proto) return proto.split(",")[0].trim() === "https";
  const host = h.get("host") ?? h.get("x-forwarded-host") ?? "";
  return host.startsWith("https://") && !host.includes("localhost");
}

export async function setAdminSession(): Promise<void> {
  const store = await cookies();
  store.set(ADMIN_COOKIE, createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: await isSecureRequest(),
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export async function clearAdminSession(): Promise<void> {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
}

/**
 * Authorize an API request from either the newsroom key (header or ?key=, used
 * by cron) or a valid admin session cookie (used by the web console).
 */
export async function authorizeRequest(request: Request): Promise<boolean> {
  const key =
    request.headers.get("x-admin-key") ||
    new URL(request.url).searchParams.get("key");
  if (isValidKey(key)) return true;
  const store = await cookies();
  return verifySession(store.get(ADMIN_COOKIE)?.value);
}
