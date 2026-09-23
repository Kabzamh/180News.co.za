import Link from "next/link";
import { cn } from "@/lib/utils";

/** Dotted-globe mark echoing the dotted African-map identity. */
function GlobeMark({ className }: { className?: string }) {
  const dots: { cx: number; cy: number; r: number; red?: boolean }[] = [];
  const step = 4.1;
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      const dx = x - 4;
      const dy = y - 4;
      const dist = dx * dx + dy * dy;
      if (dist <= 17.2) {
        dots.push({
          cx: 3.2 + x * step,
          cy: 3.2 + y * step,
          r: dist > 13 ? 1.05 : 1.45,
        });
      }
    }
  }
  // Mark the southern tip red for a brand accent.
  dots.filter((d) => d.cx > 24 && d.cy > 27).forEach((d) => (d.red = true));
  return (
    <svg viewBox="0 0 36 36" className={className} aria-hidden="true">
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.cx}
          cy={d.cy}
          r={d.r}
          fill={d.red ? "#8c0e0e" : "#0c1870"}
        />
      ))}
      <path
        d="M30 6 A15 15 0 0 1 30 30"
        fill="none"
        stroke="#8c0e0e"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Logo({
  variant = "dark",
  className,
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const titleColor = variant === "light" ? "text-white" : "text-brand-navy";
  const redColor = "text-brand-red";
  return (
    <Link href="/" className={cn("flex items-center gap-2.5", className)} aria-label="180 Degrees News home">
      <GlobeMark className="h-10 w-10 shrink-0 sm:h-11 sm:w-11" />
      <span className="flex flex-col leading-none">
        <span className="font-headline text-[1.7rem] font-black tracking-tight sm:text-[1.95rem]">
          <span className={redColor}>180</span>
          <span className={cn(redColor, "text-[1.1em]")}>°</span>
          <span className={cn(titleColor, "ml-1.5")}>NEWS</span>
        </span>
        <span
          className={cn(
            "mt-0.5 text-[0.58rem] font-bold uppercase tracking-[0.28em]",
            variant === "light" ? "text-white/70" : "text-brand-navy/70",
          )}
        >
          South Africa · All Angles
        </span>
        <span className="mt-1 h-[3px] w-full rounded-full bg-brand-red" />
      </span>
    </Link>
  );
}
