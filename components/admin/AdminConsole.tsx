"use client";

import { useState } from "react";
import Link from "next/link";
import { CATEGORIES, PROVINCES } from "@/lib/constants";
import { TEAM } from "@/lib/team";
import {
  adminHeaders,
  clearAdminKey,
  getAdminKey,
} from "@/components/admin/admin-storage";
import MediaUpload from "@/components/admin/MediaUpload";
import AdManager from "@/components/admin/AdManager";

type SyncOutcome = {
  ok: boolean;
  seededDeskArticles?: number;
  premiumSeeded?: number;
  feeds?: {
    added: number;
    failed: number;
    skipped: number;
    sources: { name: string; status: string; added: number }[];
  };
  totalArticles?: number;
  finishedAt?: string;
  error?: string;
};

export default function AdminConsole({
  onLogout,
}: {
  onLogout?: () => void;
}) {
  const [syncing, setSyncing] = useState(false);
  const [outcome, setOutcome] = useState<SyncOutcome | null>(null);

  const [lottoSyncing, setLottoSyncing] = useState(false);
  const [lottoOutcome, setLottoOutcome] = useState<{
    ok: boolean;
    upserted?: number;
    articles?: number;
    errors?: string[];
    error?: string;
  } | null>(null);

  async function syncLotto() {
    setLottoSyncing(true);
    setLottoOutcome(null);
    try {
      const res = await fetch("/api/lotto/sync", { method: "POST", headers: adminHeaders() });
      setLottoOutcome(await res.json());
    } catch {
      setLottoOutcome({ ok: false, error: "Lotto sync request failed" });
    } finally {
      setLottoSyncing(false);
    }
  }

  const [mediaSyncing, setMediaSyncing] = useState(false);
  const [mediaOutcome, setMediaOutcome] = useState<{
    ok: boolean;
    videos?: number;
    audio?: number;
    errors?: string[];
    error?: string;
  } | null>(null);

  async function syncMedia() {
    setMediaSyncing(true);
    setMediaOutcome(null);
    try {
      const res = await fetch("/api/media/sync", { method: "POST", headers: adminHeaders() });
      setMediaOutcome(await res.json());
    } catch {
      setMediaOutcome({ ok: false, error: "Media sync request failed" });
    } finally {
      setMediaSyncing(false);
    }
  }

  const [premiumSyncing, setPremiumSyncing] = useState(false);
  const [premiumOutcome, setPremiumOutcome] = useState<{
    ok: boolean;
    inserted?: number;
    error?: string;
  } | null>(null);

  async function syncPremium() {
    setPremiumSyncing(true);
    setPremiumOutcome(null);
    try {
      const res = await fetch("/api/premium/seed", { method: "POST", headers: adminHeaders() });
      setPremiumOutcome(await res.json());
    } catch {
      setPremiumOutcome({ ok: false, error: "Premium sync failed" });
    } finally {
      setPremiumSyncing(false);
    }
  }

  const [form, setForm] = useState({
    title: "",
    summary: "",
    content: "",
    category: "national",
    province: "",
    region: "",
    author: "News Desk",
    imageUrl: "",
    mediaUrl: "",
    tags: "",
    isBreaking: false,
    featured: false,
    isPremium: false,
  });
  const [publishing, setPublishing] = useState(false);
  const [publishedSlug, setPublishedSlug] = useState<string | null>(null);
  const [formError, setFormError] = useState("");

  async function syncNow() {
    setSyncing(true);
    setOutcome(null);
    try {
      const res = await fetch("/api/sync", { method: "POST", headers: adminHeaders() });
      setOutcome(await res.json());
    } catch {
      setOutcome({ ok: false, error: "Sync request failed" });
    } finally {
      setSyncing(false);
    }
  }

  async function logout() {
    clearAdminKey();
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    if (onLogout) onLogout(); else window.location.assign("/admin");
  }

  async function publish(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    setPublishedSlug(null);
    setPublishing(true);
    try {
      const res = await fetch("/api/admin/article", {
        method: "POST",
        headers: adminHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.ok) {
        setPublishedSlug(data.article.slug);
        setForm((f) => ({
          ...f,
          title: "",
          summary: "",
          content: "",
          imageUrl: "",
          mediaUrl: "",
          tags: "",
          isBreaking: false,
        }));
      } else {
        setFormError(data.error || "Failed to publish");
      }
    } catch {
      setFormError("Network error while publishing");
    } finally {
      setPublishing(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-3 py-8 sm:px-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-red">
            180° Newsroom · Signed in
          </p>
          <h1 className="font-headline text-3xl font-black uppercase text-brand-navy">
            Editorial Console
          </h1>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <Link href="/" className="rounded-sm border border-slate-300 bg-white px-3 py-2 font-bold text-brand-navy">
            Front page
          </Link>
          <Link href="/sources" className="rounded-sm border border-slate-300 bg-white px-3 py-2 font-bold text-brand-navy">
            Sources
          </Link>
          <a
            href={
              getAdminKey()
                ? `/api/rss?key=${encodeURIComponent(getAdminKey() as string)}`
                : "/api/rss"
            }
            target="_blank"
            rel="noreferrer"
            className="rounded-sm border border-slate-300 bg-white px-3 py-2 font-bold text-brand-navy"
          >
            Internal RSS
          </a>
          <button
            onClick={logout}
            className="rounded-sm bg-slate-800 px-3 py-2 font-bold text-white hover:bg-slate-900"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Sync */}
      <section className="mt-6 rounded-sm bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-headline text-xl font-black uppercase">
              RSS Wire Synchronisation
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Pull the latest headlines from South African newsrooms, plus
              lotto, media and premium content. Stories are categorised and
              geotagged automatically.
            </p>
          </div>
          <button
            onClick={syncNow}
            disabled={syncing}
            className="rounded-sm bg-brand-red px-5 py-2.5 text-sm font-black uppercase tracking-wide text-white hover:bg-brand-red-dark disabled:opacity-60"
          >
            {syncing ? "Syncing everything…" : "Run full sync"}
          </button>
        </div>

        <div className="mt-3 space-y-1 rounded bg-slate-50 p-3 font-mono text-[0.7rem] text-slate-500">
          <p>
            Cron / scheduler:{" "}
            <span className="text-brand-navy">GET /api/sync?key=YOUR_KEY</span>
          </p>
          <p>
            Internal RSS (session-authenticated in console):{" "}
            <span className="text-brand-navy">/api/rss</span>
          </p>
        </div>

        {outcome && (
          <div className="mt-4">
            {outcome.ok ? (
              <>
                <div className="grid gap-3 sm:grid-cols-4">
                  <StatBox label="Desk articles seeded" value={outcome.seededDeskArticles ?? 0} />
                  <StatBox label="New wire stories" value={outcome.feeds?.added ?? 0} />
                  <StatBox label="Premium pieces" value={outcome.premiumSeeded ?? 0} />
                  <StatBox label="Total articles live" value={outcome.totalArticles ?? 0} />
                </div>
                <ul className="mt-4 divide-y divide-slate-100 rounded border border-slate-200 text-xs">
                  {outcome.feeds?.sources.map((s) => (
                    <li key={s.name} className="flex items-center justify-between px-3 py-2">
                      <span className="font-semibold">{s.name}</span>
                      <span className="flex items-center gap-3">
                        <span className="text-slate-500">+{s.added} new</span>
                        <span
                          className={`rounded-full px-2 py-0.5 font-bold ${
                            s.status === "ok"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          {s.status}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="rounded bg-red-50 p-3 text-sm font-bold text-red-700">
                {outcome.error || "Sync failed — check the server logs."}
              </p>
            )}
          </div>
        )}
      </section>

      {/* Individual syncs */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <SyncCard
          title="🎱 Lotto"
          description="Sync draws and publish result stories."
          loading={lottoSyncing}
          loadingLabel="Fetching draws…"
          buttonLabel="Sync lotto"
          onClick={syncLotto}
        >
          {lottoOutcome?.ok && (
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <StatBox label="Draws" value={lottoOutcome.upserted ?? 0} />
              <StatBox label="Stories" value={lottoOutcome.articles ?? 0} />
            </div>
          )}
          {lottoOutcome && !lottoOutcome.ok && (
            <p className="mt-3 rounded bg-red-50 p-2 text-xs font-bold text-red-700">
              {lottoOutcome.error}
            </p>
          )}
        </SyncCard>

        <SyncCard
          title="▶🎧 Media"
          description="Pull channel videos and podcast episodes."
          loading={mediaSyncing}
          loadingLabel="Fetching media…"
          buttonLabel="Sync media"
          onClick={syncMedia}
        >
          {mediaOutcome?.ok && (
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <StatBox label="Videos" value={mediaOutcome.videos ?? 0} />
              <StatBox label="Episodes" value={mediaOutcome.audio ?? 0} />
            </div>
          )}
          {mediaOutcome && !mediaOutcome.ok && (
            <p className="mt-3 rounded bg-red-50 p-2 text-xs font-bold text-red-700">
              {mediaOutcome.error}
            </p>
          )}
        </SyncCard>

        <SyncCard
          title="👑 Premium"
          description="Refresh the All Access library."
          loading={premiumSyncing}
          loadingLabel="Seeding premium…"
          buttonLabel="Sync library"
          onClick={syncPremium}
        >
          {premiumOutcome?.ok && (
            <div className="mt-3 text-xs">
              <StatBox label="Premium pieces" value={premiumOutcome.inserted ?? 0} />
            </div>
          )}
          {premiumOutcome && !premiumOutcome.ok && (
            <p className="mt-3 rounded bg-red-50 p-2 text-xs font-bold text-red-700">
              {premiumOutcome.error}
            </p>
          )}
        </SyncCard>
      </div>

      {/* Advertising */}
      <div className="mt-6">
        <AdManager />
      </div>

      {/* Publish */}
      <section className="mt-6 rounded-sm bg-white p-5 shadow-sm">
        <h2 className="font-headline text-xl font-black uppercase">
          Publish a story
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Original 180 Degrees News desk copy goes live immediately.
        </p>

        {publishedSlug && (
          <div className="mt-4 rounded bg-emerald-50 p-3 text-sm text-emerald-800">
            ✅ Published!{" "}
            <Link href={`/article/${publishedSlug}`} className="font-bold underline">
              Read the article →
            </Link>
          </div>
        )}
        {formError && (
          <p className="mt-4 rounded bg-red-50 p-3 text-sm font-bold text-red-700">
            {formError}
          </p>
        )}

        <form onSubmit={publish} className="mt-4 grid gap-4">
          <Field label="Headline">
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="input"
              placeholder="e.g. City unveils R500m water project"
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Section">
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="input"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Province (optional)">
              <select
                value={form.province}
                onChange={(e) => setForm({ ...form, province: e.target.value })}
                className="input"
              >
                <option value="">— National —</option>
                {PROVINCES.map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Region / metro (optional)">
              <input
                value={form.region}
                onChange={(e) => setForm({ ...form, region: e.target.value })}
                className="input"
                placeholder="e.g. City of Cape Town"
              />
            </Field>
          </div>

          <Field label="Summary / deck">
            <textarea
              rows={2}
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              className="input"
              placeholder="One or two sentence summary…"
            />
          </Field>

          <Field label="Body (blank lines separate paragraphs)">
            <textarea
              rows={8}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="input"
              placeholder={"JOHANNESBURG — First paragraph…\n\nSecond paragraph…"}
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Author (newsroom team)">
              <input
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                className="input"
                list="team-authors"
                placeholder="Start typing a reporter…"
              />
              <datalist id="team-authors">
                {TEAM.filter((t) => t.archive).map((t) => (
                  <option key={t.slug} value={t.name}>
                    {t.role} — {t.beat}
                  </option>
                ))}
              </datalist>
            </Field>
            <Field label="Featured image">
              <input
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                className="input mb-2"
                placeholder="Paste an image URL, or upload →"
              />
              <MediaUpload
                label=""
                kind="image"
                accept="image/jpeg,image/png,image/webp,image/gif"
                hint="JPG, PNG, WebP or GIF · up to 60MB"
                value={form.imageUrl}
                onUploaded={(url) => setForm((f) => ({ ...f, imageUrl: url }))}
              />
            </Field>
            <Field label="Tags (comma separated)">
              <input
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                className="input"
                placeholder="Eskom, energy, Gauteng"
              />
            </Field>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Lead media — paste a URL (YouTube / audio / video)">
              <input
                value={form.mediaUrl}
                onChange={(e) => setForm({ ...form, mediaUrl: e.target.value })}
                className="input"
                placeholder="YouTube link, or .mp3 / .mp4 URL"
              />
            </Field>
            <Field label="…or upload audio / video directly">
              <MediaUpload
                label=""
                kind="media"
                accept="audio/mpeg,audio/mp4,audio/x-m4a,audio/ogg,video/mp4,video/webm,video/quicktime"
                hint="MP3, M4A, OGG, MP4, WebM or MOV · up to 60MB"
                value={form.mediaUrl}
                onUploaded={(url) => setForm((f) => ({ ...f, mediaUrl: url }))}
              />
            </Field>
          </div>

          <div className="flex flex-wrap gap-5">
            <label className="flex items-center gap-2 text-sm font-semibold">
              <input
                type="checkbox"
                checked={form.isBreaking}
                onChange={(e) => setForm({ ...form, isBreaking: e.target.checked })}
                className="h-4 w-4 accent-[#8c0e0e]"
              />
              Breaking news
            </label>
            <label className="flex items-center gap-2 text-sm font-semibold">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="h-4 w-4 accent-[#0c1870]"
              />
              Feature on homepage
            </label>
            <label className="flex items-center gap-2 text-sm font-semibold">
              <input
                type="checkbox"
                checked={form.isPremium}
                onChange={(e) => setForm({ ...form, isPremium: e.target.checked })}
                className="h-4 w-4 accent-amber-500"
              />
              👑 Premium (All Access)
            </label>
          </div>

          <button
            type="submit"
            disabled={publishing}
            className="justify-self-start rounded-sm bg-brand-navy px-6 py-2.5 text-sm font-black uppercase tracking-wide text-white hover:bg-brand-navy-dark disabled:opacity-60"
          >
            {publishing ? "Publishing…" : "Publish story"}
          </button>
        </form>
      </section>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          border: 1px solid #cbd2dd;
          border-radius: 0.25rem;
          padding: 0.55rem 0.75rem;
          font-size: 0.875rem;
          background: #f9fafb;
        }
        :global(.input:focus) {
          outline: none;
          border-color: #8c0e0e;
          box-shadow: 0 0 0 2px rgba(140, 14, 14, 0.15);
          background: #fff;
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
        {label}
      </span>
      {children}
    </label>
  );
}

function StatBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-sm border border-slate-200 bg-slate-50 p-3">
      <p className="font-headline text-2xl font-black text-brand-navy">{value}</p>
      <p className="text-[0.68rem] font-bold uppercase tracking-wide text-slate-500">
        {label}
      </p>
    </div>
  );
}

function SyncCard({
  title,
  description,
  loading,
  loadingLabel,
  buttonLabel,
  onClick,
  children,
}: {
  title: string;
  description: string;
  loading: boolean;
  loadingLabel: string;
  buttonLabel: string;
  onClick: () => void;
  children?: React.ReactNode;
}) {
  return (
    <section className="rounded-sm bg-white p-5 shadow-sm">
      <h2 className="font-headline text-base font-black uppercase">{title}</h2>
      <p className="mt-1 text-xs text-slate-500">{description}</p>
      <button
        onClick={onClick}
        disabled={loading}
        className="mt-3 w-full rounded-sm bg-brand-navy px-3 py-2 text-xs font-black uppercase tracking-wide text-white hover:bg-brand-navy-dark disabled:opacity-60"
      >
        {loading ? loadingLabel : buttonLabel}
      </button>
      {children}
    </section>
  );
}
