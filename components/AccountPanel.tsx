"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { AuthUser } from "@/lib/auth";
import type { Payment } from "@/db/schema";
import { formatDate } from "@/lib/utils";

export function AccountPanel({ user, payments }: { user: AuthUser; payments: Payment[] }) {
  const router = useRouter();
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [city, setCity] = useState(user.city);
  const [province, setProvince] = useState(user.province);
  const [bio, setBio] = useState(user.bio);
  const [status, setStatus] = useState("");

  async function save(event: FormEvent) {
    event.preventDefault();
    const response = await fetch("/api/account", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, city, province, bio }),
    });
    const data = (await response.json()) as { ok: boolean; error?: string };
    setStatus(data.ok ? "Profile saved." : data.error || "Could not save.");
    if (data.ok) router.refresh();
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  async function cancel() {
    await fetch("/api/account", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cancel: true }),
    });
    router.refresh();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <form onSubmit={save} className="space-y-4 border border-slate-200 bg-white p-6">
        <h2 className="font-serif text-3xl">Your profile</h2>
        <label className="block text-sm">
          Name
          <input value={name} onChange={(event) => setName(event.target.value)} className="mt-1 w-full border border-slate-300 px-3 py-2" />
        </label>
        <p className="text-sm text-slate-500">{user.email}</p>
        <label className="block text-sm">
          Phone
          <input value={phone} onChange={(event) => setPhone(event.target.value)} className="mt-1 w-full border border-slate-300 px-3 py-2" />
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block text-sm">
            City
            <input value={city} onChange={(event) => setCity(event.target.value)} className="mt-1 w-full border border-slate-300 px-3 py-2" />
          </label>
          <label className="block text-sm">
            Province
            <input value={province} onChange={(event) => setProvince(event.target.value)} className="mt-1 w-full border border-slate-300 px-3 py-2" />
          </label>
        </div>
        <label className="block text-sm">
          About you
          <textarea value={bio} onChange={(event) => setBio(event.target.value)} rows={4} className="mt-1 w-full border border-slate-300 px-3 py-2" />
        </label>
        <button type="submit" className="bg-[#0b2f8a] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white">
          Save profile
        </button>
        {status ? <p className="text-sm text-slate-600">{status}</p> : null}
        <button type="button" onClick={logout} className="block text-sm text-[#8f1520]">
          Sign out
        </button>
      </form>

      <aside className="space-y-5">
        <div className="border border-slate-200 bg-white p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8f1520]">Subscription</p>
          <h2 className="mt-2 font-serif text-3xl">
            {user.onTrial ? "7-day trial" : user.paid ? "Active" : "Not paid"}
          </h2>
          {user.paid && user.periodEnd ? (
            <p className="mt-2 text-sm text-slate-600">
              {user.onTrial
                ? `Your free trial is open until ${formatDate(user.periodEnd)}. Pay R99 to stay on after that.`
                : `Digital Bulletin is live until ${formatDate(user.periodEnd)}.`}
              {user.autoRenew ? " Monthly billing is on." : ""}
            </p>
          ) : (
            <p className="mt-2 text-sm text-slate-600">
              Register for a 7-day trial, then R99 a month for full stories, video and MP3.
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            <a href="/pins" className="border border-slate-300 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em]">
              Pinned stories
            </a>
            <a href="/subscribe" className="bg-[#8f1520] px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white">
              {user.onTrial ? "Pay after trial" : user.paid ? "Renew month" : "Pay monthly"}
            </a>
            {user.paid ? (
              <button type="button" onClick={cancel} className="border border-slate-300 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em]">
                Cancel auto-renew
              </button>
            ) : null}
          </div>
        </div>
        <div className="border border-slate-200 bg-white p-6">
          <h3 className="font-serif text-2xl">Payments</h3>
          <div className="mt-3 space-y-3 text-sm">
            {payments.length === 0 ? (
              <p className="text-slate-600">No payments yet.</p>
            ) : (
              payments.map((payment) => (
                <div key={payment.id} className="border-b border-slate-100 pb-2">
                  <p className="font-semibold">
                    {payment.reference} · R{(payment.amountCents / 100).toFixed(0)}
                  </p>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    {payment.method}
                    {payment.cardBrand ? ` · ${payment.cardBrand} ****${payment.cardLast4}` : ""} · {payment.status}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
