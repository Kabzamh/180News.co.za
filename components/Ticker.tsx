import Link from "next/link";
import type { Article } from "@/db/schema";

/** Auto-scrolling breaking / latest news ticker. */
export default function Ticker({ articles }: { articles: Article[] }) {
  if (!articles.length) return null;
  const items = [...articles, ...articles];
  return (
    <div className="marquee-wrap flex overflow-hidden border-b border-brand-red-dark bg-brand-red text-white">
      <div className="flex shrink-0 items-center gap-2 bg-brand-red-dark px-3 py-2 text-xs font-black uppercase tracking-widest">
        <span className="animate-live h-2 w-2 rounded-full bg-brand-gold" />
        Breaking
      </div>
      <div className="relative flex-1 overflow-hidden">
        <div className="animate-marquee flex w-max items-center whitespace-nowrap py-2">
          {items.map((a, i) => (
            <Link
              key={`${a.id}-${i}`}
              href={`/article/${a.slug}`}
              className="mx-6 flex items-center gap-2 text-sm font-medium text-white/95 hover:text-brand-gold"
            >
              <span className="text-brand-gold">●</span>
              {a.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
