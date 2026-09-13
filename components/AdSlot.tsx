import type { Advertisement } from "@/db/schema";
import { getAdForSlot } from "@/lib/ads";
import { classNames } from "@/lib/utils";

const THEMES: Record<string, string> = {
  navy: "from-[#081226] via-[#0b2f8a] to-[#081226] text-white",
  red: "from-[#6d0f18] via-[#8f1520] to-[#3f0a0e] text-white",
  gold: "from-[#3d2a0a] via-[#8a6418] to-[#1f1606] text-white",
  green: "from-[#12351c] via-[#1d5c32] to-[#0c2414] text-white",
  sand: "from-[#2b2116] via-[#6b4f32] to-[#1b140d] text-white",
  blue: "from-[#08243f] via-[#0b4f8a] to-[#06182b] text-white",
};

function frameClass(format: string) {
  switch (format) {
    case "skyscraper":
      return "min-h-[420px] w-full";
    case "rectangle":
      return "min-h-[220px] w-full";
    case "billboard":
      return "min-h-[160px] w-full md:min-h-[180px]";
    case "native":
      return "min-h-[120px] w-full";
    default:
      return "min-h-[90px] w-full md:min-h-[100px]";
  }
}

export function AdCreative({
  ad,
  compact = false,
}: {
  ad: Advertisement;
  compact?: boolean;
}) {
  return (
    <a
      href={`/api/ads/click?id=${ad.id}`}
      className={classNames(
        "relative flex overflow-hidden border border-black/10 bg-gradient-to-r p-4 no-underline shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]",
        THEMES[ad.theme] ?? THEMES.navy,
        frameClass(ad.format),
        ad.format === "rectangle" || ad.format === "skyscraper" ? "flex-col justify-between" : "items-center gap-4",
      )}
    >
      <span className="absolute right-2 top-2 rounded-sm bg-black/35 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.16em] text-white/80">
        Advertisement
      </span>
      <div className={classNames("max-w-3xl", compact && "pr-16")}>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">{ad.advertiser}</p>
        <p className={classNames("mt-1 font-serif leading-tight", ad.format === "leaderboard" ? "text-xl md:text-2xl" : "text-2xl md:text-3xl")}>
          {ad.headline}
        </p>
        {ad.format !== "leaderboard" || !compact ? (
          <p className="mt-1 max-w-xl text-sm text-white/75">{ad.tagline}</p>
        ) : null}
      </div>
      <span className="shrink-0 border border-white/40 bg-white/10 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.14em]">
        {ad.cta}
      </span>
    </a>
  );
}

export async function AdSlot({
  slot,
  className,
  compact = false,
}: {
  slot: string;
  className?: string;
  compact?: boolean;
}) {
  const ad = await getAdForSlot(slot);
  if (!ad) return null;

  return (
    <aside className={classNames("ad-slot", className)} aria-label="Advertisement">
      <AdCreative ad={ad} compact={compact} />
    </aside>
  );
}
