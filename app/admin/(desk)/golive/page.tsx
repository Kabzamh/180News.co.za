export const dynamic = "force-dynamic";

const CHECKS = [
  { item: "Change ADMIN_EMAIL / ADMIN_PASSWORD", done: Boolean(process.env.ADMIN_PASSWORD) },
  { item: "Production DATABASE_URL and HTTPS", done: process.env.NODE_ENV === "production" },
  { item: "PayFast / Stripe keys for live billing", done: Boolean(process.env.PAYFAST_MERCHANT_ID || process.env.STRIPE_SECRET_KEY) },
  { item: "Privacy, terms and POPIA pages", done: true },
  { item: "Cookie / POPIA consent banner", done: true },
  { item: "Staff login no longer shows a password", done: true },
];

export default function GoLivePage() {
  return (
    <div>
      <h1 className="font-serif text-4xl">Go-live checklist</h1>
      <p className="mt-2 text-sm text-white/60">What is in place before 180news.co.za is public.</p>
      <ul className="mt-8 space-y-3">
        {CHECKS.map((row) => (
          <li key={row.item} className="flex items-center gap-3 border border-white/10 px-4 py-3">
            <span className={row.done ? "text-emerald-300" : "text-amber-300"}>{row.done ? "Ready" : "Todo"}</span>
            <span>{row.item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
