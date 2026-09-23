import { SITE } from "@/lib/constants";

/**
 * Resolve the site's public origin for a given request.
 * Preview/staging hosts change per deployment, so prefer the forwarding
 * headers supplied by the platform and fall back to NEXT_PUBLIC_SITE_URL.
 */
export function resolveBaseUrl(request?: Request): string {
  if (request) {
    const headers = request.headers;
    const host =
      headers.get("x-forwarded-host")?.split(",")[0]?.trim() ||
      headers.get("host");
    if (host) {
      const isLocal = /^(localhost|127\.|10\.|192\.168\.)/.test(host);
      const forwarded = headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
      const proto = isLocal ? forwarded || "http" : "https";
      return `${proto}://${host}`;
    }
  }
  return SITE.url;
}
