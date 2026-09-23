import { cn } from "@/lib/utils";

export function initials(name: string): string {
  // Desk names like "News Desk" → ND.
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

export default function Avatar({
  name,
  color = "#0c1870",
  size = "md",
  className,
}: {
  name: string;
  color?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const dims = {
    sm: "h-9 w-9 text-xs",
    md: "h-14 w-14 text-base",
    lg: "h-20 w-20 text-2xl",
    xl: "h-24 w-24 text-3xl",
  }[size];
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full font-black text-white ring-2 ring-white shadow-md",
        dims,
        className,
      )}
      style={{
        background: `radial-gradient(circle at 30% 25%, ${color}, #070e44 130%)`,
      }}
      aria-hidden="true"
    >
      <span className="absolute inset-0 bg-gradient-to-b from-white/25 to-transparent" />
      <span className="relative tracking-wide">{initials(name)}</span>
    </span>
  );
}
