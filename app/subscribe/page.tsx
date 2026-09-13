import type { Metadata } from "next";
import Link from "next/link";
import { CheckoutForm } from "@/components/CheckoutForm";
import { getCurrentUser } from "@/lib/auth";
import { MONTHLY_PLAN } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Subscribe monthly",
  description: "Start a 7-day free trial, then R99 a month for full 180 Degrees News stories, video and MP3.",
};

export const dynamic = "force-dynamic";

export default async function SubscribePage() {
  const user = await getCurrentUser();

  return (
    <main className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[1.1fr_0.9fr]">
      <section>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8f1520]">Subscribe</p>
        <h1 className="mt-2 font-serif text-5xl">7 days free, then R99 a month</h1>
        <p className="mt-4 text-lg text-slate-600">
          Register and the full bulletin — stories, video and MP3 — opens for seven days. After the trial, keep it
          for {MONTHLY_PLAN.label}.
        </p>
        <ul className="mt-6 space-y-2 text-sm text-slate-700">
          {MONTHLY_PLAN.perks.map((perk) => (
            <li key={perk}>• {perk}</li>
          ))}
        </ul>
        {user?.paid && user.periodEnd ? (
          <p className="mt-6 border border-slate-200 bg-white p-4 text-sm">
            {user.onTrial
              ? `Your free trial runs until ${formatDate(user.periodEnd)}. Pay now to keep access after that.`
              : `You are paid until ${formatDate(user.periodEnd)}. Another payment adds 30 days.`}
          </p>
        ) : null}
      </section>
      <section className="border border-slate-200 bg-white p-6">
        {!user ? (
          <div>
            <h2 className="font-serif text-3xl">Start your 7-day trial</h2>
            <p className="mt-2 text-sm text-slate-600">Register to unlock the desk for a week. No card needed for the trial.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/register" className="bg-[#8f1520] px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white">
                Start free trial
              </Link>
              <Link href="/signin" className="border border-slate-300 px-4 py-3 text-xs font-bold uppercase tracking-[0.16em]">
                Sign in
              </Link>
            </div>
          </div>
        ) : (
          <>
            <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Paying as {user.email}</p>
            <h2 className="mt-2 font-serif text-3xl">{MONTHLY_PLAN.name}</h2>
            <p className="mt-1 text-slate-600">{MONTHLY_PLAN.label} · Google Pay, card or Instant EFT</p>
            <div className="mt-6">
              <CheckoutForm />
            </div>
          </>
        )}
      </section>
    </main>
  );
}
