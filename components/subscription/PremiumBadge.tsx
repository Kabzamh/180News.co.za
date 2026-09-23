import { cn } from "@/lib/utils";

export default function PremiumBadge({
  className,
  size = "sm",
}: {
  className?: string;
  size?: "xs" | "sm";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-sm bg-gradient-to-r from-amber-500 to-yellow-400 font-black uppercase tracking-wider text-amber-950 shadow",
        size === "xs" ? "px-1.5 py-0.5 text-[0.55rem]" : "px-2 py-0.5 text-[0.6rem]",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" className={size === "xs" ? "h-2.5 w-2.5" : "h-3 w-3"} fill="currentColor">
        <path d="M3 17h18l2-10-6 4-5-7-5 7-6-4 2 10Zm0 2h18v2H3v-2Z" />
      </svg>
      Premium
    </span>
  );
}
