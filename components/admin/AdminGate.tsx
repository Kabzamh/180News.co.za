"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import AdminConsole from "@/components/admin/AdminConsole";
import {
  adminHeaders,
  clearAdminKey,
  getAdminKey,
  setAdminKey,
} from "@/components/admin/admin-storage";

type Phase = "checking" | "locked" | "authed";

export default function AdminGate() {
  const [phase, setPhase] = useState<Phase>("checking");
  const [keyValue, setKeyValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // On load, try to validate a key stored on this device (works even if
  // cookies are blocked by the browser/webview).
  useEffect(() => {
    const stored = getAdminKey();
    if (!stored) {
      setPhase("locked");
      return;
    }
    fetch("/api/admin/verify", { method: "POST", headers: adminHeaders() })
      .then((r) => (r.ok ? setPhase("authed") : setPhase("locked")))
      .catch(() => setPhase("locked"));
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const key = keyValue.trim();
    setLoading(true);
    setError("");
    try {
      // Sets an httpOnly session cookie where the browser allows it…
      const login = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });
      // …and independently confirm the key works via header auth, which
      // doesn't depend on the cookie being stored at all.
      const verify = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "x-admin-key": key },
      });

      if (login.ok || verify.ok) {
        setAdminKey(key);
        setPhase("authed");
        return;
      }
      const data = login.ok ? null : await login.json().catch(() => null);
      setError(data?.error || "Incorrect newsroom key.");
    } catch {
      setError("Could not reach the newsroom server.");
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    clearAdminKey();
    fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    setKeyValue("");
    setPhase("locked");
  }

  if (phase === "authed") {
    return <AdminConsole onLogout={logout} />;
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-lg bg-white p-8 shadow-xl ring-1 ring-slate-200">
          <div className="flex justify-center">
            <Logo variant="light" className="rounded-sm bg-white p-1" />
          </div>
          <div className="mt-6 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-navy/5 px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.25em] text-brand-navy">
              🔒 Restricted
            </span>
            <h1 className="font-headline mt-3 text-2xl font-black uppercase text-brand-navy">
              Newsroom console
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              This area is for the 180 Degrees News editorial team. Enter the
              newsroom access key to continue.
            </p>
          </div>

          {phase === "checking" && (
            <div className="mt-6 flex justify-center">
              <div className="h-7 w-7 animate-spin rounded-full border-4 border-brand-navy/20 border-t-brand-navy" />
            </div>
          )}

          <form onSubmit={submit} className="mt-6 space-y-4" hidden={phase === "checking"}>
            <label className="block">
              <span className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
                Access key
              </span>
              <input
                type="password"
                required
                autoFocus
                value={keyValue}
                onChange={(e) => setKeyValue(e.target.value)}
                className="w-full rounded-md border-2 border-slate-300 bg-white px-3.5 py-2.5 text-sm focus:border-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-navy/20"
                placeholder="Paste the newsroom access key"
                autoComplete="current-password"
              />
            </label>
            {error && (
              <p className="rounded-sm bg-red-50 px-3 py-2 text-sm font-bold text-red-700">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-brand-red px-5 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-brand-red-dark disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <div className="mt-6 border-t border-slate-100 pt-4 text-center">
            <p className="text-xs text-slate-500">
              Not part of the newsroom?{" "}
              <a href="/" className="font-bold text-brand-red hover:underline">
                Return to the front page
              </a>
            </p>
          </div>
        </div>
        <p className="mt-4 text-center text-[0.65rem] uppercase tracking-wider text-slate-400">
          Access attempts are logged · Session expires after 12 hours
        </p>
      </div>
    </div>
  );
}
