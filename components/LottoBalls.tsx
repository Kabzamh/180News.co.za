export function LottoBalls({
  numbers,
  bonus,
  bonusLabel,
  size = "md",
}: {
  numbers: number[];
  bonus?: number | null;
  bonusLabel?: string;
  size?: "sm" | "md";
}) {
  const ball = size === "sm" ? "h-8 w-8 text-xs" : "h-11 w-11 text-sm";
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {numbers.map((number, index) => (
        <span
          key={`${index}-${number}`}
          className={`${ball} inline-flex items-center justify-center rounded-full bg-[#0b2f8a] font-bold text-white`}
        >
          {String(number).padStart(2, "0")}
        </span>
      ))}
      {bonus != null ? (
        <span className="ml-1 inline-flex items-center gap-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8f1520]">
            {bonusLabel || "+"}
          </span>
          <span
            className={`${ball} inline-flex items-center justify-center rounded-full bg-[#8f1520] font-bold text-white`}
          >
            {String(bonus).padStart(2, "0")}
          </span>
        </span>
      ) : null}
    </div>
  );
}
