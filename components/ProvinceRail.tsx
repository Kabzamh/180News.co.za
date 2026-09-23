import Link from "next/link";
import { PROVINCES } from "@/lib/constants";

export default function ProvinceRail({
  counts,
}: {
  counts: Record<string, number>;
}) {
  return (
    <section>
      <div className="mb-4 flex items-end justify-between gap-4 border-b-2 border-brand-navy pb-2">
        <div className="flex items-center gap-2.5">
          <span className="h-6 w-1.5 rounded-sm bg-brand-navy" />
          <h2 className="font-headline text-xl font-black uppercase tracking-wide sm:text-2xl">
            Provincial &amp; Regional
          </h2>
        </div>
        <Link
          href="/local"
          className="text-xs font-bold uppercase tracking-wide text-brand-navy hover:underline"
        >
          Local hub +
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
        {PROVINCES.map((p) => {
          const count = counts[p.slug] ?? 0;
          return (
            <Link
              key={p.slug}
              href={`/province/${p.slug}`}
              className="card-hover group rounded-sm border border-slate-200 bg-white p-3.5"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-headline text-base font-black text-brand-navy group-hover:text-brand-red">
                  {p.name}
                </h3>
                <span className="rounded-full bg-brand-navy/10 px-2 py-0.5 text-[0.65rem] font-bold text-brand-navy">
                  {count} {count === 1 ? "story" : "stories"}
                </span>
              </div>
              <p className="mt-0.5 text-[0.7rem] font-medium uppercase tracking-wide text-slate-400">
                {p.capital}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
