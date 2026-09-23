export type ClientQuote = {
  symbol: string;
  name: string;
  short: string;
  group: string;
  price: number;
  change: number;
  changePct: number;
  spark: number[];
  updatedAt: number;
  prefix: string;
  suffix: string;
  decimals: number;
};

export function fmtPrice(q: ClientQuote): string {
  const num = q.price.toLocaleString("en-US", {
    minimumFractionDigits: q.decimals,
    maximumFractionDigits: q.decimals,
  });
  return `${q.prefix}${num}${q.suffix ? ` ${q.suffix}` : ""}`;
}

export function fmtPct(q: ClientQuote): string {
  const sign = q.changePct >= 0 ? "+" : "−";
  return `${sign}${Math.abs(q.changePct).toFixed(2)}%`;
}

export function fmtTime(ts: number): string {
  return new Date(ts).toLocaleTimeString("en-ZA", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
