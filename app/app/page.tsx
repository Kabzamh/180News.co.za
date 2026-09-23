import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Get the 180° News app",
  description:
    "Install 180° News on your phone for one-tap news, live updates, offline reading and the Live Wire.",
};

const FEATURES = [
  ["📲", "One-tap access", "Add to your home screen, no browser needed."],
  ["⚡", "Instant Live Wire", "Breaking news, lotto, markets and video in one dock."],
  ["📶", "Offline reading", "Recently opened stories and images stay cached."],
  ["👑", "180° All Access", "Sign in to your trial or membership in the app."],
];

export default function AppPage() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-brand-navy to-brand-red text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(1.5px 1.5px at 20% 25%, #fff 50%, transparent), radial-gradient(1.5px 1.5px at 70% 20%, #fcd34d 50%, transparent), radial-gradient(1px 1px at 45% 70%, #fff 50%, transparent)",
        }}
      />
      <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-center text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/icon-512.png" alt="180° News" className="h-24 w-24 rounded-3xl shadow-2xl" />
          <h1 className="font-headline mt-5 text-3xl font-black uppercase sm:text-5xl">
            Get the 180° News app
          </h1>
          <p className="mt-3 max-w-xl text-sm text-white/85 sm:text-base">
            National, provincial and local South African news on your home
            screen — with the Live Wire, video, audio, lotto, markets,
            horoscopes and 180° All Access.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {FEATURES.map(([icon, title, text]) => (
            <div key={title} className="flex gap-3 rounded-lg bg-white/10 p-4 backdrop-blur">
              <span className="text-2xl">{icon}</span>
              <div>
                <p className="text-sm font-black">{title}</p>
                <p className="text-xs text-white/75">{text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2">
          {/* Android */}
          <div className="rounded-lg bg-white p-5 text-ink">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">
              Android · Chrome
            </p>
            <p className="mt-2 font-headline text-lg font-black">
              Install from Chrome
            </p>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-600">
              <li>Open this site in Google Chrome on Android.</li>
              <li>Tap the <strong>⋮</strong> menu (top right).</li>
              <li>
                Tap <strong>“Add to Home screen”</strong> / Install app.
              </li>
            </ol>
            <span className="mt-4 inline-flex cursor-default items-center gap-2 rounded-md bg-slate-200 px-4 py-3 text-sm font-black text-slate-500">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M3.6 2.3 13.7 12 3.6 21.7a1 1 0 0 1-.6-.9V3.2a1 1 0 0 1 .6-.9Zm14 11.2-2.5-1.5-2.8 2.8 2.8 2.8 2.5-1.5a1.5 1.5 0 0 0 0-2.6ZM14.7 10.5 17.6 9a1.5 1.5 0 0 1 0 2.6l-2.9-1.1Z"/></svg>
              Google Play · coming soon
            </span>
          </div>

          {/* iOS */}
          <div className="rounded-lg bg-white p-5 text-ink">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">
              iPhone / iPad · Safari
            </p>
            <p className="mt-2 font-headline text-lg font-black">
              Add to Home Screen
            </p>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-600">
              <li>Open this site in Safari.</li>
              <li>
                Tap the <strong>Share</strong>{" "}
                <svg viewBox="0 0 24 24" className="inline h-4 w-4 align-text-bottom text-blue-600" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 4v12m0 0 4-4m-4 4-4-4M5 20h14" strokeLinecap="round" strokeLinejoin="round"/></svg>{" "}
                button.
              </li>
              <li>
                Choose <strong>“Add to Home Screen”</strong>.
              </li>
            </ol>
            <span className="mt-4 inline-flex cursor-default items-center gap-2 rounded-md bg-slate-200 px-4 py-3 text-sm font-black text-slate-500">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M16.4 12.6c0-2.4 2-3.5 2.1-3.6-1.2-1.7-3-1.9-3.6-1.9-1.5-.2-3 .9-3.7.9-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.1 2.5-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.4-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.2 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9-.1 0-2.8-1.1-2.9-4.4ZM14 5.5c.7-.8 1.1-2 1-3.1-1 0-2.2.7-2.9 1.5-.7.7-1.3 1.9-1.1 3 1.1.1 2.3-.6 3-1.4Z"/></svg>
              App Store · coming soon
            </span>
          </div>
        </div>

        <p className="mt-8 text-center">
          <Link
            href="/"
            className="rounded-sm bg-brand-gold px-6 py-3 text-sm font-black uppercase tracking-wide text-brand-navy-dark"
          >
            Continue to the news
          </Link>
        </p>

        <p className="mt-6 text-center text-xs text-white/60">
          Installing the PWA works today. Native Google Play and App Store
          builds require the steps in the newsroom deployment guide,
          including store billing for All Access.
        </p>
      </div>
    </div>
  );
}
