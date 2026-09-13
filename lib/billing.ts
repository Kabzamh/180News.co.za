import { randomBytes } from "node:crypto";
import { and, desc, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import { payments, subscriptions } from "@/db/schema";
import { MONTHLY_PLAN } from "@/lib/constants";

export function formatRand(cents: number) {
  return `R${(cents / 100).toFixed(0)}`;
}

export function paymentReference() {
  return `180-${randomBytes(4).toString("hex").toUpperCase()}`;
}

export function detectCardBrand(number: string) {
  if (/^4/.test(number)) return "Visa";
  if (/^5[1-5]/.test(number) || /^2(2|7)/.test(number)) return "Mastercard";
  if (/^3[47]/.test(number)) return "Amex";
  return "Card";
}

export function luhnValid(number: string) {
  const digits = number.replace(/\D/g, "");
  if (digits.length < 13 || digits.length > 19) return false;
  let sum = 0;
  let alt = false;
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let n = Number(digits[i]);
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
}

export function expiryValid(value: string) {
  const match = value.match(/^(\d{2})\s*\/\s*(\d{2})$/);
  if (!match) return false;
  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);
  if (month < 1 || month > 12) return false;
  const end = new Date(year, month, 0, 23, 59, 59);
  return end.getTime() >= Date.now();
}

export async function activateMonthlySubscription(input: {
  subscriberId: number;
  method: string;
  cardBrand?: string;
  cardLast4?: string;
}) {
  const reference = paymentReference();
  const now = new Date();
  const [current] = await db
    .select()
    .from(subscriptions)
    .where(and(eq(subscriptions.subscriberId, input.subscriberId), eq(subscriptions.status, "active")))
    .orderBy(desc(subscriptions.currentPeriodEnd))
    .limit(1);

  const base = current && current.currentPeriodEnd > now ? current.currentPeriodEnd : now;
  const periodEnd = new Date(base.getTime() + MONTHLY_PLAN.periodDays * 24 * 60 * 60 * 1000);

  if (current) {
    await db
      .update(subscriptions)
      .set({
        status: "active",
        currentPeriodEnd: periodEnd,
        autoRenew: true,
        amountCents: MONTHLY_PLAN.amountCents,
        plan: MONTHLY_PLAN.id,
      })
      .where(eq(subscriptions.id, current.id));
  } else {
    await db.insert(subscriptions).values({
      subscriberId: input.subscriberId,
      plan: MONTHLY_PLAN.id,
      status: "active",
      amountCents: MONTHLY_PLAN.amountCents,
      currency: MONTHLY_PLAN.currency,
      currentPeriodEnd: periodEnd,
      autoRenew: true,
    });
  }

  const [payment] = await db
    .insert(payments)
    .values({
      subscriberId: input.subscriberId,
      reference,
      amountCents: MONTHLY_PLAN.amountCents,
      method: input.method,
      status: "paid",
      cardBrand: input.cardBrand,
      cardLast4: input.cardLast4,
    })
    .returning();

  return { payment, periodEnd, reference };
}

export async function startFreeTrial(subscriberId: number) {
  const existing = await db
    .select({ id: subscriptions.id })
    .from(subscriptions)
    .where(eq(subscriptions.subscriberId, subscriberId))
    .limit(1);
  if (existing.length > 0) return null;

  const periodEnd = new Date(Date.now() + MONTHLY_PLAN.trialDays * 24 * 60 * 60 * 1000);
  await db.insert(subscriptions).values({
    subscriberId,
    plan: "trial",
    status: "trialing",
    amountCents: 0,
    currency: MONTHLY_PLAN.currency,
    currentPeriodEnd: periodEnd,
    autoRenew: false,
  });
  await db.insert(payments).values({
    subscriberId,
    reference: `TRIAL-${paymentReference()}`,
    amountCents: 0,
    method: "7-day trial",
    status: "trial",
  });
  return periodEnd;
}

export async function cancelAutoRenew(subscriberId: number) {
  await db
    .update(subscriptions)
    .set({ autoRenew: false })
    .where(and(eq(subscriptions.subscriberId, subscriberId), eq(subscriptions.status, "active")));
}
