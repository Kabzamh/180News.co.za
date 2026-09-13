import Link from "next/link";
import { count, desc } from "drizzle-orm";
import { db } from "@/db";
import {
  advertisements,
  articles,
  comments,
  contactMessages,
  newsletterSubscribers,
  payments,
  subscribers,
  subscriptions,
} from "@/db/schema";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const [
    articleCount,
    subscriberCount,
    commentCount,
    contactCount,
    paymentRows,
    activeSubs,
    newsletterCount,
    adRows,
    latestArticles,
  ] = await Promise.all([
    db.select({ value: count() }).from(articles),
    db.select({ value: count() }).from(subscribers),
    db.select({ value: count() }).from(comments),
    db.select({ value: count() }).from(contactMessages),
    db.select().from(payments),
    db.select({ value: count() }).from(subscriptions),
    db.select({ value: count() }).from(newsletterSubscribers),
    db.select().from(advertisements),
    db.select().from(articles).orderBy(desc(articles.publishedAt)).limit(6),
  ]);

  const revenue = paymentRows
    .filter((row) => row.status === "paid")
    .reduce((sum, row) => sum + row.amountCents, 0);

  const cards = [
    { label: "Articles", value: articleCount[0]?.value ?? 0, href: "/admin/articles" },
    { label: "Subscribers", value: subscriberCount[0]?.value ?? 0, href: "/admin/subscribers" },
    { label: "Subscriptions", value: activeSubs[0]?.value ?? 0, href: "/admin/subscribers" },
    { label: "Paid (ZAR)", value: `R${(revenue / 100).toFixed(0)}`, href: "/admin/payments" },
    { label: "Comments", value: commentCount[0]?.value ?? 0, href: "/admin/comments" },
    { label: "Inbox", value: contactCount[0]?.value ?? 0, href: "/admin/inbox" },
    { label: "Newsletter", value: newsletterCount[0]?.value ?? 0, href: "/admin/subscribers" },
    { label: "Ad impressions", value: adRows.reduce((sum, ad) => sum + ad.impressions, 0), href: "/admin/analytics" },
  ];

  return (
    <div>
      <h1 className="font-serif text-4xl">Newsroom desk</h1>
      <p className="mt-2 text-sm text-white/60">Johannesburg staff portal for 180 Degrees News.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="border border-white/10 bg-white/5 p-4 hover:border-white/30">
            <p className="text-[11px] uppercase tracking-[0.16em] text-white/50">{card.label}</p>
            <p className="mt-2 font-serif text-3xl">{card.value}</p>
          </Link>
        ))}
      </div>
      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl">Latest copy</h2>
          <div className="flex gap-4">
            <Link href="/admin/media" className="text-xs font-bold uppercase tracking-[0.14em] text-[#f0c7cb]">
              Newsroom media
            </Link>
            <Link href="/admin/articles/new" className="text-xs font-bold uppercase tracking-[0.14em] text-[#f0c7cb]">
              File a story
            </Link>
          </div>
        </div>
        <div className="mt-4 divide-y divide-white/10 border border-white/10">
          {latestArticles.map((article) => (
            <Link key={article.id} href={`/admin/articles/${article.id}`} className="block px-4 py-3 hover:bg-white/5">
              <p className="font-semibold">{article.title}</p>
              <p className="text-xs text-white/50">
                {article.views.toLocaleString("en-ZA")} views · {article.slug}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
