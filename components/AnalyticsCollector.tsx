"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

function sessionId() {
  const key = "180news_vid";
  const existing = window.localStorage.getItem(key);
  if (existing) return existing;
  const next = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  window.localStorage.setItem(key, next);
  return next;
}

function send(payload: Record<string, unknown>) {
  const body = JSON.stringify({ ...payload, session: sessionId() });
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/analytics", new Blob([body], { type: "application/json" }));
    return;
  }
  void fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  });
}

export function AnalyticsCollector() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin") || pathname.startsWith("/api")) return;
    send({ type: "pageview", path: pathname, referrer: document.referrer });

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === "largest-contentful-paint") {
          send({ type: "vital", name: "LCP", value: entry.startTime, path: pathname });
        }
        if (entry.entryType === "paint" && entry.name === "first-contentful-paint") {
          send({ type: "vital", name: "FCP", value: entry.startTime, path: pathname });
        }
      }
    });
    try {
      observer.observe({ type: "largest-contentful-paint", buffered: true });
      observer.observe({ type: "paint", buffered: true });
    } catch {
      // older browsers
    }

    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (nav) {
      send({ type: "vital", name: "TTFB", value: nav.responseStart, path: pathname });
    }

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
