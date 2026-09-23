import type { Article } from "@/db/schema";
import { SITE } from "@/lib/constants";
import { stripHtml } from "@/lib/utils";

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Serialise a list of articles into a valid RSS 2.0 document. */
export function buildRssXml(
  articleList: Article[],
  opts: {
    title?: string;
    description?: string;
    path?: string;
    selfQuery?: string;
    baseUrl?: string;
  } = {},
): string {
  const base = opts.baseUrl ?? SITE.url;
  const title = opts.title ? `${opts.title} | ${SITE.name}` : SITE.name;
  const description = opts.description ?? SITE.description;
  const link = `${base}${opts.path ?? ""}`;
  const selfUrl = `${base}/api/rss${opts.selfQuery ?? ""}`;

  const items = articleList
    .map((a) => {
      const url = `${base}/article/${a.slug}`;
      const pubDate = new Date(a.publishedAt).toUTCString();
      const body = stripHtml(a.content ?? a.summary ?? "")
        .split("\n\n")
        .map((p) => `<p>${xmlEscape(p.trim())}</p>`)
        .join("");
      const image = a.imageUrl
        ? `<enclosure url="${xmlEscape(a.imageUrl)}" type="image/jpeg"/>
      <media:content url="${xmlEscape(a.imageUrl)}" medium="image"/>`
        : "";
      const categories = [a.category, a.province, ...(a.tags ?? [])]
        .filter(Boolean)
        .map((c) => `<category>${xmlEscape(c as string)}</category>`)
        .join("\n        ");
      return `    <item>
      <title>${xmlEscape(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>${xmlEscape(a.author ? `${a.author} (${a.source})` : a.source)}</author>
      <source url="${xmlEscape(base)}">${xmlEscape(a.source)}</source>
      ${categories}
      ${image}
      <description>${xmlEscape(a.summary ?? "")}</description>
      <content:encoded><![CDATA[
        ${a.imageUrl ? `<figure><img src="${a.imageUrl}" alt="${xmlEscape(a.title)}"/></figure>` : ""}
        ${body}
        <p><em>Source: ${xmlEscape(a.source)}. Read more at <a href="${url}">${xmlEscape(SITE.name)}</a>.</em></p>
      ]]></content:encoded>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:media="http://search.yahoo.com/mrss/"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${xmlEscape(title)}</title>
    <link>${link}</link>
    <atom:link href="${selfUrl}" rel="self" type="application/rss+xml"/>
    <description>${xmlEscape(description)}</description>
    <language>en-ZA</language>
    <copyright>Copyright ${new Date().getFullYear()} ${xmlEscape(SITE.name)}</copyright>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <ttl>15</ttl>
    <image>
      <url>${base}/icon.svg</url>
      <title>${xmlEscape(SITE.name)}</title>
      <link>${base}</link>
    </image>
${items}
  </channel>
</rss>`;
}
