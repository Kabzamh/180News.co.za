import { cn } from "@/lib/utils";

function Ball({
  n,
  color,
  size = "md",
}: {
  n: number;
  color: string;
  size?: "sm" | "md" | "lg";
}) {
  const dims =
    size === "lg"
      ? "h-12 w-12 text-lg sm:h-14 sm:w-14"
      : size === "sm"
        ? "h-8 w-8 text-[0.8rem]"
        : "h-10 w-10 text-sm sm:h-11 sm:w-11";
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full font-black text-white shadow-md",
        dims,
      )}
      style={{
        background: `radial-gradient(circle at 32% 28%, ${color} 0%, ${color} 55%, rgba(0,0,0,0.35) 140%)`,
      }}
    >
      <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/35 to-transparent opacity-70" />
      <span className="relative">{String(n).padStart(2, "0")}</span>
    </span>
  );
}

export default function LottoBalls({
  numbers,
  bonus,
  ballColor,
  bonusColor,
  bonusLabel = "Bonus",
  size = "md",
}: {
  numbers: number[];
  bonus?: number | null;
  ballColor: string;
  bonusColor: string;
  bonusLabel?: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {numbers.map((n, i) => (
        <Ball key={`${n}-${i}`} n={n} color={ballColor} size={size} />
      ))}
      {bonus != null && (
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black text-slate-300">+</span>
          <Ball n={bonus} color={bonusColor} size={size} />
          <span className="text-[0.6rem] font-black uppercase tracking-widest text-slate-400">
            {bonusLabel}
          </span>
        </div>
      )}
    </div>
  );
}
