"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function NewsroomMediaForm({
  articles,
}: {
  articles: Array<{ id: number; title: string }>;
}) {
  const router = useRouter();
  const [articleId, setArticleId] = useState(String(articles[0]?.id ?? ""));
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [url, setUrl] = useState("");
  const [kind, setKind] = useState<"video" | "audio">("video");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setStatus("");
    try {
      if (file) {
        const form = new FormData();
        form.set("file", file);
        form.set("articleId", articleId);
        form.set("title", title);
        form.set("caption", caption);
        const response = await fetch("/api/media/upload", { method: "POST", body: form });
        const data = (await response.json()) as { ok: boolean; error?: string };
        if (!response.ok || !data.ok) throw new Error(data.error || "Upload failed.");
      } else {
        const response = await fetch("/api/media", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ articleId: Number(articleId), kind, title, url, caption }),
        });
        const data = (await response.json()) as { ok: boolean; error?: string };
        if (!response.ok || !data.ok) throw new Error(data.error || "Could not attach media.");
      }
      setTitle("");
      setCaption("");
      setUrl("");
      setFile(null);
      setStatus("Attached to the story.");
      router.refresh();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not attach media.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 border border-slate-200 bg-white p-5">
      <label className="block text-sm">
        Article
        <select
          value={articleId}
          onChange={(event) => setArticleId(event.target.value)}
          className="mt-1 w-full border border-slate-300 px-3 py-2"
        >
          {articles.map((article) => (
            <option key={article.id} value={article.id}>
              {article.title}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm">
        Title
        <input
          required
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="mt-1 w-full border border-slate-300 px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        Caption
        <input
          value={caption}
          onChange={(event) => setCaption(event.target.value)}
          className="mt-1 w-full border border-slate-300 px-3 py-2"
        />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          Upload MP4 / WebM / MP3
          <input
            type="file"
            accept="video/mp4,video/webm,audio/mpeg,audio/mp3,audio/wav"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            className="mt-1 w-full text-sm"
          />
        </label>
        <label className="block text-sm">
          Or paste a video / MP3 / YouTube URL
          <input
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://"
            className="mt-1 w-full border border-slate-300 px-3 py-2"
          />
        </label>
      </div>
      <label className="block text-sm">
        URL type
        <select
          value={kind}
          onChange={(event) => setKind(event.target.value as "video" | "audio")}
          className="mt-1 w-full border border-slate-300 px-3 py-2"
        >
          <option value="video">Video</option>
          <option value="audio">MP3 / audio</option>
        </select>
      </label>
      <button
        type="submit"
        disabled={busy}
        className="bg-[#0b2f8a] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white disabled:opacity-60"
      >
        {busy ? "Saving..." : "Attach to article"}
      </button>
      {status ? <p className="text-sm text-slate-600">{status}</p> : null}
    </form>
  );
}
