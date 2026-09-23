"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import GooglePayButton from "./GooglePayButton";

const BANKS = [
  "Capitec", "FNB", "Standard Bank", "Absa", "Nedbank",
  "TymeBank", "African Bank", "Discovery Bank",
];

type Method = "gpay" | "card" | "eft" | "debit";

function GPayMark() {
  return (
    <svg viewBox="0 0 48 20" className="h-4 w-auto" aria-label="Google Pay">
      <path fill="#4285F4" d="M15.4 9.7h-5v3h2.9c-.3 1.4-1.6 2.4-2.9 2.4a3.2 3.2 0 0 1 0-6.4c.8 0 1.6.3 2.1.8l2.1-2.1A6.1 6.1 0 1 0 5 15.1a6 6 0 0 0 6-6.2c0-.4 0-.8-.1-1.2h4.5v2Z" />
      <path fill="#EA4335" d="M20.9 7.1c-1.7 0-2.8 1.4-2.8 3.2s1.2 3.2 2.9 3.2c.8 0 1.4-.3 1.8-.7v.6c0 1-.6 1.6-1.6 1.6-.6 0-1-.3-1.3-.8l-1.9.8c.5 1 1.5 1.7 3.2 1.7 1.9 0 3.2-1.1 3.2-3.4V7.6h-2.2v.6c-.4-.5-1-1.1-1.3-1.1Zm.2 4.7c-1 0-1.6-.8-1.6-1.6s.6-1.6 1.6-1.6 1.5.8 1.5 1.6-.6 1.6-1.5 1.6Z" />
      <path fill="#FBBC04" d="M33.3 12.8c-.6-.4-1.5-.7-2.4-.9-1.2-.3-1.9-.6-1.9-1.1 0-.5.5-.8 1.2-.8.8 0 1.7.3 2.4.9l1.7-1.8c-.9-.9-2.3-1.3-3.9-1.3-1.5 0-3.4.9-3.4 2.9 0 1.8 1.4 2.4 2.9 2.8 1.2.3 1.9.6 1.9 1.2 0 .5-.6.9-1.5.9-1 0-2-.5-2.7-1.1l-1.8 1.8c1 1 2.4 1.5 4.2 1.5 2.4 0 3.7-1.2 3.7-2.9 0-1.8-1.3-2.3-2.6-2.7Z" />
      <path fill="#34A853" d="M40.2 4.2h-2.3v9.2h2.4V4.2Z" />
      <path fill="#4285F4" d="M39 1.7a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8Z" />
      <path fill="#34A853" d="M47 7.1c-1.8 0-3 1.4-3 3.3s1.3 3.2 3.2 3.2c1 0 1.6-.4 2-.8v.6h2.3V9.8c0-2.3-1.8-2.7-3-2.7Zm.3 4.7c-.9 0-1.5-.7-1.5-1.5s.6-1.5 1.5-1.5c.8 0 1.4.7 1.4 1.5 0 .8-.6 1.5-1.4 1.5Z" />
    </svg>
  );
}

const METHODS: {
  id: Method;
  name: string;
  blurb: string;
  icon: React.ReactNode;
}[] = [
  { id: "gpay", name: "Google Pay", blurb: "Fast checkout", icon: <GPayMark /> },
  { id: "card", name: "Card", blurb: "Visa & Mastercard", icon: "💳" },
  { id: "eft", name: "Instant EFT", blurb: "All SA banks", icon: "🏦" },
  { id: "debit", name: "Debit order", blurb: "Monthly collection", icon: "📅" },
];

function formatCard(v: string) {
  return v
    .replace(/\D/g, "")
    .slice(0, 19)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}
function formatExpiry(v: string) {
  const digits = v.replace(/\D/g, "").slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
}

