import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

async function baseUrl(): Promise<string> {
  const h = await headers();
  const host =
    h.get("x-forwarded-host")?.split(",")[0]?.trim() || h.get("host");
  if (host) {
    const isLocal = /^(localhost|127\.|10\.|192\.168\.)/.test(host);
    const proto = isLocal ? "http" : "https";
    return `${proto}://${host}`;
  }
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000"
  );
}

export default async function robots(): Promise<MetadataRoute.Robots> {
  const SITE_URL = await baseUrl();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/account",
        "/api/rss",
        "/api/sync",
        "/api/admin",
        "/api/media",
        "/api/lotto",
        "/api/subscription",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
