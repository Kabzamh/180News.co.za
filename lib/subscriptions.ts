import crypto from "node:crypto";
import { cookies } from "next/headers";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { subscriptions, type Subscription } from "@/db/schema";
import { SITE } from "@/lib/constants";

export const PLAN = {
  id: "all-access",
  name: "180° All Access",
  price: 99,
  currency: "R",
  period: "month",
  trialDays: 7,
} as const;

export const ACCESS_COOKIE = "180_premium";

const secret =
  process.env.SUBSCRIPTION_SECRET ||
  process.env.CRON_SECRET ||
  "180degrees-news-subscription-secret";

function b64url(input: string): string {
  return Buffer.from(input).toString("base64url");
}
function b64urlDecode(input: string): string {
  return Buffer.from(input, "base64url").toString("utf8");
}

function sign(id: number, email: string): string {
  const body = b64url(JSON.stringify({ id, e: email.toLowerCase() }));
  const sig = crypto.createHmac("sha256", secret).update(body).digest("hex").slice(0, 24);
  return `${body}.${sig}`;
}

export function verifyToken(token: string | undefined | null): number | null {
  if (!token) return null;
  const dot = token.lastIndexOf(".");
  if (dot < 1) return null;
  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  let payload: { id?: number; e?: string };
  try {
    payload = JSON.parse(b64urlDecode(body));
  } catch {
    return null;
  }
  const id = Number(payload.id);
  const email = payload.e;
  if (!id || !email || Number.isNaN(id)) return null;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex")
    .slice(0, 24);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  return id;
}

export type Access =
  | { subscribed: true; subscription: Subscription }
  | { subscribed: false; subscription: null };

/** Bring a stored subscription up to date (trial → active billing cycle). */
async function reconcile(sub: Subscription): Promise<Subscription> {
  const now = new Date();
  if (sub.status === "trialing" && sub.trialEndsAt <= now) {
    // Simulated successful monthly charge after the 7-day trial.
    const periodEnd = new Date(sub.trialEndsAt.getTime() + 30 * 86_400_000);
    const [updated] = await db
      .update(subscriptions)
      .set({ status: "active", currentPeriodEnd: periodEnd, updatedAt: now })
      .where(eq(subscriptions.id, sub.id))
      .returning();
    return updated ?? sub;
  }
  if (sub.status === "active" && sub.currentPeriodEnd <= now) {
    // Renew the monthly cycle (simulated recurring payment).
    const periodEnd = new Date(sub.currentPeriodEnd.getTime() + 30 * 86_400_000);
    const [updated] = await db
      .update(subscriptions)
      .set({ currentPeriodEnd: periodEnd, updatedAt: now })
      .where(eq(subscriptions.id, sub.id))
      .returning();
    return updated ?? sub;
  }
  return sub;
}

export function entitled(sub: Subscription | null): sub is Subscription {
  if (!sub || sub.status === "cancelled") return false;
  const now = Date.now();
  if (sub.status === "trialing") return new Date(sub.trialEndsAt).getTime() > now;
  if (sub.status === "active") return new Date(sub.currentPeriodEnd).getTime() > now;
  return false;
}

export async function getAccess(): Promise<Access> {
  const store = await cookies();
  const token = store.get(ACCESS_COOKIE)?.value;
  const id = verifyToken(token);
  if (!id) return { subscribed: false, subscription: null };
  const [sub] = await db
    .select()
    .from(subscriptions)
    .where(and(eq(subscriptions.id, id), eq(subscriptions.accessToken, token ?? "")));
  if (!sub) return { subscribed: false, subscription: null };
  const current = await reconcile(sub);
  return entitled(current)
    ? { subscribed: true, subscription: current }
    : { subscribed: false, subscription: null };
}

export type StartInput = {
  email: string;
  fullName?: string;
  paymentMethod: "card" | "eft" | "debit" | "gpay";
  paymentLabel: string;
  last4?: string | null;
};

export async function startSubscription(input: StartInput): Promise<{
  subscription: Subscription;
  token: string;
  created: boolean;
}> {
  const email = input.email.toLowerCase().trim();
  const now = new Date();
  const trialEnds = new Date(now.getTime() + PLAN.trialDays * 86_400_000);
  const periodEnd = new Date(trialEnds.getTime() + 30 * 86_400_000);

  const [existing] = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.email, email));

  if (existing) {
    // Reactivate a cancelled membership (or refresh payment details).
    const base =
      existing.status === "cancelled"
        ? {
            status: "trialing" as const,
            trialEndsAt: trialEnds,
            currentPeriodEnd: periodEnd,
            cancelledAt: null,
          }
        : {};
    const [updated] = await db
      .update(subscriptions)
      .set({
        ...base,
        fullName: input.fullName ?? existing.fullName,
        paymentMethod: input.paymentMethod,
        paymentLabel: input.paymentLabel,
        last4: input.last4 ?? existing.last4,
        updatedAt: now,
      })
      .where(eq(subscriptions.id, existing.id))
      .returning();
    return {
      subscription: updated ?? existing,
      token: existing.accessToken,
      created: false,
    };
  }

  // Create with placeholder token, then sign the real id.
  const [created] = await db
    .insert(subscriptions)
    .values({
      email,
      fullName: input.fullName ?? null,
      plan: PLAN.id,
      status: "trialing",
      paymentMethod: input.paymentMethod,
      paymentLabel: input.paymentLabel,
      last4: input.last4 ?? null,
      trialEndsAt: trialEnds,
      currentPeriodEnd: periodEnd,
      accessToken: "pending",
    })
    .returning();

  const token = sign(created.id, email);
  const [finalSub] = await db
    .update(subscriptions)
    .set({ accessToken: token })
    .where(eq(subscriptions.id, created.id))
    .returning();

  return { subscription: finalSub ?? created, token, created: true };
}

export async function restoreByEmail(
  email: string,
): Promise<{ token: string } | null> {
  const [sub] = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.email, email.toLowerCase().trim()));
  if (!sub) return null;
  const current = await reconcile(sub);
  if (!entitled(current)) return null;
  return { token: sub.accessToken };
}

export async function cancelSubscription(
  token: string,
): Promise<Subscription | null> {
  const id = verifyToken(token);
  if (!id) return null;
  const [updated] = await db
    .update(subscriptions)
    .set({ status: "cancelled", cancelledAt: new Date(), updatedAt: new Date() })
    .where(eq(subscriptions.id, id))
    .returning();
  return updated ?? null;
}

export function trialEndLabel(): string {
  return new Date(Date.now() + PLAN.trialDays * 86_400_000).toLocaleDateString(
    "en-ZA",
    { weekday: "long", day: "numeric", month: "long" },
  );
}

export { SITE };
