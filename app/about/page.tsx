import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { SocialLinks } from "@/components/SocialLinks";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About the newsroom",
  description:
    "180 Degrees News is a Johannesburg-based online bulletin covering national, provincial and international current affairs.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8f1520]">About</p>
      <h1 className="mt-2 font-serif text-5xl">180 Degrees News</h1>
      <p className="mt-4 max-w-3xl text-xl leading-relaxed text-slate-700">
        An online news bulletin for current news and affairs, covering all news topics — national, provincial
        and international — from our office in Johannesburg.
      </p>

      <img
        src="https://images.pexels.com/photos/33622143/pexels-photo-33622143.jpeg?auto=compress&cs=tinysrgb&w=1600"
        alt="Sandton and Johannesburg skyline"
        className="mt-8 aspect-[16/7] w-full object-cover"
      />

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <section>
          <h2 className="font-serif text-3xl">The 180° idea</h2>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            A story has more than one face. We report the statement and the queue, the Cabinet and the clinic,
            Pretoria and the province, Johannesburg and the world. 180 Degrees News exists to turn the camera
            around — and then turn it back again.
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            We publish a continuous online bulletin: breaking alerts, reported pieces, provincial dispatches,
            international affairs, sport, business, health, crime and opinion.
          </p>
        </section>
        <section className="border border-slate-200 bg-white p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8f1520]">Newsroom</p>
          <p className="mt-3 font-serif text-2xl">{SITE.name}</p>
          <p className="mt-2 text-sm leading-7 text-slate-700">
            {SITE.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          <p className="mt-4 text-sm">
            Newsdesk: {SITE.email}
            <br />
            Tips: {SITE.tipsEmail}
            <br />
            Switchboard: {SITE.phone}
          </p>
          <p className="mt-4 text-sm text-slate-500">{SITE.domain}</p>
        </section>
      </div>

      <section className="mt-12 grid gap-6 md:grid-cols-3">
        {[
          {
            title: "National",
            copy: "Parliament, the GNU, energy, justice, health and the stories that bind the republic.",
          },
          {
            title: "Provincial",
            copy: "All nine provinces, from Gauteng metros to Northern Cape solar country.",
          },
          {
            title: "International",
            copy: "Africa, BRICS, trade and the diplomatic files that land back home.",
          },
        ].map((item) => (
          <div key={item.title} className="border-t-4 border-[#0b2f8a] bg-white p-5">
            <h3 className="font-serif text-2xl">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.copy}</p>
          </div>
        ))}
      </section>

      <div className="mt-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8f1520]">Follow the newsroom</p>
        <div className="mt-3">
          <SocialLinks />
        </div>
      </div>
      <div className="mt-10">
        <AdSlot slot="footer-billboard" />
      </div>
      <p className="mt-10 text-sm">
        Meet the journalists on our{" "}
        <Link href="/authors" className="font-semibold text-[#0b2f8a]">
          authors page
        </Link>
        , book space on the{" "}
        <Link href="/advertise" className="font-semibold text-[#0b2f8a]">
          advertise
        </Link>{" "}
        page, or send a note via{" "}
        <Link href="/contact" className="font-semibold text-[#0b2f8a]">
          contact
        </Link>
        .
      </p>
    </main>
  );
}
