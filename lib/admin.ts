import { and, eq, gt } from "drizzle-orm";
import { cookies } from "next/headers";
import { db } from "@/db";
import { adminSessions, admins, type Admin } from "@/db/schema";
import { createSessionToken, hashPassword, verifyPassword } from "@/lib/auth";

export const ADMIN_COOKIE = "180news_admin";
export const ADMIN_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 14,
};

export const DEFAULT_ADMIN = {
  email: process.env.ADMIN_EMAIL || "admin@180news.co.za",
  password: process.env.ADMIN_PASSWORD || "180Admin!",
  name: "Newsroom Admin",
};

let adminReady = false;
let adminPromise: Promise<void> | null = null;

async function seedAdmin() {
  const existing = await db.select({ id: admins.id }).from(admins).limit(1);
  if (existing.length === 0) {
    await db.insert(admins).values({
      name: DEFAULT_ADMIN.name,
      email: DEFAULT_ADMIN.email,
      passwordHash: hashPassword(DEFAULT_ADMIN.password),
      role: "editor-in-chief",
    });
  }
  adminReady = true;
}

export async function ensureAdmin() {
  if (adminReady) return;
  if (!adminPromise) {
    adminPromise = seedAdmin().catch((error) => {
      adminPromise = null;
      throw error;
    });
  }
  await adminPromise;
}

export async function createAdminSession(adminId: number) {
  const token = createSessionToken();
  const expiresAt = new Date(Date.now() + ADMIN_COOKIE_OPTIONS.maxAge * 1000);
  await db.insert(adminSessions).values({ adminId, token, expiresAt });
  return token;
}

export async function destroyAdminSession(token: string) {
  await db.delete(adminSessions).where(eq(adminSessions.token, token));
}

export async function getAdmin(): Promise<Admin | null> {
  await ensureAdmin();
  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE)?.value;
  if (!token) return null;
  const [session] = await db
    .select()
    .from(adminSessions)
    .where(and(eq(adminSessions.token, token), gt(adminSessions.expiresAt, new Date())))
    .limit(1);
  if (!session) return null;
  const [admin] = await db.select().from(admins).where(eq(admins.id, session.adminId)).limit(1);
  return admin ?? null;
}

export async function authenticateAdmin(email: string, password: string) {
  await ensureAdmin();
  const [admin] = await db.select().from(admins).where(eq(admins.email, email.toLowerCase())).limit(1);
  if (!admin || !verifyPassword(password, admin.passwordHash)) return null;
  return admin;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 300);
}
