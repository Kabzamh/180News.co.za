import Link from "next/link";
import PremiumBadge from "@/components/subscription/PremiumBadge";
import { getAccess } from "@/lib/subscriptions";
import { listPremium } from "@/lib/queries";
import { PREMIUM_KIND_META, type PremiumKind } from "@/lib/premium/types";

export default async function PremiumWidget() {
  const [access, pieces, briefings] = await Promise.all([
    getAccess(),
    listPremium("investigation", 3),
    listPremium("briefing", 1),
  ]);

  if (!access.subscribed) {
    return (
      <section className="relative overflow-hidden rounded-sm bg-gradient-to-br from-indigo-950 to-purple-900 p-4 text-white shadow-sm">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(1.5px 1.5px at 30% 20%, #fcd34d 50%, transparent), radial-gradient(1px 1px at 75% 60%, #fff 50%, transparent)",
          }}
        />
        <div className="relative">
          <PremiumBadge />
          <h3 className="font-headline mt-2 text-lg font-black leading-tight">
            7 days free, then R99/month
          </h3>
          <p className="mt-1 text-xs text-white/75">
            Investigations, the Daily Briefing, columns and money guides.
          </p>
          {briefings[0] && (
            <p className="mt-3 rounded bg-white/10 px-2.5 py-1.5 text-[0.7rem] italic text-white/85">
              Today: {briefings[0].title.split("—")[0].trim()}
            </p>
          )}
          <Link
            href="/subscribe"
            className="mt-3 block rounded-sm bg-brand-gold py-2 text-center text-xs font-black uppercase tracking-wide text-indigo-950 hover:brightness-105"
          >
            Start free trial
          </Link>
          <Link
            href="/premium"
            className="mt-2 block text-center text-[0.65rem] font-bold uppercase tracking-wider text-white/70 hover:text-white"
          >
            Browse the library →
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-sm border border-indigo-200 bg-white shadow-sm">
      <div className="flex items-center justify-between bg-gradient-to-r from-indigo-950 to-purple-900 px-4 py-2.5 text-white">
        <span className="flex items-center gap-1.5 text-[0.7rem] font-black uppercase tracking-wider">
          <PremiumBadge size="xs" /> All Access
        </span>
        <Link href="/account" className="text-[0.62rem] font-bold uppercase text-brand-gold">
          Account
        </Link>
      </div>
      <div className="divide-y divide-slate-100">
        {briefings[0] && (
          <Link
            href={`/article/${briefings[0].slug}`}
            className="block bg-indigo-50/60 px-4 py-3 hover:bg-indigo-50"
          >
            <p className="text-[0.6rem] font-black uppercase tracking-widest text-indigo-700">
              Today&apos;s briefing
            </p>
            <p className="mt-0.5 line-clamp-2 text-xs font-bold text-ink">
              {briefings[0].title.split("—")[0].trim()}
            </p>
          </Link>
        )}
        {pieces.map((p) => (
          <Link
            key={p.id}
            href={`/article/${p.slug}`}
            className="flex items-start gap-2 px-4 py-2.5 hover:bg-slate-50"
          >
            <span className="mt-0.5 text-indigo-800">
              {PREMIUM_KIND_META[(p.premiumKind as PremiumKind) ?? "investigation"]?.icon ?? "🔍"}
            </span>
            <span className="line-clamp-2 text-xs font-bold leading-snug text-ink">
              {p.title}
            </span>
          </Link>
        ))}
      </div>
      <Link
        href="/premium"
        className="block border-t border-slate-100 px-4 py-2.5 text-center text-[0.65rem] font-black uppercase tracking-wider text-indigo-800 hover:bg-slate-50"
      >
        All member stories →
      </Link>
    </section>
  );
}
