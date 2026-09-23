"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

type Sub = {
  email: string;
  fullName: string | null;
  status: string;
  paymentMethod: string;
  paymentLabel: string | null;
  trialEndsAt: string;
  currentPeriodEnd: string;
};

export default function ManageSubscription({ sub }: { sub: Sub }) {
  const router = useRouter();
  const params = useSearchParams();
  const welcome = params.get("welcome") === "1";
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const isTrialing = sub.status === "trialing";

  async function cancel() {
    setBusy(true);
    try {
      await fetch("/api/subscription/cancel", { method: "POST" });
      router.push("/subscribe?cancelled=1");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      {welcome && (
        <div className="mb-5 rounded-sm border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
          🎉 Welcome to 180° All Access — your 7-day free trial has started. No
          charge today.
        </div>
      )}
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-sm border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
          <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-indigo-900">
            Current plan
          </p>
          <h2 className="font-headline mt-1 text-2xl font-black text-ink">
            180° All Access
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Row label="Status">
              <span
                className={`rounded-full px-2.5 py-0.5 text-[0.65rem] font-black uppercase ${
                  isTrialing
                    ? "bg-amber-100 text-amber-800"
                    : "bg-emerald-100 text-emerald-800"
                }`}
              >
                {isTrialing ? "Free trial" : "Active"}
              </span>
            </Row>
            <Row label="Email">{sub.email}</Row>
            <Row label="Payment method">{sub.paymentLabel ?? "—"}</Row>
            <Row label="Plan price">R99 / month</Row>
            <Row label="Trial ends">
              {new Date(sub.trialEndsAt).toLocaleDateString("en-ZA", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </Row>
            <Row label={isTrialing ? "First charge" : "Next billing"}>
              R99 on{" "}
              {new Date(
                isTrialing ? sub.trialEndsAt : sub.currentPeriodEnd,
              ).toLocaleDateString("en-ZA", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </Row>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-100 pt-5">
            <Link
              href="/premium"
              className="rounded-sm bg-indigo-900 px-5 py-2.5 text-xs font-black uppercase tracking-wide text-white hover:bg-indigo-800"
            >
              Read member stories
            </Link>
            {!confirming ? (
              <button
                onClick={() => setConfirming(true)}
                className="rounded-sm border border-slate-300 px-5 py-2.5 text-xs font-black uppercase tracking-wide text-slate-600 hover:bg-slate-50"
              >
                Cancel membership
              </button>
            ) : (
              <div className="flex items-center gap-2 rounded-sm bg-red-50 px-4 py-2">
                <span className="text-xs font-bold text-red-700">
                  Cancel now? You&apos;ll keep access until the period ends.
                </span>
                <button
                  onClick={cancel}
                  disabled={busy}
                  className="rounded-sm bg-red-600 px-3 py-1.5 text-[0.65rem] font-black uppercase text-white disabled:opacity-60"
                >
                  {busy ? "…" : "Confirm"}
                </button>
                <button
                  onClick={() => setConfirming(false)}
                  className="rounded-sm border border-slate-300 px-3 py-1.5 text-[0.65rem] font-black uppercase"
                >
                  Keep
                </button>
              </div>
            )}
          </div>
        </div>

        <aside className="rounded-sm bg-gradient-to-br from-indigo-950 to-purple-900 p-5 text-white shadow-sm">
          <h3 className="font-headline text-base font-black uppercase text-brand-gold">
            What&apos;s included
          </h3>
          <ul className="mt-3 space-y-2 text-xs text-white/85">
            {[
              "All premium investigations",
              "Weekly politics & money briefings",
              "Member podcasts and interviews",
              "Ad-light reading",
              "Cancel any time",
            ].map((b) => (
              <li key={b} className="flex gap-2">
                <span className="text-brand-gold">✓</span> {b}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[0.62rem] font-black uppercase tracking-widest text-slate-400">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-bold text-ink">{children}</p>
    </div>
  );
}
