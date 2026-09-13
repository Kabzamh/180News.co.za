import { SITE } from "@/lib/constants";
import type { ArticleCardData } from "@/lib/queries";

function xmlEscape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function buildRss(options: {
  title: string;
  description: string;
  path: string;
  items: ArticleCardData[];
}) {
  const channelLink = `${SITE.url}${options.path}`;
  const items = options.items
    .map((article) => {
      const link = `${SITE.url}/article/${article.slug}`;
      const pub = new Date(article.publishedAt).toUTCString();
      return `    <item>
      <title>${xmlEscape(article.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pub}</pubDate>
      <category>${xmlEscape(article.category.name)}</category>
      <author>${xmlEscape(article.author.email)} (${xmlEscape(article.author.name)})</author>
      <description>${xmlEscape(article.excerpt)}</description>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(options.title)}</title>
    <link>${channelLink}</link>
    <description>${xmlEscape(options.description)}</description>
    <language>en-za</language>
    <copyright>© ${new Date().getFullYear()} ${xmlEscape(SITE.name)}</copyright>
    <ttl>15</ttl>
    <atom:link href="${SITE.url}${options.path}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;
}

export function rssResponse(xml: string) {
  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=900",
    },
  });
}
