"use client";

import { useRef, useState } from "react";
import { adminHeaders } from "@/components/admin/admin-storage";

type Props = {
  label: string;
  accept: string;
  hint: string;
  kind: "image" | "media";
  value: string;
  onUploaded: (url: string, detected?: "image" | "audio" | "video") => void;
};

const statusText = {
  idle: "",
  uploading: "Uploading…",
  done: "Uploaded ✓",
  error: "",
} as const;

export default function MediaUpload({
  label,
  accept,
  hint,
  kind,
  value,
  onUploaded,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState<keyof typeof statusText>("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  async function upload(file: File) {
    setStatus("uploading");
    setError("");
    setProgress(8);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: adminHeaders(),
        body: fd,
      });
      // No upload-progress events on fetch; fake a quick ramp for feedback.
      setProgress(90);
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Upload failed");
        setStatus("error");
        return;
      }
      setProgress(100);
      onUploaded(data.url, data.kind);
      setStatus("done");
    } catch {
      setError("Network error while uploading");
      setStatus("error");
    }
  }

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) upload(file);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) upload(file);
  }

  return (
    <div>
      <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
        {label}
      </span>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`rounded-md border-2 border-dashed p-3 text-center transition ${
          dragging
            ? "border-brand-red bg-red-50"
            : "border-slate-300 bg-slate-50 hover:border-slate-400"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={onPick}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="rounded-sm bg-brand-navy px-3 py-1.5 text-[0.7rem] font-black uppercase tracking-wide text-white hover:bg-brand-navy-dark"
        >
          Choose file
        </button>
        <p className="mt-1.5 text-[0.68rem] text-slate-500">
          {hint} · or drag &amp; drop
        </p>
        {status === "uploading" && (
          <div className="mx-auto mt-2 h-1.5 w-full max-w-[200px] overflow-hidden rounded bg-slate-200">
            <div
              className="h-full bg-brand-red transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        {status === "done" && (
          <p className="mt-2 text-[0.7rem] font-bold text-emerald-700">
            Uploaded ✓ — saved to your media library
          </p>
        )}
        {status === "error" && (
          <p className="mt-2 text-[0.7rem] font-bold text-red-700">{error}</p>
        )}
      </div>

      {value && (
        <div className="mt-2 flex items-center gap-2 rounded bg-slate-100 p-2">
          {kind === "image" && value.match(/\.(jpe?g|png|webp|gif)(\?|$)/i) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-9 w-14 rounded object-cover" />
          ) : (
            <span className="flex h-9 w-14 items-center justify-center rounded bg-brand-navy/10 text-lg">
              {value.match(/\.(mp4|webm|mov)(\?|$)/i) ? "🎬" : "🎧"}
            </span>
          )}
          <span className="min-w-0 flex-1 truncate font-mono text-[0.65rem] text-slate-600">
            {value}
          </span>
        </div>
      )}
    </div>
  );
}