export default function CheckoutForm() {
  const router = useRouter();
  const [method, setMethod] = useState<Method>("card");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvv, setCvv] = useState("");
  const [bank, setBank] = useState("");
  const [authorize, setAuthorize] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const detailsReady =
    fullName.trim().length >= 2 && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

  async function startTrial(extra?: Partial<{
    card: string;
    exp: string;
    cvv: string;
    bank: string;
    authorize: boolean;
    last4: string;
    network: string;
  }>) {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/subscription/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          method,
          card: (extra?.card ?? card).replace(/\s/g, ""),
          exp: extra?.exp ?? exp,
          cvv: extra?.cvv ?? cvv,
          bank: extra?.bank ?? bank,
          last4: extra?.last4 ?? "",
          network: extra?.network ?? "",
          authorize:
            extra?.authorize ??
            (method === "debit" ? authorize : true),
        }),
      });
      const data = await res.json();
      if (data.ok) {
        router.push("/account?welcome=1");
      } else {
        setError(data.error || "Checkout failed.");
        setLoading(false);
      }
    } catch {
      setError("Network error — please try again.");
      setLoading(false);
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    await startTrial();
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs font-black uppercase tracking-wide text-slate-700">
            Full name
          </span>
          <input
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-sm border-2 border-slate-300 bg-white px-3 py-2.5 text-sm text-ink placeholder:text-slate-500 focus:border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            placeholder="Thandi Mokoena"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-black uppercase tracking-wide text-slate-700">
            Email
          </span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-sm border-2 border-slate-300 bg-white px-3 py-2.5 text-sm text-ink placeholder:text-slate-500 focus:border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            placeholder="you@email.co.za"
          />
        </label>
      </div>

      {/* Method tabs */}
      <div>
        <span className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-700">
          Payment method
        </span>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {METHODS.map((m) => (
            <button
              type="button"
              key={m.id}
              onClick={() => setMethod(m.id)}
              className={cn(
                "flex min-h-[74px] flex-col items-center justify-center rounded-sm border-2 px-2 py-2.5 text-center transition",
                method === m.id
                  ? "border-indigo-900 bg-indigo-50"
                  : "border-slate-200 bg-white hover:border-slate-300",
              )}
            >
              <span className="flex h-6 items-center justify-center">{m.icon}</span>
              <span className="mt-1 block text-[0.68rem] font-black leading-tight text-ink">
                {m.name}
              </span>
              <span className="block text-[0.6rem] font-semibold text-slate-600">{m.blurb}</span>
            </button>
          ))}
        </div>
      </div>

      {method === "gpay" && (
        <GooglePayButton
          busy={loading}
          detailsReady={detailsReady}
          onMissingDetails={() =>
            setError("Enter your name and email above first, then tap Google Pay.")
          }
          onError={(msg) => setError(msg)}
          onAuthorized={(data) =>
            startTrial({
              last4: data.last4 ?? "",
              network: data.network,
            })
          }
        />
      )}

      {method === "card" && (
        <div className="grid gap-4 rounded-sm bg-indigo-50/60 p-4 ring-1 ring-indigo-100 sm:grid-cols-3">
          <label className="block sm:col-span-3">
            <span className="mb-1 block text-xs font-black uppercase tracking-wide text-slate-700">
              Card number
            </span>
            <input
              inputMode="numeric"
              required
              value={card}
              onChange={(e) => setCard(formatCard(e.target.value))}
              className="w-full rounded-sm border-2 border-slate-300 bg-white px-3 py-2.5 text-sm text-ink focus:border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 tracking-widest"
              placeholder="0000 0000 0000 0000"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-black uppercase tracking-wide text-slate-700">
              Expiry
            </span>
            <input
              inputMode="numeric"
              required
              value={exp}
              onChange={(e) => setExp(formatExpiry(e.target.value))}
              className="w-full rounded-sm border-2 border-slate-300 bg-white px-3 py-2.5 text-sm text-ink focus:border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="MM/YY"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-black uppercase tracking-wide text-slate-700">
              CVV
            </span>
            <input
              inputMode="numeric"
              required
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
              className="w-full rounded-sm border-2 border-slate-300 bg-white px-3 py-2.5 text-sm text-ink focus:border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="123"
            />
          </label>
          <div className="flex items-center justify-center sm:col-span-1">
            <span className="text-[0.65rem] font-bold uppercase text-slate-600">
              Visa · Mastercard · 3-D Secure
            </span>
          </div>
        </div>
      )}

      {(method === "eft" || method === "debit") && (
        <div className="space-y-3 rounded-sm bg-indigo-50/60 p-4 ring-1 ring-indigo-100">
          <label className="block">
            <span className="mb-1 block text-xs font-black uppercase tracking-wide text-slate-700">
              {method === "eft" ? "Pay from" : "Bank account"}
            </span>
            <select
              required
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              className="w-full rounded-sm border-2 border-slate-300 bg-white px-3 py-2.5 text-sm text-ink focus:border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 font-semibold"
            >
              <option value="">Select your bank…</option>
              {BANKS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </label>
          {method === "eft" ? (
            <p className="text-xs font-medium leading-relaxed text-slate-700">
              You&apos;ll approve the first R99 charge with your bank at the end
              of your 7-day free trial. Nothing is debited today and you can
              cancel before then at no cost.
            </p>
          ) : (
            <label className="flex items-start gap-2.5 text-xs font-medium leading-relaxed text-slate-700">
              <input
                type="checkbox"
                checked={authorize}
                onChange={(e) => setAuthorize(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-indigo-900"
                required
              />
              <span>
                I authorise 180 Degrees News to collect R99 per month from my{" "}
                {bank || "bank"} account after the 7-day free trial, recurring on
                or around the same date each month. I may cancel any time.
              </span>
            </label>
          )}
        </div>
      )}

      {error && (
        <p className="rounded-sm bg-red-50 px-3 py-2 text-sm font-bold text-red-700">
          {error}
        </p>
      )}

      {method !== "gpay" && (
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-sm bg-gradient-to-r from-amber-500 to-yellow-400 px-6 py-3.5 text-sm font-black uppercase tracking-wide text-indigo-950 shadow-lg shadow-amber-500/30 ring-1 ring-amber-700/20 transition hover:brightness-105 disabled:opacity-60"
        >
          {loading ? "Setting up your trial…" : "Start 7-day free trial"}
        </button>
      )}
      <p className="text-center text-[0.68rem] font-medium leading-relaxed text-slate-600">
        Free for 7 days, then R99/month. Cancel during the trial and pay nothing.
        Payments are processed securely by South African payment partners; this
        demo checkout does not charge your card.
      </p>
    </form>
  );
}
