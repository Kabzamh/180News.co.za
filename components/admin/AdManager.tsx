"use client";

import { useEffect, useState } from "react";
import { adminHeaders } from "@/components/admin/admin-storage";
import MediaUpload from "@/components/admin/MediaUpload";

type Ad = {
  id: number;
  name: string;
  placement: string;
  type: string;
  imageUrl: string | null;
  html: string | null;
  linkUrl: string | null;
  sponsor: string | null;
  weight: number;
  impressions: number;
  clicks: number;
  active: boolean;
  startsAt: string | null;
  endsAt: string | null;
};

type Placement = {
  id: string;
  name: string;
  width: number;
  height: number;
  description: string;
};

const blank = {
  name: "",
  placement: "header-leaderboard",
  type: "image",
  imageUrl: "",
  html: "",
  linkUrl: "",
  sponsor: "",
  weight: 1,
  startsAt: "",
  endsAt: "",
  active: true,
};

export default function AdManager() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [form, setForm] = useState(blank);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function load() {
    const res = await fetch("/api/admin/ads", { headers: adminHeaders() });
    if (res.ok) {
      const data = await res.json();
      setAds(data.ads);
      setPlacements(data.placements);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    const res = await fetch("/api/admin/ads", {
      method: "POST",
      headers: adminHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);
    if (data.ok) {
      setMsg(`Created "${data.ad.name}"`);
      setForm({ ...blank, placement: form.placement });
      load();
    } else {
      setMsg(data.error || "Failed to create banner");
    }
  }

  async function toggle(ad: Ad) {
    await fetch(`/api/admin/ads/${ad.id}`, {
      method: "PATCH",
      headers: adminHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ active: !ad.active }),
    });
    load();
  }

  async function remove(id: number) {
    if (!confirm("Delete this banner?")) return;
    await fetch(`/api/admin/ads?id=${id}`, {
      method: "DELETE",
      headers: adminHeaders(),
    });
    load();
  }

  return (
    <section className="rounded-sm bg-white p-5 shadow-sm">
      <h2 className="font-headline text-xl font-black uppercase">
        📣 Advertising banners
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        Upload banner artwork, choose a placement, set a destination link and
        rotation weight. Impressions and clicks are tracked automatically.
      </p>

      {/* Existing */}
      {ads.length > 0 && (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-xs">
            <thead className="bg-slate-100 text-[0.65rem] uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-2 py-2">Banner</th>
                <th className="px-2 py-2">Placement</th>
                <th className="px-2 py-2 text-right">Weight</th>
                <th className="px-2 py-2 text-right">Impr.</th>
                <th className="px-2 py-2 text-right">Clicks</th>
                <th className="px-2 py-2 text-right">CTR</th>
                <th className="px-2 py-2">Status</th>
                <th className="px-2 py-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ads.map((a) => (
                <tr key={a.id}>
                  <td className="px-2 py-2">
                    <p className="font-bold text-ink">{a.name}</p>
                    {a.imageUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={a.imageUrl} alt="" className="mt-1 h-8 rounded object-contain" />
                    )}
                  </td>
                  <td className="px-2 py-2">
                    {placements.find((p) => p.id === a.placement)?.name ??
                      a.placement}
                  </td>
                  <td className="px-2 py-2 text-right">{a.weight}</td>
                  <td className="px-2 py-2 text-right">
                    {a.impressions.toLocaleString()}
                  </td>
                  <td className="px-2 py-2 text-right">
                    {a.clicks.toLocaleString()}
                  </td>
                  <td className="px-2 py-2 text-right">
                    {a.impressions
                      ? `${((a.clicks / a.impressions) * 100).toFixed(2)}%`
                      : "—"}
                  </td>
                  <td className="px-2 py-2">
                    <button
                      onClick={() => toggle(a)}
                      className={`rounded-full px-2 py-0.5 text-[0.6rem] font-black uppercase ${
                        a.active
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {a.active ? "Live" : "Paused"}
                    </button>
                  </td>
                  <td className="px-2 py-2 text-right">
                    <button
                      onClick={() => remove(a.id)}
                      className="text-[0.65rem] font-bold text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* New banner form */}
      <form onSubmit={create} className="mt-5 grid gap-4 rounded bg-slate-50 p-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Label text="Campaign / banner name">
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input"
              placeholder="e.g. Shoprite July promo — leaderboard"
            />
          </Label>
          <Label text="Placement">
            <select
              value={form.placement}
              onChange={(e) => setForm({ ...form, placement: e.target.value })}
              className="input"
            >
              {placements.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.width}×{p.height})
                </option>
              ))}
            </select>
          </Label>
        </div>

        <p className="text-[0.7rem] text-slate-500">
          {placements.find((p) => p.id === form.placement)?.description}
        </p>

        <Label text="Banner artwork (upload image)">
          <MediaUpload
            label=""
            kind="image"
            accept="image/jpeg,image/png,image/webp,image/gif"
            hint={`Recommended ${placements.find((p) => p.id === form.placement)?.width ?? 728}×${placements.find((p) => p.id === form.placement)?.height ?? 90}`}
            value={form.imageUrl}
            onUploaded={(url) => setForm((f) => ({ ...f, imageUrl: url, type: "image" }))}
          />
        </Label>

        <div className="grid gap-4 sm:grid-cols-2">
          <Label text="Click-through destination (https://…)">
            <input
              value={form.linkUrl}
              onChange={(e) => setForm({ ...form, linkUrl: e.target.value })}
              className="input"
              placeholder="https://advertiser.co.za/promo"
            />
          </Label>
          <Label text="Sponsor / advertiser label">
            <input
              value={form.sponsor}
              onChange={(e) => setForm({ ...form, sponsor: e.target.value })}
              className="input"
              placeholder="e.g. Shoprite"
            />
          </Label>
        </div>

        <Label text="…or paste an HTML house ad (overrides image)">
          <textarea
            rows={2}
            value={form.html}
            onChange={(e) => setForm({ ...form, html: e.target.value, type: e.target.value ? "html" : "image" })}
            className="input font-mono text-xs"
            placeholder='<a href="…"><img src="…"></a>'
          />
        </Label>

        <div className="grid gap-4 sm:grid-cols-4">
          <Label text="Rotation weight">
            <input
              type="number"
              min={0}
              max={20}
              value={form.weight}
              onChange={(e) => setForm({ ...form, weight: Number(e.target.value) })}
              className="input"
            />
          </Label>
          <Label text="Start (optional)">
            <input
              type="datetime-local"
              value={form.startsAt}
              onChange={(e) => setForm({ ...form, startsAt: e.target.value })}
              className="input"
            />
          </Label>
          <Label text="End (optional)">
            <input
              type="datetime-local"
              value={form.endsAt}
              onChange={(e) => setForm({ ...form, endsAt: e.target.value })}
              className="input"
            />
          </Label>
          <label className="flex items-end gap-2 pb-2 text-sm font-semibold">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
              className="h-4 w-4 accent-[#0c1870]"
            />
            Live on save
          </label>
        </div>

        {msg && <p className="text-xs font-bold text-emerald-700">{msg}</p>}
        <button
          type="submit"
          disabled={loading}
          className="justify-self-start rounded-sm bg-brand-navy px-5 py-2 text-xs font-black uppercase tracking-wide text-white hover:bg-brand-navy-dark disabled:opacity-60"
        >
          {loading ? "Saving…" : "Create banner"}
        </button>
      </form>
    </section>
  );
}

function Label({ text, children }: { text: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
        {text}
      </span>
      {children}
    </label>
  );
}
