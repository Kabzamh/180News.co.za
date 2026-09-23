import Link from "next/link";
import type { HoroscopeReading, ZodiacSign } from "@/lib/horoscope";
import { cn } from "@/lib/utils";

export function SignGlyph({
  sign,
  size = "md",
  active = false,
}: {
  sign: ZodiacSign;
  size?: "sm" | "md" | "lg" | "xl";
  active?: boolean;
}) {
  const box = {
    sm: "h-10 w-10 text-xl",
    md: "h-14 w-14 text-2xl",
    lg: "h-20 w-20 text-4xl",
    xl: "h-24 w-24 text-5xl",
  }[size];
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full font-bold text-white shadow-md",
        box,
      )}
      style={{
        background: `radial-gradient(circle at 32% 28%, ${sign.color}, #1e1b4b 140%)`,
      }}
      aria-hidden="true"
    >
      <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 to-transparent" />
      <span className="relative">{sign.glyph}</span>
      {active && (
        <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-gold text-[0.6rem] text-brand-navy-dark ring-2 ring-white">
          ★
        </span>
      )}
    </span>
  );
}

export function Stars({
  value,
  label,
  color = "#d4a017",
}: {
  value: number;
  label: string;
  color?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
        {label}
      </span>
      <span className="flex gap-0.5" aria-label={`${label}: ${value} of 5`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <svg
            key={i}
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5"
            fill={i <= value ? color : "#e2e8f0"}
          >
            <path d="m12 2 2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17l-6.1 3.4 1.4-6.8L2.2 9l6.9-.7L12 2Z" />
          </svg>
        ))}
      </span>
    </div>
  );
}

/** Compact card for grids and rails. */
export function HoroscopeCard({ reading }: { reading: HoroscopeReading }) {
  const s = reading.sign;
  return (
    <Link
      href={`/horoscopes/${s.slug}`}
      className="card-hover group flex h-full flex-col rounded-sm border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <SignGlyph sign={s} size="md" />
        <span className="text-[0.62rem] font-bold uppercase tracking-wider text-slate-400">
          {s.dateRange}
        </span>
      </div>
      <h3 className="font-headline mt-3 text-lg font-black text-ink group-hover:text-brand-red">
        {s.name}
      </h3>
      <p className="mt-0.5 text-[0.68rem] font-semibold uppercase tracking-wide text-slate-400">
        {s.element} · {s.keyword}
      </p>
      <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-slate-600">
        <span className="font-bold italic text-brand-red">
          “{reading.oneLiner}”
        </span>{" "}
        {reading.overview.split(".")[0]}.
      </p>
      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5">
        <span className="flex items-center gap-1.5 text-[0.68rem] font-bold text-slate-500">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: reading.luckyColor.hex }}
          />
          {reading.luckyColor.name}
        </span>
        <span className="text-[0.68rem] font-black uppercase tracking-wider text-brand-red opacity-0 transition group-hover:opacity-100">
          Read →
        </span>
      </div>
    </Link>
  );
}

/** Tiny glyph-only button for sidebars. */
export function MiniSignButton({
  sign,
  tone = "light",
}: {
  sign: ZodiacSign;
  tone?: "light" | "dark";
}) {
  return (
    <Link
      href={`/horoscopes/${sign.slug}`}
      title={`${sign.name} · ${sign.dateRange}`}
      aria-label={`${sign.name} horoscope`}
      className={cn(
        "group flex flex-col items-center gap-1 rounded-sm py-1.5",
        tone === "dark" ? "hover:bg-white/10" : "hover:bg-slate-50",
      )}
    >
      <span
        className="flex h-10 w-10 items-center justify-center rounded-full text-lg text-white shadow-sm transition group-hover:scale-110"
        style={{
          background: `radial-gradient(circle at 32% 28%, ${sign.color}, #1e1b4b 140%)`,
        }}
      >
        {sign.glyph}
      </span>
      <span
        className={cn(
          "text-[0.6rem] font-bold",
          tone === "dark"
            ? "text-white/70 group-hover:text-brand-gold"
            : "text-slate-500 group-hover:text-brand-red",
        )}
      >
        {sign.name.slice(0, 3)}
      </span>
    </Link>
  );
}
