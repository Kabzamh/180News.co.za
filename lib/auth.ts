import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { and, desc, eq, gt, inArray } from "drizzle-orm";
import { cookies } from "next/headers";
import { db } from "@/db";
import {
  payments,
  subscriberSessions,
  subscribers,
  subscriptions,
  type Payment,
  type Subscriber,
  type Subscription,
} from "@/db/schema";

export const SESSION_COOKIE = "180news_session";

export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 30,
};

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  province: string;
  bio: string;
  avatarInitials: string;
  paid: boolean;
  onTrial: boolean;
  plan: string | null;
  periodEnd: string | null;
  autoRenew: boolean;
};

export function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "S";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 32).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const next = scryptSync(password, salt, 32);
  const prev = Buffer.from(hash, "hex");
  if (prev.length !== next.length) return false;
  return timingSafeEqual(prev, next);
}

export function createSessionToken() {
  return randomBytes(32).toString("hex");
}

export async function createSession(subscriberId: number) {
  const token = createSessionToken();
  const expiresAt = new Date(Date.now() + SESSION_COOKIE_OPTIONS.maxAge * 1000);
  await db.insert(subscriberSessions).values({ subscriberId, token, expiresAt });
  return { token, expiresAt };
}

export async function destroySession(token: string) {
  await db.delete(subscriberSessions).where(eq(subscriberSessions.token, token));
}

async function activeSubscription(subscriberId: number): Promise<Subscription | null> {
  const [row] = await db
    .select()
    .from(subscriptions)
    .where(
      and(
        eq(subscriptions.subscriberId, subscriberId),
        inArray(subscriptions.status, ["active", "trialing"]),
      ),
    )
    .orderBy(desc(subscriptions.currentPeriodEnd))
    .limit(1);
  if (!row) return null;
  if (row.currentPeriodEnd.getTime() < Date.now()) {
    await db.update(subscriptions).set({ status: "expired" }).where(eq(subscriptions.id, row.id));
    return null;
  }
  return row;
}

export function toAuthUser(subscriber: Subscriber, subscription: Subscription | null): AuthUser {
  const onTrial = subscription?.status === "trialing" || subscription?.plan === "trial";
  return {
    id: subscriber.id,
    name: subscriber.name,
    email: subscriber.email,
    phone: subscriber.phone,
    city: subscriber.city,
    province: subscriber.province,
    bio: subscriber.bio,
    avatarInitials: subscriber.avatarInitials,
    paid: Boolean(subscription),
    onTrial,
    plan: subscription?.plan ?? null,
    periodEnd: subscription?.currentPeriodEnd.toISOString() ?? null,
    autoRenew: subscription?.autoRenew ?? false,
  };
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const [session] = await db
    .select()
    .from(subscriberSessions)
    .where(and(eq(subscriberSessions.token, token), gt(subscriberSessions.expiresAt, new Date())))
    .limit(1);
  if (!session) return null;
  const [subscriber] = await db.select().from(subscribers).where(eq(subscribers.id, session.subscriberId)).limit(1);
  if (!subscriber) return null;
  const subscription = await activeSubscription(subscriber.id);
  return toAuthUser(subscriber, subscription);
}

export async function getAccountBundle() {
  const user = await getCurrentUser();
  if (!user) return null;
  const history = await db
    .select()
    .from(payments)
    .where(eq(payments.subscriberId, user.id))
    .orderBy(desc(payments.createdAt));
  return { user, payments: history as Payment[] };
}

export async function findSubscriberByEmail(email: string) {
  const [row] = await db.select().from(subscribers).where(eq(subscribers.email, email.toLowerCase())).limit(1);
  return row ?? null;
}
