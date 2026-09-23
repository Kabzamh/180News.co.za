"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type BIPEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "180_install_dismissed";
const INSTALLED_KEY = "180_installed";

export default function InstallPrompt() {
  const [deferred, setDeferred] = useState<BIPEvent | null>(null);
  const [show, setShow] = useState(false);
  const [ios, setIos] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(INSTALLED_KEY) || localStorage.getItem(DISMISS_KEY)) return;

    // Already running as an installed app.
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      // iOS Safari
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
    if (standalone) {
      localStorage.setItem(INSTALLED_KEY, "1");
      return;
    }

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BIPEvent);
      setShow(true);
    };
    const onInstalled = () => {
      localStorage.setItem(INSTALLED_KEY, "1");
      setShow(false);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);

    // iOS Safari never fires beforeinstallprompt.
    const isIOS =
      /iphone|ipad|ipod/i.test(navigator.userAgent) &&
      !/crios|fxios/i.test(navigator.userAgent);
    if (isIOS) {
      setIos(true);
      setShow(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  function dismiss() {
    localStorage.setItem(DISMISS_KEY, "1");
    setShow(false);
  }

  async function install() {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed inset-x-3 bottom-24 z-50 mx-auto max-w-md rounded-lg bg-brand-navy p-4 text-white shadow-2xl ring-1 ring-white/10 md:bottom-6">
      <div className="flex items-start gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/icon-192.png" alt="" className="h-11 w-11 rounded-lg" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-black">Install the 180° News app</p>
          {ios ? (
            <p className="mt-1 text-xs text-white/80">
              Tap{" "}
              <span className="inline-block font-black">
                <svg viewBox="0 0 24 24" className="inline h-4 w-4 fill-white">
                  <path d="M12 4v12m0 0 4-4m-4 4-4-4M5 20h14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>{" "}
              then <strong>“Add to Home Screen”</strong>.
            </p>
          ) : (
            <p className="mt-1 text-xs text-white/80">
              Add to your home screen for one-tap news, live updates and offline reading.
            </p>
          )}
          <div className="mt-3 flex items-center gap-2">
            {!ios && (
              <button
                onClick={install}
                className="rounded-sm bg-brand-gold px-4 py-1.5 text-xs font-black uppercase tracking-wide text-brand-navy-dark"
              >
                Install
              </button>
            )}
            <Link
              href="/app"
              className="rounded-sm border border-white/25 px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-wide"
            >
              Details
            </Link>
            <button
              onClick={dismiss}
              className="ml-auto text-[0.7rem] font-bold uppercase text-white/60"
            >
              Not now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
