import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { getAllAds } from "@/lib/ads";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Advertise with 180 Degrees News",
  description:
    "Book leaderboard, sidebar, in-article and election-night advertising on 180news.co.za, the Johannesburg news bulletin.",
};

export const dynamic = "force-dynamic";

const PACKAGES = [
  {
    name: "Leaderboard",
    size: "728 × 90 / full width",
    rate: "From R8 500 / week",
    copy: "Sits under the masthead and between section desks. First thing readers see after the breaking bar.",
  },
  {
    name: "Rectangle / MPU",
    size: "300 × 250",
    rate: "From R5 200 / week",
    copy: "Home sidebar, article rail and the IEC results desk. High viewability next to most-read and live wires.",
  },
  {
    name: "In-article billboard",
    size: "970 × 250",
    rate: "From R11 000 / week",
    copy: "Drops between paragraphs on national, provincial and international copy.",
  },
  {
    name: "Election takeover",
    size: "Desk + ticker",
    rate: "On request",
    copy: "Own the IEC live results page on by-election nights and during national counts.",
  },
];

export default async function AdvertisePage() {
  const ads = await getAllAds();
  const impressions = ads.reduce((sum, ad) => sum + ad.impressions, 0);
  const clicks = ads.reduce((sum, ad) => sum + ad.clicks, 0);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8f1520]">Advertising</p>
      <h1 className="mt-2 font-serif text-5xl">Be on the bulletin</h1>
      <p className="mt-4 max-w-3xl text-lg text-slate-600">
        180 Degrees News reaches readers who follow national, provincial and international current affairs from
        Johannesburg. Book a slot, or ask the commercial desk for a takeover.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="border border-slate-200 bg-white p-5">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Live slots</p>
          <p className="mt-1 font-serif text-4xl">{ads.length}</p>
        </div>
        <div className="border border-slate-200 bg-white p-5">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Impressions served</p>
          <p className="mt-1 font-serif text-4xl">{impressions.toLocaleString("en-ZA")}</p>
        </div>
        <div className="border border-slate-200 bg-white p-5">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Tracked clicks</p>
          <p className="mt-1 font-serif text-4xl">{clicks.toLocaleString("en-ZA")}</p>
        </div>
      </div>

      <section className="mt-10 grid gap-5 md:grid-cols-2">
        {PACKAGES.map((item) => (
          <article key={item.name} className="border border-slate-200 bg-white p-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0b2f8a]">{item.size}</p>
            <h2 className="mt-2 font-serif text-3xl">{item.name}</h2>
            <p className="mt-2 text-sm font-semibold text-[#8f1520]">{item.rate}</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.copy}</p>
          </article>
        ))}
      </section>

      <section className="mt-12 grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <h2 className="font-serif text-3xl">Talk to the commercial desk</h2>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            {SITE.addressLines.join(", ")}
            <br />
            {SITE.phone}
            <br />
            advertising@180news.co.za
          </p>
          <p className="mt-4 text-sm text-slate-600">
            Use the form and mark the subject as advertising. House creatives already running on the site are listed
            so you can see the slots in context.
          </p>
          <Link href="/" className="mt-4 inline-block text-sm font-semibold text-[#0b2f8a]">
            See live placements on the homepage →
          </Link>
        </div>
        <div className="border border-slate-200 bg-white p-6">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
