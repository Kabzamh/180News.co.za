import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "RSS feeds",
  description: "Subscribe to 180 Degrees News headlines in Feedly, Google, Flipboard or any RSS reader.",
};

const FEEDS = [
  { href: "/rss.xml", label: "All latest stories" },
  { href: "/rss/national", label: "National" },
  { href: "/rss/provincial", label: "Provincial" },
  { href: "/rss/international", label: "International" },
  { href: "/rss/politics", label: "Politics" },
  { href: "/rss/business", label: "Business" },
  { href: "/rss/sport", label: "Sport" },
  { href: "/rss/opinion", label: "Opinion" },
];

export default function RssIndexPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8f1520]">Syndicate</p>
      <h1 className="mt-2 font-serif text-5xl">RSS feeds</h1>
      <p className="mt-4 text-lg text-slate-600">
        Yes — RSS helps. Aggregators, Google Discover-style readers, Feedly, Flipboard and other newsrooms can pick up
        our teasers and send readers back to {SITE.domain}. Full stories stay on the site.
      </p>
      <ul className="mt-8 divide-y divide-slate-200 border border-slate-200 bg-white">
        {FEEDS.map((feed) => (
          <li key={feed.href} className="flex items-center justify-between px-4 py-3">
            <span>{feed.label}</span>
            <a href={feed.href} className="text-sm font-semibold text-[#0b2f8a]">
              {feed.href}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-slate-500">
        Add{" "}
        <Link href="/rss.xml" className="text-[#0b2f8a]">
          https://180news.co.za/rss.xml
        </Link>{" "}
        to your reader.
      </p>
    </main>
  );
}
