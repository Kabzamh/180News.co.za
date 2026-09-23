import Link from "next/link";
import PremiumBadge from "@/components/subscription/PremiumBadge";
import RestoreForm from "@/components/subscription/RestoreForm";
import { PLAN, trialEndLabel } from "@/lib/subscriptions";

const BENEFITS = [
  "The member Daily Briefing before 7am",
  "Original investigations and long-form explainers",
  "Signed weekly columns from the newsroom",
  "Money & life guides, ad-light reading",
  "Member-only audio and video interviews",
  "The full premium archive — every member piece",
];

export default function Paywall({ compact = false }: { compact?: boolean }) {
  return (
    <div className="relative">
      {/* Soft fade from the blurred preview above */}
      {!compact && <div className="pointer-events-none absolute -top-16 right-0 left-0 h-16 bg-gradient-to-b from-transparent to-white" />}
      <div className="relative overflow-hidden rounded-sm border border-amber-300 bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-900 p-6 text-white shadow-lg sm:p-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(1.5px 1.5px at 20% 30%, #fff 50%, transparent), radial-gradient(1.5px 1.5px at 70% 20%, #fcd34d 50%, transparent), radial-gradient(1px 1px at 40% 70%, #fff 50%, transparent), radial-gradient(1px 1px at 85% 60%, #fff 50%, transparent)",
          }}
        />
        <div className="relative">
          <div className="flex items-center gap-2">
            <PremiumBadge />
            <span className="text-[0.65rem] font-black uppercase tracking-[0.25em] text-brand-gold">
              180° All Access
            </span>
          </div>
          <h2 className="font-headline mt-3 text-2xl font-black leading-tight sm:text-3xl">
            This is an All Access member story
          </h2>
          <p className="mt-2 text-sm font-medium text-white/95">
            You&apos;ve read the free preview. Start your{" "}
            <span className="font-black text-brand-gold">
              7-day free trial
            </span>{" "}
            — then just{" "}
            <span className="font-black text-brand-gold">
              {PLAN.currency}{PLAN.price}/{PLAN.period}
            </span>
            . Cancel any time before {trialEndLabel()} and pay nothing.
          </p>

          {!compact && (
            <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-2 text-xs text-white/90">
                  <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {b}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/subscribe"
              className="rounded-sm bg-brand-gold px-6 py-3 text-sm font-black uppercase tracking-wide text-indigo-950 transition hover:brightness-105"
            >
              Start free trial
            </Link>
            <Link
              href="/premium"
              className="rounded-sm border border-white/30 px-5 py-3 text-xs font-bold uppercase tracking-wide text-white hover:bg-white/10"
            >
              See member stories
            </Link>
          </div>

          <details className="group mt-4 text-xs text-white/90">
            <summary className="cursor-pointer font-bold text-white hover:text-white">
              Already a member? Restore access
            </summary>
            <RestoreForm dark />
          </details>

          <p className="mt-4 text-[0.68rem] font-bold uppercase tracking-wider text-white/75">
            Secure SA billing · Google Pay · Card · Instant EFT · Debit order
          </p>
        </div>
      </div>
    </div>
  );
}
